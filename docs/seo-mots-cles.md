# Carte des mots-clés — 46 pages de contenu

> Établie le 2 septembre 2026, à partir des **SERP belges réelles** : qui ranke
> sur chaque sujet, quels titres ces pages écrivent, quelles « autres questions
> posées » Google affiche.
>
> ⚠️ **Aucun volume de recherche.** Ces chiffres viennent de Search Console, du
> Keyword Planner, d'Ahrefs ou de Semrush — aucun outil accessible depuis le
> dépôt n'en donne. La colonne existe, vide, prête à recevoir un export : la
> structure du tableau ne changera pas.
>
> Le site est en `noindex` par défaut, donc Search Console n'a encore aucune
> donnée à fournir. Cette carte est le meilleur substitut jusqu'au lancement.

## Comment elle a été construite

Une page = **un** mot-clé principal, 2–3 secondaires, 3–5 formulations de longue
traîne qui alimentent la FAQ. La règle qui a le plus servi : **ne pas disputer un
mot-clé entre deux pages du site**. `/comprendre` prend « comprendre les panneaux
solaires » et laisse « comment fonctionne un panneau solaire » à sa page cadette ;
`/comprendre/borne-de-recharge` garde l'équipement et laisse « recharger sa
voiture avec ses panneaux » à `/installation/voiture-electrique`.

Le mot-clé tapé n'est pas toujours celui du métier : la page dont le slug est
`maintenance` s'intitule « **entretien** des panneaux solaires », parce que
« maintenance » est un mot de professionnel.

## État de la passe

| Pilier | Pages | Recherche restituée |
|---|---|---|
| Rentabilité & prix | 4 | ✅ complète |
| Comprendre | 12 | ✅ complète, avec secondaires et longue traîne |
| Aides & primes | 13 | ⚠️ partielle — 4 pages détaillées, 9 titres posés mais **recherche non restituée** |
| Installation | 17 | ⚠️ titres posés, **recherche non restituée** |
| Transverse (`/a-propos`) | 1 | ✅ complète |

> ⚠️ **Pourquoi « non restituée ».** Les lots Aides et Installation ont été
> traités par deux agents parallèles interrompus par la limite de session avant
> qu'ils ne rendent leur rapport. Leur **travail** est en place et vérifié — les
> titres et descriptions sont posés, dans les bornes, et le build passe — mais le
> détail de leur recherche (secondaires, longue traîne, arbitrages) est perdu.
> Une seconde passe sur ces deux piliers récupérerait cette matière ; elle ne
> changerait pas nécessairement les titres, qui sont cohérents.

---

## Titres retenus, par URL

Tous ≤ 60 caractères, suffixe ` | Belgreen` compris. Le mot-clé principal ouvre
le titre partout où c'est possible.

| URL | `<title>` | Car. | Volume |
|---|---|---|---|
| `/` | Panneaux solaires Belgique : estimation gratuite \| Belgreen | 58 | |
| `/rentabilite-prix` | Prix des panneaux solaires en Belgique 2026 \| Belgreen | 54 | |
| `/rentabilite-prix/rendement` | Rendement des panneaux solaires en Belgique \| Belgreen | 54 | |
| `/rentabilite-prix/amortissement` | Amortissement des panneaux solaires en Belgique \| Belgreen | 58 | |
| `/rentabilite-prix/autoconsommation` | Autoconsommation solaire en Belgique \| Belgreen | 47 | |
| `/aides-primes` | Primes panneaux solaires Belgique 2026 \| Belgreen | 49 | |
| `/aides-primes/wallonie` | Prime panneaux solaires Wallonie 2026 \| Belgreen | 48 | |
| `/aides-primes/wallonie/prosumer` | Tarif prosumer Wallonie 2026 : calcul et montant \| Belgreen | 59 | |
| `/aides-primes/wallonie/demarches` | Démarches panneaux solaires Wallonie 2026 \| Belgreen | 52 | |
| `/aides-primes/bruxelles` | Certificats verts Bruxelles 2026 : le calcul \| Belgreen | 55 | |
| `/aides-primes/bruxelles/reglementation` | RESCert PV à Bruxelles : l'obligation 2026 \| Belgreen | 53 | |
| `/aides-primes/bruxelles/demarches` | Démarches certificats verts Bruxelles 2026 \| Belgreen | 53 | |
| `/aides-primes/flandre` | Prime panneaux solaires Flandre 2026 \| Belgreen | 47 | |
| `/aides-primes/flandre/compteur-inverse` | Fin du compteur qui tourne à l'envers en Flandre \| Belgreen | 59 | |
| `/aides-primes/flandre/demarches` | Démarches panneaux solaires en Flandre \| Belgreen | 49 | |
| `/aides-primes/copropriete` | Panneaux solaires en copropriété : les règles \| Belgreen | 56 | |
| `/aides-primes/entreprises` | Panneaux solaires pour entreprises en Belgique \| Belgreen | 57 | |
| `/comprendre` | Comprendre les panneaux solaires en Belgique \| Belgreen | 55 | |
| `/comprendre/fonctionnement` | Comment fonctionne un panneau solaire ? \| Belgreen | 50 | |
| `/comprendre/types-de-panneaux` | Types de panneaux solaires : lequel choisir ? \| Belgreen | 56 | |
| `/comprendre/onduleur` | Onduleur solaire : string ou micro-onduleur ? \| Belgreen | 56 | |
| `/comprendre/batterie` | Batterie domestique solaire : est-ce rentable ? \| Belgreen | 58 | |
| `/comprendre/compteur-intelligent` | Compteur intelligent et panneaux solaires \| Belgreen | 52 | |
| `/comprendre/borne-de-recharge` | Borne de recharge et panneaux solaires \| Belgreen | 49 | |
| `/comprendre/longevite` | Durée de vie des panneaux solaires : 25 à 30 ans \| Belgreen | 59 | |
| `/comprendre/garanties` | Garanties des panneaux solaires en Belgique \| Belgreen | 54 | |
| `/comprendre/maintenance` | Entretien des panneaux solaires : que faire ? \| Belgreen | 56 | |
| `/comprendre/impact-ecologique` | Impact écologique des panneaux solaires \| Belgreen | 50 | |
| `/comprendre/risques-inconvenients` | Inconvénients des panneaux solaires : à savoir \| Belgreen | 57 | |
| `/installation` | Installation de panneaux solaires en Belgique \| Belgreen | 56 | |
| `/installation/puissance` | kWc : définition et puissance à installer \| Belgreen | 52 | |
| `/installation/nombre-de-panneaux` | Combien de panneaux solaires pour ma maison ? \| Belgreen | 56 | |
| `/installation/dimensions` | Dimensions d'un panneau solaire et surface \| Belgreen | 53 | |
| `/installation/poids` | Poids des panneaux solaires sur la toiture \| Belgreen | 53 | |
| `/installation/fixation` | Fixation des panneaux solaires : les 3 systèmes \| Belgreen | 58 | |
| `/installation/ombrage` | Ombrage et panneaux solaires : quel impact ? \| Belgreen | 55 | |
| `/installation/toit-plat` | Panneaux solaires sur toit plat : le guide \| Belgreen | 53 | |
| `/installation/bipv` | BIPV : panneaux solaires intégrés à la toiture \| Belgreen | 57 | |
| `/installation/abri-de-jardin` | Panneaux solaires sur un abri de jardin \| Belgreen | 50 | |
| `/installation/carport` | Carport solaire : abri et production combinés \| Belgreen | 56 | |
| `/installation/balcon` | Panneau solaire de balcon : le kit plug & play \| Belgreen | 57 | |
| `/installation/camping-car` | Panneau solaire pour camping-car : le guide \| Belgreen | 54 | |
| `/installation/soi-meme` | Installer ses panneaux solaires soi-même \| Belgreen | 51 | |
| `/installation/pompe-a-chaleur` | Panneaux solaires et pompe à chaleur \| Belgreen | 47 | |
| `/installation/voiture-electrique` | Recharger sa voiture électrique en solaire \| Belgreen | 53 | |
| `/installation/trouver-un-installateur` | Installateur panneaux solaires : bien choisir \| Belgreen | 56 | |
| `/a-propos` | Installateur panneaux solaires à Bruxelles \| Belgreen | 53 | |

---

## Le détail, là où la recherche a été restituée

### Comprendre (12 pages)

| URL | Principal | Secondaires | Longue traîne (alimente la FAQ) |
|---|---|---|---|
| `/comprendre` | comprendre les panneaux solaires | guide panneaux solaires Belgique, tout savoir photovoltaïque | par où commencer, que faut-il savoir avant d'installer |
| `/comprendre/fonctionnement` | comment fonctionne un panneau solaire | effet photovoltaïque, panneau solaire fonctionnement | produit-il par temps nuageux, pourquoi continu puis alternatif, fonctionne-t-il la nuit |
| `/comprendre/types-de-panneaux` | types de panneaux solaires | monocristallin ou polycristallin, panneau bifacial | différence rendement mono/poly, quel panneau pour petite toiture, panneau amorphe résidentiel |
| `/comprendre/onduleur` | onduleur panneau solaire | micro-onduleur, onduleur string | onduleur ou micro-onduleur, durée de vie d'un onduleur, où l'installer |
| `/comprendre/batterie` | batterie domestique solaire | batterie rentabilité, stockage électricité maison | une batterie est-elle rentable, quelle capacité choisir, ajouter une batterie après coup |
| `/comprendre/compteur-intelligent` | compteur intelligent panneaux solaires | compteur communicant, compteur digital | est-il obligatoire, gratuit ou payant, peut-on le refuser |
| `/comprendre/borne-de-recharge` | borne de recharge et panneaux solaires | borne à domicile Belgique, wallbox maison | recharger sa voiture avec ses panneaux, faut-il un permis, borne ou prise domestique |
| `/comprendre/longevite` | durée de vie des panneaux solaires | durée de vie onduleur, dégradation panneau | combien d'années durent-ils, faut-il les remplacer à 25 ans, le climat belge les use-t-il |
| `/comprendre/garanties` | garantie panneaux solaires Belgique | garantie de performance, garantie produit | combien d'années sont-ils garantis, la main-d'œuvre est-elle couverte, transférable à la revente |
| `/comprendre/maintenance` | entretien des panneaux solaires | nettoyage panneaux solaires | à quelle fréquence nettoyer, faut-il un contrat d'entretien, comment savoir s'ils fonctionnent bien |
| `/comprendre/impact-ecologique` | impact écologique des panneaux solaires | bilan carbone, recyclage panneaux | combien de CO₂ évités, la fabrication pollue-t-elle, que deviennent-ils en fin de vie |
| `/comprendre/risques-inconvenients` | inconvénients des panneaux solaires | risques panneaux solaires, vraiment rentables | rentable pour tout le monde, et si je déménage avant d'amortir, toutes les toitures conviennent-elles |

### Rentabilité & prix (4 pages)

| URL | Principal | Secondaires | Longue traîne |
|---|---|---|---|
| `/rentabilite-prix` | prix panneaux solaires Belgique | coût installation photovoltaïque, prix au kWc | combien coûte une installation de 6 kWc, prix pose comprise, TVA à 6 % conditions |
| `/rentabilite-prix/rendement` | rendement panneaux solaires Belgique | production kWh par kWc, productible | combien de kWh par an, la région change-t-elle la production, pourquoi moins l'hiver |
| `/rentabilite-prix/amortissement` | amortissement panneaux solaires Belgique | retour sur investissement solaire, ROI | en combien d'années c'est remboursé, amortissement par région, le prosumer allonge-t-il le délai |
| `/rentabilite-prix/autoconsommation` | autoconsommation solaire Belgique | taux d'autoconsommation, revente du surplus | comment augmenter son autoconsommation, que vaut le surplus injecté, faut-il une batterie |

### Transverse

| URL | Principal | Pourquoi ce choix |
|---|---|---|
| `/a-propos` | installateur panneaux solaires Bruxelles | La requête visée n'est pas « qui sommes-nous » mais une **requête locale à intention commerciale**. La description porte l'argument anti-intermédiaire, seul angle qui distingue la page des annuaires qui occupent la même requête. |

---

## Un point de vigilance

`/a-propos` (« Installateur panneaux solaires à Bruxelles ») et
`/installation/trouver-un-installateur` (« Installateur panneaux solaires : bien
choisir ») visent des mots proches. Les intentions diffèrent — *nous engager* vs
*apprendre à choisir* — et le second ne nomme pas Bruxelles, ce qui les sépare
suffisamment. À surveiller dès que Search Console donnera des données : si les
deux remontent sur la même requête, c'est `/a-propos` qui doit gagner.

## Ce qu'il reste à faire

1. **Restituer la recherche** sur Aides & primes et Installation (30 pages) —
   les titres sont posés, les secondaires et la longue traîne manquent.
2. **Reformuler les FAQ** à partir de la longue traîne. C'est le bloc qui porte
   le balisage `FAQPage` ; il est aujourd'hui écrit avant la recherche, pas
   d'après elle.
3. **Brancher un export réel** dès que le site est indexé et que Search Console
   accumule des données — la colonne « Volume » est là pour ça.
