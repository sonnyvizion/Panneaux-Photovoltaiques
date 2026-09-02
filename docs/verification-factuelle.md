# Vérification factuelle — chiffres du site

> Passe du 2 septembre 2026. Un chiffre par ligne : ce que le site affiche, ce
> que disent les sources, et qui tranche.
>
> **Règle** : je corrige les textes, **jamais les constantes de `src/scripts/`** —
> elles changent les résultats affichés au visiteur, c'est une décision client.

## Comment lire ce document

| Colonne | Sens |
|---|---|
| **Statut** | ✅ vérifié, conforme · ⚠️ écart à arbitrer · ❌ faux, corrigé · ⏳ non vérifiable sans le client |
| **Décision client** | ce qui ne peut pas être tranché depuis le code |

---

## 1. Le modèle de calcul (`src/scripts/`)

### ❌ « 7 à 12 ans » d'amortissement — **corrigé**

| | |
|---|---|
| **Affichait** | « Le retour sur investissement se situe généralement entre 7 et 12 ans » |
| **Où** | `rentabilite-prix.ts:107`, `comprendre-longevite.ts:47` et `:93` |
| **Pourquoi c'est faux** | Moyenne retirée le 2026-08-18. Elle reposait sur la compensation du surplus wallon, **supprimée en 2024**. `savings.test.ts` verrouille l'inverse : `paybackYear(6 kWc, wallonie)` retourne `null` — jamais amorti sur 25 ans à autoconsommation standard. |
| **Fait** | Retiré de `rentabilite-prix.ts`. Les deux occurrences de `comprendre-longevite.ts` sont traitées dans la passe du pilier Comprendre. |

### ⚠️ Le verdict wallon est un **outlier** face à tout le marché belge

C'est le point le plus lourd du document.

| Source | Amortissement annoncé |
|---|---|
| **Le modèle du site** | Wallonie : **jamais amorti sur 25 ans** (autoconso. 37,76 %) |
| [trustup.be](https://blog.trustup.be/fr/rentabilite-des-panneaux-solaires/) | 7 à 8 ans |
| [lisaenergie.be](https://www.lisaenergie.be/guides-rentabilite-panneaux-solaires-en-wallonie-2026-calcul-roi-economies-reelles) | Wallonie : 6 à 9 ans |
| [viessmann.be](https://www.viessmann.be/fr/tout-savoir/blog-expert/delai-amortissement-panneaux-solaires.html) | 7 à 10 ans, « 12-13 ans depuis la redevance » |

L'écart ne vient pas d'un chiffre isolé mais de **deux choix de modélisation**, tous
deux déjà signalés dans `etat.md` :

1. `PROSUMER_RATE = 87 €/kWc/an` est appliqué **plein et forfaitaire**, sans
   modéliser le tarif prosumer *proportionnel* que beaucoup de ménages choisissent.
   Sur 25 ans et 6 kWc, cela retire 13 594 € — soit **170 % du prix de
   l'installation**.
2. Aucune **fin ni dégressivité** du tarif prosumer n'est modélisée sur 25 ans.

Les pages concurrentes sont commercialement optimistes ; notre modèle est
peut-être trop pessimiste. Les deux ne peuvent pas être vrais.

> **Décision client** : soit on assume d'annoncer une Wallonie non rentable — ce
> qui est un positionnement fort et honnête, mais fera fuir une partie des leads
> wallons — soit on modélise le tarif prosumer proportionnel, et le verdict
> change du tout au tout. **Tant que ce n'est pas tranché, aucune page ne doit
> promettre de délai d'amortissement.**

### ✅ `ELECTRICITY_PRICE = 0.32` €/kWh — conforme

Dernière vérification interne : 2026-08-18. Revérifié le 2026-09-02.

| Source | Valeur |
|---|---|
| Tarifs CREG T3 2026 | Flandre 0,3222 · Bruxelles 0,3719 · Wallonie 0,3783 |
| [callmepower.be](https://callmepower.be/fr/energie/guides/tarifs/prix-kwh) | ~0,30 €/kWh tous frais et TVA compris, août 2026 |

0,32 se situe dans la fourchette et penche du côté prudent. ⚠️ **Attention aux
sources** : plusieurs pages d'installateurs annoncent 0,35–0,42 €/kWh — un prix du
kWh élevé rend le solaire plus rentable, c'est un chiffre qu'elles ont intérêt à
gonfler. Ne pas s'aligner dessus.

> **Réserve** : la constante est **nationale** alors que les tarifs réels varient
> de 18 % entre Flandre et Wallonie, et que le site traite les trois régions
> distinctement partout ailleurs. Un prix par région rendrait le modèle cohérent
> avec le reste du discours. **Décision client.**

### ✅ `KWH_PER_KWC_YEAR = 900` — conforme et prudent

| Source | Valeur |
|---|---|
| [atlascontrole.be](https://www.atlascontrole.be/rendement-panneaux-solaires-belgique/) | ~900 kWh/kWc, jusqu'à 1 000 bien orienté |
| [homegrade.brussels](https://homegrade.brussels/conseils/energies/installer-panneaux-solaires-photovoltaiques/) | 1 050 kWh/kWc plein sud à 35° |
| Fourchette consensuelle | 850 à 1 050 kWh/kWc/an |

Bien centralisé : aucune page ne réécrit 900 à la main.

### ⚠️ `SELF_CONSUMPTION_RATE = 0.3776` — légèrement optimiste

Les sources belges donnent **~30 %** sans pilotage ([engie.be](https://www.engie.be/fr/blog/panneaux-solaires/pv-autoconsommation-maximum/),
[test-achats.be](https://www.test-achats.be/maison-energie/energie-renouvelable/dossier/augmenter-autoconsommation-production-photovoltaique)),
50–70 % avec pilotage, 50–80 % avec batterie.

37,76 % est au-dessus du taux « sans rien faire ». L'écart est modeste, mais il
joue dans le sens favorable — et il alimente précisément le calcul
d'amortissement dont le verdict est contesté ci-dessus.

> **Décision client** : garder 37,76 % (hypothèse d'un ménage qui décale un peu
> ses usages) ou retomber à 30 % (hypothèse neutre).

---

## 2. Chiffres recopiés à la main plutôt qu'importés

38 pages sur 46 écrivent des chiffres que le code porte déjà en constante. Traité
pilier par pilier dans la passe en cours. Grandeurs concernées :

| Constante | Valeur | Recopiée dans |
|---|---|---|
| `PROSUMER_RATE` | 87 €/kWc/an | `aides-primes-wallonie.ts:101`, `aides-primes-flandre.ts:62` |
| `INJECTION_PRICE` | 0,04 €/kWh | 5 × « 3 à 5 ct » côté Flandre |
| `LOAN_MAX` | 60 000 € | `aides-primes-wallonie.ts:94,153,182` |
| `WC_PER_PANEL` | 430 Wc | `installation-nombre-de-panneaux.ts:16` (« 400 à 450 Wc ») |
| `ANNUAL_DEGRADATION` | 0,5 %/an | 4 pages, cohérentes mais non liées |

---

## 3. À vérifier avec échéance courte

| Sujet | Où | Pourquoi c'est urgent |
|---|---|---|
| Prime de compensation flamande « jusqu'à fin 2026 » | `aides-primes-flandre.ts` ×4 | Expire dans 4 mois |
| Libellé « Voir les prix 2026 » | 11 pages, en dur | Un renommage annuel touchera 11 fichiers |
| Compteurs digitaux « 2029 », « 30 000/mois en 2026 » | `aides-primes-flandre-compteur-inverse.ts` | Chiffre de déploiement daté |

---

## 4. Points que les docs de cadrage signalent eux-mêmes comme non vérifiés

| Sujet | Aveu, dans le doc source |
|---|---|
| Garanties (durées exactes) | `doc-reference-dev-4-comprendre-2.md` : « à confirmer avant publication » |
| MijnVerbouwLening | `redaction-flandre-aides-2026.md` : « détail non vérifié en profondeur » |
| Volet fiscal entreprises | Page `hidden: true` dans `site.ts` — non publiée pour cette raison |

### ⏳ Durée de vie de l'onduleur vs positionnement Enphase

`comprendre-longevite.ts` annonce un onduleur à **10–15 ans**, « le composant le
plus souvent remplacé ». Or `comprendre-onduleur.ts:122` vend la certification
Enphase, dont les micro-onduleurs sont garantis **25 ans**.

Sur la page dont le sujet EST la durée de vie, le site décrit donc un produit que
le client ne vend pas.

> **Décision client** : distinguer explicitement onduleur central (10–15 ans) et
> micro-onduleur Enphase (garanti 25 ans), ce qui transforme une objection en
> argument commercial.

---

## 5. Informations manquantes qui bloquent des données structurées

| Manque | Ce que ça bloque |
|---|---|
| Numéro de téléphone (`site.ts` : `+32 2 XXX XX XX`) | Le JSON-LD reste `Organization` au lieu de `LocalBusiness` — pas de fiche locale |
| Adresse, entité juridique (Belgreen ou Belectric ?) | Idem |
| Domaine de production | `PUBLIC_SITE_URL` retombe sur la démo : canoniques et sitemap pointent `belgreen-demo.pages.dev` |
| Image sociale 1200×630 | Aperçus de partage : le hero de l'accueil sert de bouche-trou |
