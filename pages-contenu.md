# Pages de contenu — gabarit

> Hub : `../CLAUDE.md`. S'applique à toutes les pages des 4 piliers.

## Principe directeur

**Garde une colonne vertébrale toujours visible, replie seulement la profondeur.**
On ne décore pas un pavé, on remplace le pavé. Le visiteur *fait* plutôt que *lit*.

## Le gabarit (ordre de la page)

1. **H1 + réponse en 1-2 phrases — TOUJOURS visible.**
   Ex. « Une installation coûte entre 4 500 et 12 500 € en 2026. » C'est ce qui peut gagner
   le *featured snippet* (position zéro) et ce que le visiteur pressé veut tout de suite.
   Ne se replie jamais.
2. **Module illustré ou interactif** — le visuel qui porte le sujet (voir `interactivite-seo.md`).
3. **Essentiel scannable — visible.** Les points clés, en clair.
4. **Accordéons — la profondeur.** Détails secondaires, cas particuliers, « pour aller plus loin ».
   On replie le long, jamais le cœur.
5. **FAQ en accordéon** + balisage `FAQPage`. Format question/réponse, scannable, longue traîne.
6. **Ponts vers le simulateur** — au milieu ET en bas, **contextualisés** au sujet de la page
   (« vous, ça coûterait combien ? → Estimez votre installation »), jamais un CTA générique.
   Chaque pont transmet les query params pertinents (région + paramètre de la page). Voir section
   « La boucle contenu ↔ simulateur » ci-dessous.

## Vérités SEO (à connaître)

- **Accordéons** : Google explore le DOM et **indexe le contenu replié** (logique mobile-first).
  Mettre du texte SEO dans des accordéons ne le pénalise PAS. Le piège est UX (tout replier),
  pas SEO — d'où la colonne vertébrale visible.
- **Balisage FAQ** : valide et propre, mais Google a **réduit l'affichage des rich results FAQ
  depuis 2023** (sauf gov/santé). On le met pour la structure/compréhension, pas pour les étoiles.
- **Texte SEO dans le HTML**, jamais uniquement dans une animation (les moteurs lisent le texte).

## Images (critique pour la perf)

Une image statique bien gérée est plus légère qu'une animation ET plus claire qu'un pavé.
Mal gérée, c'est le tueur n°1 des Core Web Vitals. Non négociable :
- **WebP/AVIF** via le pipeline image Sanity.
- **`width`/`height` déclarés** (sinon la page saute → mauvais CLS).
- **Lazy-loading** partout sauf l'image du hero.
- Poids raisonnable, dimensions adaptées au rendu réel (pas de 4000px affiché en 600px).

## La boucle contenu ↔ simulateur

- **Contenu → simulateur** : rampe contextualisée (milieu + bas de page), **avec query params**.
- **Simulateur → contenu** : les « en savoir plus » de chaque étape pointent vers ces pages.
Une page de prix renvoie au simulateur ; le simulateur renvoie à la page de prix. Boucle fermée.

### Query params — règle de transmission de contexte

Chaque lien `simulatorBridge` doit transmettre le contexte connu de la page :

| Page source | Params à transmettre |
|---|---|
| Page « Aides Wallonie » | `?region=wallonie` |
| Page « Aides Flandre » | `?region=flandre` |
| Page « Aides Bruxelles » | `?region=bruxelles` |
| Page « Orientation & inclinaison » | `?orientation=sud` (ou valeur sélectionnée dans le curseur) |
| Page « Prix des panneaux » | `?region=X` si région connue (sélecteur de région actif) |
| Toute autre page de contenu | `?region=X` si le sélecteur de région global est actif |

**Effet perçu** : le visiteur qui lit « Aides Wallonie » puis clique sur « Calculer ma prime »
arrive sur `/simulateur` avec la région Wallonie déjà sélectionnée. Pas de friction, pas de
sentiment de recommencer à zéro. C'est la boucle contenu ↔ simulateur rendue concrète.

## Modélisation Sanity (headless)

Le contenu est **structuré**, pas WYSIWYG. Une page = un document avec un **page builder**
(array de blocs typés), ce qui rend tout réutilisable et cohérent.

Types de blocs suggérés (à affiner avec le dev) :
- `richText` (Portable Text) — texte SEO.
- `keyAnswer` — la réponse 1-2 phrases en tête (zone non repliable).
- `accordion` — titre + Portable Text (profondeur).
- `faq` — liste Q/R (génère aussi le balisage `FAQPage`).
- `module` — référence à une brique interactive (voir `interactivite-seo.md`),
  ex. `photonFlow`, `orientationSlider`, `billSlider`, `paybackTimeline`, `aidsMap`.
- `simulatorBridge` — le pont contextualisé (titre + accroche + lien `/simulateur?...`).
  **Doit inclure un champ `params`** pour les query params à transmettre (ex. `{region: "wallonie"}`).
  Permet au dev de générer l'URL correcte dynamiquement selon la page et le sélecteur région actif.
- `image` — avec alt obligatoire (SEO + accessibilité).

### i18n (FR + NL dès la v1)
- Recommandation : **internationalisation par document** (un document par langue, reliés),
  plus propre qu'au niveau champ pour un site très éditorial. Plugin Document Internationalization.
- Les **briques interactives** sont communes ; seules les chaînes (labels) sont traduites.
- Penser aux URLs localisées et aux balises `hreflang` FR/NL côté front.
