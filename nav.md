# Navigation & header

> Hub : `../CLAUDE.md`. Voir aussi `architecture.md`.

## Principe

5 entrées maximum, **2 niveaux visibles maximum**, **un seul CTA de conversion**,
une rangée utilitaire au-dessus. La profondeur SEO vit dans des méga-menus groupés
+ le footer, jamais dans une cascade infinie (≠ l'ancien site).

## Rangée utilitaire (fine, au-dessus de la barre)

Aligne à droite, discret :
- **Téléphone** [À COMPLÉTER] — signal de confiance fort (installateur direct) +
  clic-pour-appeler sur mobile.
- **Sélecteur de région** (Wallonie / Bruxelles / Flandre) — pilote le contenu des aides
  **ET alimente les query params de tous les liens vers `/simulateur` dans la page**.
  Quand l'utilisateur sélectionne une région ici, tous les CTAs simulateur de la page
  doivent se mettre à jour pour inclure `?region=X`.
- **Bascule FR / NL**.

## Barre principale

- **Logo** (gauche).
- **4 piliers en méga-menus** :
  - Comprendre
  - Rentabilité & prix
  - Aides & primes
  - Installation
- **Un seul bouton CTA (droite)** : **« Mon estimation »** → `/simulateur`.
- **PAS d'entrée « Simulateur »** dans la barre : elle ferait doublon avec le bouton
  (décision validée — une seule porte d'entrée, parcours non dilué).
  On accède à `/simulateur` par le bouton, le footer et les liens contextuels du contenu.

## Méga-menus

- Groupés, lisibles, 2 niveaux max. Contenu = les pages listées dans `architecture.md`.
- **« Aides & primes » est organisé PAR RÉGION** (3 colonnes : Wallonie / Bruxelles / Flandre),
  pas par thème. C'est le différenciateur vs la concurrence.
- Chaque méga-menu se **referme sur une rampe vers le simulateur avec query params région** :
  - Colonne Wallonie → `Calculer ma prime → /simulateur?region=wallonie`
  - Colonne Bruxelles → `Calculer ma prime → /simulateur?region=bruxelles`
  - Colonne Flandre → `Bereken mijn premie → /simulateur?region=flandre`
  - Autres méga-menus (Comprendre, Rentabilité, Installation) → `/simulateur?region=X`
    où X est la région active dans le sélecteur de la rangée utilitaire (si définie), sinon lien
    sans param (le simulateur demandera la région en premier).

**Règle** : une rampe de méga-menu vers le simulateur sans param région est une occasion manquée.
Le méga-menu Aides est organisé PAR RÉGION précisément pour que la région soit connue au moment du clic.

## Mobile (prioritaire — trafic majoritairement mobile)

- La barre se replie en **hamburger**.
- **Le bouton CTA et le téléphone restent visibles en permanence** (collants),
  jamais cachés derrière le menu.
- Pas d'interaction au survol (le survol n'existe pas sur mobile) — voir tooltips au tap
  dans `interactivite-seo.md`.

## i18n
Tous les libellés de nav en FR/NL. Le sélecteur de langue est dans la rangée utilitaire.
