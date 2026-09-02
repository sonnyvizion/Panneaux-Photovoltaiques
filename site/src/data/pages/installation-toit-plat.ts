import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.9 — « Toit plat » (`/installation/toit-plat`).
 *
 * Module : `FigureModule` (famille E). ⚠️ La coupe latérale demandée par le
 * cahier n'est pas livrée (`2.9-toit-plat-module.jpg`) — la photo du hero sert
 * de fond, la légende porte l'explication.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 */
export const SEO: PageSeo = {
  title: 'Panneaux solaires sur toit plat : le guide | Belgreen',
  description:
    'Sur un toit plat, les panneaux reposent sur des châssis inclinés lestés de blocs de béton, sans percer l’étanchéité. Structure, espacement et densité réelle.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Panneaux solaires sur toit plat : comment ça marche ?',
  answer:
    'Sur un toit plat, les panneaux sont posés sur une structure inclinée (généralement 10-15°) lestée par des blocs de béton, sans perçage de l’étanchéité.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toiture plate équipée de rangées de panneaux solaires sur structures inclinées',
} as const;

export const LEAD = {
  text: 'Pas de pente naturelle ne veut pas dire pas d’inclinaison — juste une structure en plus pour la recréer artificiellement.',
  note: 'La structure et l’espacement, en coupe.',
} as const;

export const MODULE = {
  title: 'Une pente recréée, sans toucher à l’étanchéité',
  caption:
    'Les panneaux reposent sur des châssis inclinés à 10-15°, maintenus par des blocs de béton posés sur la membrane. Rien n’est percé. Entre deux rangées, un espace est laissé libre pour que la première ne fasse pas d’ombre à la suivante, surtout en hiver quand le soleil est bas — une contrainte propre au toit plat qui réduit légèrement la densité de panneaux par rapport à un toit incliné bien orienté.',
  bridgeLabel: 'Ce que votre toit plat peut accueillir',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui change du toit incliné',
  intro: 'Ce qui différencie le toit plat du toit incliné.',
};

export const FIGURES: Figure[] = [
  { label: 'Structure inclinée', value: '10-15°', note: 'la pente est recréée par le châssis', tone: 'lime' },
  { label: 'Lestage', value: 'Sans perçage', note: 'blocs de béton, étanchéité intacte', tone: 'grey' },
  { label: 'Espacement', value: 'Obligatoire', note: 'entre rangées, contre les ombres portées', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Densité plus faible',
    text: 'L’espacement entre rangées réduit le nombre de panneaux par m² par rapport à un toit incliné bien orienté.',
  },
  {
    title: 'Entretien facile',
    text: 'Un accès de toit plat classique suffit, sans équipement particulier.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de m² faut-il par panneau ?',
    text: 'Sur toit plat, il faut compter l’espacement en plus de la surface des panneaux eux-mêmes.',
    cta: { label: 'Voir les dimensions', href: '/installation/dimensions' },
  },
  {
    title: 'Le lestage, ça pèse combien ?',
    text: 'Plus qu’une fixation sur toit incliné, mais dans les capacités standards des toits plats résidentiels.',
    cta: { label: 'Voir le poids', href: '/installation/poids' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions spécifiques au toit plat.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Le lestage abîme-t-il l’étanchéité du toit ?',
    text: 'Non, c’est justement l’intérêt du lestage — aucun perçage, la membrane d’étanchéité reste intacte.',
    accent: true,
  },
  {
    title: 'Peut-on installer plus de panneaux sur un toit plat qu’incliné ?',
    text: 'Pas nécessairement — l’espacement obligatoire entre rangées pour éviter les ombres portées réduit la densité effective par rapport à un toit incliné bien orienté.',
  },
  {
    title: 'Faut-il un accès spécifique pour l’entretien ?',
    text: 'Un accès de toit plat classique suffit généralement, sans équipement particulier.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Le lestage abîme-t-il l’étanchéité du toit ?',
    answer: 'Non, c’est tout l’intérêt du lestage : aucun perçage, la membrane reste intacte.',
    open: true,
  },
  {
    question: 'Peut-on installer plus de panneaux sur un toit plat qu’incliné ?',
    answer:
      'Pas nécessairement : l’espacement obligatoire entre rangées réduit la densité par rapport à un toit incliné bien orienté.',
  },
  {
    question: 'Faut-il un accès spécifique pour l’entretien ?',
    answer: 'Un accès de toit plat classique suffit généralement.',
  },
];

export const FINAL_CTA = {
  title: 'Voyez ce que votre toit plat peut produire',
  text: "Structure, lestage, espacement : on chiffre le tout. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
