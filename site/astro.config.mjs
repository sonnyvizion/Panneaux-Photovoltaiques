// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Le domaine du site.
 *
 * ⚠️ SANS LUI, RIEN DE CANONIQUE N'EST POSSIBLE. `Astro.site` est ce qui permet
 * de fabriquer une URL absolue — donc le `<link rel="canonical">`, l'`og:url` et
 * le sitemap. Tant qu'il était absent, ces trois-là ne pouvaient pas exister.
 *
 * Même logique d'environnement que `PUBLIC_INDEXABLE` dans `robots.txt.ts` : la
 * valeur de repli est la démo, la prod pose la vraie. Le domaine définitif du
 * client reste à fournir (CLAUDE.md « À compléter »).
 */
const site = process.env.PUBLIC_SITE_URL ?? 'https://belgreen-demo.pages.dev';

// https://astro.build/config
export default defineConfig({ site });
