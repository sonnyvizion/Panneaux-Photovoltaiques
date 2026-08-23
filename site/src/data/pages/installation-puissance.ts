import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Page 2.3 — « Puissance (kWc) » (`/installation/puissance`).
 *
 * Module : `FigureModule` (famille E) — le cahier demande un « schéma
 * illustratif statique kWc vs kWh ».
 *
 * ⚠️ Le schéma n'est pas livré. Le module reprend la photo du hero et porte
 * l'explication dans sa légende : c'est le texte qui fait le travail
 * pédagogique, l'image y est décorative. Schéma attendu :
 * `2.3-puissance-module.jpg`.
 */

export const HERO = {
  badge: 'Installation',
  title: 'Le kWc, qu’est-ce que c’est et de combien ai-je besoin ?',
  answer:
    'Le kWc (kilowatt-crête) mesure la puissance maximale qu’une installation peut produire dans des conditions standardisées de test. Les installations résidentielles belges vont généralement de 3 à 10 kWc.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Panneaux solaires en toiture sous un ciel dégagé',
} as const;

export const LEAD = {
  text: 'kWc, kWh — deux unités qui se ressemblent mais ne mesurent pas la même chose. Voici la différence, en clair.',
  note: 'La différence entre les deux, en une image.',
} as const;

export const MODULE = {
  title: 'kWc et kWh : la puissance et l’énergie',
  caption:
    'Le kWc est une capacité : ce que l’installation peut produire au mieux, mesuré en conditions de test (1000 W/m², 25 °C). Le kWh est un résultat : ce qu’elle produit vraiment, qui varie avec la météo, la saison et l’heure. On achète des kWc, on consomme des kWh.',
  bridgeLabel: 'Quelle puissance vous faut-il ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Deux unités à ne pas confondre',
  intro: 'Deux unités à ne pas confondre.',
};

export const FIGURES: Figure[] = [
  { label: 'kWc', value: 'Puissance', note: 'le maximum théorique de l’installation', tone: 'lime' },
  { label: 'kWh', value: 'Énergie', note: 'ce qui est réellement produit sur une période', tone: 'grey' },
  { label: 'Gamme résidentielle', value: '3-10 kWc', note: 'en Belgique', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Conditions de test',
    text: '1000 W/m² et 25 °C : des conditions de laboratoire, jamais celles d’une vraie journée.',
  },
  {
    title: 'Le prix n’est pas proportionnel',
    text: 'Le coût par Wc diminue quand la puissance installée augmente — une partie du chantier ne dépend pas du nombre de panneaux.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de panneaux pour ces kWc ?',
    text: 'Une puissance se traduit en nombre de panneaux, et ce nombre dépend de leur puissance unitaire.',
    cta: { label: 'Voir le calcul', href: '/installation/nombre-de-panneaux' },
  },
  {
    title: 'Et ça coûte combien, par kWc ?',
    text: 'Le prix au watt-crête baisse avec la taille de l’installation — voyez les fourchettes 2026.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce que ça change concrètement pour votre projet.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Quelle est la différence entre kWc et kWh ?',
    text: 'Le kWc est une capacité maximale mesurée en conditions de test standardisées (1000 W/m², 25 °C) ; le kWh est l’énergie que votre installation produit réellement, qui varie selon la météo, la saison et l’heure.',
    accent: true,
  },
  {
    title: 'Comment savoir combien de kWc me faut-il ?',
    text: 'Ça dépend de votre consommation annuelle, de votre surface de toiture disponible et de son orientation — c’est exactement ce que calcule le simulateur.',
  },
  {
    title: 'Le prix est-il proportionnel à la puissance ?',
    text: 'Pas tout à fait — le prix par Wc diminue généralement à mesure que la puissance installée augmente (économies d’échelle).',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Quelle est la différence entre kWc et kWh ?',
    answer:
      'Le kWc est une puissance maximale théorique, mesurée en laboratoire. Le kWh est l’énergie réellement produite, qui dépend de la météo, de la saison et de l’heure.',
    open: true,
  },
  {
    question: 'Comment savoir combien de kWc me faut-il ?',
    answer:
      'Ça dépend de votre consommation, de la surface de toiture disponible et de son orientation. C’est précisément ce que le simulateur calcule.',
  },
  {
    question: 'Une installation plus puissante coûte-t-elle proportionnellement plus cher ?',
    answer:
      'Non. Le prix au watt-crête baisse quand la puissance augmente, parce qu’une partie du chantier est fixe.',
  },
];

export const FINAL_CTA = {
  title: 'Quelle puissance vous faut-il vraiment ?',
  text: "On la calcule à partir de votre consommation et de votre toiture. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
