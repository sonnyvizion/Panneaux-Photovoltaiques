import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';

/**
 * Page 4.4 — « Batterie domestique » (`/comprendre/batterie`).
 *
 * ⚠️ URL : le cahier écrit `/comprendre/batterie-domestique`, `site.ts` porte
 * `/comprendre/batterie` depuis l'origine et c'est cette entrée que la nav et le
 * footer utilisent. On suit le code, comme pour les autres écarts d'URL entre le
 * cahier et le sitemap. Module : aucun.
 */

export const HERO = {
  badge: 'Comprendre',
  title: "La batterie domestique : stocker sa production solaire",
  answer:
    "Une batterie domestique stocke le surplus d’électricité produit en journée pour le consommer plus tard, notamment le soir — elle augmente le taux d’autoconsommation mais représente un investissement supplémentaire important.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Batterie domestique blanche fixée au mur d’une buanderie, à côté de l’installation électrique",
} as const;

export const LEAD = {
  text: "Ce n’est pas indispensable pour rentabiliser une installation solaire, mais ça change la donne pour qui veut maximiser son autonomie électrique.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Ce qu’une batterie change",
  intro: "Ce qu’une batterie change concrètement.",
};

/* ⚠️ Rôle, impact et installation forment un raisonnement en trois temps,
   pas trois objets indépendants. Les cartes icône les posaient côte à côte ;
   la liste empilée les enchaîne, séparés par un filet et rien d'autre. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'RÔLE',
    title: 'Stocker le surplus, pas le perdre',
    text:
      'Une batterie domestique conserve l’électricité produite en journée pour la restituer le soir — le surplus qui partait sur le réseau reste chez vous.',
  },
  {
    eyebrow: 'IMPACT',
    title: 'L’autoconsommation grimpe',
    text:
      'Consommer sa propre production plutôt que la revendre au réseau est ce qui change le plus la rentabilité d’une installation solaire.',
  },
  {
    eyebrow: 'INSTALLATION',
    title: 'Toujours par un professionnel',
    text:
      'L’auto-installation d’une batterie domestique est interdite depuis la révision RGIE 2025 — un point à anticiper dans votre budget et votre planning.',
  },
];

export const STACKED_ALT =
  'Batterie domestique blanche fixée au mur d’un garage, une étagère de rangement à gauche et une baie vitrée donnant sur une haie à droite';

export const FACTS: Fact[] = [
  { title: "Une rentabilité à part", text: "Plus longue à atteindre que celle des panneaux seuls : elle dépend du prix de l’électricité et de votre profil de consommation." },
  { title: "Ajout possible après coup", text: "La plupart des installations récentes l’acceptent, sous réserve de compatibilité de l’onduleur." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Votre onduleur est-il compatible ?",
    text: "C’est lui qui conditionne l’ajout d’une batterie, avant comme après l’installation.",
    cta: { label: "Comprendre l’onduleur", href: '/comprendre/onduleur' },
  },
  {
    title: "Une voiture électrique joue le même rôle ?",
    text: "Pas tout à fait, mais elle absorbe aussi le surplus de journée — avec une logique proche.",
    cta: { label: "Voir la recharge solaire", href: '/installation/voiture-electrique' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut savoir avant d’investir dans une batterie.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Une batterie est-elle rentable ?",
    text: "Ça dépend fortement du prix de l’électricité et de votre profil de consommation — le calcul est plus long à amortir qu’une installation solaire seule, à évaluer au cas par cas.",
    accent: true,
  },
  {
    title: "Quelle capacité choisir ?",
    text: "Ça dépend de votre consommation en soirée et de votre production journalière — une batterie surdimensionnée n’apporte pas de bénéfice proportionnel à son coût.",
  },
  {
    title: "Fonctionne-t-elle en cas de coupure ?",
    text: "Pas systématiquement — ça dépend du système installé, certains fonctionnent uniquement couplés au réseau, d’autres offrent un mode secours. À vérifier avec votre installateur.",
  },
  {
    title: "Peut-on ajouter une batterie après coup ?",
    text: "Oui, la plupart des installations récentes sont compatibles avec un ajout ultérieur, sous réserve de compatibilité de l’onduleur.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Une batterie augmente-t-elle vraiment mes économies ?",
    answer:
      "Oui, en vous permettant de consommer votre propre électricité le soir plutôt que d’en racheter au réseau — mais l’investissement doit être mis en balance avec le gain réel.",
    open: true,
  },
  {
    question: "Combien de temps dure une batterie domestique ?",
    answer:
      "Généralement plusieurs milliers de cycles de charge et décharge, souvent garantie 10 ans par les fabricants.",
  },
  {
    question: "Puis-je installer ma batterie moi-même ?",
    answer:
      "Non, l’auto-installation de batterie est interdite depuis la révision RGIE 2025 — un professionnel est obligatoire.",
  },
];

export const FINAL_CTA = {
  title: "Batterie ou pas, le calcul se fait sur votre profil",
  text: "On chiffre les deux scénarios. Vous parlez directement à l'équipe qui installe.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
