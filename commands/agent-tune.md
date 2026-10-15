---
description: Promote recurring learnings of a dev agent into hard rules in its SKILL.md, then prune LEARNINGS.md
argument-hint: "[dotnet-developer|react-developer|nodejs-developer|ios-game-developer]"
allowed-tools: Read, Edit, Write, Glob, AskUserQuestion
---

# /agent-tune — distil an agent's feedback into rules

Target agent: `$1`. Not supplied, or not one of the four dev agents → list the agents whose `LEARNINGS.md` has rows and ask which one.

`LEARNINGS.md` is short-term memory and costs context on every single task that agent runs. This command turns what recurs into permanent rules and throws away the rest. Keep the file under ~30 rows.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/$1/LEARNINGS.md` and its `SKILL.md`.

2. Group the rows by what they actually say, not by their `tag` column — the same mistake gets tagged three different ways. A group of **3 rows or more is a candidate for promotion**; so is any single row with score 1, which signals a mistake bad enough that it must not need repeating to count.

   Count recurrence in **distinct sources, not in rows**. A single row listing three sources (` · ` separated) already is the same rule learned three times and promotes on its own. Conversely, three rows sharing one source are one bad day on one task — keep them unless the rule reads as general. Rows with `—` count, but evidence made only of `—` is weak; say so when presenting it.

   Any group you find here is a merge the gate missed. Whether or not the user promotes it, collapse the group into one row — sources joined, latest date, worst score — before finishing.

3. For each candidate, write the hard rule as it would appear in `SKILL.md`: imperative, checkable, no backstory. "Chercher un Profile AutoMapper existant avant d'en créer un", not "L'utilisateur a constaté des doublons de mapping".

4. Present the candidates with AskUserQuestion (multiSelect) — label = the rule, description = how many rows back it and the worst score. The user decides what gets promoted; a rule they reject stays in `LEARNINGS.md` untouched.

5. Apply the approved rules to the relevant existing section of `SKILL.md` — merge into a section that already covers the topic rather than appending a new one, or the file turns into a pile. Then delete the promoted rows from `LEARNINGS.md`.

6. Report: rules promoted, rows pruned, rows left. If the file is still over ~30 rows after pruning, say so and name the oldest rows as candidates for deletion — old feedback that never recurred is noise, not signal.

## Guardrails

- Never rewrite a rule the user didn't approve, never delete a row that wasn't promoted. Merging duplicates is the one exception: collapsing rows that say the same thing loses no lesson, as long as the surviving wording covers every row it absorbs and keeps their sources. Anything beyond that is a rewrite — ask.
- A promoted rule must not contradict an existing one in `SKILL.md`. If it does, surface the conflict and let the user arbitrate — do not silently resolve it.
- This edits the plugin itself, which lives in git. Changes go on a branch and through a PR to `main`, never a direct commit on `main`.
