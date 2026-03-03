# Wireframe — Page Analyse Personnalisée
> Skill utilisé : `wireframe-prototyping` (aj-geddes/useful-ai-prompts)
> Fidelité : **Low fidelity** — structure et parcours uniquement
> Approche : **Mobile-first** · Formulaire multi-étapes · Résultat immédiat

---

## 1. Objectif & contexte

| Attribut | Valeur |
|---|---|
| Page | `/analyse` |
| Objectif | Collecter les données → produire une estimation personnalisée |
| Expérience cible | Rapide, simple, rassurante — une conversation, pas un formulaire admin |
| Résultat | Estimation immédiate + proposition de contact expert (optionnel) |
| Temps moyen | < 3 minutes |

---

## 2. Interaction Flow complet

```
[Entrée /analyse]
       │
       ▼
 ┌─────────────┐
 │   ÉTAPE 1   │  ← Ma maison (région, type, toit, ombrage)
 └──────┬──────┘
        │ [Continuer →]
        ▼
 ┌─────────────┐
 │   ÉTAPE 2   │  ← Ma consommation (facture, occupants, équipements)
 └──────┬──────┘
        │ [Continuer →]
        ▼
 ┌─────────────┐
 │   ÉTAPE 3   │  ← Mon projet (maturité, devis reçus) + email
 └──────┬──────┘
        │ [Voir mon résultat →]
        ▼
 ┌─────────────────────┐
 │   PAGE RÉSULTAT     │  ← Estimation + CTA expert
 └──────────┬──────────┘
            │
            ├─ [Parler à un expert →] ──► Formulaire de contact
            ├─ [Télécharger mon résultat] ──► PDF généré
            └─ [Recommencer] ──► retour Étape 1

Points de sortie :
- Bouton "Retour" à chaque étape → étape précédente
- Logo header → Accueil (données perdues — warning)
- Abandon → email de relance si email déjà saisi (étape 3)
```

---

## 3. Wireframe — Mobile (320px–480px)

### ÉTAPE 1 — Ma maison

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]           [✕ Quitter]  │
└────────────────────────────────┘

┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────○────────○            │
│ Étape 1 / 3                    │
│ "Ma maison"                    │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Parlez-nous de           │
│       votre maison"            │
│                                │
│ ── Votre région ─────────────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Bruxelles-Capitale    │   │
│ │ ○  Wallonie              │   │
│ │ ○  Flandre               │   │
│ └──────────────────────────┘   │
│                                │
│ ── Type de logement ─────────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Maison individuelle   │   │
│ │ ○  Appartement           │   │
│ │ ○  Autre                 │   │
│ └──────────────────────────┘   │
│                                │
│ ── Orientation principale ───  │
│    du toit                     │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Sud (idéal)           │   │
│ │ ○  Sud-Est / Sud-Ouest   │   │
│ │ ○  Est / Ouest           │   │
│ │ ○  Je ne sais pas        │   │
│ └──────────────────────────┘   │
│                                │
│ ── Ombrage sur la toiture ───  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Non, toit dégagé      │   │
│ │ ○  Partiellement ombragé  │   │
│ │ ○  Fortement ombragé     │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │  Continuer →             │   │
│ └──────────────────────────┘   │
│                                │
│ [Note : aucune donnée perso    │
│  n'est demandée à cette étape] │
└────────────────────────────────┘
```

### ÉTAPE 2 — Ma consommation

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]           [✕ Quitter]  │
└────────────────────────────────┘

┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────●────────○            │
│ Étape 2 / 3                    │
│ "Ma consommation"              │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Votre consommation       │
│       électrique"              │
│                                │
│ ── Facture élec. mensuelle ──  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Moins de 100 €/mois   │   │
│ │ ○  100 – 200 €/mois      │   │
│ │ ○  200 – 350 €/mois      │   │
│ │ ○  Plus de 350 €/mois    │   │
│ └──────────────────────────┘   │
│ [ℹ️ Où trouver ce chiffre ?]   │
│                                │
│ ── Personnes dans le logement  │
│                                │
│ ┌──────────────────────────┐   │
│ │  [−]    2    [+]         │   │
│ └──────────────────────────┘   │
│                                │
│ ── Équipements énergivores ──  │
│    (plusieurs choix possibles) │
│                                │
│ ┌──────────────────────────┐   │
│ │ ☐  Voiture électrique    │   │
│ │ ☐  Pompe à chaleur       │   │
│ │ ☐  Borne de recharge     │   │
│ │ ☐  Aucun de ces éléments │   │
│ └──────────────────────────┘   │
│                                │
│ ┌────────────────┐  ┌────────┐ │
│ │ ← Retour      │  │Contin.→│ │
│ └────────────────┘  └────────┘ │
│                                │
└────────────────────────────────┘
```

### ÉTAPE 3 — Mon projet + Email

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]           [✕ Quitter]  │
└────────────────────────────────┘

┌────────────────────────────────┐
│ PROGRESS                       │
│ ●────────●────────●            │
│ Étape 3 / 3  ← Dernière étape │
│ "Mon projet"                   │
└────────────────────────────────┘

┌────────────────────────────────┐
│                                │
│ [H1] "Votre projet"            │
│                                │
│ ── Où en êtes-vous ? ────────  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Je me renseigne       │   │
│ │ ○  Projet dans < 6 mois  │   │
│ │ ○  Projet déjà démarré   │   │
│ └──────────────────────────┘   │
│                                │
│ ── Avez-vous reçu des devis ?  │
│                                │
│ ┌──────────────────────────┐   │
│ │ ○  Non, 1ère démarche    │   │
│ │ ○  Oui, 1 ou 2 devis     │   │
│ │ ○  Oui, plusieurs devis  │   │
│ └──────────────────────────┘   │
│                                │
│ ────────────────────────────   │
│ Recevoir votre résultat        │
│ ────────────────────────────   │
│                                │
│ Votre prénom                   │
│ ┌──────────────────────────┐   │
│ │  [champ texte]           │   │
│ └──────────────────────────┘   │
│                                │
│ Votre adresse email            │
│ ┌──────────────────────────┐   │
│ │  [champ email]           │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ ☐ Je souhaite qu'un      │   │
│ │   expert me contacte     │   │
│ │   (optionnel)            │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │  Voir mon résultat →     │   │
│ └──────────────────────────┘   │
│                                │
│ 🔒 Données confidentielles.    │
│ Jamais de spam.                │
│                                │
│ [← Retour]                     │
└────────────────────────────────┘
```

### PAGE RÉSULTAT

```
┌────────────────────────────────┐
│ HEADER [simplifié]             │
│ [Logo]                         │
└────────────────────────────────┘

┌────────────────────────────────┐
│ BADGE                          │
│  ✅ Bon potentiel solaire       │
│  (ou ⚠️ Potentiel modéré)      │
└────────────────────────────────┘

┌────────────────────────────────┐
│ [H1] "Votre estimation,        │
│       [Prénom]"                │
└────────────────────────────────┘

┌────────────────────────────────┐
│ MÉTRIQUES CLÉS                 │
│                                │
│ ┌──────────────────────────┐   │
│ │ 💶 Économies estimées    │   │
│ │                          │   │
│ │    ~950 – 1 300 €/an     │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🏗️ Investissement        │   │
│ │                          │   │
│ │    8 000 – 12 000 €      │   │
│ │    (avant aides)         │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 📈 Retour sur invest.    │   │
│ │                          │   │
│ │    7 – 10 ans            │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🏛️ Aides disponibles     │   │
│ │    en [Région] :         │   │
│ │    Prime énergie         │   │
│ │    Tarif prosumer        │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘

┌────────────────────────────────┐
│ DISCLAIMER                     │
│                                │
│ ⚠️ Estimation indicative       │
│ basée sur votre profil.        │
│ Pour un chiffre précis,        │
│ un expert analyse votre toit.  │
└────────────────────────────────┘

┌────────────────────────────────┐
│ CTA EXPERT                     │
│                                │
│ [H2] "Obtenir un résultat      │
│       précis et gratuit"       │
│                                │
│ ┌──────────────────────────┐   │
│ │  Parler à un expert →    │   │
│ └──────────────────────────┘   │
│                                │
│ Sans engagement · Gratuit      │
└────────────────────────────────┘

┌────────────────────────────────┐
│ ACTIONS SECONDAIRES            │
│                                │
│ [Télécharger mon résultat PDF] │
│ [Partager mon résultat]        │
│ [Recommencer l'analyse]        │
└────────────────────────────────┘
```

---

## 4. Wireframe — Desktop (1200px+)

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER [simplifié, pas de navigation principale]                  │
│ [LOGO]                                        [✕ Quitter]        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ PROGRESS BAR [full-width · 3 étapes nommées]                     │
│                                                                  │
│  ①  Ma maison  ────────  ②  Ma consommation  ────  ③  Mon projet│
│  [●]                      [○]                       [○]          │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ CONTENU FORMULAIRE [2 colonnes · col-7 / col-5]                  │
│                                                                  │
│  ┌──────────────────────────────────┐  ┌─────────────────────┐  │
│  │ FORMULAIRE (col 1–7)             │  │ PANNEAU LATÉRAL      │  │
│  │                                  │  │ (col 8–12, sticky)   │  │
│  │ [H1] Parlez-nous de              │  │                      │  │
│  │       votre maison               │  │ 💡 Le saviez-vous ?  │  │
│  │                                  │  │                      │  │
│  │ Votre région                     │  │ [Fact contextuel     │  │
│  │ ┌────────────────────────────┐   │  │  qui change selon    │  │
│  │ │ ○ Bruxelles  ○ Wallonie    │   │  │  la question active] │  │
│  │ │ ○ Flandre                  │   │  │                      │  │
│  │ └────────────────────────────┘   │  │ ────────────────     │  │
│  │                                  │  │                      │  │
│  │ Type de logement                 │  │ 🔒 Vos données       │  │
│  │ ┌────────────────────────────┐   │  │ sont confidentielles │  │
│  │ │ ○ Maison  ○ Appart.        │   │  │ et jamais revendues. │  │
│  │ └────────────────────────────┘   │  │                      │  │
│  │                                  │  │                      │  │
│  │ Orientation principale du toit   │  │                      │  │
│  │ ┌────────────────────────────┐   │  │                      │  │
│  │ │ ○ Sud  ○ S-E/S-O  ○ E/O   │   │  │                      │  │
│  │ │ ○ Je ne sais pas           │   │  │                      │  │
│  │ └────────────────────────────┘   │  │                      │  │
│  │                                  │  │                      │  │
│  │ Ombrage sur la toiture           │  │                      │  │
│  │ ┌────────────────────────────┐   │  │                      │  │
│  │ │ ○ Non  ○ Partiel  ○ Fort   │   │  │                      │  │
│  │ └────────────────────────────┘   │  │                      │  │
│  │                                  │  │                      │  │
│  │  ┌──────────────────────────┐    │  │                      │  │
│  │  │      Continuer →         │    │  │                      │  │
│  │  └──────────────────────────┘    │  │                      │  │
│  └──────────────────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Résultat — Desktop**
```
┌──────────────────────────────────────────────────────────────────┐
│ RÉSULTAT [2 colonnes · métriques / CTA expert]                   │
│                                                                  │
│  ┌──────────────────────────────────┐  ┌─────────────────────┐  │
│  │ ✅ Votre estimation, [Prénom]    │  │ PANNEAU EXPERT       │  │
│  │                                  │  │ (sticky)             │  │
│  │ ┌────────┐ ┌────────┐ ┌────────┐ │  │                      │  │
│  │ │~1100€  │ │8–12k€  │ │7–10ans │ │  │ [H3] "Obtenir un    │  │
│  │ │économ. │ │invest. │ │ROI     │ │  │  résultat précis"    │  │
│  │ └────────┘ └────────┘ └────────┘ │  │                      │  │
│  │                                  │  │ [Parler à un expert] │  │
│  │ 🏛️ Aides en [Région] :           │  │                      │  │
│  │  Prime énergie · Tarif prosumer  │  │ Sans engagement      │  │
│  │                                  │  │ Gratuit              │  │
│  │ ⚠️ Estimation indicative          │  │                      │  │
│  │                                  │  │ ────────────────     │  │
│  │ [Télécharger]  [Partager]        │  │ [Télécharger PDF]    │  │
│  │ [Recommencer]                    │  │ [Recommencer]        │  │
│  └──────────────────────────────────┘  └─────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. États à gérer

### Formulaire multi-étapes
| État | Comportement |
|---|---|
| **Champ vide** | Bouton "Continuer" désactivé |
| **Champ rempli** | Bouton activé, couleur primaire |
| **Retour arrière** | Données de l'étape précédente conservées |
| **Abandon** | Si email saisi → email de relance automatique |
| **Erreur réseau** | Message inline + bouton réessayer |

### Page résultat
| État | Comportement |
|---|---|
| **Loading** | Spinner + "Calcul en cours..." (500ms) |
| **Bon potentiel** | Badge vert ✅ |
| **Potentiel modéré** | Badge orange ⚠️ + explication |
| **Faible potentiel** | Badge gris + message alternatif (batterie, autre solution) |

---

## 6. Annotations d'interaction clés

- **Progress bar** → cliquable pour revenir à une étape passée (pas les futures)
- **Panneau latéral desktop** → contenu contextuel change selon la question active
- **Badge "Je ne sais pas"** sur orientation → ajouter un tooltip/aide visuelle avec illustration de compass
- **Compteur personnes** → min 1, max 10, incrément par 1
- **Checkbox "contact expert"** → si cochée, afficher champ téléphone optionnel
- **Résultat** → basé sur barèmes configurés dans Sanity (document `analyseConfig`)

---

## 7. Spécifications techniques

| Élément | Implémentation |
|---|---|
| Composant | `components/blocks/AnalyseForm.tsx` (client) |
| Routing | `/analyse` → résultat inline (pas de redirect) ou `/analyse/resultat` |
| State | `useReducer` + URL params pour partageabilité du résultat |
| Calcul | Client-side avec barèmes depuis Sanity `analyseConfig` |
| Email | API route `/api/analyse` → service d'emailing (Resend / Brevo) |
| Analytics | Event par étape + event "résultat vu" + event "expert contacté" |
| PDF | Génération côté serveur (jsPDF ou API route) |
