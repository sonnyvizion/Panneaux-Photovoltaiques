import type { Bridge, FaqItem, Fact, Figure, SectionCopy, ToggleState, TopicCard } from '../content';

/**
 * Page 2.6 — « Ombrage » (`/installation/ombrage`).
 *
 * Module : `StateToggle` (famille C), le composant de la page « Fin du compteur
 * inversé ». Le cahier le dit lui-même — « bascule avant/après comme le module
 * compteur inversé ». Zéro ligne de composant à écrire.
 *
 * Les deux états ne sont pas « avant/après » dans le temps mais deux
 * TECHNOLOGIES : onduleur string contre micro-onduleurs. C'est la même
 * mécanique de substitution, et c'est ce que le module sert à montrer.
 */

export const HERO = {
  badge: 'Installation',
  title: 'L’ombrage : pourquoi une seule ombre peut coûter cher',
  answer:
    'Même une ombre partielle sur un seul panneau peut réduire significativement la production de toute une chaîne de panneaux. Des micro-onduleurs ou optimiseurs de puissance limitent cet impact en isolant chaque panneau.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toiture solaire partiellement ombragée par un arbre voisin',
} as const;

export const LEAD = {
  text: 'Une cheminée, une antenne, un arbre voisin — l’ombrage semble un détail, mais c’est l’un des facteurs qui pénalise le plus le rendement s’il n’est pas anticipé.',
  note: 'Basculez d’une technologie à l’autre ci-dessous.',
} as const;

export const TOGGLE_COPY: SectionCopy = {
  overline: 'L’effet domino',
  title: 'Une ombre, deux conséquences très différentes',
  intro: 'Ce que devient la production quand un seul panneau passe à l’ombre.',
};

export const TOGGLE_STATES: [ToggleState, ToggleState] = [
  {
    label: 'Onduleur string',
    title: 'Les panneaux sont en série',
    highlight: 'Un panneau ombragé pénalise toute la chaîne',
    text: 'Avec un onduleur string classique, les panneaux d’une même chaîne fonctionnent ensemble : le plus faible impose son débit aux autres. Une ombre partielle sur un seul module fait donc chuter la production de toute la série, même si les autres panneaux sont en plein soleil.',
  },
  {
    label: 'Micro-onduleurs',
    title: 'Chaque panneau est isolé',
    highlight: 'Seul le panneau ombragé baisse',
    text: 'Avec un micro-onduleur ou un optimiseur par panneau, chaque module produit indépendamment des autres. L’ombre ne coûte plus que la production du panneau qu’elle couvre — les autres continuent à plein régime.',
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'L’effet domino, en résumé',
  intro: 'L’effet domino de l’ombre, en résumé.',
};

export const FIGURES: Figure[] = [
  { label: 'Panneaux en série', value: 'Effet domino', note: 'un seul panneau ombragé pénalise toute la chaîne', tone: 'lime' },
  { label: 'La solution', value: 'Un par panneau', note: 'micro-onduleurs ou optimiseurs de puissance', tone: 'grey' },
  { label: 'Sources fréquentes', value: 'Le voisinage', note: 'cheminées, arbres, bâtiments, antennes', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Une ombre temporaire compte aussi',
    text: 'Même une ombre qui ne dure que le matin réduit la production de la chaîne concernée pendant toute sa durée.',
  },
  {
    title: 'Le surcoût se justifie au cas par cas',
    text: 'Les micro-onduleurs coûtent plus cher — l’investissement vaut le coup quand l’ombrage est inévitable.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Quelle technologie d’onduleur choisir ?',
    text: 'C’est le composant qui décide de la sensibilité de votre installation à l’ombre.',
    cta: { label: 'Comprendre l’onduleur', href: '/comprendre/onduleur' },
  },
  {
    title: 'Notre équipe est certifiée Enphase',
    text: 'Les micro-onduleurs, c’est notre spécialité — et c’est précisément la réponse à l’ombrage.',
    cta: { label: 'Estimer mon installation', href: '/simulateur' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qu’il faut anticiper avant l’installation.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Un arbre qui fait de l’ombre le matin, est-ce un problème ?',
    text: 'Ça dépend de la technologie choisie — avec un onduleur string classique, oui, même une ombre partielle temporaire réduit la production de toute la chaîne concernée.',
    accent: true,
  },
  {
    title: 'Les micro-onduleurs coûtent-ils plus cher ?',
    text: 'Oui, mais l’investissement se justifie si votre toiture a des sources d’ombrage partielles difficiles à éviter autrement.',
  },
  {
    title: 'Peut-on couper les branches qui gênent, légalement ?',
    text: 'Ça dépend si l’arbre est sur votre terrain ou celui d’un voisin — les règles de mitoyenneté s’appliquent comme pour toute question de branches débordantes.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Un arbre qui fait de l’ombre le matin, est-ce vraiment un problème ?',
    answer:
      'Avec un onduleur string classique, oui : même une ombre partielle et temporaire réduit la production de toute la chaîne concernée.',
    open: true,
  },
  {
    question: 'Les micro-onduleurs coûtent-ils plus cher ?',
    answer: 'Oui, mais le surcoût se justifie dès que l’ombrage est difficile à éviter autrement.',
  },
  {
    question: 'Peut-on couper les branches qui gênent, légalement ?',
    answer:
      'Ça dépend de l’emplacement de l’arbre — les règles de mitoyenneté s’appliquent comme pour toute branche débordante.',
  },
];

export const FINAL_CTA = {
  title: 'On évalue l’ombrage de votre toit lors de l’analyse gratuite',
  text: "Relevé sur place, sans engagement. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
