# CLAUDE.md — Site panneaux photovoltaïques — Belgreen / Belectric

> Document hub. Volontairement court. La profondeur est dans `docs/`.
> Toute décision contredisant ce fichier doit être discutée avant d'être codée.

## Le projet en une phrase

Un site encyclopédique sur le photovoltaïque en Belgique, **orienté conversion**,
dont l'objet central est un **simulateur** qui estime production, coût et économies,
puis amène le visiteur vers un **devis direct** auprès des installateurs du client.

## Modèle business — à ne jamais perdre de vue

- Le client **possède ses propres installateurs**. Ce n'est PAS un comparateur de leads.
- Argument différenciateur central : **pas d'intermédiaire, pas de revente de données.**
  « Vous parlez directement à l'équipe qui installera vos panneaux. »
- Objectif du site : générer des **leads qualifiés** (pas du volume brut).
- Concurrent de référence : Solvari (panneausolaire-info.fr) — machine à leads efficace
  mais lourde, peu interactive, modèle intermédiaire. On reprend sa rigueur, on bat son UX.

## Le principe central : le simulateur est la colonne vertébrale

L'encyclopédie ne vit pas À CÔTÉ du simulateur, elle s'y **greffe en boucle** :

- **Contenu → simulateur** : chaque page de contenu a une rampe contextualisée vers le
  simulateur (« vous, ça coûterait combien ? »), jamais un CTA générique.
- **Simulateur → contenu** : chaque étape du simulateur propose un « en savoir plus »
  qui lève le doute au moment où il surgit (orientation, prosumer, kWc…).

Boucle visée : lire → simuler → un doute → lire le point précis → reprendre → demander le devis.

## Périmètre

- **Géographie** : toute la Belgique, 3 régions traitées distinctement
  (Wallonie / Bruxelles / Flandre). Les aides ET la logique d'économies diffèrent par région.
- **Langues** : **FR + NL dès la v1** (i18n Sanity, voir `docs/pages-contenu.md`).

## Stack

- **CMS** : Sanity (headless, contenu structuré, i18n par document).
- **Front** : **Astro** — zéro JS par défaut, interactivité en **îlots** (React) là où c'est utile.
  C'est le meilleur choix pour un site contenu + SEO + vitesse avec quelques zones interactives.
- **Rendu** : statique (SSG) + régénération sur webhook Sanity. Le simulateur calcule 100 % côté client.
- **Images** : CDN d'images Sanity + `astro:assets` (WebP/AVIF, srcset, dimensions déclarées).
- Conséquence clé : le contenu = des **blocs typés réutilisables**, pas des pavés WYSIWYG.
- Détail complet (hébergement, polices, i18n, analytics) : `docs/stack.md`.

## Règles d'or (non négociables)

1. **Perf & SEO d'abord.** Le SEO amène le trafic qui alimente le simulateur qui génère
   les leads. Si on casse les Core Web Vitals, toute la chaîne s'effondre.
   Le texte SEO vit dans le HTML (jamais uniquement dans une animation).
2. **Un seul CTA principal** dans le header : « Mon estimation » → `/simulateur`.
3. **Un seul simulateur.** Le hero amorce (ne recalcule pas), le simulateur calcule.
4. **Remplacer le pavé, pas le décorer.** Le format suit la nature de l'info
   (comparaison → cartes, processus → schéma, variables → curseur, géo → carte).
5. **Interactif = accent, pas défaut.** Défaut = illustrations + accordéons (léger).
   Briques interactives réservées aux endroits où manipuler explique mieux que lire.
6. **Mobile-first.** Trafic majoritairement mobile. Pas d'interaction au survol seul.
7. **Positionnement anti-intermédiaire** partout où on parle de devis.

## Décisions validées (résumé — détails dans docs/)

- **Home** : très épurée. Hero-amorce (photo toit + H1 + carte glass [code postal]) →
  le bouton ouvre `/simulateur` avec le 1er volet pré-rempli (région auto-détectée du CP).
  Le simulateur complet n'est PAS sur la home, il EST la page `/simulateur`.
  Suite de la home : réassurance → comment ça marche → aides par région → FAQ → CTA final.
  Voir `docs/architecture.md`.
- **Nav** : rangée utilitaire (tél · région · FR/NL) + 4 piliers en méga-menus + 1 bouton.
  Pas d'entrée « Simulateur » (redondante avec le bouton). Méga-menu Aides organisé PAR RÉGION.
  Voir `docs/nav.md`.
- **Simulateur** : on garde le calculateur live existant. Corrections à faire (CO₂ faux,
  régionalisation prosumer/Flandre). Réécrire le pont devis (modèle direct, pas « 3 devis »)
  + ajouter la qualification. Voir `docs/simulateur.md`.
- **Pages de contenu** : « colonne vertébrale visible, profondeur repliée ».
  Réponse visible → module → essentiel → accordéons → FAQ balisée → ponts. Voir `docs/pages-contenu.md`.
- **Interactivité & perf** : catalogue de briques réutilisables + règles Core Web Vitals.
  Voir `docs/interactivite-seo.md`.

## Documents du projet

| Doc | Contenu |
|-----|---------|
| `docs/stack.md` | Choix techniques (Astro + Sanity), perf, hébergement, i18n |
| `docs/architecture.md` | Sitemap complet, blocs de la home, funnel devis, matched-funnel |
| `docs/funnel.md` | Segmentation audience, matrice profil×stade, séquences email, métriques |
| `docs/simulateur.md` | Entrées/sorties, amorce, corrections CO₂, pont devis, CTA adaptatif |
| `docs/pages-contenu.md` | Gabarit de page, accordéons/SEO, modélisation Sanity, query params |
| `docs/nav.md` | Header, méga-menus, mobile, sélecteur région → query params |
| `docs/interactivite-seo.md` | Briques interactives + Core Web Vitals |
| `docs/design.md` | Direction visuelle (stub — phase design à venir) |

## Informations client (partiellement connues)

- **Noms de marque** : Belgreen / Belectric (à confirmer lequel est l'entité principale).
- **Certification clé** : **Installateur certifié Enphase** — à mettre en avant sur :
  page Onduleur, page Trouver un installateur, page À propos, home (réassurance), footer.
- **Zone d'intervention prioritaire** : Bruxelles et périphérie.
- **Positionnement simulateur** : Option A validée — résultats en fourchette,
  détail précis réservé à l'étude personnalisée de l'équipe.

## À compléter (placeholders dans les docs)

- Logo, charte couleurs, police(s).
- Numéro de téléphone, adresse(s), mentions légales, RGPD.
- Autres certifications (RESCERT ou équivalent belge), garanties exactes.
- Photos de chantiers réels, avis clients, photos équipe.
- Hypothèses de calcul validées par le client (prix/kWc, tarif injection par région…).

## Ce qui reste à définir

- Stratégie i18n Sanity précise (par document recommandé) — voir `docs/pages-contenu.md`.
- Phase design (Tesla / glassmorphisme) — non démarrée.
