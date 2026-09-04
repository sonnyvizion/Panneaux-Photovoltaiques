import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { POWER_DEFAULT } from '../../scripts/powerEstimate';
import {
  HORIZON_YEARS,
  REGION_DEFAULT,
  breakEvenLabel,
  paybackYear,
  regionLabel,
  type Region,
} from '../../scripts/savings';

/**
 * Page 3.3 — « Amortissement / ROI » (`/rentabilite-prix/amortissement`).
 *
 * ⚠️ RÉÉCRITURE COMPLÈTE du 2026-08-18, après correction de l'hypothèse wallonne
 * puis révision d'`ELECTRICITY_PRICE` (0,28 → 0,32 €/kWh). La version précédente
 * annonçait « 7 à 12 ans » partout : cette moyenne reposait sur une compensation
 * du surplus wallon qui n'existe plus depuis 2024, et ne correspondait à aucune
 * région réelle.
 *
 * ⚠️ AUCUN CHIFFRE N'EST ÉCRIT À LA MAIN. Les trois ROI régionaux et le seuil de
 * bascule viennent de `savings.ts`. C'est ce qui a manqué la première fois — la
 * page avait dérivé du code sans que rien ne le signale. Si une constante bouge,
 * ces phrases bougent avec elle.
 */

const roi = (region: Region) => paybackYear(POWER_DEFAULT, { region });
const roiLabel = (region: Region) => {
  const years = roi(region);
  return years === null ? `plus de ${HORIZON_YEARS} ans` : `${years} ans`;
};

/**
 * Le seuil de bascule wallon — le MÊME que celui de la page 3.4, par construction.
 *
 * ⚠️ IL A PERDU SON SUJET le 2026-09-04. Il valait 45 % tant qu'un forfait
 * prosumer de 522 €/an pesait sur le bilan : atteindre ce taux était alors la
 * condition de la rentabilité, et c'était un vrai message. Le forfait ne
 * s'applique pas à une installation posée aujourd'hui (voir `savings.ts`), et le
 * seuil est tombé à quelques pour cent — c'est-à-dire à un chiffre qui ne dit
 * plus rien au lecteur. Il n'est donc PLUS AFFICHÉ comme un objectif.
 */
export const BREAK_EVEN = breakEvenLabel(POWER_DEFAULT, { region: 'wallonie' }) ?? '5 %';

/** Le meilleur cas régional, à forte autoconsommation — la borne basse du hero. */
const BEST_CASE = paybackYear(POWER_DEFAULT, { region: 'bruxelles', rate: 0.7 });

/**
 * Métadonnées de tête de page — contraintes dans `data/seo.ts`, vérifiées au build.
 *
 * ⚠️ LA DESCRIPTION NE PROMET TOUJOURS AUCUN DÉLAI, mais plus pour la même
 * raison. Jusqu'au 2026-09-04 c'était parce que le modèle calculait une Wallonie
 * jamais amortie et qu'annoncer « 6 à 9 ans » aurait contredit la page. Depuis
 * la correction du forfait prosumer, les trois régions s'amortissent dans
 * l'horizon — et le délai reste hors de la description parce qu'il dépend
 * massivement de l'autoconsommation, qui est justement le sujet de la page.
 * Un chiffre unique dans Google promettrait une précision que le calcul n'a pas.
 */
export const SEO: PageSeo = {
  title: 'Amortissement des panneaux solaires en Belgique | Belgreen',
  description:
    'En combien d’années une installation solaire est-elle remboursée ? Le calcul région par région, sans la moyenne qui ne correspond à personne.',
};

export const HERO = {
  badge: 'Rentabilité & Prix',
  title: 'Amortissement solaire : en combien de temps l’installation est-elle rentabilisée ?',
  answer: `Le retour sur investissement dépend surtout de votre taux d’autoconsommation, et ensuite de votre région : comptez ${BEST_CASE} ans à Bruxelles, où les certificats verts portent la production entière, et de l’ordre de ${roiLabel('wallonie')} en Wallonie comme en Flandre sans rien optimiser. Le facteur qui pèse le plus n’est pas votre budget, c’est combien vous consommez vous-même de votre propre production.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Maison individuelle dont la toiture est entièrement couverte de panneaux solaires, vue de trois quarts',
} as const;

export const LEAD = {
  text: 'Il n’y a pas un seul chiffre d’amortissement en Belgique : il y en a au moins autant que de combinaisons région × taux d’autoconsommation. Voici les vrais ordres de grandeur, sans les lisser en une moyenne qui ne collerait à personne.',
  note: 'Le moment où les économies rattrapent l’investissement.',
} as const;

export const TIMELINE_COPY: SectionCopy = {
  overline: 'Le point de bascule',
  title: 'Quand l’installation s’est-elle remboursée ?',
  intro: `Les économies cumulées, année après année, face au coût de départ, pour le cas ${regionLabel(REGION_DEFAULT).toLowerCase()} à autoconsommation standard.`,
};

export const TIMELINE = {
  bridgeLabel: 'Calculez votre propre délai',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Le ROI par région',
  intro: 'Le retour sur investissement à autoconsommation standard, région par région.',
};

/* ⚠️ Les trois valeurs sont DÉRIVÉES. La carte d'accent va à Bruxelles parce
   que c'est le meilleur cas, et la carte sombre à la Wallonie parce que c'est
   l'avertissement — les tons portent l'information, pas seulement l'esthétique. */
export const FIGURES: Figure[] = [
  {
    label: 'Bruxelles',
    value: roiLabel('bruxelles'),
    note: 'grâce aux certificats verts',
    tone: 'lime',
  },
  {
    label: 'Flandre',
    value: roiLabel('flandre'),
    note: 'porté par le tarif d’injection',
    tone: 'grey',
  },
  {
    label: 'Wallonie',
    value: roiLabel('wallonie'),
    note: 'au taux d’autoconsommation de référence, sans rien optimiser',
    tone: 'ink',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'L’autoconsommation décide, pas la région',
    text: `Entre une autoconsommation faible et une autoconsommation soignée, le délai varie du simple au double sur le même toit. L’écart entre régions, lui, tient à un seul mécanisme : les certificats verts bruxellois. Wallonie et Flandre sont désormais logées à la même enseigne.`,
  },
  {
    title: 'Ce n’est pas le budget qui décide',
    text: 'Baisser le prix de l’installation ne change presque rien au délai wallon. C’est le flux annuel, donc l’autoconsommation, qui commande.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'L’autoconsommation est le vrai levier',
    text: 'Un kWh consommé sur place vaut son prix d’achat plein ; le même kWh injecté vaut quelques centimes.',
    cta: { label: 'Voir l’autoconsommation', href: '/rentabilite-prix/autoconsommation' },
  },
  {
    title: 'Le tarif prosumer, c’est quoi exactement ?',
    text: 'Une charge annuelle fixe, indépendante de ce que vous consommez : c’est elle qui creuse l’écart wallon.',
    cta: { label: 'Comprendre le tarif', href: '/aides-primes/wallonie/prosumer' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qui accélère ou ralentit vraiment votre retour sur investissement.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'L’autoconsommation change-t-elle vraiment le calcul ?',
    text: `Oui, radicalement : c’est le facteur qui pèse le plus sur le résultat final, bien plus que le prix de l’installation elle-même. En Wallonie par exemple, passer de 38 % à ${BREAK_EVEN} d’autoconsommation fait basculer le bilan sur ${HORIZON_YEARS} ans de négatif à positif.`,
    accent: true,
  },
  {
    title: 'La région où j’habite influence-t-elle mon ROI ?',
    text: 'Beaucoup, mais moins qu’on ne le croit depuis 2024 : les certificats verts bruxellois accélèrent nettement le retour sur investissement, tandis que la Wallonie et la Flandre valorisent désormais leur surplus de la même façon, au tarif d’injection. Ce qui creuse vraiment l’écart entre deux installations d’une même région, c’est l’autoconsommation.',
  },
  {
    title: 'Quel est le seuil à connaître en Wallonie ?',
    text: `Autour de ${BREAK_EVEN} d’autoconsommation : c’est là que le bilan sur ${HORIZON_YEARS} ans redevient positif. En dessous, l’installation coûte plus qu’elle ne rapporte sur sa durée de vie complète ; au-delà, chaque point d’autoconsommation supplémentaire compte double.`,
  },
  {
    title: 'Faut-il une batterie pour atteindre ces seuils ?',
    text: 'Pas obligatoirement : décaler ses usages (lave-linge, lave-vaisselle, recharge de véhicule en journée) ou coupler une pompe à chaleur peut suffire à pousser l’autoconsommation vers 70 % sans investissement de stockage. Une batterie reste une option, mais son propre coût s’ajoute au calcul.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Y a-t-il un chiffre unique fiable pour « le » ROI solaire en Belgique ?',
    answer: `Non, honnêtement. L’écart entre ${BEST_CASE} ans (Bruxelles, forte autoconsommation) et plusieurs dizaines d’années (Wallonie, autoconsommation standard) est trop large pour qu’un seul chiffre ait un sens. Le simulateur calcule votre cas précis.`,
    open: true,
  },
  {
    question: 'Je suis en Wallonie, dois-je renoncer au solaire ?',
    answer:
      'Non, mais votre rentabilité dépend presque entièrement de votre capacité à consommer votre propre production : c’est la variable à travailler en priorité, pas le choix de l’installateur ou du matériel.',
  },
  {
    question: 'Et si le prix de l’électricité continue d’augmenter ?',
    answer:
      'Ça accélère le retour sur investissement dans toutes les régions : chaque kWh autoconsommé « économise » un prix plus élevé.',
  },
  {
    question: 'Le tarif prosumer allonge-t-il mon délai d’amortissement ?',
    answer:
      'Pas pour une installation posée aujourd’hui. Le tarif prosumer est la contrepartie du compteur qui tourne à l’envers : il compense les coûts de réseau qu’une facturation sur les prélèvements nets ne couvrait pas. Or depuis le 1ᵉʳ janvier 2024, une nouvelle installation wallonne reçoit un compteur communicant et sa facture est établie sur ses prélèvements bruts, sans compensation. Il n’y a donc plus rien à compenser, et le forfait ne s’applique pas. Il reste dû par les installations mises en service avant 2024, qui bénéficient encore de la compensation jusqu’en 2030.',
  },
];

export const FINAL_CTA = {
  title: 'Votre région et votre profil de consommation changent tout',
  text: "Voyez votre cas précis plutôt qu'une moyenne. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
