import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import { GRID_CO2_G_PER_KWH, residentialRange, standardCase } from '../../scripts/co2';

/**
 * Page 4.10 — « Impact écologique » (`/comprendre/impact-ecologique`).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ LE CHIFFRE DE CO₂ N'EST PAS ÉCRIT ICI — il est DÉRIVÉ de `scripts/co2.ts`.
 *
 * La note dev du cahier demandait « cohérence à garder avec le calcul du
 * simulateur, ne pas afficher un chiffre différent sur cette page ». En
 * vérifiant, les deux sources divergeaient : `simulateur.md` annonce 0,5 à 1,0
 * t/an (et ~600–900 kg dans son tableau), la page 4.10 annonce 0,5 à 1,5 t/an
 * en prétendant reprendre cette correction.
 *
 * Les deux sont justes sur des périmètres différents — l'installation typique
 * contre toute la gamme résidentielle. Plutôt que de trancher en recopiant un
 * nombre, la fourchette est calculée à partir du modèle de production déjà
 * testé et du facteur d'émission du réseau. Le simulateur utilisera les mêmes
 * fonctions : les deux chiffres ne PEUVENT plus diverger.
 *
 * ⚠️ Ne jamais surgonfler : `simulateur.md` en fait une consigne, et la page
 * elle-même explique pourquoi le chiffre est modeste (réseau belge peu carboné).
 * C'est un argument de crédibilité, pas une faiblesse à masquer.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Module : aucun.
 */

export const HERO = {
  badge: 'Comprendre',
  title: 'Quel est l’impact écologique réel des panneaux solaires ?',
  answer: `Le photovoltaïque réduit significativement les émissions de CO₂ par rapport à l’électricité du réseau — mais pour un foyer belge, l’ordre de grandeur réaliste est de ${residentialRange()} de CO₂ évitée par an pour une installation résidentielle, pas plus, le réseau belge étant déjà relativement peu carboné.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Vue aérienne d’une maison à toiture solaire entourée d’arbres, au milieu d’une végétation dense",
} as const;

export const LEAD = {
  text: 'Un sujet où les chiffres qui circulent sont souvent exagérés — voici un ordre de grandeur réaliste, avec la nuance qui va avec.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'L’impact réel, sans survendre',
  intro: 'L’impact réel, sans survendre.',
};

export const FIGURES: Figure[] = [
  {
    label: 'CO₂ évité',
    value: `${residentialRange()}`,
    note: `par an, selon la puissance — soit ${standardCase()} pour une installation standard`,
    tone: 'lime',
  },
  {
    label: 'Fabrication',
    value: '1-3 ans',
    note: 'pour « rembourser » le coût carbone initial',
    tone: 'grey',
  },
  {
    label: 'Recyclage',
    value: 'Largement',
    note: 'verre, aluminium et silicium sont récupérables',
    tone: 'ink',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'Pourquoi ce chiffre est modeste',
    text: `Le réseau belge émet environ ${GRID_CO2_G_PER_KWH} g de CO₂ par kWh — bien moins qu’un réseau au charbon. L’écart que vous évitez est donc plus faible qu’ailleurs.`,
  },
  {
    title: 'Le bilan reste largement positif',
    text: 'Sur 25 à 30 ans de production, fabrication et transport compris, le solde carbone est nettement favorable.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien votre installation produirait-elle ?',
    text: 'Le CO₂ évité se déduit directement de la production — donc de la puissance installée.',
    cta: { label: 'Comprendre le kWc', href: '/installation/puissance' },
  },
  {
    title: 'Et les limites du solaire, alors ?',
    text: 'Coût initial, dépendance météo, toitures incompatibles : la page qui ne vend rien.',
    cta: { label: 'Voir les inconvénients', href: '/comprendre/risques-inconvenients' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qu’il faut nuancer sur l’impact écologique du solaire.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Pourquoi le CO₂ évité semble-t-il plus faible qu’attendu ?',
    text: 'Le réseau électrique belge est déjà relativement peu carboné, avec une part importante de nucléaire historiquement — l’écart entre « électricité solaire » et « électricité du réseau » est donc moins spectaculaire qu’avec un réseau très carboné au charbon.',
    accent: true,
  },
  {
    title: 'La fabrication d’un panneau pollue-t-elle beaucoup ?',
    text: 'Elle a un coût carbone réel, mais ce coût est « remboursé » en général en 1 à 3 ans de production — sur une durée de vie de 25 à 30 ans, le bilan reste largement positif.',
  },
  {
    title: 'Que deviennent les panneaux en fin de vie ?',
    text: 'Ils sont majoritairement recyclables — verre, aluminium et silicium peuvent être récupérés, et des filières de recyclage se développent en Europe.',
  },
  {
    title: 'Le solaire est-il vraiment « vert » si on compte tout ?',
    text: 'Oui globalement, même en intégrant fabrication et transport, le bilan carbone reste nettement positif sur la durée de vie complète comparé à une électricité d’origine fossile.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Combien de CO₂ mon installation va-t-elle vraiment éviter ?',
    answer: `Pour une installation résidentielle en Belgique, comptez un ordre de grandeur de ${residentialRange()} par an selon la puissance — moins spectaculaire que certains chiffres marketing, mais réel et cumulé sur 25 à 30 ans.`,
    open: true,
  },
  {
    question: 'Les panneaux solaires sont-ils recyclables ?',
    answer:
      'Oui, majoritairement — verre, aluminium et silicium sont récupérables via des filières dédiées.',
  },
  {
    question: 'La fabrication annule-t-elle le bénéfice écologique ?',
    answer:
      'Non, le coût carbone de fabrication est remboursé en 1 à 3 ans de production, sur une durée de vie de 25 à 30 ans.',
  },
];

export const FINAL_CTA = {
  title: 'Voyez ce que votre installation éviterait vraiment',
  text: "Un chiffre réaliste, pas un argument marketing. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
