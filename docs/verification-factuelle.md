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

### ✅ Le verdict wallon était un **outlier** — **résolu le 2026-09-04**

> **C'était le point le plus lourd du document, et ce n'était pas un arbitrage
> commercial : c'était une erreur de modèle.** Le client a demandé de « modéliser
> le tarif proportionnel ». En allant lire la source, la réponse s'est révélée
> plus simple et plus radicale : **le tarif prosumer ne s'applique pas du tout à
> une installation posée aujourd'hui.**
>
> Note explicative de la CWaPE, mise à jour du 23/06/2025 :
>
> - **§2** — le tarif prosumer est facturé « lorsque les coûts de réseau qui leur
>   sont facturés sont établis sur la base de leurs prélèvements annuels **nets** ».
>   C'est la contrepartie du compteur qui tourne à l'envers.
> - **§4.4** — « À partir du 1ᵉʳ janvier 2024, un prosumer qui ne bénéficie pas du
>   principe de compensation verra l'ensemble de sa facture établi sur la base de
>   ses prélèvements **bruts** », et ces prosumers sont « ceux dont l'installation
>   est mise en service à partir du 1ᵉʳ janvier 2024 ».
> - **§7** — depuis la même date, toute nouvelle installation ≤ 10 kVA est
>   systématiquement équipée d'un compteur communicant.
>
> Facturé sur ses prélèvements bruts, le visiteur ne bénéficie d'aucune
> compensation : **il n'y a rien à compenser, et le forfait n'a plus d'objet.**
>
> **Ce que faisait le modèle** : il cumulait la logique BRUTE côté économies
> (seuls les kWh autoconsommés font gagner) et le forfait de la logique NETTE
> côté charges. Les deux ne vont jamais ensemble. `etat.md` soupçonnait ce double
> compte depuis le 2 septembre ; la CWaPE le confirme.
>
> **Effet sur le cas médian (6 kWc, Wallonie)** :
>
> | | Avant | Après |
> |---|---|---|
> | Charge annuelle | 522 € | **0 €** |
> | Amortissement | jamais sur 25 ans | **10 ans** |
> | Bilan à 25 ans | −3 168 € | **+11 037 €** |
>
> Les 10 ans tombent dans la fourchette de 6 à 13 ans annoncée par le marché : le
> site n'est plus l'outlier, sans être devenu optimiste pour autant. Un test
> verrouille cette fourchette.
>
> ⚠️ **`PROSUMER_RATE` n'est pas supprimé** : le forfait existe toujours pour les
> installations d'avant 2024, dont la compensation court jusqu'en 2030. C'est le
> sujet de `/aides-primes/wallonie/prosumer`, refondue pour répondre à « qui le
> paie encore » plutôt qu'à « combien ça coûte ».

<details><summary>Le constat d'origine, pour mémoire</summary>

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

**Réponse du client (2026-09-03)** : option B. **Ce qui a été trouvé en
l'appliquant** : ni l'une ni l'autre des deux options n'était la bonne lecture,
le forfait ne s'appliquant tout simplement pas. Voir ci-dessus.

</details>

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

### ✅ Durée de vie de l'onduleur vs positionnement Enphase — **tranché**

> **Décision client du 2026-09-03** : micro-onduleurs Enphase garantis **25 ans**.
> Appliqué le 2026-09-04, non pas en remplaçant « 10 à 15 » par « 25 » partout —
> un onduleur central dure bel et bien 10 à 15 ans — mais en **distinguant les
> deux technologies** sur les quatre pages concernées (Longévité, Onduleur,
> Garanties, Fonctionnement). La page Longévité porte désormais deux cartes au
> lieu d'une. L'objection devient l'argument : avec des micro-onduleurs, la ligne
> « remplacement à mi-vie » disparaît du budget.
>
> ⚠️ **Ne pas confondre avec la garantie produit du PANNEAU** (10 à 15 ans, page
> Garanties), qui dépend du fabricant réellement posé et reste **attendue**. Un
> garde-fou est écrit au-dessus de la ligne concernée.

<details><summary>L'écart d'origine, pour mémoire</summary>

`comprendre-longevite.ts` annonce un onduleur à **10–15 ans**, « le composant le
plus souvent remplacé ». Or `comprendre-onduleur.ts:122` vend la certification
Enphase, dont les micro-onduleurs sont garantis **25 ans**.

Sur la page dont le sujet EST la durée de vie, le site décrit donc un produit que
le client ne vend pas.

> **Décision client** : distinguer explicitement onduleur central (10–15 ans) et
> micro-onduleur Enphase (garanti 25 ans), ce qui transforme une objection en
> argument commercial. **C'est ce qui a été fait.**

</details>

---

## 5. Informations manquantes qui bloquent des données structurées

| Manque | Ce que ça bloque |
|---|---|
| Numéro de téléphone (`site.ts` : `+32 2 XXX XX XX`) | Le JSON-LD reste `Organization` au lieu de `LocalBusiness` — pas de fiche locale |
| Adresse, entité juridique (Belgreen ou Belectric ?) | Idem |
| Domaine de production | `PUBLIC_SITE_URL` retombe sur la démo : canoniques et sitemap pointent `belgreen-demo.pages.dev` |
| Image sociale 1200×630 | Aperçus de partage : le hero de l'accueil sert de bouche-trou |

---

## 6. Arbitrages remontés par la passe éditoriale (pilier Comprendre)

Corrections **déjà appliquées** dans cette passe, pour mémoire :

| Page | Ce qui était écrit | Ce qui a été fait |
|---|---|---|
| `/comprendre/longevite` | « Encore 80 % après 25 ans » **et** « 0,5 % par an » | Distingués : 80 % est le **plancher de la garantie de performance**, 0,995²⁵ = **88 %** est la dégradation attendue |
| `/comprendre/longevite` | H1 « Combien de temps dure une installation solaire ? » | Réécrit : il ne contenait pas « durée de vie », l'expression réellement tapée |
| `/comprendre/batterie` | « Installation par un professionnel » posée comme **absolue** | Nuancé : vrai pour les batteries **fixes**, les plug-in certifiées Synergrid sont autorisées depuis avril 2025 |
| `/comprendre/impact-ecologique` | « 0,5 à 1,5 tonne » écrit à la main | Passé en `residentialRange()`, comme le reste de la page |

### ⚠️ Garantie produit annoncée à 10–15 ans — **sous le marché**

`comprendre-garanties.ts` (tableau et FAQ) annonce une garantie produit de
**10 à 15 ans**. Les fabricants et les sources belges situent le standard
résidentiel à **20–25 ans**, avec une recommandation de « minimum 20 ans ».

Le chiffre n'a pas été corrigé : c'est une donnée **commerciale**, qui dépend du
fabricant réellement posé. Mais en l'état il **dessert le client** — un visiteur
qui compare des devis y lira une garantie faible.

> **Décision client** : donner la fourchette du fabricant réellement installé.
> Elle règle les deux occurrences d'un coup.

### ⚠️ Onduleur : la page contredit ce que le client vend

Déjà signalé en §4. Rappel : `/comprendre/longevite` annonce 10–15 ans pour
l'onduleur, alors que `/comprendre/onduleur` vend la certification Enphase, dont
les micro-onduleurs sont garantis 25 ans. Le `FINAL_CTA` de cette page met en
avant Enphase alors que le corps du texte dit que le micro-onduleur ne se
justifie qu'en cas d'ombrage — **seul endroit du site où la ligne commerciale et
la ligne éditoriale tirent en sens inverse.**

### ⚠️ « Compteur intelligent gratuit » — vrai à moitié

`/comprendre/compteur-intelligent` écrit « Gratuit, via votre GRD ». C'est exact
pour un **remplacement standard**, faux pour une **demande anticipée** — facturée
~100 € à Bruxelles et ~152 € en Wallonie. Or le visiteur qui a des panneaux et
veut son compteur tout de suite est précisément dans le cas payant.

Même page : l'obligation est présentée comme uniforme (« nécessaire pour toute
installation »). Elle est acquise à Bruxelles pour tout producteur, mais en
Wallonie le compteur ne devient obligatoire qu'au passage au régime proportionnel.

### ✅ `GRID_CO2_G_PER_KWH = 170` — **source datée le 2026-09-04**

Le facteur de référence belge est publié chaque année par l'**AIB** (Association
of Issuing Bodies), qui calcule le mix résiduel européen — et non par Elia, que
le code citait sans année parce que la donnée n'y était pas.

| | |
|---|---|
| **Source** | AIB, mix résiduel belge, **année 2025** |
| **Valeur** | **171,01 g CO₂/kWh** |
| **Reprise par** | [ENGIE Belgique](https://business.engie.be/fr/faq/contrat/emissions-co2/) |

⚠️ Deux facteurs coexistent et ne mesurent pas la même chose : le mix **résiduel**
(171 g), qui retire la production renouvelable déjà vendue sous garantie
d'origine, et le facteur en **cycle de vie** du mix constaté (~131 g en 2025).
Le premier est le bon ici : il représente l'électricité que le visiteur cesse
d'acheter au réseau, pas la moyenne théorique du pays.

La constante reste à **170**. L'arrondi vers le bas est délibéré : il fait
annoncer un peu moins de CO₂ évité que le chiffre officiel, seul sens dans lequel
une approximation est défendable. À revérifier chaque année, l'AIB republiant en
milieu d'année.

<details><summary>Le constat d'origine, pour mémoire</summary>

`scripts/co2.ts` porte encore « source : Elia, [année] », non renseignée, alors
que `simulateur.md` impose de citer source et année. À dater d'autant plus que le
mix belge bouge avec la sortie du nucléaire. **Constante du modèle : signalée,
pas touchée.**

</details>

### Manques de contenu qui coûtent un featured snippet

Pas des erreurs — des absences, à arbitrer selon la ligne « fourchettes, pas de
faux précis ».

| Page | Ce qui manque | Ce que le marché belge annonce |
|---|---|---|
| `/comprendre/risques-inconvenients` | Le **risque d'incendie**, question n°1 sur « risques panneaux solaires » | ~1 cas sur 10 000, surtout dus aux raccordements — argument direct pour l'installateur certifié |
| `/comprendre/borne-de-recharge` | Le prix, alors que la FAQ ouvre sur « coûte-t-elle cher ? » et répond « ça varie » | 750 à 2 500 € installés |
| `/comprendre/batterie` | Prix et délai de retour, sur la requête n°1 du sujet | 4 000 à 10 000 € TVAC pour 5–15 kWh, 8 à 14 ans |
| `/comprendre/onduleur` | Le coût du remplacement à mi-vie, que la page demande deux fois de « budgétiser » | 500 à 2 000 € pour 3–9 kWc |
| `/comprendre/types-de-panneaux` | Les rendements chiffrés | 16–24 % (mono) contre 14–18 % (poly) |
| `/comprendre/maintenance` | La réserve géographique | 1 à 2 nettoyages/an en zone urbaine, industrielle ou côtière ; 3 à 10 % de perte si encrassé |
