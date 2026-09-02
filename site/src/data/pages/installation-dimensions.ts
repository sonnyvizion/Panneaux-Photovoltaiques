import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { M2_PER_PANEL, POWER_DEFAULT, estimate } from '../../scripts/powerEstimate';

/**
 * Page 2.4 — « Dimensions » (`/installation/dimensions`).
 *
 * ⚠️ Le cahier note lui-même : « valeurs standards du marché, à recaler sur les
 * specs réelles des panneaux installés ». À VALIDER PAR LE CLIENT.
 *
 * ⚠️ Le visuel comparatif de surface demandé par le cahier n'est pas livré
 * (`2.4-dimensions-module.jpg`). La légende du module porte la comparaison en
 * texte, ce qui suffit à la faire comprendre.
 */

/**
 * L'installation de référence, celle que toute la page prend en exemple.
 *
 * ⚠️ SON NOMBRE DE PANNEAUX NE S'ÉCRIT PAS : il sort de `powerEstimate.ts`,
 * comme sur la page prix. Le « 14 panneaux » qui traversait cette page était
 * recopié à la main — il tombait juste, mais il n'aurait pas survécu à un
 * changement de `WC_PER_PANEL`, et la surface annoncée juste après aurait
 * continué de le suivre.
 */
const mid = estimate(POWER_DEFAULT);
const midSurface = mid.panels * M2_PER_PANEL;

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * « Dimensions panneau solaire » ouvre le titre ; « surface » capte la seconde
 * intention, celle du visiteur qui mesure sa toiture.
 */
export const SEO: PageSeo = {
  title: 'Dimensions d’un panneau solaire et surface | Belgreen',
  description: `Un panneau solaire mesure 1,7 à 1,9 m sur 1 à 1,13 m, soit environ ${M2_PER_PANEL} m². Calculez la surface de toiture nécessaire à votre installation, obstacles déduits.`,
};

export const HERO = {
  badge: 'Installation',
  title: 'Quelles dimensions pour une installation solaire ?',
  answer: `Un panneau solaire standard mesure environ 1,7 à 1,9 m de long sur 1 à 1,13 m de large, soit environ ${M2_PER_PANEL} m² par panneau. Une installation de ${mid.panels} panneaux nécessite donc environ ${midSurface} m² de toiture.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Vue rapprochée de panneaux solaires alignés sur une toiture',
} as const;

export const LEAD = {
  text: 'Avant de savoir combien de panneaux tiennent sur votre toit, il faut savoir de combien d’espace chacun a besoin.',
  note: 'L’espace nécessaire, en repères concrets.',
} as const;

export const MODULE = {
  title: `Ce que ${midSurface} m² représentent`,
  caption: `Une installation de ${mid.panels} panneaux occupe environ ${midSurface} m², l’équivalent d’une grande pièce à vivre, posée sur un pan de toiture. Ce n’est pas la surface totale du toit qui compte, mais la surface utile une fois retirés cheminée, fenêtres de toit et zones d’ombre.`,
  bridgeLabel: 'Ce qui tient sur votre toiture',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'L’espace nécessaire',
  intro: 'L’espace nécessaire, en repères concrets.',
};

/* ⚠️ Deux vraies mesures sur trois, mais « À prévoir » n'en était pas une —
   et la grille imposait de les lire comme trois grandeurs comparables alors
   que la troisième est une contrainte de pose. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'PANNEAU',
    title: `Environ ${M2_PER_PANEL} m² par unité`,
    text:
      'Un panneau standard mesure 1,7 à 1,9 m de long sur 1 à 1,13 m de large.',
  },
  {
    eyebrow: 'SURFACE',
    title: `${midSurface} m² pour ${mid.panels} panneaux`,
    text:
      'L’équivalent d’une grande pièce à vivre, posée sur un pan de toiture.',
  },
  {
    eyebrow: 'ESPACEMENT',
    title: 'Une marge à prévoir hors toit incliné',
    text:
      'Sur toit plat ou au sol, un espacement entre rangées évite les ombres portées d’une rangée sur l’autre.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'dimensions-liste.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Surface utile ≠ surface du toit',
    text: 'Cheminée, fenêtres de toit et zones d’ombre retirent souvent plusieurs mètres carrés exploitables.',
  },
  {
    title: 'Tous les panneaux ne se valent pas',
    text: 'Les modèles haute puissance sont parfois légèrement plus grands : à puissance égale, ils prennent moins de place au total.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de panneaux pour ma consommation ?',
    text: 'La surface donne un plafond ; la consommation donne la cible. Les deux se rencontrent rarement pile.',
    cta: { label: 'Voir le calcul', href: '/installation/nombre-de-panneaux' },
  },
  {
    title: 'Et le poids sur la charpente ?',
    text: 'Trente mètres carrés de panneaux, ça pèse. Mais beaucoup moins qu’on ne l’imagine.',
    cta: { label: 'Voir le poids', href: '/installation/poids' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions qu’on se pose sur l’espace disponible.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Ma toiture est petite, combien de panneaux puis-je installer ?',
    text: 'Ça dépend de la surface utile réelle une fois les obstacles retirés (cheminée, fenêtre de toit, zones d’ombre), souvent moins que la surface totale du toit.',
    accent: true,
  },
  {
    title: 'Les panneaux ont-ils tous la même taille ?',
    text: 'Non, ça varie selon le fabricant et la puissance du panneau : les modèles haute puissance sont parfois légèrement plus grands.',
  },
  {
    title: 'Faut-il laisser de l’espace entre les panneaux ?',
    text: 'Sur un toit incliné classique, très peu. Sur un toit plat ou au sol, l’espacement entre rangées devient nécessaire pour éviter les ombres portées.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Ma toiture est petite, combien de panneaux puis-je installer ?',
    answer:
      'Ça dépend de la surface utile réelle, une fois retirés les obstacles : souvent moins que la surface totale du toit.',
    open: true,
  },
  {
    question: 'Les panneaux ont-ils tous la même taille ?',
    answer: 'Non, la taille varie selon le fabricant et la puissance du modèle.',
  },
  {
    question: 'Faut-il laisser de l’espace entre les panneaux ?',
    answer:
      'Très peu sur un toit incliné. Sur un toit plat ou au sol, l’espacement entre rangées est nécessaire pour éviter les ombres portées.',
  },
];

export const FINAL_CTA = {
  title: 'Entrez votre surface de toiture, on calcule ce qui y tient',
  text: "Vous parlez directement à l'équipe qui installe. Pas d'intermédiaire.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
