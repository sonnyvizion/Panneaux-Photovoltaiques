import type { APIRoute } from 'astro';
import type { SearchEntry } from '../scripts/search';
import type { Bridge, FaqItem, Fact, Figure, TopicCard } from '../data/content';
import { HOME_LINK, PILLARS, PRIMARY_CTA, TRUST_LINKS, publishedGroups } from '../data/site';
import { MANUAL_ENTRIES, NOT_INDEXED, PAGE_SOURCES } from '../data/searchSources';

/**
 * `search-index.json`, GÉNÉRÉ au build — l'index de la recherche interne.
 *
 * ⚠️ POURQUOI UN ENDPOINT ASTRO ET PAS UN SCRIPT DE BUILD. Il sort dans `dist/`
 * comme n'importe quelle page, sans étape supplémentaire, sans dépendance, et il
 * est TYPÉ : si un fichier de `data/pages/` change de forme, c'est `astro check`
 * qui le dit, pas un JSON silencieusement amputé en production.
 *
 * ⚠️ IL N'EST JAMAIS CHARGÉ AU RENDU D'UNE PAGE. `searchOverlay.ts` le
 * `fetch()` à la PREMIÈRE ouverture de la recherche, et le garde en mémoire
 * ensuite. Zéro octet pour qui n'ouvre pas la loupe (règle d'or #1).
 */

/** Ce qu'un fichier de `data/pages/` peut exporter. Tout est optionnel : les
    gabarits varient d'une famille de page à l'autre. */
interface PageModule {
  HERO?: { title?: string; answer?: string };
  LEAD?: { text?: string };
  FIGURES?: Figure[];
  FACTS?: Fact[];
  TOPICS?: TopicCard[];
  FAQ?: FaqItem[];
  BRIDGES?: Bridge[];
}

/* `eager` : on veut les modules au build, pas des promesses à l'exécution —
   cet endpoint tourne une fois, à la construction du site. */
const modules = import.meta.glob<PageModule>('../data/pages/*.ts', { eager: true });

/** `../data/pages/comprendre-onduleur.ts` → `comprendre-onduleur`. */
const byName = new Map<string, PageModule>(
  Object.entries(modules).map(([path, module]) => [
    path.replace(/^.*\//, '').replace(/\.ts$/, ''),
    module,
  ]),
);

/**
 * La réponse-clé, coupée à la phrase.
 *
 * C'est le seul texte long de l'index et il est AFFICHÉ tel quel sous le titre
 * du résultat. On coupe à la fin d'une phrase quand il y en a une avant la
 * limite : un « … » au milieu d'une proposition se lit mal, et la première
 * phrase d'une réponse-clé se suffit presque toujours.
 */
function summarize(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' — '));
  if (stop > max * 0.5) return cut.slice(0, stop + 1).trim();
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** Vide les chaînes nulles et les doublons — l'index n'a pas à les porter. */
const clean = (values: (string | undefined)[]): string[] => [
  ...new Set(values.filter((value): value is string => Boolean(value?.trim()))),
];

/**
 * Une page de contenu → son entrée d'index.
 *
 * ⚠️ LE DÉCOUPAGE `strong` / `weak` EST LE CŒUR DE LA PERTINENCE. Dans `strong`
 * vont les formulations qui NOMMENT un sujet — questions de FAQ, titres de
 * cartes, titres de faits. C'est ce qui permet à « onduleur bruit » de trouver
 * la page Onduleur, dont la FAQ porte exactement cette question. Dans `weak` va
 * le corps de texte, qui doit pouvoir être trouvé sans jamais dominer un titre.
 *
 * Les réponses de FAQ n'y sont PAS : elles pèsent la moitié du volume des
 * données pour un gain de rappel quasi nul (leur question porte déjà les mots
 * qui comptent), et l'index doit rester léger.
 */
function toEntry(href: string, label: string, pillar: string, page: PageModule): SearchEntry {
  return {
    href,
    label,
    pillar,
    title: page.HERO?.title ?? label,
    answer: summarize(page.HERO?.answer ?? ''),
    strong: clean([
      ...(page.FAQ ?? []).map((item) => item.question),
      ...(page.TOPICS ?? []).map((topic) => topic.title),
      ...(page.FACTS ?? []).map((fact) => fact.title),
      ...(page.BRIDGES ?? []).map((bridge) => bridge.title),
    ]),
    weak: clean([
      page.LEAD?.text,
      ...(page.FIGURES ?? []).flatMap((figure) => [figure.label, figure.value, figure.note]),
      ...(page.TOPICS ?? []).flatMap((topic) => [topic.text, ...(topic.items ?? [])]),
      ...(page.FACTS ?? []).map((fact) => fact.text),
    ]),
    context: context(href, pillar),
  };
}

/**
 * Ce que la page est dans l'architecture : son pilier, et les segments de son URL.
 *
 * ⚠️ Les deux disent des choses que le TEXTE de la page peut parfaitement taire.
 * `/aides-primes/bruxelles` s'intitule « Certificats verts à Bruxelles » et
 * n'écrit nulle part le mot « prime » — parce qu'à Bruxelles il n'y en a pas.
 * Sans ce champ, la requête « prime bruxelles » ne la trouvait pas et remontait
 * la Flandre : le pilier « Aides & primes » dit pourtant exactement ce que la
 * page est venue traiter, y compris quand sa réponse est « il n'y en a pas ».
 */
function context(href: string, pillar: string): string {
  return [pillar, ...href.split('/')].join(' ').replace(/-/g, ' ').trim();
}

/** Toute destination listée dans la navigation, avec son pilier d'origine. */
function listedDestinations(): { href: string; label: string; pillar: string }[] {
  const all = [
    { href: HOME_LINK.href, label: HOME_LINK.label, pillar: 'Le site' },
    { href: PRIMARY_CTA.href, label: PRIMARY_CTA.label, pillar: 'Le site' },
    ...PILLARS.flatMap((pillar) => [
      { href: pillar.href, label: pillar.label, pillar: pillar.label },
      ...publishedGroups(pillar).flatMap((group) =>
        group.links.map((link) => ({ href: link.href, label: link.label, pillar: pillar.label })),
      ),
    ]),
    ...TRUST_LINKS.filter((link) => link.published).map((link) => ({
      href: link.href,
      label: link.label,
      pillar: 'Le site',
    })),
  ];

  /* Trois colonnes portent « Démarches administratives » — une par région. Le
     premier gagne : les href, eux, sont bien distincts. */
  const seen = new Set<string>();
  return all.filter(({ href }) => (seen.has(href) ? false : (seen.add(href), true)));
}

/**
 * Le garde-fou. Il fait ÉCHOUER LE BUILD plutôt que de livrer un index troué.
 *
 * Deux dérives possibles, et aucune ne se voit à l'œil nu une fois le site en
 * ligne — c'est bien pourquoi elles sont vérifiées ici :
 *
 *  1. une page rejoint la navigation sans entrer dans la recherche : elle
 *     devient introuvable pour qui tape son nom, alors même qu'elle existe ;
 *  2. un fichier de `data/pages/` n'est réclamé par personne : il a été
 *     renommé, ou sa page a changé d'URL, et l'index sert un lien mort.
 *
 * Le message dit quoi faire, pas seulement ce qui ne va pas : ces erreurs
 * tombent des mois plus tard, sur quelqu'un qui n'a pas écrit ce fichier.
 */
function assertNoDrift(indexed: ReadonlySet<string>): void {
  const missing = listedDestinations()
    .map(({ href }) => href)
    .filter((href) => !indexed.has(href) && !(href in NOT_INDEXED));

  if (missing.length > 0) {
    throw new Error(
      `search-index : ${missing.length} page(s) de la navigation absente(s) de la recherche :\n` +
        missing.map((href) => `  ${href}`).join('\n') +
        `\n→ Ajouter chacune à PAGE_SOURCES ou MANUAL_ENTRIES dans src/data/searchSources.ts,\n` +
        `  ou, si elle n'a pas encore de contenu, à NOT_INDEXED avec sa raison.`,
    );
  }

  const orphans = [...byName.keys()].filter(
    (name) => !Object.values(PAGE_SOURCES).includes(name),
  );

  if (orphans.length > 0) {
    throw new Error(
      `search-index : ${orphans.length} fichier(s) de données que personne ne réclame :\n` +
        orphans.map((name) => `  src/data/pages/${name}.ts`).join('\n') +
        `\n→ Leur donner leur href dans PAGE_SOURCES (src/data/searchSources.ts).`,
    );
  }
}

function buildIndex(): SearchEntry[] {
  const destinations = new Map(listedDestinations().map((d) => [d.href, d]));
  const entries: SearchEntry[] = [...MANUAL_ENTRIES];

  /* Parcouru dans l'ordre de la NAVIGATION et non de PAGE_SOURCES : à score
     égal, `search()` conserve l'ordre de l'index, qui devient ainsi l'ordre
     éditorial du site plutôt que l'ordre alphabétique des fichiers. */
  for (const { href, label, pillar } of destinations.values()) {
    const name = PAGE_SOURCES[href];
    if (!name) continue; // page manuelle, ou volontairement non indexée

    const page = byName.get(name);
    if (!page) {
      throw new Error(
        `search-index : PAGE_SOURCES pointe « ${href} » vers src/data/pages/${name}.ts, ` +
          `qui n'existe pas.`,
      );
    }
    entries.push(toEntry(href, label, pillar, page));
  }

  assertNoDrift(new Set(entries.map((entry) => entry.href)));
  return entries;
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildIndex()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
