import type { Bridge, FaqItem, Fact, Figure, SectionCopy, ToggleState, TopicCard } from '../content';

/**
 * Contenu de la page « Fin du compteur inversé en Flandre »
 * (`/aides-primes/flandre/compteur-inverse`).
 *
 * Page 1.8 du cahier, texte de `redaction-fin-compteur-inverse-flandre.md`.
 * Module : bascule à deux états (famille C) — le mécanisme d'avant 2021 contre
 * celui d'aujourd'hui.
 *
 * ⚠️ La rédaction décrit un « schéma illustré maison → compteur → réseau ». Le
 * schéma n'est pas livré, et le composant de bascule rend du TEXTE : c'est
 * volontaire et pas un pis-aller. Ce que le module doit faire comprendre, c'est
 * une règle de calcul (« 1 kWh injecté = 1 kWh déduit » contre « le surplus est
 * payé 3 à 5 ct »), et une règle de calcul se lit. L'illustration pourra venir
 * s'ajouter au composant quand elle existera.
 */

export const HERO = {
  badge: 'Aides & Primes',
  title: 'La fin du compteur qui tourne à l’envers en Flandre',
  answer:
    'Depuis janvier 2021, la Flandre a mis fin au compteur qui tourne à l’envers pour tous les propriétaires de panneaux solaires — y compris ceux installés après cette date. Il est remplacé par le tarif d’injection, basé sur un compteur digital.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Compteur électrique digital moderne dans un coffret résidentiel avec toiture solaire en arrière-plan',
} as const;

export const LEAD = {
  text: "C'est l'un des sujets les plus mal compris du solaire en Belgique : beaucoup de gens pensent encore que leur compteur va « tourner à l'envers » quand ils produisent plus qu'ils ne consomment. En Flandre, ce n'est plus vrai depuis 2021 — voici ce qui a changé, et pourquoi.",
  note: 'Basculez d’un mécanisme à l’autre ci-dessous.',
} as const;

export const TOGGLE_COPY: SectionCopy = {
  overline: 'Avant / après',
  title: 'Deux mécanismes qui n’ont rien à voir',
  intro: 'Ce que devient un kilowattheure injecté sur le réseau, selon la période.',
};

export const TOGGLE_STATES: [ToggleState, ToggleState] = [
  {
    label: 'Avant 2021',
    title: 'Le compteur tournait littéralement à l’envers',
    highlight: '1 kWh injecté = 1 kWh déduit',
    text: 'Le compteur physique tournait en sens inverse quand vous injectiez votre surplus sur le réseau. Chaque kilowattheure injecté venait donc annuler un kilowattheure consommé, à l’euro près, quel que soit le moment de la journée.',
  },
  {
    label: 'Depuis 2021',
    title: 'Le compteur digital sépare les deux flux',
    highlight: 'Surplus payé 3 à 5 ct/kWh',
    text: 'Le compteur digital mesure séparément ce que vous produisez et ce que vous consommez. Le surplus injecté vous est payé au tarif d’injection, tandis que l’électricité que vous puisez sur le réseau reste facturée au tarif normal.',
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui a changé',
  intro: 'Ce qui a changé, en résumé.',
};

/* ⚠️ DEUX CARTES, PAS TROIS. « Janvier 2021 » et « 2029 » sont de vraies
   dates et gardent leur carte. « Tous » n'en était pas une : c'était une
   réponse à une question, poussée en corps 44 faute d'une troisième date. Elle
   redescend en texte sous la grille. */
export const FIGURES: Figure[] = [
  {
    label: 'Date du changement',
    value: 'Janvier 2021',
    note: 'décision de la Cour constitutionnelle',
    tone: 'lime',
  },
  {
    label: 'Compteurs digitaux',
    value: '2029',
    note: 'fin du déploiement, ~30 000 poses par mois en 2026',
    tone: 'ink',
  },
];

export const ASIDE: string[] = [
  'Qui est concerné ? Tous les propriétaires de panneaux solaires, y compris les installations antérieures à 2021.',
];

export const FACTS: Fact[] = [
  {
    title: 'Le tarif prosumer flamand',
    text: 'Supprimé à la même date : les deux mécanismes étaient liés. C’est une différence majeure avec la Wallonie, qui a gardé le sien.',
  },
  {
    title: 'Refuser le compteur digital',
    text: 'Ce n’est plus possible depuis le 1er janvier 2025. Le passage est désormais obligatoire pour tous.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Quelles aides restent en Flandre ?',
    text: 'Le tarif d’injection est aujourd’hui l’avantage principal — voyez ce qui subsiste à côté.',
    cta: { label: 'Voir les aides en Flandre', href: '/aides-primes/flandre' },
  },
  {
    title: 'Comment obtenir mon compteur digital ?',
    text: 'Tout passe par Fluvius, en trois étapes que notre équipe accompagne.',
    cta: { label: 'Voir les démarches', href: '/aides-primes/flandre/demarches' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Le contexte derrière ce changement, et ce qu’il reste à savoir.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Pourquoi ce changement en 2021 ?',
    text: 'La Cour constitutionnelle a jugé le compteur inversé disproportionné : il valorisait l’électricité injectée au même prix que l’électricité achetée, alors que produire et consommer au même moment n’a pas le même coût pour le réseau que d’y puiser en continu.',
    accent: true,
  },
  {
    title: 'Que devient le tarif prosumer flamand ?',
    text: 'Il a été supprimé à la même date, les deux mécanismes étant liés. C’est une différence importante avec la Wallonie, qui a gardé un tarif prosumer actif.',
  },
  {
    title: 'Le déploiement des compteurs digitaux, où ça en est ?',
    text: 'Fluvius vise une couverture complète d’ici 2029, à un rythme d’environ 30 000 installations par mois. Sans compteur digital, vous êtes probablement dans la file d’attente plutôt que dans une situation exceptionnelle.',
  },
  {
    title: 'Pouvait-on refuser le compteur digital ?',
    text: 'Jusqu’au 1er janvier 2025, les propriétaires d’installations antérieures à 2021 pouvaient refuser et rester sur l’ancien système transitoire. Ce n’est plus possible depuis cette date.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Mon compteur tourne encore à l’envers, est-ce normal en 2026 ?',
    answer:
      'Si vous n’avez pas encore de compteur digital, c’est possible temporairement — le déploiement est encore en cours chez Fluvius. Mais le principe du « compteur qui tourne à l’envers » n’est plus légalement en vigueur depuis 2021, quel que soit votre compteur physique actuel.',
    open: true,
  },
  {
    question: 'Quand vais-je recevoir mon compteur digital ?',
    answer:
      'Le déploiement se poursuit jusqu’en 2029 à un rythme d’environ 30 000 installations par mois. Vous pouvez vérifier votre statut directement auprès de Fluvius.',
  },
  {
    question: 'Le tarif d’injection, ça représente combien par an ?',
    answer:
      'Ça dépend de votre surplus de production injecté et du tarif du moment (3 à 5 centimes/kWh). Le simulateur donne une estimation sur votre profil de consommation.',
  },
  {
    question: 'Puis-je refuser le compteur digital ?',
    answer:
      'Non, plus depuis le 1er janvier 2025. C’était possible avant cette date pour les installations antérieures à 2021, ce n’est plus le cas aujourd’hui.',
  },
];

export const FINAL_CTA = {
  title: 'Votre production est valorisée au tarif d’injection',
  text: "Notre calcul l'intègre déjà, sans que vous ayez à le refaire. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
