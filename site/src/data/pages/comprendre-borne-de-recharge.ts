import type { Bridge, EssentialsEditorial, Fact, FaqItem, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.6 — « Borne de recharge » (`/comprendre/borne-de-recharge`).
 *
 * Module : aucun. Le cahier demande un « lien contextuel fort » vers la page
 * Voiture électrique : il est porté par le premier pont, en tête des ponts, et
 * non noyé dans un accordéon.
 *
 * ⚠️ L'URL cible du cahier (`/installation/applications/voiture-electrique`)
 * n'existe pas : dans le code c'est `/installation/voiture-electrique`.
 *
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * La page ne dispute pas « recharger sa voiture avec ses panneaux » à
 * `/installation/voiture-electrique` : elle vise l'équipement, la borne.
 */
export const SEO: PageSeo = {
  title: 'Borne de recharge et panneaux solaires | Belgreen',
  description:
    'Une borne recharge votre voiture bien plus vite qu’une prise, et certains modèles suivent la production du toit. Ce qu’elle apporte, ce qu’elle exige.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "La borne de recharge : un complément naturel au solaire",
  answer:
    "Une borne de recharge permet de recharger un véhicule électrique plus rapidement et plus efficacement qu’une prise domestique classique, et de le faire avec l’électricité produite par vos panneaux solaires.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Borne de recharge murale et son câble enroulé, une voiture stationnée à côté dans une allée bordée d’une haie",
} as const;

export const LEAD = {
  text: "Ce n’est pas obligatoire pour recharger une voiture électrique, mais ça change la vitesse de recharge et l’efficacité du couplage avec le solaire.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Borne ou prise classique",
  intro: "Pourquoi une borne plutôt qu’une prise classique.",
};

/* ⚠️ « Bien plus », « Dédiée » et « Adaptatif » : trois adjectifs posés en
   corps 44 à la place de chiffres. La page n'en a aucun à donner — c'est une
   comparaison qualitative avec la prise domestique, et elle se raconte. */
export const FIGURES: Figure[] = [];

export const EDITORIAL: EssentialsEditorial = {
  title: 'Borne de recharge',
  text:
    'Une borne de recharge n’est pas obligatoire pour recharger une voiture électrique, mais elle change tout. La vitesse d’abord, nettement supérieure à une prise domestique classique. La sécurité ensuite, avec une installation dédiée plutôt qu’un branchement de fortune. Et pour qui a des panneaux solaires, le vrai plus : certains modèles ajustent automatiquement leur puissance selon ce que le toit produit à l’instant T. La voiture se recharge quand le soleil donne, pas au hasard.',
  imageAlt:
    'Voiture électrique grise branchée à une borne de recharge murale blanche, sur la façade d’une maison, à côté de la porte de garage',
};

export const FACTS: Fact[] = [
  { title: "Indépendante du solaire", text: "Une borne fonctionne sans panneaux : le couplage relève de l’économie, pas de la technique." },
  { title: "Rarement un permis", text: "Pas de permis en général pour une installation murale standard, mais les règles varient d’une commune à l’autre." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Comment coupler borne et panneaux ?",
    text: "C’est là que se fait l’économie : recharger en journée, sur sa propre production.",
    cta: { label: "Voir la recharge solaire", href: '/installation/voiture-electrique' },
  },
  {
    title: "Et si la voiture stationne dehors ?",
    text: "Un carport solaire produit exactement là où le véhicule se gare.",
    cta: { label: "Voir le carport", href: '/installation/carport' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut savoir avant d’installer une borne.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Faut-il une borne spécifique pour le solaire ?",
    text: "Certains modèles intelligents ajustent automatiquement la puissance de recharge selon la production solaire disponible, un vrai plus pour maximiser l’autoconsommation, mais pas indispensable pour recharger tout court.",
    accent: true,
  },
  {
    title: "La borne consomme-t-elle plus qu’une prise ?",
    text: "Non, elle ne consomme pas plus d’énergie pour un même trajet : elle la délivre juste plus rapidement et plus efficacement.",
  },
  {
    title: "Peut-on installer une borne sans panneaux ?",
    text: "Oui, les deux sont indépendants, même si le couplage a du sens économiquement quand les deux coexistent.",
  },
  {
    title: "Faut-il un permis pour installer une borne ?",
    text: "Généralement non pour une installation murale standard, mais les règles peuvent varier selon la commune.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Une borne coûte-t-elle cher à installer ?",
    answer:
      "Le coût varie selon la puissance et les éventuelles adaptations du tableau électrique nécessaires.",
    open: true,
  },
  {
    question: "Puis-je recharger la nuit avec mes panneaux ?",
    answer:
      "Non, sans batterie de stockage. Voir la page dédiée « Voiture électrique » pour le détail.",
  },
  {
    question: "La borne fonctionne-t-elle avec toutes les voitures ?",
    answer:
      "La plupart des bornes domestiques sont compatibles avec les standards de charge courants, à vérifier selon le modèle de véhicule.",
  },
];

export const FINAL_CTA = {
  title: "Voyez comment coupler borne et panneaux",
  text: "Le dimensionnement change quand la voiture entre dans le calcul.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
