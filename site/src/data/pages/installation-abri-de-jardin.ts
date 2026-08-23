import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Page 2.11 — « Abri de jardin » (`/installation/abri-de-jardin`).
 * ⚠️ SANS MODULE, sur prescription du cahier.
 */

export const HERO = {
  badge: 'Installation',
  title: 'Panneaux solaires sur un abri de jardin',
  answer:
    'Un abri de jardin peut accueillir quelques panneaux solaires, une solution d’appoint plutôt qu’une installation principale, souvent utilisée en complément du toit de la maison.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Abri de jardin en bois dont le toit porte quelques panneaux solaires',
} as const;

export const LEAD = {
  text: 'Pas de quoi remplacer une vraie installation, mais une option utile pour grappiller quelques panneaux supplémentaires quand la toiture principale est saturée.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Une solution d’appoint',
  intro: 'Ce qu’il faut savoir sur cette solution d’appoint.',
};

export const FIGURES: Figure[] = [
  { label: 'Rôle', value: 'Complément', note: 'rarement une installation principale', tone: 'lime' },
  { label: 'Puissance', value: '4-6', note: 'panneaux au maximum, selon la surface', tone: 'grey' },
  { label: 'Raccordement', value: 'Au compteur', note: 'le même que celui de la maison', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Pas de permis en général',
    text: 'Les mêmes règles qu’une installation au sol s’appliquent — pas de permis dans la plupart des cas résidentiels.',
  },
  {
    title: 'La configuration courante',
    text: 'Relier l’abri au compteur principal est la solution la plus fréquente, et la plus simple.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Votre toiture principale est saturée ?',
    text: 'Avant de se rabattre sur l’abri, vérifiez ce que le toit principal peut encore accueillir.',
    cta: { label: 'Voir le calcul', href: '/installation/nombre-de-panneaux' },
  },
  {
    title: 'Et une installation au sol ?',
    text: 'Plus de surface, plus de liberté d’orientation — souvent plus pertinent qu’un abri.',
    cta: { label: 'Voir l’installation au sol', href: '/installation/au-sol' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions pratiques sur cette solution d’appoint.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Combien de panneaux tiennent sur un abri de jardin ?',
    text: 'Ça dépend de sa taille, mais généralement quelques unités seulement, rarement plus de 4-6 panneaux.',
    accent: true,
  },
  {
    title: 'Faut-il un permis pour un abri avec panneaux ?',
    text: 'Les mêmes règles générales s’appliquent que pour une installation au sol — pas de permis dans la plupart des cas résidentiels standards.',
  },
  {
    title: 'Peut-on relier au compteur principal de la maison ?',
    text: 'Oui, c’est même la configuration la plus courante.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Combien de panneaux tiennent sur un abri de jardin ?',
    answer: 'Généralement quelques unités seulement, rarement plus de 4 à 6 panneaux.',
    open: true,
  },
  {
    question: 'Faut-il un permis pour un abri de jardin avec panneaux ?',
    answer: 'Pas dans la plupart des cas résidentiels standards — les règles sont celles d’une installation au sol.',
  },
  {
    question: 'Peut-on relier cette installation au compteur principal de la maison ?',
    answer: 'Oui, c’est la configuration la plus courante.',
  },
];

export const FINAL_CTA = {
  title: 'Voyez ce que votre terrain peut produire',
  text: "Toiture, abri, sol : on regarde tout. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
