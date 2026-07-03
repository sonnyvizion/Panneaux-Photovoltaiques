# Direction visuelle — Design système

> Hub : `../CLAUDE.md`. Ce document remplace le stub initial : le design système est
> défini (2026-07-03), inspiré de la template **Aeline** (land-book, live sur
> [aeline.framer.website](https://aeline.framer.website/)) dont on a repris le
> **langage visuel** (couleurs, typo, formes, glassmorphisme dosé), pas la structure
> de page (le sitemap reste celui défini dans `architecture.md`).

## Cap recherché (mots du client)
Glassmorphisme, belles polices, très moderne, épuré — référence « Tesla ».
À retenir : « Tesla » = **retenue** (beaucoup de blanc, grande image, peu de texte,
une animation propre à la fois), pas un feu d'artifice. L'épure sert aussi la perf et la conversion.

Concrétisé via Aeline : palette réchauffée (pas les gris froids d'origine), accent
**menthe/teal** (pas le lime électrique d'Aeline — signal trop "AI tech", le menthe
sert mieux le positionnement éco/confiance), coins très arrondis façon pilule,
verre dépoli réservé aux éléments posés sur photo.

## 1. Couleurs

| Rôle | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#FFFDF9` | Fond de page par défaut (blanc cassé chaud) |
| `--color-surface` | `#FFFFFF` | Cartes, modules, nav (état opaque) |
| `--color-surface-warm` | `#F6EFE6` | Sections alternées (beige clair — pas de sections sombres, voir décision ci-dessous) |
| `--color-text` | `#241F1A` | Texte principal (noir chaud) |
| `--color-text-muted` | `#6E655B` | Texte secondaire |
| `--color-border` | `#EAE1D4` | Séparateurs, contours discrets |
| `--color-accent` | `#3FCE96` ⚠️ *estimation, à valider* | CTA, liens actifs, highlights (menthe) |
| `--gradient-hero` | `#F0C7BC` → `#F3D9B0` → `#DCCDE8` | Overlay hero uniquement (rosé → pêche → lavande), jamais en fond de section pleine |

**Décision de rythme** : pas d'alternance clair/sombre (contrairement à Aeline qui
utilise des sections `#131313`). Tout le site reste clair et chaleureux, cohérent
avec la photo dorée du hero — le contraste vient des nuances chaudes
(`--color-bg` / `--color-surface-warm`), jamais du noir.

⚠️ **`--color-accent` est une estimation visuelle** (extraite d'une capture d'écran,
pas d'un fichier source) — à corriger dès que la valeur exacte est connue (Figma
ou code hex fourni par le client).

## 2. Typographie

**Circular Std** (polices fournies dans `font/`, 5 graisses + italiques : Light,
Book, Medium, Bold, Black) sur toute la hiérarchie texte, + **Geist Mono** (à
ajouter, gratuite/SIL) pour les chiffres clés du simulateur.

⚠️ **Licence webfont à confirmer côté client** — Circular Std est une police
commerciale (Lineto). Les fichiers fournis couvrent l'usage desktop/self-hosted,
mais il faut s'assurer qu'une licence webfont couvre la diffusion publique du site.

| Usage | Police | Graisse | Taille (desktop) | Line-height |
|---|---|---|---|---|
| Hero / display | Circular Std | Bold | 48–56px | 1.1 |
| H1 page | Circular Std | Bold | 36–40px | 1.15 |
| H2 | Circular Std | Medium | 28px | 1.2 |
| H3 | Circular Std | Medium | 20px | 1.3 |
| Corps de texte | Circular Std | Book | 16–18px | 1.6 |
| Texte secondaire / légende | Circular Std | Book | 14px | 1.5 |
| Boutons / labels / nav | Circular Std | Medium | 15–16px | 1 |
| Chiffres clés (simulateur, stats) | Geist Mono | Medium | variable, souvent large | 1.1 |

## 3. Formes, ombres & effet verre

**Radius** — pilule partout (décision confirmée) :

| Rôle | Valeur |
|---|---|
| Boutons, nav, badges, tags | `9999px` (pilule complète) |
| Cartes, modules, images encadrées | `24px` |
| Petits éléments (inputs, mini-icônes conteneurs) | `16px` |

**Ombres** : teintées chaudes, jamais noir neutre —
`box-shadow: 0 8px 24px rgba(80, 60, 40, 0.12)` en référence. Pas de drop-shadow dur.

**Glassmorphisme** — motif récurrent sur tout fond photo (pas limité à la nav) :

```css
background: rgba(255, 253, 249, 0.55);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.4);
```

Deux variantes :
- **Texte nu sur photo** (nav inactive, texte hero) : blanc + léger `text-shadow` pour la lisibilité.
- **Pastille verre** (item nav actif, badges réassurance, callouts sur photo) : recette ci-dessus + `--color-text`.

⚠️ **Garde-fou perf** (règle d'or #1) : `backdrop-filter` réservé aux éléments
au-dessus du pli ou peu nombreux par page (nav, hero, 1-2 callouts) — **jamais**
en répétition dans une grille de cartes.

**Nav — comportement à deux états** : glass flottant tant qu'elle est sur une
section photo (home hero) ; passe en opaque (`--color-surface` + ombre légère)
au scroll ou sur les pages de contenu sans photo en tête. Jamais de glass sur
fond de contenu plat.

## 4. Espacement & grille

| Token | Valeur |
|---|---|
| Unité de base | `4px` |
| Échelle | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 |
| Padding vertical section (desktop) | 96–128px |
| Padding vertical section (mobile) | 48–64px |
| Largeur max conteneur | 1280px |
| Colonnes | 12 (desktop), 4 (mobile) |
| Breakpoints | 640 / 768 / 1024 / 1280px |

## 5. Composants de base

- **Bouton principal** : pilule pleine `--color-accent`, texte `--color-text`,
  cercle greffé à l'extrémité droite en `--color-text` (fond) + flèche
  `--color-bg` (icône), motif signature du hero réutilisé pour tous les CTA
  primaires du site (pas seulement le hero).
- **Bouton secondaire** : pilule contour (`1px solid var(--color-border)`), fond
  transparent/blanc, texte `--color-text`.
- **Lien texte** : soulignement fin, `--color-text-muted`. État actif prioritaire
  sur le hover (mobile-first).
- **Champ + CTA combinés** (ex. code postal du hero) : un seul conteneur pilule,
  séparation par contraste de fond (input clair / bouton accent), pas de bordure
  interne.
- **Cartes** : `24px` radius, `--color-surface`, ombre chaude légère, image en
  tête avec le même radius (pas de coin carré résiduel).
- **Accordéons** (défaut du site, règle #5 du cadrage) : ligne pleine largeur,
  chevron rotation 180° à l'ouverture, séparateur `--color-border` entre items,
  pas de bordure lourde.
- **Badges/tags** : pilule, variante verre (sur photo) / `--color-surface-warm`
  (ailleurs).

## 6. Mouvement & interactions

| Interaction | Traitement |
|---|---|
| Bouton / lien (hover ou tap) | 150ms ease, changement léger d'opacité/teinte — visible au tap, pas seulement au survol |
| Accordéon | 250ms ease, rotation chevron + hauteur |
| Apparition au scroll | Fade + `translateY(8px)`, réservé aux sections clés (hero, transition contenu→simulateur) — pas un défaut systématique |
| `prefers-reduced-motion` | Toutes les animations réduites à un simple fade |

Pas d'animation de page (SSG Astro, pas de transition de route lourde). Le
mouvement reste un accent, jamais un défaut.

## Assets

- **Polices** : `font/CircularStd-{Light,Book,Medium,Bold,Black}.woff2` (+
  italiques) — à copier vers l'arborescence Astro (`public/fonts/` ou
  `src/assets/fonts/`) et déclarer en `@font-face` self-hosted à l'implémentation.
  Geist Mono à récupérer séparément (Google Fonts / repo officiel Vercel).
- **Image hero** : `img/img_hero.jpg` (7473×4318px, 3.5 Mo, photo réelle de toit
  en cours d'installation — cohérent avec le principe « pas de stock générique »).
  À passer par `astro:assets` pour le redimensionnement/compression au build
  (pas de précompression manuelle nécessaire) ; conserver l'original en source.

## Ouvert / à valider

- [ ] Valeur exacte de `--color-accent` (menthe) — estimation à confirmer ou corriger.
- [ ] Licence webfont Circular Std côté client.
- [ ] Logo et déclinaisons (toujours absent).
- [ ] Maquettes restantes : page `/simulateur`, gabarit page de contenu, header
  desktop + mobile (le hero seul a été maquetté à ce stade).
