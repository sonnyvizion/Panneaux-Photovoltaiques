import type { FaqItem, SectionCopy, TimelineStep } from '../content';
import type { PageSeo } from '../seo';

/**
 * Contenu de la page « Démarches administratives Flandre »
 * (`/aides-primes/flandre/demarches`).
 *
 * Page 1.9 du cahier de construction, **gabarit allégé** — même structure que
 * `aides-primes-wallonie-demarches.ts`, dont elle ne diffère que par le contenu.
 * C'est exactement ce que le registre des modules cherchait : trois pages, un
 * composant, trois fichiers de données.
 *
 * ⚠️ Page en FRANÇAIS sur une région néerlandophone : c'est voulu, le site est
 * bilingue et la version NL viendra de Sanity (CLAUDE.md § Langues). Les noms
 * propres restent en néerlandais — « Mijn Fluvius » est le nom du service, pas
 * une expression à traduire.
 */

/** Métadonnées de tête de page — contraintes dans `data/seo.ts`, vérifiées au build. */
export const SEO: PageSeo = {
  title: 'Démarches panneaux solaires en Flandre | Belgreen',
  description:
    'Compteur digital Fluvius, déclaration sur Mijn Fluvius, délais à prévoir : le parcours complet pour raccorder vos panneaux solaires en Flandre.',
};

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Les démarches pour installer des panneaux solaires en Flandre',
  answer:
    "En Flandre, le compteur digital Fluvius est obligatoire pour bénéficier du tarif d'injection. La déclaration se fait via la plateforme Mijn Fluvius.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Maison flamande de plain-pied dont la toiture porte des panneaux solaires, au bord d’un canal',
} as const;

export const LEAD = {
  text: 'Ici, tout passe par un seul interlocuteur, Fluvius, ce qui simplifie les démarches par rapport à Bruxelles.',
  note: 'Les trois étapes, dans l’ordre où elles se présentent.',
} as const;

export const TIMELINE_COPY: SectionCopy = {
  overline: 'Étape par étape',
  title: 'Le parcours administratif',
  intro: 'Du compteur digital à l’activation du tarif d’injection.',
};

export const TIMELINE: TimelineStep[] = [
  {
    title: 'Compteur digital Fluvius',
    text: "Obligatoire pour accéder au tarif d'injection.",
  },
  {
    title: 'Déclaration de mise en service',
    text: 'Via la plateforme en ligne Mijn Fluvius.',
  },
  {
    title: 'Activation du tarif d’injection',
    text: 'Une fois le compteur digital installé et la déclaration validée.',
    badge: 'Pris en charge par notre équipe',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Comment demander mon compteur digital à Fluvius ?',
    answer: 'Via leur plateforme en ligne ou en contactant directement Fluvius.',
    open: true,
  },
  {
    question: 'Que faire si je n’ai pas encore de compteur digital ?',
    answer:
      'Vous êtes probablement dans la file d’attente du déploiement en cours (voir la page « Fin du compteur inversé »).',
  },
  {
    question: 'Le compteur digital est-il payant ?',
    answer: 'Non, le déploiement est pris en charge par Fluvius.',
  },
  {
    question: 'Combien de temps prend l’installation du compteur ?',
    answer:
      'Ça dépend du calendrier de déploiement dans votre zone : comptez plusieurs semaines à quelques mois.',
  },
];

export const FINAL_CTA = {
  title: 'On gère ces démarches avec Fluvius pour vous',
  text: "Vous parlez directement à l'équipe qui installe. Pas d'intermédiaire, pas de dossier à monter seul.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
