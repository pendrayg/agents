# LEARNINGS — react-developer

User feedback on past deliveries, captured by the score gate. Read this before planning any task: these rules override your defaults.

Only failures land here (score ≤ 2, or an explicit learning). A clean delivery writes nothing — so every line below is a mistake worth not repeating.

Promote a rule into `SKILL.md` and drop its rows once it has recurred 3×: run `/agent-tune react-developer`. This file is short-term memory, `SKILL.md` is the weights.

| date | score | tag | règle |
|------|-------|-----|-------|
| 2026-10-12 | 4 | commit-author | Un hook de garde-fou bloque tout `git commit` sans `--author="Claude <Modèle> <noreply@anthropic.com>"` : poser ce flag dès le premier commit, sans attendre le refus. |
| 2026-10-12 | 4 | branche-defaut | Ne jamais présumer que la branche par défaut est `main` : la lire (`gh repo view --json defaultBranchRef`) et brancher depuis elle — certains dépôts vivent sur une branche de travail. |
| 2026-10-12 | 4 | typecheck-vs-rendu | Après un saut de version d'un design system, un typecheck et un build verts ne disent RIEN du rendu : signaler explicitement le risque de régression visuelle dans le rapport et la PR. |
