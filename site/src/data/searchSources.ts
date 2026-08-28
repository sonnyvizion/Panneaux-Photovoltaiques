import type { SearchEntry } from '../scripts/search';

/**
 * Ce qui alimente la recherche interne — et ce qui en est tenu à l'écart.
 *
 * ⚠️ POURQUOI UN REGISTRE EXPLICITE. Le nom d'un fichier de données ne donne pas
 * son URL : `rentabilite-rendement-production.ts` sert `/rentabilite-prix/rendement`,
 * `aides-primes-flandre-compteur-inverse.ts` sert `/aides-primes/flandre/compteur-inverse`.
 * Aucune règle ne dérive l'un de l'autre sans se tromper. La jointure est donc
 * écrite, une fois, ici — et `search-index.json.ts` fait ÉCHOUER LE BUILD si elle
 * se désynchronise du sitemap (même parti pris que `REAL_PAGES` dans
 * `[...slug].astro` : un oubli doit casser bruyamment, jamais disparaître en
 * silence).
 *
 * ⚠️ À la bascule Sanity, ce fichier disparaît : le slug viendra du document.
 * C'est la seule pièce de la recherche qui soit jetable — le classement
 * (`scripts/search.ts`) et l'overlay ne bougeront pas.
 */

/**
 * `href` → fichier de `data/pages/`. Les 42, sans exception.
 *
 * Toutes n'iront pas dans l'index : `search-index.json.ts` filtre ensuite sur
 * `isListed()` de `site.ts`, ce qui écarte `/aides-primes/entreprises` tant que
 * son volet fiscal n'est pas validé. La table, elle, reste COMPLÈTE : c'est ce
 * qui permet au garde-fou de repérer un fichier de données orphelin.
 */
export const PAGE_SOURCES: Readonly<Record<string, string>> = {
  '/aides-primes/bruxelles/demarches': 'aides-primes-bruxelles-demarches',
  '/aides-primes/bruxelles/reglementation': 'aides-primes-bruxelles-reglementation',
  '/aides-primes/bruxelles': 'aides-primes-bruxelles',
  '/aides-primes/copropriete': 'aides-primes-copropriete',
  '/aides-primes/entreprises': 'aides-primes-entreprises',
  '/aides-primes/flandre/compteur-inverse': 'aides-primes-flandre-compteur-inverse',
  '/aides-primes/flandre/demarches': 'aides-primes-flandre-demarches',
  '/aides-primes/flandre': 'aides-primes-flandre',
  '/aides-primes/wallonie/demarches': 'aides-primes-wallonie-demarches',
  '/aides-primes/wallonie/prosumer': 'aides-primes-wallonie-prosumer',
  '/aides-primes/wallonie': 'aides-primes-wallonie',
  '/comprendre/batterie': 'comprendre-batterie',
  '/comprendre/borne-de-recharge': 'comprendre-borne-de-recharge',
  '/comprendre/compteur-intelligent': 'comprendre-compteur-intelligent',
  '/comprendre/fonctionnement': 'comprendre-fonctionnement',
  '/comprendre/garanties': 'comprendre-garanties',
  '/comprendre/impact-ecologique': 'comprendre-impact-ecologique',
  '/comprendre/longevite': 'comprendre-longevite',
  '/comprendre/maintenance': 'comprendre-maintenance',
  '/comprendre/onduleur': 'comprendre-onduleur',
  '/comprendre/risques-inconvenients': 'comprendre-risques-inconvenients',
  '/comprendre/types-de-panneaux': 'comprendre-types-de-panneaux',
  '/installation/abri-de-jardin': 'installation-abri-de-jardin',
  '/installation/balcon': 'installation-balcon',
  '/installation/bipv': 'installation-bipv',
  '/installation/camping-car': 'installation-camping-car',
  '/installation/carport': 'installation-carport',
  '/installation/dimensions': 'installation-dimensions',
  '/installation/fixation': 'installation-fixation',
  '/installation/nombre-de-panneaux': 'installation-nombre-de-panneaux',
  '/installation/ombrage': 'installation-ombrage',
  '/installation/poids': 'installation-poids',
  '/installation/pompe-a-chaleur': 'installation-pompe-a-chaleur',
  '/installation/puissance': 'installation-puissance',
  '/installation/soi-meme': 'installation-soi-meme',
  '/installation/toit-plat': 'installation-toit-plat',
  '/installation/trouver-un-installateur': 'installation-trouver-un-installateur',
  '/installation/voiture-electrique': 'installation-voiture-electrique',
  '/rentabilite-prix/amortissement': 'rentabilite-amortissement',
  '/rentabilite-prix/autoconsommation': 'rentabilite-autoconsommation',
  '/rentabilite-prix': 'rentabilite-prix',
  '/rentabilite-prix/rendement': 'rentabilite-rendement-production',
};

/**
 * Pages sans fichier de données, décrites à la main.
 *
 * ⚠️ `/simulateur` est en `noindex` et EST POURTANT indexé ici. Les deux
 * notions ne se recouvrent pas : `noindex` dit « aucune valeur dans les
 * résultats Google » — vrai d'une page outil — alors que la recherche interne
 * indexe ce qui RÉPOND à un visiteur déjà sur le site. Le simulateur est la
 * réponse la plus utile du site (règle d'or #3) ; l'omettre serait absurde.
 */
export const MANUAL_ENTRIES: readonly SearchEntry[] = [
  {
    href: '/',
    label: 'Accueil',
    pillar: 'Le site',
    title: 'Les panneaux solaires sont-ils rentables pour votre maison ?',
    answer:
      'Production, coût, économies, primes de votre région : votre estimation sur mesure, sans laisser vos coordonnées.',
    strong: [
      'Le photovoltaïque est-il vraiment rentable pour ma maison ?',
      'Revendez-vous mes données à des installateurs partenaires ?',
      'Quelles aides puis-je obtenir dans ma région ?',
      'Le simulateur est-il vraiment gratuit et sans engagement ?',
    ],
    weak: ['Vous parlez directement à l’équipe qui installera vos panneaux.'],
    context: 'accueil home site belgreen',
  },
  {
    href: '/simulateur',
    label: 'Mon estimation',
    pillar: 'Le site',
    title: 'Votre estimation en quelques questions',
    answer:
      'Production, coût, économies et primes de votre région, estimés en quelques questions — sans laisser vos coordonnées.',
    strong: ['Combien ça coûte ?', 'Combien je gagne ?', 'En combien de temps c’est amorti ?'],
    weak: ['simulateur', 'simulation', 'devis', 'estimation gratuite', 'calcul'],
    context: 'simulateur estimation',
  },
];

/**
 * Destinations volontairement ABSENTES de l'index, et pourquoi.
 *
 * La règle tient en une phrase : **on n'indexe que ce qui répond.** Ces pages
 * sont liées depuis la navigation, donc le garde-fou les verrait manquer — d'où
 * cette liste, qui est une décision et non un oubli. Toutes portent aujourd'hui
 * « Page en cours de rédaction » : les faire remonter dans la recherche
 * enverrait le visiteur sur du vide, ce qui est pire que ne rien trouver (il
 * garde au moins l'état vide, qui propose le simulateur et le téléphone).
 *
 * ⚠️ À VIDER AU FUR ET À MESURE DE LA RÉDACTION. Le jour où l'une de ces pages
 * reçoit son texte, retirer sa ligne suffit à la faire entrer dans la recherche.
 */
export const NOT_INDEXED: Readonly<Record<string, string>> = {
  '/comprendre': 'Vue d’ensemble du pilier — gabarit attrape-tout, pas encore rédigée.',
  '/aides-primes': 'Vue d’ensemble du pilier — gabarit attrape-tout, pas encore rédigée.',
  '/installation': 'Vue d’ensemble du pilier — gabarit attrape-tout, pas encore rédigée.',
  '/a-propos': 'Placeholder de Phase 1, en noindex — « Page en cours de rédaction ».',
  '/realisations': 'Placeholder de Phase 1, en noindex — « Page en cours de rédaction ».',
  '/contact': 'Placeholder de Phase 1, en noindex — « Page en cours de rédaction ».',
};

/**
 * Sujets proposés avant la première frappe.
 *
 * Un champ vide qui ne propose rien renvoie le visiteur à sa question de départ
 * — or c'est précisément parce qu'il ne sait pas quoi chercher qu'il a ouvert la
 * recherche. Ces huit entrées sont les portes les plus demandées du sitemap ;
 * elles tiennent lieu de plan du site en raccourci.
 */
export const POPULAR: readonly { label: string; href: string }[] = [
  { label: 'Prix d’une installation', href: '/rentabilite-prix' },
  { label: 'Primes en Wallonie', href: '/aides-primes/wallonie' },
  { label: 'Certificats verts à Bruxelles', href: '/aides-primes/bruxelles' },
  { label: 'Prime en Flandre', href: '/aides-primes/flandre' },
  { label: 'Combien de panneaux ?', href: '/installation/nombre-de-panneaux' },
  { label: 'Batterie domestique', href: '/comprendre/batterie' },
  { label: 'Amortissement', href: '/rentabilite-prix/amortissement' },
  { label: 'Trouver un installateur', href: '/installation/trouver-un-installateur' },
];
