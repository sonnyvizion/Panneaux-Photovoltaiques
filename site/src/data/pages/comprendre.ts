import type { FaqItem, SectionCopy } from '../content';
import type { PageSeo } from '../seo';

/**
 * Pilier 4 — page « vue d'ensemble » de Comprendre (`/comprendre`).
 *
 * ⚠️ CE N'EST PAS UNE PAGE DE CONTENU, c'est une PORTE. Le méga-menu et le
 * footer l'annoncent depuis la refonte de la nav (« Vue d'ensemble → », « Voir
 * tout → ») ; elle servait jusqu'ici un gabarit « en cours de rédaction ».
 *
 * Elle suit donc le gabarit ALLÉGÉ : hero → transition → inventaire → FAQ →
 * pont. Ni « L'essentiel », ni « Creuser le sujet » — les onze pages du pilier
 * sont la profondeur, et les répéter ici créerait un doublon de contenu qui se
 * périmerait à la première correction.
 *
 * ⚠️ LES CARTES NE SONT PAS ÉCRITES ICI. Elles sont dérivées de `site.ts` et
 * des `HERO.title` des pages visées — voir `data/pillarIndex.ts`.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * Le hub ne dispute pas « comment fonctionne un panneau solaire » à la page
 * Fonctionnement : il vise la requête d'entrée du sujet, « comprendre les
 * panneaux solaires », et laisse chaque page cadette prendre la sienne.
 */
export const SEO: PageSeo = {
  title: 'Comprendre les panneaux solaires en Belgique | Belgreen',
  description:
    'Fonctionnement, types de panneaux, onduleur, batterie, durée de vie, entretien : onze pages pour comprendre le photovoltaïque belge sans jargon.',
};

export const HERO = {
  badge: 'Comprendre',
  title: 'Que faut-il comprendre avant d’installer des panneaux solaires ?',
  answer:
    'Le principe tient en une phrase : vos panneaux produisent du courant continu, l’onduleur le convertit, votre maison le consomme et le surplus part sur le réseau. Le reste — types de panneaux, batterie, durée de vie, entretien — se lit page par page, dans l’ordre que vous voulez.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  /* ⚠️ Photo empruntée à la page « Fonctionnement » faute de visuel dédié : le
     hub n'a pas sa propre image au cahier de construction (CLAUDE.md, « À
     compléter »). Elle a le bon format (2560px) et une canopée sombre en haut
     de cadre, qui garde la nav transparente lisible. */
  imageAlt:
    'Toiture résidentielle couverte de panneaux photovoltaïques sous un ciel dégagé',
} as const;

export const LEAD = {
  text: 'Onze pages pour comprendre le photovoltaïque sans jargon : le principe, ce qu’il y a dans une installation, et ce qu’elle devient au fil des années.',
} as const;

export const INDEX_COPY: SectionCopy = {
  overline: 'Le pilier en entier',
  title: 'Le photovoltaïque, page par page',
  intro: 'Chaque page répond à une question, et donne l’ordre de grandeur qui va avec.',
};

export const FAQ: FaqItem[] = [
  {
    question: 'Par où commencer si je n’y connais rien ?',
    answer:
      'Par « Fonctionnement des panneaux » : elle explique le trajet de l’électricité, du panneau à votre prise. Les autres pages en découlent — l’onduleur, la batterie et le compteur y sont déjà nommés.',
    open: true,
  },
  {
    question: 'Faut-il comprendre tout ça pour se lancer ?',
    answer:
      'Non. Un devis sérieux vous est expliqué par l’installateur qui viendra chez vous. Ces pages servent à ne pas signer sans comprendre — et à repérer un devis qui promet l’impossible.',
  },
  {
    question: 'Ces pages parlent-elles de prix et d’aides ?',
    answer:
      'À peine — c’est le sujet de deux autres piliers. Ici on explique le matériel et son comportement dans la durée ; les chiffres d’argent vivent dans « Rentabilité & prix » et « Aides & primes ».',
  },
  {
    question: 'Combien de temps dure une installation photovoltaïque ?',
    answer:
      'Les panneaux sont garantis en production sur 25 à 30 ans et continuent de produire au-delà, avec une perte de rendement de l’ordre de 0,5 % par an. L’onduleur, lui, est la pièce qu’on remplace en cours de route. Le détail est en pages « Longévité » et « Garanties ».',
  },
];

export const FINAL_CTA = {
  title: 'Et chez vous, ça donnerait quoi ?',
  text: "Production, coût, économies : votre estimation en quelques questions, sans laisser vos coordonnées. Vous parlez ensuite directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
