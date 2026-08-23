import type { Bridge, ComparatorRow, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Contenu de la page « Flandre : quelles aides en 2026 »
 * (`/aides-primes/flandre`).
 *
 * Page 1.7 du cahier, texte de `redaction-flandre-aides-2026.md`.
 * Module : comparateur des trois régimes régionaux (famille B).
 *
 * ⚠️ Les données du comparateur sont celles du tableau vérifié en fin de
 * rédaction, à une correction près : « ~87 €/kWe/an » → **kWc**, comme partout
 * ailleurs sur le site.
 *
 * ⚠️ La rédaction demande des infobulles sur « Prosumer » et « Injection ». Elles
 * ne sont PAS implémentées ici : `interactivite-seo.md` plafonne le site à trois
 * ou quatre termes à infobulle au total, et ce système n'existe pas encore. Les
 * deux mécanismes sont donc désambiguïsés dans le texte de leurs cellules —
 * « une charge » / « un revenu » — ce qui règle la confusion que l'infobulle
 * devait lever. À reprendre quand le système d'infobulles sera posé.
 */

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Aides et primes pour panneaux solaires en Flandre en 2026',
  answer:
    "En Flandre, il n'existe plus de prime directe depuis la fin de la prime Fluvius (fin 2023). L'avantage principal aujourd'hui est le tarif d'injection (3 à 5 centimes/kWh) et la TVA réduite à 6 %.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imagePlaceholder: '1.7-flandre-aides-hero.jpg',
} as const;

export const LEAD = {
  text: "Comme en Wallonie, l'époque des primes directes est révolue en Flandre. Mais contrairement à la Wallonie et Bruxelles, la logique ici est différente sur un point clé : pas de tarif prosumer, pas de certificats verts — juste un tarif d'injection. Voici ce que ça change concrètement.",
  note: 'Comparez les trois régimes régionaux ci-dessous.',
} as const;

export const COMPARATOR_COPY: SectionCopy = {
  overline: 'Trois régions, trois logiques',
  title: 'La Flandre n’est identique à aucune autre',
  intro: 'Choisissez une région pour mettre sa colonne en évidence.',
};

export const COMPARATOR_COLUMNS = ['Wallonie', 'Bruxelles', 'Flandre'];

/* ⚠️ Le pictogramme vient de `status`, jamais collé dans `text` : le composant
   en tire aussi le mot lu par les lecteurs d'écran. */
export const COMPARATOR_ROWS: ComparatorRow[] = [
  {
    label: 'Prime directe',
    cells: [{ status: 'no' }, { status: 'no' }, { status: 'no' }],
  },
  {
    label: 'Certificats verts',
    cells: [
      { status: 'no', text: 'depuis 2014' },
      { status: 'yes', text: 'seule région' },
      { status: 'no' },
    ],
  },
  {
    label: 'Tarif spécifique',
    cells: [
      { text: 'Tarif prosumer — ~87 €/kWc par an, une charge' },
      { status: 'na' },
      { text: 'Tarif d’injection — 3 à 5 ct/kWh, un revenu' },
    ],
  },
  {
    label: 'TVA réduite',
    cells: [
      { status: 'yes', text: '6 %' },
      { status: 'yes', text: '6 %' },
      { status: 'yes', text: '6 %' },
    ],
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui reste concrètement',
  intro: 'Ce qui reste concrètement disponible en Flandre.',
};

export const FIGURES: Figure[] = [
  {
    label: 'Tarif d’injection',
    value: '3-5 ct',
    note: 'par kWh d’électricité excédentaire injectée',
    tone: 'lime',
  },
  {
    label: 'TVA réduite',
    value: '6 %',
    note: 'logement > 10 ans, installateur agréé, usage privé',
    tone: 'grey',
  },
  {
    label: 'Prime de compensation',
    value: 'Fin 2026',
    note: 'uniquement pour les installations d’avant le 31/12/2023',
    tone: 'ink',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'Plus de prime Fluvius',
    text: 'Elle s’est arrêtée fin 2023. Aucune prime directe ne l’a remplacée.',
  },
  {
    title: 'Pas de tarif prosumer',
    text: 'Contrairement à la Wallonie, la Flandre l’a supprimé en même temps que le compteur inversé.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Le compteur ne tourne plus à l’envers depuis 2021',
    text: 'C’est le changement qui explique tout le régime flamand actuel — et il reste mal compris.',
    cta: { label: 'Comprendre ce changement', href: '/aides-primes/flandre/compteur-inverse' },
  },
  {
    title: 'Les démarches passent toutes par Fluvius',
    text: 'Un seul interlocuteur, trois étapes — c’est plus simple qu’à Bruxelles.',
    cta: { label: 'Voir les démarches', href: '/aides-primes/flandre/demarches' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qui distingue vraiment la Flandre des deux autres régions.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Pourquoi la Flandre n’a-t-elle pas de certificats verts ?',
    text: 'La Flandre a opté pour le tarif d’injection comme unique mécanisme de valorisation du surplus, sans jamais introduire de certificats verts pour le résidentiel — contrairement à Bruxelles, qui les a conservés.',
    accent: true,
  },
  {
    title: 'Le prêt MijnVerbouwLening, comment ça marche ?',
    /* ⚠️ La rédaction signale ce point comme non vérifié en profondeur. La
       phrase reste donc prudente et ne cite AUCUN taux ni montant. */
    text: 'La Région flamande propose ce prêt pour financer la rénovation énergétique, panneaux solaires inclus. Conditions et taux varient selon votre profil — c’est un dispositif à vérifier au cas par cas, pas un montant fixe comme le Rénoprêt wallon.',
  },
  {
    title: 'Ma prime de compensation, jusqu’à quand ?',
    text: 'Jusqu’à fin 2026, et uniquement si votre installation date d’avant le 31 décembre 2023. Passé cette échéance, elle disparaît complètement — y compris pour ceux qui en bénéficiaient encore.',
  },
  {
    title: 'Le tarif d’injection va-t-il encore baisser ?',
    text: 'Contrairement à une prime fixe, il suit les prix du marché de l’électricité et peut varier d’une année à l’autre, à la hausse comme à la baisse.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Existe-t-il encore une prime en Flandre en 2026 ?',
    answer:
      'Non, la prime Fluvius s’est arrêtée fin 2023. Seule une prime de compensation subsiste, réservée aux installations antérieures à cette date, jusqu’à fin 2026.',
    open: true,
  },
  {
    question: 'Le tarif d’injection, comment ça marche concrètement ?',
    answer:
      'Chaque kWh que vous injectez sur le réseau (l’électricité produite que vous ne consommez pas vous-même) est valorisé à un tarif de 3 à 5 centimes, contrairement à avant où le compteur tournait à l’envers et compensait à l’euro près.',
  },
  {
    question: 'Mon installation date d’avant 2024, ai-je encore droit à la prime de compensation ?',
    answer: 'Oui, jusqu’à fin 2026. Vérifiez votre éligibilité exacte auprès de Fluvius.',
  },
  {
    question: 'Pourquoi la Flandre n’a-t-elle pas de certificats verts comme Bruxelles ?',
    answer:
      'Chaque région a fait des choix différents. La Flandre a opté pour le tarif d’injection comme seul mécanisme, sans jamais avoir de certificats verts pour le résidentiel.',
  },
];

export const FINAL_CTA = {
  title: 'Le tarif d’injection est déjà intégré à votre estimation',
  text: "Pas de calcul à refaire de votre côté. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
