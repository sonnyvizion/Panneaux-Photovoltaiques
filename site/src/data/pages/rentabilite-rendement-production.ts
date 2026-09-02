import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { KWH_PER_KWC_YEAR, POWER_DEFAULT, estimate, formatNumber } from '../../scripts/powerEstimate';

/**
 * Page 3.2 — « Rendement & production » (`/rentabilite-prix/rendement`).
 *
 * Module : `SliderCalculator` en modèle `power`, comme la page prix — mais
 * l'accent passe sur PRODUCTION/AN. La donnée mise en avant doit correspondre au
 * sujet de la page : c'est la même règle qui a fait accentuer « Panneaux » sur
 * la page 2.2. Un composant, trois pages, trois drapeaux de données.
 *
 * ⚠️ Les chiffres du texte sont DÉRIVÉS de `powerEstimate` : le « 5 400 kWh pour
 * 6 kWc » du cahier et le « 900 kWh/kWc » sont les mêmes constantes que le
 * module affiche juste en dessous.
 */

const standard = estimate(POWER_DEFAULT);

/**
 * Métadonnées de tête de page — contraintes dans `data/seo.ts`, vérifiées au build.
 *
 * La description reprend les constantes plutôt que de les recopier, comme le
 * reste du fichier : le jour où `KWH_PER_KWC_YEAR` bouge, c'est aussi ce que
 * Google affiche sous le lien qui suit.
 */
export const SEO: PageSeo = {
  title: 'Rendement des panneaux solaires en Belgique | Belgreen',
  description: `Une installation de ${POWER_DEFAULT} kWc produit environ ${formatNumber(standard.production)} kWh par an en Belgique, soit ${KWH_PER_KWC_YEAR} kWh par kWc. Ce qui fait varier ce chiffre.`,
};

export const HERO = {
  badge: 'Rentabilité & Prix',
  title: 'Combien produit une installation solaire en Belgique ?',
  answer: `Une installation de ${POWER_DEFAULT} kWc bien orientée produit environ ${formatNumber(standard.production)} kWh par an en Belgique — soit environ ${KWH_PER_KWC_YEAR} kWh par kWc installé. Ce chiffre varie fortement selon l’orientation, l’inclinaison, et dans une moindre mesure la région.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Toiture résidentielle couverte de panneaux solaires sous un ciel dégagé de fin de journée',
} as const;

export const LEAD = {
  text: '« Combien ça produit » est la question qui vient juste après « combien ça coûte » — et la réponse dépend de bien plus que la seule puissance installée.',
  note: 'Testez ci-dessous comment la production suit la puissance.',
} as const;

export const WIDGET = {
  title: 'Puissance installée',
  sliderLabel: 'Puissance installée, en kilowatts-crête',
  /* ⚠️ L'accent est sur la PRODUCTION ici, pas sur le prix : c'est le sujet de
     la page. Même composant, même modèle, un drapeau déplacé. */
  outputs: [
    { label: 'Prix estimé' },
    { label: 'Panneaux' },
    { label: 'Production/an', accent: true },
  ],
  bridgeLabel: 'Voir la production attendue sur votre toit',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: '',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui fait varier la production',
  intro: 'Ce qui fait varier la production, au-delà de la puissance.',
};

export const FIGURES: Figure[] = [
  {
    label: 'Production de référence',
    value: `${KWH_PER_KWC_YEAR} kWh`,
    note: 'par kWc et par an, pour une installation bien orientée',
    tone: 'lime',
  },
  { label: 'Orientation', value: '35 points', note: 'd’écart de rendement entre le sud et le nord', tone: 'grey' },
  { label: 'Production mensuelle', value: 'Avril-sept.', note: 'très réduite en hiver', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'La région pèse peu',
    text: 'L’ensoleillement diffère peu entre Wallonie, Bruxelles et Flandre — l’orientation compte bien davantage.',
  },
  {
    title: 'Une baisse lente et normale',
    text: 'Environ 0,5 % par an : un panneau garde plus de 80 % de sa capacité après 25 ans.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Une ombre suffit à faire chuter la production',
    text: 'Sur un montage classique, un seul panneau ombragé pénalise toute la chaîne.',
    cta: { label: 'Voir l’ombrage', href: '/installation/ombrage' },
  },
  {
    title: 'Combien de cette production consommerez-vous ?',
    text: 'Produire est une chose ; utiliser sa production sur place en est une autre, et c’est là que se fait la rentabilité.',
    cta: { label: 'Voir l’autoconsommation', href: '/rentabilite-prix/autoconsommation' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qui explique les écarts de production d’une installation à l’autre.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'La production varie-t-elle selon la région ?',
    text: 'Légèrement — l’ensoleillement diffère peu entre la Wallonie, Bruxelles et la Flandre à l’échelle de la Belgique. L’orientation et l’inclinaison du toit ont un impact bien plus important que la localisation.',
    accent: true,
  },
  {
    title: 'Pourquoi ma production baisse-t-elle en hiver ?',
    text: 'Les jours sont plus courts et le soleil moins haut dans le ciel — la production d’un mois de décembre peut être 5 à 6 fois plus faible qu’un mois de juillet.',
  },
  {
    title: 'Les panneaux perdent-ils en performance avec le temps ?',
    text: 'Oui, une dégradation naturelle d’environ 0,5 % par an est normale — un panneau garde généralement plus de 80 % de sa capacité initiale après 25 ans.',
  },
  {
    title: 'La météo impacte-t-elle beaucoup la production ?',
    text: 'Oui au jour le jour, mais un panneau continue de produire par temps couvert, à rendement réduit — ce n’est pas tout ou rien comme on l’imagine souvent.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: `${KWH_PER_KWC_YEAR} kWh/kWc, c’est une moyenne fiable pour mon cas ?`,
    answer:
      'C’est un ordre de grandeur pour une orientation favorable — le simulateur donne une estimation propre à votre toiture.',
    open: true,
  },
  {
    question: 'Ma production sera-t-elle la même chaque année ?',
    answer:
      'À peu près, avec une légère baisse progressive due au vieillissement naturel des panneaux, environ 0,5 % par an.',
  },
  {
    question: 'Puis-je suivre ma production en temps réel ?',
    answer:
      'Oui, la plupart des onduleurs modernes offrent un suivi via application, souvent inclus par l’installateur.',
  },
];

export const FINAL_CTA = {
  title: 'Voyez la production réelle attendue sur votre toit',
  text: "Cette estimation reste générique. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

/**
 * Le module « orientation » de la page Rendement — la brique du catalogue montée
 * pour EXPLIQUER, quand le simulateur la monte pour calculer.
 *
 * Les CHIFFRES ne sont pas ici : ils viennent de `orientation.ts`, comme dans le
 * simulateur. Seuls les mots sont posés.
 */
export const ORIENT_WIDGET = {
  overline: 'Le pan de toiture',
  title: 'Choisissez l’orientation, le rendement suit',
  intro:
    "L'orientation est le facteur qu'on ne peut pas changer après coup — et celui qu'on surestime le plus. Un toit est/ouest reste largement rentable.",
  bridgeLabel: 'Et sur votre toit, ça donne quoi ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
