# Direction visuelle — Design système

> Hub : `../CLAUDE.md`.
>
> **Ce document décrit l'état réel du code.** La source de vérité opérationnelle
> est [`site/src/styles/tokens.css`](.worktrees/design-systeme-astro/site/src/styles/tokens.css) :
> toute valeur de design y vit, et aucune n'est écrite en dur ailleurs. Ce
> fichier-ci explique les décisions, pas les valeurs — quand les deux divergent,
> c'est `tokens.css` qui a raison, et ce document qui doit être corrigé.
>
> Réécrit le 2026-08-12 après la mise au point de la home sur la maquette Figma,
> mis à jour le 2026-08-13 (hero, défilé de pastilles, mouvement des piliers).

## Origine des valeurs

Les tokens sont relevés du fichier Figma « Panneaux Voltaïqies »
(`b78qIBZ4vtqHB1lwa7TLbg`), d'abord par ses variables publiées
(`get_variable_defs`), puis nœud par nœud au dev mode pour tout ce que les
variables ne couvrent pas — rayons, paddings, gabarits.

Le nommage suit Figma : `main/green` → `--color-main-green`, `body_sm` →
`--text-body-sm-*`. Cette traçabilité est le principal atout du fichier, et la
raison pour laquelle certaines incohérences de nommage sont **conservées**
plutôt que corrigées (voir « Pièges connus »).

Les écarts délibérés avec Figma sont signalés par `⚠️ ÉCART ASSUMÉ` dans
`tokens.css`, avec leur motif. Ne pas les « recorriger » vers Figma sans en
reparler.

## 1. Couleurs

14 couleurs, aucune autre. Palette froide et minérale — la palette chaude
(beige, blanc cassé, accent menthe estimé) décrite dans les versions
précédentes de ce document **n'existe plus**, elle précédait la maquette.

| Token | Valeur | Usage |
|---|---|---|
| `--color-ink-900` | `#191c1b` | texte principal, aplats sombres |
| `--color-ink-800` | `#2a2f2d` | footer, accordéon FAQ ouvert |
| `--color-ink-700` | `#4c5250` | texte tertiaire, filets sur fond sombre |
| `--color-shade-grey` | `#eaecec` | sections alternées, cartes de statistiques, filets |
| `--color-shade-strong` | `#a4acac` | texte atténué, **mot accentué des titres** |
| `--color-white-primary` | `#fffefc` | fond de page, surfaces |
| `--color-white-clear` | `#f0f8f5` | sections alternées claires, texte sur fond sombre |
| `--color-main-green` | `#65ebc1` | CTA principal, carte 89 %, carte du CTA final |
| `--color-highlight-primary` | `#e0ff58` | badge Enphase, carte équipe, témoignages |
| `--color-input-placeholder` | `#757575` | texte de substitution des champs |

Cinq alias sémantiques pointent vers ces primitives : `--color-text-primary`,
`-secondary`, `-tertiary`, `-muted`, `-inverted`. **Utiliser les alias dans les
composants**, pas les primitives.

**Le mot accentué des titres est gris, pas vert.** Figma pose `#a4acac` sur
« certifiée », « devez », « directement ». Le vert est réservé aux surfaces
d'action.

## 2. Typographie

**Circular Std** pour les titres, les display et les boutons. **Inter** pour le
corps de texte, la navigation et les libellés. Geist Mono est déclaré pour les
chiffres clés du simulateur, pas encore utilisé.

| Style | Police | Graisse | Taille (mobile → desktop) | Interlignage |
|---|---|---|---|---|
| `h1` | Circular Std | **Book 450** | 32 → **60px** | **0,88** |
| `h2` | Circular Std | Book 450 | 28 → **48px** | 30 → 50px |
| `h3` | Circular Std | Medium 500 | 26px | 30px |
| `display-little` | Circular Std | Book 450 | 22px | 24px |
| `h4` | Circular Std | Medium 500 | 20px | 24px |
| `overline` | Circular Std | Medium 500 | 18px | 20px |
| `display-mid` | Circular Std | Book 450 | 44px | 1 |
| `button` | Circular Std | Medium 500 | 16px | normal |
| `body-light` | Inter | **Regular 400** | 16px | 22px |
| `body-sm` | Inter | **Regular 400** | 15px | 20px |
| `body-nav` | Inter | Medium 500 | 14px | 1 |
| `marker` | Inter | Medium 500 | 14px | 18px |
| `--text-utility-size` | Inter | Regular 400 | 14px | — |

Interlettrage : Figma renvoie des nombres sans unité, interprétés en **pourcent**
et convertis en `em`. La même valeur `-2` s'appliquant à du 44px comme à du 14px,
une lecture en pixels est exclue. ⚠️ à confirmer côté Figma.

### Écarts assumés

- **Le corps de texte est en Regular 400.** Aucun style Figma n'est en Regular :
  tout y est en Medium, ce qui rend le texte courant gras et lourd. `body-light`
  et `body-sm` sont allégés, et réduits de 18→16 et 16→15px.
- **`h2` à 40px au lieu de 44.** Dans Figma, `h1` et `h2` valent tous deux 44px
  et se confondent ; 40px rétablit une hiérarchie.
- **`h3` et `h4` ont été échangés.** Figma nomme `h4` un style plus grand que
  son `h3` — une échelle dont les noms contredisaient les tailles. Ici `h3`
  vaut 26px et `h4` 20px, l'ordre est rétabli. Chaque bloc de `tokens.css`
  indique le style Figma dont il provient.
- **`h4` à 20px au lieu des 22 du `h3` Figma.**
- **`h1` en Book 450 à 60px, interlignage 0,88** — Figma pose Medium 500 à 44px
  sur un interlignage de 1. Agrandi pour se hisser au niveau des références du
  marché, puis allégé : à 60px, le Medium formait un pavé trop massif en tête de
  page. `--width-h1` (800px) tient le titre du hero sur **deux** lignes ; à
  662px, la valeur de l'époque 44px, il en occupait trois.
  ⚠️ À 0,88 les deux lignes se chevauchent de 23px — les jambages de la première
  descendent dans la hauteur de la seconde. Remonter vers 0,95 s'il faut de
  l'air, la largeur suffisant à elle seule à tenir les deux lignes.
- **Le libellé des boutons est en `line-height: normal`**, pas au rapport 1 du
  style `button` : à 1, le cadre de coupe du roulement rognerait les jambages.
  C'est d'ailleurs ce que pose le nœud du bouton dans Figma.

### Chargement

Circular Std est auto-hébergée (`public/fonts/`), déclarée en `@font-face`.
Le fichier « Book » couvre la plage `400 450` : Figma déclare ce style en 450,
le fichier est un 400, et sans cette plage le navigateur synthétiserait une
graisse intermédiaire. Inter vient de `@fontsource` en 400 et 500.

⚠️ **Licence webfont Circular Std à confirmer** — police commerciale (Lineto),
les fichiers fournis ne garantissent pas la diffusion publique.

## 3. Formes, ombres, verre

### Rayons

| Token | Valeur | Usage |
|---|---|---|
| `--radius-1` … `--radius-4` | 4 / 8 / 16 / 32px | alias de l'échelle d'espacement |
| `--radius-card` | **18px** | cartes de statistiques, piliers, FAQ fermée, images |
| `--radius-panel` | **25px** | grands blocs : hero, équipe, témoignages, FAQ ouverte, CTA final |
| `--radius-pill` | `9999px` | boutons, pastilles, champs, badges |

18 et 25 sont hors échelle — ce sont les valeurs relevées dans Figma.

### Ombres — il n'y en a aucune

**Décision structurante :** ce système n'utilise **ni ombre portée ni ombre de
texte**. Aucun token `--shadow-*` ni `--text-shadow-*`. L'ombre chaude décrite
dans les versions précédentes de ce document a été supprimée.

La profondeur passe par trois moyens :
- le **filet** (`--color-shade-grey`) — cartes, nav détachée ;
- le **verre** — éléments posés sur photo ;
- les **aplats de couleur** — vert, lime, sombre.

Sur photo, la lisibilité est assurée par un **voile sombre** (`--overlay-hero`
à 25 %, `--overlay-photo` à 20 %, `--overlay-step` en dégradé), jamais par une
ombre de texte.

### Verre

Il n'y a pas un verre mais **cinq dosages**, relevés séparément :

| Token | Fond | Flou | Usage |
|---|---|---|---|
| `--bg-glass-fill-form` | `rgba(255,254,252,.62)` | `--bg-glass-blur-form` — 12px | champ code postal du hero |
| `--bg-glass-fill-pill` | `rgba(246,246,246,.5)` | **aucun** | pastilles de réassurance |
| `--bg-glass-fill-nav` | `rgba(250,254,255,.2)` | `--bg-glass-blur-nav` — 5px | pilule de nav, sur le hero |
| `--bg-glass-fill-nav-detached` | `rgba(250,254,255,.6)` | `--bg-glass-blur-nav-detached` — 14px | pilule de nav, détachée |
| `--bg-glass-fill-menu` | `rgba(255,254,252,.75)` | `--bg-glass-blur-menu` — 24px | méga-menus, panneau mobile |

Le dosage monte à mesure que le fond devient hostile. Sur le hero, le verre n'a
qu'un ciel à voiler. Une fois détachée, la pilule passe sur du texte et des
cartes : à 0.2 / 5px, les lignes du dessous se lisaient à travers les libellés.
Les méga-menus portent jusqu'à neuf liens sur du contenu dense — d'où le dosage
le plus couvrant du système.

Le **filet clair** (`--bg-glass-border`) est ce qui signe l'effet : sans lui, un
fond translucide se lit comme un aplat. Figma l'omet, son rendu aplatissant la
transparence.

⚠️ **Le filet a lui aussi deux états, pour la même raison que les fonds.** Le
blanc translucide ne signe le verre que sur une photo ; composé sur une section
blanche il donne `#FFFEFD`, et la surface entière disparaît dans la page — c'est
arrivé aux quatre surfaces de verre de la nav d'un coup. Une fois détaché, c'est
le **filet gris** qui prend le relais, comme le prescrit la liste des trois
moyens de profondeur ci-dessus (« cartes, nav détachée ») et comme le fait
`Card.astro`.

Et **augmenter l'opacité du fond n'y peut rien** : sa teinte EST celle de la
page. Sur du blanc, seuls deux leviers existent — un filet, ou un fond d'une
autre luminosité.

**Les pastilles n'ont plus de flou**, et ce n'est pas un oubli : le fondu latéral
de leur bande le rendait impossible (voir le piège ci-dessous). Voile et filet y
suffisent. Ne pas leur rendre de `backdrop-filter` sans retirer le fondu.

⚠️ Le flou de la nav a longtemps partagé le token des pastilles. Quand celui-ci
est monté de 5 à 22px, la nav a suivi **sans que personne l'ait demandé**. Chaque
surface a désormais son propre token.

⚠️ **Garde-fou perf** : `backdrop-filter` réservé aux éléments au-dessus du pli
ou peu nombreux — jamais répété dans une grille.

### Deux pièges du `backdrop-filter`

Tous deux **silencieux** : la propriété reste calculée, `getComputedStyle`
renvoie bien `blur(…)`, et rien n'est peint. Aucune erreur, aucun avertissement.

1. **Le minifieur n'en garde qu'une des deux déclarations.** `backdrop-filter` et
   `-webkit-backdrop-filter` dans la même règle — ou dans deux règles adjacentes
   au même sélecteur — et lightningcss en supprime une. Le verre disparaissait de
   **tout le site en production** alors qu'il fonctionnait en développement.
   La version préfixée doit vivre dans une règle compagnon **en fin de bloc**.
   Déclarer des cibles navigateur ne suffit pas : le minifieur refuse de générer
   le préfixe lui-même, la valeur contenant un `var()` qu'il ne sait pas analyser.
2. **Un ancêtre qui crée un « backdrop root » l'annule.** L'enfant ne voit alors
   plus la page derrière, seulement un conteneur transparent — il floute du vide.
   Deux causes dans ce projet :

   **a. Un `backdrop-filter` sur un ancêtre.** C'est pourquoi le verre de la
   pilule vit sur `.header__list::after` et non sur `.header__list` : porté par
   le `<ul>`, il aurait annulé celui des méga-menus, qui en sont descendants.
   Ne pas le remonter sur l'élément.

   **b. Un masque.** `mask-image` crée un « backdrop root » :
   l'enfant ne voit plus la photo, seulement un conteneur transparent. Posé sur
   l'élément lui-même, le masque préserve le flou mais **ne l'atténue pas** — une
   pastille estompée projetait un rectangle de flou à pleine intensité, tranché
   net au bord. L'opacité, elle, composite bien l'élément avec son flou, mais
   uniformément : les pastilles s'effaçaient sur place au lieu de défiler.
   **Fondu latéral et verre sont donc exclusifs.** `mask-attachment: fixed`, qui
   aurait ancré le dégradé au viewport, n'existe pas dans Chrome.

**Pour prouver qu'un flou peint vraiment** : capturer deux fois la même zone en
basculant `backdropFilter` entre sa valeur et `none`. Images identiques = il ne
peint pas. Un flou fort et un zoom élevé rendent le test lisible.

## 4. Espacement et grille

### Échelle

Figma publie **4 paliers** : 4 · 8 · 16 · 32px, nommés `--space-1` à `--space-4`.
Les paliers complémentaires sont nommés **par leur valeur** — `--space-12`,
`--space-24`, `--space-48`, `--space-64`, `--space-96`, `--space-128` — pour
lever l'ambiguïté avec l'index Figma.

⚠️ **Piège** : `--space-3` vaut **16px**, pas 12. L'échelle a été renumérotée
pour suivre Figma. `--space-12` vaut 12px.

### Rythme vertical

**`--block-gap` est la valeur qui se voit** : **128px sur mobile**, **144px sur
desktop**. La marge de section (`--section-padding-block`) en est la moitié
dérivée, puisque deux sections voisines posent chacune la leur et qu'elles
s'additionnent. Régler la marge directement revient à piloter la moitié du
résultat.

Le mobile est passé de 96 à 128 le 2026-08-14 : les blocs y s'enchaînent sans
repère latéral — pas de colonne, pas de marge visible — et cet écart vertical
est le seul signal qui dise « nouveau sujet ». 128 est le haut de la fourchette
mobile de cette même section, pas un dépassement. C'est un token global : la
home a suivi, ce qui est voulu — un site, un rythme.

⚠️ **Une section qui ne pose pas sa moitié casse le rythme — sauf si elle
appartient au bloc précédent.** `FinalCta` était à `padding-top: 0` sur toutes
les pages : le dernier joint ne valait que la moitié des autres et la page se
terminait serrée. Ce `0` n'a de sens que sur la home, où la carte verte prolonge
une FAQ **grise** et où le gris continu masque l'absence d'écart ; sur fond blanc
il se voit. Il est donc conditionné au ton.

**Le hero, lui, garde volontairement son demi-rythme.** Dans la maquette, la
photo et le paragraphe qui la suit vivent dans le MÊME bloc
(`bloc_hero+display`), séparés de 80px quand les blocs entre eux en ont autant :
le hero donne la réponse en deux phrases, le paragraphe la développe. Leur écart
doit rester plus serré que le rythme inter-blocs, sinon le paragraphe se lit
comme un sujet nouveau alors qu'il continue le précédent. Il vaut donc 64px sur
mobile et 85 sur desktop, contre 128/144 partout ailleurs.

La règle utile n'est pas « chaque section pose sa moitié » mais **« chaque
UNITÉ de sens pose sa moitié »** — et hero + paragraphe n'en font qu'une.

`--section-gap` (48px desktop) sépare l'en-tête de section de son contenu.

### Conteneur

| | Mobile | Desktop |
|---|---|---|
| `--container-max` | 1440px | 1440px |
| `--container-padding` | 24px | 60px |
| `--hero-inset` | 10px | 13px |

**La marge latérale se pose hors de la largeur max**, jamais dedans : le contenu
fait donc `--container-max` plein. Placée à l'intérieur, elle se déduirait de la
largeur et les sections seraient plus étroites que le bloc équipe, le footer et
le CTA final, qui suivent ce modèle. C'est la source d'un désalignement qu'il a
fallu corriger.

⚠️ Les breakpoints existent en tokens (`--breakpoint-*`) mais **ne sont pas
utilisables dans une règle `@media`** — limitation CSS, pas un oubli. Les
composants répètent les valeurs littérales ; toute modification se répercute à
la main : `grep -rn "min-width:" src/`.

## 5. Composants de base

- **Bouton** (`Button.astro`) — pilule avec pastille flèche greffée à droite.
  Trois variantes : `primary` (vert), `ink` (sombre, sur fond déjà coloré),
  `secondary` (contour, sans pastille). Option `wrap` : le libellé peut passer à
  la ligne, réservé aux boutons qui remplissent une colonne étroite (voir §5 bis).
  La **pastille ne change jamais** : fond blanc, flèche sombre, partout.
  `primary` porte un **filet** (`--color-main-green-edge`, dérivé du vert par
  `color-mix`) : sur le verre clair du hero, l'aplat vert n'avait pas de bord.
  Posé en `outline` et non en `border` — une bordure élargirait le bouton de 2px
  et rognerait le champ voisin. Il s'efface au survol, la pilule passant au
  sombre s'y détache seule.
- **Lien fléché** (`ArrowLink.astro`) — libellé souligné + pastille lime.
- **Carte** — fond `white-primary`, filet `shade-grey`, rayon `--radius-card`.
- **Accordéon** (`Accordion.astro`) — `<details>` natif, deux variantes :
  `line` (séparateur) et `card` (boîte arrondie qui pose un aplat à l'ouverture).
  L'attribut `name` rend un groupe exclusif, **sans JavaScript**.

  La variante `card` a **deux tons d'ouverture** — `ink` (FAQ) et `lime`
  (« Creuser le sujet ») — et **trois fonds de fermeture**, `white`, `grey` et
  `none`. Ce dernier réglage n'est pas une coquetterie : il dépend de la surface
  qui porte l'accordéon, pas du composant. Sur une section grise il faut du
  blanc, sur une section blanche il faut du gris, et dans un panneau blanc il ne
  faut rien — c'est alors le seul élément ouvert qui pose sa couleur, ce qui est
  précisément ce qui rend l'ouverture visible. La valeur juste n'étant connue
  que de l'appelant, elle est passée en paramètre.

  ⚠️ **Le libellé ne change PAS de corps à l'ouverture**, bien que la maquette
  de page pilier l'agrandisse de 22 à 26px (nœuds 466:1483 et 466:1458) — celle
  de la home ne le fait pas (441:412). Changer le corps du titre décale le texte
  sous le curseur et fait sauter la pile : c'est le défaut relevé sur
  l'accordéon des piliers. Écart assumé, et le même dans les deux blocs.
- **Badge** (`Badge.astro`) — pastille, variante `glass` (sur photo) ou `solid`.
  Deux options : `dot` (point vert de 6px en tête) et `icon` (coche).
- **Pastille de page** (`Badge` en `size="lg"`) — mêmes formes, mais elle porte
  une phrase et non un mot : padding 25/15, corps de texte courant. Deux tons,
  `lime` (étiquette de pilier, en `block` — elle fait la largeur de la carte
  qu'elle coiffe) et `grey` (note qui annonce un module).
- **Défilé de pastilles** — bande du hero, deux groupes identiques bout à bout,
  animés de leur propre largeur. Quand le premier a défilé, le second occupe
  exactement sa place : la boucle est invisible. Le doublon porte `aria-hidden`,
  un lecteur d'écran n'entend la liste qu'une fois. Aucun JavaScript.

## 5 bis. Gabarit des pages de contenu

Relevé sur la maquette « page pilier » (nœud `466:1352`), première instance
dessinée du gabarit de `pages-contenu.md`. Ces composants servent les ~55 pages
des 4 piliers ; la home n'en utilise aucun.

| Composant | Rôle | Fond de section |
|---|---|---|
| `PageHero` | carte photo encartée, pastille de pilier + carte de verre (H1, réponse, CTA) | `white-primary` |
| `LeadStatement` | grand paragraphe centré + pastille de note | `white-primary` |
| `PowerWidget` | bande photo pleine largeur + panneau de verre (curseur) | photo |
| `Essentials` | 3 cartes chiffres + 2 cartes conditions + panneau de ponts | `white-primary` |
| `DeepDive` | accordéons lime dans un panneau blanc + image | `shade-grey` |
| `Faq` | partagé avec la home, contenu en props | `white-primary` ici, `shade-grey` sur la home |
| `FinalCta` | partagé avec la home, contenu en props | idem |

**Le hero de page n'est pas celui de la home.** C'est une carte dans le flux,
pas un plein écran, et il n'amorce rien : il porte la réponse en 1-2 phrases,
qui est ce qui peut gagner le featured snippet. Le H1 y vit dans une carte de
609px — les 60px du hero de la home y donneraient six lignes, d'où
`--text-h1-page-size` (26 → 32px).

⚠️ **`id="hero"` est un contrat avec `NavBar`, pas un ancrage décoratif.** La nav
observe `#hero` pour basculer entre son état posé sur la photo (`absolute`, il
défile avec le hero) et son état détaché (`fixed`, la barre qui suit), et pour
faire paraître son CTA au bon moment. `PageHero` l'a d'abord omis : l'observateur
ne tournait jamais, le header restait absolu, disparaissait au premier
défilement et ne revenait plus. Le symptôme ne ressemblait pas à sa cause — la
page passait pour « moins fluide », comme si Lenis n'y tournait pas, alors qu'il
animait exactement comme sur la home (46 positions intermédiaires par impulsion
de molette, mesurées sur les deux). L'identifiant est désormais porté par le
composant, donc acquis pour les ~54 pages à venir.

**Ni parallaxe ni défilé de pastilles.** Ces gestes appartiennent à l'ouverture
du site ; répétés sur 55 pages, ils cesseraient d'être un accent (règle d'or #5).

**Deux styles typographiques nouveaux**, tous deux relevés dans Figma :
`big-text` (Circular Book 36/0,96) pour le paragraphe d'intro, et `body-bull`
(Circular Book 18/20, allégé à 16) pour le texte des cartes — la maquette passe
au display dès qu'un texte vit **dans** une carte colorée, l'Inter restant au
texte courant de la page.

### Le module « Puissance installée »

Cas d'école de la règle d'or #4 : la relation entre puissance et prix est une
variable, donc un curseur. Et de la règle d'or #3 : ce n'est **pas** un second
simulateur — il ne demande rien, ne connaît ni région ni consommation, ne retient
rien, et se termine sur un pont vers `/simulateur`.

- Le calcul vit dans `scripts/powerEstimate.ts`, **testé à part** (11 cas).
  `scripts/powerWidget.ts` ne fait que du câblage DOM.
- **Le module rend son état par défaut en HTML, chiffres compris.** Le script
  réécrit des nœuds de texte existants, il n'en construit aucun : la page reste
  lisible et indexable sans JavaScript (règle d'or #1), et rien ne clignote au
  chargement puisque rien n'est réécrit avant le premier déplacement.
- **Pas de 0,1 kWc et poursuite animée.** À 1 kWc, la plage n'offrait que huit
  positions : le pouce sautait d'un cran à l'autre et les chiffres basculaient
  sans transition. Le pas fin rend le glissé continu ; une boucle `rAF` fait
  ensuite *poursuivre* les chiffres, qui traversent les valeurs intermédiaires en
  décélérant (`easeOutCubic`, réutilisé de `countUp.ts`, sur 320 ms).
  Le prix reste quantifié au demi-millier : c'est la **cible** qui saute de 7 500
  à 8 000, l'interpolation qui traverse 7 600, 7 700… La fourchette est préservée,
  le mouvement paraît continu.

  ⚠️ **Deux vitesses cohabitent, et les confondre casse l'effet.** La puissance
  affichée et le remplissage de la piste (`--power-ratio`) sont **immédiats** :
  ils collent au pouce, qui suit le doigt sans inertie. Les trois chiffres et la
  jauge de prix (`--price-ratio`) sont **poursuivis** : ce sont des conséquences,
  pas la commande. Une seule variable pour les deux ferait traîner le
  remplissage derrière la poignée. Une seule boucle porte toute la poursuite —
  chiffres et jauge ne peuvent donc pas se désynchroniser.

  ⚠️ **Le pas fin a révélé un défaut de virgule flottante.** `4.3 * 1000` vaut
  `4300.000000000001`, et `Math.ceil` du quotient rendait **11 panneaux au lieu
  de 10**. Invisible avec un pas entier. `estimate` convertit désormais en Wc
  entiers avant toute division, et un test balaie toute la plage au pas réel.

  ⚠️ **La liste des résultats n'est plus une région live.** Avec l'interpolation,
  un lecteur d'écran annoncerait des dizaines de valeurs par glissé. L'annonce se
  fait une fois, à la fin du geste (`change` et non `input`), dans une région
  dédiée. Le curseur porte en plus un `aria-valuetext` — sans lui il s'annonce
  « 6,4 », un nombre nu.

  ⚠️ **Pas de `tabular-nums` sur la puissance affichée**, contrairement aux
  tuiles. Depuis qu'elle porte une décimale, la chasse tabulaire donne à la
  virgule la largeur d'un chiffre : « 6,4 kWc » se lit « 6 , 4 » et gagne 12px.
  Elle est calée à droite, donc elle grandit vers la gauche sans faire bouger le
  titre — elle n'a pas besoin d'être tabulaire.

  Compromis accepté : une flèche du clavier avance de 0,1 kWc, soit 70 appuis
  pour traverser la plage. C'est le comportement natif d'un curseur fin ;
  PageUp/PageDown (0,7 kWc) et Home/End restent disponibles.
- **Tous les prix de la page sortent de ce module**, y compris ceux des cartes
  de « L'essentiel » et de la réponse du hero. La maquette Figma se contredit
  d'un bloc à l'autre (10 kWc à 14 000 € dans le widget, 10 000 € dans les
  cartes, pour un texte qui affirme que le €/Wc baisse) ; les dériver d'une
  source unique rend cette divergence impossible.
- Modèle retenu : **part fixe + part proportionnelle à la puissance**, ce qui est
  exactement ce que la page explique. Un modèle en « €/Wc dégressif » a été
  essayé et abandonné : couplé à l'arrondi en fourchette, il faisait *remonter*
  le prix au Wc entre 4 et 5 kWc.
- ⚠️ **Constantes à valider par le client.** Tant qu'elles ne le sont pas, aucun
  de ces chiffres n'est un prix.
- Aucune espace ordinaire entre un nombre et son unité : U+202F des deux côtés
  (`&#8239;` au rendu serveur, `THIN_NBSP` dans le script). Deux caractères
  différents et la valeur se décale au premier déplacement.

### Le mobile n'est pas le desktop rétréci

Relevé sur la maquette téléphone (nœud `466:1816`, iPhone 390px). Trois écarts
sont **structurels**, pas cosmétiques :

1. **Les grilles de « L'essentiel » ne changent pas.** Trois chiffres de front et
   deux conditions côte à côte, du 320 au 1440. Les empiler détruirait la seule
   chose que le bloc sert à faire — comparer les fourchettes d'un coup d'œil ;
   il faudrait alors défiler pour opposer 3 et 10 kWc. Ce qui s'adapte, ce sont
   les paddings, le rayon et la typographie. Même raisonnement pour les trois
   tuiles du widget.
2. **L'image de « Creuser le sujet » disparaît sous 1024px.** Elle n'illustre
   rien de précis, elle équilibre une mise en page à deux colonnes. Empilée,
   elle n'ajouterait qu'un téléchargement. `display: none` sur son conteneur +
   `loading="lazy"` : le fichier n'est jamais demandé.
3. **Le hero perd son retrait** et ne garde que ses coins bas, comme celui de la
   home. Un cadre détaché de 16px sur un écran de 390 mange 8 % de la photo.

**Deux styles typographiques MOBILES publiés par Figma**, pas des réductions
inventées : `h3-m` (Circular Medium 16/16) et `petit_p-m` (Inter Regular 14/16).
⚠️ Le second **change de famille** — le texte des cartes est en Circular sur
desktop (`body-bull`) et repasse en Inter sur mobile, où le Circular Book perd
sa lisibilité en petit corps.

⚠️ **Un palier de 360px** existe dans `tokens.css`, et ne sert qu'au montant des
cartes chiffres. Les maquettes sont dessinées sur 390 ; à 320, « 11 500 € » en
24px mesure 85px pour une carte qui n'en fait que 75.

⚠️ **Le piège `min-width: auto`.** Un élément de grille ne descend pas sous la
largeur minimale de son contenu. Avec un montant en `nowrap`, `1fr` cessait de
rétrécir et les cartes débordaient de la page sous 360px — sans qu'aucune règle
ne paraisse fautive. `min-width: 0` sur les éléments des deux grilles serrées.

`Button` gagne une option **`wrap`** : le libellé peut passer à la ligne, ce que
la maquette mobile fait pour les boutons des ponts. Réservé aux boutons qui
remplissent une colonne étroite — un CTA de nav qui se casse en deux perd sa
forme de pilule.

**Deux divergences assumées avec la maquette mobile :**
- Elle pose la pastille et la carte du hero sur 318px, soit 16px de marge à
  gauche et 56 à droite. Repris en 16/16 : l'asymétrie ne correspond à rien
  ailleurs sur la page, elle se lit comme une dérive de dessin.
- Elle met le CTA final sur `shade-grey` alors que la maquette desktop le met sur
  `white-primary`. Gardé blanc : un fond de section qui change avec la largeur de
  la fenêtre n'est pas une décision de design.

### Images des pages de contenu

`npm run images -- --only=3.1` (`scripts/optimize-images.mjs`, sharp) convertit
les photos livrées par le client en WebP 2560px q82 vers `src/assets/pages/`,
avant que `astro:assets` produise les variantes responsives. Ce n'est pas un
doublon du pipeline Astro : les fichiers livrés font 0,5 à 1,5 Mo pièce et le
dépôt en portera une cinquantaine. Le script est idempotent.

**`--only` n'est pas une commodité.** Les pages sont livrées une par une ; sans
ce filtre, construire la page 3.1 déposerait dans le dépôt les WebP des
cinquante pages qui n'existent pas encore — exactement le poids que le script
sert à éviter.

⚠️ **Deux `<Image>` qui partagent une source doivent partager leur `quality`.**
La bande du widget reprend la photo du hero. À 75 contre 85, `astro:assets`
générait un **second jeu complet de variantes** : 101 Ko de plus sur desktop pour
une image déjà en cache. Les deux sont désormais à 85, le navigateur ne
télécharge qu'une fois. Toucher à l'une sans l'autre ramène le doublon, sans
aucun signal.

Charge mesurée sur `/rentabilite-prix`, images comprises :

| | Fichiers | Poids |
|---|---|---|
| Desktop 1440 | 3 | 230 Ko |
| Mobile 390 | 2 | **38 Ko** |

L'écart vient de deux choses : les variantes responsives, et le fait que l'image
de « Creuser le sujet » n'est **pas téléchargée** sous 1024px — son conteneur est
en `display: none` et l'image en `loading="lazy"`, donc elle n'entre jamais dans
le viewport. C'est le gain, mesuré, de la décision documentée plus haut.

## 6. Mouvement

| Token | Valeur |
|---|---|
| `--duration-fast` | 150ms — survols, changements de couleur |
| `--duration-medium` | 250ms — accordéons, ouvertures |
| `--duration-slow` | 400ms — fondus croisés (liens du footer), apparition du texte des piliers |
| `--duration-roll` | 240ms — roulement du libellé des CTA |
| `--duration-expand` | **560ms** — ouverture des piliers |
| `--duration-marquee` | 60s — un groupe entier du défilé de pastilles |
| `--easing-default` | `ease` |
| `--easing-bounce` | `cubic-bezier(0.34, 1.28, 0.64, 1)` — dépassement d'environ 7 % |
| `--easing-expand` | `cubic-bezier(0.4, 0.05, 0.2, 1)` — **aucun** dépassement |

**Les deux courbes ne sont pas interchangeables.** `--easing-bounce` est réservé
aux **roulements de libellé**, où le rebond est voulu sur une course de 240ms —
les CTA (`Button.astro`) et les liens des méga-menus, qui partagent le même
geste. Partout ailleurs il claque : sur l'image d'un pilier, un dépassement de
2,6 % (5px) se lisait comme un à-coup.

Le roulement est **réservé aux libellés qui portent une flèche** : les CTA, et
dans les méga-menus la vue d'ensemble et les rampes. Les liens de colonne, eux,
reprennent le traitement du footer — mise en retrait des voisins en fondu lent,
et **zones de survol jointives** (`padding-block` repris par une marge négative).
Sans ces zones jointives, l'écart entre deux liens est un angle mort où plus
aucun n'est survolé : toute la colonne se rallume le temps du passage.

Sa course est portée par `--label-roll-lift` — sans préfixe `btn-`, puisque le
geste ne sert plus seulement les boutons.

Le roulement lui-même vit dans `global.css` (`@keyframes label-roll`), et non
dans un composant : il en sert deux. L'appelant fournit le cadre de coupe —
`overflow: hidden` et **`line-height: normal`**, faute de quoi le cadre rogne les
jambages des p, q et j. Sur un libellé souligné, le cadre a besoin en plus d'un
`padding-bottom` repris par une marge négative : le trait est posé sous la ligne
de base, donc hors du cadre, qui le couperait.

### Le voile de survol de la nav a ses propres courbes

La nav porte **deux** pilules. La **lime** marque la page courante, en CSS pur,
et ne bouge jamais. Le **voile clair** suit le curseur — c'est lui, et lui seul,
que ce qui suit décrit.

Le voile a **deux dosages**, pour la même raison que le verre : ce qui marque sur
une photo ne marque plus sur du blanc. Sur le hero, la barre compose ~`#909FAB`
et le voile clair (`--bg-pill-hover`) ~`#DEE1E4`. Détachée, la barre compose
`#FCFEFE` — un voile blanc y donnerait `#FEFEFC`, soit **un écart nul**. D'où
`--bg-pill-hover-detached`, un voile ink : seul un assombrissement peut marquer
une surface déjà quasi blanche.


| Token | Valeur |
|---|---|
| `--duration-pill` | 420ms |
| `--easing-pill-lead` | `cubic-bezier(0.34, 1.12, 0.64, 1)` — ~4 % de dépassement, bord avant |
| `--easing-pill-trail` | `cubic-bezier(0.55, 0, 0.35, 1)` — aucun dépassement, bord arrière |

La pilule est posée en `left`/`right`, et **ses deux bords ont des courbes
différentes** : celui qui va dans le sens du déplacement mène et dépasse un peu,
l'autre traîne puis rattrape. **Ce décalage EST l'allongement** — il n'y a
aucune image-clé « milieu », et régler l'étirement revient à rapprocher ou
écarter les deux courbes. Le sens du trajet, seul, est décidé en JavaScript
(`data-dir`) : durée, courbes et étirement restent au CSS.

⚠️ **`--easing-bounce` n'a délibérément PAS été repris**, bien qu'il rebondisse
lui aussi — ce n'est pas un doublon. Il reste réservé au libellé des boutons, et
le constat qui l'y cantonne (« même réduit à 0,4 %, un rebond se lisait comme un
à-coup ») portait sur **l'accordéon des piliers**, un grand bloc qui se déplie.
Une pilule de 100px qui glisse n'est pas le même objet.

⚠️ **On anime `left`/`right`, pas `transform: scaleX()`**, à contre-courant du
réflexe compositeur : un `scaleX` déforme le `border-radius` et les extrémités
arrondies deviennent des ellipses pendant l'étirement, ce qui se voit sur un
aplat lime. L'élément est hors flux et sans enfant : le coût se limite à lui.

Le texte de l'entrée survolée passe au foncé (classe `is-lit` posée par le
script) : sur le hero les libellés sont blancs, et ils tomberaient à ~1,2:1 sur
le voile clair. L'entrée courante n'en a pas besoin — son lime porte déjà sa
couleur de texte en CSS.

Le lime étant **opaque** et peint sur les entrées (`z-index: 2`) tandis que le
voile est en `z-index: 1`, celui-ci passe **dessous** : survoler l'entrée
courante le masque entièrement, et le croiser en trajet aussi. Aucune
superposition n'est gérée en code, c'est la pile qui s'en charge.

⚠️ **L'écart entre deux entrées de nav est DÉRIVÉ du padding des chips**, jamais
posé en dur. Une entrée porte un padding horizontal et une marge négative égale :
son chip est donc plus large que la place qu'elle occupe, et deux chips voisins
ne se séparent que si l'écart de mise en page dépasse **deux fois** ce padding.
Avec 16px de padding et 25px d'écart, ils se mordaient de 7px. Le défaut est
resté invisible tant qu'un seul chip était affiché à la fois ; les deux pilules
l'ont révélé. D'où :

```css
gap: calc(var(--pad-nav-chip) * 2 + var(--gap-nav-chip));
```

Toucher à `--pad-nav-chip` sans cette dérivation ramènerait le chevauchement.

`--easing-expand` a été choisi en deux temps. Supprimer le rebond ne suffisait
pas : une courbe très chargée au départ (type `ease-out-expo`) abattait **71 % du
trajet dans le premier quart du temps** puis rampait, ce qui claquait tout autant
malgré une durée doublée. La courbe retenue répartit le mouvement — 1 % à un
dixième du temps, 16 % au quart, 70 % à la moitié.

560ms est volontairement **hors de l'échelle** 150/250/400 : en dessous d'une
demi-seconde, le déploiement restait perçu comme brusque quelle que soit la
courbe. La durée fait le registre autant que la courbe.

### Principes

**Le CSS d'abord, le JavaScript en dernier recours.** La parallaxe du hero et
l'apparition des blocs utilisent des **timelines de défilement**
(`animation-timeline`) : rien ne tourne sur le fil principal, l'animation est
portée par le compositeur. Un `@supports` les rend inoffensives là où elles ne
sont pas supportées — le contenu reste visible, jamais masqué.

Le JavaScript n'intervient que là où le CSS ne peut pas : mémoriser le dernier
élément survolé (piliers), suivre une position de défilement (témoignages),
compter (chiffres clés).

⚠️ **Ne jamais utiliser le raccourci `animation`** avec une timeline. Le
minifieur y replie `animation-timeline`, que les navigateurs n'acceptent pas
encore dans le raccourci : la déclaration devient invalide et l'animation ne
part jamais — silencieusement. Toujours les propriétés détaillées.

### Inventaire

| Effet | Mise en œuvre |
|---|---|
| Apparition des blocs | fondu + montée, `--reveal-rise` 40px, course en `cover`, décélération |
| Apparition des en-têtes | **fondu seul** — `--reveal-rise` à 0 sur `.heading` |

⚠️ **`visibility` est une propriété DISCRÈTE.** Mise en transition avec une
durée, elle bascule à 50 % du parcours : l'élément reste masqué la première
moitié du fondu, puis surgit d'un coup à mi-opacité. C'est ce qui rendait
l'apparition du CTA du header sèche, bien plus que sa durée. Partout où elle
accompagne un fondu — CTA, panneau mobile, méga-menus — elle s'écrit donc en
`0s` avec un **retard** : nul à l'apparition, égal à la durée à la disparition.

Le retard passe par une **variable**, jamais par `transition-delay` : plusieurs
règles concurrentes posent chacune leur raccourci `transition`, et un délai posé
à part disparaîtrait selon laquelle l'emporte.

⚠️ **Les en-têtes ne montent pas, et les blocs si.** C'est du texte : le voir
glisser oblige l'œil à le suivre avant de pouvoir le lire, alors qu'une carte ou
une grille supporte très bien d'arriver en mouvement. La distinction se fait par
la course seule — `reveal-rise` interpole vers l'identité, une course nulle ne
laisse donc que l'opacité. Aucune seconde animation à maintenir, et la montée
revient en changeant cette unique valeur.
| Parallaxe du hero | `--hero-parallax-shift` 48px, timeline de défilement |
| Survol des CTA | inversion de la pilule, roulement du libellé, flèche à −45°, enfoncement `--btn-press-scale` 0.97 |
| Survol des liens à flèche du méga-menu | roulement du libellé + flèche à −45° |
| Survol des liens de colonne du méga-menu | mise en retrait des voisins, comme au footer — **pas** de roulement |
| Accordéon des piliers | variable `--open`, 560ms sans dépassement, texte révélé après élargissement |
| Défilé des pastilles | deux groupes en boucle, `transform` seul, pause au survol |
| Chiffres clés | montée depuis zéro, décélération cubique, une seule fois |
| Nav | repli au défilement descendant, réapparition à la remontée — **suspendu tant qu'un méga-menu est ouvert** |
| CTA du header | fondu + descente + échelle depuis `--cta-enter-scale`, sur `--duration-slow` |
| Panneau mobile | fondu, `--duration-medium` — il est plein écran, rien ne s'y déplace |
| Voile de survol de la nav | suit le survol et le focus, s'allonge en trajet, disparaît à la sortie (la pilule lime, elle, ne bouge pas) |
| Méga-menus | la coquille de verre persiste et change de hauteur d'un pilier à l'autre ; le contenu paraît ensuite en fondu montant |
| Méga-menu | carte opaque ancrée sous l'entrée, `<details>` natif, chevron à 180° |
| Défilement fluide | Lenis, **desktop et pointeur fin uniquement**, en import dynamique |

⚠️ **Le délai d'apparition du texte des piliers doit valoir exactement
`--duration-expand`.** Il valait 250ms, ce qui coïncidait avec l'ancienne durée ;
en portant celle-ci à 560ms, le texte paraissait en pleine expansion et se
recomposait sous les yeux — le paragraphe garde ses deux lignes mais gagne encore
une dizaine de pixels de large sur la fin, assez pour déplacer les mots. Si la
durée change, le délai doit suivre.

`prefers-reduced-motion` neutralise **tout** : parallaxe, apparitions,
roulements, rebonds, avance automatique du carrousel. Seuls les changements de
couleur subsistent.

## Pièges connus

Deux incohérences sont **conservées volontairement**, parce que les corriger
coûterait la traçabilité avec Figma :

1. **`display-mid` (44px) égale `h1`.** Il ne sert plus qu'aux chiffres clés.
2. **Quinze paddings ponctuels** (`--pad-*`) relevés nœud par nœud : 15, 20, 25,
   35, 40, 45, 50px. Ils ne forment pas une échelle, c'est un relevé. Chacun est
   tracé à son nœud Figma en commentaire.

`display-little` (22px) s'intercale entre `h3` (26) et `h4` (20). C'est une
autre famille — un style Book, pas un niveau de titre — donc sans ambiguïté.

La rangée utilitaire du header n'a **aucun fond** : le dégradé qu'elle portait
était le dernier du site et ne se lisait pas sur un ciel bleu-gris. Son contenu
est justifié — téléphone à gauche, région et langue à droite.

⚠️ Lui donner un **corps de verre** a été essayé, puis abandonné : deux pilules
supplémentaires au-dessus de celle de la nav surchargeaient le haut du hero. Le
problème de cette rangée n'est pas qu'elle manque de forme, c'est qu'elle porte
trop d'items. Ne pas y revenir par le décor.

## Assets

- **Polices** : `public/fonts/circular-std/*.woff2` (5 graisses + italiques),
  Inter et Geist Mono via `@fontsource`.
- **Images** : `src/assets/` — hero, équipe, Enphase, 2 étapes, 4 piliers,
  logotype. Toutes passent par `astro:assets` (WebP, `srcset`, dimensions
  déclarées).
- ⚠️ **`sizes` doit refléter la largeur RENDUE**, pas celle du cadre : avec
  `object-fit: cover` sur un cadre plus haut que large, remplir la hauteur
  demande une source nettement plus large. Une déclaration trop basse produit
  des images pixelisées.
- **Cadrage du hero** (`--hero-image-zoom`, 175 %) : à partir de 768px, c'est la
  **hauteur** qui pilote le recadrage, la largeur suivant le ratio de la source
  et débordant de chaque côté. En `object-fit: cover` seul, l'échelle dépendait
  de la largeur de l'écran — 0,41× à 1920 contre 0,27× à 1280, où la maison
  paraissait deux fois plus petite. `max-width: none` est indispensable, un
  plafond global empêchant sinon tout débord. Le mobile garde le plein cadre :
  un tel débord y couperait la maison.

## Ouvert / à valider

- [ ] **Licence webfont Circular Std.**
- [ ] **Contraste des pastilles de réassurance : 2,31:1**, sous le seuil AA de
      4,5:1 pour du 14px. Texte blanc sur voile clair — arbitrage esthétique du
      client, qui a écarté les deux options conformes mesurées (texte en encre,
      7,11:1 ; voile inversé vers l'encre, 9,77:1). Seul point du site sous le
      seuil. Monter l'opacité du voile n'y changerait presque rien : c'est
      l'écart de luminosité qui manque, pas la netteté du fond.
- [ ] **6 emplacements photo** encore à fournir (composant `ImagePlaceholder`).
- [x] ~~2 photos de la page Rentabilité & prix~~ — livrées le 2026-08-14
      (`3.1-prix-panneaux-hero.jpg`, `3.1-prix-panneaux-module.jpg`) et branchées.
      Le hero sert AUSSI de fond à la bande du widget : un seul fichier, un seul
      téléchargement. `img/pages/` contient en plus les heros des sous-pages
      3.2 à 3.4, qui attendent leurs pages.
- [ ] **Photo de « Creuser le sujet »** — le client a fourni une vue aérienne de
      maison là où la maquette montrait un technicien avec une tablette. Ça
      fonctionne, mais l'illustration n'a plus de rapport avec le contenu du bloc
      (arbitrages techniques). À confirmer avec lui.
- [ ] **Hypothèses de prix du module « Puissance installée »** — part fixe
      (1 500 €) et part par kWc (1 000 €), 430 Wc/panneau, 900 kWh/kWc·an.
      Elles s'écartent de la copie Figma pour 5-6 kWc et 10 kWc, qui se
      contredisait d'un bloc à l'autre. À trancher avec le client.
- [ ] **Les 9 avis clients sont fictifs** — publier de faux avis est une pratique
      commerciale trompeuse. À remplacer avant toute mise en ligne.
- [ ] **Téléphone** (`+32 2 XXX XX XX`), mentions légales, RGPD.
- [ ] **Textes des cartes piliers 2 à 4** — écrits faute de source Figma.
- [ ] Logo : le fichier fourni est en couleurs fixes. Une version monochrome
      serait nécessaire pour un fond sombre, et un SVG pour la netteté.
- [ ] Interlettrage : confirmer la lecture en pourcent côté Figma.
