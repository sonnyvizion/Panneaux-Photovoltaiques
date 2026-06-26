# Architecture & sitemap

> Hub : `../CLAUDE.md`. Voir aussi `nav.md`, `simulateur.md`, `pages-contenu.md`, `funnel.md`.

## Comptage des pages (corrigé)

Total réel : **~55 pages** (et non ~35 — le chiffre initial sous-estimait les sous-pages).

| Section | Pages |
|---|---|
| Home | 1 |
| Funnel (simulateur, analyse, merci, rapport) | 4 |
| Comprendre | 12 |
| Rentabilité & prix | 5 |
| Aides & primes | 11 |
| Installation | 14 |
| Transverses (blog, FAQ, glossaire, à propos, réalisations, contact, légal ×2) | 8 |
| **Total** | **~55** |

## Plan de phasage (validé par le client)

Objectif : mettre en ligne rapidement sans attendre les 55 pages.

### Phase 1 — Le cœur commercial (mise en ligne prioritaire)
- Home
- `/simulateur` (résultats partiels + pont étude personnalisée)
- `/analyse` (formulaire guidé)
- `/devis/merci` + `/rapport`
- 1 page d'entrée par pilier (les "portes d'entrée" des méga-menus)
- Pages Aides par région (×9 — fort différenciateur)
- À propos · Nos réalisations · Contact · Légal ×2

### Phase 2 — La profondeur encyclopédique
- Toutes les sous-pages des piliers Comprendre, Rentabilité, Installation
- FAQ globale · Glossaire

### Phase 3 — La longue traîne et les niches
- Pages niches (camping-car, ombrière, copropriété, entreprises…)
- Blog / Actualités
- Études de cas détaillées

## Principe d'arborescence

Deux axes qui coexistent et se renvoient la balle :

- **Axe conversion** (le funnel) : Hero → `/simulateur` → résultats → pont devis → merci.
- **Axe encyclopédie** (SEO + confiance) : 4 piliers, profondeur dans les pages,
  maillage par le header + footer + liens contextuels. Ramène toujours au simulateur.

Plafond de navigation visible : **2 niveaux**. La profondeur SEO existe en pages,
pas en cascade de menus (≠ l'ancien site, qui imbriquait jusqu'à 4 niveaux).

## Architecture de funnel (matched-funnel)

Le site sert **3 profils** à **3 stades** différents. L'architecture doit les router
différemment — pas envoyer tout le monde au même endroit.

| Profil | Stade | Point d'entrée probable | Outil servi | CTA |
|---|---|---|---|---|
| **Curieux** (découvre le sujet) | Awareness | SEO articles encyclopédiques | Page contenu → rampe simulateur | `/simulateur?region=X` |
| **Qui évalue** (chiffre son projet) | Consideration | SEO "prix", "aides", home | `/simulateur` complet | Pont devis ou PDF email |
| **Décidé** (cherche un installateur) | Decision | SEO "simulateur", pub directe | `/simulateur` → pont devis direct | Formulaire devis |

**Principe de routage** : chaque lien vers `/simulateur` dans le site transmet le contexte
connu en query params (`?region=`, `?orientation=`). Le simulateur pré-remplit.
Jamais d'ouverture de `/simulateur` à l'état vide si la région est connue du contexte.

Détail segmentation complète → `docs/funnel.md`.

## La home (épurée)

Ordre des blocs, de haut en bas :

1. **Header collant** — voir `nav.md`.
2. **Hero-amorce** — photo de toit en fond, H1, court texte qui tease le simulateur,
   carte glassmorphisme avec **un seul champ : code postal** + bouton « Continuer à simuler ».
   Le bouton ouvre `/simulateur?region=X` (région auto-détectée du CP). N'effectue AUCUN calcul.
3. **Réassurance** — chantiers réels (galerie géolocalisée), équipe (vrais visages),
   certifications (**installateur certifié Enphase** + RESCERT ou équivalent), garanties,
   avis clients géolocalisés + note. Message anti-intermédiaire mis en avant.
   Focus local Bruxelles et périphérie (zone d'intervention prioritaire).
4. **Comment ça marche** — schéma animé léger (voyage du photon). Remplace un pavé.
5. **Aides par région** — carte de Belgique cliquable (Wallonie / Bruxelles / Flandre).
   Différenciateur fort. Se referme sur une rampe vers le simulateur (« calculer ma prime »).
6. **FAQ** — top questions en accordéon + balisage `FAQPage`. Lève les objections + longue traîne.
7. **CTA final** — dernière relance vers le simulateur pour qui a tout scrollé.
8. **Footer** — plan de site complet (profondeur SEO), légal, contact, sélecteur langue.

> Note : le simulateur complet n'est volontairement PAS sur la home.
> La home l'amorce (hero) et renvoie vers `/simulateur`.

## `/simulateur` (page dédiée)

Page à part entière (SEO « simulateur panneaux solaires » + landing pour pubs).
Contient le calculateur live complet + le pont devis. Détail dans `simulateur.md`.
Partage le même composant que celui qu'amorce le hero.

## Les 4 piliers encyclopédiques

Rationalisés depuis l'ancien site. Chaque page suit le gabarit de `pages-contenu.md`.

### Pilier 1 — Comprendre
- Fonctionnement des panneaux
- Types de panneaux : monocristallin · polycristallin · bifacial · amorphe
- Composants : onduleur & micro-onduleur · batterie domestique · compteur intelligent · borne de recharge
- Longévité · Garanties (Belgique) · Maintenance & nettoyage
- Impact écologique · Risques & inconvénients

### Pilier 2 — Rentabilité & prix
- Prix des panneaux 2026
- Rendement · Production
- Amortissement / retour sur investissement
- Autoconsommation · Revente de surplus / injection réseau

### Pilier 3 — Aides & primes (organisé PAR RÉGION)
- **Wallonie** : primes & certificats verts · tarif prosumer · démarches administratives
- **Bruxelles** : certificats verts · réglementation 2026 · démarches administratives
- **Flandre** : premie & régime 2026 · fin du compteur inversé · démarches administratives
- Transverses : guide entreprises · installation en copropriété

### Pilier 4 — Installation
- Préparation : orientation & inclinaison · nombre de panneaux · puissance · dimensions · poids · ombrage · fixation
- Emplacements : toit incliné · toit plat · intégré toiture (BIPV) · abri de jardin · jardin/au sol · carport · balcon · **camping-car & van** · **ombrière de parking**
- Trouver un pro · installer soi-même
- Configurations alternatives : camping-car & van (12V/24V, fixation sans perçage, batteries portables) · ombrière de parking (grande puissance, usage professionnel/copropriété, démarches spécifiques)
- Applications : pompe à chaleur · voiture électrique

## Pages transverses
- Blog & actualités (longue traîne, fraîcheur SEO)
- FAQ globale + FAQ par thème
- À propos (l'histoire du client, l'équipe, les installateurs)
- Avis / réalisations
- Contact
- Légal : mentions, confidentialité/RGPD, cookies

## Le funnel devis
`/simulateur` → résultats (chiffres visibles) → **pont adaptatif** → écran merci.

Le pont est **adaptatif selon le profil calculé** :
- Profil chaud (ROI évident) → formulaire devis direct au premier plan.
- Profil tiède → devis + CTA secondaire « recevoir mon estimation par email ».
- Profil locataire → écran dédié (redirection bienveillante, pas de formulaire devis).

L'écran de confirmation/merci contient le récap du projet + prochaines étapes claires.
Détail dans `simulateur.md`. Séquences email post-capture dans `funnel.md`.
