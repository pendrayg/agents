# LEARNINGS — react-developer

User feedback on past deliveries, captured by the score gate. Read this before planning any task: these rules override your defaults.

Only failures land here (score ≤ 2, or an explicit learning). A clean delivery writes nothing — so every line below is a mistake worth not repeating.

Promote a rule into `SKILL.md` and drop its rows once it has recurred 3×: run `/agent-tune react-developer`. This file is short-term memory, `SKILL.md` is the weights.

| date | score | tag | règle |
|------|-------|-----|-------|
| 2026-10-12 | 4 | commit-author | Un hook de garde-fou bloque tout `git commit` sans `--author="Claude <Modèle> <noreply@anthropic.com>"` : poser ce flag dès le premier commit, sans attendre le refus. |
| 2026-10-12 | 4 | branche-defaut | Ne jamais présumer que la branche par défaut est `main` : la lire (`gh repo view --json defaultBranchRef`) et brancher depuis elle — certains dépôts vivent sur une branche de travail. |
| 2026-10-12 | 4 | typecheck-vs-rendu | Après un saut de version d'un design system, un typecheck et un build verts ne disent RIEN du rendu : signaler explicitement le risque de régression visuelle dans le rapport et la PR. |
| 2026-10-14 | 4 | couple-css-js | Dans un composant qui épingle ses valeurs de feuille par test (ex. `TicketNebula`), toute retouche CSS casse le test qui tient le couple CSS↔constante JS : mettre les deux à jour dans la même passe. |
| 2026-10-14 | 4 | commentaires-defaits | Quand on DÉFAIT un mécanisme dans un fichier à commentaires argumentés, réécrire les commentaires (nouveau POURQUOI + mémoire de ce qui est défait et de la demande d'origine) — jamais les effacer mécaniquement. |
| 2026-10-14 | 4 | perimetre-avant-suppression | Plusieurs mécanismes peuvent produire le même symptôme visuel : faire confirmer lequel on retire avant de toucher au code, plutôt que d'élargir le périmètre. |
| 2026-10-14 | 4 | mesurer-navigateur | Un bug de boîte / de débord ne se diagnostique pas en jsdom (aucun layout) : ouvrir l'app (localhost:5173, le serveur de l'utilisateur tourne déjà) et relever les `getBoundingClientRect` avant de proposer un correctif. |
| 2026-10-14 | 4 | pourcentage-wrapper | Dimensionner en `%` d'un conteneur qui enveloppe un SVG n'est juste que si la boîte du conteneur coïncide avec le dessin : vérifier les wrappers intermédiaires (padding UA d'un `<button>`, bordure) avant d'ajuster le pourcentage. |
| 2026-10-14 | 4 | ref-mesure-2e-bug | Quand la boîte fautive est aussi celle qu'un `ref` mesure pour de la géométrie, le débord visuel n'est que la partie visible : relire tous les usages du ref avant de patcher le symptôme. |
| 2026-10-14 | 4 | historique-du-fichier | Dans un repo qui garde la mémoire des demandes passées en commentaires, vérifier avant de coder si la demande est un RETOUR EN ARRIÈRE sur une décision documentée : le signaler, et garder la mémoire des états successifs. |
| 2026-10-14 | 4 | repli-jamais-undefined | Quand un repli silencieux ferait DISPARAÎTRE un signal visuel, le trancher explicitement avec une valeur décidée — ne jamais laisser `undefined` tomber par accident. |
| 2026-10-14 | 4 | noms-deja-pris | Avant de renommer une fonction, chercher les voisines qui servent une population différente : un nom réutilisé fait fusionner deux règles distinctes dans la tête du prochain lecteur. |
| 2026-10-14 | 4 | parente-toutes-populations | Quand une hiérarchie de navigation est dérivée des données au lieu d'un historique empilé, vérifier qu'elle couvre CHAQUE population focusable : une population non prévue sort du geste silencieusement au lieu d'échouer. |
| 2026-10-14 | 4 | pas-de-split-de-cle | Pour retrouver le parent d'un objet à clé préfixée, lire la donnée qui le porte plutôt que de découper la chaîne : le format du préfixe ne doit vivre qu'à un seul endroit. |
| 2026-10-14 | 4 | defaut-preexistant | Un bug signalé juste après un changement n'en vient pas forcément : vérifier s'il préexistait et que le changement l'a seulement rendu visible — ça change l'endroit où l'on corrige. |
| 2026-10-14 | 4 | fusionner-pas-aligner | Quand deux fonctions doivent rendre la même valeur, les FUSIONNER en une seule appelée par ses deux clients plutôt que recopier le calcul : deux expressions jumelles divergent au premier recalibrage. |
| 2026-10-14 | 4 | vestiges-abstraction | Quand une abstraction est supprimée, les fonctions qui la visaient survivent en pointant une frontière qui n'existe plus : les chercher activement au lieu d'attendre qu'un écran les trahisse. |
| 2026-10-14 | 4 | dedoublonner-le-reste | Une règle de dédoublonnage doit dire ce qu'on fait du RESTE : filtrer la liste et ne supprimer l'objet que s'il ne reste rien, plutôt que le supprimer dès le premier doublon. |
| 2026-10-14 | – | font-size-sur-le-conteneur | Quand un décor mesuré en em (socle, faisceau, pseudo-éléments) entoure un enfant, poser le font-size sur le CONTENEUR et non sur ses pseudo-éléments : sinon l'enfant reste à la taille du texte environnant, et l'app ne peut pas mettre l'ensemble à l'échelle d'un seul réglage. |
| 2026-10-14 | – | pas-de-process-env-en-lib | Jamais process.env.NODE_ENV nu dans du code destiné au dist d'une lib navigateur : vérifier le types du tsconfig de BUILD (pas celui de dev) et lire process depuis globalThis typé localement en accès optionnel. |
