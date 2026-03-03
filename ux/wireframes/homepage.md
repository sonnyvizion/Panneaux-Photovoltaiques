# Wireframe — Page d'accueil
> Skill utilisé : `wireframe-prototyping` (aj-geddes/useful-ai-prompts)
> Fidelité : **Low fidelity** — structure et hiérarchie uniquement, pas de couleurs ni typographie
> Approche : **Mobile-first** → breakpoints tablet → desktop

---

## 1. Objectif & contexte

| Attribut | Valeur |
|---|---|
| Page | Accueil `/` |
| Objectif principal | Convaincre le propriétaire de faire son analyse personnalisée |
| Question centrale | *"Les panneaux solaires sont-ils rentables pour votre maison ?"* |
| CTA primaire | → `/analyse` |
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
      ├─ Teste le mini-simulateur ──────► [résultat estimatif] ─► CTA analyse
      │
      ├─ Scrolle / veut comprendre
      │        │
      │        ├─ "Pourquoi une analyse ?" → comprend la valeur
      │        ├─ "Comment ça marche ?" → lève les objections
      │        ├─ Témoignages → preuve sociale
      │        └─ Aides par région → se sent concerné
      │
      └─ CTA final ──────────────────────────────► [/analyse]
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
│ [LOGO]          [Mon analyse]  │
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
│  ┌──────────────────────────┐  │
│  │  H1 :                    │  │
│  │  "Les panneaux solaires  │  │
│  │   sont-ils rentables     │  │
│  │   pour votre maison ?"   │  │
│  └──────────────────────────┘  │
│                                │
│  [Sous-titre court, 1 ligne]   │
│  "Estimation gratuite en       │
│   3 minutes."                  │
│                                │
│  ┌──────────────────────────┐  │
│  │  [CTA PRIMAIRE]          │  │
│  │  Faire mon analyse →     │  │
│  └──────────────────────────┘  │
│                                │
│  ✓ Gratuit  ✓ Sans engagement  │
│  ✓ Résultat immédiat           │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 2 — SOCIAL PROOF      │
│  ─────────────────────────── │
│                                │
│  ┌────────┐┌────────┐┌───────┐ │
│  │ 2400+  ││  4.8   ││  89%  │ │
│  │analyses││  / 5   ││rentab.│ │
│  │réalis. ││ satisf.││ moy.  │ │
│  └────────┘└────────┘└───────┘ │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 3 — MINI-SIMULATEUR   │
│  [fond contrasté]              │
│  ─────────────────────────── │
│                                │
│  "En 3 questions, estimez      │
│   votre rentabilité"           │
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
│  ║ [Faire mon analyse →]    ║  │
│  ╚══════════════════════════╝  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 4 — POURQUOI ANALYSE  │
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
│              L'ANALYSE         │
│  ─────────────────────────── │
│                                │
│  Liste verticale (mobile) :    │
│                                │
│  ✓  Économies annuelles        │
│  ✓  Coût d'installation réel   │
│  ✓  Aides auxquelles vous      │
│     avez droit                 │
│  ✓  Retour sur investissement  │
│  ✓  Production estimée         │
│                                │
│  ┌──────────────────────────┐  │
│  │  Faire mon analyse →     │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│  SECTION 6 — COMMENT ÇA MARCHE │
│  ─────────────────────────── │
│                                │
│  [H2] "Comment ça marche ?"    │
│                                │
│  ①  Je réponds à 5 questions   │
│     sur ma maison              │
│     [icône formulaire]         │
│                                │
│  ②  J'obtiens mon estimation   │
│     personnalisée              │
│     [icône résultat]           │
│                                │
│  ③  Un expert me contacte      │
│     (si je le souhaite)        │
│     [icône personne]           │
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
│  ┌──────────────────────────┐  │
│  │  Faire mon analyse →     │  │
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
│  Analyse         Wallonie      │
│  Rentabilité     Flandre       │
│  Comprendre                    │
│  Blog                          │
│  FAQ                           │
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
│ [LOGO]   Rentabilité   Comprendre   Blog   FAQ   [Mon analyse ▶] │
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
│  │  │ Faire mon        │    │  │                              │ │
│  │  │ analyse →        │    │  │                              │ │
│  │  └──────────────────┘    │  │                              │ │
│  │                          │  │                              │ │
│  │  ✓ Gratuit               │  │                              │ │
│  │  ✓ Sans engagement       │  │                              │ │
│  │  ✓ Résultat immédiat     │  │                              │ │
│  └──────────────────────────┘  └──────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ SOCIAL PROOF [3 colonnes centrées · gap-8]                       │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│  │   2 400+     │    │    4.8/5     │    │     89%      │        │
│  │  analyses    │    │ satisfaction │    │  rentable    │        │
│  │  réalisées   │    │              │    │  en moyenne  │        │
│  └──────────────┘    └──────────────┘    └──────────────┘        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ MINI-SIMULATEUR [fond contrasté · full-width]                    │
│                                                                  │
│  [H2] "En 3 questions, estimez votre rentabilité"                │
│                                                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│  │  Ma région      │ │  Ma facture     │ │  Mon toit       │    │
│  │  [ Wallonie ▼ ] │ │  [ ~200€/mois▼] │ │  [ Sud ▼      ] │    │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘    │
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │   Voir mon estimation →    │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│  [ÉTAT RÉSULTAT — inline après soumission]                       │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Estimation pour votre profil :                          │    │
│  │  ~950 – 1 300 €/an d'économies  ·  ROI : 7–10 ans       │    │
│  │                      [Obtenir mon analyse complète →]    │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ POURQUOI UNE ANALYSE [2 colonnes · col-6 / col-6]                │
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
│ CE QUE RÉVÈLE L'ANALYSE [5 cartes · + CTA latéral]               │
│                                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  ┌──────┐  │
│ │✓ Économies│ │✓ Coût   │ │✓ Aides   │ │✓ ROI     │  │Faire │  │
│ │  annuelles│ │  réel   │ │  droit   │ │  estimé  │  │ mon  │  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │analys│  │
│                                                       │e →   │  │
│ ┌──────────┐                                          └──────┘  │
│ │✓ Productn│                                                     │
│ │  estimée │                                                     │
│ └──────────┘                                                     │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ COMMENT ÇA MARCHE [3 étapes horizontales avec connecteurs]       │
│                                                                  │
│   ┌────────────────┐      ┌────────────────┐     ┌────────────┐ │
│   │  ①             │──── │  ②             │────│  ③         │ │
│   │  Je réponds à  │      │  J'obtiens mon │     │  Un expert │ │
│   │  5 questions   │      │  estimation    │     │  me contact│ │
│   │  sur ma maison │      │  personnalisée │     │  (optionnel│ │
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
│                  ┌────────────────────────────┐                  │
│                  │  Faire mon analyse →       │                  │
│                  └────────────────────────────┘                  │
│                     Gratuit · Sans engagement                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ FOOTER [4 colonnes · max-w-7xl]                                  │
│                                                                  │
│  [Logo + tagline]  │  Navigation  │  Régions  │  Légal + Contact │
│                    │  Accueil     │  Bruxelles│  Mentions légales│
│                    │  Analyse     │  Wallonie │  Confidentialité │
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
| **Initial** | 3 selects vides, bouton désactivé |
| **Partiel** | Bouton activé dès les 3 champs remplis |
| **Loading** | Spinner inline sur le bouton (200ms) |
| **Résultat** | Carte résultat animée sous le formulaire |
| **Erreur réseau** | Message "Réessayer" non bloquant |

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

- **CTA primaire** → toujours présent (header sticky + hero + section 5 + CTA final)
- **Mini-simulateur** → state géré côté client (React useState), résultat calculé localement
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
