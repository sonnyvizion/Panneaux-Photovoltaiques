import type { Bridge, Fact, FaqItem, Figure, PhotoCard, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

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

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * Le titre part du SUBSTANTIF cherché (« installateur panneaux solaires ») et
 * non du verbe « trouver » : c'est la requête, le verbe n'est que l'intention.
 */
export const SEO: PageSeo = {
  title: 'Installateur panneaux solaires : bien choisir | Belgreen',
  description:
    'Certification RESCert, responsabilité civile professionnelle, devis détaillé avant travaux : les critères pour trier les installateurs, et les signaux d’alarme.',
};

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

/* ⚠️ « RESCERT », « RC pro » et « Détaillé » ne sont pas des chiffres : le
   format carte chiffre leur donnait une échelle qu'ils n'ont pas. Trois
   documents à réclamer, ça se montre. */
export const FIGURES: Figure[] = [];

export const PHOTOS: PhotoCard[] = [
  {
    title: 'Certification',
    text: 'RESCert ou équivalent régional selon votre zone — la garantie que l’installateur est reconnu par les autorités.',
    image: 'trouver-pro-carte-certification.jpg',
    alt: 'Installateur solaire équipé inspectant une toiture résidentielle avec panneaux',
  },
  {
    title: 'Assurance',
    text: 'Responsabilité civile professionnelle — à vérifier avant de signer, ça vous protège en cas de problème.',
    image: 'trouver-pro-carte-assurance.jpg',
    alt: 'Installateur avec harnais et gants vérifiant la fixation d’un panneau solaire',
  },
  {
    title: 'Devis',
    text: 'Détaillé et remis avant le début des travaux — jamais un chiffrage approximatif de dernière minute.',
    image: 'trouver-pro-carte-devis.jpg',
    alt: 'Plan de toiture, mètre et tablette préparés pour un devis solaire résidentiel',
  },
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
