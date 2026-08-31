import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Page 4.7 — « Longévité » (`/comprendre/longevite`).
 * Module : aucun.
 */

export const HERO = {
  badge: 'Comprendre',
  title: "Combien de temps dure une installation solaire ?",
  answer:
    "Un panneau solaire a une durée de vie de 25 à 30 ans, avec une dégradation progressive et lente de sa capacité de production — environ 0,5 % par an. L’onduleur, lui, dure généralement moins longtemps : 10 à 15 ans.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Vue aérienne, à la lumière du soir, d’une maison en briques dont les deux pans de toiture sont couverts de panneaux solaires",
} as const;

export const LEAD = {
  text: "« Ça dure combien de temps » est une question légitime pour un investissement de plusieurs milliers d’euros — la réponse dépend du composant dont on parle.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Composant par composant",
  intro: "La durée de vie, composant par composant.",
};

export const FIGURES: Figure[] = [
  { label: "Panneaux", value: "25-30 ans", note: "dégradation lente, environ 0,5 % par an", tone: 'lime' },
  { label: "Onduleur", value: "10-15 ans", note: "le composant le plus souvent remplacé en cours de route", tone: 'grey' },
  { label: "Fixation", value: "25-30 ans", note: "conçue pour durer autant que les panneaux", tone: 'ink' },
];

export const FACTS: Fact[] = [
  { title: "Encore 80 % après 25 ans", text: "Un panneau ne s’arrête pas : il continue à produire à rendement réduit, souvent bien au-delà de sa durée de vie officielle." },
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
    text: "Avec un amortissement en 7 à 12 ans, l’installation produit gratuitement pendant 15 à 20 ans.",
    cta: { label: "Voir les prix 2026", href: '/rentabilite-prix' },
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
    text: "L’exposition aux UV et aux variations de température use progressivement les matériaux — un processus lent et normal, pas un signe de défaut.",
    accent: true,
  },
  {
    title: "Un panneau garde-t-il une valeur après 25 ans ?",
    text: "Il continue à produire, à un rendement réduit — généralement encore plus de 80 % de sa capacité initiale. Beaucoup d’installations fonctionnent bien après leur durée de vie officielle.",
  },
  {
    title: "Le climat belge use-t-il plus vite les panneaux ?",
    text: "Pas particulièrement — les panneaux sont conçus pour résister aux intempéries standards, et le climat belge ne présente pas de contrainte exceptionnelle.",
  },
  {
    title: "Faut-il tout remplacer après 25-30 ans ?",
    text: "Pas nécessairement d’un coup — un remplacement progressif, l’onduleur d’abord puis les panneaux au cas par cas, est souvent plus pertinent économiquement.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Les panneaux garantissent-ils leur rendement dans le temps ?",
    answer:
      "Les fabricants proposent généralement une garantie de performance distincte de la garantie produit — voir la page Garanties pour le détail.",
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
      "Avec un retour sur investissement de 7 à 12 ans et une durée de vie de 25 à 30 ans, l’installation produit « gratuitement » pendant 15 à 20 ans une fois amortie.",
  },
];

export const FINAL_CTA = {
  title: "Une installation vous suit 25 à 30 ans",
  text: "Autant savoir ce qu'elle vous rapportera sur la durée. Vous parlez directement à l'équipe qui installe.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
