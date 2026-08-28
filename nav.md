# Navigation & header

> Hub : `../CLAUDE.md`. Voir aussi `architecture.md`.

## Principe

5 entrées maximum, **2 niveaux visibles maximum**, **un seul CTA de conversion**,
une rangée utilitaire au-dessus. La profondeur SEO vit dans des méga-menus groupés
+ le footer, jamais dans une cascade infinie (≠ l'ancien site).

## Où vit le header

Dans `BaseLayout`, **pas dans le hero**. Il y a été enfermé un temps, ce qui
interdisait toute navigation sur les ~54 autres pages du sitemap.

Le layout expose `transparentHeader` : vrai sur les pages qui ouvrent sur un hero
photo (la nav s'y pose en transparence), faux partout ailleurs — le header prend
alors son état détaché **dès le rendu**, sinon texte blanc sur fond blanc jusqu'au
premier tick de JavaScript. Au-dessus d'un hero il est `absolute` puis `fixed` une
fois détaché ; sans hero il est `sticky`, donc dans le flux.

⚠️ **Au-dessus du hero, le header se cale sur `--hero-inset`, pas sur 0.** Le hero
est une carte posée en `margin: var(--hero-inset)` : à `top/left/right: 0`, le
header démarre en dehors d'elle, sur le fond blanc de la page. Le décalage n'est
pas cosmétique — `--header-inline-pad` vaut `--container-padding` **moins**
`--hero-inset`, une soustraction qui suppose que cet inset est fourni par
ailleurs. Sans lui, les 60px de Figma tombent à 47. C'est passé à la trappe une
fois, en sortant la nav du hero.

L'**état actif** est dérivé de `Astro.url.pathname` dans le composant. Aucune page
n'a à se déclarer : une page profonde (`/aides-primes/wallonie`) marque son pilier.

## Rangée utilitaire (fine, au-dessus de la barre) — desktop seulement

**Trois items, pas davantage.** Elle en a porté six un temps, cluster confiance
compris : elle en devenait lourde en tête de hero, et lui donner un corps de
verre n'a fait qu'ajouter des objets là où le problème était leur nombre. Le
cluster est descendu dans le **pied des méga-menus**.

- **Téléphone** [À COMPLÉTER] — signal de confiance fort (installateur direct) +
  clic-pour-appeler sur mobile.
- **Sélecteur de région** (Wallonie / Bruxelles / Flandre) — pilote le contenu des aides
  **ET alimente les query params de tous les liens vers `/simulateur` dans la page**.
  Quand l'utilisateur sélectionne une région ici, tous les CTAs simulateur de la page
  doivent se mettre à jour pour inclure `?region=X`.
- **Bascule FR / NL**.

⚠️ **Elle n'existe pas sous 1024px** : son contenu vit alors dans le panneau
mobile. Il y a donc **deux sélecteurs de région dans le DOM** — celui-ci et celui
du panneau. `regionLinks.ts` les câble tous les deux et les synchronise ; n'en
brancher qu'un laisserait l'autre inerte et les deux se contredire à l'écran.

## Cluster confiance

À propos · Nos réalisations · Contact. Ces pages portent l'argument
anti-intermédiaire ; les laisser au seul footer enterrait un actif de conversion.
Elles ne sont **pas** dans la barre principale, pour ne pas concurrencer les
4 piliers.

- **Desktop** : dans le pied de chaque méga-menu, à droite de la rampe. Les trois
  liens s'y répètent d'un panneau à l'autre, sans conséquence — un seul panneau
  est visible à la fois, et ils restent joignables quel que soit le pilier ouvert.
- **Mobile** : en rangées pleine largeur dans le bas du panneau.

## Barre principale

- **Logo** (gauche).
- **« Accueil »**, entrée explicite. Le logo pointe déjà vers `/`, mais il est
  petit sur mobile et se lit comme une marque, pas comme une destination.
- **Deux pilules, deux rôles** — à ne pas refondre en une seule :
  - **La lime dit « vous êtes ici ».** Posée sur l'entrée courante, elle est
    **permanente et ne bouge jamais**. C'est du CSS pur (`.is-active`), sans
    dépendance au JavaScript : la nav ne cesse donc jamais d'indiquer où l'on est.
  - **Le voile clair dit « vous pointez ici ».** Une seconde pilule qui suit le
    survol et le focus, en s'allongeant en cours de trajet. Elle n'a pas de gîte :
    elle naît sur l'entrée survolée et repart en fondu à la sortie, sur toutes
    les pages — y compris celles sans entrée courante (`/a-propos`, `/contact`…),
    qui cessent d'être un cas particulier.

  Le lime étant **opaque** et peint au-dessus, le voile passe dessous : survoler
  l'entrée courante, ou la croiser en trajet, ne demande aucun traitement.
  Mise en œuvre, dosages et courbes : `design.md` §6.
- **4 piliers en méga-menus** :
  - Comprendre
  - Rentabilité & prix
  - Aides & primes
  - Installation
- **Une loupe, en DERNIÈRE position de l'îlot**, après le 4ᵉ pilier. Icône seule,
  pas de champ déployé : le CTA reste le seul objet plein de la barre (règle d'or #2),
  et un champ mangerait la largeur des piliers.
  - Elle porte la classe `header__link` **par nécessité** : `navPill.ts` collecte ses
    cibles par cette classe, la loupe hérite donc du voile de survol sans une ligne
    de script en plus.
  - **Inerte sans JavaScript**, révélée par le script (`is-ready`) en `visibility` —
    sa place reste réservée, les piliers ne bougent pas quand elle paraît.
  - Raccourcis desktop : `/` et `⌘K`.
- **Un seul bouton CTA (droite)** : **« Mon estimation »** → `/simulateur`.
- **PAS d'entrée « Simulateur »** dans la barre : elle ferait doublon avec le bouton
  (décision validée — une seule porte d'entrée, parcours non dilué).
  On accède à `/simulateur` par le bouton, le footer et les liens contextuels du contenu.

## Méga-menus

**Forme** : une **carte de la largeur de la barre**, ancrée sous elle — jamais un
panneau pleine page. C'est la seule forme cohérente dans les deux états de la nav :
une fois le header détaché du hero, la pilule flotte au milieu de la page et une
bande bord à bord paraîtrait orpheline. La carte, elle, suit la pilule.

Rayon 8px (`--radius-2`), verre au dosage le plus couvrant du système
(`--bg-glass-fill-menu`, flou 24px) — neuf liens sur du contenu dense ne
pardonnent pas un voile trop léger. Filet clair `--bg-glass-border`, qui est ce
qui signe l'effet, et aucune ombre (le système n'en a pas).

**Colonnes** : une grille `auto-fit` qui replie. Bornée à la largeur de la barre,
la carte ne tient pas quatre colonnes sur une rangée — elle est donc plus haute
que large. Leviers si besoin : `--width-nav-column` et `--pad-card-lg`.

**Typographie** : un seul style dans toute la carte, `--text-body-nav-*` (celui de
la barre). Titres de colonne et liens ne se distinguent que par la couleur et les
majuscules — pas par une seconde police. Le panneau mobile suit la même règle.

⚠️ Les `<li>` de la barre **ne doivent pas être positionnés** : ce sont des items
flex, `z-index` s'y applique sans `position` (spec Flexbox §5.4). Les positionner
ferait d'eux le bloc conteneur des cartes, qui se recaleraient sur l'entrée et
perdraient leur largeur.

**Le pont de survol est porté par la nav** (`.header__nav::after`), pas par le
panneau. Deux raisons : le panneau découpe son contenu, ce qui rognerait un
pseudo-élément débordant vers le haut ; et la fermeture étant elle-même posée sur
la nav, étendre SA zone de survol est le geste juste. Sa hauteur est simplement
l'écart visible.

Il est **inerte tant qu'aucun menu n'est ouvert** (`:has`), sinon il
intercepterait les clics sur le contenu de la page situé sous la barre.

> Accroché au panneau, il devait remonter jusqu'au libellé en traversant le
> padding de la barre — un calcul à trois termes qui s'était déjà désynchronisé
> une fois, et le menu se refermait en cours de descente.

**Mécanique** : `<details name="header-menu">`. L'exclusivité est **native** —
ouvrir un menu referme l'autre, sans JavaScript, comme `Accordion.astro`. Le clic
et le clavier sont natifs eux aussi ; le JavaScript ne fait qu'ajouter l'ouverture
au survol **sous `(pointer: fine)`** (règle d'or #6), la fermeture à `Escape`, au
clic extérieur, au `focusout` et au défilement.

**Passer d'un pilier à l'autre ne referme rien.** Deux mécanismes s'y ajoutent :

1. **La fermeture au survol est portée par la NAV entière**, pas par chaque menu.
   Posée sur le menu, elle se déclenchait dans l'écart entre deux entrées : le
   premier panneau se refermait avant que le second ne s'ouvre — c'était le saut.
   `pointerleave` suivant le DOM et non la géométrie, descendre dans un panneau
   ne quitte pas la nav.
2. **Une coquille partagée** (`.header__menu-shell`) porte le verre, le rayon et
   le filet ; les panneaux ne gardent que leur contenu. Elle n'est jamais
   démontée : seule sa hauteur se déplace d'un pilier à l'autre. Même motif que
   la pilule de survol — un élément décoratif dimensionné par le script, avec le
   même repli : sans JavaScript, la classe `has-shell` n'est pas posée et chaque
   panneau garde son propre fond.

La hauteur est synchronisée par un **MutationObserver sur l'attribut `open`**, et
non branchée sur les gestes : un seul point de vérité, qui attrape survol, clic,
clavier, Échap, défilement et clic extérieur sans qu'aucun ait à y penser.

⚠️ **Le panneau est le FRÈRE du `<details>`, pas son enfant.** Tant qu'il était
dedans, il passait de « non rendu » à « rendu » à chaque ouverture — or une
transition exige une valeur de départ **à l'état rendu**, qui n'existait donc
pas. Sa hauteur sautait au lieu de glisser, et son contenu paraissait avant la
coquille. Aucun réglage de durée ni recalcul forcé ne peut contourner ça : c'est
la structure qui l'imposait. Rendu en permanence et simplement masqué en
`visibility`, il redevient transitionnable.

C'est le motif ARIA canonique du disclosure — un déclencheur, puis le contenu
qu'il pilote juste après dans l'ordre de lecture — et `visibility: hidden` garde
les liens d'un menu fermé hors de la tabulation et de l'arbre d'accessibilité.

⚠️ Conséquence pour le script : le panneau ne se cherche plus depuis le
`<details>` mais depuis `.header__item`, et le test du `focusout` porte sur
`.header__nav` — viser `.header__menu` refermerait le menu dès qu'on tabule dans
son propre panneau.

**Le panneau découpe son contenu à la silhouette de la coquille.** Le contenu est
à sa hauteur définitive dès l'ouverture ; sans découpe, son bas pendrait hors du
verre pendant toute la croissance. Le panneau porte donc la même hauteur et la
même transition que la coquille, et une **enveloppe intérieure**
(`.header__panel-inner`) garde la hauteur naturelle. C'est elle que le script
mesure : mesurer le panneau reviendrait à lire sa propre sortie.

⚠️ `--menu-shell-h` est posé sur **`.header__list`**, pas sur la coquille : les
panneaux sont ses frères et n'en hériteraient pas, alors qu'ils en ont besoin
pour se découper.

Conséquence assumée : le `<summary>` d'un pilier **n'est pas un lien**. La page du
pilier est reprise en tête du panneau (« Vue d'ensemble → ») et reste liée depuis
le footer. C'est le prix du `<details>` natif.

Tant qu'un menu est ouvert, le repli de la nav au défilement est **suspendu** : une
barre qui se replie en emportant un menu ouvert se lit comme un bug.

- Groupés, lisibles, 2 niveaux max. Contenu = les pages listées dans `architecture.md`.

## Pages pas encore livrées

`src/data/site.ts` porte l'arborescence **complète** (~42 liens), chaque lien
marqué d'un drapeau `published`. **Absent = non publié** : la logique est inverse
exprès, pour qu'un oubli produise un lien manquant et jamais un 404 indexé
(règle d'or #1). Header et footer filtrent par le même helper `publishedLinks`,
seule source de vérité — sinon les deux arborescences divergent à la première page
publiée. À la bascule Sanity, ce drapeau devient l'existence du document.
- **« Aides & primes » est organisé PAR RÉGION** (3 colonnes : Wallonie / Bruxelles / Flandre),
  pas par thème. C'est le différenciateur vs la concurrence.
- Chaque méga-menu se **referme sur une rampe vers le simulateur avec query params région** :
  - Colonne Wallonie → `Calculer ma prime → /simulateur?region=wallonie`
  - Colonne Bruxelles → `Calculer ma prime → /simulateur?region=bruxelles`
  - Colonne Flandre → `Bereken mijn premie → /simulateur?region=flandre`
  - Autres méga-menus (Comprendre, Rentabilité, Installation) → `/simulateur?region=X`
    où X est la région active dans le sélecteur de la rangée utilitaire (si définie), sinon lien
    sans param (le simulateur demandera la région en premier).

**Règle** : une rampe de méga-menu vers le simulateur sans param région est une occasion manquée.
Le méga-menu Aides est organisé PAR RÉGION précisément pour que la région soit connue au moment du clic.

**Mise en œuvre** : `src/scripts/regionLinks.ts` (module pur + tests). Il mémorise
la région choisie (localStorage) et réécrit tous les `a[href*="/simulateur"]` de la
page. Les rampes régionales du menu Aides en sont exclues par `data-region-lock` :
elles portent LA région de leur colonne, pas celle du sélecteur — les écraser
casserait le seul endroit du site où la région est certaine au moment du clic.

## Mobile (prioritaire — trafic majoritairement mobile)

Sous 1024px, le header se réduit à **deux choses** : le logotype et le burger.
La rangée utilitaire disparaît, tout son contenu passant dans le panneau.

**La rangée logo + burger est épinglée** (`position: fixed`), pas seulement le
bouton. Deux raisons : épinglés séparément, les deux n'auraient été alignés que
par leurs bords hauts — ils n'ont pas la même hauteur, 26px contre 32px. Et
`fixed` plutôt que `sticky` parce qu'au-dessus du hero le header est absolu, donc
il défile avec lui : un `sticky` n'aurait rien à quoi se raccrocher.

⚠️ Épinglée, cette rangée ne réserve plus sa place dans le flux. Le header porte
donc une **hauteur minimale** sous 1024px, sinon le contenu d'une page sans hero
remonte sous le logo. Elle est calculée avec la même expression que le retrait
haut du panneau — les deux dégagent le même objet.

⚠️ Le logo est **remontré** en état détaché sous 1024px. La règle qui le masque
sert à tenir la colonne de gauche du desktop, pour que la pilule de nav ne se
décale pas au changement d'état — or cette pilule n'existe pas sur mobile, et le
logo doit accompagner le burger en permanence.

### Le panneau

- **Plein écran** (`inset: 0`, `100dvh`). `dvh` et non `vh` : la barre d'URL se
  rétracte au défilement, et `vh` fige la hauteur d'avant en laissant une bande
  morte en bas.
- **Fond de verre** conservé, au dosage des méga-menus.
- Rendu en permanence et masqué en `visibility`, jamais en `hidden` : un élément
  qui passe de « non rendu » à « rendu » n'a pas d'état de départ, donc pas de
  transition. C'est ce qui lui permet de paraître en fondu.
- Le 2ᵉ niveau se déplie en **accordéons** (`<details name="header-panel-menu">`),
  pas en glissement : tout reste à un tap, aucun état de navigation à tenir.
- **Le burger devient une croix** quand le panneau est ouvert, et reste au-dessus
  de lui (`z-index` supérieur) : c'est lui qui referme.
- **Verrou de défilement** sur le corps de page tant qu'il est ouvert — sinon la
  page défile derrière et on la retrouve ailleurs en refermant. Il se relève
  aussi au passage en desktop, où le panneau disparaît par `display: none`.

### Ordre du panneau

0. **La recherche**, en tête, avant Accueil. Dessinée comme un champ et non comme
   une icône : le panneau est une liste de destinations, une loupe seule s'y lirait
   comme une rubrique de plus. Ce n'est PAS un `<input>` — la saisie a lieu dans le
   dialogue qui se pose par-dessus ; deux champs voudraient dire deux états à
   synchroniser, et sur iOS le clavier s'ouvrirait sur le mauvais.
1. Accueil, puis les 4 piliers en accordéons ;
2. **le CTA**, juste après le dernier pilier — il clôt la navigation ;
3. le bas de panneau, repoussé par une marge automatique : cluster confiance et
   téléphone en rangées pleine largeur, puis **région et FR / NL**.

⚠️ La marge automatique appartient au **bas de panneau**, pas au CTA. Sur le CTA,
elle le collerait au bas de l'écran avec un vide au-dessus.

### Empilement (`z-index`)

Trois niveaux se croisent, et l'ordre n'est pas décoratif :

| Élément | `z-index` |
|---|---|
| Overlay de recherche | *couche supérieure* |
| Rangée logo + burger, épinglée | 30 |
| Panneau plein écran | 20 |
| Header | 10 |

Le burger **doit** rester au-dessus du panneau : c'est le seul moyen de refermer.

⚠️ **La recherche n'a pas de rang.** C'est un `<dialog>` ouvert en `showModal()` :
il vit dans la « couche supérieure » du navigateur, au-dessus de tout, sans entrer
dans cette échelle. Rien à arbitrer ici — et on gagne au passage le piège de focus,
l'inertie du reste de la page, Échap et le fond, qu'un overlay maison aurait fallu
écrire à la main.

⚠️ **Échap appartient à la recherche quand elle est ouverte.** Les gestionnaires
d'Échap du panneau mobile et des méga-menus doivent l'ignorer dans ce cas, sinon
UNE pression referme les deux — or on ouvre la recherche DEPUIS le panneau, et on
doit revenir au menu, pas se retrouver sur la page.

⚠️ **Le verrou de défilement est partagé et NOMMÉ** (`scripts/scrollLock.ts`).
Panneau et recherche sont posés en même temps ; chacun rend le sien sans toucher à
celui de l'autre. Écrit en `body.style.overflow` direct, refermer la recherche
rendait le défilement au panneau resté ouvert.

- Pas d'interaction au survol (le survol n'existe pas sur mobile) — voir tooltips au tap
  dans `interactivite-seo.md`.

## Recherche interne

Le sitemap compte ~55 pages qui replient chacune leurs sous-sections : les méga-menus
donnent l'arborescence, pas la réponse. La recherche raccourcit « je cherche X » →
« je suis sur la page X ».

- **Index généré au build** (`src/pages/search-index.json.ts`), depuis les fichiers de
  `src/data/pages/`. ~74 Ko, **23 Ko en brotli**, et **jamais chargé tant que personne
  n'ouvre la loupe** : le module (5 Ko) et l'index partent en `import()` dynamique au
  premier geste. Zéro octet pour les autres visiteurs (règle d'or #1).
- **Un résultat = une page**, mais l'index ratisse les questions de FAQ et les titres
  de cartes : « onduleur bruit » trouve la page Onduleur par sa FAQ.
- **Le résultat affiche la réponse-clé du hero**, pas un extrait surligné. On lit avant
  de cliquer.
- **Raccourci simulateur épinglé** quand la requête demande un chiffre (« combien ça
  coûte », « rentabilité ») : la meilleure réponse est alors SON estimation, pas un
  article (règle d'or #3).
- **Jamais de cul-de-sac** : sans résultat, il reste l'estimation et le téléphone.
- **Aucune URL nouvelle** — rien de plus à indexer. L'index JSON est en `Disallow` et
  `X-Robots-Tag: noindex`, avec un cache court (5 min) : son nom est fixe, un cache
  immuable servirait un sitemap périmé après chaque mise à jour de contenu.
- **Ce qui n'est PAS indexé** est une décision écrite, pas un oubli : les pages encore
  en « Page en cours de rédaction » (vues d'ensemble des piliers, À propos, Contact,
  Réalisations) sont listées dans `NOT_INDEXED` avec leur raison. On n'indexe que ce
  qui répond. À vider au fur et à mesure de la rédaction.
- **Garde-fou de build** : une page qui rejoint la navigation sans entrer dans la
  recherche, ou un fichier de données que plus personne ne réclame, **casse le build**.

## i18n
Tous les libellés de nav en FR/NL. Le sélecteur de langue est dans la rangée utilitaire.
