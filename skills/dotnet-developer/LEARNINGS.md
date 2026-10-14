# LEARNINGS — dotnet-developer

User feedback on past deliveries, captured by the score gate. Read this before planning any task: these rules override your defaults.

Only failures land here (score ≤ 2, or an explicit learning). A clean delivery writes nothing — so every line below is a mistake worth not repeating.

Promote a rule into `SKILL.md` and drop its rows once it has recurred 3×: run `/agent-tune dotnet-developer`. This file is short-term memory, `SKILL.md` is the weights.

| date | score | tag | règle |
|------|-------|-----|-------|
| 2026-10-13 | 4 | test-mord | Après avoir écrit un test censé verrouiller une régression, la réintroduire temporairement et vérifier que le test échoue, avant de rendre la main — un test qui passe du premier coup ne prouve rien. |
| 2026-10-13 | 4 | encodage | Lors d'un déplacement de type entre namespaces, conserver le BOM UTF-8 et les fins de ligne du fichier d'origine : un diff pollué par l'encodage casse les gates de format en CI. |
| 2026-10-13 | 4 | using | Quand on déplace un type, si l'ancien `using` ne servait qu'à lui, le remplacer (diff net) ; s'il sert encore à d'autres types, ajouter le nouveau à côté. Au cas par cas, pas systématiquement. |
| 2026-10-13 | 3 | deja-corrige | Avant toute implémentation sur une branche de fix, comparer à `origin/master` (`git diff --stat origin/master...HEAD`) et grepper le numéro de ticket dans `git log` : un ticket peut avoir été corrigé sous un autre ticket déjà mergé. |
| 2026-10-13 | 3 | git-consigne | La consigne de la tâche prime sur l'étape Git de la skill : si la branche est déjà préparée (ou en worktree) et que la tâche interdit `checkout master` + `pull`, un `fetch` seul suffit — le signaler, pas le contourner. |
| 2026-10-14 | 4 | erreur-classement | Toute nouvelle famille d'erreur doit être confrontée aux extensions qui classent les erreurs (`ErrorExtensions.AreNonBlocking`, `CountUneligibleErrors`) avant de conclure : sans rattachement, un cas non bloquant fait basculer le lot entier en échec dans les métriques du consumer. Choisir le rattachement qui ne fausse aucun compteur. |
| 2026-10-14 | 4 | heritage-base | Avant de proposer un héritage, vérifier que les membres exigés par la classe de base sont réellement fournissables par le flux. Si un `null` serait forcé, chercher qui déréférence ce membre sans garde avant de conclure que c'est anodin. |
| 2026-10-14 | 3 | doc-langue | Avant d'écrire de la documentation XML, relever la convention de langue sur deux ou trois fichiers voisins du dépôt. Ce dépôt documente en anglais ; des ajouts en français y ont été relevés en relecture. |
| 2026-10-14 | 3 | fix-etendu | Quand un relecteur pointe un défaut sur un fichier, corriger partout où le même défaut existe dans la PR — sinon l'incohérence subsiste et provoque un second aller-retour de relecture. |
| 2026-10-14 | 3 | doc-utile | La documentation XML porte l'invariant non évident (ex. « le lot entier est soumis en un seul appel, sans quoi la déduplication n'opère pas »), jamais une paraphrase du nom de la méthode ou de la signature. |
| 2026-10-14 | 4 | mail-charset | Tout corps HTML d'email contenant des accents doit porter `<meta charset="utf-8">` dans le document : le `Content-Type` MIME posé par MimeKit ne suffit pas, Outlook redécode mal un corps sans déclaration interne en transfert et en réponse. |
| 2026-10-14 | 4 | flags-chaud | Lire les feature flags via `IOptionsMonitor` et jamais `IOptions` dès que les flags sont basculés à chaud : tests BDD avec `configuration.Reload()`, activation par ConfigMap sans redémarrage de pod. `IOptions` fige un instantané au premier accès et fait silencieusement échouer l'activation. |
| 2026-10-14 | 4 | bdd-polling | Dans un test BDD piloté par un consumer Kafka, ne jamais recopier un `await Task.Delay(n)` fixe depuis un test voisin : attendre la condition par polling borné, le `BatchTimeoutMs` du consumer rend tout délai fixe structurellement flaky. |
