# Proposition UX — Outils de conversion
## Panneaux Photovoltaïques BE · Mars 2026

---

> **Objectif de ce document**
> Présenter 3 options d'outils de conversion visiteur → prospect,
> du plus simple au plus complet, pour valider l'approche avant développement.

---

## Contexte & problématique

Le site actuel informe mais ne convertit pas. Un visiteur qui cherche à savoir si les panneaux solaires sont rentables pour lui repart sans réponse personnalisée — et donc sans laisser ses coordonnées.

**La solution :** un outil interactif qui répond à la question *"Est-ce rentable pour moi ?"* et capte un email en échange d'un résultat personnalisé.

Trois niveaux d'ambition sont proposés ci-dessous.

---

---

# OPTION 1 — Analyse Personnalisée

> **`/analyse`** · Formulaire multi-étapes · Contact humain

---

## Concept

Un formulaire en 3 étapes courtes (< 3 minutes), pensé comme une conversation.
Le visiteur répond à des questions simples sur sa maison, sa consommation et son projet.
Il reçoit une estimation immédiate, et peut demander à être contacté par un expert.

**Ce que ça n'est pas :** un devis. C'est une pré-qualification qui donne envie d'aller plus loin.

---

## Parcours visiteur

```
Étape 1 : Ma maison
→ Région · Type de logement · Orientation du toit · Ombrage

Étape 2 : Ma consommation
→ Facture mensuelle · Nombre de personnes · Équipements énergivores

Étape 3 : Mon projet + Email
→ Maturité du projet · Devis déjà reçus · Prénom + Email

→ PAGE RÉSULTAT
   Économies estimées · Investissement · ROI · Aides région
   + Proposition de contact expert (optionnel)
   + Téléchargement PDF (optionnel)
```

---

## Wireframe — Étapes (mobile)

```
┌────────────────────────────────┐    ┌────────────────────────────────┐
│ PROGRESS ●────○────○           │    │ PROGRESS ●────●────○           │
│ Étape 1/3 · Ma maison          │    │ Étape 2/3 · Ma consommation    │
├────────────────────────────────┤    ├────────────────────────────────┤
│                                │    │                                │
│  Votre région ?                │    │  Facture mensuelle ?           │
│  ○ Bruxelles-Capitale          │    │  ○ Moins de 100 €/mois         │
│  ○ Wallonie                    │    │  ○ 100 – 200 €/mois            │
│  ○ Flandre                     │    │  ○ 200 – 350 €/mois            │
│                                │    │  ○ Plus de 350 €/mois          │
│  Orientation du toit ?         │    │                                │
│  ○ Sud (idéal)                 │    │  Personnes dans le logement ?  │
│  ○ Sud-Est / Sud-Ouest         │    │  [−]   2   [+]                 │
│  ○ Est / Ouest                 │    │                                │
│  ○ Je ne sais pas              │    │  Équipements énergivores ?     │
│                                │    │  ☐ Voiture électrique          │
│  Ombrage sur le toit ?         │    │  ☐ Pompe à chaleur             │
│  ○ Non, toit dégagé            │    │  ☐ Aucun                       │
│  ○ Partiellement               │    │                                │
│  ○ Fortement ombragé           │    │  ┌──────────┐  ┌────────────┐  │
│                                │    │  │ ← Retour │  │ Continuer→ │  │
│  ┌──────────────────────────┐  │    │  └──────────┘  └────────────┘  │
│  │       Continuer →        │  │    │                                │
│  └──────────────────────────┘  │    └────────────────────────────────┘
└────────────────────────────────┘
```

## Wireframe — Page résultat (mobile)

```
┌────────────────────────────────┐
│  ✅ Bon potentiel solaire       │
│  Votre estimation, [Prénom]    │
├────────────────────────────────┤
│                                │
│  💶 Économies estimées         │
│       ~950 – 1 300 €/an        │
│                                │
│  🏗️ Investissement             │
│       8 000 – 12 000 €         │
│       (avant aides)            │
│                                │
│  📈 Retour sur investissement  │
│       7 – 10 ans               │
│                                │
│  🏛️ Aides en Wallonie          │
│     ✓ Prime énergie            │
│     ✓ Tarif prosumer           │
│                                │
│  ⚠️ Estimation indicative      │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  Parler à un expert →    │  │
│  └──────────────────────────┘  │
│     Gratuit · Sans engagement  │
│                                │
│  [Télécharger mon résultat PDF]│
└────────────────────────────────┘
```

---

## Ce que ça implique techniquement

- Formulaire multi-étapes React (composant client)
- Calcul côté client sur barèmes configurés dans le CMS
- Route d'API pour envoi d'email (Resend / Brevo)
- Génération PDF côté serveur (résultats simples)

---

## Points forts · Points faibles

| Points forts | Points faibles |
|---|---|
| Simple à expliquer au visiteur | Résultats peu précis (pas de m², pas de tarif réel) |
| Pas de données personnelles à l'étape 1 | Pas de différenciant fort vs concurrents |
| Encourage le contact humain | PDF basique |
| Rapide à développer | |

---
---

# OPTION 2 — Simulateur Photovoltaïque

> **`/simulateur`** · Calculateur en temps réel · Email + PDF automatique

---

## Concept

Un simulateur "outil" où le visiteur entre des données plus précises (m² de toiture, kWh de consommation) et voit ses résultats **se mettre à jour en direct**, sans soumission.

Il entre son email pour recevoir un **PDF personnalisé** envoyé automatiquement.
L'expérience est celle d'un outil en ligne, pas d'un formulaire.

---

## Parcours visiteur

```
Tout sur une page :

1. Inputs (sliders + sélecteurs)
   → Région · Surface toiture (m²) · Consommation (kWh/an) · Orientation

2. Résultats mis à jour en temps réel
   → Puissance recommandée (kWc) · Nb de panneaux · Économies €/an · ROI

3. Capture email
   → Prénom + Email → PDF envoyé automatiquement par email
```

---

## Wireframe — Vue d'ensemble (mobile)

```
┌────────────────────────────────┐
│  "Simulez votre installation"  │
├────────────────────────────────┤
│                                │
│  INPUTS                        │
│  ─────────────────────────── │
│  Région :                      │
│  ○ Bruxelles  ○ Wallonie       │
│  ○ Flandre                     │
│                                │
│  Surface toiture               │
│  ┌──────────────────────────┐  │
│  │       30 m²              │  │
│  └──────────────────────────┘  │
│  ├──────────────────────────┤  │
│  10 m²                100 m²   │
│                                │
│  Consommation annuelle         │
│  ┌──────────────────────────┐  │
│  │     3 500 kWh/an         │  │
│  └──────────────────────────┘  │
│  ├──────────────────────────┤  │
│  1 000 kWh          10 000 kWh │
│                                │
│  Orientation :                 │
│  ○ Sud  ○ Sud-E/O  ○ Est/Ouest │
│                                │
├────────────────────────────────┤
│                                │
│  RÉSULTATS [live]              │
│  ─────────────────────────── │
│                                │
│  ⚡  4,2 kWc recommandés       │
│  🔲  10 – 11 panneaux (400 Wc) │
│  💶  ~1 050 – 1 300 €/an       │
│  📈  ROI : 7 – 10 ans          │
│  🏛️  Aides Wallonie disponibles │
│                                │
├────────────────────────────────┤
│                                │
│  RECEVOIR MON PDF              │
│  ─────────────────────────── │
│  [Prénom]  [Email]             │
│                                │
│  ┌──────────────────────────┐  │
│  │    Recevoir mon PDF →    │  │
│  └──────────────────────────┘  │
│  🔒 Pas de spam · Résultats    │
│  uniquement                    │
│                                │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  Parler à un expert →    │  │
│  └──────────────────────────┘  │
│     Sans engagement · Gratuit  │
└────────────────────────────────┘
```

---

## Wireframe — Desktop (disposition côte à côte)

```
┌──────────────────────────────────────────────────────────┐
│  INPUTS (colonne gauche)   │  RÉSULTATS (colonne droite) │
│                            │  [sticky — suit le scroll]  │
│  Région                    │                             │
│  [○ BXL] [○ WAL] [○ FLA]  │  ⚡  4,2 kWc               │
│                            │  🔲  10 – 11 panneaux       │
│  Surface toiture           │  💶  ~1 050 – 1 300 €/an    │
│  [slider  30 m²]           │  📈  ROI : 7 – 10 ans       │
│                            │  🏛️  Aides disponibles       │
│  Consommation              │                             │
│  [slider  3500 kWh/an]     │  ─────────────────────────  │
│                            │  [Recevoir mon PDF]         │
│  Orientation               │  [Parler à un expert]       │
│  [○ Sud] [○ S-E/O] [○ E/O] │                             │
└──────────────────────────────────────────────────────────┘
```

---

## Aperçu du PDF envoyé

```
┌──────────────────────────────┐
│  [LOGO]                      │
│  SIMULATION PHOTOVOLTAÏQUE   │
│  Pour : [Prénom] · [Date]    │
│                              │
│  Vos paramètres              │
│  Région : Wallonie           │
│  Surface : 30 m²             │
│  Consommation : 3 500 kWh/an │
│                              │
│  Résultats                   │
│  Puissance : 4,2 kWc         │
│  Panneaux  : 10 – 11         │
│  Économies : ~1 100 €/an     │
│  ROI       : 7 – 10 ans      │
│                              │
│  Aides Wallonie              │
│  ✓ Prime énergie             │
│  ✓ Tarif prosumer            │
│                              │
│  ⚠️ Estimation indicative     │
│  [CTA : Prendre RDV]         │
│  [Coordonnées entreprise]    │
└──────────────────────────────┘
```

---

## Ce que ça implique techniquement

- Composant React client avec sliders interactifs
- Calcul instantané côté navigateur (pas d'API pour les résultats)
- Route d'API pour génération PDF + envoi email
- Barèmes (tarifs, aides) configurables dans le CMS

---

## Points forts · Points faibles

| Points forts | Points faibles |
|---|---|
| Expérience "outil" — plus engageante | Demande des données plus précises (m²) |
| Résultats immédiats sans soumission | Le visiteur doit connaître sa consommation |
| PDF automatique = valeur perçue forte | Tarifs moyens, pas les tarifs réels |
| Lead gen plus qualifiée (email contre PDF) | |
| Différenciant visible vs concurrents | |

---
---

# OPTION 3 — Simulateur Pro / Devis en ligne

> **`/simulateur-pro`** · 4 étapes · Tarifs réels · Carte ensoleillement · Devis PDF complet

---

## Concept

Un outil de niveau professionnel qui simule une véritable étude de faisabilité.
Le visiteur renseigne des données précises, le simulateur utilise :
- la **carte d'ensoleillement belge réelle** par commune (données IRM)
- les **tarifs Engie / EDF Luminus en temps réel**
- une **simulation de revente sur le réseau** (prosumer, injection) selon la région

Il reçoit un **PDF devis 4 pages** avec le logo de l'entreprise — l'équivalent d'un pré-devis.

---

## Parcours visiteur

```
Étape 1 : Ma localisation
→ Commune ou code postal
→ Carte d'ensoleillement belge affichée en temps réel
→ Potentiel solaire de la commune révélé (kWh/kWc/an)

Étape 2 : Ma toiture
→ Surface utilisable (m²) · Inclinaison · Orientation (boussole visuelle)
→ Type de toit · Ombrage

Étape 3 : Mon énergie
→ Fournisseur actuel (Engie, EDF Luminus…)
→ Tarif €/kWh récupéré automatiquement
→ Consommation · Équipements · Scénario souhaité (autoconsommation / revente / batterie)

Étape 4 : Mon devis
→ Prénom · Nom · Email · Tél. (optionnel)
→ Option : être contacté par un installateur agréé

→ RÉSULTAT COMPLET
   Simulation autoconsommation + revente réseau
   Graphique ROI sur 25 ans
   Aides détaillées par région
   PDF devis 4 pages téléchargeable + envoyé par email
```

---

## Wireframe — Étape 1 : Localisation + Carte (mobile)

```
┌────────────────────────────────┐
│ PROGRESS ●────○────○────○      │
│ Étape 1/4 · Ma localisation    │
├────────────────────────────────┤
│                                │
│  Commune ou code postal        │
│  ┌──────────────────────────┐  │
│  │  Liège                   │  │
│  │  ─────────────────────   │  │
│  │  Liège (4000)        ←   │  │
│  │  Liège-Guillemins (4000)  │  │
│  └──────────────────────────┘  │
│                                │
│  [CARTE BELGIQUE               │
│   zones colorées               │
│   selon ensoleillement]        │
│  ┌──────────────────────────┐  │
│  │    🟧🟧🟨🟨🟨           │  │
│  │   🟧🟧🟧🟨🟨🟨          │  │
│  │  🟧🟧📍🟧🟨🟨🟨         │  │  ← 📍 Liège marquée
│  │   🟧🟧🟧🟧🟨🟨          │  │
│  │    🟨🟨🟨🟨🟨           │  │
│  │                           │  │
│  │  ■ > 1 050  ■ 950-1 050   │  │
│  │  ■ < 950 kWh/kWc/an       │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  ☀️ Liège                 │  │
│  │  970 kWh/kWc/an           │  │
│  │  Potentiel ●●●●○          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │       Continuer →        │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

## Wireframe — Résultat complet (mobile)

```
┌────────────────────────────────┐
│  ✅ Excellent potentiel solaire │
│  [Prénom Nom] · Liège          │
├────────────────────────────────┤
│                                │
│  INSTALLATION RECOMMANDÉE      │
│  ⚡ 4,8 kWc · 12 panneaux 400Wc│
│  ☀️ Production ~4 650 kWh/an   │
│  🏗️ Investissement 7 – 11 k€   │
│                                │
├────────────────────────────────┤
│                                │
│  SIMULATION FINANCIÈRE         │
│  [Tab: Autoconso | Revente]    │
│                                │
│  Taux d'autoconsommation : 72% │
│                                │
│  💶 Économies sur facture      │
│     ~1 020 €/an                │
│     (tarif Engie : 0,33 €/kWh) │
│                                │
│  ↗️ Surplus revendu            │
│     ~1 300 kWh/an              │
│     Revenu : ~52 €/an          │
│                                │
│  📈 TOTAL GAIN : ~1 072 €/an   │
│  📅 ROI estimé : 7 – 9 ans     │
│                                │
├────────────────────────────────┤
│                                │
│  GRAPHIQUE [sur 25 ans]        │
│  ┌──────────────────────────┐  │
│  │  €  ╱────────────────    │  │
│  │     ╱ ← seuil ROI (8 ans)│  │
│  │  0  5   10   15   20  25 │  │
│  └──────────────────────────┘  │
│  Gain net 25 ans : ~17 800 €   │
│                                │
├────────────────────────────────┤
│                                │
│  AIDES WALLONIE                │
│  ✓ Prime énergie               │
│  ✓ Tarif prosumer              │
│  ✓ TVA réduite 6%              │
│  Impact total : ~2 400 €       │
│                                │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │  📄 Télécharger mon devis│  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  Être contacté par un    │  │
│  │  installateur agréé →    │  │
│  └──────────────────────────┘  │
│     Devis terrain · Gratuit    │
│     Sans engagement            │
└────────────────────────────────┘
```

## Wireframe — PDF Devis (aperçu 4 pages)

```
PAGE 1 · COUVERTURE          PAGE 2 · DONNÉES
┌──────────────────┐         ┌──────────────────┐
│ [LOGO]           │         │ VOS DONNÉES       │
│                  │         │ Commune : Liège   │
│ SIMULATION       │         │ Surface : 35 m²   │
│ PHOTOVOLTAÏQUE   │         │ Orientation : Sud │
│                  │         │ Fournisseur: Engie│
│ Pour :           │         │ Tarif : 0,33€/kWh │
│ [Prénom Nom]     │         │                   │
│ Liège, Wallonie  │         │ INSTALLATION      │
│                  │         │ 4,8 kWc · 12 panx │
│ Mars 2026        │         │ ~4 650 kWh/an     │
│ Réf: SIM-2026-   │         │ Invest: 7–11 k€   │
│     XXXXX        │         └──────────────────┘
└──────────────────┘

PAGE 3 · SIMULATION          PAGE 4 · AIDES & SUITE
┌──────────────────┐         ┌──────────────────┐
│ SIMULATION 25 ANS│         │ AIDES WALLONIE    │
│                  │         │ ✓ Prime énergie   │
│ Autoconso : 72%  │         │ ✓ Tarif prosumer  │
│ Économies: 1020€ │         │ ✓ TVA 6%          │
│ Revente :   52€  │         │ Total : ~2 400 €  │
│ ─────────────── │         │                   │
│ TOTAL : 1 072€/an│         │ PROCHAINES ÉTAPES │
│ ROI    : 7–9 ans │         │ 1. Inspect. terrain│
│                  │         │ 2. Devis définitif │
│ [GRAPHIQUE ROI]  │         │ 3. Dossier aides  │
│                  │         │ 4. Installation   │
│ Gain net 25 ans: │         │                   │
│ ~17 800 €        │         │ [QR → Prendre RDV]│
└──────────────────┘         │ [Coordonnées]     │
                             └──────────────────┘
```

---

## Ce que ça implique techniquement

- 4 étapes React avec conservation des données entre étapes
- Carte SVG Belgique interactive (données IRM par commune)
- API externe pour tarifs live Engie / EDF Luminus (VREG)
- Calcul revente réseau différencié par région (prosumer Flandre ≠ injection Wallonie)
- Génération PDF 4 pages avec logo, graphique, données personnalisées
- Envoi email avec PDF en pièce jointe

---

## Points forts · Points faibles

| Points forts | Points faibles |
|---|---|
| Outil de niveau professionnel | Plus complexe à développer |
| Tarifs réels = crédibilité maximale | Dépend d'APIs externes (risque indispo) |
| Carte ensoleillement = wow effect | Parcours 4 étapes = plus de friction |
| PDF devis = document tangible, brandé | Données communes à maintenir à jour |
| Lead ultra-qualifiée | |
| Différenciant fort vs concurrents | |

---
---

# Comparatif des 3 options

| | Option 1 · Analyse | Option 2 · Simulateur | Option 3 · Simulateur Pro |
|---|---|---|---|
| **Page** | `/analyse` | `/simulateur` | `/simulateur-pro` |
| **Expérience** | Formulaire guidé | Outil / calculateur | Outil professionnel |
| **Données demandées** | Simples (choix multiples) | Précises (m², kWh) | Très précises (commune, fournisseur) |
| **Résultats** | Estimation large | Estimation chiffrée live | Simulation complète |
| **Tarifs utilisés** | Moyennes statiques | Moyennes statiques | Tarifs réels live |
| **Revente réseau** | Non | Non | Oui, par région |
| **Carte ensoleillement** | Non | Non | Oui, par commune |
| **Lead gen** | Email optionnel | Email contre PDF | Email + tél. optionnel |
| **PDF** | Résumé simple | Simulation personnalisée | Devis 4 pages brandé |
| **Qualité du lead** | Curieux | Qualifiés | Chauds / décidés |
| **Temps remplissage** | ~2 min | ~1 min | ~4 min |
| **Complexité dev** | ★★☆☆☆ | ★★☆☆☆ | ★★★★☆ |
| **Budget estimé** | ✦ | ✦✦ | ✦✦✦✦ |

---

# Recommandation

## Proposition : approche progressive en 2 phases

### Phase 1 — À développer maintenant

**Option 1 + Option 2 en parallèle**

- `/analyse` pour les visiteurs qui veulent être accompagnés par un humain
- `/simulateur` pour les visiteurs autonomes qui veulent un chiffre immédiat
- Les deux pages se renforcent : le mini-simulateur de l'accueil redirige vers `/simulateur`, le CTA "analyse complète" redirige vers `/analyse`

```
Accueil
   │
   ├─ "Je veux un chiffre rapide" → /simulateur (PDF auto)
   │
   └─ "Je veux qu'un expert m'aide" → /analyse (contact humain)
```

### Phase 2 — Après validation du trafic et des conversions

**Option 3** — `/simulateur-pro`

Une fois les premières conversions analysées et le budget validé, le simulateur pro peut remplacer ou compléter le simulateur basique pour les prospects les plus avancés.

---

## Prochaines étapes proposées

| Étape | Action | Priorité |
|---|---|---|
| ✅ Wireframes validés | Ce document | Fait |
| ☐ Validation client | Choisir l'approche Phase 1 | À faire |
| ☐ Design UI | Appliquer le design system | À faire |
| ☐ Développement | Next.js + Sanity + API email | À planifier |
| ☐ Tests utilisateurs | 5 tests avec profils cibles | Recommandé |
| ☐ Mise en ligne | Suivi analytics (étapes, conversions) | À planifier |

---

*Document préparé · Mars 2026*
*Wireframes basse fidélité — structure et parcours uniquement, pas de couleurs définitives*
