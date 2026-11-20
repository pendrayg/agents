#!/usr/bin/env node
/** Self-check for score-gate.js — `node hooks/test-score-gate.js`. */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { writeFileSync, rmSync, mkdtempSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const HOOK = fileURLToPath(new URL("./score-gate.js", import.meta.url));
const dir = mkdtempSync(join(tmpdir(), "score-gate-test-"));
rmSync(join(tmpdir(), "yy-score-gate"), { recursive: true, force: true });

const toolUse = (name, input, id) => ({
  type: "assistant",
  message: { content: [{ type: "tool_use", name, input, id }] },
});
const toolResult = (id, text) => ({
  type: "user",
  message: { content: [{ type: "tool_result", tool_use_id: id, content: text }] },
});

/** Run the hook over a transcript, under `home` as the user's home directory. */
function run(entries, session, raw, home = dir) {
  const path = join(dir, `${session}.jsonl`);
  writeFileSync(path, raw ?? entries.map((e) => JSON.stringify(e)).join("\n"));
  const out = execFileSync("node", ["--no-warnings", HOOK], {
    input: JSON.stringify({ transcript_path: path, session_id: session }),
    env: { ...process.env, HOME: home, USERPROFILE: home },
    encoding: "utf8",
  });
  return out.trim() ? JSON.parse(out) : null;
}

const REPORT = "Done.\n\nSCORE-GATE: dotnet-developer\ntâche: endpoint PUT\ncandidats:\n- Mapper dupliqué | Chercher un Profile existant";
const delivered = [
  toolUse("Task", { subagent_type: "dotnet-developer" }, "t1"),
  toolResult("t1", REPORT),
];

// Un-scored delivery blocks, and hands the agent's own candidates to the orchestrator.
const blocked = run(delivered, "s1");
assert.equal(blocked.decision, "block");
assert.match(blocked.reason, /dotnet-developer/);
assert.match(blocked.reason, /Chercher un Profile existant/);

// Same delivery again: blocking twice would deadlock the session.
assert.equal(run(delivered, "s1"), null);

// Scored after delivery → nothing to do.
assert.equal(
  run([...delivered, toolUse("AskUserQuestion", { questions: [] }, "a1")], "s2"),
  null
);

// A scoring that predates the delivery does not count as scoring it.
assert.equal(
  run([toolUse("AskUserQuestion", { questions: [] }, "a0"), ...delivered], "s3").decision,
  "block"
);

// Non-dev subagents are none of this hook's business.
assert.equal(
  run([toolUse("Task", { subagent_type: "Explore" }, "t2"), toolResult("t2", "ok")], "s4"),
  null
);

// Missing report block still blocks, telling the orchestrator to improvise candidates.
const noBlock = run([toolUse("Task", { subagent_type: "react-developer" }, "t3")], "s5");
assert.equal(noBlock.decision, "block");
assert.match(noBlock.reason, /pas remonté de bloc SCORE-GATE/);

// A broken transcript must never break the session: unparseable lines are
// skipped, and a delivery surrounded by them is still caught.
assert.equal(run([], "s6"), null);
assert.equal(run(null, "s7", "{not json\nnope\n"), null);
assert.equal(
  run(null, "s8", ["{truncated", ...delivered.map((e) => JSON.stringify(e))].join("\n"))
    .decision,
  "block"
);

// Learning switched off: the flag file in the user's home silences the hook.
const offHome = mkdtempSync(join(tmpdir(), "score-gate-off-"));
mkdirSync(join(offHome, ".claude"));
writeFileSync(join(offHome, ".claude", "yy-agents-learning-off"), "");
assert.equal(run(delivered, "s9", null, offHome), null);
rmSync(offHome, { recursive: true, force: true });

rmSync(dir, { recursive: true, force: true });
console.log("ok — score-gate");
