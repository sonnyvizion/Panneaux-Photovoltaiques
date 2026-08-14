/**
 * Propagation de la région choisie dans le header vers les liens `/simulateur`.
 *
 * `nav.md` : « une rampe vers le simulateur sans param région est une occasion
 * manquée ». Le simulateur ne doit jamais s'ouvrir vide quand le contexte
 * connaît déjà la région.
 */

/** Les trois régions belges — le simulateur ne sait rien calculer d'autre. */
export const VALID_REGIONS = ['wallonie', 'bruxelles', 'flandre'] as const;
export type Region = (typeof VALID_REGIONS)[number];

const STORAGE_KEY = 'belgreen:region';
const SIMULATOR_PATH = '/simulateur';

/** Base arbitraire : elle sert à parser, jamais à produire une URL absolue. */
const PARSE_BASE = 'https://x.invalid';

export function isRegion(value: unknown): value is Region {
  return typeof value === 'string' && (VALID_REGIONS as readonly string[]).includes(value);
}

/**
 * Un href interne visant le simulateur.
 *
 * Volontairement strict : un href absolu est écarté (rien ne dit que l'hôte est
 * le nôtre), et `/simulateur-avis` n'est pas `/simulateur` — d'où le test du
 * séparateur plutôt qu'un simple `startsWith`.
 */
export function isSimulatorLink(href: string): boolean {
  if (!href.startsWith('/')) return false;
  const path = new URL(href, PARSE_BASE).pathname;
  return path === SIMULATOR_PATH || path.startsWith(`${SIMULATOR_PATH}/`);
}

/**
 * Le même href, portant `?region=`.
 *
 * Renvoie l'href inchangé si ce n'est pas un lien simulateur, et retire le
 * paramètre si aucune région valide n'est fournie — un `?region=` vide ferait
 * croire au simulateur qu'une réponse a été donnée.
 */
export function withRegion(href: string, region: string | null | undefined): string {
  if (!isSimulatorLink(href)) return href;

  const url = new URL(href, PARSE_BASE);
  if (isRegion(region)) {
    url.searchParams.set('region', region);
  } else {
    url.searchParams.delete('region');
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

/** La région mémorisée, ou `null`. Le stockage peut être refusé (mode privé). */
export function readStoredRegion(): Region | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isRegion(stored) ? stored : null;
  } catch {
    return null;
  }
}

function storeRegion(region: Region): void {
  try {
    localStorage.setItem(STORAGE_KEY, region);
  } catch {
    /* Stockage indisponible : la région vaut alors pour la page en cours. */
  }
}

/**
 * Réécrit tous les liens simulateur de la page.
 *
 * `data-region-lock` en exclut les rampes du méga-menu Aides : elles portent
 * LEUR région (la colonne Wallonie mène au simulateur wallon), pas celle du
 * sélecteur. Les écraser reviendrait à casser le seul endroit du site où la
 * région est connue avec certitude au moment du clic.
 */
export function applyRegionToLinks(root: ParentNode, region: Region | null): void {
  const links = root.querySelectorAll<HTMLAnchorElement>(
    'a[href*="/simulateur"]:not([data-region-lock])',
  );

  for (const link of links) {
    const href = link.getAttribute('href');
    if (href) link.setAttribute('href', withRegion(href, region));
  }
}

/**
 * Branche le sélecteur du header sur la page. Appelé depuis le layout.
 *
 * La réécriture se fait au chargement (région mémorisée d'une visite
 * précédente) puis à chaque changement.
 */
export function initRegion(document: Document): void {
  /**
   * TOUS les sélecteurs, pas le premier : il y en a deux depuis que le mobile
   * a son propre panneau — celui de la rangée utilitaire reste dans le DOM,
   * simplement masqué. N'en câbler qu'un laissait l'autre inerte, et les deux
   * se contredire à l'écran.
   */
  const selects = Array.from(
    document.querySelectorAll<HTMLSelectElement>('[data-region-select]'),
  );
  const stored = readStoredRegion();

  if (stored) {
    for (const select of selects) select.value = stored;
    applyRegionToLinks(document, stored);
  }

  for (const select of selects) {
    select.addEventListener('change', () => {
      if (!isRegion(select.value)) return;
      storeRegion(select.value);
      // Les autres sélecteurs suivent : ils désignent la même région.
      for (const other of selects) other.value = select.value;
      applyRegionToLinks(document, select.value);
    });
  }
}
