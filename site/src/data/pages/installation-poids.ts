import type { Bridge, EssentialsEditorial, Fact, FaqItem, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { POWER_DEFAULT, estimate } from '../../scripts/powerEstimate';

/**
 * Page 2.5 — « Poids » (`/installation/poids`).
 *
 * ⚠️ SANS MODULE, sur prescription du cahier (« aucun — accordéon simple
 * suffit »). Le gabarit passe du chapô à « L'essentiel ».
 */

/**
 * L'installation de référence de la page, et son poids.
 *
 * ⚠️ Le NOMBRE de panneaux vient de `powerEstimate.ts` ; seul le poids unitaire
 * est écrit ici, faute de constante — c'est une caractéristique produit, pas un
 * paramètre du modèle. ⚠️ À VALIDER PAR LE CLIENT sur les modules réellement
 * posés (CLAUDE.md § « À compléter »).
 */
const PANEL_WEIGHT_MIN = 20;
const PANEL_WEIGHT_MAX = 22;
const mid = estimate(POWER_DEFAULT);
const totalMin = mid.panels * PANEL_WEIGHT_MIN;
const totalMax = mid.panels * PANEL_WEIGHT_MAX;

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * « Poids panneaux solaires toiture » est une requête d'INQUIÉTUDE : la
 * description doit donc chiffrer ET rassurer, sinon elle ne se distingue pas
 * des dix autres résultats.
 */
export const SEO: PageSeo = {
  title: 'Poids des panneaux solaires sur la toiture | Belgreen',
  description: `Un panneau solaire pèse ${PANEL_WEIGHT_MIN} à ${PANEL_WEIGHT_MAX} kg, soit ${totalMin} à ${totalMax} kg pour ${mid.panels} panneaux, répartis sur toute la toiture. Quand faut-il vraiment vérifier la charpente ?`,
};

export const HERO = {
  badge: 'Installation',
  title: 'Les panneaux solaires, quel poids sur ma toiture ?',
  answer: `Un panneau solaire pèse environ ${PANEL_WEIGHT_MIN} à ${PANEL_WEIGHT_MAX} kg. Pour une installation de ${mid.panels} panneaux, le poids total avoisine ${totalMin} à ${totalMax} kg, réparti sur toute la toiture, largement dans la capacité de charge de la plupart des toitures belges.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Charpente et toiture d’une maison belge vue de l’extérieur',
} as const;

export const LEAD = {
  text: 'Une inquiétude fréquente, rarement justifiée : voici quand le poids devient vraiment un sujet, et quand il ne l’est pas.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Avant de s’inquiéter',
  intro: 'Ce qu’il faut vérifier avant de s’inquiéter.',
};

/* ⚠️ La carte chiffre unique et son texte fusionnent : « 20-22 kg » ne se
   comprend qu'avec la répartition sur la toiture, et les séparer forçait à
   lire deux fois la même idée. */
export const FIGURES: Figure[] = [];

export const EDITORIAL: EssentialsEditorial = {
  title: 'Poids',
  text: `Un panneau solaire pèse environ ${PANEL_WEIGHT_MIN} à ${PANEL_WEIGHT_MAX} kg, soit ${totalMin} à ${totalMax} kg pour une installation de ${mid.panels} panneaux. Ce poids se répartit sur toute la surface du toit, jamais en un seul point : une charpente en bon état le supporte sans difficulté. Seules les toitures anciennes ou déjà fragilisées méritent une vérification préalable, généralement une simple inspection visuelle plutôt qu’une étude structurelle poussée.`,
};

/* Photo en cours de génération : emplacement nommé en attendant. */
export const EDITORIAL_IMAGE = 'poids-editorial.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Une charpente saine suffit',
    text: 'Un renfort est rarement nécessaire quand la charpente est en bon état.',
  },
  {
    title: 'Une vérification visuelle suffit',
    text: 'Une étude structurelle poussée n’est nécessaire que pour les cas douteux.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Comment les panneaux sont-ils fixés ?',
    text: 'C’est la fixation, pas le poids, qui décide de ce que subit vraiment votre toiture.',
    cta: { label: 'Voir la fixation', href: '/installation/fixation' },
  },
  {
    title: 'Et sur un toit plat ?',
    text: 'Le lestage y ajoute du poids mais évite tout perçage de l’étanchéité.',
    cta: { label: 'Voir le toit plat', href: '/installation/toit-plat' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions qu’on nous pose sur la solidité du toit.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Ma toiture doit-elle être renforcée avant l’installation ?',
    text: 'Rarement pour une charpente en bon état : c’est surtout un sujet pour les toitures anciennes ou déjà fragilisées.',
    accent: true,
  },
  {
    title: 'Le poids est-il un problème pour un toit plat ?',
    text: 'Un peu plus qu’en toiture inclinée à cause du système de lestage, mais ça reste dans les capacités standards de la plupart des toits plats résidentiels.',
  },
  {
    title: 'Comment savoir si ma charpente peut supporter des panneaux ?',
    text: 'Une vérification visuelle par un professionnel suffit dans la grande majorité des cas : une étude structurelle poussée n’est nécessaire que pour les cas douteux.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Ma toiture doit-elle être renforcée avant l’installation ?',
    answer: 'Rarement, si la charpente est en bon état. C’est surtout un sujet pour les toitures anciennes.',
    open: true,
  },
  {
    question: 'Le poids est-il un problème pour un toit plat ?',
    answer:
      'Un peu plus qu’en toiture inclinée à cause du lestage, mais ça reste dans les capacités standards des toits plats résidentiels.',
  },
  {
    question: 'Comment savoir si ma charpente peut supporter des panneaux ?',
    answer:
      'Une vérification visuelle par un professionnel suffit dans la grande majorité des cas.',
  },
];

export const FINAL_CTA = {
  title: 'Un doute sur votre toiture ? On l’évalue gratuitement',
  text: "Notre équipe passe voir, sans engagement. Vous parlez directement à ceux qui installent.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
