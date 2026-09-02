import type { FaqItem, SectionCopy } from '../content';
import type { PageSeo } from '../seo';

/**
 * Pilier 2 — page « vue d'ensemble » d'Installation (`/installation`).
 *
 * Le pilier le plus large du sitemap : seize pages publiées, en trois temps —
 * ce qu'il faut vérifier avant (préparation), où poser les panneaux
 * (emplacements), et comment passer à l'acte. Le hub garde ces trois temps,
 * qui sont ceux du méga-menu : c'est un ORDRE, pas un classement thématique.
 *
 * Gabarit allégé (hero → transition → inventaire → FAQ → pont), même raison que
 * `comprendre.ts`.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * Le mot-clé principal (« installation panneaux solaires ») ouvre le titre : la
 * vue d'ensemble du pilier vise la requête générique, ses seize pages filles
 * visant chacune une question précise.
 */
export const SEO: PageSeo = {
  title: 'Installation de panneaux solaires en Belgique | Belgreen',
  description:
    'Toiture, nombre de panneaux, fixation, choix de l’installateur : les questions à trancher avant la pose, et le déroulé d’un chantier en une à deux journées.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Comment se passe l’installation de panneaux solaires ?',
  answer:
    'Trois questions dans l’ordre : votre toiture peut-elle les recevoir, où les poser, et qui les pose. Une installation résidentielle classique tient en une à deux journées de chantier. L’essentiel du travail se joue avant, dans l’étude.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  /* ⚠️ Photo empruntée à la page « Trouver un pro » faute de visuel dédié au
     hub (CLAUDE.md, « À compléter »). */
  imageAlt:
    'Installateurs posant des panneaux photovoltaïques sur une toiture inclinée',
} as const;

export const LEAD = {
  text: 'Orientation, nombre de panneaux, type de toiture, fixation : autant de questions qui se répondent avant le devis. Les seize pages ci-dessous les prennent une par une.',
} as const;

export const INDEX_COPY: SectionCopy = {
  overline: 'Le pilier en entier',
  title: 'De la toiture au chantier',
  intro: 'Ce qu’on vérifie avant, les emplacements possibles, et ce qui se passe le jour de la pose.',
};

export const FAQ: FaqItem[] = [
  {
    question: 'Combien de temps dure le chantier ?',
    answer:
      'Une à deux journées pour une installation résidentielle classique, échafaudage compris. Le raccordement et les démarches auprès du gestionnaire de réseau prennent, eux, quelques semaines de plus.',
    open: true,
  },
  {
    question: 'Ma toiture doit-elle être refaite avant ?',
    answer:
      'Si elle a moins de dix ans à vivre, oui : démonter puis remonter une installation coûte plus cher que d’attendre la réfection. C’est l’un des points qu’une étude sur place tranche en quelques minutes.',
  },
  {
    question: 'Faut-il un permis d’urbanisme ?',
    answer:
      'Dans la majorité des cas résidentiels, non : la pose en surimposition sur une toiture existante est généralement dispensée. Les exceptions concernent surtout les biens classés, les zones protégées et l’intégration en toiture. Votre commune reste l’autorité qui tranche.',
  },
  {
    question: 'Puis-je installer les panneaux moi-même ?',
    answer:
      'Techniquement oui pour certains montages, mais le raccordement au réseau doit être réalisé et déclaré par un professionnel agréé, et l’auto-installation vous prive d’une partie des garanties. La page « Installer soi-même » dit exactement ce qui est permis.',
  },
];

export const FINAL_CTA = {
  title: 'Votre toiture, combien de panneaux ?',
  text: "Surface, orientation, consommation : l'estimation vous donne l'ordre de grandeur en quelques questions. Vous parlez ensuite directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
