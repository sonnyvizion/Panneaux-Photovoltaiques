import { NOT_INDEXED, PAGE_SOURCES } from './searchSources';
import { PILLARS } from './site';

/**
 * Les métadonnées de tête de page — `<title>`, `<meta description>`, et qui a le
 * droit d'être indexé.
 *
 * ⚠️ POURQUOI CETTE COUCHE EXISTE. Jusqu'ici le `<title>` était un littéral posé
 * dans chacun des 56 `.astro` et la `description` n'existait nulle part. Deux
 * conséquences : aucune page n'avait de description (le texte que Google affiche
 * sous le lien), et rien ne reliait le `<title>` au H1 de la même page — ils
 * pouvaient partir dans deux directions sans que personne ne le voie.
 *
 * La source devient donc le fichier de données de la page, comme pour tout le
 * reste du contenu (`data/pages/*.ts` → `export const SEO`). `BaseLayout` ne
 * reçoit plus de titre : il le résout depuis l'URL qu'il est en train de rendre.
 *
 * ⚠️ Ces champs PRÉFIGURENT LE MODÈLE SANITY, comme les blocs de `content.ts` :
 * un document Sanity portera son objet `seo { title, description }`. Le jour de
 * la bascule, `resolveSeo` disparaît et le document répond à sa place.
 */

/** Ce que Google lit en tête de page. Rien d'autre ne vit ici. */
export interface PageSeo {
  /**
   * Le `<title>`. **≤ 60 caractères**, suffixe ` | Belgreen` compris.
   *
   * Au-delà, Google tronque et le mot de la fin est perdu. Douze pages
   * dépassaient 70 caractères avant cette couche — d'où le garde-fou, qui est
   * la seule façon de ne pas y revenir.
   */
  title: string;
  /**
   * La `<meta description>`. **110 à 160 caractères.**
   *
   * Ce n'est pas un facteur de classement, c'est l'argument d'un lien dans une
   * liste de dix. Trop courte, elle laisse de la place vide ; trop longue, elle
   * est coupée au milieu d'un mot. La matière de départ est `HERO.answer`, qui
   * répond déjà à la question de la page en une ou deux phrases.
   */
  description: string;
}

/**
 * Pages sans fichier de données, décrites à la main.
 *
 * Même parti pris que `MANUAL_ENTRIES` dans `searchSources.ts` : ce qui n'a pas
 * de fichier de contenu est écrit ici, explicitement, plutôt que deviné.
 *
 * Les pages en `noindex` y figurent aussi. Une page non indexée porte quand même
 * un titre — c'est ce que lit l'onglet du navigateur, et ce qui s'affiche quand
 * quelqu'un partage le lien.
 */
export const MANUAL_SEO: Readonly<Record<string, PageSeo>> = {
  '/': {
    title: 'Panneaux solaires Belgique : estimation gratuite | Belgreen',
    description:
      'Production, coût, économies et primes de votre région : estimez votre installation photovoltaïque en quelques questions, sans laisser vos coordonnées.',
  },
  '/simulateur': {
    title: 'Simulateur panneaux solaires Belgique | Belgreen',
    description:
      'Combien produirait votre toit, combien ça coûterait, en combien de temps c’est amorti : votre estimation en quelques questions, gratuite et sans engagement.',
  },
  '/contact': {
    title: 'Nous contacter — Belgreen',
    description:
      'Parlez directement à l’équipe qui installera vos panneaux : pas d’intermédiaire, pas de revente de vos données à des installateurs partenaires.',
  },
  '/realisations': {
    title: 'Nos chantiers photovoltaïques — Belgreen',
    description:
      'Des installations que nous avons posées nous-mêmes en Belgique : puissance, production réelle et configuration de toiture, chantier par chantier.',
  },
  '/devis': {
    title: 'Recevoir mon devis — Belgreen',
    description:
      'Recevez un devis de l’équipe qui posera vos panneaux, établi sur votre toiture réelle et votre consommation — sans intermédiaire ni revente de données.',
  },
  '/etude': {
    title: 'Réserver mon étude gratuite — Belgreen',
    description:
      'Une étude de toiture gratuite et sans engagement, menée par nos installateurs certifiés Enphase, pour valider l’estimation faite par le simulateur.',
  },
  '/rapport': {
    title: 'Recevoir mon estimation par e-mail — Belgreen',
    description:
      'Recevez le détail de votre estimation photovoltaïque par e-mail : production, coût, économies annuelles et primes applicables dans votre région.',
  },
  '/rapport/document': {
    title: 'Votre estimation photovoltaïque — Belgreen',
    description:
      'Le détail de votre estimation : production annuelle, coût de l’installation, économies attendues et courbe d’amortissement sur vingt-cinq ans.',
  },
  '/design-system': {
    title: 'Design system — QA interne',
    description:
      'Inventaire des composants, des couleurs et des échelles typographiques du site. Page de contrôle interne, sans contenu destiné aux visiteurs.',
  },
};

/**
 * Ce que Google n'a pas le droit d'indexer.
 *
 * ⚠️ REGISTRE UNIQUE, ET C'EST LE POINT. Avant, `noindex` était une prop passée
 * à `BaseLayout` dans dix fichiers `.astro`, et le sitemap n'existait pas. Le
 * jour où l'on ajoute un sitemap, deux listes disent la même chose à deux
 * endroits — et un sitemap qui déclare une page en `noindex` est une
 * contradiction que Google fait remonter en erreur dans la Search Console.
 *
 * Les deux dérivent donc d'ici : `BaseLayout` pour la balise, `sitemap.xml.ts`
 * pour l'inventaire. Une page retirée de cette liste devient indexable ET entre
 * dans le sitemap, en un seul geste.
 *
 * `NOT_INDEXED` (recherche interne) est repris tel quel : une page trop vide
 * pour la recherche du site est trop vide pour Google. L'inverse n'est pas vrai
 * — `/simulateur` est le meilleur résultat de la recherche interne et n'a
 * pourtant rien à faire dans les résultats Google (c'est un outil, pas une
 * réponse).
 */
export const NOINDEX_PATHS: ReadonlySet<string> = new Set([
  ...Object.keys(NOT_INDEXED),
  '/simulateur',
  '/devis',
  '/etude',
  '/rapport',
  '/rapport/document',
  '/design-system',
]);

/* `eager` : les modules au build, pas des promesses à l'exécution — même raison
   que dans `search-index.json.ts`, qui globe déjà exactement ces fichiers. */
const modules = import.meta.glob<{ SEO?: PageSeo; HERO?: { title: string } }>('./pages/*.ts', {
  eager: true,
});

/** `./pages/comprendre-onduleur.ts` → `comprendre-onduleur`. */
const byName = new Map(
  Object.entries(modules).map(([path, module]) => [
    path.replace(/^.*\//, '').replace(/\.ts$/, ''),
    module,
  ]),
);

/**
 * `/comprendre/onduleur/` → `/comprendre/onduleur`.
 *
 * `Astro.url.pathname` porte une barre finale au build et pas au `dev` selon la
 * page. Les clés de `PAGE_SOURCES`, elles, n'en ont jamais — on normalise donc
 * avant de comparer, faute de quoi la moitié des pages ne se résoudraient qu'en
 * développement.
 */
export function normalizePath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

/** Toutes les pages qui ont des métadonnées, indexables ou non. */
export function allSeoPaths(): string[] {
  return [...Object.keys(PAGE_SOURCES), ...Object.keys(MANUAL_SEO)].sort();
}

function lookup(path: string): PageSeo | undefined {
  const manual = MANUAL_SEO[path];
  if (manual) return manual;

  const source = PAGE_SOURCES[path];
  if (!source) return undefined;

  return byName.get(source)?.SEO;
}

/**
 * Les métadonnées de la page rendue, ou `undefined` si l'URL n'est pas connue.
 *
 * `undefined` n'est pas une anomalie : `[...slug].astro` fabrique des URL qui
 * n'ont ni fichier de données ni entrée manuelle, et se décrit lui-même via ses
 * props. Ce qui serait une anomalie, c'est une page de `PAGE_SOURCES` sans `SEO`
 * — et celle-là casse le build (voir `assertSeoCoverage`).
 */
export function resolveSeo(pathname: string): PageSeo | undefined {
  return lookup(normalizePath(pathname));
}

export function isNoindex(pathname: string): boolean {
  return NOINDEX_PATHS.has(normalizePath(pathname));
}

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Le fil d'Ariane de la page, d'« Accueil » jusqu'à elle.
 *
 * Il ne s'affiche nulle part : c'est du `BreadcrumbList`, lu par Google, qui
 * remplace l'URL brute sous le titre du résultat par « Belgreen › Comprendre ›
 * Onduleur ». L'arborescence à trois niveaux existe déjà entièrement dans
 * `site.ts` — elle n'était simplement jamais déclarée à Google.
 *
 * ⚠️ Le nom de la page vient de son `HERO.title`, c'est-à-dire de son H1 réel,
 * jamais d'un libellé recopié. Même règle que `toCard()` dans `pillarIndex.ts` :
 * un titre qui change entraîne son fil d'Ariane avec lui, sans qu'on ait à y
 * penser. Les segments intermédiaires, eux, prennent le libellé court du pilier
 * (« Comprendre ») plutôt que son H1, qui est une phrase entière.
 */
export function breadcrumbFor(pathname: string): Crumb[] {
  const path = normalizePath(pathname);
  if (path === '/') return [];

  const crumbs: Crumb[] = [{ name: 'Accueil', path: '/' }];
  const segments = path.slice(1).split('/');

  for (let i = 0; i < segments.length; i += 1) {
    const current = `/${segments.slice(0, i + 1).join('/')}`;
    const isLast = i === segments.length - 1;

    const pillar = PILLARS.find((p) => p.href === current);
    const heroTitle = byName.get(PAGE_SOURCES[current] ?? '')?.HERO?.title;
    const name = (!isLast && pillar?.label) || heroTitle || pillar?.label;

    /* Un segment intermédiaire sans page réelle — `/aides-primes/wallonie/` n'a
       pas d'ancêtre nommé autrement. On saute plutôt que d'inventer un libellé
       depuis le slug : « Aides Primes » n'est le nom de rien. */
    if (!name) continue;

    crumbs.push({ name, path: current });
  }

  return crumbs.length > 1 ? crumbs : [];
}

const TITLE_MAX = 60;
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 160;

/**
 * Le garde-fou : une page sans métadonnées, ou avec des métadonnées hors format,
 * FAIT ÉCHOUER LE BUILD.
 *
 * ⚠️ Même parti pris que `assertNoDrift` dans `search-index.json.ts` et que
 * `toCard()` dans `pillarIndex.ts` : un oubli doit casser bruyamment, jamais
 * disparaître en silence. Une `description` manquante ne se voit pas à l'œil —
 * la page s'affiche parfaitement, et c'est Google qui écrit la sienne à notre
 * place, six semaines plus tard.
 *
 * Les bornes ne sont pas des goûts personnels : au-delà de 60 caractères le
 * titre est tronqué en résultat de recherche, au-delà de 160 la description
 * l'est aussi, et en dessous de 110 on laisse à Google de la place qu'il
 * remplira avec un morceau de page choisi par lui.
 */
export function assertSeoCoverage(): void {
  const problems: string[] = [];

  for (const path of allSeoPaths()) {
    const seo = lookup(path);

    if (!seo) {
      problems.push(
        `${path} — aucun \`export const SEO\` dans \`data/pages/${PAGE_SOURCES[path]}.ts\`.`,
      );
      continue;
    }

    if (seo.title.length > TITLE_MAX) {
      problems.push(`${path} — titre de ${seo.title.length} car. (max ${TITLE_MAX}) : « ${seo.title} »`);
    }
    if (seo.description.length < DESCRIPTION_MIN || seo.description.length > DESCRIPTION_MAX) {
      problems.push(
        `${path} — description de ${seo.description.length} car. (attendu ${DESCRIPTION_MIN}–${DESCRIPTION_MAX}).`,
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `Métadonnées SEO incomplètes ou hors format :\n\n${problems.map((p) => `  · ${p}`).join('\n')}\n\n` +
        'Chaque page de `PAGE_SOURCES` doit exporter `SEO = { title, description }` depuis son ' +
        'fichier de `data/pages/`. Les pages sans fichier de données se décrivent dans ' +
        '`MANUAL_SEO` (`data/seo.ts`).',
    );
  }
}
