# État du projet — où on en est

> Mis à jour le 28 août 2026. Décrit **l'état réel du code**, pas l'intention.
> Quand ce document et un doc de cadrage divergent, c'est le code qui a raison —
> et la divergence est signalée ici.

## En une phrase

Le front Astro est construit : 58 pages, un simulateur en parcours, un compte
rendu refondu, un rapport imprimable et une recherche interne. **La démo est en
ligne** (https://belgreen-demo.pages.dev), sans protection d'accès et en
`noindex`.
**Aucun formulaire n'envoie quoi que ce soit** — deux décisions client manquent.

---

## Ce qui fonctionne

| Partie | État |
|---|---|
| Les ~55 pages de contenu | Construites, avec leur gabarit et leurs briques |
| Le simulateur (parcours de questions) | Fonctionnel, 6 étapes + 5 d'affinage |
| Le compte rendu | **Refondu** — voir plus bas |
| Le rapport (document PDF) | Gabarit complet, imprimable, vérifié |
| Les calculs | 333 tests verts |
| La recherche interne | Loupe dans la nav, **47 pages indexées** |
| Le build de production | 59 pages + `search-index.json`, ~40 Mo |

---

## La recherche interne (août 2026)

Le site compte ~55 pages qui replient chacune leurs sous-sections. Les méga-menus
donnent l'arborescence, pas la réponse : une loupe ferme désormais l'îlot de la nav
(desktop) et ouvre le panneau mobile.

**Ce qui existe**

| Pièce | Rôle |
|---|---|
| `site/src/pages/search-index.json.ts` | Génère l'index au build + **garde-fou anti-dérive** |
| `site/src/data/searchSources.ts` | Jointure `href` → fichier de données, exclusions, sujets populaires |
| `site/src/scripts/search.ts` | Normalisation, appariement, classement — pur, 24 tests |
| `site/src/scripts/searchOverlay.ts` | Câblage du dialogue, chargé à la demande |
| `site/src/scripts/scrollLock.ts` | Verrou de défilement partagé et **nommé**, 6 tests |
| `site/src/components/SearchOverlay.astro` | Le `<dialog>` et ses styles |

**En ligne depuis le 28 août 2026** sur https://belgreen-demo.pages.dev (460
fichiers). Code sur `design-systeme-astro`, doc de nav sur `main` (`e6f7296`).

Vérifié SUR LE SITE DÉPLOYÉ, pas seulement au build : les deux déclencheurs et
le `<dialog>` sont dans le HTML livré, `search-index.json` répond avec ses 43
entrées en `Cache-Control: max-age=300` et `X-Robots-Tag: noindex`, rien de la
recherche n'est chargé au repos, et la recette navigateur passe en ligne — y
compris le cas Lenis, qui ne se reproduit qu'avec un vrai trackpad sur desktop.

**Coût en performance : nul au chargement.** Le module (5 Ko) et l'index (23 Ko
brotli) partent en `import()` dynamique au premier clic sur la loupe. Vérifié au
navigateur : rien ne se charge au repos, tout arrive à l'ouverture.

**Trois pièges rencontrés, corrigés, et qui méritent d'être connus**

1. **`<input type="search">` détourne Échap.** Tant que le champ contient du texte,
   Chrome et Safari consomment la touche pour VIDER le champ ; elle n'atteint jamais
   le `<dialog>`. Le visiteur devait appuyer deux fois, et la première pression avait
   l'air de ne rien faire. → `type="text"` + `inputmode="search"` + `enterkeyhint`,
   qui donnent le même clavier mobile sans le détournement.
2. **Échap fermait la recherche ET le panneau mobile.** Le gestionnaire du burger
   écoutait la touche sans savoir qu'un dialogue était ouvert au-dessus. Or on ouvre
   la recherche DEPUIS le panneau : on doit revenir au menu. → garde `searchOpen()`
   sur les gestionnaires du panneau et des méga-menus.
3. **Lenis faisait défiler la page derrière le dialogue.** Un
   `body { overflow: hidden }` ne bloque que le défilement NATIF ; Lenis, lui,
   déplace la page en JavaScript sur les événements de molette et passe donc au
   travers. Sur trackpad, faire défiler les résultats faisait filer la page
   floutée derrière. → **deux** mesures, et aucune ne suffit seule :
   `getSmoothScroll()?.stop()` à l'ouverture fige la page, et
   `data-lenis-prevent` sur la zone défilante rend la liste défilable — car la
   branche « suspendu » de Lenis appelle `preventDefault()` sur chaque molette
   et tuerait aussi le défilement natif de la liste. Vérifié par contre-épreuve :
   attribut retiré à chaud, la liste ne défile plus.
4. **Le focus restait piégé dans le dialogue fermé**, sur un champ devenu invisible :
   la tabulation repartait d'un point invisible et le raccourci `/` cessait de
   fonctionner (son garde-fou voyait un `<input>` actif). → `blur()` + restitution à
   l'ouvreur, faite **deux fois** (tout de suite et en `setTimeout`), l'ordre entre
   notre écouteur et la gestion du navigateur variant d'un moteur à l'autre.

⚠️ **La leçon commune à ces quatre pièges** : mes tests vérifiaient le
MÉCANISME et non le RÉSULTAT — la classe est-elle posée (le bouton restait
invisible), `body.style.overflow` vaut-il `hidden` (Lenis passait au travers).
Sur une surface dont le DOM et le comportement naissent en JavaScript, il faut
asserter le **style calculé** et envoyer de **vrais événements** (molette,
souris), jamais lire un attribut. La recette navigateur le fait désormais.

**Ce qui n'est pas indexé, et pourquoi.** On n'indexe que ce qui répond : les pages
encore en « Page en cours de rédaction » (`/realisations`, `/contact`) sont dans
`NOT_INDEXED` avec leur raison. Les quatre autres en sont SORTIES le 31 août 2026,
à la rédaction des trois « vues d'ensemble » et de la page équipe (voir plus bas). **À retirer au fur et à mesure de la rédaction** — c'est une ligne
par page. `/aides-primes/entreprises` en est absente pour une autre raison : elle est
`hidden` dans `site.ts` tant que son volet fiscal n'est pas validé, et la recherche
suit ce drapeau.

**Dette connue**

- **Mesure non câblée.** Aucun analytics n'est installé (voir `stack.md`). Le point de
  branchement est prévu dans `render()` de `searchOverlay.ts` : le jour où Plausible
  arrive, envoyer un événement par requête et surtout par **requête sans résultat** —
  c'est le détecteur de trous de contenu le moins cher du projet.
- **NL non traité.** L'index est mono-langue. À la bascule FR/NL il en faudra un par
  langue (`/nl/search-index.json`) — le générateur est à paramétrer, pas à réécrire.
- **Pas de tolérance aux fautes de frappe.** Le préfixe et une table de synonymes du
  domaine couvrent l'essentiel sur 47 pages ; une distance d'édition serait à ajouter
  seulement si les requêtes sans résultat le montrent (d'où le point précédent).

---

## Les vues d'ensemble, la page équipe et les réalisations (31 août 2026)

Quatre destinations annoncées par la navigation ne menaient nulle part. Elles ont
leur page.

**Les trois hubs** — `/comprendre`, `/aides-primes`, `/installation` — étaient
servis par le gabarit attrape-tout (`[...slug].astro`), alors que le méga-menu
(« Vue d'ensemble → »), le footer (« Voir tout → ») et les cartes de la home y
renvoient. Gabarit allégé : hero → transition → inventaire → FAQ → pont.

**L'inventaire n'est pas écrit à la main.** Une carte = la miniature du hero d'une
page et sa question, c'est-à-dire son H1 tel quel. Trois pièces neuves le
permettent :

| Fichier | Rôle |
|---|---|
| `site/src/data/pageHeroes.ts` | Jointure `href` → photo de hero, **avec garde-fou de build** |
| `site/src/data/pillarIndex.ts` | Assemble les groupes du pilier depuis `site.ts` + les `HERO.title` |
| `site/src/components/PillarIndex.astro` | La grille de cartes-photos, par catégorie |

Conséquence : **une page publiée dans la nav entre d'elle-même dans son hub**, avec
le bon titre et la bonne photo. Rien à maintenir en double, donc rien qui puisse
diverger du H1 réel. `/rentabilite-prix` — seule page à être à la fois porte de
pilier et page de contenu — reçoit la même grille en bas de page.

**La page équipe** (`/a-propos`) remplace son placeholder de Phase 1. Elle porte
l'argument central du projet (« pas d'intermédiaire, pas de revente de données ») et
ferme sur `/devis` plutôt que sur `/simulateur` : qui la lit ne cherche plus un
ordre de grandeur, il cherche à qui parler.

**La page « Nos réalisations »** (`/realisations`) suit le 31 août également, mais
**reste en `noindex`** : son gabarit est écrit — six fiches chantier (commune,
puissance, panneaux, toiture, matériel, mise en service) et le carrousel d'avis —
alors qu'aucune photo de chantier n'est livrée. Les fiches sont donc VIDES et
étiquetées, jamais remplies d'exemples : des références inventées sur la page qui
sert de preuve seraient une tromperie, pas un placeholder. Deux pièces neuves :
`components/ProjectCards.astro` (photo + `<dl>` de caractéristiques, champ manquant
affiché en marqueur) et `data/realisations.ts` — **volontairement hors de
`data/pages/`**, où le contrôle d'orphelins imposerait de l'indexer. Le mode
d'emploi de la publication, en quatre gestes, est en tête de ce fichier.
`Testimonials.astro` accepte désormais un en-tête en props (défauts = les textes de
la home, qui ne bouge pas) — et son avertissement « avis de démonstration, à ne pas
mettre en ligne » vaut maintenant pour **deux** pages.

⚠️ **Ce qui reste à fournir par le client**, en placeholder visible ou en emprunt :
les trois hubs empruntent la photo d'une de leurs pages (l'emprunt est déclaré dans
`pageHeroes.ts`, à un seul endroit) ; la page équipe attend prénoms, portraits, une
seconde photo de chantier, l'année de création, le numéro de téléphone réel et
l'entité juridique exacte (Belgreen ou Belectric) ; « Nos réalisations » attend six
chantiers photographiés avec leurs caractéristiques et l'accord des propriétaires,
plus des avis authentiques et sourcés. Aucun chiffre n'a été inventé —
la liste complète est en tête de `src/data/pages/a-propos.ts`.

---

## La refonte du compte rendu (août 2026)

L'écran de résultat était confus. Les défauts constatés au navigateur, et ce qui
a été fait :

**Cinq sorties concurrentes** — deux boutons pleins, deux liens et une sortie
d'édition — là où le brief demande un primaire dominant et un secondaire
discret. Remplacées par **une seule action, choisie selon le résultat**
(`outcomeProfile()` dans `site/src/scripts/simulator.ts`) :

| Profil | Condition | Action principale |
|---|---|---|
| `chaud` | amortissement ≤ 15 ans | Réserver l'étude gratuite |
| `tiede` | amortissement > 15 ans | Réserver l'étude, affinage en secondaire |
| `froid` | jamais amorti sur 25 ans | Affiner l'estimation, conseiller en secondaire |
| `hors-perimetre` | bâtiment professionnel | Parler à un conseiller |

Le profil froid ne reçoit **pas** de bouton d'étude : pousser un rendez-vous
commercial sur une installation qui ne s'amortit pas est le travers
d'intermédiaire que le positionnement du site refuse.

⚠️ `hors-perimetre` est un filet : le parcours court-circuite déjà le bâtiment
professionnel vers `/contact` dès la question 2, le compte rendu n'est donc
jamais atteint pour ce profil.

**Le bouton « Recevoir mon devis » a disparu** du compte rendu — doublon
fonctionnel de l'étude, et `funnel.md` tranche : « CTA = étude personnalisée,
pas devis ». La page `/devis` n'est pas touchée.

**Quatre surfaces empilées** (photo → verre → carte → bandeau → tuiles). Sur la
vue résultat, le décor s'efface entièrement : fond uni, cartes blanches à filet.
Effet de bord utile — le `backdrop-filter` de `SimulatorPanels` n'avait pas sa
règle compagnon `-webkit-`, il ne rendait donc pas sur Safari ni iOS.

**Douze blocs au même écart**, sans hiérarchie. Découpés en cinq temps titrés :
verdict → installation → amortissement → production dans l'année → la suite,
puis un pied utilitaire détaché.

**Les graphiques ne disaient rien** : aucune légende, aucun axe chiffré. Corrigé
(légende des deux tracés, échelle en euros, repère haut sur les barres, message
explicite quand la courbe ne croise jamais). La courbe d'amortissement a ensuite
été **retirée de l'écran** — elle y prenait un tiers de la hauteur pour dire ce
que deux tuiles disent en trois mots — et devient la valeur propre du rapport.

**La tuile « Amortissement » n'est plus lime** quand la nouvelle est mauvaise :
le lime est la couleur d'action du système, l'appliquer à « au-delà de 25 ans »
mettait en valeur le verdict le plus défavorable.

### Bugs trouvés en chemin

- **La tuile « Coût de départ » n'était jamais mise à jour.** Invisible dans le
  simulateur (`showCost={false}`), mais le rapport l'affiche : il annonçait
  7 500 € à côté d'un budget indicatif de 9 200 – 13 800 €.
- **Le logo Enphase** était déclaré en 96×28 pour un fichier de 259×267 — quasi
  carré. Il s'affichait comme une barre noire.
- **Le logo Belgreen** se réduit au pictogramme sous 1024 px ; une A4 fait
  ~794 px, le rapport sortait avec un soleil anonyme en tête.
- **« au-delà de 25 ans » débordait de sa tuile** sur `/rentabilite-prix/
  amortissement`. Le défaut préexistait ; le filet ajouté l'a rendu visible.
  Corrigé par des espaces insécables plutôt qu'un `white-space: nowrap` global.

---

## Le rapport PDF

`/rapport/document` **est** le PDF, pas un aperçu : une page A4 imprimable.
Le rendu consistera à ouvrir cette adresse, attendre `data-report-ready` sur
`<html>`, puis imprimer.

Ce format a été choisi parce qu'**il survit au choix d'hébergeur**, encore
ouvert : il marche avec un navigateur sans tête, un service tiers de conversion,
ou un Ctrl+P. Aucune bibliothèque de dessin PDF n'entre dans le bundle du site.

Le document contient les chiffres, **la courbe d'amortissement**, la production
mois par mois, **les réponses données** et les hypothèses de calcul. Sans le
rappel des réponses, un document lu des semaines plus tard ne se rattache à
rien.

**Le transport des réponses** passe par l'URL (`reportParams.ts`, clés en
français comme `?etape=`). Un test verrouille l'invariant qui compte : le
rapport recalcule **exactement** les chiffres de l'écran.

Deux gardes posés :
- Arriver sur `/rapport` sans réponses affiche une invitation à lancer le
  simulateur, pas le formulaire — sinon le visiteur recevrait le cas médian
  présenté comme son estimation.
- Sans endpoint configuré, les formulaires **disent** que l'envoi n'est pas
  actif. Jamais un faux remerciement : il perdrait le prospect et ferait croire
  que le site fonctionne.

---

## Le déploiement

**Cloudflare Pages**, décidé le 24 août 2026 (`stack.md` hésitait entre
Cloudflare et Netlify). **Première mise en ligne le 25 août 2026** sur
https://belgreen-demo.pages.dev — projet Pages `belgreen-demo`, 421 fichiers.

```sh
cd site && npm run deploy
```

⚠️ **IL FAUT UN JETON DANS L'ENVIRONNEMENT.** Wrangler n'a aucun identifiant
stocké sur la machine (`~/Library/Preferences/.wrangler/config/` est vide) : il
ouvre normalement une fenêtre d'authentification, ce qu'un terminal non
interactif — un agent, un CI — ne peut pas faire. Il s'y arrête alors net :

> In a non-interactive environment, it's necessary to set a
> CLOUDFLARE_API_TOKEN environment variable for wrangler to work.

Deux façons d'y répondre, au choix :

```sh
export CLOUDFLARE_API_TOKEN=…   # jeton à permission « Cloudflare Pages: Edit »
# ou, en terminal interactif :
npx wrangler login
```

Le jeton n'est volontairement PAS écrit dans le dépôt ni dans un `.env` suivi.
Le poser dans `~/.zshrc` le rend disponible à tout ce qui tourne depuis un
shell, agents compris.

Le script porte `--branch=main` : sans lui, Wrangler déduit la branche Git
courante (`design-systeme-astro`) et publie une *preview* sur une URL à hash,
pas l'adresse stable donnée au client.

⚠️ **La démo n'est protégée par aucun mot de passe.** Elle est accessible à qui
connaît l'URL ; seule l'indexation est refusée, et c'est une convention que les
robots respectent, pas une serrure. Cloudflare Access ou un Basic Auth reste à
poser si le besoin se confirme — voir `site/README.md`.

⚠️ **On envoie le `dist/` construit localement, on ne branche PAS le dépôt sur
le build automatique de Cloudflare.** 41 images vivent en Git LFS sous
`site/src/assets/` ; le build distant ne fait pas `git lfs pull` et clonerait
des pointeurs de ~130 octets, sur lesquels `astro:assets` échoue — sans jamais
mentionner LFS dans l'erreur.

**L'indexation refuse par défaut.** `robots.txt` et `X-Robots-Tag` sont générés
au build, pas écrits en dur :

```sh
npm run build                        # démo → noindex
PUBLIC_INDEXABLE=true npm run build  # prod → indexable
```

Les deux erreurs ne se valent pas : une production oubliée en `noindex` se voit
en quelques jours, une démo indexée met des semaines à disparaître et pollue le
lancement du vrai domaine.

Détail complet dans `site/README.md`.

---

## Ce qui bloque, et sur quoi

### Décisions client attendues

| Sujet | Ce qui est bloqué | Où c'est écrit |
|---|---|---|
| **Service d'e-mail** (Brevo ou Resend) | L'envoi de tous les formulaires | `funnel.md` |
| **Moteur d'impression PDF** | La fabrication du rapport | ce doc |
| **`PROSUMER_RATE`** — 87 €/kWc/an | Le verdict wallon | voir ci-dessous |
| Numéro de téléphone, mentions légales | `PHONE` est un placeholder, `/confidentialite` est un lien mort | `CLAUDE.md` |

### Le tarif prosumer — à trancher

Le modèle est **arithmétiquement juste** : recalculé à la main sur le cas médian
(Wallonie, maison, plein sud, 40 m², 100-200 €/mois), il reproduit l'écran à
±1 % — économies 238 €/an, bilan −3 168 € sur 25 ans, jamais amorti.

Mais le verdict tient **entièrement** à une constante :
`PROSUMER_RATE = 87 €/kWc/an` (`site/src/scripts/calculators/prosumer.ts`),
appliquée à taux plein sur 25 ans, soit **13 594 € — 170 % du prix de
l'installation**. C'est elle, et rien d'autre, qui rend toute la Wallonie non
rentable dans le modèle.

Deux points à valider :

1. `savings.ts` a supprimé la compensation du surplus le 18 août 2026 (le
   compteur inversé n'existe plus) **tout en conservant la charge prosumer
   pleine**. Le tarif prosumer est la contrepartie de l'usage du réseau comme
   stockage ; le facturer entièrement *et* ne valoriser le surplus qu'à
   4 c€/kWh mérite confirmation. Le **tarif prosumer proportionnel** wallon
   (assis sur l'injection réelle) n'est pas modélisé.
2. Aucune fin ni dégressivité n'est modélisée sur l'horizon de 25 ans.

`design.md` le dit déjà des constantes en général : « à valider par le client.
Tant qu'elles ne le sont pas, aucun de ces chiffres n'est un prix. »

### Dette technique connue

- **`simulateur.md` est périmé.** Il décrit un calculateur live en deux
  colonnes ; le code est un parcours par étapes. `simulateur.astro` le signale
  déjà en tête de fichier. Les entrées et sorties y sont également décalées
  (statut propriétaire/locataire jamais posé, cinq questions d'affinage
  absentes du doc).
- **`ux/wireframes/simulateur.md` et `ux/strategie-client.md`** contredisent
  l'option A validée : ils promettent kWc exact, nombre de panneaux et
  investissement en clair.
- **`/simulateur` est en `noindex`** alors qu'`architecture.md` et `funnel.md`
  en font une cible SEO et une landing pour les pubs.
- **`site:` n'est pas renseigné** dans `astro.config.mjs` — pas d'URLs
  canoniques ni de sitemap tant que le domaine n'est pas connu.
- **Le parcours de questions n'a pas été retouché** : carrousel horizontal à
  hauteur fixe, trois indicateurs de progression concurrents qui se
  désynchronisent pendant le glissement. Problèmes réels, volontairement hors du
  chantier « compte rendu ».

---

## Repères de code

| Fichier | Rôle |
|---|---|
| `site/src/scripts/simulator.ts` | Le calcul et `outcomeProfile()` |
| `site/src/scripts/savings.ts` | Économies, ROI, règles régionales |
| `site/src/scripts/paybackRender.ts` | Le rendu de la courbe, partagé par l'écran et le rapport |
| `site/src/scripts/reportParams.ts` | Le transport des réponses dans l'URL |
| `site/src/scripts/leadSubmit.ts` | **Le point de branchement de l'envoi** |
| `site/src/components/ReportDocument.astro` | Le document PDF |
| `site/scripts/deploy-headers.mjs` | Les en-têtes de déploiement |
