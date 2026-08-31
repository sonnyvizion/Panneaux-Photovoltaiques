import type { ImageMetadata } from 'astro';
import { type NavLink, type NavPillar, publishedGroups } from './site';
import { PAGE_SOURCES } from './searchSources';
import { heroImage } from './pageHeroes';

/**
 * Les cartes d'une page « vue d'ensemble » de pilier, DÉRIVÉES du sitemap.
 *
 * ⚠️ RIEN N'EST RÉÉCRIT ICI. Une carte de hub, c'est la miniature du hero d'une
 * page et sa question — le H1 lui-même, tel quel. Recopier ces titres dans un
 * fichier de contenu aurait créé une seconde source de vérité qui dérive : on
 * corrige une question dans le hero, le hub continue d'annoncer l'ancienne, et
 * le visiteur clique sur une promesse qui ne l'attend pas à l'arrivée.
 *
 * Conséquence voulue : **une page publiée dans la nav apparaît d'elle-même dans
 * son hub**, avec le bon titre et la bonne photo, sans toucher au hub.
 *
 * ⚠️ LES PAGES `hidden` EN SONT ABSENTES, comme des méga-menus, du footer et de
 * la recherche : `/aides-primes/entreprises` reste liable mais ne se liste pas
 * tant que son volet fiscal n'est pas validé (voir `hidden` dans `site.ts`). Un
 * hub est un inventaire de navigation — il suit la même règle que les autres.
 */

/** Ce qu'un fichier de `data/pages/` doit exposer pour entrer dans un hub. */
interface PageModule {
  HERO?: { title?: string; answer?: string; imageAlt?: string };
}

const modules = import.meta.glob<PageModule>('./pages/*.ts', { eager: true });

/** `./pages/comprendre-onduleur.ts` → `comprendre-onduleur`. */
const byName = new Map<string, PageModule>(
  Object.entries(modules).map(([path, module]) => [
    path.replace(/^.*\//, '').replace(/\.ts$/, ''),
    module,
  ]),
);

export interface IndexCard {
  href: string;
  /** Le libellé de la nav — sert au `title` du lien, pas à l'affichage. */
  label: string;
  /** LE H1 de la page visée. C'est lui qui porte le maillage interne. */
  question: string;
  image?: ImageMetadata;
}

export interface IndexGroup {
  /** L'intitulé de la colonne du méga-menu : « Le principe », « Wallonie »… */
  label?: string;
  /** La rampe vers le simulateur que `site.ts` accroche au groupe. */
  ramp?: NavLink;
  cards: IndexCard[];
}

/**
 * Les groupes d'un pilier, prêts à rendre.
 *
 * Lève si une page listée n'a pas de contenu : c'est le même contrat que la
 * recherche (`PAGE_SOURCES`), et une carte vide dans un hub est exactement ce
 * que la règle d'or #1 interdit de livrer.
 */
export function pillarGroups(pillar: NavPillar): IndexGroup[] {
  return publishedGroups(pillar).map((group) => ({
    label: group.label,
    ramp: group.ramp,
    cards: group.links.map((link) => toCard(link, pillar.label)),
  }));
}

function toCard(link: NavLink, pillar: string): IndexCard {
  const name = PAGE_SOURCES[link.href];
  const page = name ? byName.get(name) : undefined;
  const question = page?.HERO?.title;

  if (!question) {
    throw new Error(
      `pillarIndex : « ${link.label} » (${link.href}) est listée dans le pilier ` +
        `« ${pillar} » mais n'a pas de question à afficher.\n` +
        `→ Vérifier son entrée dans PAGE_SOURCES (src/data/searchSources.ts) et\n` +
        `  l'export HERO de son fichier de données.`,
    );
  }

  return {
    href: link.href,
    label: link.label,
    question,
    image: heroImage(link.href),
  };
}
