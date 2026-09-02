import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import {
  KWH_PER_KWC_YEAR,
  POWER_DEFAULT,
  WC_PER_PANEL,
  estimate,
  formatNumber,
} from '../../scripts/powerEstimate';

/**
 * Page 2.2 — « Nombre de panneaux » (`/installation/nombre-de-panneaux`).
 *
 * Module : `SliderCalculator` en modèle `power`, exactement celui de la page
 * prix. Le cahier le demande explicitement (« `billSlider` réutilisé, même
 * composant que la page Prix, texte de transition différent ») — c'est le cas
 * type visé par le registre : zéro ligne de code, un fichier de données.
 *
 * ⚠️ AUCUN NOMBRE DE PANNEAUX N'EST ÉCRIT À LA MAIN ICI. C'était la page du
 * site qui en recopiait le plus, et deux de ces valeurs étaient fausses au
 * regard de son propre modèle : « environ 400 à 450 Wc » là où `WC_PER_PANEL`
 * vaut 430, et surtout « 12 à 14 panneaux » pour 3 800 kWh/an, alors que le
 * productible du site (`KWH_PER_KWC_YEAR`) donne 4,2 kWc, soit 10 panneaux —
 * une page qui promettait 40 % de panneaux de plus que ce que le curseur juste
 * en dessous affichait.
 */

/** Consommation annuelle du ménage belge de référence, en kWh. ⚠️ À valider. */
const AVERAGE_CONSUMPTION = 3800;

/** L'installation de référence de la page, et celle qui couvre cette conso. */
const mid = estimate(POWER_DEFAULT);
const averagePanels = estimate(AVERAGE_CONSUMPTION / KWH_PER_KWC_YEAR).panels;

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * « Combien de panneaux solaires » est la première requête concrète du parcours,
 * et la description répond par un chiffre plutôt que par une promesse de
 * réponse : c'est ce qui la distingue des comparateurs sur la même page de
 * résultats.
 */
export const SEO: PageSeo = {
  title: 'Combien de panneaux solaires pour ma maison ? | Belgreen',
  description: `Comptez ${mid.panels} panneaux de ${WC_PER_PANEL} Wc pour une installation de ${POWER_DEFAULT} kWc, ${averagePanels} pour ${formatNumber(AVERAGE_CONSUMPTION)} kWh/an. Le nombre exact dépend de votre toiture et de son orientation.`,
};

export const HERO = {
  badge: 'Installation',
  title: 'Combien de panneaux solaires faut-il pour ma maison ?',
  answer: `Le nombre de panneaux dépend de votre consommation annuelle et de la puissance de chaque panneau (${WC_PER_PANEL} Wc pour un module courant en 2026). Pour une consommation moyenne de ${formatNumber(AVERAGE_CONSUMPTION)} kWh/an, comptez une dizaine de panneaux.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toiture résidentielle couverte d’une rangée régulière de panneaux solaires noirs',
} as const;

export const LEAD = {
  text: "« Combien de panneaux » est souvent la première question concrète qu'on se pose : voici comment ce chiffre se calcule, et pourquoi il n'est pas fixe.",
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
  { label: 'Panneau standard', value: `${WC_PER_PANEL} Wc`, note: 'la puissance courante en 2026', tone: 'lime' },
  { label: `Pour ${POWER_DEFAULT} kWc`, value: `${mid.panels}`, note: 'panneaux de cette puissance', tone: 'grey' },
  { label: 'Limite réelle', value: 'La toiture', note: 'sa surface disponible, pas seulement votre consommation', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    /* ⚠️ Dérivé, jamais recopié : `AVERAGE_CONSUMPTION / KWH_PER_KWC_YEAR`
       donne la puissance, `estimate()` le nombre de panneaux. La version
       manuscrite annonçait « 12 à 14 » — le compte du curseur pour 6 kWc,
       collé sur une consommation qui n'en demande que dix. */
    title: 'Une consommation moyenne',
    text: `Pour ${formatNumber(AVERAGE_CONSUMPTION)} kWh par an, comptez environ ${averagePanels} panneaux.`,
  },
  {
    title: 'Les obstacles comptent',
    text: 'Cheminée, fenêtre de toit, zones d’ombre : la surface utile est souvent inférieure à la surface totale.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de place faut-il par panneau ?',
    text: 'Environ 2 m² pièce : c’est ce qui décide du nombre que votre toiture peut vraiment accueillir.',
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
    text: 'Non : au-delà de votre consommation réelle plus une marge raisonnable, les panneaux supplémentaires produisent un surplus faiblement valorisé (tarif d’injection ou prosumer selon la région), donc moins rentable.',
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
    text: 'Pas nécessairement : une installation légèrement surdimensionnée peut avoir du sens si vous prévoyez une pompe à chaleur ou une voiture électrique.',
  },
];

/* ⚠️ Bloc balisé `FAQPage` : ce sont ces questions-là que Google peut afficher
   telles quelles. Les trois réponses tenaient en une ligne chacune — trop court
   pour être repris en extrait, et surtout muet sur le chiffre que la question
   demande. Elles répondent maintenant AVEC le chiffre du modèle. */
export const FAQ: FaqItem[] = [
  {
    question: `Combien de panneaux solaires pour ${formatNumber(AVERAGE_CONSUMPTION)} kWh par an ?`,
    answer: `Environ ${averagePanels} panneaux de ${WC_PER_PANEL} Wc, soit une installation d’un peu plus de 4 kWc. Le chiffre monte vite si votre toiture est mal orientée ou partiellement ombragée, et descend si vous consommez moins.`,
    open: true,
  },
  {
    question: 'Plus de panneaux, c’est toujours mieux ?',
    answer:
      'Non. Au-delà de votre consommation réelle plus une marge, la production supplémentaire part en surplus : faiblement valorisé par le tarif d’injection, et facturé en plus par le tarif prosumer en Wallonie.',
  },
  {
    question: 'Puis-je ajouter des panneaux plus tard ?',
    answer:
      'Oui, mais l’ajout se redéclare au gestionnaire de réseau, et l’onduleur doit pouvoir encaisser la puissance totale. Sinon il faut le remplacer, ce qui pèse lourd dans le coût de l’extension.',
  },
  {
    question: 'Le nombre de panneaux change-t-il selon la marque ?',
    answer: `Oui. Le site raisonne sur un module courant de ${WC_PER_PANEL} Wc ; un panneau haute puissance (500 Wc et plus) atteint la même puissance totale avec moins d’unités, ce qui compte sur une petite toiture.`,
  },
];

export const FINAL_CTA = {
  title: 'Le nombre exact dépend de votre toiture et de votre consommation',
  text: "On le calcule avec vous. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
