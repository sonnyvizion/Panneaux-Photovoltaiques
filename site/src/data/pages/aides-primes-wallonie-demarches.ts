import type { FaqItem, SectionCopy, TimelineStep } from '../content';
import type { PageSeo } from '../seo';

/**
 * Contenu de la page « Démarches administratives Wallonie »
 * (`/aides-primes/wallonie/demarches`).
 *
 * Page 1.3 du cahier de construction, **gabarit allégé** : hero → transition →
 * timeline → FAQ → pont. Ni « L'essentiel », ni « Creuser le sujet » — une
 * démarche administrative n'a pas de profondeur à replier, elle a des étapes à
 * suivre dans l'ordre.
 *
 * Texte repris tel quel du cahier. Seul l'`imageAlt` est rédigé ici : le cahier
 * ne décrit pas les photos.
 */

/**
 * Ce que Google lit en tête de page — contraintes vérifiées au build
 * (`data/seo.ts`).
 *
 * La requête réelle est « déclaration panneaux solaires Wallonie » / « démarches
 * panneaux solaires Wallonie » : c'est le délai de 45 jours que les gens
 * cherchent, et la description le donne d'emblée plutôt que de le promettre.
 */
export const SEO: PageSeo = {
  title: 'Démarches panneaux solaires Wallonie 2026 | Belgreen',
  description:
    'Compteur communicant, contrôle RGIE, déclaration au gestionnaire de réseau dans les 45 jours : les quatre étapes obligatoires, dans l’ordre, expliquées.',
};

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Les démarches pour installer des panneaux solaires en Wallonie',
  answer:
    "En Wallonie, il faut demander un compteur communicant à votre GRD (gratuit), faire contrôler l'installation par un organisme RGIE agréé, puis déclarer la mise en service dans les 45 jours.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Toiture résidentielle wallonne équipée de panneaux solaires, vue depuis la rue',
} as const;

export const LEAD = {
  text: "Contrairement à Bruxelles, il n'y a pas de certificats à demander en Wallonie, mais les étapes administratives restent incontournables pour que votre installation soit en règle.",
  note: 'Les quatre étapes, dans l’ordre où elles se présentent.',
} as const;

export const TIMELINE_COPY: SectionCopy = {
  overline: 'Étape par étape',
  title: 'Le parcours administratif',
  intro: 'De la demande de compteur à la déclaration finale.',
};

/* ⚠️ La pastille de l'étape 3 est l'argument anti-intermédiaire posé là où le
   doute naît — au milieu d'une liste de formalités (règle d'or #7). Une seule
   étape la porte, sinon elle ne signale plus rien. */
export const TIMELINE: TimelineStep[] = [
  {
    title: 'Compteur communicant',
    text: 'Demande gratuite auprès de votre GRD (ORES ou RESA), avant la mise en service.',
  },
  {
    title: 'Identification de la zone de toiture',
    text: 'Sans ombrage, orientée idéalement est-sud-ouest.',
  },
  {
    title: 'Contrôle RGIE',
    text: 'Obligatoire avant la mise en service, quelle que soit la puissance installée.',
    badge: 'Pris en charge par notre équipe',
  },
  {
    title: 'Déclaration de mise en service',
    text: 'Dans les 45 jours suivant le contrôle, auprès du GRD.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Qui contacte le gestionnaire de réseau, moi ou l’installateur ?',
    answer: 'Votre installateur s’en charge généralement avec vous.',
    open: true,
  },
  {
    question: 'Combien de temps prennent ces démarches au total ?',
    answer:
      'Comptez plusieurs semaines entre la demande de compteur et la déclaration finale, hors délai de pose.',
  },
  {
    question: 'Que risque-t-on si on ne déclare pas la mise en service ?',
    answer:
      "Une installation non déclarée n'est pas en règle et peut poser problème en cas de contrôle ou de revente du bien.",
  },
  {
    question: 'Le contrôle RGIE, c’est payant ?',
    answer:
      "Oui, c'est un coût à prévoir dans le budget, distinct du prix de l'installation elle-même.",
  },
];

export const FINAL_CTA = {
  title: 'Notre équipe s’occupe de toutes ces démarches pour vous',
  text: "Vous parlez directement à l'équipe qui installe. Pas d'intermédiaire, pas de dossier à monter seul.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
