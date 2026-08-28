# Interactivité & performance (Core Web Vitals)

> Hub : `../CLAUDE.md`. Les deux sujets sont liés : l'interactivité ne vaut que si la page reste rapide.

## Philosophie

- **Remplacer le pavé, pas le décorer.** Le format suit la nature de l'info :
  - comparaison → cartes qu'on bascule (pas 4 paragraphes)
  - processus → schéma animé (pas une liste à puces)
  - dépendance à des variables → curseur qu'on manipule (pas un tableau)
  - différence géographique → carte cliquable (pas 3 sections empilées)
- **Couche par défaut = illustrations + accordéons** (léger, rapide, partout).
- **Briques interactives = l'accent**, réservées aux pages où manipuler explique mieux que lire.
- On construit chaque brique **une fois**, on la réutilise dans le simulateur (pour calculer)
  ET dans le contenu (pour expliquer). Chaque brique pédagogique se termine par une rampe
  vers le simulateur.

## Catalogue des briques réutilisables

| Brique | Rôle dans le simulateur | Réemploi dans le contenu | Note perf |
|--------|-------------------------|--------------------------|-----------|
| Voyage du photon (schéma animé) | — | Page « fonctionnement » : remplace le pave | SVG léger, anim au scroll-in |
| Curseur orientation/inclinaison | Étape orientation | Page « rendement » : on bouge le soleil, le % bouge | JS léger, pas de lib |
| Slider facture avant/après | Affichage économies | Pages prix/rentabilité | Léger |
| Timeline d'amortissement | Résultats (ROI) | Pages rentabilité | Anim au scroll-in |
| Tooltips au tap | Libellés techniques | 3-4 termes jargon : onduleur, kWc, prosumer | Parcimonie (3-4 max) |
| Carte des aides par région | Sélecteur région | Home + pages aides | Léger, fallback liste |

## Registre des modules — les familles telles qu'elles existent en code

> ⚠️ Ce registre était jusqu'ici une convention **orale** : chaque composant
> déclarait sa lettre dans son en-tête, sans que la liste existe nulle part. Il
> fallait grepper « famille » pour savoir laquelle était libre. Le voici.

| Famille | Composant | Ce que c'est |
|---|---|---|
| A | `SliderCalculator` | Calculateur à curseur(s) — la formule change, le module non |
| B | `OptionComparator` | Comparateur multi-options — tableau à colonne mise en évidence |
| C | `StateToggle` | Bascule à deux états |
| D | `StepsTimeline` | Timeline de démarches |
| E | `FigureModule` | Module illustré non interactif — la famille la plus nombreuse |
| F | `TopicCards` | Grille de cartes-liens (2, 3 ou 4 colonnes) |
| G | `PhotonFlow` | Schéma animé du trajet de l'énergie |
| H | `StackedList` | **Liste empilée à média plein** — trois lignes à gauche, une seule photo à droite sur toute la hauteur |

### Famille H — liste empilée à média plein (Figma 700:1813)

Employée sur Batterie, Compteur intelligent et Risques & inconvénients, à la
place de la grille de cartes de « L'essentiel ».

Chaque ligne : un surtitre en capitales, un titre, et le paragraphe dans sa
carte blanche. Le tout dans un cadre vert clair, la photo occupant la moitié
droite sur toute la hauteur.

Quand la choisir plutôt qu'une grille de cartes : quand les trois éléments
forment un **raisonnement en trois temps** — rôle, impact, installation — et non
trois objets indépendants.

⚠️ **UNE photo pour toute la liste, jamais une par ligne.** C'est ce qui la
distingue des cartes photo : là-bas trois objets différents, ici trois facettes
d'un même sujet. Aucune image n'est produite pour ce module — il recadre le hero
de la page en CSS.

⚠️ **La photo s'étire, elle ne colle pas.** Une première version la posait en
`position: sticky`. Mesuré : avec trois lignes le bloc tient dans un écran, il
n'y a rien à faire défiler, donc rien à coller — la règle était appliquée et
sans effet. `height: 100%` dans une rangée étirée donne le même résultat visuel
sans promettre un comportement inexistant.

⚠️ **Pas de filet entre les lignes.** Les cartes blanches suffisent à les
séparer ; un trait par-dessus marquait deux fois la même coupure.

⚠️ **Deux colonnes à partir de 1024px, pas 768.** En dessous, la colonne de
texte tombe sous 340px et chaque titre casse sur trois lignes — ce qui annule le
rythme que le module existe pour créer.

Zéro JavaScript.

## Verdicts sur les idées initiales

- **Pop-ups au survol** → à convertir en **tooltips au tap** (le survol n'existe pas sur mobile),
  avec parcimonie (3-4 termes vraiment jargonneux, sinon ça parasite la lecture).
- **Scroll-videos / scroll-jacking** → joli mais coûteux et souvent pénible. Si on en met :
  **une seule, courte, avec fallback image**. Pas le réflexe par défaut.
- **Schémas en motion design** → bon, à condition de rester léger (SVG, déclenché à l'apparition).

## Règles de performance — NON NÉGOCIABLES

Le SEO amène le trafic → qui alimente le simulateur → qui génère les leads.
Casser les Core Web Vitals casse toute la chaîne.

- **Animations déclenchées à l'apparition** (scroll-in), **jamais en autoplay permanent**.
- **Fallback propre** pour chaque module (image ou contenu statique).
- **Le texte SEO vit dans le HTML**, jamais uniquement dans une animation.
- **Images** : WebP/AVIF (pipeline Sanity), `width`/`height` déclarés (CLS), lazy-load sauf hero.
- **Pas de librairie lourde** pour ce qu'on peut faire en SVG/JS natif. Mesurer le poids ajouté.
- **Front statique (Astro, SSG)** : pages pré-rendues en HTML quasi pur. L'interactivité
  est hydratée en **îlots** uniquement là où elle existe → le reste de la page ne paie pas le JS.
- L'interactif est une **couche par-dessus** le contenu lisible, **pas à la place**.

## Note glassmorphisme (anticipation phase design)
Le `backdrop-filter: blur()` est **coûteux** en rendu. À doser : l'utiliser sur quelques
surfaces clés (carte du hero, cartes de résultats), pas partout. Détail en phase design (`design.md`).
