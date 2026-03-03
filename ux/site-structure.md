# Structure du site — Panneaux Photovoltaïques BE

> **Philosophie centrale** : Passer d'un site encyclopédique à un site orienté décision.
> **Question centrale** : *"Les panneaux solaires sont-ils rentables pour votre maison ?"*
> **CTA principal** : L'analyse personnalisée gratuite.

---

## Problème du site actuel

| Actuel (encyclopédique) | Nouveau (orienté décision) |
|---|---|
| "Voici tout sur le photovoltaïque" | "Est-ce rentable pour vous ?" |
| Navigation profonde, 40+ pages | Navigation simple, 6 rubriques |
| Contenu en avant-plan | Analyse en avant-plan, contenu en support |
| Perd le visiteur dans l'info | Guide le visiteur vers une décision |

---

## Nouvelle architecture de navigation

```
Accueil
├── Mon analyse (CTA principal — toujours visible)
├── Simulateur                     ← Option 2 : /simulateur
│   └── Simulateur Pro             ← Option 3 : /simulateur-pro
├── Rentabilité
│   ├── Combien ça coûte ?
│   ├── Les aides disponibles
│   │   ├── Bruxelles
│   │   ├── Wallonie
│   │   └── Flandre
│   └── Retour sur investissement
├── Comprendre
│   ├── Comment ça marche ?
│   ├── Choisir ses panneaux
│   ├── L'installation
│   └── Entretien & durée de vie
├── Blog & Actualités
└── FAQ
```

---

## Pages prioritaires

### Priorité 1 — Socle décisionnel

| Page | Objectif | CTA |
|---|---|---|
| **Accueil** | Accrocher + qualifier + rassurer | → Mon analyse |
| **Analyse personnalisée** `/analyse` | Formulaire multi-étapes · contact humain | → Résultat / Contact expert |
| **Simulateur** `/simulateur` | Outil calculateur · PDF auto · lead gen | → PDF par email / Expert |
| **Simulateur Pro** `/simulateur-pro` | Devis semi-pro · tarifs réels · revente | → PDF devis / Installateur |
| **Rentabilité** | Hub "combien je vais gagner ?" | → Mon analyse |
| **Prix & aides** | Réduire la peur du coût | → Mon analyse |

### Priorité 2 — Support pédagogique (contenu existant réorganisé)

| Page | Objectif |
|---|---|
| **Comment ça marche** | Rassurer, vulgariser |
| **Choisir ses panneaux** | Orienter sans noyer |
| **Aides par région** | Pages dédiées Bruxelles / Wallonie / Flandre |
| **FAQ** | Traiter les objections |
| **Blog** | SEO + actualités |

---

## Parcours utilisateur principal

```
Arrivée sur le site
       │
       ▼
   ACCUEIL
"Rentable pour votre maison ?"
       │
       ├─── Curieux → scroll → pédagogie → CTA
       │
       └─── Décidé → [Mon analyse →]
                           │
                           ▼
                  ANALYSE PERSONNALISÉE
              (formulaire 3 étapes rapides)
                           │
                           ▼
                    RÉSULTAT ESTIMÉ
               + Proposition de contact expert
                           │
                           ▼
                    PRISE DE CONTACT
```

---

## Contenu existant → Repositionnement

Le contenu actuel est bon — il faut juste le **repositionner en support**.

| Contenu actuel | Nouveau rôle |
|---|---|
| Fonctionnement, types de panneaux... | Page "Comprendre > Comment ça marche" |
| Rentabilité, autoconsommation... | Page "Rentabilité" (hub) |
| Prix, subventions par région... | Pages "Prix & aides" + pages régionales |
| Installation, orientation, ombre... | FAQ + section dans "Analyse" |
| Blog & actualités | Inchangé |
| FAQ existante | Consolidée en une FAQ claire |
