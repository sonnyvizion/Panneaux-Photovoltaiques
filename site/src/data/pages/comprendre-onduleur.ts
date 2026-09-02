import type { Bridge, Fact, FaqItem, Figure, PhotoCard, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.3 — « Onduleur & micro-onduleur » (`/comprendre/onduleur`).
 *
 * ⚠️ Cette URL existait déjà comme gabarit `noindex` : des ponts des pages
 * Ombrage et Fonctionnement y menaient. Le drapeau `hidden` de `site.ts` est
 * donc retiré — la page est réelle et rejoint le méga-menu.
 *
 * Module : aucun, sur prescription du cahier.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * La requête utile n'est pas « onduleur » seul mais l'arbitrage qui amène
 * dessus : string ou micro-onduleur.
 */
export const SEO: PageSeo = {
  title: 'Onduleur solaire : string ou micro-onduleur ? | Belgreen',
  description:
    'L’onduleur rend utilisable le courant des panneaux. Rôle, durée de vie de 10 à 15 ans, et le seul cas où le micro-onduleur vaut son surcoût : l’ombrage.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "L’onduleur : le composant qui rend l’électricité solaire utilisable",
  answer:
    "L’onduleur transforme le courant continu produit par les panneaux en courant alternatif, utilisable par les appareils domestiques et compatible avec le réseau électrique. Sans lui, l’électricité produite par les panneaux serait inutilisable.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Onduleur mural blanc et gris fixé sur un mur clair, câbles raccordés en partie basse et coffret électrique attenant",
} as const;

export const LEAD = {
  text: "Moins visible que les panneaux, mais tout aussi indispensable, et souvent le premier composant à remplacer au cours de la vie de l’installation.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "String ou micro-onduleur",
  intro: "Onduleur string ou micro-onduleur, la vraie question.",
};

/* ⚠️ PLUS DE CARTES CHIFFRES ICI. « Convertir », « Un seul », « Un par
   panneau » n'étaient pas des chiffres : posés en corps 44 en bas à droite, ils
   prenaient le poids visuel d'une statistique sans en être une.

   ⚠️ ET DEUX CARTES, PAS TROIS. La 3ᵉ portait le rôle général de l'onduleur —
   déjà dit par l'intro de la page. Les deux qui restent sont deux OBJETS
   distincts, qu'une photo montre mieux qu'un mot. */
export const FIGURES: Figure[] = [];

export const PHOTOS: PhotoCard[] = [
  {
    title: 'L’onduleur string',
    text: 'Un seul boîtier pour toute l’installation : le montage le plus courant, adapté à la plupart des toitures sans ombrage.',
    image: '4.3-onduleur-carte-string.jpg',
    alt: 'Onduleur string mural installé dans un local technique résidentiel avec câbles solaires rangés',
  },
  {
    title: 'Le micro-onduleur',
    text: 'Un boîtier par panneau : plus cher à l’achat, mais limite fortement l’impact d’une ombre partielle sur la production totale.',
    image: 'onduleur-carte-micro.jpg',
    alt: 'Micro-onduleur fixé sous un panneau solaire avec câbles et connecteurs visibles',
  },
];

export const FACTS: Fact[] = [
  { title: "Le premier à remplacer", text: "10 à 15 ans, contre 25 à 30 pour les panneaux : un remplacement à mi-vie est à budgétiser dès le départ." },
  { title: "Où l’installer", text: "Dans un local ventilé et si possible frais, à distance raisonnable des panneaux : l’éloignement coûte en pertes et en câblage." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Votre toiture a de l’ombre ?",
    text: "C’est le seul cas où le micro-onduleur se justifie vraiment. Et il change tout.",
    cta: { label: "Voir l’ombrage", href: '/installation/ombrage' },
  },
  {
    title: "Combien de temps ça dure, au juste ?",
    text: "Panneaux, onduleur, fixation : trois durées de vie différentes à connaître.",
    cta: { label: "Voir la longévité", href: '/comprendre/longevite' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut savoir avant de choisir son onduleur.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Onduleur string ou micro-onduleur, lequel choisir ?",
    text: "L’onduleur string convient à la plupart des toitures sans ombrage significatif ; le micro-onduleur se justifie surtout en présence de sources d’ombrage partielles difficiles à éviter.",
    accent: true,
  },
  {
    title: "Combien de temps dure un onduleur ?",
    text: "Généralement 10 à 15 ans, sensiblement moins que les panneaux eux-mêmes (25-30 ans) : un remplacement à mi-vie de l’installation est à anticiper dans le budget.",
  },
  {
    title: "L’onduleur consomme-t-il de l’électricité ?",
    text: "Une part infime pour son propre fonctionnement, négligeable par rapport à l’énergie qu’il convertit.",
  },
  {
    title: "Où installer l’onduleur ?",
    text: "Dans un local ventilé, si possible frais, à une distance raisonnable des panneaux : l’éloignement augmente les pertes et le coût du câblage.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Que se passe-t-il si l’onduleur tombe en panne ?",
    answer:
      "L’installation cesse de produire de l’électricité utilisable jusqu’au remplacement : c’est la panne la plus fréquente sur une installation solaire, plus que les panneaux eux-mêmes.",
    open: true,
  },
  {
    question: "Le remplacement de l’onduleur est-il coûteux ?",
    answer:
      "C’est une dépense à prévoir sur la durée de vie de l’installation, à budgétiser dès le départ plutôt que de découvrir la surprise 10 à 15 ans plus tard.",
  },
  {
    question: "Un onduleur fait-il du bruit ?",
    answer:
      "Un léger bruit de ventilation est normal sur certains modèles, à prendre en compte dans le choix de l’emplacement, en évitant une chambre adjacente.",
  },
];

export const FINAL_CTA = {
  title: "Le bon onduleur dépend de votre toiture",
  text: "Notre équipe est certifiée Enphase : les micro-onduleurs, c'est notre spécialité.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
