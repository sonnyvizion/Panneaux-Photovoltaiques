import { expect, test } from '@playwright/test';

/**
 * LA MESURE D'AUDIENCE, VUE DU NAVIGATEUR.
 *
 * ⚠️ On n'asserte PAS que le script Plausible est présent : ce serait vérifier
 * le mécanisme. Ce qui compte est qu'un parcours réel produise les bons
 * événements, dans le bon ordre, avec les bonnes propriétés — c'est cela que
 * lira le client dans son tableau de bord.
 *
 * On pose donc un espion à la place de `window.plausible`, AVANT le chargement
 * de la page, et on pilote le simulateur au clic. Le module `analytics.ts`
 * n'appelle rien d'autre : du point de vue du site, cet espion est Plausible.
 *
 * ⚠️ Ce test tourne sur un build SANS `PUBLIC_PLAUSIBLE_DOMAIN`, donc sans
 * aucun script tiers chargé. C'est voulu : il prouve que le câblage du site
 * fonctionne, indépendamment du fait que la mesure soit activée ou non sur
 * l'environnement testé.
 */

interface Sent {
  event: string;
  props?: Record<string, string>;
}

const OPEN = '/simulateur?region=wallonie';

/** Pose l'espion avant que la moindre ligne du site ne s'exécute. */
async function spyOnMeasurement(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    (window as unknown as { __sent: Sent[] }).__sent = [];
    (window as unknown as { plausible: unknown }).plausible = (
      event: string,
      options?: { props?: Record<string, string> },
    ) => {
      (window as unknown as { __sent: Sent[] }).__sent.push({ event, props: options?.props });
    };
  });
}

const sent = (page: import('@playwright/test').Page) =>
  page.evaluate(() => (window as unknown as { __sent: Sent[] }).__sent);


/**
 * Ouvre la recherche, quelle que soit la largeur d'écran.
 *
 * ⚠️ Deux déclencheurs existent, et un seul est visible à la fois : la loupe de
 * la barre sur grand écran, un bouton DANS le panneau du burger sur mobile.
 * C'est un choix de navigation documenté (`etat.md`), pas un accident — et un
 * test qui n'en connaîtrait qu'un ne vérifierait la mesure que sur la moitié du
 * trafic, justement la moitié minoritaire.
 */
async function openSearch(page: import('@playwright/test').Page) {
  const burger = page.locator('.header__burger');
  if (await burger.isVisible()) await burger.click();

  await page.locator('[data-search-open]:visible').first().click();
  await expect(page.locator('#site-search input').first()).toBeVisible();
}

/** Le sélecteur de région visible : celui de la barre, ou celui du panneau. */
async function regionSelect(page: import('@playwright/test').Page) {
  const burger = page.locator('.header__burger');
  if (await burger.isVisible()) await burger.click();
  return page.locator('[data-region-select]:visible').first();
}

test.describe('la mesure du parcours', () => {
  test('une arrivée sur le simulateur ne DÉMARRE pas le parcours', async ({ page }) => {
    await spyOnMeasurement(page);
    await page.goto(OPEN);
    await expect(page.locator('[data-wizard="questions"] [data-wizard-count]')).toHaveText(
      'Question 1 sur 5',
    );

    const events = await sent(page);

    /* ⚠️ LE POINT DE CE TEST. `show()` est appelé au chargement comme à chaque
       navigation : si l'arrivée comptait pour un démarrage, tout visiteur qui
       ouvre la page et repart ferait chuter le taux de complétion sans avoir
       rien fait. Seule une navigation VOULUE démarre le parcours. */
    expect(events.map((e) => e.event)).not.toContain('simulator_started');

    /* La première question, elle, est bien vue : c'est le haut de l'entonnoir. */
    expect(events).toContainEqual({ event: 'simulator_step', props: { etape: '1' } });
  });

  test('répondre et avancer émet le démarrage puis le rang atteint', async ({ page }) => {
    await spyOnMeasurement(page);
    await page.goto(OPEN);

    /* ⚠️ On clique le LIBELLÉ, pas le bouton radio. Le radio natif est masqué
       sous une pastille dessinée : Playwright refuse de cliquer un élément
       recouvert, et il a raison — c'est le libellé que le visiteur touche. */
    await page.locator('#etape-1 label.sim__choice', { hasText: 'Maison' }).first().click();
    await page.locator('[data-wizard="questions"] [data-wizard-next]').click();

    await expect(page.locator('[data-wizard="questions"] [data-wizard-count]')).toHaveText(
      'Question 2 sur 5',
    );

    const events = await sent(page);
    const names = events.map((e) => e.event);

    expect(names).toContain('simulator_started');
    /* Une seule fois, quoi qu'il arrive ensuite : c'est un dénominateur, pas un
       compteur de clics. */
    expect(names.filter((n) => n === 'simulator_started')).toHaveLength(1);

    /* ⚠️ LE RANG EST CE QUI RÉPOND À « OÙ ÇA BLOQUE ». Sans lui il ne resterait
       qu'un taux de complétion global, qui dit qu'on perd des gens sans jamais
       dire où. */
    expect(events).toContainEqual({ event: 'simulator_step', props: { etape: '2' } });
  });

  test('choisir une région le fait savoir, avec la région', async ({ page }) => {
    await spyOnMeasurement(page);
    await page.goto('/');

    const selector = await regionSelect(page);
    await selector.selectOption('flandre');

    await expect
      .poll(async () => (await sent(page)).find((e) => e.event === 'region_selected'))
      .toEqual({ event: 'region_selected', props: { region: 'flandre' } });
  });

  test('une recherche sans résultat nomme le trou de contenu', async ({ page }) => {
    await spyOnMeasurement(page);
    await page.goto('/');

    await openSearch(page);
    await page.locator('#site-search input').first().fill('kangourou');

    /* ⚠️ On attend l'événement plutôt que de lire tout de suite : la recherche
       charge son index à la demande, donc l'échec n'est connu qu'après. */
    await expect
      .poll(async () => (await sent(page)).find((e) => e.event === 'search_no_results'))
      .toEqual({ event: 'search_no_results', props: { requete: 'kangourou' } });
  });

  test('une frappe en cours n’est pas comptée comme un échec', async ({ page }) => {
    await spyOnMeasurement(page);
    await page.goto('/');

    await openSearch(page);
    await page.locator('#site-search input').first().fill('ka');

    /* Deux caractères : sous le seuil. Sans lui, « p », « pa », « pan »
       remonteraient tous comme des trous de contenu et le rapport ne dirait
       plus rien. */
    await page.waitForTimeout(300);
    const events = await sent(page);
    expect(events.map((e) => e.event)).not.toContain('search_no_results');
  });
});
