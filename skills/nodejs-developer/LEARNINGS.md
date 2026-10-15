# LEARNINGS — nodejs-developer

User feedback on past deliveries, captured by the score gate. Read this before planning any task: these rules override your defaults.

Only failures land here (score ≤ 2, or an explicit learning). A clean delivery writes nothing — so every line below is a mistake worth not repeating.

Promote a rule into `SKILL.md` and drop its rows once it has recurred 3×: run `/agent-tune nodejs-developer`. This file is short-term memory, `SKILL.md` is the weights.

`source` = where the lesson comes from, as an OKF v0.2 `sources[].resource` would record it: a canonical reference, whatever form it takes. A URL when there is one (PR, ticket, issue, doc), otherwise a local ref — `repo@sha`, `repo:path/to/file.ts`, a package + version, a tool name. Nothing identifiable: `—`. Never invent one, and never assume a tracker: this plugin runs outside Jira and outside GitHub too.

**One rule, one row.** Before adding a row, look for one that already says the same thing — the wording will differ, the lesson is what counts. Found one? Do not append: add the new source to that row (separator ` · `), bump its date, keep the worst score. A row carrying three distinct sources is the same rule learned three times, and that is exactly what `/agent-tune` promotes. Reuse an existing `tag` whenever it fits — a new tag is for a genuinely new lesson, and two rows sharing a tag are a merge waiting to happen.

| date | score | tag | source | règle |
|------|-------|-----|--------|------|
