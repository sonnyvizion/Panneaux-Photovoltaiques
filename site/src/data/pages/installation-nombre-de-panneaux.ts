import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Page 2.2 — « Nombre de panneaux » (`/installation/nombre-de-panneaux`).
 *
 * Module : `SliderCalculator` en modèle `power`, exactement celui de la page
 * prix. Le cahier le demande explicitement (« `billSlider` réutilisé, même
 * composant que la page Prix, texte de transition différent ») — c'est le cas
 * type visé par le registre : zéro ligne de code, un fichier de données.
 */

export const HERO = {
  badge: 'Installation',
  title: 'Combien de panneaux solaires faut-il pour ma maison ?',
  answer:
    "Le nombre de panneaux dépend de votre consommation annuelle et de la puissance de chaque panneau (environ 400 à 450 Wc aujourd'hui). Pour une consommation moyenne de 3 800 kWh/an, comptez généralement 12 à 14 panneaux.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toiture résidentielle couverte d’une rangée régulière de panneaux solaires noirs',
} as const;

export const LEAD = {
  text: "« Combien de panneaux » est souvent la première question concrète qu'on se pose — voici comment ce chiffre se calcule, et pourquoi il n'est pas fixe.",
  note: 'Testez ci-dessous comment le nombre évolue selon la puissance.',
} as const;

export const WIDGET = {
  title: 'Puissance installée',
  sliderLabel: 'Puissance installée, en kilowatts-crête',
  outputs: [
    { label: 'Prix estimé' },
    { label: 'Panneaux', accent: true },
    { label: 'Production/an' },
  ],
  bridgeLabel: 'Combien en tiendrait-il sur votre toit ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: '',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui détermine le nombre',
  intro: 'Ce qui détermine le nombre de panneaux.',
};

export const FIGURES: Figure[] = [
  { label: 'Panneau standard', value: '400-450 Wc', note: 'la puissance courante aujourd’hui', tone: 'lime' },
  { label: 'Pour 6 kWc', value: '13-14', note: 'panneaux de cette puissance', tone: 'grey' },
  { label: 'Limite réelle', value: 'La toiture', note: 'sa surface disponible, pas seulement votre consommation', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Une consommation moyenne',
    text: 'Pour 3 800 kWh par an, comptez généralement 12 à 14 panneaux.',
  },
  {
    title: 'Les obstacles comptent',
    text: 'Cheminée, fenêtre de toit, zones d’ombre : la surface utile est souvent inférieure à la surface totale.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de place faut-il par panneau ?',
    text: 'Environ 2 m² pièce — c’est ce qui décide du nombre que votre toiture peut vraiment accueillir.',
    cta: { label: 'Voir les dimensions', href: '/installation/dimensions' },
  },
  {
    title: 'Et le prix, il suit le nombre ?',
    text: 'Pas proportionnellement : une partie du chantier ne dépend pas du nombre de panneaux.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions qu’on se pose une fois le calcul fait.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Plus de panneaux, c’est toujours mieux ?',
    text: 'Non — au-delà de votre consommation réelle plus une marge raisonnable, les panneaux supplémentaires produisent un surplus faiblement valorisé (tarif d’injection ou prosumer selon la région), donc moins rentable.',
    accent: true,
  },
  {
    title: 'Puis-je ajouter des panneaux plus tard ?',
    text: 'Techniquement oui, mais ça implique une nouvelle déclaration et parfois un changement d’onduleur si la puissance totale dépasse sa capacité.',
  },
  {
    title: 'Le nombre change-t-il selon la marque ?',
    text: 'Oui, un panneau haute puissance (500 Wc et plus) atteint la même puissance totale avec moins d’unités, ce qui peut compter sur une petite toiture.',
  },
  {
    title: 'Faut-il toujours viser sa consommation exacte ?',
    text: 'Pas nécessairement — une installation légèrement surdimensionnée peut avoir du sens si vous prévoyez une pompe à chaleur ou une voiture électrique.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Plus de panneaux, c’est toujours mieux ?',
    answer: 'Non, au-delà d’un certain seuil le surplus est faiblement valorisé.',
    open: true,
  },
  {
    question: 'Puis-je ajouter des panneaux plus tard ?',
    answer: 'Oui, avec une nouvelle déclaration et parfois un changement d’onduleur.',
  },
  {
    question: 'Le nombre de panneaux change-t-il selon la marque ?',
    answer: 'Oui, les panneaux haute puissance réduisent le nombre nécessaire.',
  },
];

export const FINAL_CTA = {
  title: 'Le nombre exact dépend de votre toiture et de votre consommation',
  text: "On le calcule avec vous. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
