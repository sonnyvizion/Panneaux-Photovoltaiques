import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Page 2.16 — « Trouver un pro » (`/installation/trouver-un-installateur`).
 *
 * ⚠️ SANS MODULE SÉPARÉ, sur prescription du cahier : « réutilise le pattern
 * Creuser le sujet comme contenu principal plutôt qu'un module séparé ». La
 * grille de critères EST le bloc « Creuser le sujet ».
 *
 * ⚠️ Page délicate : elle explique comment choisir un installateur, sur le site
 * d'un installateur. Le cahier assume ce parti — « que vous passiez par nous ou
 * par un autre ». Les critères sont donc écrits sans mention de Belgreen ; c'est
 * le pont final, et lui seul, qui fait le lien.
 */

export const HERO = {
  badge: 'Installation',
  title: 'Comment bien choisir son installateur de panneaux solaires',
  answer:
    'Un bon installateur photovoltaïque en Belgique est certifié (RESCERT ou équivalent régional), assuré en responsabilité civile professionnelle, et vous remet un devis détaillé avant travaux.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Installateur en équipement de sécurité posant un panneau solaire sur une toiture',
} as const;

export const LEAD = {
  text: 'Le marché du solaire attire aussi des acteurs peu sérieux — voici les critères concrets pour faire le tri, que vous passiez par nous ou par un autre installateur.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Les 3 critères non négociables',
  intro: 'Les trois critères non négociables.',
};

export const FIGURES: Figure[] = [
  { label: 'Certification', value: 'RESCERT', note: 'ou équivalent régional selon votre zone', tone: 'lime' },
  { label: 'Assurance', value: 'RC pro', note: 'responsabilité civile professionnelle', tone: 'grey' },
  { label: 'Devis', value: 'Détaillé', note: 'remis avant le début des travaux', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Comparez à équivalence',
    text: 'Plusieurs devis, oui — mais à puissance, marque et garanties comparables, pas seulement sur le prix final.',
  },
  {
    title: 'Les démarches sont incluses',
    text: 'Un installateur sérieux prend en charge le RGIE, la déclaration GRD et, selon la région, le RESCert ou Sibelga.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Quelles démarches doit-il gérer pour vous ?',
    text: 'Elles changent d’une région à l’autre — savoir lesquelles vous concernent aide à juger un devis.',
    cta: { label: 'Voir les démarches en Wallonie', href: '/aides-primes/wallonie/demarches' },
  },
  {
    title: 'Et si vous posiez vous-même ?',
    text: 'La pose est légale en autonomie ; le raccordement et le contrôle ne le sont pas.',
    cta: { label: 'Voir installer soi-même', href: '/installation/soi-meme' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'La grille de critères',
  title: 'Ce qui distingue un bon installateur',
  intro: 'Quatre questions à poser avant de signer quoi que ce soit.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Comment vérifier qu’un installateur est bien certifié ?',
    text: 'Demandez le numéro de certification et vérifiez-le auprès de l’organisme régional compétent (RESCERT ou équivalent).',
    accent: true,
  },
  {
    title: 'Faut-il toujours comparer plusieurs devis ?',
    text: 'C’est recommandé, mais assurez-vous de comparer des devis à puissance et qualité de matériel équivalentes — pas seulement le prix final.',
  },
  {
    title: 'Quels sont les signaux d’alarme ?',
    text: 'Une pression commerciale forte pour signer immédiatement, un devis flou sans détail du matériel, ou l’absence d’assurance vérifiable.',
  },
  {
    title: 'S’occupe-t-il de toutes les démarches ?',
    text: 'Ça devrait être le cas pour un installateur sérieux — RGIE, déclaration GRD, et selon la région, RESCert ou Sibelga.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Comment vérifier qu’un installateur est bien certifié ?',
    answer:
      'Demandez son numéro de certification et vérifiez-le auprès de l’organisme régional compétent.',
    open: true,
  },
  {
    question: 'Faut-il toujours comparer plusieurs devis ?',
    answer:
      'C’est recommandé, à condition de comparer des devis à puissance, marque et garanties équivalentes.',
  },
  {
    question: 'Quels sont les signaux d’alarme d’un mauvais installateur ?',
    answer:
      'Une pression pour signer tout de suite, un devis flou sans détail du matériel, ou une assurance impossible à vérifier.',
  },
  {
    question: 'L’installateur s’occupe-t-il de toutes les démarches administratives ?',
    answer:
      'Chez un professionnel sérieux, oui : RGIE, déclaration au GRD, et selon la région RESCert ou Sibelga.',
  },
];

export const FINAL_CTA = {
  title: 'Vous parlez directement à l’équipe qui installe',
  text: "Pas à un commercial, pas à un intermédiaire, pas à un revendeur de coordonnées.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
