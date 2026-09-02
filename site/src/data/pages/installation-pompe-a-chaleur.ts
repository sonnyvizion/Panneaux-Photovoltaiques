import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.18 — « Pompe à chaleur » (`/installation/pompe-a-chaleur`).
 * Module : `FigureModule` (famille E). ⚠️ Schéma de flux non livré
 * (`2.18-pompe-a-chaleur-module.jpg`) — la légende porte l'explication.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 */
export const SEO: PageSeo = {
  title: 'Panneaux solaires et pompe à chaleur | Belgreen',
  description:
    'Coupler une pompe à chaleur à vos panneaux fait grimper l’autoconsommation : l’électricité produite chauffe la maison au lieu de partir au réseau à bas prix.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Panneaux solaires et pompe à chaleur : la combinaison gagnante',
  answer:
    'Combiner panneaux solaires et pompe à chaleur permet d’augmenter significativement votre taux d’autoconsommation : l’électricité produite en journée alimente directement le chauffage plutôt que d’être réinjectée au réseau à faible valeur.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Unité extérieure de pompe à chaleur au pied d’une maison équipée de panneaux solaires',
} as const;

export const LEAD = {
  text: 'Deux investissements qui se renforcent l’un l’autre — la pompe à chaleur consomme de l’électricité au bon moment pour profiter pleinement de votre production solaire.',
  note: 'Le flux, en une image.',
} as const;

export const MODULE = {
  title: 'Consommer sa production au lieu de l’injecter',
  caption:
    'Sans pompe à chaleur, une bonne part de la production de midi part sur le réseau, où elle vaut peu. Avec elle, cette même électricité alimente le chauffage au moment où elle est produite. Le kWh ne change pas : c’est sa valeur pour vous qui change.',
  bridgeLabel: 'Dimensionnez avec votre PAC',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Pourquoi ça marche ensemble',
  intro: 'Pourquoi cette combinaison a du sens.',
};

/* ⚠️ « En hausse », « Mi-saison », « À adapter » : aucun chiffre, et trois
   facettes du même raisonnement — pourquoi la pompe à chaleur et le solaire
   se complètent. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'AUTOCONSOMMATION',
    title: 'Elle augmente significativement',
    text:
      'La pompe à chaleur consomme une part importante de votre production solaire directement, plutôt que de l’injecter au réseau.',
  },
  {
    eyebrow: 'TIMING',
    title: 'Une coïncidence qui joue en votre faveur',
    text:
      'La production solaire est la plus forte en mi-saison, exactement quand les besoins de chauffage restent présents.',
  },
  {
    eyebrow: 'DIMENSIONNEMENT',
    title: 'À adapter si la PAC est prévue',
    text:
      'Une installation pensée avec la pompe à chaleur dès le départ maximise l’autoconsommation.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'pompe-a-chaleur-liste.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Le plus gros poste électrique',
    text: 'Une PAC est généralement la consommation électrique la plus importante d’une maison équipée.',
  },
  {
    title: 'L’ajouter après reste possible',
    text: 'Mais l’autoconsommation sera moins optimisée qu’avec un dimensionnement pensé dès le départ.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Quelle puissance viser avec une PAC ?',
    text: 'Un surdimensionnement raisonnable devient pertinent dès qu’une PAC entre dans l’équation.',
    cta: { label: 'Comprendre le kWc', href: '/installation/puissance' },
  },
  {
    title: 'Et une voiture électrique en plus ?',
    text: 'Même logique : un gros poste de consommation transformé en autoconsommation.',
    cta: { label: 'Voir la recharge solaire', href: '/installation/voiture-electrique' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qu’il faut anticiper si vous avez ou prévoyez une PAC.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Faut-il surdimensionner l’installation solaire ?',
    text: 'C’est souvent pertinent, une PAC étant un des postes de consommation électrique les plus importants du foyer — une puissance solaire plus généreuse maximise l’autoconsommation.',
    accent: true,
  },
  {
    title: 'Une pompe à chaleur consomme-t-elle beaucoup ?',
    text: 'Oui, c’est généralement le poste de consommation électrique le plus important d’une maison équipée, d’où l’intérêt de la coupler au solaire.',
  },
  {
    title: 'Peut-on ajouter une PAC après coup ?',
    text: 'Oui, mais l’autoconsommation sera moins optimisée qu’avec un dimensionnement pensé dès le départ.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Faut-il surdimensionner l’installation solaire pour une pompe à chaleur ?',
    answer:
      'C’est souvent pertinent : la PAC est un gros poste de consommation, et une puissance plus généreuse maximise l’autoconsommation.',
    open: true,
  },
  {
    question: 'Une pompe à chaleur consomme-t-elle beaucoup d’électricité ?',
    answer:
      'Oui, c’est généralement le premier poste électrique d’une maison équipée — d’où l’intérêt de la coupler au solaire.',
  },
  {
    question: 'Peut-on ajouter une pompe à chaleur après coup ?',
    answer:
      'Oui, mais l’autoconsommation sera moins optimisée qu’avec un dimensionnement prévu dès le départ.',
  },
];

export const FINAL_CTA = {
  title: 'Simulez votre installation en tenant compte de votre PAC',
  text: "Le dimensionnement change quand le chauffage est électrique. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
