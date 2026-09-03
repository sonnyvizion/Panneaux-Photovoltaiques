import type { Bridge, FaqItem, Fact, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.2 — « Types de panneaux » (`/comprendre/types-de-panneaux`).
 *
 * ⚠️ UNE SEULE PAGE COMPARATIVE pour les quatre technologies, là où le reste du
 * site scinde (une page par aide, une page par emplacement). C'est un choix
 * d'architecture assumé, confirmé à la commande : ces quatre technologies ne se
 * lisent que les unes CONTRE les autres — quatre pages séparées obligeraient à
 * faire quatre allers-retours pour un choix unique. `site.ts` a été modifié en
 * conséquence : les quatre entrées individuelles disparaissent de la nav au
 * profit de celle-ci.
 *
 * Module : `TopicCards` en quatre colonnes (famille F). Le composant existait,
 * seule la borne de `columns` a été élargie à 4.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * Le H1 énumère les quatre technologies ; le titre, lui, doit tenir en
 * 60 caractères et prend donc l'ombrelle réellement tapée, « types de panneaux
 * solaires », suivie de la question qui décide (« lequel choisir »).
 */
export const SEO: PageSeo = {
  title: 'Types de panneaux solaires : lequel choisir ? | Belgreen',
  description:
    'Monocristallin, polycristallin, bifacial, amorphe : comparez les quatre technologies et voyez laquelle tient sur une toiture belge, surface à l’appui.',
};

export const HERO = {
  badge: 'Comprendre',
  title: 'Monocristallin, polycristallin, bifacial, amorphe : quel type de panneau choisir ?',
  answer:
    'Le monocristallin domine le marché résidentiel belge grâce à son meilleur rendement par m², un critère important sur des toitures de taille limitée. Les autres technologies répondent à des besoins plus spécifiques.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Toiture en tuiles sombres portant des panneaux solaires noirs, sur fond de champs et de bocage",
} as const;

export const LEAD = {
  text: 'Quatre technologies, un seul choix qui compte vraiment pour la plupart des projets résidentiels : voici les différences essentielles, sans jargon inutile.',
  note: 'Les quatre technologies, côte à côte.',
} as const;

export const TYPES_COPY: SectionCopy = {
  overline: 'Le comparatif',
  title: 'Les 4 technologies, en un coup d’œil',
  intro: 'Ce qui les distingue vraiment, et pour quel usage.',
};

export const TYPES: TopicCard[] = [
  {
    title: 'Monocristallin',
    text: 'Meilleur rendement par m², le plus courant en résidentiel belge.',
    accent: true,
  },
  {
    title: 'Polycristallin',
    text: 'Rendement légèrement inférieur, souvent moins cher au m².',
  },
  {
    title: 'Bifacial',
    text: 'Capte la lumière des deux faces, utile en toiture surélevée ou au sol.',
  },
  {
    title: 'Amorphe',
    text: 'Souple et léger, rendement plus faible, usages spécifiques (mobile, façade).',
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui décide vraiment',
  intro: 'Sur une toiture belge, un seul critère tranche le plus souvent.',
};

export const FACTS: Fact[] = [
  {
    title: 'La surface est le facteur limitant',
    text: 'C’est ce qui explique la domination du monocristallin : plus de puissance sur moins de m².',
  },
  {
    title: 'Une installation homogène',
    text: 'Mélanger les technologies sur un même toit est possible, mais complique le suivi et l’entretien.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de m² avez-vous vraiment ?',
    text: 'C’est la surface disponible qui décide de la technologie, plus que l’inverse.',
    cta: { label: 'Voir les dimensions', href: '/installation/dimensions' },
  },
  {
    title: 'Et l’écart de prix, il pèse combien ?',
    text: 'Le monocristallin coûte plus cher au m² mais compense par la puissance à surface égale.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Comment choisir entre les 4 technologies.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Pourquoi le monocristallin est-il le plus utilisé ?',
    text: 'Son meilleur rendement par m² permet de produire plus sur une surface de toiture limitée, l’argument décisif pour la majorité des toits résidentiels belges, où la surface disponible est souvent le facteur limitant.',
    accent: true,
  },
  {
    title: 'Le polycristallin vaut-il le coup pour économiser ?',
    text: 'Sur une grande toiture sans contrainte de surface, oui : l’écart de rendement compte moins quand la place ne manque pas.',
  },
  {
    title: 'Le bifacial, dans quels cas ça a du sens ?',
    text: 'Surtout pour les installations au sol ou sur structures surélevées, où la face arrière peut capter la lumière réfléchie par le sol. C’est moins pertinent pour une toiture classique posée à plat sur la charpente.',
  },
  {
    title: 'L’amorphe a-t-il sa place en résidentiel ?',
    text: 'Rarement pour une installation principale : son rendement plus faible le réserve à des usages spécifiques (intégration architecturale, surfaces courbes, applications mobiles).',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Quelle est la différence de rendement entre mono et polycristallin ?',
    answer:
      'Le monocristallin atteint généralement des rendements plus élevés par m², un avantage surtout significatif sur petite surface.',
    open: true,
  },
  {
    question: 'Le prix varie-t-il beaucoup selon la technologie ?',
    answer:
      'Oui, le monocristallin coûte généralement plus cher au m² mais compense souvent par une puissance supérieure à surface égale.',
  },
  {
    question: 'Peut-on mélanger plusieurs technologies sur un même toit ?',
    answer:
      'Techniquement possible mais rarement recommandé : mieux vaut une installation homogène pour simplifier le suivi et l’entretien.',
  },
  {
    question: 'Quel type choisir pour une petite toiture ?',
    answer:
      'Le monocristallin, sans hésiter. C’est la technologie qui produit le plus de watts par mètre carré : quand la surface est le facteur limitant, chaque mètre carré doit rendre le maximum. Le polycristallin ne se défend que sur des grandes surfaces où le prix au panneau prime sur la densité.',
  },
  {
    question: 'Le panneau amorphe a-t-il un intérêt en résidentiel ?',
    answer:
      'Rarement. Sa production au mètre carré est nettement inférieure à celle du cristallin, ce qui lui demande beaucoup plus de surface pour la même puissance. Il garde un intérêt sur des supports souples ou de très grandes surfaces sans contrainte d’encombrement, pas sur une toiture de maison.',
  },
];

export const FINAL_CTA = {
  title: 'Le bon type dépend surtout de votre surface disponible',
  text: "On relève la toiture, on propose la technologie adaptée. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
