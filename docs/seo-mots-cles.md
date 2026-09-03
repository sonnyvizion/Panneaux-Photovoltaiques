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
| Aides & primes | 12 | ✅ complète, avec secondaires et longue traîne (3 septembre 2026) |
| Installation | 17 | ✅ complète, avec secondaires et longue traîne (3 septembre 2026) |
| Transverse (`/a-propos`) | 1 | ✅ complète |

> ⚠️ **Pourquoi « non restituée ».** Les lots Aides et Installation ont été
> traités par deux agents parallèles interrompus par la limite de session avant
> qu'ils ne rendent leur rapport. Leur **travail** est en place et vérifié : les
> titres et descriptions sont posés, dans les bornes, et le build passe. Seul le
> détail de leur recherche (secondaires, longue traîne, arbitrages) était perdu.
>
> **Les lots Aides et Installation ont été repassés le 3 septembre 2026** et
> leur recherche est ci-dessous. Enseignement de cette seconde passe : les titres n'ont pas bougé,
> ils étaient justes. Ce que la recherche a rapporté, ce sont **quatre erreurs de
> fond dans les réponses**, invisibles depuis les titres (voir la section
> « Ce que la seconde passe a corrigé »). Le pilier Aides comptait 12 pages,
> pas 13 : la carte le disait faux.

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

### Aides & primes (12 pages)

Repassé le 3 septembre 2026. Deux constantes structurent tout le pilier : la
requête tapée est presque toujours **régionale** (« prime panneaux solaires
Wallonie », pas « prime panneaux solaires »), et le mot du visiteur n'est pas
celui de l'administration (on tape « taxe sur les panneaux solaires », jamais
« tarif prosumer capacitaire »).

| URL | Principal | Secondaires | Longue traîne (alimente la FAQ) |
|---|---|---|---|
| `/aides-primes` | primes panneaux solaires Belgique | aides panneaux solaires 2026, subsides photovoltaïque Belgique | quelle aide selon ma région, peut-on cumuler les aides, primes versées avant ou après les travaux |
| `/aides-primes/wallonie` | prime panneaux solaires Wallonie | aides photovoltaïque Wallonie 2026, Rénoprêt panneaux solaires | y a-t-il encore une prime en Wallonie, conditions et montant du Rénoprêt à 0 %, prime communale, les certificats verts sont-ils terminés |
| `/aides-primes/wallonie/prosumer` | tarif prosumer Wallonie | **taxe panneaux solaires**, tarif prosumer ORES 2026 | comment réduire ou éviter le tarif prosumer, forfaitaire ou proportionnel, combien pour 5 kWc, le montant change-t-il selon le GRD |
| `/aides-primes/wallonie/demarches` | démarches panneaux solaires Wallonie | déclaration ORES panneaux solaires, compteur communicant Wallonie | qui déclare, l'installateur ou moi, le contrôle RGIE est-il payant, que risque-t-on sans déclaration, combien de temps au total |
| `/aides-primes/bruxelles` | certificats verts Bruxelles | Brugel certificats verts, prix d'un certificat vert 2026 | combien rapportent les certificats verts, pendant combien d'années, à qui les revendre |
| `/aides-primes/bruxelles/reglementation` | RESCert PV | installateur certifié photovoltaïque Bruxelles, certificat SER | depuis quand le RESCert est obligatoire, que risque-t-on sans lui, les coefficients baissent-ils en 2026, et les installations déjà en service |
| `/aides-primes/bruxelles/demarches` | démarches certificats verts Bruxelles | Green Meter Sibelga, encodage des index de production | Sibelga ou Brugel, qui fait quoi, à quelle fréquence déclarer, délai avant les premiers certificats |
| `/aides-primes/flandre` | prime panneaux solaires Flandre | premie zonnepanelen 2026, Mijn VerbouwLening | existe-t-il encore une prime en Flandre, combien rapporte le tarif d'injection, TVA à 6 % sur une maison de moins de 10 ans |
| `/aides-primes/flandre/compteur-inverse` | compteur qui tourne à l'envers Flandre | terugdraaiende teller, compteur digital Fluvius | mon compteur tourne encore à l'envers, est-ce normal, quand vais-je recevoir le digital, puis-je le refuser |
| `/aides-primes/flandre/demarches` | démarches panneaux solaires Flandre | Mijn Fluvius déclaration, compteur digital obligatoire | comment demander le compteur digital, est-il payant, combien de temps prend la pose |
| `/aides-primes/copropriete` | panneaux solaires en copropriété | toiture partie commune, assemblée générale panneaux solaires | quelle majorité en AG, comment répartir l'électricité produite, permis d'urbanisme, qui paie si tous ne participent pas |
| `/aides-primes/entreprises` | panneaux solaires pour entreprises | déduction pour investissement photovoltaïque, TVA 21 % récupérable | une société a-t-elle droit à la TVA à 6 %, amortissement d'une installation, certificats verts pour professionnels |

#### Ce que la seconde passe a corrigé

La recherche ne sert pas qu'à écrire des titres : elle confronte les **réponses**
aux sources. Quatre points, dont un chiffre faux sur six emplacements.

| Point | Constat | Fait |
|---|---|---|
| **Tarif d'injection flamand** | Le site annonçait « 3 à 5 ct/kWh ». Le relevé de mai 2026 des contrats belges va de **0,94 ct** (Mega Zen Fixed) à **4,90 ct** (Eneco, Energy Knights) : le plancher était trois fois trop haut, sur six emplacements dont la description SEO | Corrigé en « 1 à 5 ct » partout, avec la source en commentaire |
| **Tarif prosumer proportionnel** | Le site le mentionnait en six mots (« si votre profil s'y prête ») alors que c'est **l'alternative au forfait**, et le cœur de l'arbitrage client en attente | La FAQ prosumer le traite en question propre, avec sa condition (compteur communicant) et son profil (forte autoconsommation) |
| **Écart entre gestionnaires de réseau** | La page donnait un seul coefficient, celui d'ORES. Les GRD wallons 2026 vont de **~79 €/kWc** (AIEG) à **~98 €/kWc** (AIESH), soit 24 % d'écart, hors TVA de 21 % | Question dédiée dans la FAQ. La constante `PROSUMER_RATE` n'est pas touchée : ORES reste le cas de loin le plus répandu |
| **TVA à 6 %** | Annoncée sans condition sur la page Flandre, alors qu'elle suppose un **logement de plus de dix ans** ; en dessous, c'est 21 %, sans l'exception dont bénéficient les pompes à chaleur | Question ajoutée à la FAQ Flandre. La page Wallonie portait déjà la condition |

#### Ce qui a résisté à la vérification

`PROSUMER_RATE = 87` (ORES 2026 : 86,96 €), `CV_PER_MWH = 2,055` (taux Brugel
depuis le 1ᵉʳ avril 2026 pour ≤ 5 kWc), `CV_PRICE = 77 €` (fourchette 65–90 €),
`CERT_YEARS = 10`, `LOAN_MAX = 60 000 €` (Rénoprêt SWCS, 0 %, 30 ans), la fin de
la prime rétroactive flamande au 31 décembre 2025, l'obligation RESCert au
1ᵉʳ janvier 2026 et les coefficients bruxellois 2026 (inchangés ≤ 5 kWc, −11 %
de 5 à 36, −45 % de 36 à 100, plus rien au-delà de 100). Aucun lien mort dans
les douze pages.

### Installation (17 pages)

Repassé le 3 septembre 2026. Le pilier se scinde en deux familles que la
recherche sépare nettement : les pages de **dimensionnement** (kWc, nombre,
dimensions, poids), où l'on tape un calcul, et les pages de **cas particulier**
(balcon, carport, abri, camping-car, toit plat, BIPV), où l'on tape un objet.
Les secondes ont moins de volume mais une intention beaucoup plus nette.

| URL | Principal | Secondaires | Longue traîne (alimente la FAQ) |
|---|---|---|---|
| `/installation` | installation panneaux solaires Belgique | pose de panneaux photovoltaïques, déroulement d'un chantier solaire | combien de temps dure le chantier, faut-il refaire la toiture avant, faut-il un permis d'urbanisme |
| `/installation/puissance` | kWc panneaux solaires | différence kWc et kWh, puissance à installer | combien de kWc pour ma maison, une installation plus puissante coûte-t-elle proportionnellement plus cher |
| `/installation/nombre-de-panneaux` | combien de panneaux solaires pour une maison | nombre de panneaux 3 500 kWh, panneaux de 430 Wc | combien pour ma consommation, plus de panneaux est-ce toujours mieux, puis-je en ajouter plus tard |
| `/installation/dimensions` | dimensions d'un panneau solaire | taille panneau photovoltaïque, surface de toiture nécessaire | ma toiture est petite combien de panneaux, ont-ils tous la même taille, faut-il un espace entre eux |
| `/installation/poids` | poids des panneaux solaires | charge sur la toiture, kg par m² | faut-il renforcer la charpente, le poids pose-t-il problème sur un toit plat |
| `/installation/fixation` | fixation des panneaux solaires | rails de fixation toiture, lestage toit plat | la fixation abîme-t-elle la toiture, laquelle dure le plus longtemps, peut-on démonter et remonter ailleurs |
| `/installation/ombrage` | ombrage panneaux solaires | perte de rendement à l'ombre, micro-onduleur ombrage | un arbre qui ombrage le matin est-ce grave, peut-on élaguer légalement, les micro-onduleurs coûtent-ils plus cher |
| `/installation/toit-plat` | panneaux solaires toit plat | lestage toiture plate, inclinaison optimale | le lestage abîme-t-il l'étanchéité, peut-on en mettre plus que sur un toit incliné |
| `/installation/balcon` | **panneau solaire de balcon** | kit plug and play Belgique, kit solaire locataire | est-ce légal en Belgique, faut-il le déclarer au GRD, est-ce rentable, et si je déménage |
| `/installation/carport` | carport solaire | abri de voiture photovoltaïque, carport et borne de recharge | faut-il un permis pour un carport, coûte-t-il plus cher qu'une toiture, peut-on y brancher une borne |
| `/installation/abri-de-jardin` | panneaux solaires abri de jardin | panneaux sur garage, production détachée de la maison | faut-il un permis, combien de panneaux tiennent dessus, peut-on relier au compteur de la maison |
| `/installation/bipv` | BIPV panneaux intégrés toiture | tuiles solaires, photovoltaïque intégré au bâti | le BIPV est-il plus cher, le rendement est-il moindre, est-ce obligatoire en zone protégée |
| `/installation/camping-car` | panneau solaire camping-car | kit solaire van, batterie de service | quelle puissance pour un camping-car, mêmes panneaux que pour une maison, faut-il une batterie spécifique |
| `/installation/pompe-a-chaleur` | panneaux solaires et pompe à chaleur | dimensionner le solaire pour une PAC, autoconsommation chauffage | faut-il surdimensionner, une PAC consomme-t-elle beaucoup, peut-on l'ajouter après coup |
| `/installation/voiture-electrique` | recharger sa voiture électrique en solaire | borne et panneaux solaires, recharge en autoconsommation | faut-il plus de panneaux avec une voiture, peut-on recharger la nuit, faut-il une batterie domestique |
| `/installation/soi-meme` | installer ses panneaux solaires soi-même | auto-installation photovoltaïque, contrôle RGIE | est-ce légal en Belgique, que doit faire un professionnel, **perd-on les certificats verts à Bruxelles**, combien économise-t-on vraiment |
| `/installation/trouver-un-installateur` | installateur panneaux solaires | installateur certifié RESCert, comparer les devis solaires | comment vérifier une certification, quels signaux d'alarme, l'installateur fait-il les démarches |

#### Ce que la seconde passe a corrigé

| Point | Constat | Fait |
|---|---|---|
| **Permis pour un carport** | La page répondait « généralement oui, puisqu'il s'agit d'une construction nouvelle ». Faux en Wallonie : un carport est dispensé s'il coche **toutes** les conditions (40 m², 2,50 m sous corniche, 3,50 m au faîte, unique sur la propriété, en relation avec la voirie) | Réponse réécrite avec les seuils, et la réserve régionale |
| **Permis pour un abri de jardin** | La page renvoyait aux « règles d'une installation au sol ». Ce n'en est pas une : des panneaux sur un abri **existant** sont dispensés comme sur tout bâtiment existant, et l'abri lui-même l'est jusqu'à 20 m² et 3,50 m, à un mètre de la limite | Les deux questions sont séparées et chiffrées |
| **« RESCert ou équivalent régional »** | Il n'y a pas d'équivalent : RESCert PV est **la même** certification dans les trois régions, avec trois régimes d'obligation. Wallonie : obligatoire pour l'entreprise depuis mars 2023. Bruxelles : sans lui, plus de certificats verts depuis janvier 2026. Flandre : pas obligatoire en résidentiel | Les trois régimes sont écrits, sur la page installateur |
| **Auto-installation à Bruxelles** | La page comparait des coûts sans dire qu'une pose par soi-même **interdit** les certificats verts bruxellois depuis janvier 2026, soit dix ans du seul vrai revenu de la région | Question dédiée. C'est l'argument le plus fort de la page, il en était absent |
| **« Le raccordement exige un professionnel »** | Le RGIE fixe une obligation de résultat, il ne désigne pas l'exécutant. Ce qui est obligatoire, c'est le **contrôle par un organisme agréé** avant mise en service | Formulation corrigée, sans perdre le conseil de prudence |

#### Ce qui a résisté à la vérification

La légalité des kits plug & play depuis avril 2025, le plafond de 800 W,
l'homologation Synergrid et l'obligation de déclarer au GRD **quelle que soit la
puissance** (des sources secondaires prétendent la Flandre exemptée sous 800 W ;
la position prudente de la page est la bonne). `WC_PER_PANEL = 430` et le repère
« 10 panneaux pour 3 500 kWh ». `KWH_PER_KWC_YEAR = 900`, plancher de la
fourchette belge (900 à 1 000) : le site annonce moins que ce qu'il produira,
c'est le bon sens du chiffre. La dispense de permis pour des panneaux posés sur
un bâtiment existant. Aucun lien mort dans les dix-sept pages.

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

1. ~~Restituer la recherche sur Aides & primes et Installation~~ — **fait le
   3 septembre 2026**. Les 46 pages ont désormais leur principal, leurs
   secondaires et leur longue traîne.
2. ~~Reformuler les FAQ à partir de la longue traîne~~ — **fait le 3 septembre
   2026** pour les quatre piliers. 23 questions de longue traîne ont été
   ajoutées à Comprendre et Rentabilité, là où la carte listait une formulation
   que la page n'abordait nulle part : « combien d'années durent des panneaux »
   (absente de la page Longévité), « onduleur ou micro-onduleur » (absente de la
   page Onduleur, alors que son titre SEO la pose), « à quelle fréquence
   nettoyer », « que vaut un kWh injecté », « pourquoi moins en hiver ».
   Les chiffres y sont **interpolés** depuis `src/scripts/`, jamais recopiés :
   l'écart été/hiver vient de `SUMMER_WINTER_RATIO`, le rapport de 8 entre un
   kWh consommé et un kWh injecté se calcule d'`ELECTRICITY_PRICE` sur
   `INJECTION_PRICE`.

   ⚠️ Au passage : **« Creuser le sujet » reposait les questions de la FAQ sur
   24 pages sur 46.** Corrigé, et la règle est écrite dans `pages-contenu.md`.
3. **Brancher un export réel** dès que le site est indexé et que Search Console
   accumule des données — la colonne « Volume » est là pour ça.
