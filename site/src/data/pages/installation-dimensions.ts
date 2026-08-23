import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

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

export const HERO = {
  badge: 'Installation',
  title: 'Quelles dimensions pour une installation solaire ?',
  answer:
    'Un panneau solaire standard mesure environ 1,7 à 1,9 m de long sur 1 à 1,13 m de large, soit environ 1,9 à 2 m² par panneau. Une installation de 14 panneaux nécessite donc environ 27 à 30 m² de toiture.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Vue rapprochée de panneaux solaires alignés sur une toiture',
} as const;

export const LEAD = {
  text: 'Avant de savoir combien de panneaux tiennent sur votre toit, il faut savoir de combien d’espace chacun a besoin.',
  note: 'L’espace nécessaire, en repères concrets.',
} as const;

export const MODULE = {
  title: 'Ce que 30 m² représentent',
  caption:
    'Une installation de 14 panneaux occupe environ 27 à 30 m² — l’équivalent d’une grande pièce à vivre, posée sur un pan de toiture. Ce n’est pas la surface totale du toit qui compte, mais la surface utile une fois retirés cheminée, fenêtres de toit et zones d’ombre.',
  bridgeLabel: 'Ce qui tient sur votre toiture',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'L’espace nécessaire',
  intro: 'L’espace nécessaire, en repères concrets.',
};

export const FIGURES: Figure[] = [
  { label: 'Un panneau', value: '1,9-2 m²', note: 'environ 1,7 × 1,1 m', tone: 'lime' },
  { label: '14 panneaux', value: '27-30 m²', note: 'de toiture utile', tone: 'grey' },
  { label: 'Espacement', value: 'À prévoir', note: 'surtout hors toit incliné classique', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Surface utile ≠ surface du toit',
    text: 'Cheminée, fenêtres de toit et zones d’ombre retirent souvent plusieurs mètres carrés exploitables.',
  },
  {
    title: 'Tous les panneaux ne se valent pas',
    text: 'Les modèles haute puissance sont parfois légèrement plus grands — à puissance égale, ils prennent moins de place au total.',
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
    text: 'Trente mètres carrés de panneaux, ça pèse — beaucoup moins qu’on ne l’imagine.',
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
    text: 'Ça dépend de la surface utile réelle une fois les obstacles retirés (cheminée, fenêtre de toit, zones d’ombre) — souvent moins que la surface totale du toit.',
    accent: true,
  },
  {
    title: 'Les panneaux ont-ils tous la même taille ?',
    text: 'Non, ça varie selon le fabricant et la puissance du panneau — les modèles haute puissance sont parfois légèrement plus grands.',
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
      'Ça dépend de la surface utile réelle, une fois retirés les obstacles — souvent moins que la surface totale du toit.',
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
