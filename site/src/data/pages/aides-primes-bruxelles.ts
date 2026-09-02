import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import {
  CERT_DEFAULT,
  CERT_YEARS,
  certsPerYear,
  formatCoefficient,
  yearlyRevenue,
} from '../../scripts/calculators/greenCert';
import { formatEuro } from '../../scripts/format';

/**
 * Contenu de la page « Bruxelles : certificats verts »
 * (`/aides-primes/bruxelles`).
 *
 * Page 1.4 du cahier de construction, texte de `redaction-bruxelles-certificats-verts.md`.
 *
 * ⚠️ Le module et les chiffres de la page tirent tout de
 * `scripts/calculators/greenCert.ts` — jamais écrits à la main ici. C'est la
 * règle déjà posée sur la page prix : trois blocs qui citent le même chiffre ne
 * peuvent pas diverger s'ils le dérivent tous du même modèle.
 *
 * ⚠️ CHIFFRES À VALIDER PAR LE CLIENT : le coefficient d'octroi est révisé par
 * Brugel, le prix du certificat suit un marché. Rien ici n'est un revenu garanti.
 */

/**
 * Ce que Google lit en tête de page — contraintes vérifiées au build
 * (`data/seo.ts`).
 *
 * ⚠️ Le revenu de la description est DÉRIVÉ de `greenCert.ts`, comme le module
 * et la FAQ. C'est ce qui a permis de voir que la réponse-clé annonçait
 * « 700 à 1 000 €/an » là où le modèle calcule ~712 € — voir `HERO` ci-dessous.
 */
export const SEO: PageSeo = {
  title: 'Certificats verts Bruxelles 2026 : le calcul | Belgreen',
  description: `Bruxelles est la seule région belge à en octroyer encore : environ ${formatEuro(
    Math.round(yearlyRevenue(CERT_DEFAULT)),
  )} par an pendant ${CERT_YEARS} ans pour ${CERT_DEFAULT} kWc. Calculez votre cas.`,
};

/**
 * ⚠️ RÉPONSE-CLÉ CORRIGÉE (vérifiée le 2026-09-02). Elle annonçait « environ
 * 700 à 1 000 €/an » : impossible avec les constantes de `greenCert.ts`, qui
 * plafonnent à ~832 €/an même en revendant le certificat au haut de la
 * fourchette (4,5 MWh × 2,055 CV/MWh × 90 €). Le montant est donc dérivé du
 * modèle, comme partout ailleurs sur la page.
 */
export const HERO = {
  badge: 'Aides & Primes',
  title: 'Certificats verts à Bruxelles : le seul vrai avantage financier en Belgique',
  answer: `Bruxelles est la seule région belge à encore octroyer des certificats verts pour les nouvelles installations photovoltaïques — environ ${formatEuro(
    Math.round(yearlyRevenue(CERT_DEFAULT)),
  )} de revenus par an pendant ${CERT_YEARS} ans pour une installation de ${CERT_DEFAULT} kWc.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Toitures bruxelloises en enfilade, plusieurs équipées de panneaux photovoltaïques',
} as const;

export const LEAD = {
  text: "En Wallonie et en Flandre, ce système a disparu depuis longtemps. À Bruxelles, il existe toujours — et c'est un vrai revenu, pas juste une réduction de facture. Voici comment ça marche, et combien ça représente concrètement pour vous.",
  note: 'Testez ci-dessous ce que ça représente selon votre puissance.',
} as const;

export const WIDGET = {
  title: 'Puissance installée',
  sliderLabel: 'Puissance installée, en kilowatts-crête',
  outputs: [
    { label: 'Certificats / an' },
    { label: 'Revenu / an', accent: true },
    { label: `Sur ${CERT_YEARS} ans` },
  ],
  bridgeLabel: 'Intégrez ce revenu à votre calcul complet',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: '',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Comment ça marche',
  intro: 'Le coefficient, le prix du certificat et la durée d’octroi.',
};

export const FIGURES: Figure[] = [
  {
    label: 'Taux d’octroi 2026',
    value: formatCoefficient(),
    note: 'CV par MWh produit, pour les installations ≤ 5 kWc',
    tone: 'lime',
  },
  {
    label: 'Prix d’un certificat',
    value: '65-90 €',
    note: 'selon le marché de revente',
    tone: 'grey',
  },
  {
    label: 'Durée d’octroi',
    value: `${CERT_YEARS} ans`,
    note: 'chaque certificat reste valide 5 ans',
    tone: 'ink',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'Au-delà de 100 kWc',
    text: 'Plus aucun certificat vert n’est octroyé — l’installation est jugée assez rentable sans, avec un retour sur investissement visé de 7 ans.',
  },
  {
    title: 'RESCert PV obligatoire',
    text: 'Depuis 2026, sans ce certificat délivré par un installateur certifié, aucun accès aux certificats verts.',
  },
];

/* Le premier pont porte l'argument anti-intermédiaire de la rédaction : « le
   raccordement Sibelga, qui fait peur à beaucoup de propriétaires, notre équipe
   s'en occupe pour vous ». C'est un différenciateur, pas une note de bas de
   page — il mérite un pont, pas une phrase noyée dans « L'essentiel ». */
export const BRIDGES: Bridge[] = [
  {
    title: 'Le raccordement Sibelga vous inquiète ?',
    text: 'C’est l’étape que la plupart des propriétaires redoutent — notre équipe s’en charge avec vous, de bout en bout.',
    cta: { label: 'Voir le détail des démarches', href: '/aides-primes/bruxelles/demarches' },
  },
  {
    title: 'Le RESCert PV est obligatoire depuis 2026',
    text: 'Sans ce certificat, votre dossier de certificats verts ne passe pas, quelle que soit la qualité de l’installation.',
    cta: { label: 'Voir la réglementation 2026', href: '/aides-primes/bruxelles/reglementation' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Le calcul, la revente et ce qui se passe au bout de dix ans.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Comment sont calculés mes certificats verts ?',
    text: `Votre production réelle en MWh, multipliée par le coefficient régional (${formatCoefficient()} CV/MWh pour les installations ≤ 5 kWc). Une installation qui produit 4,5 MWh par an génère donc environ ${certsPerYear(CERT_DEFAULT).toFixed(1).replace('.', ',')} certificats annuels.`,
    accent: true,
  },
  {
    title: 'Comment revendre mes certificats verts ?',
    text: 'Ils se revendent aux fournisseurs d’électricité, qui ont l’obligation légale d’en détenir un quota. Le prix varie selon le marché, entre 65 et 90 € par certificat.',
  },
  {
    title: 'Le RESCert PV, qu’est-ce que c’est exactement ?',
    text: 'Un certificat de conformité délivré par un installateur certifié, obligatoire depuis le 1er janvier 2026 pour toute nouvelle installation de 5 kWc ou moins à Bruxelles.',
  },
  {
    title: `Que se passe-t-il après les ${CERT_YEARS} ans ?`,
    text: 'Votre installation ne génère plus de nouveaux certificats. L’électricité produite reste la vôtre, mais l’avantage financier des CV s’arrête là.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Comment vendre mes certificats verts, à qui ?',
    answer:
      'Vous les revendez à un fournisseur d’électricité, qui a l’obligation légale d’en détenir un certain quota. Le prix suit le marché : comptez entre 65 € — le rachat garanti par Elia, qui sert de plancher — et environ 90 € par certificat.',
    open: true,
  },
  {
    question: 'Le RESCert, c’est quoi exactement et qui le délivre ?',
    answer:
      'C’est un certificat de conformité obligatoire depuis 2026, délivré par votre installateur s’il est certifié RESCert PV. Sans lui, pas d’accès aux certificats verts, même si votre installation fonctionne parfaitement.',
  },
  {
    question: `Que se passe-t-il après les ${CERT_YEARS} ans d’octroi ?`,
    answer:
      'Vous arrêtez de recevoir de nouveaux certificats verts, mais votre installation continue de produire de l’électricité normalement.',
  },
  {
    question: 'Les certificats verts, ça vaut combien concrètement pour mon installation ?',
    answer: `Pour une installation de ${CERT_DEFAULT} kWc, comptez environ ${formatEuro(Math.round(yearlyRevenue(CERT_DEFAULT)))} par an, soit plusieurs milliers d’euros sur les ${CERT_YEARS} ans d’octroi. Le calculateur en haut de page donne une estimation sur votre puissance exacte.`,
  },
];

export const FINAL_CTA = {
  title: 'Intégrez cet avantage à votre calcul de rentabilité',
  text: "Les certificats verts changent complètement l'équation à Bruxelles. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
