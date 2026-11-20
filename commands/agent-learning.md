---
description: Turn the dev agents' learning (LEARNINGS.md + score gate) on or off
argument-hint: "[on|off]"
allowed-tools: Bash
---

# /agent-learning — switch the learning on or off

The switch is the file `~/.claude/yy-agents-learning-off`: present = learning off (no score gate, agents ignore `LEARNINGS.md`), absent = on.

- `$1` = `off` → `mkdir -p ~/.claude && touch ~/.claude/yy-agents-learning-off`
- `$1` = `on` → `rm -f ~/.claude/yy-agents-learning-off`
- no argument → `ls ~/.claude/yy-agents-learning-off` and report the current state.

Answer in one line: `apprentissage : activé` or `apprentissage : désactivé`.
