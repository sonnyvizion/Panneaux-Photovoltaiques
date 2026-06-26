# Direction visuelle (STUB — phase design à venir)

> Hub : `../CLAUDE.md`. Ce document est un point de départ, à étoffer quand on attaque le design.

## Cap recherché (mots du client)
Glassmorphisme, belles polices, très moderne, épuré — référence « Tesla ».
À retenir : « Tesla » = **retenue** (beaucoup de blanc, grande image, peu de texte,
une animation propre à la fois), pas un feu d'artifice. L'épure sert aussi la perf et la conversion.

## Principes provisoires
- Hiérarchie typographique forte, peu de niveaux, generous whitespace.
- Glassmorphisme **dosé** : carte du hero, cartes de résultats du simulateur — pas partout
  (`backdrop-filter: blur()` est coûteux, voir `interactivite-seo.md`).
- Une seule action visuelle dominante par écran (cohérent avec « un seul CTA »).
- Photo de toit réelle en hero (pas de stock générique si possible).

## À définir en phase design
- [À COMPLÉTER] Palette de couleurs (depuis la charte du client).
- [À COMPLÉTER] Police(s) (titres / corps).
- [À COMPLÉTER] Logo et déclinaisons.
- Système de composants (boutons, cartes, accordéons, tooltips, méga-menus).
- Maquettes : hero, page `/simulateur`, gabarit page de contenu, header desktop + mobile.
- Tokens de design à brancher sur le front (et éventuellement sur Sanity pour la cohérence éditoriale).
