import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { POWER_DEFAULT } from '../../scripts/powerEstimate';
import {
  ELECTRICITY_PRICE,
  HORIZON_YEARS,
  INJECTION_PRICE,
  SELF_CONSUMPTION_RATE,
  breakEvenLabel,
} from '../../scripts/savings';

/**
 * ⚠️ Le seuil de bascule wallon est CALCULÉ, pas recopié : la page 3.3 affiche
 * le même, et le cahier de correction impose qu'il ne puisse pas diverger. Les
 * deux appellent `breakEvenLabel` — une révision du prix du kWh les déplace
 * ensemble.
 */
const BREAK_EVEN = breakEvenLabel(POWER_DEFAULT, { region: 'wallonie' }) ?? '45 %';

/**
 * Page 3.4 — « Autoconsommation & revente » (`/rentabilite-prix/autoconsommation`).
 *
 * Module : `SliderCalculator` en modèle `selfConsumption` — aucun composant
 * nouveau. Le curseur porte le TAUX, les trois tuiles montrent la répartition
 * (direct / surplus / total) et la jauge la part de valeur que représente
 * l'autoconsommation.
 *
 * ⚠️ Les chiffres viennent de `savings.ts`, partagé avec la timeline
 * d'amortissement de la page 3.3. Les deux pages ne peuvent pas afficher deux
 * économies différentes pour la même installation.
 *
 * ⚠️ Le taux de référence n'est pas une donnée neuve : c'est le 37,76 % de la
 * CWaPE, déjà utilisé pour le tarif prosumer wallon. Le cahier le dit lui-même.
 */

/** Métadonnées de tête de page — contraintes dans `data/seo.ts`, vérifiées au build. */
export const SEO: PageSeo = {
  title: 'Autoconsommation solaire en Belgique | Belgreen',
  description:
    'Autoconsommer 30 % de sa production ou 60 % ne donne pas la même rentabilité. Ce qui fait bouger le taux, et comment le monter sans batterie.',
};

export const HERO = {
  badge: 'Rentabilité & Prix',
  title: 'Autoconsommation et revente du surplus : comment ça marche',
  answer:
    'Plus vous consommez directement votre production solaire, plus votre installation est rentable : l’électricité autoconsommée vaut son prix d’achat plein tarif, alors que le surplus revendu ou injecté est valorisé à un tarif nettement inférieur.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Intérieur de maison en journée, appareils en fonctionnement, avec une toiture solaire visible par la fenêtre',
} as const;

export const LEAD = {
  text: 'Deux installations identiques peuvent avoir une rentabilité très différente selon un seul facteur : combien de leur production est utilisée sur place plutôt qu’envoyée sur le réseau.',
  note: 'Faites bouger le taux, regardez la répartition.',
} as const;

export const WIDGET = {
  title: 'Taux d’autoconsommation',
  sliderLabel: 'Taux d’autoconsommation, en pourcentage',
  outputs: [
    { label: 'Économies directes', accent: true },
    { label: 'Surplus valorisé' },
    { label: 'Total par an' },
  ],
  bridgeLabel: 'Voir votre taux estimé et son impact',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: '',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'La règle simple',
  intro: 'La règle simple qui détermine votre rentabilité.',
};

export const FIGURES: Figure[] = [
  {
    label: 'Autoconsommation',
    value: `${ELECTRICITY_PRICE.toFixed(2).replace('.', ',')} €`,
    note: 'par kWh, le prix plein de l’électricité achetée',
    tone: 'lime',
  },
  {
    label: 'Surplus',
    value: `${Math.round(INJECTION_PRICE * 100)} ct`,
    note: 'par kWh injecté en Flandre ; variable selon la région',
    tone: 'grey',
  },
  /* ⚠️ Remplace l'ancienne carte « Taux moyen — 30 à 40 % », qui décrivait une
     moyenne sans conséquence. Le seuil, lui, dit ce qui bascule. */
  {
    label: 'Seuil critique en Wallonie',
    value: BREAK_EVEN,
    note: `d’autoconsommation : le point où l’installation redevient rentable sur ses ${HORIZON_YEARS} ans`,
    tone: 'ink',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'Un écart de 1 à 7',
    text: `Un kWh consommé sur place vaut ${ELECTRICITY_PRICE.toFixed(2).replace('.', ',')} € ; le même kWh injecté en Flandre en vaut ${Math.round(INJECTION_PRICE * 100)} centimes.`,
  },
  {
    title: 'Le taux se déplace facilement',
    text: 'Décaler l’électroménager en journée suffit à gagner plusieurs points, sans investissement.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Une pompe à chaleur consomme au bon moment',
    text: 'C’est l’un des leviers les plus efficaces pour faire monter le taux.',
    cta: { label: 'Voir la pompe à chaleur', href: '/installation/pompe-a-chaleur' },
  },
  {
    title: 'Une voiture électrique aussi',
    text: 'Recharger en journée transforme du surplus mal valorisé en économie directe.',
    cta: { label: 'Voir la recharge solaire', href: '/installation/voiture-electrique' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Comment augmenter votre taux d’autoconsommation.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Comment augmenter mon taux d’autoconsommation ?',
    text: 'En décalant les usages énergivores (lave-linge, lave-vaisselle, recharge de véhicule) vers les heures de production, ou en ajoutant des équipements qui consomment en journée.',
    accent: true,
  },
  {
    title: 'Une batterie domestique change-t-elle la donne ?',
    text: 'Oui, significativement : elle permet de stocker le surplus de journée pour le consommer le soir, au prix d’un investissement supplémentaire.',
  },
  {
    title: 'Que devient mon surplus selon ma région ?',
    text: `En Wallonie, il part sur le réseau sans compensation directe au-delà du tarif prosumer ; en Flandre, il est valorisé au tarif d’injection ; à Bruxelles, il génère des certificats verts.`,
  },
  {
    title: 'Faut-il viser 100 % d’autoconsommation ?',
    text: 'Pas nécessairement : au-delà d’un certain point, ça demanderait une installation sous-dimensionnée par rapport à votre toiture, ou un investissement en stockage pas toujours rentable.',
  },
  {
    title: `Ce seuil de ${BREAK_EVEN} est-il le même partout ?`,
    text: 'Non. C’est spécifiquement le repère wallon, où le tarif prosumer, une charge fixe, rend l’autoconsommation déterminante. À Bruxelles et en Flandre, la rentabilité reste positive même à autoconsommation standard, grâce aux certificats verts et au tarif d’injection.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Que vaut un kWh injecté, comparé à un kWh consommé sur place ?',
    answer:
      `Environ ${Math.round(ELECTRICITY_PRICE / INJECTION_PRICE)} fois moins. Un kWh que vous consommez vous évite d’en acheter un à ${ELECTRICITY_PRICE.toFixed(2).replace('.', ',')} € ; le même kWh injecté vous en rapporte ${Math.round(INJECTION_PRICE * 100)} centimes. Tout l’enjeu de l’autoconsommation tient dans cet écart : ce n’est pas produire plus qui paie, c’est consommer au bon moment.`,
  },
  {
    question: 'Quel est le taux moyen sans rien faire de spécial ?',
    answer: `Environ 30 à 40 % pour un foyer standard, la référence retenue sur ce site est ${Math.round(SELF_CONSUMPTION_RATE * 100)} %, le reste partant en surplus sur le réseau.`,
    open: true,
  },
  {
    question: 'La pompe à chaleur ou la voiture électrique aident-elles vraiment ?',
    answer:
      'Oui, ce sont deux des leviers les plus efficaces pour augmenter l’autoconsommation, et chacune a sa page dédiée.',
  },
  {
    question: 'Dois-je changer mes habitudes pour en profiter ?',
    answer:
      'Ce n’est pas obligatoire, mais quelques ajustements simples, comme lancer l’électroménager en journée, augmentent sensiblement le taux sans effort majeur.',
  },
  {
    question: 'Faut-il une batterie pour augmenter son autoconsommation ?',
    answer:
      'Ce n’est ni le seul levier, ni le premier. Décaler les gros consommateurs en journée, lave-linge, lave-vaisselle, chauffe-eau, recharge de la voiture, ne coûte rien et fait déjà remonter le taux. La batterie vient après, quand ces gestes sont épuisés : elle achète du décalage, et il faut que ce décalage rapporte plus qu’elle ne coûte.',
  },
];

/**
 * La planche « journée type » — famille I, `SchemaPlate`.
 *
 * ⚠️ ELLE SUIT le curseur ET « L'essentiel » — c'est la règle de placement de
 * la famille I, voir l'en-tête de `SchemaPlate.astro`. La page se lit donc :
 * le curseur donne le RÉSULTAT (un taux, une répartition), « L'essentiel »
 * donne l'écart de valeur entre un kWh consommé et un kWh injecté, et la
 * planche vient expliquer POURQUOI ce taux plafonne — deux courbes qui ne se
 * superposent pas.
 *
 * ⚠️ C'est ici que le déplacement se sent le plus, parce que le visiteur
 * manipule un chiffre avant d'en avoir vu la cause. Contrepartie assumée : les
 * trois blocs ne se répètent pas, chacun apporte une couche que les deux autres
 * n'ont pas.
 *
 * ⚠️ Le dessin est vérifié, pas illustratif : l'intégration des deux courbes
 * donne 38 % de la production consommée sur place, soit exactement la valeur
 * que le reste de la page annonce. Si `SELF_CONSUMPTION_RATE` bouge un jour,
 * la planche devra bouger avec — sinon la page se contredit à l'image.
 */
export const SCHEMA = {
  src: '/schemas/journee-type.svg',
  alt: "Sur une journée, la courbe de production forme une cloche centrée sur midi tandis que la consommation du foyer fait deux bosses, le matin et le soir ; les deux ne se recouvrent qu’en partie.",
  title: 'Pourquoi les deux courbes se manquent',
  caption:
    'Vos panneaux produisent en cloche autour de midi. Votre foyer, lui, consomme surtout au lever et en soirée. L’autoconsommation n’est rien d’autre que la zone où les deux se recouvrent, et c’est parce qu’elles se manquent qu’un ménage plafonne naturellement autour de 30 à 40 %.',
  keys: [
    { swatch: 'green', label: 'Consommé sur place, au moment où c’est produit' },
    { swatch: 'grey', label: 'Surplus, injecté sur le réseau' },
    { swatch: 'hatch', label: 'Soutiré au réseau, faute de soleil' },
  ],
  bridgeLabel: 'Et chez vous, la journée ressemble à quoi ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const FINAL_CTA = {
  title: 'En Wallonie particulièrement, chaque point d’autoconsommation compte',
  text: "Voyez l'impact sur votre cas précis. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
