import type { APIRoute } from 'astro';

/**
 * `robots.txt`, GÉNÉRÉ — jamais écrit à la main dans `public/`.
 *
 * ⚠️ POURQUOI IL N'EST PAS UN FICHIER STATIQUE. Le site part d'abord en démo
 * chez le client, sur une adresse jetable. Cette démo ne doit surtout pas être
 * indexée : les ~55 pages de contenu ne portent pas de `noindex` (seules les
 * pages outil le font), et Google les prendrait pour du contenu dupliqué le
 * jour où le vrai domaine ouvre. Un `robots.txt` bloquant posé en dur dans
 * `public/` réglerait la démo — et partirait un jour en production sans que
 * personne ne le remarque. Le SEO alimente tout le funnel : ce serait la panne
 * la plus coûteuse du projet.
 *
 * ⚠️ LE DÉFAUT EST DE BLOQUER. Il faut demander explicitement l'indexation,
 * elle ne s'obtient pas par oubli :
 *
 *     PUBLIC_INDEXABLE=true npm run build
 *
 * Les deux erreurs possibles ne se valent pas. Une production non indexée se
 * voit en quelques jours — le client demande où il est sur Google — et se
 * corrige en un déploiement. Une démo indexée, elle, met des semaines à
 * disparaître et pollue le lancement du vrai domaine.
 *
 * ⚠️ `robots.txt` interdit le CRAWL, pas l'indexation : une URL découverte
 * ailleurs peut encore apparaître dans les résultats. La vraie protection de la
 * démo est Cloudflare Access, qui la met derrière une authentification — aucun
 * robot ne passe. Ceci est la ceinture, Access est les bretelles.
 */

const INDEXABLE = import.meta.env.PUBLIC_INDEXABLE === 'true';

const BLOCKED = `# Démo — indexation refusée.
# Pour autoriser : PUBLIC_INDEXABLE=true npm run build
User-agent: *
Disallow: /
`;

const ALLOWED = `User-agent: *
Allow: /

# Pages outil : aucune valeur en recherche, et le rapport porte les réponses
# d'un visiteur dans son URL.
Disallow: /rapport
Disallow: /devis
Disallow: /etude
Disallow: /design-system

# Index de la recherche INTERNE. Ce n'est pas une page : il n'a rien à faire
# dans des résultats Google, où il paraîtrait comme un fichier de texte brut
# reprenant le contenu du site.
Disallow: /search-index.json
`;

export const GET: APIRoute = () =>
  new Response(INDEXABLE ? ALLOWED : BLOCKED, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
