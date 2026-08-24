import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Écrit `dist/_headers` — le fichier d'en-têtes que Cloudflare Pages lit au
 * déploiement.
 *
 * ⚠️ POURQUOI UN SCRIPT ET PAS UN FICHIER DANS `public/`. Son contenu dépend de
 * la destination : la démo doit refuser l'indexation, la production doit
 * l'accepter. Un fichier statique ne sait pas faire la différence, et celui de
 * la démo finirait en production.
 *
 * ⚠️ POURQUOI EN PLUS DE `robots.txt`. Les deux ne font pas le même travail :
 * `robots.txt` demande de ne pas EXPLORER, `X-Robots-Tag` interdit d'INDEXER.
 * Une URL de démo partagée par e-mail ou trouvée dans un lien peut atterrir
 * dans les résultats malgré un `Disallow` — l'en-tête, lui, ferme la porte.
 *
 * ⚠️ MÊME DÉFAUT QUE `robots.txt` : on bloque, sauf demande explicite.
 */

const INDEXABLE = process.env.PUBLIC_INDEXABLE === 'true';

/* Les polices sont auto-hébergées et versionnées par leur nom de fichier : un
   an de cache est sans risque et évite de les retélécharger à chaque visite. */
const CACHE = `/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;

const NOINDEX = `# ⚠️ DÉMO — indexation interdite.
# Pour la production : PUBLIC_INDEXABLE=true npm run build
/*
  X-Robots-Tag: noindex, nofollow

`;

const headers = (INDEXABLE ? '' : NOINDEX) + CACHE;
const target = join(process.cwd(), 'dist', '_headers');

await writeFile(target, headers, 'utf8');
console.log(
  INDEXABLE
    ? '_headers écrit — indexation AUTORISÉE (production).'
    : '_headers écrit — indexation INTERDITE (démo). PUBLIC_INDEXABLE=true pour la production.',
);
