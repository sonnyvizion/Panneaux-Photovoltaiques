# Architecture de funnel

> Hub : `../CLAUDE.md`. Ce document formalise la segmentation audience, le routage,
> les séquences email et la mesure. Il complète `simulateur.md` et `architecture.md`.

## Parcours validé par le client

```
Contenu SEO → Simulateur → Résultat simplifié → Demande d'étude personnalisée → Contact → Devis
```

Le simulateur affiche des **fourchettes**, pas des chiffres précis (Option A validée).
Le détail exact (kWc, coût, aides précises) est réservé à l'étude personnalisée de l'équipe.
Cela justifie le contact et préserve la valeur ajoutée de l'installateur.

## Principe : matched-funnel, pas kitchen-sink

Le site sert des profils très différents. Un curieux qui découvre le sujet et un propriétaire
qui veut signer dans le mois ne méritent pas le même parcours ni le même email.

Trois anti-patterns à éviter :
- **Silo-funnel** : chaque outil (simulateur, articles, formulaire) vit seul, sans connectique.
- **Kitchen-sink** : tout le monde reçoit le même email, voit le même CTA, suit le même chemin.
- **Matched-funnel** (objectif) : le chemin, le CTA et la séquence s'adaptent au profil et au stade.

---

## Segmentation : matrice profil × stade

### Profils (3)

| Profil | Qui c'est | Signal observable |
|---|---|---|
| **Curieux** | Propriétaire qui découvre le sujet, pas encore convaincu | Arrive sur articles encyclopédiques, rebond rapide si pas de valeur immédiate |
| **Qui évalue** | Propriétaire qui chiffre activement son projet | Utilise le simulateur, compare les aides, revient plusieurs fois |
| **Décidé** | Propriétaire qui cherche un installateur de confiance | Arrive via pub ou SEO "simulateur", remplit le formulaire devis |

### Stades (3)

| Stade | Contenu qui fit | CTA qui fit | CTA qui ne fit pas |
|---|---|---|---|
| **Awareness** | Éducatif, encyclopédique, rassurant | Simulateur, « en savoir plus » | Formulaire devis |
| **Consideration** | Comparatif, chiffres, aides région | Simulateur + PDF, pages aides | Hard sell immédiat |
| **Decision** | Confiance, preuves sociales, anti-risque | Formulaire devis direct | Long texte éducatif |

### Matrice (9 cellules)

| Profil | Awareness | Consideration | Decision |
|---|---|---|---|
| **Curieux** | Articles encyclopédiques → rampe simulateur | Mini-simulateur home → `/simulateur` | — |
| **Qui évalue** | Pages rentabilité/aides → rampe simulateur | `/simulateur` complet + PDF email | Pont devis |
| **Décidé** | — | `/simulateur` (validation rapide) | Pont devis direct |

Dimension transverse : **la région** (Wallonie / Bruxelles / Flandre) modifie le message
dans chaque cellule (aides différentes, logique économique différente).

---

## Architecture des points d'entrée

| Point d'entrée | Profil probable | Stade | Outil servi | Query params |
|---|---|---|---|---|
| SEO "comment fonctionnent les panneaux" | Curieux | Awareness | Article encyclopédique | — |
| SEO "aides panneaux [région]" | Qui évalue | Consideration | Page aides → simulateur | `?region=X` |
| SEO "prix panneaux 2026" | Qui évalue | Consideration | Page rentabilité → simulateur | `?region=X` si connu |
| SEO "simulateur panneaux solaires" | Qui évalue / Décidé | Consideration→Decision | `/simulateur` direct | — |
| Home (toutes sources) | Mix | Awareness→Consideration | Hero CP → mini-simulateur → `/simulateur` | `?region=X` depuis CP |
| Pub directe | Décidé | Decision | `/simulateur` ou landing dédiée | `?region=X` depuis ciblage pub |

**Règle de routage** : connaître la région = la transmettre. Toujours.

---

## Mapping outil → segment → stade

| Outil | Segment servi | Stade | Risque si mal positionné |
|---|---|---|---|
| Articles encyclopédiques | Curieux | Awareness | Si CTA trop agressif → fuite |
| Mini-simulateur home (3 questions) | Curieux → Qui évalue | Awareness→Consideration | Si trop complexe → friction ; si trop vague → pas de valeur |
| `/simulateur` complet | Qui évalue | Consideration | Si même CTA pour tous → kitchen-sink |
| CTA secondaire PDF email | Qui évalue (hésitant) | Consideration | Silo si l'email ne déclenche pas de séquence différenciée |
| Pont étude personnalisée | Qui évalue / Décidé | Decision | Contre-productif si discours intermédiaire ou téléphone en premier. CTA = "étude personnalisée" pas "devis". |
| Écran locataire | Locataire (filtré) | — | Frustration si découvert trop tard dans le parcours |

---

## Séquences email par segment

### Séquence A — PDF demandé (profil tiède / hésitant)

Déclencheur : email saisi pour recevoir le PDF de simulation.

| # | Timing | Objet (FR) | Contenu | CTA |
|---|---|---|---|---|
| 1 | Immédiat | Votre simulation panneaux — [région] | PDF en pièce jointe + récap des chiffres clés | « Des questions ? Appelez-nous » + lien simulateur |
| 2 | J+2 | Les aides auxquelles vous avez droit en [région] | Détail des aides spécifiques à leur région (prime, prosumer, certificats verts…) | « Voir toutes les aides → » lien page aides |
| 3 | J+5 | Un chantier près de chez vous | Photo + témoignage d'un chantier dans leur région | « Voir nos réalisations → » |
| 4 | J+10 | Votre projet a-t-il avancé ? | Relance douce + récap simulation | « Recevoir un devis gratuit → » pont devis |
| 5 | J+20 | Dernière chance d'y répondre | Relance finale + offre de rappel | « Être rappelé → » |

### Séquence B — Devis demandé (profil chaud)

Déclencheur : formulaire de qualification soumis.

| # | Timing | Objet (FR) | Contenu | CTA |
|---|---|---|---|---|
| 1 | Immédiat | Votre demande est bien reçue | Confirmation + récap du projet + prochaines étapes | — |
| 2 | J+1 (si pas de contact commercial) | Notre équipe vous contacte sous 48h | Rassurance + présentation de l'équipe | Numéro direct |

> Note : la séquence B est courte car le commercial prend le relais rapidement.
> Les emails ne doivent pas se substituer au contact humain pour ce profil.

### Règles communes aux séquences

- Chaque email se termine par un **lien de désinscription** (RGPD obligatoire).
- Toute séquence est **dupliquée en NL** avec contenu localisé (aides Flandre en NL).
- Les emails Bruxelles peuvent être bilingues FR/NL (contexte bruxellois).
- **Pas de kitchen-sink** : un abonné Wallonie ne reçoit jamais un email sur les aides Flandre.
- Outil recommandé : **Brevo** (conforme RGPD, tarifs accessibles) ou **Resend** (API-first).
  À décider avec le client.

---

## Cross-tool data flow

Les données voyagent d'un outil à l'autre. Sans ça, chaque outil est un orphelin.

```
ARTICLE CONTENU
  [région connue du contexte (sélecteur ou page)]
        │
        │ ?region=X&orientation=Y (query params)
        ▼
  /simulateur
  [pré-remplit les champs]
        │
        │ Profil calculé (score chaud/tiède + région)
        ▼
  PONT DEVIS ou CTA PDF
  [récap simulation visible dans le formulaire]
        │
        ├─ Email capturé → Séquence A (tiède)
        └─ Formulaire soumis → Séquence B (chaud) + CRM commercial
```

**Identity threading** : dès que l'email est capturé (PDF ou devis), toutes les
interactions suivantes du visiteur peuvent être associées à ce profil (analytics,
retargeting, personnalisation de la séquence).

---

## Métriques d'architecture (à instrumenter)

Ne pas mesurer que les métriques d'outil — mesurer la connectique.

| Métrique | Ce qu'elle révèle |
|---|---|
| Taux de conversion article → simulateur | Qualité des rampes contextuelles |
| Taux de complétion simulateur | Friction dans les entrées |
| Taux simulateur → pont devis | Efficacité du pont de conversion |
| Taux pont devis → formulaire soumis | Qualité du discours anti-intermédiaire |
| Taux email capturé → séquence ouverte | Pertinence de la segmentation email |
| Taux séquence email → retour simulateur | Efficacité de la boucle nurture |
| Taux leads qualifiés vs total leads | Efficacité de la qualification locataire |

**Outil analytics recommandé** : Plausible ou Umami (léger, RGPD) pour le trafic.
Events custom à déclencher : `simulator_started`, `simulator_completed`, `pdf_requested`,
`quote_form_submitted`, `region_selected`.

---

## Décisions en attente (à valider avec le client)

1. **Outil email** : Brevo ou Resend ? → Impact sur le coût mensuel et la complexité dev.
2. **Seuils CTA adaptatif** : quels seuils (kWh × orientation × m²) basculent vers le CTA chaud ?
   À calibrer avec le commercial (quels profils veut-il recevoir en priorité ?).
3. **Séquence NL** : qui rédige les emails en néerlandais ? Interne ou traducteur externe ?
4. **CRM commercial** : les leads du formulaire atterrissent où ? (email entrant, CRM, outil de gestion rendez-vous ?)
