import type {
  Bridge,
  FaqItem,
  Fact,
  Figure,
  SectionCopy,
  TopicCard,
} from '../content';
import type { PageSeo } from '../seo';
import { PROSUMER_DEFAULT, PROSUMER_RATE, yearlyCost } from '../../scripts/calculators/prosumer';
import { SELF_CONSUMPTION_RATE } from '../../scripts/savings';
import { formatEuro } from '../../scripts/format';

/**
 * Contenu de la page « Tarif prosumer en Wallonie »
 * (`/aides-primes/wallonie/prosumer`).
 *
 * Page 1.2 du cahier de construction. Texte repris tel quel, à trois adaptations
 * près, toutes signalées plus bas. Provisoire comme les autres fichiers de
 * page : la forme suit le page builder pour que la bascule Sanity ne change que
 * la source des données.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ CHIFFRES À VALIDER PAR LE CLIENT (CLAUDE.md § « À compléter »).
 * Le coefficient prosumer est révisé chaque année par la CWaPE et varie selon le
 * gestionnaire de réseau — la page le dit elle-même dans « Creuser le sujet ».
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ ADAPTATIONS SUR LA COPIE DU CAHIER, à ne pas « recorriger » :
 *
 *  1. « 87 €/kWe » → **kWc**. Le cahier écrit kWe à deux endroits ; l'unité de
 *     la puissance installée est le kilowatt-crête, et c'est celle qu'emploie
 *     tout le reste du site. Laisser les deux aurait donné deux unités pour la
 *     même grandeur à un écran d'intervalle.
 *  2. Les trois cartes de « L'essentiel » ont été RÉORDONNÉES. Le cahier met en
 *     accent « Base de calcul — la plus petite valeur entre la puissance des
 *     panneaux et celle de l'onduleur » : une phrase, pas un chiffre. Or la
 *     valeur d'une carte chiffre est en `nowrap` (choix documenté du composant,
 *     trois cartes de front à toutes les tailles) et débordait à 390px. Les
 *     trois grandeurs chiffrables occupent donc les cartes, et la règle de calcul
 *     descend en carte-condition, où le texte peut passer à la ligne. Aucune
 *     information du cahier n'est perdue.
 *  3. Les deux PONTS ne viennent pas du cahier, qui n'en donne pas pour cette
 *     page. Le gabarit les prévoit « si pertinent » et CLAUDE.md en fait une
 *     règle d'or (la boucle contenu ↔ contenu) : une page qui explique une
 *     CHARGE doit dire où lire ce qu'elle change sur la rentabilité.
 */

/* Le taux d'autoconsommation vient de `savings.ts` : la page « Aides Wallonie »
   affiche le même, une seule source le porte. */
const percent = (ratio: number) =>
  new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 2 }).format(ratio * 100) + ' %';

/**
 * Ce que Google lit en tête de page — contraintes vérifiées au build
 * (`data/seo.ts`).
 *
 * ⚠️ Le montant de la description est DÉRIVÉ du modèle, jamais recopié : c'est
 * le même chiffre que le module et que la réponse-clé, et une révision du
 * coefficient CWaPE le corrigera aux trois endroits à la fois.
 */
export const SEO: PageSeo = {
  title: 'Tarif prosumer Wallonie 2026 : calcul et montant | Belgreen',
  description: `Environ ${PROSUMER_RATE} €/kWc par an, soit ${formatEuro(
    Math.round(yearlyCost(PROSUMER_DEFAULT)),
  )} pour ${PROSUMER_DEFAULT} kWc. Calculez ce que le tarif prosumer coûte vraiment selon votre puissance installée.`,
};

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Le tarif prosumer en Wallonie : combien ça coûte réellement ?',
  answer: `Le tarif prosumer est une redevance annuelle d'environ ${PROSUMER_RATE} €/kWc (~${formatEuro(
    Math.round(yearlyCost(PROSUMER_DEFAULT)),
  )}/an pour une installation de ${PROSUMER_DEFAULT} kWc chez ORES), entièrement à charge du propriétaire depuis 2024.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Vue aérienne d’un quartier résidentiel wallon dont plusieurs toitures portent des panneaux solaires',
} as const;

export const LEAD = {
  text: "Ce n'est pas une prime qu'on vous retire, mais un coût à part entière du solaire en Wallonie, encore mal connu et souvent oublié dans les calculs de rentabilité qu'on trouve en ligne.",
  note: 'Testez ci-dessous ce que ce tarif représente selon votre puissance.',
} as const;

export const WIDGET = {
  title: 'Puissance installée',
  sliderLabel: 'Puissance installée, en kilowatts-crête',
  outputs: [
    { label: 'Tarif prosumer / an', accent: true },
    { label: 'Soit par mois' },
  ],
  bridgeLabel: 'Voir ce que ça change sur votre rentabilité',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: '',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui reste concrètement',
  intro: 'Comment ce tarif est calculé, concrètement.',
};

/**
 * ⚠️ La carte d'accent porte le tarif de référence : c'est le chiffre que le
 * visiteur est venu chercher, et celui que le module manipule juste au-dessus.
 * La carte sombre isole la facturation — ce n'est pas une grandeur du calcul
 * mais son aboutissement.
 */
export const FIGURES: Figure[] = [
  {
    label: 'Tarif de référence',
    value: `~${PROSUMER_RATE} €`,
    note: 'par kWc installé et par an',
    tone: 'lime',
  },
  {
    label: 'Autoconsommation retenue',
    value: percent(SELF_CONSUMPTION_RATE),
    note: 'moyenne appliquée au calcul',
    tone: 'grey',
  },
  { label: 'Facturation', value: 'Annuelle', note: 'par ORES ou RESA', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Base de calcul',
    text: "La plus petite valeur entre la puissance des panneaux et celle de l'onduleur.",
  },
  {
    title: 'À votre charge',
    text: 'Entièrement, depuis 2024 : le tarif n’est plus compensé par la Région.',
  },
];

/* Ce que la page ne dit PAS, et où le lire. Nommer l'angle mort vaut mieux
   qu'un CTA générique (`pages-contenu.md`). Voir l'adaptation 3 en tête. */
export const BRIDGES: Bridge[] = [
  {
    title: 'Une installation reste-t-elle rentable avec ce tarif ?',
    text: 'Oui. Notre calcul de rentabilité intègre déjà le tarif prosumer, il ne vient pas s’ajouter après coup.',
    cta: { label: 'Voir le calcul de rentabilité', href: '/rentabilite-prix' },
  },
  {
    title: 'Et les aides wallonnes, il en reste ?',
    text: 'Plus de prime directe ni de certificats verts, mais un prêt à taux 0 % et une TVA réduite.',
    cta: { label: 'Voir les aides en Wallonie', href: '/aides-primes/wallonie' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu'il faut savoir avant d'être surpris par la facture.",
};

/* Aucune de ces quatre entrées n'a de page dédiée au sitemap : ce sont des
   développements de CETTE page, pas des destinations. Elles sont donc rendues
   en cartes inertes — voir `href` dans `TopicCard`. */
export const TOPICS: TopicCard[] = [
  {
    title: 'Pourquoi ce tarif existe-t-il ?',
    text: "Il compense l'usage du réseau électrique par les installations qui produisent leur propre électricité mais restent connectées pour les moments où elles ne produisent pas assez (nuit, hiver).",
    accent: true,
  },
  {
    title: 'Le tarif proportionnel, une alternative ?',
    text: 'Avec un compteur communicant, un tarif ajusté à votre consommation réelle du réseau peut remplacer le tarif forfaitaire, potentiellement plus avantageux si votre autoconsommation est élevée.',
  },
  {
    title: 'Ce tarif est-il le même partout en Wallonie ?',
    text: 'Le principe est identique, mais le montant exact varie légèrement selon votre gestionnaire de réseau (ORES ou RESA).',
  },
  {
    title: 'Le tarif va-t-il encore augmenter ?',
    text: 'Il est révisé chaque année par le régulateur wallon (CWaPE) : pas de garantie de stabilité sur le long terme.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Le tarif prosumer, est-ce la « taxe sur les panneaux solaires » ?',
    answer:
      "C'est le nom que lui donne l'usage, et il n'est pas tout à fait faux : c'est une redevance annuelle due dès la mise en service, que vous injectiez beaucoup ou peu. Elle ne paie pas l'électricité mais l'usage du réseau, dont votre installation se sert comme d'un tampon quand elle produit plus que vous ne consommez.",
  },
  {
    question: 'Comment réduire, voire éviter, le tarif prosumer ?',
    answer:
      "Il ne s'évite pas, il se réduit. Deux leviers : consommer votre production au moment où elle arrive (lave-linge et lave-vaisselle en journée, chauffe-eau ou voiture pilotés sur le surplus), ce qui abaisse la part de réseau que vous payez sans rien changer au forfait ; et vérifier si le tarif proportionnel est plus avantageux pour votre profil.",
    open: true,
  },
  {
    question: 'Forfait ou tarif proportionnel : lequel choisir ?',
    answer:
      "Le forfait, dit capacitaire, se calcule sur la puissance installée, sans regarder ce que vous injectez réellement. Le tarif proportionnel se calcule sur les kilowattheures effectivement prélevés au réseau, et devient intéressant quand vous autoconsommez beaucoup, typiquement avec une batterie ou une pompe à chaleur. Il suppose un compteur communicant capable de mesurer les deux sens. Le choix se demande à votre gestionnaire de réseau et se compare sur une année complète.",
  },
  {
    question: 'Le montant change-t-il selon mon gestionnaire de réseau ?',
    answer:
      "Oui, et l'écart n'est pas anecdotique. Pour 2026, le coefficient va d'environ 79 €/kWc chez AIEG à environ 98 €/kWc chez AIESH, avec ORES (~87 €/kWc) et RESA (~86 €/kWc) entre les deux. Ces montants s'entendent hors TVA : comptez 21 % de plus sur votre facture. Le nôtre, sur cette page, est celui d'ORES, de loin le plus répandu.",
  },
  {
    question: 'Le tarif prosumer va-t-il encore augmenter ?',
    answer:
      "C'est possible : la CWaPE révise les coefficients chaque année, gestionnaire par gestionnaire. Aucune fin ni dégressivité n'est annoncée à ce jour, et nos estimations le supposent donc payé à taux plein sur toute la durée de vie de l'installation.",
  },
  {
    question: 'Le tarif prosumer s’applique-t-il dans toute la Belgique ?',
    answer:
      "Non, il est propre à la Wallonie. Bruxelles compense autrement, par les certificats verts, et la Flandre par le tarif d'injection : ni l'une ni l'autre ne facture cette redevance de capacité.",
  },
];


export const FINAL_CTA = {
  title: 'Le tarif prosumer est déjà intégré dans notre calcul',
  text: "Pas de mauvaise surprise après coup : notre estimation le déduit d'emblée. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
