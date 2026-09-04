import type { APIRoute } from 'astro';
import { NOINDEX_PATHS, allSeoPaths, assertNavTargets, assertSeoCoverage } from '../data/seo';
import { LEGAL_LINKS, LOCALES, UTILITY_LINKS } from '../data/site';

/**
 * Le sitemap, dérivé du registre des métadonnées.
 *
 * ⚠️ POURQUOI PAS `@astrojs/sitemap`. L'intégration officielle liste les routes
 * générées puis demande un `filter` — donc une SECONDE liste de ce qui est en
 * `noindex`, à tenir à jour à côté de celle de `data/seo.ts`. Or un sitemap qui
 * déclare une page interdite d'indexation est une contradiction que la Search
 * Console remonte en erreur. En dérivant de `allSeoPaths()` moins
 * `NOINDEX_PATHS`, la contradiction devient **impossible à écrire** plutôt que
 * seulement interdite — même parti pris que le reste du projet (`pillarIndex`
 * dérive ses libellés du H1 de la cible, il ne les recopie pas).
 *
 * Effet de bord voulu : les pages fabriquées par `[...slug].astro`
 * (« Page en cours de rédaction ») n'ont pas de métadonnées, donc n'entrent
 * jamais ici. Une page vide indexée coûte plus cher qu'une page absente.
 *
 * Ni `lastmod`, ni `changefreq`, ni `priority` : le dépôt n'a pas de date de
 * publication fiable par page, et Google ignore les deux autres depuis
 * longtemps. Un sitemap qui ment sur ses dates vaut moins qu'un sitemap muet.
 */
export const GET: APIRoute = ({ site }) => {
  /* Le garde-fou vit ici, comme `assertNoDrift` vit dans `search-index.json.ts` :
     c'est l'endpoint qui inventorie le site, donc celui qui constate les trous. */
  assertSeoCoverage();
  /* Les trois listes transverses du pied de page et de l'en-tête. Les piliers,
     eux, sont déjà filtrés par `publishedGroups` à leur rendu. */
  assertNavTargets([...UTILITY_LINKS, ...LEGAL_LINKS, ...LOCALES]);

  if (!site) {
    throw new Error(
      'Le sitemap a besoin de `site` dans `astro.config.mjs` pour écrire des URL absolues. ' +
        'Poser `PUBLIC_SITE_URL`, ou vérifier la valeur de repli du fichier de config.',
    );
  }

  const urls = allSeoPaths()
    .filter((path) => !NOINDEX_PATHS.has(path))
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
