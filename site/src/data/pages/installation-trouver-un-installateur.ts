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
    'Un bon installateur photovoltaïque en Belgique est certifié RESCert PV, assuré en responsabilité civile professionnelle, et vous remet un devis détaillé avant travaux.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Installateur en équipement de sécurité posant un panneau solaire sur une toiture',
} as const;

export const LEAD = {
  text: 'Le marché du solaire attire aussi des acteurs peu sérieux : voici les critères concrets pour faire le tri, que vous passiez par nous ou par un autre installateur.',
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
    text: 'RESCert PV, la même certification dans les trois régions : la garantie que l’installateur est reconnu par les autorités.',
    image: 'trouver-pro-carte-certification.jpg',
    alt: 'Installateur solaire équipé inspectant une toiture résidentielle avec panneaux',
  },
  {
    title: 'Assurance',
    text: 'Responsabilité civile professionnelle : à vérifier avant de signer, ça vous protège en cas de problème.',
    image: 'trouver-pro-carte-assurance.jpg',
    alt: 'Installateur avec harnais et gants vérifiant la fixation d’un panneau solaire',
  },
  {
    title: 'Devis',
    text: 'Détaillé et remis avant le début des travaux, jamais un chiffrage approximatif de dernière minute.',
    image: 'trouver-pro-carte-devis.jpg',
    alt: 'Plan de toiture, mètre et tablette préparés pour un devis solaire résidentiel',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'Comparez à équivalence',
    text: 'Plusieurs devis, oui, mais à puissance, marque et garanties comparables, pas seulement sur le prix final.',
  },
  {
    title: 'Les démarches sont incluses',
    text: 'Un installateur sérieux prend en charge le RGIE, la déclaration au GRD et, selon la région, le certificat RESCert ou l’encodage Sibelga.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Quelles démarches doit-il gérer pour vous ?',
    text: 'Elles changent d’une région à l’autre : savoir lesquelles vous concernent aide à juger un devis.',
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
  intro: 'Les pages qui prolongent le sujet.',
};

/*
 * « Creuser le sujet » en CARTES-LIENS, pas en questions.
 *
 * ⚠️ Ce bloc REPOSAIT MOT POUR MOT les questions de la FAQ, trois cents pixels
 * plus haut : le visiteur lisait deux fois la meme reponse et la page servait
 * la meme question deux fois a Google, dont une seule balisee. Le gabarit
 * (`pages-contenu.md` §4) veut ici « details secondaires, cas particuliers,
 * pour aller plus loin » — pas un doublon de la §5.
 *
 * La variante retenue est celle d'`a-propos.ts` : un titre en affirmation, ce
 * que la page voisine repond, et son `href`. Aucun contenu invente, et le
 * maillage interne y gagne.
 */
export const TOPICS: TopicCard[] = [
  {
    title: 'Ce que la certification recouvre',
    text: 'RESCert PV : obligatoire en Wallonie, décisif à Bruxelles, facultatif en Flandre.',
    href: '/aides-primes/bruxelles/reglementation',
    accent: true,
  },
  {
    title: 'Les garanties à faire écrire au devis',
    text: 'Panneaux, onduleur, main-d’œuvre : trois durées, et ce que la loi belge impose.',
    href: '/comprendre/garanties',
  },
  {
    title: 'À quoi comparer les prix reçus',
    text: 'Le prix au kWc en Belgique en 2026, pour savoir si un devis est dans le marché.',
    href: '/rentabilite-prix',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Comment vérifier qu’un installateur est bien certifié ?',
    answer:
      "Demandez son numéro RESCert PV et vérifiez-le auprès de l'organisme régional. Attention, l'obligation n'est pas la même partout : en Wallonie, toute entreprise qui installe du photovoltaïque doit compter une personne certifiée depuis mars 2023 ; à Bruxelles, l'installateur doit vous remettre son certificat, et sans lui votre installation de 5 kWc ou moins n'ouvre plus droit aux certificats verts depuis janvier 2026. En Flandre, la certification n'est pas obligatoire pour le résidentiel : elle reste un signal de sérieux, pas une garantie légale.",
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
      'Chez un professionnel sérieux, oui : RGIE, déclaration au GRD, et selon la région le certificat RESCert ou l’encodage Sibelga.',
  },
];

export const FINAL_CTA = {
  title: 'Vous parlez directement à l’équipe qui installe',
  text: "Pas à un commercial, pas à un intermédiaire, pas à un revendeur de coordonnées.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
