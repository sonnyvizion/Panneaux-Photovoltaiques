import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { POWER_MIN } from '../../scripts/powerEstimate';

/**
 * Page 2.15 — « Camping-car » (`/installation/camping-car`).
 *
 * ⚠️ PAS DE PONT VERS LE SIMULATEUR, sur consigne explicite du cahier : « pont
 * final léger/optionnel, ce public n'est pas la cible principale du funnel devis
 * résidentiel ».
 *
 * Ce que ça change ici : la page se termine sur une phrase de clôture SANS
 * bouton. Un CTA « Estimer mon installation » sur une page 12 V produirait un
 * lead inexploitable pour le client et une déception pour le visiteur — l'objet
 * du site est le lead QUALIFIÉ, pas le volume (CLAUDE.md). Aucune destination
 * n'a été inventée non plus : les pages qui auraient du sens ici (batterie
 * domestique) ne sont pas publiées.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 */
export const SEO: PageSeo = {
  title: 'Panneau solaire pour camping-car : le guide | Belgreen',
  description:
    'Basse tension 12 V, batterie embarquée, aucun raccordement au réseau : le solaire de camping-car n’a presque rien de commun avec une installation résidentielle.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Panneau solaire pour camping-car : l’essentiel',
  answer:
    'Un système solaire pour camping-car fonctionne différemment d’une installation domestique : panneaux basse tension (12V), batterie embarquée, pas de raccordement au réseau électrique.',
  cta: { label: 'Voir les spécificités', href: '#essentiel-camping-car' },
  imageAlt: 'Camping-car stationné en pleine nature, panneaux solaires posés à plat sur son toit',
} as const;

export const LEAD = {
  text: 'Un univers à part : pas de GRD, pas de déclaration, juste de l’autonomie électrique en déplacement.',
  note: 'Le principe, en une image.',
} as const;

export const MODULE = {
  title: 'Un circuit fermé, sans réseau',
  caption:
    'Panneau, régulateur, batterie, consommateurs : tout le circuit tient dans le véhicule. Rien n’est injecté, rien n’est facturé, et il n’y a personne à prévenir. C’est ce qui rend le solaire embarqué à la fois plus simple administrativement et plus dépendant de sa batterie.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui n’a rien à voir avec le résidentiel',
  intro: 'Ce qui distingue le solaire camping-car du solaire résidentiel.',
};

/* ⚠️ « 12 V » est un vrai chiffre, « Batterie » et « Aucun » n'en sont pas.
   La tension reprend sa place dans le titre de sa ligne, où elle veut dire
   quelque chose. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'TENSION',
    title: 'Un système basse tension (12 V)',
    text:
      'Rien à voir avec une installation résidentielle : le solaire camping-car fonctionne en circuit fermé et basse tension.',
  },
  {
    eyebrow: 'STOCKAGE',
    title: 'Une batterie embarquée indispensable',
    text:
      'Sans stockage, l’électricité produite en roulant ou à l’arrêt ne sert à rien.',
  },
  {
    eyebrow: 'RACCORDEMENT',
    title: 'Aucun, système totalement autonome',
    text:
      'Pas de réseau, pas de déclaration : tout reste à bord du véhicule.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'camping-car-liste.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Des puissances sans commune mesure',
    /* Le point de comparaison est la borne basse du curseur résidentiel du
       site (`POWER_MIN`), pas un « 3 000 Wc » recopié à côté. */
    text: `De 100 à 400 Wc selon l’usage, là où une installation résidentielle démarre à ${POWER_MIN * 1000} Wc.`,
  },
  {
    title: 'Aucune démarche',
    text: 'Pas de gestionnaire de réseau, pas de déclaration, pas de contrôle RGIE.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Vous cherchez plutôt du solaire pour la maison ?',
    text: 'Tout change : puissance, raccordement, démarches et rentabilité.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
  {
    title: 'Une petite installation d’appoint chez vous ?',
    text: 'Le kit plug & play de balcon est l’équivalent domestique du solaire embarqué.',
    cta: { label: 'Voir le kit de balcon', href: '/installation/balcon' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions fréquentes sur le solaire mobile.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Quelle puissance pour un camping-car ?',
    text: 'Généralement entre 100 et 400 Wc selon l’usage (appoint ou autonomie complète), largement en dessous des puissances résidentielles.',
    accent: true,
  },
  {
    title: 'Peut-on utiliser les mêmes panneaux que pour une maison ?',
    text: 'Techniquement possible mais pas optimal : les panneaux camping-car sont conçus pour être plus légers et résister aux vibrations de la route.',
  },
  {
    title: 'Faut-il une batterie spécifique ?',
    text: 'Oui, une batterie adaptée au cyclage fréquent (décharge/charge répétées), différente d’une batterie domestique classique.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Quelle puissance pour un camping-car ?',
    answer: 'Entre 100 et 400 Wc selon que vous cherchez un appoint ou une autonomie complète.',
    open: true,
  },
  {
    question: 'Peut-on utiliser les mêmes panneaux que pour une maison ?',
    answer:
      'Techniquement oui, mais ce n’est pas optimal : les modèles pour camping-car sont plus légers et supportent les vibrations de la route.',
  },
  {
    question: 'Faut-il une batterie spécifique ?',
    answer:
      'Oui, une batterie conçue pour le cyclage fréquent, différente d’une batterie domestique classique.',
  },
];

/* ⚠️ Clôture SANS bouton — voir l'en-tête. */
export const FINAL_CTA = {
  overline: 'Pour aller plus loin',
  title: 'Le solaire embarqué est un métier à part',
  text: "Nous installons du photovoltaïque résidentiel raccordé au réseau : pour un équipement 12 V, adressez-vous à un spécialiste du véhicule de loisir.",
} as const;
