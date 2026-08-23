import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

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

export const FIGURES: Figure[] = [
  { label: "Rôle", value: "Stocker", note: "le surplus de journée, pour une consommation différée", tone: 'lime' },
  { label: "Impact", value: "Autoconso", note: "le taux d’autoconsommation augmente sensiblement", tone: 'grey' },
  { label: "Installation", value: "Par un pro", note: "l’auto-installation est interdite depuis la révision RGIE 2025", tone: 'ink' },
];

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
