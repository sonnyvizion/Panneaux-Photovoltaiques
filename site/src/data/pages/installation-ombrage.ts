import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, ToggleState, TopicCard } from '../content';
import type { PageSeo } from '../seo';

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

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * Le titre reprend la question réellement tapée (« quel impact »), pas la
 * métaphore de l'effet domino, qui n'est le mot-clé de personne.
 */
export const SEO: PageSeo = {
  title: 'Ombrage et panneaux solaires : quel impact ? | Belgreen',
  description:
    'Une ombre sur un seul panneau fait chuter toute une chaîne en onduleur string. Comment micro-onduleurs et optimiseurs limitent la perte, panneau par panneau.',
};

export const HERO = {
  badge: 'Installation',
  title: 'L’ombrage : pourquoi une seule ombre peut coûter cher',
  answer:
    'Même une ombre partielle sur un seul panneau peut réduire significativement la production de toute une chaîne de panneaux. Des micro-onduleurs ou optimiseurs de puissance limitent cet impact en isolant chaque panneau.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toiture solaire partiellement ombragée par un arbre voisin',
} as const;

export const LEAD = {
  text: 'Une cheminée, une antenne, un arbre voisin : l’ombrage semble un détail, mais c’est l’un des facteurs qui pénalise le plus le rendement s’il n’est pas anticipé.',
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
    text: 'Avec un micro-onduleur ou un optimiseur par panneau, chaque module produit indépendamment des autres. L’ombre ne coûte plus que la production du panneau qu’elle couvre : les autres continuent à plein régime.',
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'L’effet domino, en résumé',
  intro: 'L’effet domino de l’ombre, en résumé.',
};

/* ⚠️ « Effet domino », « Un par panneau », « Le voisinage » : trois formules
   posées en corps 44 sans un chiffre. C'est un mécanisme qui s'explique —
   la cause, la parade, les sources — pas trois grandeurs. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'EFFET DOMINO',
    title: 'Un seul panneau ombragé pénalise la chaîne',
    text:
      'Avec un onduleur string classique, l’ombre partielle sur un panneau réduit la production de toute la série connectée.',
  },
  {
    eyebrow: 'SOLUTION',
    title: 'Micro-onduleurs ou optimiseurs',
    text:
      'Ces équipements isolent chaque panneau, limitant l’impact d’une ombre localisée au reste de l’installation.',
  },
  {
    eyebrow: 'SOURCES',
    title: 'Cheminées, arbres, antennes, bâtiments voisins',
    text:
      'Les causes d’ombrage les plus fréquentes à repérer avant l’installation.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'ombrage-liste.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Une ombre temporaire compte aussi',
    text: 'Même une ombre qui ne dure que le matin réduit la production de la chaîne concernée pendant toute sa durée.',
  },
  {
    title: 'Le surcoût se justifie au cas par cas',
    text: 'Les micro-onduleurs coûtent plus cher : l’investissement vaut le coup quand l’ombrage est inévitable.',
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
    text: 'Les micro-onduleurs, c’est notre spécialité. Et c’est précisément la réponse à l’ombrage.',
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
    text: 'Ça dépend de la technologie choisie : avec un onduleur string classique, oui, même une ombre partielle temporaire réduit la production de toute la chaîne concernée.',
    accent: true,
  },
  {
    title: 'Les micro-onduleurs coûtent-ils plus cher ?',
    text: 'Oui, mais l’investissement se justifie si votre toiture a des sources d’ombrage partielles difficiles à éviter autrement.',
  },
  {
    title: 'Peut-on couper les branches qui gênent, légalement ?',
    text: 'Ça dépend si l’arbre est sur votre terrain ou celui d’un voisin : les règles de mitoyenneté s’appliquent comme pour toute question de branches débordantes.',
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
      'Ça dépend de l’emplacement de l’arbre : les règles de mitoyenneté s’appliquent comme pour toute branche débordante.',
  },
];

export const FINAL_CTA = {
  title: 'On évalue l’ombrage de votre toit lors de l’analyse gratuite',
  text: "Relevé sur place, sans engagement. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
