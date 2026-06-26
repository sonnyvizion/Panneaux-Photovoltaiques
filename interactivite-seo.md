# Interactivité & performance (Core Web Vitals)

> Hub : `../CLAUDE.md`. Les deux sujets sont liés : l'interactivité ne vaut que si la page reste rapide.

## Philosophie

- **Remplacer le pavé, pas le décorer.** Le format suit la nature de l'info :
  - comparaison → cartes qu'on bascule (pas 4 paragraphes)
  - processus → schéma animé (pas une liste à puces)
  - dépendance à des variables → curseur qu'on manipule (pas un tableau)
  - différence géographique → carte cliquable (pas 3 sections empilées)
- **Couche par défaut = illustrations + accordéons** (léger, rapide, partout).
- **Briques interactives = l'accent**, réservées aux pages où manipuler explique mieux que lire.
- On construit chaque brique **une fois**, on la réutilise dans le simulateur (pour calculer)
  ET dans le contenu (pour expliquer). Chaque brique pédagogique se termine par une rampe
  vers le simulateur.

## Catalogue des briques réutilisables

| Brique | Rôle dans le simulateur | Réemploi dans le contenu | Note perf |
|--------|-------------------------|--------------------------|-----------|
| Voyage du photon (schéma animé) | — | Page « fonctionnement » : remplace le pave | SVG léger, anim au scroll-in |
| Curseur orientation/inclinaison | Étape orientation | Page « rendement » : on bouge le soleil, le % bouge | JS léger, pas de lib |
| Slider facture avant/après | Affichage économies | Pages prix/rentabilité | Léger |
| Timeline d'amortissement | Résultats (ROI) | Pages rentabilité | Anim au scroll-in |
| Tooltips au tap | Libellés techniques | 3-4 termes jargon : onduleur, kWc, prosumer | Parcimonie (3-4 max) |
| Carte des aides par région | Sélecteur région | Home + pages aides | Léger, fallback liste |

## Verdicts sur les idées initiales

- **Pop-ups au survol** → à convertir en **tooltips au tap** (le survol n'existe pas sur mobile),
  avec parcimonie (3-4 termes vraiment jargonneux, sinon ça parasite la lecture).
- **Scroll-videos / scroll-jacking** → joli mais coûteux et souvent pénible. Si on en met :
  **une seule, courte, avec fallback image**. Pas le réflexe par défaut.
- **Schémas en motion design** → bon, à condition de rester léger (SVG, déclenché à l'apparition).

## Règles de performance — NON NÉGOCIABLES

Le SEO amène le trafic → qui alimente le simulateur → qui génère les leads.
Casser les Core Web Vitals casse toute la chaîne.

- **Animations déclenchées à l'apparition** (scroll-in), **jamais en autoplay permanent**.
- **Fallback propre** pour chaque module (image ou contenu statique).
- **Le texte SEO vit dans le HTML**, jamais uniquement dans une animation.
- **Images** : WebP/AVIF (pipeline Sanity), `width`/`height` déclarés (CLS), lazy-load sauf hero.
- **Pas de librairie lourde** pour ce qu'on peut faire en SVG/JS natif. Mesurer le poids ajouté.
- **Front statique (Astro, SSG)** : pages pré-rendues en HTML quasi pur. L'interactivité
  est hydratée en **îlots** uniquement là où elle existe → le reste de la page ne paie pas le JS.
- L'interactif est une **couche par-dessus** le contenu lisible, **pas à la place**.

## Note glassmorphisme (anticipation phase design)
Le `backdrop-filter: blur()` est **coûteux** en rendu. À doser : l'utiliser sur quelques
surfaces clés (carte du hero, cartes de résultats), pas partout. Détail en phase design (`design.md`).
