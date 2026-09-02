import type {
  Bridge,
  DeepDiveItem,
  FaqItem,
  Fact,
  Figure,
  SectionCopy,
} from '../content';
import type { PageSeo } from '../seo';
import { POWER_DEFAULT, POWER_MAX, POWER_MIN, estimate, formatEuro } from '../../scripts/powerEstimate';

/**
 * Contenu de la page pilier « Rentabilité & prix » (`/rentabilite-prix`).
 *
 * Provisoire, comme `site.ts` et `faq-home.ts` : ce fichier a vocation à venir
 * de Sanity. Sa forme suit déjà le page builder décrit dans `pages-contenu.md`
 * (`keyAnswer`, `module`, `accordion`, `faq`, `simulatorBridge`), pour que la
 * bascule ne change que la source des données.
 *
 * ⚠️ TOUS LES PRIX SORTENT DE `powerEstimate.ts`, jamais écrits à la main.
 * La maquette Figma se contredit d'un bloc à l'autre (voir l'en-tête de ce
 * module) ; les dériver garantit qu'une correction du modèle se propage à la
 * page entière au lieu de laisser trois chiffres divergents derrière elle.
 *
 * ⚠️ Ces montants sont des ordres de grandeur À VALIDER PAR LE CLIENT
 * (CLAUDE.md § « À compléter »).
 */

const low = estimate(POWER_MIN);
const mid = estimate(POWER_DEFAULT);
const high = estimate(POWER_MAX);

/**
 * Ce que Google lit en tête de page — voir `data/seo.ts` pour les contraintes,
 * que le build vérifie.
 *
 * Le mot-clé principal (« prix panneaux solaires Belgique ») ouvre le titre :
 * c'est la requête la plus disputée du sujet, et le suffixe de marque n'y sert
 * qu'à occuper la place que Google lui donnerait de toute façon.
 */
export const SEO: PageSeo = {
  title: 'Prix des panneaux solaires en Belgique 2026 | Belgreen',
  description: `Une installation photovoltaïque coûte entre ${formatEuro(low.price)} et ${formatEuro(high.price)} TVAC en Belgique. Prix par kWc, TVA à 6 % et rentabilité réelle, région par région.`,
};

export const HERO = {
  badge: 'Rentabilité & Prix',
  title: 'Prix des panneaux solaires en 2026 : combien coûte une installation en Belgique ?',
  answer: `Entre ${formatEuro(low.price)} et ${formatEuro(high.price)} TVAC selon la puissance installée. Pour une installation standard de ${POWER_DEFAULT} kWc, comptez ${formatEuro(mid.price)}, pose et raccordement compris.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Vue aérienne d’une maison contemporaine à bardage sombre, dont toute la toiture est couverte de panneaux solaires, au milieu des bois',
} as const;

export const LEAD = {
  text: "Le prix dépend surtout de trois facteurs : la puissance installée (en kWc), le type de panneau, et si votre toiture nécessite des travaux de renfort. Sur un même toit, doubler la puissance ne double pas le prix — une partie du chantier ne dépend pas du nombre de panneaux.",
  note: 'Testez ci-dessous comment le prix évolue selon la puissance.',
} as const;

export const WIDGET = {
  title: 'Puissance installée',
  sliderLabel: 'Puissance installée, en kilowatts-crête',
  /* Les LIBELLÉS des tuiles seulement : les valeurs viennent du modèle
     `power`, jamais d'ici. Le prix porte l'accent — c'est ce que la page
     promet de montrer, pas la production. */
  outputs: [
    { label: 'Prix estimé', accent: true },
    { label: 'Panneaux' },
    { label: 'Production/an' },
  ],
  /* U+202F (fine insécable), le même caractère que celui écrit par le modèle :
     une espace ordinaire d'un côté et fine de l'autre décalerait la valeur au
     premier déplacement du curseur. */
  bounds: [
    `${POWER_MIN}\u202FkWc · ~${formatEuro(low.price)}`,
    `${POWER_MAX}\u202FkWc · ~${formatEuro(high.price)}`,
  ] as [string, string],
  bridgeLabel: 'Voir ce que ça change sur votre facture',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  /* La bande du widget reprend la photo du hero, recadrée : un seul fichier, un
     seul téléchargement, et une continuité visuelle entre le haut de page et le
     module. Son alternative est vide — l'image y est purement décorative, le
     panneau de verre porte toute l'information. */
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "L'essentiel",
  intro: 'Les fourchettes de prix selon la puissance installée, ce qui est inclus, et les conditions de TVA.',
};

/* La carte d'accent désigne le cas COURANT, pas le moins cher : c'est celui
   auquel le visiteur doit se comparer en premier. */
export const FIGURES: Figure[] = [
  { label: `${POWER_MIN} kWc`, prefix: 'à partir de', value: formatEuro(low.price), tone: 'grey' },
  { label: `${POWER_DEFAULT} kWc`, prefix: 'à partir de', value: formatEuro(mid.price), tone: 'lime' },
  { label: `${POWER_MAX} kWc`, prefix: 'à partir de', value: formatEuro(high.price), tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Ce qui est inclus',
    text: 'Panneaux, onduleur, pose et raccordement au réseau.',
  },
  {
    title: 'TVA',
    text: '6 % si votre logement a plus de 10 ans, 21 % sinon.',
  },
];

/* Ce que « L'essentiel » ne dit PAS, et où le lire. Nommer l'angle mort vaut
   mieux qu'un CTA générique (`pages-contenu.md`). */
export const BRIDGES: Bridge[] = [
  {
    title: 'Ce prix ne tient pas compte des aides régionales.',
    text: 'Primes, certificats verts ou tarif prosumer : ce que vous payez réellement dépend de votre région.',
    cta: { label: 'Voir les aides de ma région', href: '/aides-primes' },
  },
  {
    title: "Sur combien d'années ce prix se rembourse-t-il ?",
    /* ⚠️ Annonçait « entre 7 et 12 ans » — dernier résidu de la moyenne retirée
       le 2026-08-18. Elle reposait sur la compensation du surplus wallon,
       supprimée en 2024, et ne décrivait aucune région réelle. La page 3.3 que
       ce pont vise calcule des délais allant du simple au « jamais amorti »
       selon la région ET le taux d'autoconsommation : promettre un chiffre ici
       ferait mentir la page d'arrivée. */
    text: 'Cela dépend beaucoup moins du prix que de votre région et de la part que vous consommez vous-même — les écarts vont du simple au « jamais amorti ».',
    cta: { label: 'Voir le calcul de rentabilité', href: '/rentabilite-prix/amortissement' },
  },
];

/**
 * L'inventaire du pilier, en bas de page.
 *
 * ⚠️ Cette page est À LA FOIS la porte du pilier « Rentabilité & prix » et une
 * page de contenu sur le prix — c'est la seule du sitemap dans ce cas, et c'est
 * pourquoi elle n'a pas de « vue d'ensemble » séparée comme les trois autres
 * piliers. Elle en remplit donc le rôle ici : après avoir répondu sur le prix,
 * elle ouvre les trois pages qui répondent sur le rendement, l'amortissement et
 * l'autoconsommation. Les cartes sont dérivées de `site.ts` — voir
 * `data/pillarIndex.ts`.
 */
export const INDEX_COPY: SectionCopy = {
  overline: 'Le pilier en entier',
  title: 'Ce que le prix ne dit pas',
  intro: 'Le prix n’est qu’une moitié de la rentabilité : voici l’autre.',
};

export const DEEP_DIVE_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions plus techniques, pour qui veut comprendre les détails avant de se décider.',
};

export const DEEP_DIVE_IMAGE_ALT =
  'La même maison vue de plus loin, sa toiture photovoltaïque se détachant sur la forêt et le ciel dégagé';

export const DEEP_DIVE: DeepDiveItem[] = [
  {
    title: 'Pourquoi le prix baisse avec la taille',
    text: "Une partie du chantier ne dépend pas du nombre de panneaux : le déplacement, l'échafaudage, l'onduleur, le raccordement et les démarches administratives coûtent presque autant pour 3 kWc que pour 10. Répartis sur une puissance plus grande, ils font mécaniquement baisser le prix au watt-crête.",
  },
  {
    title: 'Mono vs polycristallin',
    text: 'Le monocristallin coûte plus cher au Wc mais produit davantage par m² — il est plus intéressant sur les petites toitures, où la surface est la contrainte. Sur un grand toit dégagé, le polycristallin reste défendable.',
    open: true,
  },
  {
    title: 'Coût réel avec une batterie',
    text: "Une batterie domestique ajoute typiquement plusieurs milliers d'euros à l'installation et ne se rentabilise pas partout : son intérêt dépend de votre région et de la part de production que vous consommez sur place. Elle relève d'un calcul distinct de celui des panneaux.",
  },
  {
    title: 'TVA 6 % : qui y a droit',
    text: "Le taux réduit de 6 % s'applique aux logements privés de plus de 10 ans, occupés à titre principal. En dessous de cet âge, ou pour un bâtiment neuf, c'est 21 %. Sur une installation de plusieurs milliers d'euros, l'écart entre les deux taux est loin d'être marginal.",
  },
  {
    title: 'Évolution des prix depuis 2018 et tendance 2026-2027',
    text: "Le prix au watt-crête a fortement baissé depuis 2018, porté par le coût des modules. Cette baisse s'est nettement ralentie : le prix d'une installation est désormais dominé par la pose et le matériel annexe, qui ne suivent pas la même courbe. Attendre encore coûte surtout des années de production perdues.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Le prix inclut-il la pose et le raccordement ?',
    answer:
      'Oui. Les montants annoncés sur cette page sont des prix posés, TVA comprise : panneaux, onduleur, structure de fixation, main-d’œuvre et raccordement au réseau. Les éventuels travaux de renfort de toiture, eux, se chiffrent à part après visite.',
  },
  {
    question: 'Pourquoi deux devis pour la même puissance ont des prix différents ?',
    answer:
      "Deux installateurs peuvent proposer des panneaux ou des onduleurs de qualité différente, et inclure ou non certains travaux annexes. Comparez toujours des devis à puissance, marque et garanties équivalentes — c'est la seule comparaison qui a un sens.",
    open: true,
  },
  {
    question: 'Le prix est-il le même dans toute la Belgique ?',
    answer:
      "Le prix de l'installation varie peu d'une région à l'autre. Ce qui change fortement, en revanche, c'est ce que vous payez au bout du compte : les primes, les certificats verts et le tarif prosumer diffèrent entre la Wallonie, Bruxelles et la Flandre.",
  },
  {
    question: 'Faut-il attendre que les prix baissent encore ?',
    answer:
      "La baisse des prix s'est nettement ralentie, et chaque année d'attente est une année de production non produite. Sur une installation qui dure 25 à 30 ans, l'économie espérée en attendant est presque toujours inférieure à ce que la même année aurait rapporté.",
  },
];

export const FINAL_CTA = {
  title: 'Voyez ce que ça change sur votre facture',
  text: "Vous parlez directement à l'équipe qui installe. Pas d'intermédiaire. Pas de revente de données.",
  cta: { label: 'Calculer mes économies', href: '/simulateur' },
} as const;
