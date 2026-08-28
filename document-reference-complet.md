# Belgreen — Cahier de construction pour Claude Code
## Instructions + contenu complet pour les 30 pages restantes

> **À toi, Claude Code.** La Home, la page Prix (pilier Rentabilité & prix) et la page
> Wallonie-aides sont déjà codées — elles servent de référence pour la structure des
> composants. Toutes les pages ci-dessous réutilisent la même architecture de blocs ; seul le
> contenu et, pour certaines, le module changent. Avant de générer quoi que ce soit :
>
> 1. **Inspecte le code déjà écrit** (Home, Prix, Wallonie-aides) pour connaître les vrais noms
>    de composants et fichiers du repo. Les noms utilisés dans ce document
>    (`orientationSlider`, `billSlider`, "timeline", "comparateur"...) sont des noms de
>    convention issus du design, pas forcément les noms réels du code — fais correspondre
>    toi-même plutôt que de les recréer à l'identique si un composant équivalent existe déjà.
> 2. **Consulte le registre des modules** (section suivante) avant de coder un nouveau
>    composant — plusieurs pages partagent la même famille de module, inutile de dupliquer.
> 3. **Ne récris pas le contenu** des pages marquées ✅ (déjà validées) — utilise le texte tel
>    quel pour toutes les autres.
> 4. **Images** : dossier fourni séparément, nommage `X.X-nom-page-hero.jpg` /
>    `X.X-nom-page-module.jpg` (voir `prompt-higgsfield-toutes-pages.md`).
> 5. **Icônes** : dossier `icones-toutes-pages/X.X-nom-page/*.svg`, un sous-dossier par page,
>    SVG avec `currentColor` (héritent la couleur du texte parent).
>
> **Légende de statut** : ✅ = texte + mockup visuel déjà validés (fichiers séparés
> disponibles, mentionnés dans chaque section). Les autres pages ont leur texte complet
> directement dans ce document — pas de mockup visuel dédié, seul le module est décrit,
> à toi de le construire à partir de la description + du registre ci-dessous.

## Table des matières

### Pilier Aides & primes (11 pages)
1.1 Wallonie : les aides réelles en 2026 ✅
1.2 Tarif prosumer en Wallonie
1.3 Démarches administratives Wallonie
1.4 Bruxelles : certificats verts ✅
1.5 Réglementation bruxelloise 2026
1.6 Démarches administratives Bruxelles ✅
1.7 Flandre : quelles aides en 2026 ✅
1.8 Fin du compteur inversé Flandre ✅
1.9 Démarches administratives Flandre
1.10 Guide entreprises ⚠️ contenu à valider
1.11 Installation en copropriété

### Pilier Installation (19 pages)
**Préparation**
2.1 Orientation & inclinaison ✅
2.2 Nombre de panneaux
2.3 Puissance (kWc)
2.4 Dimensions
2.5 Poids
2.6 Ombrage
2.7 Fixation

**Emplacements**
2.8 Toit incliné ✅
2.9 Toit plat
2.10 Intégré toiture (BIPV)
2.11 Abri de jardin
2.12 Jardin / au sol ✅
2.13 Carport
2.14 Balcon
2.15 Camping-car

**Trouver un pro / installer soi-même**
2.16 Trouver un pro
2.17 Installer soi-même

**Applications**
2.18 Pompe à chaleur
2.19 Voiture électrique

---

## Le wireframe générique (rappel)

```
┌─────────────────────────────────────────┐
│ HERO                                     │
│ [photo] + tag pilier + H1 + réponse      │
│ + CTA "Estimer mon installation"         │
└─────────────────────────────────────────┘

  [texte de transition centré, éditorial]

┌─────────────────────────────────────────┐
│ MODULE (illustré ou interactif)          │
│ + CTA sous le module                     │
└─────────────────────────────────────────┘

  EN BREF — L'essentiel
  [3 cartes chiffres : clair / accent / sombre]
  [pont contextuel 2 liens, si pertinent]

  POUR ALLER PLUS LOIN — Creuser le sujet
  [grille 2x2 de cartes, 1 accent]

  AVANT DE VOUS DÉCIDER — Questions fréquentes
  [liste verticale accordéon]

┌─────────────────────────────────────────┐
│ PONT FINAL (bandeau teal)                │
└─────────────────────────────────────────┘
```

**Gabarit allégé** (pages "démarches") : Hero → transition → Module (timeline) → FAQ → Pont
final. Pas d'essentiel ni de creuser le sujet.

---

## Registre des modules — à lire avant de coder quoi que ce soit

Beaucoup de pages partagent la même famille de module. Objectif : coder chaque famille **une
fois**, la paramétrer, pas la dupliquer 5 fois avec des variables différentes.

### Famille A — Calculateur à slider(s)
**Comportement** : 1-2 sliders/boutons en entrée → recalcul en direct de 2-3 valeurs de sortie
affichées en cartes, avec CTA en dessous.
**Déjà codé** : le mini-simulateur Rénoprêt sur la page Wallonie-aides est une instance de
cette famille — regarde son implémentation en premier.
**Variantes à couvrir avec le même composant générique** (paramètres : inputs, formule,
outputs à afficher) :
- `orientationSlider` — orientation (4 boutons) + inclinaison (slider) → rendement %.
  Pages : Orientation & inclinaison, Jardin/au sol, Toit incliné (3 pages, même composant,
  seul le texte de transition change)
- `billSlider` — puissance (slider) → panneaux/prix/production. Pages : Prix des panneaux
  2026 (déjà codée), Nombre de panneaux
- Calculateur certificats verts — puissance (slider 3-5 kWc) → CV/an, revenu/an, total 10 ans.
  Page : Bruxelles certificats verts
**Recommandation** : si le Rénoprêt n'est pas déjà générique, envisage de le refactoriser en
composant paramétrable (`SliderCalculator`) plutôt que de coder 4 variantes séparées.

### Famille B — Comparateur multi-options
**Comportement** : boutons de sélection (2-3 options) → grille/tableau qui met en évidence la
colonne sélectionnée, résumé texte en dessous.
**Page** : Flandre : quelles aides en 2026 (comparateur Wallonie/Bruxelles/Flandre sur 4
critères). Potentiellement réutilisable sur les pages principales Wallonie et Bruxelles si tu
veux généraliser — à toi de juger.

### Famille C — Bascule 2 états ("avant/après")
**Comportement** : 2 boutons → contenu illustré qui change (texte + éléments visuels/icônes),
transition douce recommandée.
**Pages** : Fin du compteur inversé Flandre (compteur inversé vs tarif d'injection), Ombrage
(onduleur string vs micro-onduleurs — même pattern d'interaction, contenu différent)

### Famille D — Timeline en étapes
**Comportement** : liste verticale numérotée reliée par une ligne verticale, badge accent
optionnel sur une étape spécifique.
**Déjà maquetté** (mockup visuel disponible) : Démarches Bruxelles
**Pages** : Démarches Wallonie, Démarches Bruxelles, Démarches Flandre — 3 pages, même
composant, contenu différent (2-4 étapes selon la page)

### Famille E — Illustration statique / pas de module interactif
**Comportement** : image ou schéma fixe + légende, aucune interactivité. Pour ces pages,
l'accordéon "creuser le sujet" standard suffit, pas besoin de composant dédié.
**Pages** : Réglementation bruxelloise 2026, Poids, Guide entreprises, Copropriété, Puissance
(kWc), Dimensions, Toit plat, BIPV, Abri de jardin, Carport, Balcon, Camping-car, Pompe à
chaleur, Voiture électrique

### Famille F — Grille de cartes-critères / colonnes comparatives
**Comportement** : cartes statiques présentant des critères ou options, pas de calcul.
**Pages** :
- Fixation — 3 cartes (types de fixation)
- Trouver un pro — grille de critères
- Installer soi-même — 2 colonnes "permis / pas permis"

---



## 1.1 Wallonie : les aides réelles en 2026 ✅ déjà mockupé
URL `/aides/wallonie` — voir fichier `redaction-wallonie-aides-2026.md` pour le texte complet et
`wallonie-aides.html` pour le mockup visuel. Module : mini-simulateur Rénoprêt.

## 1.2 Tarif prosumer en Wallonie
URL `/aides/wallonie/tarif-prosumer`
**Module** : mini-calculateur (slider puissance 1-10 kWc → coût annuel = puissance × 87 €)

**H1** : Le tarif prosumer en Wallonie : combien ça coûte réellement ?

**Réponse** : Le tarif prosumer est une redevance annuelle d'environ 87 €/kWe (~435 €/an pour
une installation de 5 kWe chez ORES), entièrement à charge du propriétaire depuis 2024.

**Intro** : Ce n'est pas une prime qu'on vous retire, mais un coût à part entière du solaire en
Wallonie — encore mal connu, et souvent oublié dans les calculs de rentabilité qu'on trouve en ligne.

**Essentiel** *(Sous-titre : Comment ce tarif est calculé, concrètement.)*
- Base de calcul (accent) — La plus petite valeur entre la puissance des panneaux et celle de l'onduleur
- Taux d'autoconsommation retenu — 37,76 % en moyenne dans le calcul
- Facturation (sombre) — Annuelle, par votre gestionnaire de réseau (ORES ou RESA)

**Creuser le sujet** *(Sous-titre : Ce qu'il faut savoir avant d'être surpris par la facture.)*
- **Pourquoi ce tarif existe-t-il ?** Il compense l'usage du réseau électrique par les
  installations qui produisent leur propre électricité mais restent connectées pour les
  moments où elles ne produisent pas assez (nuit, hiver).
- **Le tarif proportionnel, une alternative ?** Avec un compteur communicant, un tarif ajusté
  à votre consommation réelle du réseau peut remplacer le tarif forfaitaire — potentiellement
  plus avantageux si votre autoconsommation est élevée.
- **Ce tarif est-il le même partout en Wallonie ?** Le principe est identique, mais le montant
  exact varie légèrement selon votre gestionnaire de réseau (ORES ou RESA).
- **Le tarif va-t-il encore augmenter ?** Il est révisé chaque année par le régulateur wallon
  (CWaPE) — pas de garantie de stabilité sur le long terme.

**FAQ** *(Sous-titre : Les questions qu'on nous pose le plus souvent sur ce tarif.)*
- **Le tarif prosumer s'applique-t-il dans toute la Belgique ?** Non, c'est spécifique à la
  Wallonie. Bruxelles et la Flandre fonctionnent différemment (certificats verts pour l'une,
  tarif d'injection pour l'autre).
- **Comment réduire mon tarif prosumer ?** En maximisant votre autoconsommation, ou en passant
  au tarif proportionnel si votre profil de consommation s'y prête.
- **Le tarif prosumer va-t-il encore augmenter ?** Possible, il est révisé annuellement par
  la CWaPE.
- **Dois-je le payer même la première année ?** Oui, dès la mise en service de votre installation.

**Pont final** : Le tarif prosumer est déjà intégré dans notre calcul de rentabilité →
**Estimer mon installation**

---

## 1.3 Démarches administratives Wallonie
URL `/aides/wallonie/demarches` — **Gabarit allégé**
**Module** : timeline 4 étapes (réutilise le pattern de la page démarches Bruxelles)

**H1** : Les démarches pour installer des panneaux solaires en Wallonie

**Réponse** : En Wallonie, il faut demander un compteur communicant à votre GRD (gratuit),
faire contrôler l'installation par un organisme RGIE agréé, puis déclarer la mise en service
dans les 45 jours.

**Intro** : Contrairement à Bruxelles, il n'y a pas de certificats à demander en Wallonie —
mais les étapes administratives restent incontournables pour que votre installation soit en règle.

**Module — timeline** :
1. **Compteur communicant** — Demande gratuite auprès de votre GRD (ORES ou RESA), avant la
   mise en service.
2. **Identification de la zone de toiture** — Sans ombrage, orientée idéalement est-sud-ouest.
3. **Contrôle RGIE** `[Pris en charge par notre équipe]` — Obligatoire avant la mise en service,
   quelle que soit la puissance installée.
4. **Déclaration de mise en service** — Dans les 45 jours suivant le contrôle, auprès du GRD.

**FAQ** :
- **Qui contacte le gestionnaire de réseau, moi ou l'installateur ?** Votre installateur s'en
  charge généralement avec vous.
- **Combien de temps prennent ces démarches au total ?** Comptez plusieurs semaines entre la
  demande de compteur et la déclaration finale, hors délai de pose.
- **Que risque-t-on si on ne déclare pas la mise en service ?** Une installation non déclarée
  n'est pas en règle et peut poser problème en cas de contrôle ou de revente du bien.
- **Le contrôle RGIE, c'est payant ?** Oui, c'est un coût à prévoir dans le budget, distinct du
  prix de l'installation elle-même.

**Pont final** : Notre équipe s'occupe de toutes ces démarches pour vous → **Estimer mon installation**

---

## 1.4 Bruxelles : certificats verts, comment ça marche ✅ déjà mockupé
URL `/aides/bruxelles` — voir `redaction-bruxelles-certificats-verts.md` et
`bruxelles-certificats-verts.html`. Module : calculateur de certificats verts.

## 1.5 Réglementation bruxelloise 2026
URL `/aides/bruxelles/reglementation-2026`
**Module** : aucun — accordéon simple suffit (sujet réglementaire, pas de variable à calculer)

**H1** : RESCert PV à Bruxelles : ce qui est obligatoire depuis 2026

**Réponse** : Depuis le 1er janvier 2026, toute nouvelle installation photovoltaïque de 5 kWc
ou moins à Bruxelles doit obtenir un certificat RESCert PV délivré par un installateur certifié
pour accéder aux certificats verts.

**Intro** : Une nouvelle règle, simple sur le papier, mais qui peut bloquer tout un dossier de
certificats verts si elle est oubliée. Voici ce qu'il faut savoir.

**Essentiel** *(Sous-titre : Ce qui change concrètement depuis 2026.)*
- RESCert PV (accent) — Obligatoire pour toute installation ≤5 kWc
- Sans ce certificat — Pas d'accès aux certificats verts, même si l'installation fonctionne
- Coefficients de CV (sombre) — Révisés à partir du 1ᵉʳ avril 2026 par Brugel

**Creuser le sujet** *(Sous-titre : Ce que ça implique pour vous et votre installateur.)*
- **Qu'est-ce qu'un installateur certifié RESCert ?** Un professionnel formé et accrédité pour
  délivrer ce certificat de conformité, reconnu par la région bruxelloise.
- **Que risque-t-on sans RESCert ?** L'impossibilité d'obtenir des certificats verts, quelle
  que soit la qualité réelle de l'installation.
- **Ça change quoi pour les installations existantes ?** La règle s'applique aux nouvelles
  installations à partir de 2026 — les installations déjà en service ne sont pas concernées
  rétroactivement.

**FAQ** :
- **Qu'est-ce qu'un installateur certifié RESCert exactement ?** Un professionnel accrédité
  pour délivrer le certificat de conformité obligatoire depuis 2026.
- **Que risque-t-on sans RESCert ?** Aucun accès aux certificats verts.
- **Ça change quoi pour les installations existantes ?** Rien rétroactivement, la règle vise
  les nouvelles installations.

**Pont final** : Notre équipe est certifiée RESCert — votre dossier est en règle dès le départ
→ **Estimer mon installation**

---

## 1.6 Démarches administratives Bruxelles ✅ déjà mockupé
URL `/aides/bruxelles/demarches` — voir `redaction-demarches-bruxelles.md` et
`demarches-bruxelles.html`. Module : timeline 3 étapes avec badge Sibelga.

## 1.7 Flandre : quelles aides en 2026 ✅ déjà mockupé
URL `/aides/flandre` — voir `redaction-flandre-aides-2026.md`. Module : comparateur 3 régions.

## 1.8 Fin du compteur inversé en Flandre ✅ déjà mockupé
URL `/aides/flandre/fin-compteur-inverse` — voir `redaction-fin-compteur-inverse-flandre.md`.
Module : schéma avant/après.

## 1.9 Démarches administratives Flandre
URL `/aides/flandre/demarches` — **Gabarit allégé**
**Module** : timeline 3 étapes

**H1** : Les démarches pour installer des panneaux solaires en Flandre

**Réponse** : En Flandre, le compteur digital Fluvius est obligatoire pour bénéficier du tarif
d'injection. La déclaration se fait via la plateforme Mijn Fluvius.

**Intro** : Ici, tout passe par un seul interlocuteur — Fluvius — ce qui simplifie les démarches
par rapport à Bruxelles.

**Module — timeline** :
1. **Compteur digital Fluvius** — Obligatoire pour accéder au tarif d'injection.
2. **Déclaration de mise en service** — Via la plateforme en ligne Mijn Fluvius.
3. **Activation du tarif d'injection** `[Pris en charge par notre équipe]` — Une fois le
   compteur digital installé et la déclaration validée.

**FAQ** :
- **Comment demander mon compteur digital à Fluvius ?** Via leur plateforme en ligne ou en
  contactant directement Fluvius.
- **Que faire si je n'ai pas encore de compteur digital ?** Vous êtes probablement dans la
  file d'attente du déploiement en cours (voir la page "Fin du compteur inversé").
- **Le compteur digital est-il payant ?** Non, le déploiement est pris en charge par Fluvius.
- **Combien de temps prend l'installation du compteur ?** Ça dépend du calendrier de
  déploiement dans votre zone — comptez plusieurs semaines à quelques mois.

**Pont final** : On gère ces démarches avec Fluvius pour vous → **Estimer mon installation**

---

## 1.10 Guide entreprises
URL `/aides/entreprises`
**Module** : aucun

⚠️ **Cette page contient des zones à valider avant publication** — la fiscalité professionnelle
n'a pas été vérifiée aussi profondément que le résidentiel dans nos recherches.

**H1** : Panneaux solaires pour entreprises : quelles règles en 2026 ?

**Réponse** : Contrairement au résidentiel, une entreprise ne bénéficie pas de la TVA réduite
à 6 % sur son installation solaire, et suit un régime d'amortissement fiscal distinct.
[À VALIDER : détail exact du régime d'amortissement applicable]

**Intro** : Le solaire professionnel obéit à des règles différentes du résidentiel — voici ce
qu'on peut confirmer, et ce qui reste à valider avec un comptable ou fiscaliste avant de s'engager.

**Essentiel** *(Sous-titre : Ce qui diffère du résidentiel.)*
- TVA — 21 % standard, pas de taux réduit comme pour les particuliers
- Certificats verts — Accessibles à Bruxelles pour toute puissance ; en Wallonie, uniquement
  au-delà de 10 kWc
- Amortissement fiscal — [À VALIDER : mécanisme exact selon le régime de l'entreprise]

**Creuser le sujet** *(Sous-titre : Les questions à poser avant de se lancer.)*
- **Une entreprise peut-elle bénéficier d'aides spécifiques ?** [À VALIDER — recherche
  complémentaire nécessaire selon secteur et région]
- **Les certificats verts sont-ils accessibles aux professionnels ?** Oui à Bruxelles pour
  toute puissance ; en Wallonie, seulement au-delà de 10 kWc, la limite qui a mis fin au
  Solwatt résidentiel en 2014 ne s'applique pas aux plus grosses installations.
- **Existe-t-il des aides sectorielles (agriculture, PME) ?** [À VALIDER]

**FAQ** :
- **Une entreprise peut-elle bénéficier de la TVA à 6 % ?** Non, sauf cas particuliers à
  vérifier au cas par cas.
- **Quelles sont les aides spécifiques aux entreprises en 2026 ?** [À VALIDER avant publication]
- **Les certificats verts sont-ils accessibles aux professionnels partout en Belgique ?** Pas
  uniformément — Bruxelles reste la plus accessible, la Wallonie réserve ça aux installations
  de plus de 10 kWc.

**Pont final** : Parlons de votre projet professionnel → **Nous contacter**

---

## 1.11 Installation en copropriété
URL `/aides/copropriete`
**Module** : illustration statique (schéma du processus de décision en assemblée générale, pas d'interactivité)

**H1** : Installer des panneaux solaires en copropriété : comment ça se décide

**Réponse** : Installer des panneaux solaires en copropriété est possible, mais nécessite
l'accord de l'assemblée générale des copropriétaires — la toiture étant une partie commune.

**Intro** : Ce n'est pas plus compliqué qu'une autre rénovation de toiture, mais ça passe par
une étape que les propriétaires individuels n'ont pas : convaincre l'assemblée.

**Essentiel** *(Sous-titre : Ce qu'il faut savoir avant d'en parler en AG.)*
- Règlement de copropriété (accent) — Doit autoriser l'installation et la répartition de
  l'électricité produite
- Permis d'urbanisme — Pas nécessaire si l'aspect extérieur n'est pas modifié de façon visible
- Répartition (sombre) — À définir entre copropriétaires participants

**Creuser le sujet** *(Sous-titre : Les questions pratiques avant l'assemblée générale.)*
- **Qui décide : l'unanimité ou une majorité suffit ?** Ça dépend du règlement de copropriété
  et du type de décision (installation simple vs modification structurelle) — à vérifier avec
  le syndic.
- **Comment répartir l'électricité produite entre copropriétaires ?** Plusieurs modèles
  existent, du partage égal à une répartition selon la participation financière de chacun —
  à définir en amont dans le règlement.
- **Faut-il un permis d'urbanisme en copropriété ?** Les mêmes règles qu'ailleurs s'appliquent :
  pas de permis si l'aspect extérieur visible depuis la rue n'est pas modifié.
- **Qui paie si tous les copropriétaires ne participent pas ?** Seuls les copropriétaires
  participants financent l'installation et se partagent l'électricité produite, typiquement.

**FAQ** : *(mêmes questions que ci-dessus, reformulées en Q/R courtes pour l'accordéon)*
- Qui décide en copropriété ?
- Comment répartir l'électricité produite ?
- Faut-il un permis d'urbanisme en copropriété ?
- Qui paie si tous les copropriétaires n'y participent pas ?

**Pont final** : Discutons de votre projet en copropriété avec notre équipe →
**Estimer mon installation**
> Suite de `doc-reference-dev-1-aides-primes.md`. Même format.

---

# Sous-pilier PRÉPARATION (7 pages)

## 2.1 Orientation & inclinaison ✅ déjà mockupé
URL `/installation/orientation-inclinaison` — voir `redaction-orientation-inclinaison.md`.
Module : `orientationSlider` (brique partagée simulateur).

## 2.2 Nombre de panneaux
URL `/installation/nombre-panneaux`
**Module** : `billSlider` réutilisé (puissance kWc → nb de panneaux, prix, production —
même composant que la page Prix, texte de transition différent)

**H1** : Combien de panneaux solaires faut-il pour ma maison ?

**Réponse** : Le nombre de panneaux dépend de votre consommation annuelle et de la puissance
de chaque panneau (environ 400 à 450 Wc aujourd'hui). Pour une consommation moyenne de
3 800 kWh/an, comptez généralement 12 à 14 panneaux.

**Intro** : "Combien de panneaux" est souvent la première question concrète qu'on se pose —
voici comment ce chiffre se calcule, et pourquoi il n'est pas fixe.

**Essentiel** *(Sous-titre : Ce qui détermine le nombre de panneaux.)*
- Panneau standard (accent) — Environ 400 à 450 Wc aujourd'hui
- 6 kWc — Environ 13 à 14 panneaux de cette puissance
- Limite réelle (sombre) — La surface de toiture disponible, pas seulement la consommation

**Creuser le sujet** *(Sous-titre : Les questions qu'on se pose une fois le calcul fait.)*
- **Plus de panneaux, c'est toujours mieux ?** Non — au-delà de votre consommation réelle plus
  une marge raisonnable, les panneaux supplémentaires produisent un surplus faiblement valorisé
  (tarif d'injection ou prosumer selon la région), donc moins rentable.
- **Puis-je ajouter des panneaux plus tard ?** Techniquement oui, mais ça implique une nouvelle
  déclaration et parfois un changement d'onduleur si la puissance totale dépasse sa capacité.
- **Le nombre change-t-il selon la marque ?** Oui, un panneau haute puissance (500 Wc et plus)
  atteint la même puissance totale avec moins d'unités, ce qui peut compter sur une petite toiture.
- **Faut-il toujours viser sa consommation exacte ?** Pas nécessairement — une installation
  légèrement surdimensionnée peut avoir du sens si vous prévoyez une pompe à chaleur ou une
  voiture électrique.

**FAQ** :
- **Plus de panneaux, c'est toujours mieux ?** Non, au-delà d'un certain seuil le surplus est
  faiblement valorisé.
- **Puis-je ajouter des panneaux plus tard ?** Oui, avec une nouvelle déclaration et parfois un
  changement d'onduleur.
- **Le nombre de panneaux change-t-il selon la marque ?** Oui, les panneaux haute puissance
  réduisent le nombre nécessaire.

**Pont final** : Le nombre exact dépend de votre toiture et votre consommation →
**Estimer mon installation**

---

## 2.3 Puissance (kWc)
URL `/installation/puissance`
**Module** : schéma illustratif statique kWc vs kWh (pas de calcul, juste une explication visuelle)

**H1** : Le kWc, qu'est-ce que c'est et de combien ai-je besoin ?

**Réponse** : Le kWc (kilowatt-crête) mesure la puissance maximale qu'une installation peut
produire dans des conditions standardisées de test. Les installations résidentielles belges
vont généralement de 3 à 10 kWc.

**Intro** : kWc, kWh — deux unités qui se ressemblent mais ne mesurent pas la même chose.
Voici la différence, en clair.

**Essentiel** *(Sous-titre : Deux unités à ne pas confondre.)*
- kWc (accent) — La puissance maximale théorique de l'installation
- kWh — L'énergie réellement produite sur une période donnée
- Gamme résidentielle (sombre) — 3 à 10 kWc en Belgique

**Creuser le sujet** *(Sous-titre : Ce que ça change concrètement pour votre projet.)*
- **Quelle est la différence entre kWc et kWh ?** Le kWc est une capacité maximale mesurée en
  conditions de test standardisées (1000 W/m², 25°C) ; le kWh est l'énergie que votre
  installation produit réellement, qui varie selon la météo, la saison et l'heure.
- **Comment savoir combien de kWc me faut-il ?** Ça dépend de votre consommation annuelle, de
  votre surface de toiture disponible et de son orientation — c'est exactement ce que calcule
  le simulateur.
- **Le prix est-il proportionnel à la puissance ?** Pas tout à fait — le prix par Wc diminue
  généralement à mesure que la puissance installée augmente (économies d'échelle).

**FAQ** :
- Quelle est la différence entre kWc et kWh ?
- Comment savoir combien de kWc me faut-il ?
- Une installation plus puissante coûte-t-elle proportionnellement plus cher ?

**Pont final** : Quelle puissance vous faut-il vraiment ? → **Estimer mon installation**

---

## 2.4 Dimensions
URL `/installation/dimensions`
**Module** : visuel comparatif de surface (illustration statique, comparaison à une référence connue)

**H1** : Quelles dimensions pour une installation solaire ?

**Réponse** : Un panneau solaire standard mesure environ 1,7 à 1,9 m de long sur 1 à 1,13 m de
large, soit environ 1,9 à 2 m² par panneau. Une installation de 14 panneaux nécessite donc
environ 27 à 30 m² de toiture.

*(Valeurs standards du marché, à recaler sur les specs réelles des panneaux installés.)*

**Intro** : Avant de savoir combien de panneaux tiennent sur votre toit, il faut savoir de
combien d'espace chacun a besoin.

**Essentiel** *(Sous-titre : L'espace nécessaire, en repères concrets.)*
- Un panneau (accent) — Environ 1,9 à 2 m²
- 14 panneaux — Environ 27 à 30 m² de toiture
- Espacement (sombre) — Prévoir une marge entre rangées, surtout hors toit incliné classique

**Creuser le sujet** *(Sous-titre : Les questions qu'on se pose sur l'espace disponible.)*
- **Ma toiture est petite, combien de panneaux puis-je installer ?** Ça dépend de la surface
  utile réelle une fois les obstacles retirés (cheminée, fenêtre de toit, zones d'ombre) —
  souvent moins que la surface totale du toit.
- **Les panneaux ont-ils tous la même taille ?** Non, ça varie selon le fabricant et la
  puissance du panneau — les modèles haute puissance sont parfois légèrement plus grands.
- **Faut-il laisser de l'espace entre les panneaux ?** Sur un toit incliné classique, très peu.
  Sur un toit plat ou au sol, l'espacement entre rangées devient nécessaire pour éviter les
  ombres portées.

**FAQ** :
- Ma toiture est petite, combien de panneaux puis-je installer ?
- Les panneaux ont-ils tous la même taille ?
- Faut-il laisser de l'espace entre les panneaux ?

**Pont final** : Entrez votre surface de toiture, on calcule ce qui y tient →
**Estimer mon installation**

---

## 2.5 Poids
URL `/installation/poids`
**Module** : aucun — accordéon simple suffit

**H1** : Les panneaux solaires, quel poids sur ma toiture ?

**Réponse** : Un panneau solaire pèse environ 20 à 22 kg. Pour une installation de 14 panneaux,
le poids total avoisine 280 à 310 kg, réparti sur toute la toiture — largement dans la capacité
de charge de la plupart des toitures belges.

**Intro** : Une inquiétude fréquente, rarement justifiée — voici quand le poids devient
vraiment un sujet, et quand il ne l'est pas.

**Essentiel** *(Sous-titre : Ce qu'il faut vérifier avant de s'inquiéter.)*
- Poids par panneau (accent) — Environ 20 à 22 kg
- Répartition — Sur toute la surface, jamais concentré en un point
- Cas particulier (sombre) — Toitures anciennes ou déjà fragilisées, à faire vérifier

**Creuser le sujet** *(Sous-titre : Les questions qu'on nous pose sur la solidité du toit.)*
- **Ma toiture doit-elle être renforcée avant l'installation ?** Rarement pour une charpente en
  bon état — c'est surtout un sujet pour les toitures anciennes ou déjà fragilisées.
- **Le poids est-il un problème pour un toit plat ?** Un peu plus qu'en toiture inclinée à
  cause du système de lestage, mais ça reste dans les capacités standards de la plupart des
  toits plats résidentiels.
- **Comment savoir si ma charpente peut supporter des panneaux ?** Une vérification visuelle
  par un professionnel suffit dans la grande majorité des cas — une étude structurelle poussée
  n'est nécessaire que pour les cas douteux.

**FAQ** :
- Ma toiture doit-elle être renforcée avant l'installation ?
- Le poids est-il un problème pour un toit plat ?
- Comment savoir si ma charpente peut supporter des panneaux ?

**Pont final** : Un doute sur votre toiture ? Notre équipe évalue ça gratuitement →
**Estimer mon installation**

---

## 2.6 Ombrage
URL `/installation/ombrage`
**Module** : schéma animé "effet domino" (illustration, bascule avant/après comme le module
compteur inversé — montre l'effet d'une ombre sur une chaîne de panneaux)

**H1** : L'ombrage : pourquoi une seule ombre peut coûter cher

**Réponse** : Même une ombre partielle sur un seul panneau peut réduire significativement la
production de toute une chaîne de panneaux. Des micro-onduleurs ou optimiseurs de puissance
limitent cet impact en isolant chaque panneau.

**Intro** : Une cheminée, une antenne, un arbre voisin — l'ombrage semble un détail, mais c'est
l'un des facteurs qui pénalise le plus le rendement s'il n'est pas anticipé.

**Essentiel** *(Sous-titre : L'effet domino de l'ombre, en résumé.)*
- Panneaux en série (accent) — Un seul panneau ombragé pénalise toute la chaîne
- Solution — Micro-onduleurs ou optimiseurs de puissance, un par panneau
- Sources fréquentes (sombre) — Cheminées, arbres, bâtiments voisins, antennes

**Creuser le sujet** *(Sous-titre : Ce qu'il faut anticiper avant l'installation.)*
- **Un arbre qui fait de l'ombre le matin seulement, est-ce vraiment un problème ?** Ça dépend
  de la technologie choisie — avec un onduleur string classique, oui, même une ombre partielle
  temporaire réduit la production de toute la chaîne concernée.
- **Les micro-onduleurs coûtent-ils plus cher ?** Oui, mais l'investissement se justifie si
  votre toiture a des sources d'ombrage partielles difficiles à éviter autrement.
- **Peut-on couper les branches qui gênent, légalement ?** Ça dépend si l'arbre est sur votre
  terrain ou celui d'un voisin — les règles de mitoyenneté s'appliquent comme pour toute
  question de branches débordantes.

**FAQ** :
- Un arbre qui fait de l'ombre le matin, est-ce vraiment un problème ?
- Les micro-onduleurs coûtent-ils plus cher ?
- Peut-on couper les branches qui gênent, légalement ?

**Pont final** : On évalue l'ombrage de votre toit lors de l'analyse gratuite →
**Estimer mon installation**

---

## 2.7 Fixation
URL `/installation/fixation`
**Module** : cartes "3 types de fixation" (grille illustrée, pas d'interactivité nécessaire)

**H1** : Comment sont fixés les panneaux solaires ?

**Réponse** : La fixation dépend du type de toiture : rails sur crochets pour un toit incliné,
lest ou plots sans percement pour un toit plat, intégration directe pour le BIPV.

**Intro** : Trois grandes familles de fixation, chacune adaptée à un type de toiture — le
détail complet par type de toit se trouve dans les pages "Emplacements", celle-ci reste la
vue d'ensemble.

**Essentiel — 3 cartes** *(Sous-titre : Les 3 grandes familles de fixation.)*
- Toit incliné (accent) — Rails sur crochets accrochés à la charpente
- Toit plat — Structure lestée ou plots, souvent sans perçage
- BIPV (sombre) — Panneaux intégrés directement au revêtement de toiture

**Creuser le sujet** *(Sous-titre : Ce qui détermine la durée de vie de la fixation.)*
- **La fixation abîme-t-elle la toiture ?** Sur un toit incliné, quelques tuiles sont
  temporairement déplacées au niveau des crochets puis remises en place — le reste n'est pas
  touché. Sur toit plat, le lestage évite tout perçage.
- **Quelle fixation dure le plus longtemps ?** Les systèmes sur rails/crochets et les systèmes
  lestés sont tous deux conçus pour durer aussi longtemps que les panneaux (25-30 ans), avec un
  entretien minimal.
- **Peut-on démonter et remonter une installation ailleurs ?** Techniquement oui pour la plupart
  des systèmes de fixation, mais c'est une opération qui demande un professionnel et n'est pas
  toujours économiquement intéressante.

**FAQ** :
- La fixation abîme-t-elle la toiture ?
- Quelle fixation dure le plus longtemps ?
- Peut-on démonter et remonter une installation ailleurs ?

**Pont final** : Le bon système de fixation dépend de votre toiture — on s'en charge →
**Estimer mon installation**

---

# Sous-pilier EMPLACEMENTS (8 pages)

## 2.8 Toit incliné ✅ déjà mockupé
URL `/installation/emplacements/toit-incline` — voir `redaction-toit-incline.md`.
Module : `orientationSlider`.

## 2.9 Toit plat
URL `/installation/emplacements/toit-plat`
**Module** : illustration statique — coupe latérale montrant l'inclinaison de la structure et
l'espacement entre rangées

**H1** : Panneaux solaires sur toit plat : comment ça marche ?

**Réponse** : Sur un toit plat, les panneaux sont posés sur une structure inclinée
(généralement 10-15°) lestée par des blocs de béton, sans perçage de l'étanchéité.

**Intro** : Pas de pente naturelle ne veut pas dire pas d'inclinaison — juste une structure en
plus pour la recréer artificiellement.

**Essentiel** *(Sous-titre : Ce qui différencie le toit plat du toit incliné.)*
- Structure inclinée (accent) — Généralement 10 à 15°
- Lestage — Blocs de béton, pas de perçage de l'étanchéité
- Espacement (sombre) — Nécessaire entre rangées pour éviter les ombres portées

**Creuser le sujet** *(Sous-titre : Les questions spécifiques au toit plat.)*
- **Le lestage abîme-t-il l'étanchéité du toit ?** Non, c'est justement l'intérêt du lestage —
  aucun perçage, la membrane d'étanchéité reste intacte.
- **Peut-on installer plus de panneaux sur un toit plat qu'incliné ?** Pas nécessairement —
  l'espacement obligatoire entre rangées pour éviter les ombres portées réduit la densité
  effective par rapport à un toit incliné bien orienté.
- **Faut-il un accès spécifique pour l'entretien ?** Un accès de toit plat classique suffit
  généralement, sans équipement particulier.

**FAQ** :
- Le lestage abîme-t-il l'étanchéité du toit ?
- Peut-on installer plus de panneaux sur un toit plat qu'incliné ?
- Faut-il un accès spécifique pour l'entretien ?

**Pont final** : **Estimer mon installation**

---

## 2.10 Intégré toiture (BIPV)
URL `/installation/emplacements/bipv`
**Module** : illustration comparative — panneaux classiques vs intégrés, côte à côte

**H1** : Le BIPV : des panneaux solaires intégrés à la toiture

**Réponse** : Le BIPV (Building Integrated Photovoltaics) intègre les panneaux directement dans
le revêtement de toiture — comme des tuiles solaires — au lieu de les poser par-dessus. Plus
esthétique, mais plus coûteux qu'une installation classique.

**Intro** : Pour qui privilégie l'esthétique ou doit respecter des contraintes patrimoniales,
le BIPV est une alternative à connaître — à condition d'en accepter le surcoût.

**Essentiel** *(Sous-titre : Ce qui distingue le BIPV d'une installation classique.)*
- Intégration (accent) — Remplace le revêtement de toiture, ne se pose pas par-dessus
- Esthétique — Moins visible, adapté aux zones protégées ou patrimoniales
- Coût (sombre) — Généralement plus élevé qu'une installation classique en surimposition

**Creuser le sujet** *(Sous-titre : Ce qu'il faut peser avant de choisir le BIPV.)*
- **Le BIPV est-il vraiment plus cher qu'une installation classique ?** Oui, généralement,
  parce qu'il remplace un matériau de toiture en plus de produire de l'électricité — le coût
  intègre les deux fonctions.
- **Le rendement du BIPV est-il le même que des panneaux classiques ?** Globalement comparable
  à orientation égale, même si certaines solutions BIPV ont un rendement légèrement inférieur
  aux panneaux classiques les plus performants.
- **Le BIPV est-il obligatoire en zone protégée ?** Pas systématiquement obligatoire, mais
  souvent recommandé ou exigé par les autorités locales pour préserver l'aspect du bâti.

**FAQ** :
- Le BIPV est-il vraiment plus cher qu'une installation classique ?
- Le rendement du BIPV est-il le même que des panneaux classiques ?
- Le BIPV est-il obligatoire en zone protégée ?

**Pont final** : **Estimer mon installation** *(note dev : coefficient de prix spécifique BIPV
à prévoir, le module standard sous-estimerait le coût réel)*

---

## 2.11 Abri de jardin
URL `/installation/emplacements/abri-de-jardin`
**Module** : aucun

**H1** : Panneaux solaires sur un abri de jardin

**Réponse** : Un abri de jardin peut accueillir quelques panneaux solaires, une solution
d'appoint plutôt qu'une installation principale, souvent utilisée en complément du toit de la
maison.

**Intro** : Pas de quoi remplacer une vraie installation, mais une option utile pour grappiller
quelques panneaux supplémentaires quand la toiture principale est saturée.

**Essentiel** *(Sous-titre : Ce qu'il faut savoir sur cette solution d'appoint.)*
- Rôle (accent) — Complément, rarement une installation principale
- Puissance — Limitée par la petite surface disponible
- Raccordement (sombre) — Possible au même compteur que la maison

**Creuser le sujet** *(Sous-titre : Les questions pratiques sur cette solution d'appoint.)*
- **Combien de panneaux tiennent sur un abri de jardin ?** Ça dépend de sa taille, mais
  généralement quelques unités seulement, rarement plus de 4-6 panneaux.
- **Faut-il un permis pour un abri de jardin avec panneaux ?** Les mêmes règles générales
  s'appliquent que pour une installation au sol — pas de permis dans la plupart des cas
  résidentiels standards.
- **Peut-on relier cette installation au compteur principal de la maison ?** Oui, c'est même la
  configuration la plus courante.

**FAQ** :
- Combien de panneaux tiennent sur un abri de jardin ?
- Faut-il un permis pour un abri de jardin avec panneaux ?
- Peut-on relier cette installation au compteur principal de la maison ?

**Pont final** : **Estimer mon installation**

---

## 2.12 Jardin / au sol ✅ déjà mockupé
URL `/installation/emplacements/au-sol` — voir `redaction-jardin-au-sol.md`.
Module : `orientationSlider`.

## 2.13 Carport
URL `/installation/emplacements/carport`
**Module** : illustration/photo simple, pas d'interactivité

**H1** : Le carport solaire : abri et production combinés

**Réponse** : Un carport solaire combine abri pour véhicule et production d'électricité — une
solution idéale pour qui veut aussi recharger une voiture électrique directement sous ses
panneaux.

**Intro** : Deux besoins réglés d'un coup — abriter la voiture, produire de l'électricité —
avec un vrai bonus si cette électricité sert justement à la recharger.

**Essentiel** *(Sous-titre : Ce qui rend le carport solaire particulier.)*
- Double fonction (accent) — Abri + production électrique
- Synergie — Idéal avec une borne de recharge pour véhicule électrique
- Structure (sombre) — Construction indépendante, pas de contrainte de toiture existante

**Creuser le sujet** *(Sous-titre : Les questions avant de se lancer dans un carport solaire.)*
- **Un carport solaire coûte-t-il plus cher qu'une installation en toiture ?** Oui généralement,
  car il faut construire la structure porteuse en plus des panneaux eux-mêmes.
- **Peut-on combiner carport solaire et borne de recharge ?** Oui, c'est même l'un des cas
  d'usage les plus cohérents — voir la page dédiée "Voiture électrique".
- **Faut-il un permis pour construire un carport avec panneaux ?** Généralement oui, un carport
  étant une construction nouvelle plutôt qu'un ajout sur une structure existante — à vérifier
  auprès de votre commune.

**FAQ** :
- Un carport solaire coûte-t-il plus cher qu'une installation en toiture ?
- Peut-on combiner carport solaire et borne de recharge ?
- Faut-il un permis pour construire un carport avec panneaux ?

**Pont final** : **Estimer mon installation** — lien contextuel vers
`/installation/applications/voiture-electrique`

---

## 2.14 Balcon
URL `/installation/emplacements/balcon`
**Module** : illustration du kit plug & play (produit, pas de calcul)

**H1** : Panneau solaire de balcon : le kit plug & play

**Réponse** : Depuis avril 2025, les panneaux solaires "plug & play" homologués sont légaux en
Belgique pour une installation sur balcon, sans professionnel — une solution accessible aux
locataires.

**Intro** : La seule page de ce site qui s'adresse vraiment aux locataires, pas seulement aux
propriétaires — une vraie option d'entrée dans le solaire, à petite échelle.

**Essentiel** *(Sous-titre : Ce qu'il faut savoir avant d'installer un kit plug & play.)*
- Légal depuis (accent) — Avril 2025, si le matériel est homologué et listé chez Synergrid
- Installation — Auto-installable, branché sur une prise domestique standard
- Déclaration (sombre) — Obligatoire au GRD, quelle que soit la puissance

**Creuser le sujet** *(Sous-titre : Ce qu'il faut vérifier avant d'acheter un kit.)*
- **Un locataire peut-il vraiment installer des panneaux solaires ?** Oui, avec un kit plug &
  play homologué — mais mieux vaut vérifier auprès du propriétaire et, en copropriété, auprès
  de l'ACP avant de l'installer.
- **Le kit plug & play est-il rentable ?** Sur une petite échelle, oui, mais avec un retour sur
  investissement plus long qu'une installation complète, vu la puissance limitée.
- **Dois-je déclarer mon kit même s'il est petit ?** Oui, la déclaration "nouvelle production
  d'énergie" au GRD est obligatoire quelle que soit la puissance, même minime.
- **Que se passe-t-il si je déménage ?** Le kit est démontable et transportable — c'est un de
  ses avantages par rapport à une installation fixe.

**FAQ** :
- Un locataire peut-il vraiment installer des panneaux solaires ?
- Le kit plug & play est-il rentable ?
- Dois-je déclarer mon kit même s'il est petit ?
- Que se passe-t-il si je déménage ?

**Pont final** *(ton plus doux, pas le CTA simulateur classique — ce public n'est pas
prioritairement propriétaire)* : Vous êtes propriétaire et voulez une vraie installation ? →
**Estimer mon installation**

---

## 2.15 Camping-car
URL `/installation/emplacements/camping-car`
**Module** : illustration statique simple

**H1** : Panneau solaire pour camping-car : l'essentiel

**Réponse** : Un système solaire pour camping-car fonctionne différemment d'une installation
domestique : panneaux basse tension (12V), batterie embarquée, pas de raccordement au réseau
électrique.

**Intro** : Un univers à part — pas de GRD, pas de déclaration, juste de l'autonomie électrique
en déplacement.

**Essentiel** *(Sous-titre : Ce qui distingue le solaire camping-car du solaire résidentiel.)*
- Tension (accent) — Système basse tension (12V), pas comparable au résidentiel
- Stockage — Batterie embarquée, indispensable
- Raccordement (sombre) — Aucun, système autonome hors réseau

**Creuser le sujet** *(Sous-titre : Les questions fréquentes sur le solaire mobile.)*
- **Quelle puissance pour un camping-car ?** Généralement entre 100 et 400 Wc selon l'usage
  (appoint ou autonomie complète), largement en dessous des puissances résidentielles.
- **Peut-on utiliser les mêmes panneaux que pour une maison ?** Techniquement possible mais pas
  optimal — les panneaux camping-car sont conçus pour être plus légers et résister aux
  vibrations de la route.
- **Faut-il une batterie spécifique ?** Oui, une batterie adaptée au cyclage fréquent
  (décharge/charge répétées), différente d'une batterie domestique classique.

**FAQ** :
- Quelle puissance pour un camping-car ?
- Peut-on utiliser les mêmes panneaux que pour une maison ?
- Faut-il une batterie spécifique ?

**Pont final** *(léger/optionnel, ce public n'est pas la cible principale du funnel devis
résidentiel)*

---

# Sous-pilier TROUVER UN PRO / INSTALLER SOI-MÊME (2 pages)

## 2.16 Trouver un pro
URL `/installation/trouver-un-pro`
**Module** : grille de cartes-critères (réutilise le pattern "Creuser le sujet" comme contenu
principal plutôt qu'un module séparé)

**H1** : Comment bien choisir son installateur de panneaux solaires

**Réponse** : Un bon installateur photovoltaïque en Belgique est certifié (RESCERT ou
équivalent régional), assuré en responsabilité civile professionnelle, et vous remet un devis
détaillé avant travaux.

**Intro** : Le marché du solaire attire aussi des acteurs peu sérieux — voici les critères
concrets pour faire le tri, que vous passiez par nous ou par un autre installateur.

**Essentiel** *(Sous-titre : Les 3 critères non négociables.)*
- Certification (accent) — RESCERT ou équivalent régional selon votre zone
- Assurance — Responsabilité civile professionnelle
- Devis (sombre) — Détaillé, remis avant le début des travaux

**Creuser le sujet** *(Sous-titre : Ce qui distingue un bon installateur d'un mauvais.)*
- **Comment vérifier qu'un installateur est bien certifié ?** Demandez le numéro de
  certification et vérifiez-le auprès de l'organisme régional compétent (RESCERT ou équivalent).
- **Faut-il toujours comparer plusieurs devis ?** C'est recommandé, mais assurez-vous de
  comparer des devis à puissance et qualité de matériel équivalentes — pas seulement le prix final.
- **Quels sont les signaux d'alarme d'un mauvais installateur ?** Une pression commerciale
  forte pour signer immédiatement, un devis flou sans détail du matériel, ou l'absence
  d'assurance vérifiable.
- **L'installateur s'occupe-t-il de toutes les démarches administratives ?** Ça devrait être le
  cas pour un installateur sérieux — RGIE, déclaration GRD, et selon la région, RESCert ou
  Sibelga.

**FAQ** :
- Comment vérifier qu'un installateur est bien certifié ?
- Faut-il toujours comparer plusieurs devis ?
- Quels sont les signaux d'alarme d'un mauvais installateur ?
- L'installateur s'occupe-t-il de toutes les démarches administratives ?

**Pont final** : Vous parlez directement à l'équipe qui installe, pas à un commercial →
**Estimer mon installation**

---

## 2.17 Installer soi-même
URL `/installation/installer-soi-meme`
**Module** : deux colonnes "permis / pas permis" en cartes

**H1** : Peut-on installer ses panneaux solaires soi-même ?

**Réponse** : Poser soi-même des panneaux solaires sur sa toiture est légal en Belgique, mais
le raccordement électrique et le contrôle de conformité RGIE doivent obligatoirement être
réalisés par un professionnel avant la mise en service.

**Intro** : Ni totalement interdit, ni totalement libre — voici la limite précise entre ce que
vous pouvez faire vous-même et ce qui doit passer par un professionnel.

**Essentiel — 2 colonnes** *(Sous-titre : Ce qui est permis, ce qui ne l'est pas.)*

*Permis (accent)* :
- Poser les panneaux sur la toiture/façade
- Installer un kit plug & play homologué (voir page "Balcon")

*Pas permis sans professionnel (sombre)* :
- Le raccordement au tableau électrique
- Le contrôle de conformité RGIE
- L'installation d'une batterie domestique (interdit en auto-installation depuis la révision RGIE 2025)

**Creuser le sujet** *(Sous-titre : Ce qu'il faut savoir avant de se lancer soi-même.)*
- **Puis-je vraiment poser mes panneaux moi-même légalement ?** Oui, la pose physique sur la
  toiture est autorisée — c'est le raccordement électrique et le contrôle qui nécessitent un
  professionnel.
- **Que dois-je absolument faire faire par un professionnel ?** Le raccordement au tableau
  électrique et le contrôle RGIE, obligatoires avant toute mise en service, quel que soit qui a
  posé les panneaux.
- **Que risque-t-on en cas de contrôle RGIE négatif ?** Une non-conformité qui empêche la mise
  en service tant que les corrections nécessaires n'ont pas été faites par un professionnel.
- **L'auto-installation, ça fait vraiment économiser de l'argent au final ?** Une partie du
  coût seulement, puisque le raccordement et le contrôle restent obligatoirement facturés — le
  gain porte surtout sur la main-d'œuvre de pose elle-même.

**FAQ** :
- Puis-je vraiment poser mes panneaux moi-même légalement ?
- Que dois-je absolument faire faire par un professionnel ?
- Que risque-t-on en cas de contrôle RGIE négatif ?
- L'auto-installation, ça fait vraiment économiser de l'argent au final ?

**Pont final** *(CTA différent, service partiel — à confirmer que Belgreen le propose)* : Vous
posez vous-même ? On peut s'occuper juste du raccordement et du contrôle → **Nous contacter**

---

# Sous-pilier APPLICATIONS (2 pages)

## 2.18 Pompe à chaleur
URL `/installation/applications/pompe-a-chaleur`
**Module** : schéma illustratif simple (flux panneaux → pompe à chaleur)

**H1** : Panneaux solaires et pompe à chaleur : la combinaison gagnante

**Réponse** : Combiner panneaux solaires et pompe à chaleur permet d'augmenter
significativement votre taux d'autoconsommation : l'électricité produite en journée alimente
directement le chauffage plutôt que d'être réinjectée au réseau à faible valeur.

**Intro** : Deux investissements qui se renforcent l'un l'autre — la pompe à chaleur consomme
de l'électricité au bon moment pour profiter pleinement de votre production solaire.

**Essentiel** *(Sous-titre : Pourquoi cette combinaison a du sens.)*
- Autoconsommation (accent) — Augmente significativement quand la PAC utilise l'électricité solaire
- Timing — La production solaire coïncide avec les besoins de chauffage en mi-saison
- Dimensionnement (sombre) — À adapter si une PAC est déjà prévue ou installée

**Creuser le sujet** *(Sous-titre : Ce qu'il faut anticiper si vous avez ou prévoyez une PAC.)*
- **Faut-il surdimensionner l'installation solaire pour une pompe à chaleur ?** C'est souvent
  pertinent, une PAC étant un des postes de consommation électrique les plus importants du
  foyer — une puissance solaire plus généreuse maximise l'autoconsommation.
- **Une pompe à chaleur consomme-t-elle beaucoup d'électricité ?** Oui, c'est généralement le
  poste de consommation électrique le plus important d'une maison équipée, d'où l'intérêt de
  la coupler au solaire.
- **Peut-on ajouter une pompe à chaleur après coup, sans agrandir l'installation solaire ?**
  Oui, mais l'autoconsommation sera moins optimisée qu'avec un dimensionnement pensé dès le départ.

**FAQ** :
- Faut-il surdimensionner l'installation solaire pour une pompe à chaleur ?
- Une pompe à chaleur consomme-t-elle beaucoup d'électricité ?
- Peut-on ajouter une pompe à chaleur après coup, sans agrandir l'installation solaire ?

**Pont final** : Simulez votre installation en tenant compte de votre pompe à chaleur →
**Estimer mon installation**

---

## 2.19 Voiture électrique
URL `/installation/applications/voiture-electrique`
**Module** : schéma illustratif simple (flux panneaux → borne de recharge)

**H1** : Recharger sa voiture électrique avec des panneaux solaires

**Réponse** : Une borne de recharge alimentée par vos panneaux solaires permet de recharger
votre véhicule électrique avec une électricité largement autoproduite, plutôt qu'achetée au réseau.

**Intro** : Comme pour la pompe à chaleur, la voiture électrique transforme un surplus solaire
peu valorisé en économie directe sur un poste de dépense important.

**Essentiel** *(Sous-titre : Ce qui rend cette combinaison intéressante.)*
- Économie (accent) — Recharge à l'électricité autoproduite plutôt qu'achetée
- Synergie — Particulièrement pertinent avec un carport solaire (voir page dédiée)
- Timing (sombre) — Recharger en journée maximise l'usage direct de la production

**Creuser le sujet** *(Sous-titre : Les questions fréquentes sur cette combinaison.)*
- **Faut-il plus de panneaux si on a une voiture électrique ?** Recommandé, une recharge
  régulière représentant une consommation électrique importante à couvrir au mieux par la
  production solaire.
- **Peut-on recharger la nuit avec des panneaux solaires ?** Pas directement — sans batterie de
  stockage, l'électricité solaire n'est disponible qu'en journée ; la nuit, la recharge vient
  du réseau classique.
- **Une batterie domestique est-elle nécessaire pour ça ?** Pas indispensable, mais elle permet
  de décaler l'usage de l'électricité solaire produite en journée vers une recharge nocturne.

**FAQ** :
- Faut-il plus de panneaux si on a une voiture électrique ?
- Peut-on recharger la nuit avec des panneaux solaires ?
- Une batterie domestique est-elle nécessaire pour ça ?

**Pont final** : Ajoutez une borne de recharge à votre simulation → **Estimer mon installation**
— lien contextuel vers `/installation/emplacements/carport`
