import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.10 — « Intégré toiture (BIPV) » (`/installation/bipv`).
 *
 * Module : `FigureModule` (famille E). ⚠️ L'illustration comparative
 * « classique vs intégré » n'est pas livrée (`2.10-bipv-module.jpg`).
 *
 * ⚠️ NOTE DEV DU CAHIER, non traitée ici : « coefficient de prix spécifique BIPV
 * à prévoir, le module standard sous-estimerait le coût réel ». Le pont final de
 * cette page mène donc au simulateur SANS promesse de chiffre, et aucun montant
 * n'est avancé sur la page. À reprendre quand le coefficient sera fourni —
 * c'est une correction du simulateur, pas de cette page.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * Le sigle ouvre le titre mais ne le porte pas seul : « panneaux solaires
 * intégrés à la toiture » est la formulation réellement tapée, « BIPV » celle
 * qui figure sur les devis.
 */
export const SEO: PageSeo = {
  title: 'BIPV : panneaux solaires intégrés à la toiture | Belgreen',
  description:
    'Le BIPV remplace le revêtement de toiture au lieu de s’y poser : aspect affleurant apprécié en zone protégée, rendement comparable, mais surcoût à anticiper.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Le BIPV : des panneaux solaires intégrés à la toiture',
  answer:
    'Le BIPV (Building Integrated Photovoltaics) intègre les panneaux directement dans le revêtement de toiture, comme des tuiles solaires, au lieu de les poser par-dessus. Plus esthétique, mais plus coûteux qu’une installation classique.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toiture dont les panneaux solaires sont intégrés au ras de la couverture',
} as const;

export const LEAD = {
  text: 'Pour qui privilégie l’esthétique ou doit respecter des contraintes patrimoniales, le BIPV est une alternative à connaître, à condition d’en accepter le surcoût.',
  note: 'Intégré ou posé par-dessus : la différence.',
} as const;

export const MODULE = {
  title: 'Intégré, pas superposé',
  caption:
    'Une installation classique se pose sur la couverture existante, qui reste en place. Le BIPV la remplace : les modules deviennent la toiture elle-même. D’où l’aspect affleurant, apprécié en zone protégée. Et d’où le surcoût, puisque le produit assume deux fonctions au lieu d’une. Le rendement reste comparable à un panneau classique à orientation égale.',
  bridgeLabel: 'Chiffrez votre projet',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui distingue le BIPV',
  intro: 'Ce qui distingue le BIPV d’une installation classique.',
};

export const FIGURES: Figure[] = [
  { label: 'Intégration', value: 'Remplace', note: 'le revêtement de toiture, au lieu de s’y poser', tone: 'lime' },
  { label: 'Esthétique', value: 'Affleurant', note: 'adapté aux zones protégées ou patrimoniales', tone: 'grey' },
  { label: 'Coût', value: 'Plus élevé', note: 'qu’une installation classique en surimposition', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Rendement comparable',
    text: 'À orientation égale, globalement équivalent, même si certaines solutions BIPV restent sous les panneaux classiques les plus performants.',
  },
  {
    title: 'Zone protégée',
    text: 'Pas systématiquement obligatoire, mais souvent recommandé ou exigé par les autorités locales.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Comment se fixe une installation classique ?',
    text: 'Rails sur crochets, lestage, intégration : trois familles, trois logiques.',
    cta: { label: 'Voir la fixation', href: '/installation/fixation' },
  },
  {
    title: 'Et le budget d’une installation standard ?',
    text: 'Le BIPV se compare toujours à une installation classique : voilà le point de départ.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les pages qui prolongent le sujet.',
};

/*
 * « Creuser le sujet » en CARTES-LIENS — meme motif que sur les quatorze pages
 * traitees le 2026-09-03 : ce bloc reposait les questions de la FAQ, trois
 * cents pixels plus haut. Voir `pages-contenu.md` §4 et §5.
 */
export const TOPICS: TopicCard[] = [
  {
    title: 'Les technologies de panneaux',
    text: 'Monocristallin, bifacial, amorphe : ce qui distingue les modules avant même leur intégration.',
    href: '/comprendre/types-de-panneaux',
    accent: true,
  },
  {
    title: 'Poser sur la toiture, ou dedans',
    text: 'Les trois systèmes de fixation, dont l’intégration au bâti.',
    href: '/installation/fixation',
  },
  {
    title: 'Le prix d’une installation classique',
    text: 'Le coût au kWc en 2026, la référence à laquelle comparer un devis BIPV.',
    href: '/rentabilite-prix',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Le BIPV est-il vraiment plus cher qu’une installation classique ?',
    answer:
      'Oui, généralement : il remplace un matériau de toiture en plus de produire de l’électricité, et le coût intègre les deux fonctions.',
    open: true,
  },
  {
    question: 'Le rendement du BIPV est-il le même que des panneaux classiques ?',
    answer:
      'Globalement comparable à orientation égale, avec parfois un léger retrait par rapport aux modèles classiques les plus performants.',
  },
  {
    question: 'Le BIPV est-il obligatoire en zone protégée ?',
    answer:
      'Pas systématiquement, mais souvent recommandé ou exigé par les autorités locales pour préserver l’aspect du bâti.',
  },
];

export const FINAL_CTA = {
  title: 'Le BIPV vous intéresse ? Parlons-en',
  text: "C'est un projet à chiffrer au cas par cas. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
