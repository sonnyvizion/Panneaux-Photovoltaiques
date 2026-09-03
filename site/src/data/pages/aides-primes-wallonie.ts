import { POWER_DEFAULT } from '../../scripts/powerEstimate';
import { SELF_CONSUMPTION_RATE, breakEvenLabel } from '../../scripts/savings';
import { PROSUMER_RATE } from '../../scripts/calculators/prosumer';
import { LOAN_MAX } from '../../scripts/loanEstimate';
import { formatEuro } from '../../scripts/format';
import type {
  Bridge,
  FaqItem,
  Fact,
  Figure,
  SectionCopy,
  TopicCard,
} from '../content';
import type { PageSeo } from '../seo';

/**
 * Contenu de la page « Aides & primes — Wallonie » (`/aides-primes/wallonie`).
 *
 * Page 1.1 du sitemap (`architecture.md` §Pilier 3), deuxième instance du
 * gabarit de `pages-contenu.md` après `rentabilite-prix.ts`. Provisoire comme
 * elle : ce fichier a vocation à venir de Sanity, et sa forme suit déjà le page
 * builder pour que la bascule ne change que la source des données.
 *
 * ⚠️ CE QUI DIFFÈRE DE LA PAGE PRIX, et pourquoi :
 *
 *  — le module n'est plus un curseur de puissance mais un curseur de MONTANT
 *    EMPRUNTÉ (Rénoprêt). Sur une page dont le sujet est « ce qui reste comme
 *    aide », la variable qui compte est la mensualité, pas le prix ;
 *  — « Creuser le sujet » est en cartes-liens et non en accordéons : les quatre
 *    sujets ont chacun leur page. Voir `TopicCard` dans `content.ts`.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ TOUS LES CHIFFRES DE CETTE PAGE SONT À VALIDER PAR LE CLIENT
 * (CLAUDE.md § « À compléter »). Ils sont relevés sur la maquette Figma, qui
 * n'est pas une source juridique : le taux du Rénoprêt dépend des revenus, le
 * coefficient prosumer est révisé par la CWaPE, et les primes communales
 * changent d'une commune à l'autre. Rien ici ne doit être présenté comme un
 * engagement tant que le client ne l'a pas confirmé.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ Deux corrections faites sur la copie Figma, à ne pas « recorriger » :
 *
 *  — la maquette écrit « ~87 €/kWe ». L'unité de la puissance installée est le
 *    kilowatt-CRÊTE, kWc — c'est celle qu'emploie tout le reste du site ;
 *  — la maquette annonce « les 3 leviers financiers encore actifs ». Le tarif
 *    prosumer est une CHARGE, et la page le dit elle-même deux paragraphes plus
 *    haut. Compter une charge parmi les leviers aurait contredit l'argument
 *    d'honnêteté sur lequel toute la page repose.
 */

/**
 * Ce que Google lit en tête de page — contraintes vérifiées au build
 * (`data/seo.ts`).
 *
 * ⚠️ LE TITRE GARDE LE MOT « PRIME » AU SINGULIER-REQUÊTE alors que la page
 * répond « il n'y en a plus ». C'est voulu : « prime panneaux solaires Wallonie
 * 2026 » est la requête réellement tapée, et la description dit tout de suite
 * qu'il n'y a plus de prime directe. Écrire le titre sur « aides indirectes »
 * ferait rater la requête à la page qui y répond le mieux.
 */
export const SEO: PageSeo = {
  title: 'Prime panneaux solaires Wallonie 2026 | Belgreen',
  description: `Plus de prime directe ni de certificats verts en Wallonie. Ce qui reste en 2026 : le Rénoprêt à 0 % jusqu'à ${formatEuro(LOAN_MAX)}, la TVA à 6 % et le tarif prosumer.`,
};

/* Le taux d'autoconsommation vient de `savings.ts` : deux pages du site
   l'affichent (ici et « Tarif prosumer »), une seule source le porte. */
const percent = (ratio: number) =>
  new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 2 }).format(ratio * 100) + ' %';

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Aides et primes pour panneaux solaires en Wallonie en 2026',
  answer:
    "En 2026, il n'existe plus de prime directe ni de certificats verts pour une installation photovoltaïque résidentielle en Wallonie. Les aides restantes sont indirectes : un prêt à taux 0 %, une TVA réduite, et un tarif prosumer qui est une charge, pas une aide.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Vue aérienne, à la lumière du soir, d’une maison wallonne en briques rouges bordant un champ, dont le versant de toiture en tuiles porte une rangée de panneaux solaires noirs',
} as const;

export const LEAD = {
  text: "Si vous cherchez « prime panneaux solaires Wallonie 2026 », la réponse honnête est qu'elle n'existe plus depuis longtemps. Ce n'est pas une mauvaise nouvelle récente : la Wallonie a mis fin aux certificats verts résidentiels dès 2014. Voici ce qui reste vraiment disponible, et comment ça joue sur votre budget.",
  /* ⚠️ La maquette a gardé ici la note de la page prix (« comment le prix évolue
     selon la puissance »), qui annonçait un module que cette page n'a pas. La
     note doit annoncer le module qui suit VRAIMENT, sinon le lecteur arrive sur
     le curseur en cherchant autre chose. */
  note: 'Testez ci-dessous ce que donnerait un prêt à taux 0 % sur votre budget.',
} as const;

export const WIDGET = {
  title: 'Montant emprunté',
  sliderLabel: 'Montant emprunté, en euros',
  /* Une seule sortie : le composant bascule alors en variante « lecture »,
     une phrase sous la jauge plutôt qu'une bande de tuiles. */
  outputs: [{ label: 'Mensualité' }],
  bridgeLabel: 'Voir ce que ça change sur votre facture',
  cta: { label: 'Vérifier mon éligibilité', href: '/simulateur' },
  imageAlt: '',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui reste concrètement',
  intro:
    'Plus de prime directe ni de certificats verts : voici les deux aides encore actives en 2026, et la charge à ne pas oublier dans le calcul.',
};

/**
 * ⚠️ La carte d'accent désigne le levier le plus utile, pas le plus gros
 * chiffre — même règle que sur la page prix. Le Rénoprêt est ce qui change
 * réellement la faisabilité d'un projet ; la TVA réduite s'applique toute seule.
 *
 * Le tarif prosumer est en `ink` : la carte sombre le sépare visuellement des
 * deux aides. C'est une charge, elle ne doit pas se lire comme un avantage de
 * plus.
 */
export const FIGURES: Figure[] = [
  { label: 'Rénoprêt', value: 'Taux 0 %', note: `jusqu'à ${formatEuro(LOAN_MAX)}`, tone: 'lime' },
  { label: 'TVA réduite', value: '6 %', note: 'logement de plus de 10 ans', tone: 'grey' },
  /* ⚠️ L'unité est descendue dans la note, elle n'est pas dans la valeur.
     `.essentials__value` est en `nowrap` (choix documenté du composant : trois
     montants de front à toutes les tailles) et « ~87 €/kWc » débordait de sa
     carte à 390px, là où « ~87 € » tient. La maquette écrit « €/kWe » — c'est
     le kilowatt-CRÊTE, kWc, comme partout ailleurs sur le site. */
  { label: 'Tarif prosumer', value: `~${PROSUMER_RATE} €`, note: 'par kWc, à votre charge', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Primes communales',
    text: 'Certaines communes en proposent encore, à vérifier au cas par cas.',
  },
  {
    title: 'Obligation 35 % renouvelable',
    text: 'Pour toute nouvelle construction depuis le 1ᵉʳ janvier 2026.',
  },
];

/* Ce que « L'essentiel » ne dit PAS, et où le lire. Nommer l'angle mort vaut
   mieux qu'un CTA générique (`pages-contenu.md`). */
export const BRIDGES: Bridge[] = [
  {
    title: "Et le prix d'une installation, ça donne quoi ?",
    text: "Ces aides ne couvrent qu'une partie du budget. Voyez le coût réel d'une installation en 2026.",
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
  {
    title: 'Le tarif prosumer, combien ça coûte vraiment ?',
    text: 'La seule charge annuelle à anticiper, calculée sur votre puissance installée.',
    cta: { label: 'Comprendre le tarif', href: '/aides-primes/wallonie/prosumer' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Le détail des aides encore actives en 2026, dispositif par dispositif.',
};

/**
 * ⚠️ Trois de ces quatre destinations N'EXISTENT PAS ENCORE au sitemap
 * (`architecture.md` §Pilier 3 ne liste, pour la Wallonie, que « primes &
 * certificats verts », « tarif prosumer » et « démarches »). La maquette a été
 * dessinée en avance sur l'arborescence.
 *
 * Elles sont déclarées dans `site.ts` en `hidden` : le lien mène donc à un
 * gabarit « en cours de rédaction » en `noindex`, et n'apparaît pas dans les
 * méga-menus tant que la page n'est pas écrite. Aucun 404, aucune page vide
 * indexée (règle d'or #1), et rien à retoucher ici le jour où elles existent.
 *
 * Décision d'arborescence à confirmer : ces trois sujets méritent-ils leur page,
 * ou doivent-ils redescendre en accordéons sur celle-ci ?
 */
export const TOPICS: TopicCard[] = [
  {
    title: 'Le Rénoprêt en détail',
    text: `Prêt à taux 0 %, jusqu'à ${formatEuro(LOAN_MAX)}, remboursable sur 30 ans maximum via la SWCS.`,
    href: '/aides-primes/wallonie/renopret',
  },
  {
    title: 'Pourquoi les certificats verts ont disparu',
    text: "Le régime Solwatt s'est arrêté en 2014 pour les nouvelles installations résidentielles.",
    href: '/aides-primes/wallonie/certificats-verts',
  },
  {
    title: 'Comment est calculé le tarif prosumer',
    text: `Basé sur la puissance installée et un taux d'autoconsommation moyen de ${percent(SELF_CONSUMPTION_RATE)}.`,
    href: '/aides-primes/wallonie/prosumer',
  },
  {
    title: 'Les primes communales existent-elles encore ?',
    text: 'Certaines communes proposent encore une aide locale, à vérifier au cas par cas.',
    href: '/aides-primes/wallonie/primes-communales',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Puis-je encore toucher une prime pour mes panneaux solaires en Wallonie ?',
    answer:
      "Pas de prime régionale directe : la Wallonie n'en verse plus pour le photovoltaïque résidentiel, et les certificats verts se sont arrêtés en 2014 pour les nouvelles installations. Ce qui subsiste est indirect : le Rénoprêt à taux 0 %, la TVA à 6 % sur les logements de plus de dix ans, et parfois une aide de votre commune.",
  },
  {
    question: 'Comment fonctionne le Rénoprêt à taux 0 % ?',
    answer:
      `C'est un prêt sans intérêt accordé par la SWCS, jusqu'à ${formatEuro(LOAN_MAX)}, sur 30 ans maximum, sous conditions de revenus et d'âge du logement. Sans intérêts, le total remboursé est exactement le montant emprunté : seule la durée fait varier la mensualité.`,
    open: true,
  },
  {
    question: 'Le tarif prosumer est-il obligatoire pour tout le monde ?',
    answer:
      "Il s'applique à toute installation photovoltaïque raccordée au réseau en Wallonie : c'est la contribution à l'usage du réseau quand vous y injectez votre surplus et y puisez le soir. En tarif forfaitaire, son montant dépend de votre puissance installée, pas de ce que vous consommez : c'est ce qui le rend indolore pour les gros autoconsommateurs et coûteux pour les autres. Un tarif proportionnel, assis sur vos prélèvements réels, existe en alternative.",
  },
  {
    question: 'Ma commune propose-t-elle une aide spécifique ?',
    answer:
      "Certaines communes wallonnes maintiennent une prime locale, d'autres l'ont supprimée, et les montants varient fortement. C'est le seul point de cette page qui ne se vérifie pas à l'échelle régionale : il faut interroger votre administration communale, ou nous laisser le faire lors de l'étude.",
  },
  {
    question: "Les certificats verts, c'est vraiment terminé ?",
    answer:
      "Pour les nouvelles installations résidentielles, oui, depuis 2014 et la fin du régime Solwatt. Les installations qui en bénéficiaient à l'époque ont conservé leurs droits jusqu'au terme de leur période d'octroi, ce qui explique que le sujet revienne encore dans les conversations.",
  },
];

/**
 * ⚠️ Pont final réécrit le 2026-08-18. L'ancienne version annonçait « rentable
 * en 7 à 12 ans en moyenne » : ce chiffre décrit Bruxelles et la Flandre, jamais
 * la Wallonie, dont la rentabilité dépend presque entièrement du taux
 * d'autoconsommation. Ne plus jamais l'afficher sur cette page.
 *
 * Le seuil est CALCULÉ, comme sur les pages 3.3 et 3.4 — trois pages, un seul
 * chiffre, une seule source.
 */
export const FINAL_CTA = {
  title: 'Voyez ce que ça change sur votre facture',
  text: `En Wallonie, la rentabilité dépend surtout de votre taux d'autoconsommation : au-delà de ${breakEvenLabel(POWER_DEFAULT, { region: 'wallonie' }) ?? '45 %'}, l'installation reste positive sur toute sa durée de vie ; en dessous, le tarif prosumer pèse lourd. Calculez votre cas précis, tarif prosumer déjà intégré.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
