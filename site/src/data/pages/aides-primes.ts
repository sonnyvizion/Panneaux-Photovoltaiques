import type { FaqItem, SectionCopy } from '../content';
import type { PageSeo } from '../seo';

/**
 * Pilier 1 — page « vue d'ensemble » d'Aides & primes (`/aides-primes`).
 *
 * ⚠️ CE PILIER EST ORGANISÉ PAR RÉGION, pas par thème (`architecture.md`) : les
 * aides, les mécanismes et jusqu'au vocabulaire diffèrent d'une région à
 * l'autre. Le hub reprend donc les trois colonnes du méga-menu telles quelles,
 * avec leur rampe régionalisée (`?region=…`) — c'est le seul endroit du site où
 * un visiteur voit les trois régimes côte à côte.
 *
 * ⚠️ NE PAS ÉCRIRE DE MONTANTS ICI. Une prime change de barème par arrêté ; la
 * seule promesse tenable sur un hub est « ça dépend de votre région, et voici
 * où le lire ». Les chiffres vivent dans les pages régionales, avec leur date.
 *
 * Gabarit allégé (hero → transition → inventaire → FAQ → pont), même raison que
 * `comprendre.ts`.
 */

/**
 * Ce que Google lit en tête de page — voir `data/seo.ts` pour les contraintes,
 * que le build vérifie.
 *
 * Le hub vise la requête générique « primes panneaux solaires Belgique », que
 * les trois pages régionales ne peuvent pas viser sans se cannibaliser entre
 * elles : chacune porte sa région, celle-ci porte le pays et l'aiguillage.
 */
export const SEO: PageSeo = {
  title: 'Primes panneaux solaires Belgique 2026 | Belgreen',
  description:
    'Wallonie, Bruxelles, Flandre : trois régimes différents. Primes, prêts à taux réduit et compensation du surplus, région par région, à jour pour 2026.',
};

export const HERO = {
  badge: 'Aides & primes',
  title: 'À quelles aides avez-vous droit pour vos panneaux solaires ?',
  answer:
    'Cela dépend d’abord de votre région : la Wallonie, Bruxelles et la Flandre n’ont ni les mêmes primes, ni les mêmes mécanismes de compensation, ni les mêmes démarches. Choisissez la vôtre ci-dessous. Le régime, les conditions et les formulaires y sont détaillés.',
  cta: { label: 'Calculer ma prime', href: '/simulateur' },
  /* ⚠️ Photo empruntée à la page « Wallonie » faute de visuel dédié au hub
     (CLAUDE.md, « À compléter »). */
  imageAlt:
    'Maison individuelle belge équipée de panneaux solaires en toiture',
} as const;

export const LEAD = {
  text: 'Trois régions, trois régimes. Ce qui vaut à Namur ne vaut ni à Bruxelles ni à Anvers, et un site qui vous annonce « la prime belge » se trompe forcément pour deux visiteurs sur trois.',
} as const;

export const INDEX_COPY: SectionCopy = {
  overline: 'Le pilier en entier',
  title: 'Les aides, région par région',
  intro: 'Le régime en vigueur, les conditions à remplir et les démarches à faire, pour chacune des trois régions.',
};

export const FAQ: FaqItem[] = [
  {
    question: 'Comment savoir de quelle région je dépends ?',
    answer:
      'C’est l’adresse de l’installation qui compte, pas votre domicile fiscal ni celui de l’installateur. Votre code postal suffit à trancher : le simulateur en déduit votre région dès la première question.',
    open: true,
  },
  {
    question: 'Peut-on cumuler plusieurs aides ?',
    answer:
      'Parfois, mais jamais automatiquement : certaines primes régionales se cumulent avec une prime communale ou un prêt à taux réduit, d’autres s’excluent. Chaque page régionale précise ce qui se cumule et ce qui ne se cumule pas.',
  },
  {
    question: 'Les primes sont-elles versées avant ou après les travaux ?',
    answer:
      'Après, dans tous les cas, et sur dossier : il faut donc pouvoir financer l’installation d’abord. C’est précisément ce que les pages « Démarches administratives » détaillent, région par région.',
  },
  {
    question: 'Les montants annoncés ici sont-ils garantis ?',
    answer:
      'Non. Un barème se modifie par décision régionale, parfois en cours d’année. Les pages portent la date du régime qu’elles décrivent ; en cas de doute, la source officielle de votre région fait foi, et notre équipe vérifie ce qui s’applique à votre dossier avant de chiffrer.',
  },
];

export const FINAL_CTA = {
  title: 'Voyez ce que votre région change pour vous',
  text: "Primes, compensation, tarif réseau : l'estimation tient compte du régime de votre région. Vous parlez ensuite directement à l'équipe qui installe.",
  cta: { label: 'Calculer ma prime', href: '/simulateur' },
} as const;
