import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Page 2.13 — « Carport » (`/installation/carport`).
 *
 * Module : `FigureModule` (famille E). Le cahier demande ici « illustration ou
 * photo simple » — la photo du hero convient telle quelle, c'est le seul module
 * de ce pilier dont l'image livrée correspond vraiment à ce qui est décrit.
 */

export const HERO = {
  badge: 'Installation',
  title: 'Le carport solaire : abri et production combinés',
  answer:
    'Un carport solaire combine abri pour véhicule et production d’électricité — une solution idéale pour qui veut aussi recharger une voiture électrique directement sous ses panneaux.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Carport dont la toiture est entièrement composée de panneaux solaires, une voiture stationnée dessous',
} as const;

export const LEAD = {
  text: 'Deux besoins réglés d’un coup — abriter la voiture, produire de l’électricité — avec un vrai bonus si cette électricité sert justement à la recharger.',
  note: 'Le principe, en une image.',
} as const;

export const MODULE = {
  title: 'Une structure qui produit',
  caption:
    'Le carport ne dépend d’aucune toiture existante : c’est une construction à part entière, donc libre de son orientation et de son inclinaison. C’est aussi ce qui explique son coût — la structure porteuse s’ajoute au prix des panneaux.',
  bridgeLabel: 'Chiffrez votre carport',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui rend le carport particulier',
  intro: 'Ce qui rend le carport solaire particulier.',
};

export const FIGURES: Figure[] = [
  { label: 'Double fonction', value: 'Abri + kWh', note: 'un seul ouvrage, deux usages', tone: 'lime' },
  { label: 'Synergie', value: 'Recharge', note: 'idéal avec une borne pour véhicule électrique', tone: 'grey' },
  { label: 'Structure', value: 'Autonome', note: 'aucune contrainte de toiture existante', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Un permis, généralement',
    text: 'Un carport est une construction nouvelle, pas un ajout sur l’existant — à vérifier auprès de votre commune.',
  },
  {
    title: 'Orientation libre',
    text: 'Sans toiture imposée, la structure peut être orientée au mieux dès la conception.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Vous avez une voiture électrique ?',
    text: 'C’est le cas d’usage le plus cohérent : produire là où l’on recharge.',
    cta: { label: 'Voir la recharge solaire', href: '/installation/voiture-electrique' },
  },
  {
    title: 'Combien coûte une installation classique ?',
    text: 'Le carport se compare toujours à une pose en toiture — voilà la base.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions avant de se lancer dans un carport solaire.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Un carport coûte-t-il plus cher qu’une installation en toiture ?',
    text: 'Oui généralement, car il faut construire la structure porteuse en plus des panneaux eux-mêmes.',
    accent: true,
  },
  {
    title: 'Peut-on combiner carport solaire et borne de recharge ?',
    text: 'Oui, c’est même l’un des cas d’usage les plus cohérents — voir la page dédiée « Voiture électrique ».',
  },
  {
    title: 'Faut-il un permis pour construire un carport avec panneaux ?',
    text: 'Généralement oui, un carport étant une construction nouvelle plutôt qu’un ajout sur une structure existante — à vérifier auprès de votre commune.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Un carport solaire coûte-t-il plus cher qu’une installation en toiture ?',
    answer: 'Oui, généralement : la structure porteuse s’ajoute au coût des panneaux.',
    open: true,
  },
  {
    question: 'Peut-on combiner carport solaire et borne de recharge ?',
    answer: 'Oui, c’est l’un des cas d’usage les plus cohérents.',
  },
  {
    question: 'Faut-il un permis pour construire un carport avec panneaux ?',
    answer: 'Généralement oui, puisqu’il s’agit d’une construction nouvelle. À vérifier auprès de votre commune.',
  },
];

export const FINAL_CTA = {
  title: 'Un carport, ça se chiffre sur mesure',
  text: "Structure, puissance, borne de recharge : on regarde l'ensemble. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
