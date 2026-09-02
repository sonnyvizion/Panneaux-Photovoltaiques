---
name: audit-seo-page
description: Use when working on the SEO, the title, the meta description, the key answer, the FAQ or the factual accuracy of a content page of the Belgreen photovoltaic site (site/src/data/pages/*.ts)
---

# Auditer et optimiser une page de contenu

## Le principe

Une page se corrige **dans son fichier de données** (`site/src/data/pages/*.ts`),
jamais dans son `.astro` — celui-ci n'est qu'un assemblage. Tu produis des
**modifications**, pas un diagnostic : un rapport sans réécriture ne sert à rien
quand il y a 46 pages à passer.

Le site vise des requêtes belges francophones. Le simulateur est la colonne
vertébrale : chaque page doit y ramener par un pont contextualisé, jamais par un
CTA générique.

## Ce qui n'est PAS de ton ressort

**Ne remonte jamais un constat qui vaut pour tout le site.** Plomberie
(`BaseLayout`, `astro.config`, sitemap, `hreflang`), design des composants,
architecture : ces points sont traités une fois, ailleurs. Répétés sur 46 pages,
ils noient les constats propres à la page.

**Ne modifie aucune constante de `site/src/scripts/`.** Elles changent les
résultats affichés au visiteur. Un chiffre du modèle qui semble faux se signale,
il ne se corrige pas.

## La passe, dans l'ordre

### 1. Mots-clés — d'abord, avant toute réécriture

C'est l'étape que l'on saute naturellement, et sans elle le reste est de la
décoration.

- Cherche sur le web la requête que la page vise, en ciblage belge.
- Relève : qui ranke, quels **titles** ils écrivent, quelles **questions**
  reviennent (« autres questions posées »).
- Identifie **un** mot-clé principal, 2–3 secondaires, 3–5 longue traîne.
- Vérifie qu'aucune autre page du site ne vise déjà le même principal
  (cannibalisation) — `PAGE_SOURCES` dans `src/data/searchSources.ts` liste tout.

Sans recherche web, tu écris ce que tu imagines être la requête. C'est
systématiquement à côté : le H1 « Combien de temps dure une installation
solaire ? » ne contient pas « durée de vie », l'expression réellement tapée.

### 2. Tête de page

| Champ | Où | Contrainte |
|---|---|---|
| `SEO.title` | `data/pages/*.ts` | **≤ 60 car.**, suffixe ` \| Belgreen` compris, mot-clé principal en tête |
| `SEO.description` | idem | **110–160 car.**, dérivée de `HERO.answer`, avec un verbe d'action |
| `HERO.title` (= H1) | idem | Contient le mot-clé principal. Distinct du title, même sujet |
| `HERO.answer` | idem | 1–2 phrases, répond à la requête dès la première ligne (featured snippet) |

Le garde-fou de `data/seo.ts` fait **échouer le build** hors de ces bornes.

### 3. Balayage des chiffres — tous, un par un

Relève **chaque nombre** du fichier et confronte-le aux constantes :

- `scripts/powerEstimate.ts` — `KWH_PER_KWC_YEAR`, `WC_PER_PANEL`, `M2_PER_PANEL`, prix
- `scripts/savings.ts` — `ELECTRICITY_PRICE`, `INJECTION_PRICE`, `SELF_CONSUMPTION_RATE`, `ANNUAL_DEGRADATION`, `HORIZON_YEARS`
- `scripts/calculators/prosumer.ts` — `PROSUMER_RATE`
- `scripts/calculators/greenCert.ts` — `CV_PER_MWH`, `CV_PRICE`, `CERT_YEARS`
- `scripts/loanEstimate.ts` — `LOAN_MAX`

**Si une constante existe, la page l'importe et l'interpole. Elle ne la recopie
pas.** `rentabilite-prix.ts` montre le motif ; 38 pages sur 46 ne le suivent pas
encore.

Trois pièges connus :

- **« 7 à 12 ans »** d'amortissement est un chiffre **mort** (supprimé le
  2026-08-18, la compensation du surplus wallon n'existe plus). S'il apparaît, il
  se retire.
- Une date d'expiration (« jusqu'à fin 2026 ») se vérifie sur le web, avec sa
  source et sa date de vérification.
- Deux chiffres de la même page peuvent se contredire entre eux : « 0,5 %/an de
  dégradation » et « 80 % après 25 ans » ne peuvent pas être vrais ensemble
  (0,5 % × 25 ans → ~87 %). Vérifie l'arithmétique, pas seulement les sources.

### 4. FAQ et maillage

- Reformule les questions de `FAQ` sur la longue traîne réelle de l'étape 1 —
  c'est ce bloc qui porte le balisage `FAQPage`. Un seul `open: true`.
- Vérifie que chaque `BRIDGES[].cta.href` et `TOPICS[].href` **vise la page qui
  répond**, pas la page voisine (un pont sur l'amortissement doit viser
  `/rentabilite-prix/amortissement`, pas `/rentabilite-prix`).
- Vérifie que la destination est publiée (`published` dans `src/data/site.ts`).

## Règle de ponctuation : pas de tiret cadratin dans le texte visible

Le site n'utilise **plus de « — » dans ses textes** (décision client du
2026-09-02, 377 occurrences retirées). N'en réintroduis pas. Selon le rôle :
deux-points pour une explication, virgules pour une incise, point pour deux
idées autonomes, parenthèses pour une énumération intercalée.

Cela ne vaut **que pour le texte visible**. Les commentaires de code gardent les
leurs, et trois « — » subsistent comme **glyphes de remplissage** : le signe
« sans objet » de `OptionComparator`, et les deux valeurs absentes de
`ReportDocument`. Ce ne sont pas de la ponctuation.

## Ce que tu rends

Les modifications, plus **ce bloc exactement**, sans prose autour :

```
## /url-de-la-page

**Mot-clé principal** : … · **Secondaires** : …, … · **Longue traîne** : …, …, …

**Corrigé**
- fichier.ts:12 — <ce qui a changé, et pourquoi>

**À trancher par le client**
- <le point> — <les deux options, et ce que ça change>

**Rien à signaler** : <liste courte de ce qui a été vérifié et qui va bien>
```

Trois sections, toujours les mêmes, dans cet ordre. Elles se concatènent sur 46
pages sans être relues une par une — c'est le seul format qui tienne à l'échelle.

## Erreurs courantes

| Erreur | Correction |
|---|---|
| Rendre un essai de sept sections | Le bloc ci-dessus, rien d'autre |
| Diagnostiquer sans modifier | La modification EST le livrable |
| Sauter la recherche web | Sans elle, les mots-clés sont inventés |
| Remonter « pas de meta description sur le site » | Constat site-wide, traité ailleurs |
| Corriger `ELECTRICITY_PRICE` parce qu'il semble bas | Le modèle ne se touche pas : on signale |
| Vérifier trois chiffres sur douze | Tous, un par un |
| Réécrire le corps de la page | Seuls title, description, H1, réponse-clé, FAQ, ponts |
