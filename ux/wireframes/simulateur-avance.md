# Wireframe — Simulateur Photovoltaïque Avancé (Option 3)
> Fidelité : **Low fidelity** — structure et parcours uniquement
> Approche : **Mobile-first** · Simulateur pro · Devis PDF ultra-personnalisé
> Différence clé vs Option 2 : données réelles (tarifs live, carte ensoleillement), simulation revente réseau, devis complet

---

## 1. Objectif & contexte

| Attribut | Valeur |
|---|---|
| Page | `/simulateur-pro` |
| Cible | Prospect sérieux, prêt à passer à l'acte |
| Inputs | Localisation précise, contrat énergie actuel, tarif fournisseur réel |
| Outputs | Simulation complète avec revente réseau, devis PDF avec logo |
| Différenciants | Carte ensoleillement belge, tarifs Engie/EDF Luminus en temps réel, calcul prosumer |
| Ton | Expert, professionnel — l'équivalent d'un pré-devis en ligne |

---

## 2. Interaction Flow

```
[Entrée /simulateur-pro]
       │
       ▼
┌─────────────────────┐
│   ÉTAPE 1           │  ← Localisation (commune + code postal)
│   Ma localisation   │     + carte ensoleillement qui s'affiche
└──────────┬──────────┘
           │ [Continuer →]
           ▼
┌─────────────────────┐
│   ÉTAPE 2           │  ← Toiture (surface, orientation, inclinaison, ombrage)
│   Ma toiture        │
└──────────┬──────────┘
           │ [Continuer →]
           ▼
┌─────────────────────┐
│   ÉTAPE 3           │  ← Consommation + fournisseur actuel
│   Mon énergie       │     Tarif actuel récupéré via API (Engie / EDF Luminus)
└──────────┬──────────┘
           │ [Continuer →]
           ▼
┌─────────────────────┐
│   ÉTAPE 4           │  ← Identité prospect (prénom, nom, email, tél. optionnel)
│   Mes coordonnées   │     + option revente réseau / batterie
└──────────┬──────────┘
           │ [Générer mon devis →]
           ▼
┌─────────────────────────────────┐
│   RÉSULTAT COMPLET + DEVIS PDF  │
│   Simulation autoconsommation   │
│   Simulation revente réseau     │
│   Comparatif scénarios          │
│   [Télécharger PDF devis]       │
│   [Être contacté par un expert] │
└─────────────────────────────────┘
```

---

## 3. Wireframe — Mobile (320px–480px)

### ÉTAPE 1 — Ma localisation

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]      [Simulation pro]   │
└────────────────────────────────┘

┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────○────────○────────○  │
│ Étape 1 / 4  "Ma localisation" │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Où est située           │
│       votre maison ?"          │
│                                │
│ Commune ou code postal         │
│ ┌──────────────────────────┐   │
│ │  [champ texte + autocomplete│  │
│ │   ex: "Liège" ou "4000"] │   │
│ └──────────────────────────┘   │
│                                │
│ [CARTE D'ENSOLEILLEMENT]       │
│ ┌──────────────────────────┐   │
│ │  [Carte Belgique colorée │   │
│ │   rouge/orange/jaune      │   │
│ │   selon irradiation]      │   │
│ │                           │   │
│ │  📍 [Votre commune        │   │
│ │     marquée en temps réel]│   │
│ │                           │   │
│ │  Légende :                │   │
│ │  ■ > 1050 kWh/kWc/an      │   │
│ │  ■ 950-1050               │   │
│ │  ■ < 950                  │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ ☀️ Ensoleillement         │   │
│ │    [Votre commune] :      │   │
│ │    [XXX] kWh/kWc/an       │   │
│ │    [Potentiel ●●●●○]      │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │  Continuer →             │   │
│ └──────────────────────────┘   │
│                                │
└────────────────────────────────┘
```

### ÉTAPE 2 — Ma toiture

```
┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────●────────○────────○  │
│ Étape 2 / 4  "Ma toiture"      │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Décrivez votre toiture"  │
│                                │
│ ── Surface utilisable (m²) ─── │
│                                │
│ ┌──────────────────────────┐   │
│ │     [  30  ] m²          │   │
│ └──────────────────────────┘   │
│ [slider 10 → 120 m²]           │
│ [ℹ️ Comment mesurer ?]         │
│                                │
│ ── Inclinaison du toit ──────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Plat (0-10°)          │   │
│ │ ○  Légèrement incliné    │   │
│ │    (10-30°) — optimal    │   │
│ │ ○  Fortement incliné     │   │
│ │    (30-60°)              │   │
│ │ ○  Je ne sais pas        │   │
│ └──────────────────────────┘   │
│                                │
│ ── Orientation principale ───  │
│                                │
│ [BOUSSOLE VISUELLE]            │
│ ┌──────────────────────────┐   │
│ │       N                  │   │
│ │    NW   NE               │   │
│ │  W    [+]    E           │   │
│ │    SW   SE               │   │
│ │       S ← optimal        │   │
│ └──────────────────────────┘   │
│ [○ N] [○ NE] [○ E] [○ SE]      │
│ [○ S] [○ SO] [○ O] [○ NO]      │
│                                │
│ ── Ombrage ─────────────────── │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Aucun — toit dégagé   │   │
│ │ ○  Léger (arbres éloign.)│   │
│ │ ○  Modéré (cheminée,     │   │
│ │    arbre proche)         │   │
│ │ ○  Important             │   │
│ └──────────────────────────┘   │
│                                │
│ ── Type de toit ─────────────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Tuiles (classique)    │   │
│ │ ○  Ardoises              │   │
│ │ ○  Bac acier             │   │
│ │ ○  Plat (EPDM/gravier)   │   │
│ └──────────────────────────┘   │
│                                │
│ ┌────────────────┐  ┌────────┐ │
│ │ ← Retour      │  │Contin.→│ │
│ └────────────────┘  └────────┘ │
│                                │
└────────────────────────────────┘
```

### ÉTAPE 3 — Mon énergie

```
┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────●────────●────────○  │
│ Étape 3 / 4  "Mon énergie"     │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Votre consommation       │
│       et votre contrat"        │
│                                │
│ ── Fournisseur actuel ───────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Engie                 │   │
│ │ ○  EDF Luminus           │   │
│ │ ○  Fluvius / Ores        │   │
│ │ ○  TotalEnergies         │   │
│ │ ○  Autre                 │   │
│ └──────────────────────────┘   │
│                                │
│ ── Tarif €/kWh actuel ───────  │
│ [Récupéré automatiquement]     │
│                                │
│ ┌──────────────────────────┐   │
│ │ ✅ Tarif Engie (2025)    │   │
│ │    0,33 €/kWh            │   │
│ │    [Modifier manuellement]│   │
│ └──────────────────────────┘   │
│                                │
│ ── Consommation annuelle ────  │
│                                │
│ [Tab: kWh/an] [Tab: €/mois]    │
│ ┌──────────────────────────┐   │
│ │     [ 3500 ] kWh/an      │   │
│ └──────────────────────────┘   │
│ [slider 500 → 15000 kWh]       │
│                                │
│ ── Équipements ─────────────── │
│ (impact sur calcul autoconso.) │
│                                │
│ ┌──────────────────────────┐   │
│ │ ☐  Pompe à chaleur       │   │
│ │ ☐  Voiture électrique    │   │
│ │ ☐  Borne de recharge     │   │
│ │ ☐  Chauffe-eau élec.     │   │
│ └──────────────────────────┘   │
│                                │
│ ── Scénario souhaité ────────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Autoconsommation max. │   │
│ │    (sans batterie)        │   │
│ │                           │   │
│ │ ○  Autoconsommation +     │   │
│ │    revente sur réseau     │   │
│ │                           │   │
│ │ ○  Autonomie max.         │   │
│ │    (avec batterie)        │   │
│ └──────────────────────────┘   │
│                                │
│ ┌────────────────┐  ┌────────┐ │
│ │ ← Retour      │  │Contin.→│ │
│ └────────────────┘  └────────┘ │
│                                │
└────────────────────────────────┘
```

### ÉTAPE 4 — Mes coordonnées

```
┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────●────────●────────●  │
│ Étape 4 / 4  ← Dernière étape │
│ "Mon devis"                    │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Recevez votre devis      │
│       personnalisé"            │
│                                │
│ Prénom *                       │
│ ┌──────────────────────────┐   │
│ │  [champ]                 │   │
│ └──────────────────────────┘   │
│                                │
│ Nom *                          │
│ ┌──────────────────────────┐   │
│ └──────────────────────────┘   │
│                                │
│ Email *                        │
│ ┌──────────────────────────┐   │
│ └──────────────────────────┘   │
│                                │
│ Téléphone (optionnel)          │
│ ┌──────────────────────────┐   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ ☐ Je souhaite qu'un      │   │
│ │   installateur agréé me  │   │
│ │   contacte avec un devis │   │
│ │   complet (gratuit)      │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │  Générer mon devis →     │   │
│ └──────────────────────────┘   │
│                                │
│ 🔒 RGPD · Données utilisées    │
│ uniquement pour votre devis.   │
│                                │
│ [← Retour]                     │
└────────────────────────────────┘
```

### PAGE RÉSULTAT — Devis complet

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]                         │
└────────────────────────────────┘

┌────────────────────────────────┐
│ BADGE                          │
│ ✅ Excellent potentiel solaire  │
│ [Prénom Nom] · [Commune]       │
│ [Date du devis]                │
└────────────────────────────────┘

┌────────────────────────────────┐
│ INSTALLATION RECOMMANDÉE       │
│                                │
│ ┌──────────────────────────┐   │
│ │ ⚡ [X,X kWc]             │   │
│ │    [XX panneaux 400Wc]   │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ ☀️ Production annuelle   │   │
│ │    ~[X XXX] kWh          │   │
│ │    (données [Commune])   │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🏗️ Investissement        │   │
│ │    [X XXX] – [X XXX] €   │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘

┌────────────────────────────────┐
│ SIMULATION FINANCIÈRE          │
│                                │
│ [Tabs : Autoconso | Revente]   │
│                                │
│  ── Autoconsommation ────────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ Taux d'autoconsommation  │   │
│ │        ~72%              │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 💶 Économies sur facture  │   │
│ │       ~870 €/an          │   │
│ │    (tarif [Fournisseur]   │   │
│ │     [0,33] €/kWh)        │   │
│ └──────────────────────────┘   │
│                                │
│  ── Revente sur réseau ──────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ↗️ Surplus injecté       │   │
│ │    ~[XXX] kWh/an         │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 💰 Revenu injection      │   │
│ │    ~[XXX] €/an           │   │
│ │    (tarif Ores/Fluvius   │   │
│ │     [0,04] €/kWh)        │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🏛️ Tarif prosumer        │   │
│ │    [Région] : expliqué   │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 📈 TOTAL GAIN ANNUEL     │   │
│ │    ~[X XXX] €/an         │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 📅 ROI estimé            │   │
│ │    [X] – [X] ans         │   │
│ └──────────────────────────┘   │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│ GRAPHIQUE ROI [simple]         │
│                                │
│ ┌──────────────────────────┐   │
│ │  €                       │   │
│ │  ↑    [courbe croissante]│   │
│ │  │   ╱                   │   │
│ │  │  ╱ ← seuil ROI        │   │
│ │  │ ╱                     │   │
│ │  ├──────────────── Ans   │   │
│ │  0   5   10   15   20   25│  │
│ └──────────────────────────┘   │
└────────────────────────────────┘

┌────────────────────────────────┐
│ AIDES & PRIMES [Région]        │
│                                │
│ ┌──────────────────────────┐   │
│ │ ✓ [Aide 1] : [montant]   │   │
│ │ ✓ [Aide 2] : [montant]   │   │
│ │ ✓ TVA 6%                 │   │
│ │                           │   │
│ │ Impact total aides :      │   │
│ │ ~[X XXX] € économisés    │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘

┌────────────────────────────────┐
│ ACTIONS                        │
│                                │
│ ┌──────────────────────────┐   │
│ │  📄 Télécharger mon devis│   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │  Parler à un installateur│   │
│ │  agréé →                 │   │
│ └──────────────────────────┘   │
│  Devis terrain gratuit ·       │
│  Sans engagement               │
│                                │
│ [Recommencer avec d'autres     │
│  paramètres]                   │
└────────────────────────────────┘
```

---

## 4. Wireframe — Desktop (1200px+)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
│ [LOGO]  Simulateur Pro Photovoltaïque               [← Accueil] │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ PROGRESS [4 étapes horizontales nommées]                         │
│                                                                  │
│  ① Ma localisation ─── ② Ma toiture ─── ③ Mon énergie ─── ④ Mon devis
│  [●]                   [○]              [○]               [○]    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ CONTENU [2 colonnes · col-7 / col-5]                             │
│                                                                  │
│  ┌──────────────────────────────────┐  ┌─────────────────────┐  │
│  │ FORMULAIRE (col 1–7)             │  │ PANNEAU CARTE        │  │
│  │                                  │  │ (col 8–12, sticky)   │  │
│  │ [H1] Où est votre maison ?       │  │                      │  │
│  │                                  │  │ [CARTE BELGIQUE      │  │
│  │ Commune / code postal            │  │  ENSOLEILLEMENT]     │  │
│  │ ┌────────────────────────────┐   │  │                      │  │
│  │ │ [Autocomplete: "Liège..."] │   │  │ ┌──────────────────┐ │  │
│  │ └────────────────────────────┘   │  │ │ ☀️ [Commune]     │ │  │
│  │                                  │  │ │ [XXX] kWh/kWc/an │ │  │
│  │ [Info contextuelle sur la        │  │ │ Potentiel ●●●●○  │ │  │
│  │  région sélectionnée]            │  │ └──────────────────┘ │  │
│  │                                  │  │                      │  │
│  │  ┌──────────────────────────┐    │  │ ─────────────────    │  │
│  │  │      Continuer →         │    │  │ 💡 Pourquoi la       │  │
│  │  └──────────────────────────┘    │  │ localisation         │  │
│  └──────────────────────────────────┘  │ compte ?             │  │
│                                        │ [texte court]        │  │
│                                        └─────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘

[Résultat desktop — 3 colonnes]
┌──────────────────────────────────────────────────────────────────┐
│ RÉSULTAT [3 zones]                                               │
│                                                                  │
│  ┌─────────────────────┐  ┌──────────────────┐  ┌────────────┐  │
│  │ INSTALLATION        │  │ SIMULATION       │  │ ACTIONS    │  │
│  │ (col 1–4)           │  │ FINANCIÈRE       │  │ (col 10-12)│  │
│  │                     │  │ (col 5–9)        │  │ [sticky]   │  │
│  │ ⚡ X,X kWc          │  │                  │  │            │  │
│  │ XX panneaux          │  │ [GRAPHIQUE ROI]  │  │ 📄 PDF     │  │
│  │ ~X XXX kWh/an        │  │                  │  │ [Téléch.]  │  │
│  │                      │  │ Autoconso. : XX% │  │            │  │
│  │ 🏗️ X–X k€           │  │ Économies : XX€  │  │ Expert     │  │
│  │                      │  │ Revente : XX€    │  │ [Contacter]│  │
│  │ Aides :              │  │ TOTAL : XX€/an   │  │            │  │
│  │ ✓ Prime              │  │ ROI : X–X ans    │  │ Sans eng.  │  │
│  │ ✓ Prosumer           │  │                  │  │            │  │
│  │ ✓ TVA 6%             │  │ [Tab: Scénarios] │  │            │  │
│  └─────────────────────┘  └──────────────────┘  └────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Contenu du PDF Devis Ultra-Personnalisé

```
PAGE 1 — Couverture
┌─────────────────────────────────────────────┐
│  [LOGO ENTREPRISE EN-TÊTE]                  │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  SIMULATION PHOTOVOLTAÏQUE PERSONNALISÉE    │
│                                             │
│  Préparé pour :                             │
│  [PRÉNOM NOM]                               │
│  [Commune], [Région]                        │
│                                             │
│  Date : [JJ/MM/AAAA]                        │
│  Référence : SIM-[AAAA]-[XXXXX]             │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  [IMAGE/ILLUSTRATION maison + panneaux]     │
│                                             │
│  [COORDONNÉES ENTREPRISE]                   │
└─────────────────────────────────────────────┘

PAGE 2 — Synthèse & Données
┌─────────────────────────────────────────────┐
│  VOS DONNÉES                                │
│  Localisation : [Commune] ([XXX] kWh/kWc/an)│
│  Surface toiture : [X] m² · [Orientation]   │
│  Inclinaison : [X]°                         │
│  Fournisseur : [Engie/EDF Luminus]           │
│  Tarif actuel : [0,XX] €/kWh (tarif réel)   │
│  Consommation : [X XXX] kWh/an              │
│                                             │
│  INSTALLATION RECOMMANDÉE                  │
│  Puissance : [X,X] kWc                     │
│  Panneaux : [XX] × 400 Wc monocristallin   │
│  Production estimée : ~[X XXX] kWh/an      │
│                                             │
│  INVESTISSEMENT                            │
│  Coût installation : [X XXX] – [X XXX] €   │
│  Aides déduites :   – [X XXX] €            │
│  ──────────────────────────────────────     │
│  Net après aides :    [X XXX] – [X XXX] €  │
└─────────────────────────────────────────────┘

PAGE 3 — Simulation Financière
┌─────────────────────────────────────────────┐
│  SIMULATION SUR 25 ANS                      │
│                                             │
│  Autoconsommation (72%)                     │
│  Économies sur facture : ~[XXX] €/an        │
│                                             │
│  Revente réseau (28%)                       │
│  Surplus injecté : ~[XXX] kWh/an            │
│  Revenu injection : ~[XX] €/an              │
│  Tarif prosumer [Région] : explication       │
│                                             │
│  TOTAL GAIN ANNUEL : ~[X XXX] €             │
│  RETOUR SUR INVESTISSEMENT : [X]–[X] ans    │
│                                             │
│  [GRAPHIQUE BARRE : 25 ans de gains         │
│   cumulés vs investissement initial]        │
│                                             │
│  Gain net sur 25 ans : ~[XX XXX] €          │
└─────────────────────────────────────────────┘

PAGE 4 — Aides & Prochaines étapes
┌─────────────────────────────────────────────┐
│  AIDES DISPONIBLES EN [RÉGION]              │
│  ✓ [Aide 1] : [montant/description]         │
│  ✓ [Aide 2] : [montant/description]         │
│  ✓ TVA réduite 6%                           │
│                                             │
│  PROCHAINES ÉTAPES                         │
│  1. Inspection terrain (gratuite)           │
│  2. Devis définitif personnalisé            │
│  3. Dossier aides inclus                    │
│  4. Installation par installateur agréé     │
│                                             │
│  ─────────────────────────────────────────  │
│  [QR CODE → prise de RDV en ligne]          │
│                                             │
│  [COORDONNÉES COMPLÈTES ENTREPRISE]         │
│  [Logo certifications : QualiPV, etc.]      │
│                                             │
│  Simulation réalisée le [date] —            │
│  Tarifs énergétiques Engie au [date]        │
│  Ensoleillement : données IRM Belgique      │
└─────────────────────────────────────────────┘
```

---

## 6. Données externes requises

### Carte d'ensoleillement
| Source | Données |
|---|---|
| IRM (Institut Royal Météorologique BE) | Irradiation par commune (kWh/m²/an) |
| Alternative | Base de données statique par commune (mise à jour annuelle) |
| Format | JSON lookup par code postal → valeur kWh/kWc/an |

### Tarifs énergétiques temps réel
| Fournisseur | Source |
|---|---|
| Engie Belgique | API VREG / scraping page tarifs publics |
| EDF Luminus | API VREG / scraping page tarifs publics |
| Fallback | Tarifs mis à jour manuellement dans Sanity si API indisponible |
| Tarif injection | CREG / Ores / Fluvius (par région) |

### Prosumer par région
| Région | Système |
|---|---|
| Wallonie | Compteur bilatéral, pas de tarif prosumer — revente au tarif marché |
| Bruxelles | Compteur bilatéral + prime Bruxelles |
| Flandre | Tarif prosumer mensuel (à partir de 2021 pour nouvelles install.) |

---

## 7. États à gérer

### Carte ensoleillement
| État | Comportement |
|---|---|
| Saisie en cours | Autocomplete avec suggestions communes belges |
| Commune trouvée | Marqueur sur la carte + données affichées |
| Code postal inconnu | "Commune non trouvée, essayez avec le nom" |

### Tarifs live
| État | Comportement |
|---|---|
| Chargement | Spinner "Récupération des tarifs en cours..." |
| Succès | Tarif affiché avec date de mise à jour |
| Échec API | Fallback tarif moyen Sanity + note "tarif moyen estimé" |

### Génération PDF
| État | Comportement |
|---|---|
| Génération | "Génération de votre devis... (quelques secondes)" |
| Prêt | Bouton téléchargement activé + email envoyé |
| Erreur | "Problème de génération, nous vous contactons" |

---

## 8. Spécifications techniques

| Élément | Implémentation |
|---|---|
| Route | `/simulateur-pro` |
| Composant principal | `components/blocks/SimulateurPro.tsx` (client) |
| Carte ensoleillement | Composant SVG Belgique avec données par commune (JSON statique) ou Leaflet.js |
| Données communes | JSON lookup `data/communes-ensoleillement.json` (~600 communes BE) |
| Tarifs live | API route `/api/tarifs` → scraping VREG ou cache Sanity (<24h) |
| Calcul | Client-side avec données récupérées au chargement |
| PDF | API route `/api/devis-pdf` → Puppeteer ou React-PDF côté serveur |
| Envoi email | Resend/Brevo avec template HTML personnalisé (logo, données, graphique) |
| Analytics | Events par étape + "devis_généré" + "installateur_contacté" |
| RGPD | Consentement explicite, mentions RGPD, droit suppression |

---

## 9. Comparatif options 2 vs 3

| Critère | Option 2 (Simulateur) | Option 3 (Simulateur Pro) |
|---|---|---|
| Temps de remplissage | ~1-2 min | ~3-5 min |
| Précision résultat | Estimatif (fourchette large) | Semi-précis (tarifs réels) |
| Données requises | Région, m², kWh | Commune, m², orientation, fournisseur |
| Tarifs | Moyennes statiques | Tarifs live Engie/EDF Luminus |
| Revente réseau | Non simulée | Simulée par région (prosumer) |
| PDF | Simple (résultats de base) | Devis pro 4 pages avec logo |
| Lead quality | Curieux / explorateurs | Prospects chauds / décidés |
| Complexité dev | ★★☆☆☆ | ★★★★☆ |
| Valeur perçue client | Bonne | Excellente |
