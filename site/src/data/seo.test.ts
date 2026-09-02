import { describe, expect, it } from 'vitest';
import { NOINDEX_PATHS, allSeoPaths, assertSeoCoverage, breadcrumbFor, isNoindex, normalizePath, resolveSeo } from './seo';
import { PAGE_SOURCES } from './searchSources';

/**
 * La couche SEO est vérifiée au build par `assertSeoCoverage`, appelé depuis
 * `sitemap.xml.ts`. Ces tests font la même chose en une demi-seconde plutôt
 * qu'en une construction complète — on veut savoir qu'une page a perdu sa
 * description AVANT de lancer un déploiement.
 */

describe('normalizePath', () => {
  it('retire la barre finale que le build ajoute', () => {
    expect(normalizePath('/comprendre/onduleur/')).toBe('/comprendre/onduleur');
  });

  it('laisse la racine intacte — elle n’est QUE cette barre', () => {
    expect(normalizePath('/')).toBe('/');
  });
});

describe('couverture', () => {
  it('toute page de `PAGE_SOURCES` a ses métadonnées', () => {
    expect(() => assertSeoCoverage()).not.toThrow();
  });

  it('résout une page de contenu par son URL', () => {
    const seo = resolveSeo('/rentabilite-prix');
    expect(seo?.title).toContain('Belgreen');
    expect(seo?.description.length).toBeGreaterThan(109);
  });

  /* Le format n'est pas une préférence : au-delà de ces bornes, Google tronque
     — le mot de la fin est perdu, et c'est souvent celui qui porte le sens. */
  it('aucun titre ne dépasse 60 caractères, aucune description ne sort de 110–160', () => {
    const horsFormat = allSeoPaths()
      .map((path) => ({ path, seo: resolveSeo(path)! }))
      .filter(
        ({ seo }) =>
          seo.title.length > 60 || seo.description.length < 110 || seo.description.length > 160,
      )
      .map(({ path, seo }) => `${path} (titre ${seo.title.length}, desc ${seo.description.length})`);

    expect(horsFormat).toEqual([]);
  });
});

describe('indexabilité', () => {
  it('les pages outil sont hors index', () => {
    expect(isNoindex('/simulateur')).toBe(true);
    expect(isNoindex('/rapport/document/')).toBe(true);
  });

  it('une page de contenu est indexable', () => {
    expect(isNoindex('/comprendre/onduleur')).toBe(false);
  });

  /* Le sitemap dérive de la même source : si une page en `noindex` pouvait y
     entrer, la Search Console remonterait la contradiction en erreur. */
  it('aucune page en noindex n’est une page de contenu du sitemap', () => {
    const contenuBloque = Object.keys(PAGE_SOURCES).filter((path) => NOINDEX_PATHS.has(path));
    expect(contenuBloque).toEqual(['/realisations'].filter((p) => p in PAGE_SOURCES));
  });
});

describe('breadcrumbFor', () => {
  it('ne rend rien sur l’accueil — un fil d’Ariane à un maillon n’est pas un fil', () => {
    expect(breadcrumbFor('/')).toEqual([]);
  });

  it('nomme la page par son H1 réel, pas par son slug', () => {
    const crumbs = breadcrumbFor('/comprendre/onduleur');
    expect(crumbs[0]).toEqual({ name: 'Accueil', path: '/' });
    expect(crumbs.at(-1)?.path).toBe('/comprendre/onduleur');
    expect(crumbs.at(-1)?.name).not.toBe('onduleur');
  });
});
