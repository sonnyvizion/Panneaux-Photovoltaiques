import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.13 — « Carport » (`/installation/carport`).
 *
 * Module : `FigureModule` (famille E). Le cahier demande ici « illustration ou
 * photo simple » — la photo du hero convient telle quelle, c'est le seul module
 * de ce pilier dont l'image livrée correspond vraiment à ce qui est décrit.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 */
export const SEO: PageSeo = {
  title: 'Carport solaire : abri et production combinés | Belgreen',
  description:
    'Le carport solaire abrite la voiture et produit l’électricité qui la recharge, avec une orientation libre. Structure, permis d’urbanisme et surcoût à prévoir.',
};

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

/* ⚠️ « Abri + kWh », « Recharge », « Autonome » : trois arguments, pas trois
   mesures. Le premier n'était même pas une valeur mais une addition. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'DOUBLE FONCTION',
    title: 'Abri et production réunis',
    text:
      'Le carport solaire protège votre véhicule tout en produisant de l’électricité, sans empiéter sur la toiture principale.',
  },
  {
    eyebrow: 'SYNERGIE',
    title: 'Idéal avec une borne de recharge',
    text:
      'Produire et recharger au même endroit, c’est la combinaison la plus cohérente du solaire résidentiel.',
  },
  {
    eyebrow: 'STRUCTURE',
    title: 'Indépendante de toute toiture existante',
    text:
      'Le carport se construit là où vous voulez, sans dépendre de l’orientation ou de l’état de votre toit.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'carport-liste.jpg';

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
