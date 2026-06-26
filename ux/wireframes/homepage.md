# Wireframe — Page d'accueil
> Skill utilisé : `wireframe-prototyping` (aj-geddes/useful-ai-prompts)
> Fidelité : **Low fidelity** — structure et hiérarchie uniquement, pas de couleurs ni typographie
> Approche : **Mobile-first** → breakpoints tablet → desktop

---

## 1. Objectif & contexte

| Attribut | Valeur |
|---|---|
| Page | Accueil `/` |
| Objectif principal | Convaincre le propriétaire de faire son estimation personnalisée |
| Question centrale | *"Les panneaux solaires sont-ils rentables pour votre maison ?"* |
| CTA primaire | → `/simulateur` |
| Persona | Propriétaire belge, 35-60 ans, curieux mais pas expert |

---

## 2. Interaction Flow (parcours utilisateur)

```
[Entrée sur /]
      │
      ├─ Lit le hero ──────────────────────────────────────────┐
      │                                                         │
      ├─ Voit les chiffres (social proof) ──────── rassurance  │
      │                                                         ▼
      ├─ Teste le mini-simulateur ──────► [résultat estimatif] ─► CTA estimation
      │
      ├─ Scrolle / veut comprendre
      │        │
      │        ├─ "Pourquoi une estimation ?" → comprend la valeur
      │        ├─ "Comment ça marche ?" → lève les objections
      │        ├─ Témoignages → preuve sociale
      │        └─ Aides par région → se sent concerné
      │
      └─ CTA final ──────────────────────────────► [/simulateur]
```

**Points de sortie alternatifs :**
- Nav > Rentabilité → `/rentabilite`
- Nav > Comprendre → `/comprendre`
- Onglet région → `/aides/wallonie` (ou bruxelles / flandre)

---

## 3. Wireframe — Mobile (320px–480px)

```
┌────────────────────────────────┐
│ HEADER  [sticky, hauteur fixe] │
│                                │
│ [LOGO]         [Mon estimation]│
│                   [bouton CTA] │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│  SECTION 1 — HERO              │
│  ─────────────────────────── │
│                                │
│  [IMAGE DE FOND ou illustration│
│   maison belge + panneaux]     │
│                                │
│  H1 :                          │
│  "Les panneaux solaires        │
│   sont-ils rentables           │
│   pour votre maison ?"         │
│                                │
│  [Sous-titre court, 1 ligne]   │
│  "Estimation gratuite en       │
│   3 minutes."                  │
│                                │
│  ┌──────────────────────────┐  │
│  │  CARTE GLASS — AMORCE   │  │
│  │                          │  │
│  │  Votre code postal :     │  │
│  │  ┌────────────────────┐  │  │
│  │  │  ex. 1000, 4000…   │  │  │
│  │  └────────────────────┘  │  │
│  │  (région auto-détectée)  │  │
│  │                          │  │
│  │  [Mon estimation →]      │  │
│  │  Ouvre /simulateur avec  │  │
│  │  la région pré-remplie   │  │
│  └──────────────────────────┘  │
│                                │
│  ✓ Gratuit  ✓ Sans engagement  │
│  ✓ Vous parlez directement à   │
│    l'équipe qui installe        │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 2 — RÉASSURANCE       │
│  ─────────────────────────── │
│                                │
│  ┌──────┐┌──────┐┌─────┐┌────┐ │
│  │2400+ ││ 4.8  ││ 89% ││Cert│ │
│  │instal││ / 5  ││rent.││ifié│ │
│  │réal. ││satis.││ moy.││Enphas│ │
│  └──────┘└──────┘└─────┘└────┘ │
│                                │
│  [Badge Enphase — logo officiel│
│   + "Installateur certifié"]   │
│                                │
│  Bruxelles & périphérie        │
│  [Carte ou mention zone]       │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 3 — MINI-SIMULATEUR   │
│  [fond contrasté]              │
│  ─────────────────────────── │
│                                │
│  "En 4 questions, estimez      │
│   votre rentabilité"           │
│                                │
│  Je suis :                     │
│  ┌──────────────────────────┐  │
│  │  ○ Propriétaire          │  │
│  │  ○ Locataire             │  │
│  └──────────────────────────┘  │
│  [Si locataire → message doux  │
│   + suggestion de partager]    │
│                                │
│  Ma région :                   │
│  ┌──────────────────────────┐  │
│  │  Sélectionner ▼          │  │
│  │  ○ Bruxelles-Capitale    │  │
│  │  ○ Wallonie              │  │
│  │  ○ Flandre               │  │
│  └──────────────────────────┘  │
│                                │
│  Ma facture élec. mensuelle :  │
│  ┌──────────────────────────┐  │
│  │  Sélectionner ▼          │  │
│  │  ○ Moins de 100 €        │  │
│  │  ○ 100 – 200 €           │  │
│  │  ○ 200 – 350 €           │  │
│  │  ○ Plus de 350 €         │  │
│  └──────────────────────────┘  │
│                                │
│  Mon toit est orienté :        │
│  ┌──────────────────────────┐  │
│  │  Sélectionner ▼          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  Voir mon estimation →   │  │
│  └──────────────────────────┘  │
│                                │
│  [ÉTAT RÉSULTAT — inline]      │
│  ╔══════════════════════════╗  │
│  ║ ~950 – 1 300 €/an        ║  │
│  ║ d'économies estimées     ║  │
│  ║                          ║  │
│  ║ [Faire mon estimation →] ║  │
│  ╚══════════════════════════╝  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 4 — POURQUOI UNE      │
│              ESTIMATION ?      │
│  ─────────────────────────── │
│                                │
│  [H2] "Chaque maison est       │
│        différente"             │
│                                │
│  [Texte court d'intro]         │
│                                │
│  ┌──────────────────────────┐  │
│  │ 📍 VOTRE RÉGION          │  │
│  │ [Texte court]            │  │
│  │ Aides et tarifs varient  │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ ⚡ VOTRE CONSOMMATION    │  │
│  │ [Texte court]            │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │ 🏠 VOTRE TOITURE         │  │
│  │ [Texte court]            │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 5 — CE QUE RÉVÈLE     │
│        VOTRE ESTIMATION        │
│  ─────────────────────────── │
│                                │
│  Liste verticale (mobile) :    │
│                                │
│  ✓  Économies annuelles        │
│     (fourchette personnalisée) │
│  ✓  Budget d'investissement    │
│     estimé                     │
│  ✓  Aides auxquelles vous      │
│     avez droit                 │
│  ✓  Retour sur investissement  │
│  ✓  Production estimée         │
│                                │
│  ┌──────────────────────────┐  │
│  │  Faire mon estimation →  │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 6 — COMMENT ÇA MARCHE │
│  ─────────────────────────── │
│                                │
│  [H2] "Comment ça marche ?"    │
│                                │
│  ①  Je renseigne ma maison     │
│     en 4 questions             │
│     [icône formulaire]         │
│                                │
│  ②  Je reçois mon estimation   │
│     personnalisée (fourchette) │
│     [icône résultat]           │
│                                │
│  ③  Un expert analyse mon toit │
│     et me donne le chiffrage   │
│     précis — gratuit           │
│     [icône personne / Enphase] │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 7 — TÉMOIGNAGES       │
│  ─────────────────────────── │
│                                │
│  [H2] "Ils ont fait l'analyse" │
│                                │
│  ┌──────────────────────────┐  │
│  │ ⭐⭐⭐⭐⭐               │  │
│  │ "Quote témoignage court  │  │
│  │  sur 2-3 lignes max."    │  │
│  │ — Prénom, Ville          │  │
│  └──────────────────────────┘  │
│                                │
│  [●  ○  ○]  ← indicateur      │
│             pagination         │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 8 — AIDES PAR RÉGION  │
│  ─────────────────────────── │
│                                │
│  [H2] "Les aides disponibles   │
│        dans votre région"      │
│                                │
│  [Bruxelles][Wallonie][Flandre]│
│  ← tabs horizontaux            │
│                                │
│  ┌──────────────────────────┐  │
│  │  [Contenu tab actif]     │  │
│  │  Prime énergie           │  │
│  │  Tarif prosumer          │  │
│  │  TVA réduite 6%          │  │
│  │                          │  │
│  │  [Voir le détail →]      │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 9 — CTA FINAL         │
│  [fond plein, couleur primaire]│
│  ─────────────────────────── │
│                                │
│  [H2] "Prêt à savoir si le     │
│        solaire est fait        │
│        pour vous ?"            │
│                                │
│  Vous parlez directement à     │
│  l'équipe qui installe.        │
│  Pas d'intermédiaire.          │
│                                │
│  ┌──────────────────────────┐  │
│  │  Faire mon estimation →  │  │
│  └──────────────────────────┘  │
│                                │
│  Gratuit · Sans engagement     │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  FOOTER                        │
│  ─────────────────────────── │
│  [Logo]                        │
│  [Tagline courte]              │
│                                │
│  Navigation      Régions       │
│  Accueil         Bruxelles     │
│  Rentabilité     Wallonie      │
│  Comprendre      Flandre       │
│  Aides & primes                │
│  Blog                          │
│  FAQ · Contact                 │
│                                │
│  ─────────────────────────── │
│  © 2025 · Mentions légales     │
│  · Politique de conf.          │
└────────────────────────────────┘
```

---

## 4. Wireframe — Desktop (1200px+, grille 12 colonnes)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER [sticky · max-w-7xl · px-8]                               │
│ [LOGO]   Rentabilité   Comprendre   Blog   FAQ   [Mon estimation ▶] │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ HERO [2 colonnes · col-span-6 / col-span-6]                      │
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐ │
│  │ col 1–6                  │  │ col 7–12                     │ │
│  │                          │  │                              │ │
│  │  H1 :                    │  │  [IMAGE / ILLUSTRATION]      │ │
│  │  "Les panneaux solaires  │  │                              │ │
│  │   sont-ils rentables     │  │  [badge flottant :           │ │
│  │   pour votre maison ?"   │  │   "89% des propriétaires    │ │
│  │                          │  │    rentabilisent"]           │ │
│  │  [Sous-titre]            │  │                              │ │
│  │  "Estimation gratuite    │  │                              │ │
│  │   en 3 minutes."         │  │                              │ │
│  │                          │  │                              │ │
│  │  ┌──────────────────┐    │  │                              │ │
│  │  │ Code postal :    │    │  │                              │ │
│  │  │ [__________]     │    │  │                              │ │
│  │  │ Mon estimation → │    │  │                              │ │
│  │  └──────────────────┘    │  │                              │ │
│  │  (carte glass, région    │  │                              │ │
│  │   auto-détectée)         │  │                              │ │
│  │                          │  │                              │ │
│  │  ✓ Gratuit               │  │                              │ │
│  │  ✓ Sans engagement       │  │                              │ │
│  │  ✓ Parlez directement    │  │                              │ │
│  │    à l'équipe installant │  │                              │ │
│  └──────────────────────────┘  └──────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ RÉASSURANCE [4 colonnes centrées · gap-8]                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐  │
│  │   2 400+     │ │    4.8/5     │ │     89%      │ │ Certifié│  │
│  │  instal.     │ │ satisfaction │ │  rentable    │ │ Enphase │  │
│  │  réalisées   │ │              │ │  en moyenne  │ │ [badge] │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘  │
│                                                                  │
│  [Mention : Bruxelles & périphérie — zone d'intervention]        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ MINI-SIMULATEUR [fond contrasté · full-width]                    │
│                                                                  │
│  [H2] "En 4 questions, estimez votre rentabilité"                │
│                                                                  │
│  ┌──────────────┐ ┌─────────────────┐ ┌──────────────────┐ ┌────────────┐  │
│  │  Je suis     │ │  Ma région      │ │  Ma facture      │ │  Mon toit  │  │
│  │  [Proprio ▼] │ │  [ Wallonie ▼ ] │ │  [ ~200€/mois ▼] │ │  [ Sud ▼ ] │  │
│  └──────────────┘ └─────────────────┘ └──────────────────┘ └────────────┘  │
│  [Si locataire sélectionné → message doux inline, bouton masqué]│
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │   Voir mon estimation →    │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│  [ÉTAT RÉSULTAT — inline après soumission]                       │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Estimation pour votre profil :                          │    │
│  │  ~950 – 1 300 €/an d'économies  ·  ROI : 7–10 ans       │    │
│  │               [Obtenir mon estimation complète →]        │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ POURQUOI UNE ESTIMATION ? [2 colonnes · col-6 / col-6]           │
│                                                                  │
│  ┌───────────────────────────┐  ┌───────────────────────────┐   │
│  │ TEXTE INTRO (col 1–5)     │  │ CARTES FACTEURS (col 6–12)│   │
│  │                           │  │                           │   │
│  │ "Chaque maison est unique.│  │ ┌───────────────────────┐ │   │
│  │  La rentabilité dépend    │  │ │ 📍 VOTRE RÉGION       │ │   │
│  │  de votre situation       │  │ │ [Texte court]         │ │   │
│  │  précise..."              │  │ └───────────────────────┘ │   │
│  │                           │  │ ┌───────────────────────┐ │   │
│  │                           │  │ │ ⚡ VOTRE CONSOMMATION │ │   │
│  │                           │  │ │ [Texte court]         │ │   │
│  │                           │  │ └───────────────────────┘ │   │
│  │                           │  │ ┌───────────────────────┐ │   │
│  │                           │  │ │ 🏠 VOTRE TOITURE      │ │   │
│  │                           │  │ │ [Texte court]         │ │   │
│  │                           │  │ └───────────────────────┘ │   │
│  └───────────────────────────┘  └───────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ CE QUE RÉVÈLE VOTRE ESTIMATION [5 cartes · + CTA latéral]        │
│                                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ┌──────┐  │
│ │✓ Économies│ │✓ Budget  │ │✓ Aides   │ │✓ ROI     │  │Faire │  │
│ │  annuelles│ │  estimé  │ │  droit   │ │  estimé  │  │ mon  │  │
│ │(fourchette│ │(fourchett│ │          │ │          │  │estim.│  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │→     │  │
│                                                       └──────┘  │
│ ┌──────────┐                                                     │
│ │✓ Productn│                                                     │
│ │  estimée │                                                     │
│ └──────────┘                                                     │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ COMMENT ÇA MARCHE [3 étapes horizontales avec connecteurs]       │
│                                                                  │
│   ┌────────────────┐      ┌────────────────┐     ┌────────────┐ │
│   │  ①             │──── │  ②             │────│  ③         │ │
│   │  Je renseigne  │      │  Je reçois mon │     │  Un expert │ │
│   │  ma maison     │      │  estimation    │     │  analyse   │ │
│   │  (4 questions) │      │  (fourchette)  │     │  mon toit  │ │
│   │                │      │                │     │  → chiffre │ │
│   │                │      │                │     │  précis    │ │
│   │                │      │                │     │  gratuit   │ │
│   └────────────────┘      └────────────────┘     └────────────┘ │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ TÉMOIGNAGES [2 ou 3 cartes côte à côte]                          │
│                                                                  │
│ ┌────────────────────────┐  ┌────────────────────────┐           │
│ │ ⭐⭐⭐⭐⭐             │  │ ⭐⭐⭐⭐⭐             │           │
│ │ "Quote témoignage..."  │  │ "Quote témoignage..."  │           │
│ │ — Prénom, Ville        │  │ — Prénom, Ville        │           │
│ └────────────────────────┘  └────────────────────────┘           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ AIDES PAR RÉGION [tabs horizontaux]                              │
│                                                                  │
│  [ Bruxelles-Capitale ]  [ Wallonie ]  [ Flandre ]               │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Prime énergie · Tarif prosumer · TVA 6% · ...           │    │
│  │                             [Voir le détail pour moi →]  │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ CTA FINAL [fond plein · centré]                                  │
│                                                                  │
│          "Prêt à savoir si le solaire est fait pour vous ?"      │
│                                                                  │
│           Vous parlez directement à l'équipe qui installe.       │
│                   Pas d'intermédiaire.                           │
│                                                                  │
│                  ┌────────────────────────────┐                  │
│                  │  Faire mon estimation →    │                  │
│                  └────────────────────────────┘                  │
│                     Gratuit · Sans engagement                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ FOOTER [4 colonnes · max-w-7xl]                                  │
│                                                                  │
│  [Logo + tagline]  │  Navigation  │  Régions  │  Légal + Contact │
│                    │  Accueil     │  Bruxelles│  Mentions légales│
│                    │  Simulateur  │  Wallonie │  Confidentialité │
│                    │  Rentabilité │  Flandre  │  Contact         │
│                    │  Comprendre  │           │                  │
│                    │  Blog / FAQ  │           │                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. États à gérer (edge cases)

### Mini-simulateur
| État | Comportement |
|---|---|
| **Initial** | 4 selects vides, bouton désactivé |
| **Locataire sélectionné** | Message doux inline ("Partagez avec votre propriétaire"), bouton masqué |
| **Partiel** | Bouton activé dès les 4 champs remplis (propriétaire uniquement) |
| **Loading** | Spinner inline sur le bouton (200ms) |
| **Résultat** | Carte résultat animée sous le formulaire |
| **Erreur réseau** | Message "Réessayer" non bloquant |

### Carte glass hero (amorce)
| État | Comportement |
|---|---|
| **Initial** | Champ code postal vide, bouton désactivé |
| **CP saisi (4+ chiffres)** | Bouton activé, région détectée affichée sous le champ |
| **Submit** | Ouvre `/simulateur` avec région pré-remplie dans le 1er volet |
| **CP inconnu** | Message inline "Code postal non reconnu" sans blocage |

### Header (sticky)
| État | Comportement |
|---|---|
| **Top de page** | Transparent ou léger |
| **Après scroll** | Fond blanc + ombre portée |
| **Mobile** | Menu hamburger (nav masquée) |

### Onglets aides par région
| État | Comportement |
|---|---|
| **Défaut** | Tab "Wallonie" actif (région la + représentée) |
| **Changement** | Contenu swap sans rechargement |

---

## 6. Annotations d'interaction

- **CTA primaire** → toujours présent (header sticky + hero + section 5 + CTA final) — libellé : "Mon estimation" / "Faire mon estimation"
- **Carte glass hero** → champ code postal, détection région côté client (table CP → région), ouvre `/simulateur` avec région pré-remplie
- **Mini-simulateur** → state géré côté client (React useState), résultat calculé localement ; locataire → branche alternative sans bouton devis
- **Tabs région** → client component léger, données depuis Sanity
- **Témoignages** → carrousel sur mobile (swipe), 2-3 cartes fixes sur desktop
- **Scroll** → `scroll-behavior: smooth` pour navigation intra-page

---

## 7. Spécifications responsive

| Breakpoint | Comportement clé |
|---|---|
| Mobile 320–480px | 1 colonne, hero en bloc, simulateur vertical |
| Tablet 768–1024px | Hero 2 col, simulateur horizontal, cards 2 col |
| Desktop 1200px+ | Grille 12 col, toutes sections côte à côte |
