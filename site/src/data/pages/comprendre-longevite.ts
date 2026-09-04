import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.7 — « Longévité » (`/comprendre/longevite`).
 * Module : aucun.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * ⚠️ Le H1 disait « combien de temps dure une installation solaire », qui ne
 * contient pas l'expression réellement tapée : « durée de vie des panneaux
 * solaires ». Le titre, la description et le H1 la portent maintenant tous les
 * trois, et la fourchette 25-30 ans occupe la place que Google donnerait de
 * toute façon au suffixe de marque.
 */
export const SEO: PageSeo = {
  title: 'Durée de vie des panneaux solaires : 25 à 30 ans | Belgreen',
  description:
    'Un panneau produit 25 à 30 ans en perdant 0,5 % par an. L’onduleur string tient 10 à 15 ans, le micro-onduleur est garanti 25 ans.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "Quelle est la durée de vie des panneaux solaires ?",
  answer:
    "Un panneau solaire a une durée de vie de 25 à 30 ans, avec une dégradation progressive et lente de sa capacité de production, environ 0,5 % par an. L’onduleur, lui, dépend de sa technologie : un onduleur central tient 10 à 15 ans, là où les micro-onduleurs que nous posons sont garantis 25 ans, soit la durée de vie des panneaux eux-mêmes.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Vue aérienne, à la lumière du soir, d’une maison en briques dont les deux pans de toiture sont couverts de panneaux solaires",
} as const;

export const LEAD = {
  text: "« Ça dure combien de temps » est une question légitime pour un investissement de plusieurs milliers d’euros : la réponse dépend du composant dont on parle.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Composant par composant",
  intro: "La durée de vie, composant par composant.",
};

export const FIGURES: Figure[] = [
  { label: "Panneaux", value: "25-30 ans", note: "dégradation lente, environ 0,5 % par an", tone: 'lime' },
  /* ⚠️ DEUX TECHNOLOGIES, DEUX DURÉES, et la carte disait la première comme si
     elle valait pour les deux. Le client est installateur certifié Enphase,
     dont les micro-onduleurs sont garantis 25 ans : la page dont le sujet EST
     la durée de vie décrivait donc un produit qu'il ne pose pas. Confirmé par
     le client le 2026-09-03. */
  { label: "Onduleur central", value: "10-15 ans", note: "le composant le plus souvent remplacé en cours de route", tone: 'grey' },
  { label: "Micro-onduleur", value: "25 ans", note: "garanti aussi longtemps que les panneaux : aucun remplacement à mi-vie", tone: 'lime' },
  { label: "Fixation", value: "25-30 ans", note: "conçue pour durer autant que les panneaux", tone: 'ink' },
];

export const FACTS: Fact[] = [
  { title: "80 %, c’est le plancher garanti", text: "Le seuil que le fabricant s’engage à tenir à 25 ans, pas la perte attendue : à 0,5 % par an, un panneau tourne encore autour de 88 % de sa puissance d’origine." },
  { title: "Le climat belge n’use pas plus", text: "Pluie, gel et vent font partie des contraintes standards pour lesquelles les panneaux sont conçus." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Que couvrent les garanties, au juste ?",
    text: "Produit, performance, garantie légale : trois couvertures différentes, souvent confondues.",
    cta: { label: "Voir les garanties", href: '/comprendre/garanties' },
  },
  {
    title: "Sur 25 ans, ça donne quoi financièrement ?",
    text: "La durée de vie ne dit pas la rentabilité : celle-ci dépend de votre région et de votre autoconsommation.",
    cta: { label: "Voir l’amortissement", href: '/rentabilite-prix/amortissement' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qui influence la longévité réelle d’une installation.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Qu’est-ce qui dégrade un panneau avec le temps ?",
    text: "L’exposition aux UV et aux variations de température use progressivement les matériaux, un processus lent et normal, pas un signe de défaut.",
    accent: true,
  },
  {
    title: "Un panneau garde-t-il une valeur après 25 ans ?",
    text: "Oui : il continue à produire. La dégradation réelle, de l’ordre de 0,5 % par an, laisse environ 88 % de la puissance d’origine au bout de 25 ans. Les 80 % que promettent les garanties de performance sont un plancher, pas la valeur attendue.",
  },
  {
    title: "Le climat belge use-t-il plus vite les panneaux ?",
    text: "Pas particulièrement : les panneaux sont conçus pour résister aux intempéries standards, et le climat belge ne présente pas de contrainte exceptionnelle.",
  },
  {
    title: "Faut-il tout remplacer après 25-30 ans ?",
    text: "Pas nécessairement d’un coup : un remplacement progressif, l’onduleur d’abord puis les panneaux au cas par cas, est souvent plus pertinent économiquement.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Combien d’années durent des panneaux solaires ?',
    answer:
      'Entre 25 et 30 ans en production utile, et souvent davantage : un panneau ne s’arrête pas net, il perd lentement en rendement. C’est cette lente décroissance, pas une panne, qui fixe la fin de vie utile. L’onduleur, lui, se remplace au moins une fois sur cette durée.',
  },
  {
    question: "Les panneaux garantissent-ils leur rendement dans le temps ?",
    answer:
      "Les fabricants proposent généralement une garantie de performance distincte de la garantie produit. Voir la page Garanties pour le détail.",
    open: true,
  },
  {
    question: "Que se passe-t-il si un panneau tombe en panne avant 25 ans ?",
    answer:
      "C’est rare pour les panneaux eux-mêmes, qui n’ont pas de pièce mobile ; la garantie fabricant couvre ce cas.",
  },
  {
    question: "La durée de vie justifie-t-elle l’investissement ?",
    answer:
      "Une installation produit 25 à 30 ans, mais le délai de retour ne se résume pas à une moyenne : il dépend de votre région et de votre taux d’autoconsommation, et en Wallonie la charge prosumer l’allonge nettement. Le détail est en page Amortissement.",
  },
  {
    question: 'Le climat belge use-t-il les panneaux plus vite ?',
    answer:
      'Non, plutôt l’inverse. La chaleur est le principal facteur de vieillissement d’un module, et le climat belge est tempéré : nos panneaux vieillissent mieux que sous un climat méditerranéen. Pluie, gel et grêle sont couverts par les normes que respectent les modules vendus en Europe.',
  },
];

export const FINAL_CTA = {
  title: "Une installation vous suit 25 à 30 ans",
  text: "Autant savoir ce qu'elle vous rapportera sur la durée. Vous parlez directement à l'équipe qui installe.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
