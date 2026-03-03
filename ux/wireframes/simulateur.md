# Wireframe — Simulateur Photovoltaïque (Option 2)
> Fidelité : **Low fidelity** — structure et parcours uniquement
> Approche : **Mobile-first** · Calculateur interactif · Capture email + PDF auto
> Différence clé vs `/analyse` : expérience "outil" (résultats immédiats) vs "formulaire" (contact humain)

---

## 1. Objectif & contexte

| Attribut | Valeur |
|---|---|
| Page | `/simulateur` |
| Objectif | Calculer puissance, panneaux, économies, ROI en temps réel |
| Inputs | Surface toiture (m²), consommation électrique (kWh/mois ou €), région |
| Outputs | Puissance kWc, nb panneaux, économies €/an, ROI en années |
| Lead gen | Email capté → PDF personnalisé envoyé automatiquement |
| Ton | Outil/calculateur — résultat immédiat, pas de formulaire admin |

---

## 2. Interaction Flow

```
[Entrée /simulateur]
       │
       ▼
┌─────────────────────┐
│   INPUTS EN DIRECT  │  ← 3 champs + slider(s)
│   (tout visible)    │
└──────────┬──────────┘
           │ [mise à jour en temps réel]
           ▼
┌─────────────────────┐
│   RÉSULTATS LIVE    │  ← Se mettent à jour à chaque interaction
│   (sous les inputs) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   CAPTURE EMAIL     │  ← Débloque le téléchargement du PDF
│   "Recevoir mon PDF"│
└──────────┬──────────┘
           │
           ├─ [PDF envoyé par email]    → email automatique avec résultats
           └─ [Parler à un expert →]   → formulaire de contact

```

**Différences majeures vs `/analyse` :**
- Pas de multi-étapes : tout visible sur une page
- Résultats calculés et affichés en temps réel (pas de soumission)
- Inputs plus techniques : m² de toiture, kWh
- PDF envoyé automatiquement (pas de contact humain obligatoire)

---

## 3. Wireframe — Mobile (320px–480px)

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]          [← Accueil]   │
└────────────────────────────────┘

┌────────────────────────────────┐
│ INTRO                          │
│                                │
│ [H1] "Simulez votre           │
│       installation solaire"   │
│                                │
│ Renseignez vos données et      │
│ obtenez votre simulation       │
│ personnalisée instantanément.  │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION INPUTS                │
│  [fond contrasté léger]        │
│                                │
│  ── 1. Ma région ────────────  │
│                                │
│  ┌──────────────────────────┐  │
│  │ ○  Bruxelles-Capitale    │  │
│  │ ○  Wallonie              │  │
│  │ ○  Flandre               │  │
│  └──────────────────────────┘  │
│                                │
│  ── 2. Surface de toiture ───  │
│     utilisable (m²)            │
│                                │
│  ┌──────────────────────────┐  │
│  │     [  30  ] m²          │  │
│  └──────────────────────────┘  │
│  ├────────────────────────┤    │
│  10 m²               100 m²   │
│  [slider]                      │
│  [ℹ️ Comment estimer ma surface?]│
│                                │
│  ── 3. Consommation élec. ───  │
│                                │
│  [Tab: kWh/an] [Tab: €/mois]   │
│                                │
│  ┌──────────────────────────┐  │
│  │     [ 3500 ] kWh/an      │  │
│  └──────────────────────────┘  │
│  ├────────────────────────┤    │
│  1000               10000      │
│  [slider]                      │
│                                │
│  ── 4. Orientation du toit ─  │
│                                │
│  ┌──────────────────────────┐  │
│  │ ○  Sud (optimal)         │  │
│  │ ○  Sud-Est / Sud-Ouest   │  │
│  │ ○  Est / Ouest           │  │
│  │ ○  Je ne sais pas        │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  RÉSULTATS [mis à jour en live]│
│  ──────────────────────────── │
│                                │
│  ┌──────────────────────────┐  │
│  │ ⚡ Puissance recommandée  │  │
│  │                          │  │
│  │      4,2 kWc             │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🔲 Nombre de panneaux    │  │
│  │                          │  │
│  │      10 – 11 panneaux    │  │
│  │      (400 Wc chacun)     │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 💶 Économies annuelles   │  │
│  │                          │  │
│  │      ~1 050 – 1 300 €    │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📈 Retour sur invest.    │  │
│  │                          │  │
│  │      7 – 10 ans          │  │
│  │      (invest. ~8-12k€)   │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🏛️ Aides [Région]        │  │
│  │  Prime énergie           │  │
│  │  Tarif prosumer          │  │
│  └──────────────────────────┘  │
│                                │
│  ⚠️ Simulation indicative.     │
│  Résultat réel dépend de       │
│  l'inspection terrain.         │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  CAPTURE EMAIL                 │
│  [fond primaire]               │
│  ──────────────────────────── │
│                                │
│  [H2] "Recevez votre PDF       │
│        personnalisé"           │
│                                │
│  Votre prénom                  │
│  ┌──────────────────────────┐  │
│  │  [champ texte]           │  │
│  └──────────────────────────┘  │
│                                │
│  Votre email                   │
│  ┌──────────────────────────┐  │
│  │  [champ email]           │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  Recevoir mon PDF →      │  │
│  └──────────────────────────┘  │
│                                │
│  🔒 Pas de spam. Uniquement    │
│  vos résultats de simulation.  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  CTA EXPERT                    │
│                                │
│  [H3] "Besoin d'un chiffre     │
│        exact ?"                │
│                                │
│  ┌──────────────────────────┐  │
│  │  Parler à un expert →    │  │
│  └──────────────────────────┘  │
│  Sans engagement · Gratuit     │
└────────────────────────────────┘
```

---

## 4. Wireframe — Desktop (1200px+)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER [simplifié]                                                │
│ [LOGO]                                              [← Accueil] │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ HERO [centré · compact]                                          │
│                                                                  │
│        [H1] "Simulez votre installation solaire"                 │
│        Renseignez vos données — résultats instantanés            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ SIMULATEUR [2 colonnes · col-6 / col-6 · sticky results]         │
│                                                                  │
│  ┌───────────────────────────────┐  ┌────────────────────────┐  │
│  │ INPUTS (col 1–6)              │  │ RÉSULTATS (col 7–12)   │  │
│  │                               │  │ [sticky, suit le scroll]│  │
│  │ 1. Ma région                  │  │                        │  │
│  │ [○ Bruxelles] [○ Wallonie]    │  │ ⚡ Puissance           │  │
│  │ [○ Flandre]                   │  │    4,2 kWc             │  │
│  │                               │  │                        │  │
│  │ 2. Surface toiture (m²)       │  │ 🔲 Panneaux            │  │
│  │ ┌────────────────────────┐    │  │    10 – 11             │  │
│  │ │     [  30  ] m²        │    │  │    (400 Wc/panneau)    │  │
│  │ └────────────────────────┘    │  │                        │  │
│  │ [────────────────────────]    │  │ 💶 Économies/an        │  │
│  │ 10m²                 100m²    │  │    ~1 050 – 1 300 €   │  │
│  │ [ℹ️ Estimer ma surface]       │  │                        │  │
│  │                               │  │ 📈 ROI                 │  │
│  │ 3. Consommation               │  │    7 – 10 ans          │  │
│  │ [kWh/an ▼] [€/mois ▼]        │  │                        │  │
│  │ ┌────────────────────────┐    │  │ 🏛️ Aides Wallonie      │  │
│  │ │     [ 3500 ] kWh/an    │    │  │    Prime · Prosumer    │  │
│  │ └────────────────────────┘    │  │                        │  │
│  │ [────────────────────────]    │  │ ────────────────────   │  │
│  │ 1000                10000     │  │                        │  │
│  │                               │  │ ⚠️ Simulation          │  │
│  │ 4. Orientation du toit        │  │ indicative             │  │
│  │ [○ Sud][○ S-E/S-O][○ E/O]    │  │                        │  │
│  │ [○ Je ne sais pas]            │  │ ┌────────────────────┐ │  │
│  │                               │  │ │ Recevoir mon PDF → │ │  │
│  └───────────────────────────────┘  │ └────────────────────┘ │  │
│                                     │                        │  │
│                                     │ ┌────────────────────┐ │  │
│                                     │ │ Parler à un expert │ │  │
│                                     │ └────────────────────┘ │  │
│                                     └────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ CAPTURE EMAIL [fond plein · centré]                              │
│                                                                  │
│  [H2] "Recevez votre simulation en PDF"                          │
│                                                                  │
│  ┌──────────────┐  ┌────────────────────┐  ┌─────────────────┐  │
│  │  Votre prénom│  │    Votre email      │  │ Recevoir mon PDF│  │
│  │  [champ]     │  │    [champ]          │  │    [CTA]        │  │
│  └──────────────┘  └────────────────────┘  └─────────────────┘  │
│                   🔒 Pas de spam · Résultats uniquement          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Contenu du PDF envoyé

```
┌─────────────────────────────────────────────┐
│  [Logo entreprise]                           │
│                                             │
│  SIMULATION PHOTOVOLTAÏQUE                  │
│  Préparée pour : [Prénom]                   │
│  Date : [JJ/MM/AAAA]                        │
│                                             │
│  ─────────────────────────────────────────  │
│  VOS PARAMÈTRES                             │
│  Région : [Région]                          │
│  Surface toiture : [X] m²                  │
│  Consommation : [X] kWh/an                  │
│  Orientation : [Orientation]                │
│                                             │
│  ─────────────────────────────────────────  │
│  RÉSULTATS DE SIMULATION                    │
│  Puissance recommandée : X,X kWc            │
│  Nombre de panneaux : XX                    │
│  Production annuelle : ~X XXX kWh           │
│  Économies estimées : ~X XXX €/an           │
│  Investissement estimé : X XXX – X XXX €    │
│  Retour sur investissement : X – X ans      │
│                                             │
│  ─────────────────────────────────────────  │
│  AIDES DISPONIBLES EN [RÉGION]              │
│  ✓ [Aide 1]                                 │
│  ✓ [Aide 2]                                 │
│                                             │
│  ─────────────────────────────────────────  │
│  ⚠️ Simulation indicative basée sur des     │
│  moyennes régionales. Un expert peut vous   │
│  donner un chiffre précis gratuitement.     │
│                                             │
│  [CTA : Prendre rendez-vous]                │
│  [Coordonnées entreprise]                   │
└─────────────────────────────────────────────┘
```

---

## 6. États à gérer

### Simulateur
| État | Comportement |
|---|---|
| **Initial** | Valeurs par défaut (Wallonie, 30 m², 3500 kWh/an, Sud) |
| **Modification input** | Résultats recalculés instantanément (<50ms) |
| **"Je ne sais pas" (orientation)** | Coefficient moyen appliqué, note explicative |
| **Surface très petite** (< 10m²) | Message : "Surface insuffisante pour une installation rentable" |
| **Surface très grande** (> 80m²) | Limiter à 80m² utilisables, note explicative |

### Capture email
| État | Comportement |
|---|---|
| **Email valide** | Bouton activé |
| **Envoi en cours** | Spinner + "Envoi en cours..." |
| **Succès** | "PDF envoyé ! Vérifiez votre boîte mail." + bouton désactivé |
| **Erreur** | "Problème d'envoi. Réessayer." |

---

## 7. Formules de calcul (côté client)

```
// Données par région
const ENSOLEILLEMENT = {
  bruxelles: 950,   // kWh/kWc/an (heures équivalent pleine puissance)
  wallonie: 950,
  flandre: 1000,
}

const COEFFICIENTS_ORIENTATION = {
  sud: 1.0,
  sudEstOuest: 0.9,
  estOuest: 0.75,
  inconnu: 0.85,
}

// Puissance recommandée (kWc)
// On couvre ~80% de la consommation, pertes système 20%
const puissanceKwc = (conso_kwh_an * 0.8) / (ensoleillement * 0.8 * coeff_orientation)

// Nombre de panneaux (400 Wc standard)
const nbPanneaux = Math.ceil(puissanceKwc * 1000 / 400)

// Production annuelle (kWh)
const production = puissanceKwc * ensoleillement * coeff_orientation * 0.8

// Économies annuelles (€) — tarif moyen ~0.30 €/kWh en Belgique 2025
const economies = production * 0.30

// Investissement estimé (€) — ~1 600 €/kWc tout inclus
const investMin = puissanceKwc * 1400
const investMax = puissanceKwc * 2000

// ROI
const roiMin = investMin / economies
const roiMax = investMax / economies
```

---

## 8. Spécifications techniques

| Élément | Implémentation |
|---|---|
| Composant | `components/blocks/Simulateur.tsx` (client component) |
| Route | `/simulateur` |
| Calcul | Client-side (instantané, pas d'API) |
| Données région | Depuis Sanity `simulateurConfig` (pour mise à jour tarifs) |
| Capture email | API route `/api/simulateur` → Resend/Brevo |
| PDF | Généré serveur-side (jsPDF ou puppeteer) → envoyé par email |
| State | `useState` local ou `useReducer` si complexe |
| Analytics | Events : "simulation_lancée", "email_saisi", "pdf_envoyé", "expert_cliqué" |
