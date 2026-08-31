import type { ImageMetadata } from 'astro';
import { PAGE_SOURCES } from './searchSources';

/**
 * `href` → photo de HERO de la page. La jointure qui manquait aux hubs.
 *
 * ⚠️ POURQUOI UN REGISTRE EXPLICITE, ENCORE UN. Même raison que `PAGE_SOURCES`
 * dans `searchSources.ts` : le nom d'un fichier photo ne donne pas son URL.
 * `4.10-impact-ecologique-hero.webp` sert `/comprendre/impact-ecologique`,
 * `2.16-trouver-pro-hero.webp` sert `/installation/trouver-un-installateur`,
 * et `renta1.webp` ne porte même pas le mot « hero ». La numérotation vient du
 * cahier de construction, pas du sitemap : aucune règle ne dérive l'un de
 * l'autre sans se tromper.
 *
 * Jusqu'ici chaque page importait sa photo dans son propre frontmatter, ce qui
 * suffisait — une page, une photo. Les pages « vue d'ensemble » en réclament
 * onze d'un coup et n'ont aucun moyen de les nommer. D'où cette table.
 *
 * ⚠️ ELLE DOIT COUVRIR `PAGE_SOURCES` EN ENTIER — `assertHeroes()` fait échouer
 * le build sinon. Une carte de hub sans miniature ne se voit pas au build : on
 * la découvrirait en production, sur une grille trouée.
 *
 * ⚠️ À la bascule Sanity, ce fichier disparaît avec `searchSources.ts` : la
 * photo viendra du document.
 */
const HERO_FILES: Readonly<Record<string, string>> = {
  /* ⚠️ LES TROIS « VUES D'ENSEMBLE » EMPRUNTENT LA PHOTO D'UNE DE LEURS PAGES.
     Le cahier de construction ne leur en donne pas — c'est une ligne d'« À
     compléter » du CLAUDE.md. L'emprunt est déclaré ICI et nulle part ailleurs :
     les pages hub lisent `heroImage()` au lieu d'importer un fichier, pour que
     la substitution se fasse en un seul endroit le jour de la livraison. */
  '/a-propos': 'team_hero',
  /* ⚠️ « Nos réalisations » emprunte elle aussi, et pour une raison de plus :
     l'emplacement `placeholder` de `PageHero` est un aplat GRIS CLAIR, sur
     lequel la nav — posée en blanc par `transparentHeader` — devient illisible.
     À remplacer par une vraie photo de chantier dès livraison. */
  '/realisations': '2.9-toit-plat-hero',
  '/aides-primes': '1.1-wallonie-aides-hero',
  '/comprendre': '4.1-fonctionnement-hero',
  '/installation': '2.16-trouver-pro-hero',

  '/aides-primes/bruxelles': '1.4-bruxelles-certificats-hero',
  '/aides-primes/bruxelles/demarches': '1.6-demarches-bruxelles-hero',
  '/aides-primes/bruxelles/reglementation': '1.5-reglementation-bruxelles-hero',
  '/aides-primes/copropriete': '1.11-copropriete-hero',
  '/aides-primes/entreprises': '1.10-guide-entreprises-hero',
  '/aides-primes/flandre': '1.7-flandre-aides-hero',
  '/aides-primes/flandre/compteur-inverse': '1.8-fin-compteur-inverse-flandre-hero',
  '/aides-primes/flandre/demarches': '1.9-demarches-flandre-hero',
  '/aides-primes/wallonie': '1.1-wallonie-aides-hero',
  '/aides-primes/wallonie/demarches': '1.3-demarches-wallonie-hero',
  '/aides-primes/wallonie/prosumer': '1.2-tarif-prosumer-hero',
  '/comprendre/batterie': '4.4-batterie-domestique-hero',
  '/comprendre/borne-de-recharge': '4.6-borne-de-recharge-hero',
  '/comprendre/compteur-intelligent': '4.5-compteur-intelligent-hero',
  '/comprendre/fonctionnement': '4.1-fonctionnement-hero',
  '/comprendre/garanties': '4.8-garanties-hero',
  '/comprendre/impact-ecologique': '4.10-impact-ecologique-hero',
  '/comprendre/longevite': '4.7-longevite-hero',
  '/comprendre/maintenance': '4.9-maintenance-nettoyage-hero',
  '/comprendre/onduleur': '4.3-onduleur-hero',
  '/comprendre/risques-inconvenients': '4.11-risques-inconvenients-hero',
  '/comprendre/types-de-panneaux': '4.2-types-de-panneaux-hero',
  '/installation/abri-de-jardin': '2.11-abri-jardin-hero',
  '/installation/balcon': '2.14-balcon-hero',
  '/installation/bipv': '2.10-integre-toiture-bipv-hero',
  '/installation/camping-car': '2.15-camping-car-hero',
  '/installation/carport': '2.13-carport-hero',
  '/installation/dimensions': '2.4-dimensions-hero',
  '/installation/fixation': '2.7-fixation-hero',
  '/installation/nombre-de-panneaux': '2.2-nombre-panneaux-hero',
  '/installation/ombrage': '2.6-ombrage-hero',
  '/installation/poids': '2.5-poids-hero',
  '/installation/pompe-a-chaleur': '2.18-pompe-a-chaleur-hero',
  '/installation/puissance': '2.3-puissance-hero',
  '/installation/soi-meme': '2.17-installer-soi-meme-hero',
  '/installation/toit-plat': '2.9-toit-plat-hero',
  '/installation/trouver-un-installateur': '2.16-trouver-pro-hero',
  '/installation/voiture-electrique': '2.19-voiture-electrique-hero',
  /* ⚠️ `renta1` et non un nom en `-hero` : la page pilier « Rentabilité & prix »
     a été livrée avant la convention de nommage du cahier. Son frontmatter
     explique le choix de la photo (canopée sombre en haut de cadre, pour que la
     nav transparente reste lisible) — ne pas la remplacer sans le relire. */
  '/rentabilite-prix': 'renta1',
  '/rentabilite-prix/amortissement': '3.3-amortissement-roi-hero',
  '/rentabilite-prix/autoconsommation': '3.4-autoconsommation-revente-hero',
  '/rentabilite-prix/rendement': '3.2-rendement-production-hero',
};

/* `eager` : les modules au build, pas des promesses à l'exécution — les hubs
   sont statiques. Le glob prend TOUT `assets/pages` et non les seuls
   `*-hero.webp` : `renta1.webp` ne suit pas la convention (voir ci-dessus).
   `assets/team` s'y ajoute pour la seule page « À propos », dont la photo est
   rangée avec les visuels d'équipe et non avec les pages du sitemap. */
const files = import.meta.glob<{ default: ImageMetadata }>(
  ['../assets/pages/*.webp', '../assets/team/*.webp'],
  { eager: true },
);

/** `../assets/pages/4.1-fonctionnement-hero.webp` → `4.1-fonctionnement-hero`. */
const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, module]) => [
    path.replace(/^.*\//, '').replace(/\.webp$/, ''),
    module.default,
  ]),
);

/**
 * Le garde-fou, appelé au premier accès. Il fait ÉCHOUER LE BUILD plutôt que de
 * livrer une grille trouée — même parti pris que `assertNoDrift()` dans
 * `search-index.json.ts`, et pour la même raison : ces dérives ne se voient pas
 * à l'œil nu une fois le site en ligne.
 */
function assertHeroes(): void {
  const missing = Object.keys(PAGE_SOURCES).filter((href) => !(href in HERO_FILES));

  if (missing.length > 0) {
    throw new Error(
      `pageHeroes : ${missing.length} page(s) sans photo déclarée :\n` +
        missing.map((href) => `  ${href}`).join('\n') +
        `\n→ Ajouter chacune à HERO_FILES dans src/data/pageHeroes.ts.`,
    );
  }

  const unknown = Object.entries(HERO_FILES).filter(([, name]) => !byName.has(name));

  if (unknown.length > 0) {
    throw new Error(
      `pageHeroes : ${unknown.length} photo(s) déclarée(s) mais absente(s) du disque :\n` +
        unknown.map(([href, name]) => `  ${href} → src/assets/pages/${name}.webp`).join('\n') +
        `\n→ Corriger le nom, ou lancer « npm run images » après avoir déposé le fichier\n` +
        `  dans img/pages/.`,
    );
  }
}

assertHeroes();

/** La photo de hero d'une page du sitemap. */
export function heroImage(href: string): ImageMetadata | undefined {
  const name = HERO_FILES[href];
  return name ? byName.get(name) : undefined;
}
