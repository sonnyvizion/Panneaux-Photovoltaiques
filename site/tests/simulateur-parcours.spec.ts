import { expect, test } from '@playwright/test';

/**
 * LE PARCOURS DE QUESTIONS, AU DOIGT.
 *
 * Ce fichier existe parce que la correction du 3 septembre 2026 ne se prouve pas
 * autrement : elle ne concerne QUE le défilement manuel du rail. Au bouton, le
 * script pilote le défilement et repeint les indicateurs au clic — ce chemin
 * était déjà juste, et le reste.
 *
 * ⚠️ On écrit `scrollLeft` directement. Ce n'est pas une triche : du point de vue
 * du widget c'est exactement un geste du visiteur, puisque son drapeau
 * `programmatic` n'est levé que lorsque c'est LUI qui pilote le rail. Un
 * `mouse.wheel` produirait le même évènement, mais avec l'inertie du navigateur
 * en prime, donc une position d'arrivée non déterministe.
 */

const WIZARD = '[data-wizard="questions"]';
const RAIL = `${WIZARD} [data-wizard-rail]`;

/** Le simulateur ouvert région connue : la question conditionnelle disparaît. */
const OPEN = '/simulateur?region=wallonie';

/**
 * Lance le rail vers la question suivante et RENVOIE UN ÉCHANTILLON PRIS EN
 * COURS DE ROUTE, quand il est à plus de la moitié du chemin.
 *
 * ⚠️ On ne peut pas poser le rail à mi-course et l'y laisser : il porte
 * `scroll-behavior: smooth` (pour que les boutons fassent glisser) ET
 * `scroll-snap-type: x mandatory` (pour qu'un geste = une question). Écrire
 * `scrollLeft` déclenche donc une ANIMATION, et toute position intermédiaire est
 * de toute façon reprise par le calage. Une première version de ce test lisait
 * le rail deux images après l'écriture : il en était encore à 4 pixels du
 * départ, et le test accusait le code alors qu'il mesurait sa propre erreur.
 *
 * On échantillonne donc pendant l'animation. C'est plus fidèle, en plus d'être
 * plus sûr : c'est exactement l'état « le doigt est posé, la question suivante
 * arrive » que la correction vise.
 */
async function sampleMidGesture(page: import('@playwright/test').Page) {
  return page.evaluate(async () => {
    const wizard = document.querySelector<HTMLElement>('[data-wizard="questions"]')!;
    const rail = wizard.querySelector<HTMLElement>('[data-wizard-rail]')!;
    const count = wizard.querySelector<HTMLElement>('[data-wizard-count]')!;
    const cards = [...rail.querySelectorAll<HTMLElement>('.step:not([hidden]) .step__question')];
    const heights = cards.map((card) => card.getBoundingClientRect().height);
    const stepWidth = (rail.scrollWidth - rail.clientWidth) / (cards.length - 1);
    const before = count.textContent;

    rail.scrollLeft = stepWidth;

    /* Jusqu'à deux secondes d'images : on retient la première où le rail a passé
       les 55 % du chemin, avant qu'il ne se cale. */
    for (let frame = 0; frame < 120; frame += 1) {
      await new Promise((done) => requestAnimationFrame(done));
      const fraction = rail.scrollLeft / stepWidth;
      if (fraction > 0.55 && fraction < 0.95) {
        return {
          before,
          fraction,
          count: count.textContent,
          /* LE STYLE CALCULÉ, pas `style.height` : c'est ce que le visiteur voit. */
          railHeight: Number.parseFloat(getComputedStyle(rail).height),
          moving: rail.dataset.dragging !== undefined,
          heights,
        };
      }
    }
    return null;
  });
}

test.describe('le rail suit le doigt', () => {
  test('le compteur avance PENDANT le geste, pas à l’arrêt', async ({ page }) => {
    await page.goto(OPEN);
    await expect(page.locator(`${WIZARD} [data-wizard-count]`)).toHaveText('Question 1 sur 5');

    const state = await sampleMidGesture(page);

    expect(state, 'aucune image saisie en cours de route').not.toBeNull();
    expect(state!.before).toBe('Question 1 sur 5');
    /* Le rail n'est pas encore posé : c'est tout l'enjeu. Avant la correction,
       le pied de page disait encore « Question 1 sur 5 » alors que la carte à
       l'écran affichait déjà « 2/5 ». */
    expect(state!.moving).toBe(true);
    expect(state!.count).toBe('Question 2 sur 5');
  });

  test('la hauteur du rail est INTERPOLÉE, elle ne saute pas', async ({ page }) => {
    await page.goto(OPEN);
    const state = await sampleMidGesture(page);
    expect(state).not.toBeNull();

    const [first, second] = state!.heights;
    /* Sans deux questions de hauteurs franchement différentes, l'assertion ne
       prouverait rien : on le dit plutôt que de laisser passer un test creux. */
    expect(Math.abs(second - first)).toBeGreaterThan(8);

    const low = Math.min(first, second);
    const high = Math.max(first, second);
    /* STRICTEMENT entre les deux : à l'égalité avec l'une ou l'autre, le rail
       aurait sauté d'une hauteur à la suivante au lieu de les relier. */
    expect(state!.railHeight).toBeGreaterThan(low + 1);
    expect(state!.railHeight).toBeLessThan(high - 1);
  });

  test('à l’arrêt, les trois repères disent la même chose', async ({ page }) => {
    await page.goto(OPEN);
    await sampleMidGesture(page);
    /* On attend que le rail se pose : le script rend alors la main à `fitRail`. */
    await expect(page.locator(RAIL)).not.toHaveAttribute('data-dragging', /.*/);

    const agreed = await page.evaluate(() => {
      const wizard = document.querySelector<HTMLElement>('[data-wizard="questions"]')!;
      const rail = wizard.querySelector<HTMLElement>('[data-wizard-rail]')!;
      const steps = [...rail.querySelectorAll<HTMLElement>('.step:not([hidden])')];
      const active = steps.find((step) => !step.hasAttribute('inert'))!;
      const segments = [...wizard.querySelectorAll<HTMLElement>('[data-wizard-seg]')].filter(
        (seg) => !seg.closest('li')?.hidden,
      );

      return {
        rank: active.querySelector('[data-step-index]')?.textContent,
        count: wizard.querySelector('[data-wizard-count]')?.textContent,
        current: segments.findIndex((seg) => seg.getAttribute('aria-current') === 'step') + 1,
        railHeight: Number.parseFloat(getComputedStyle(rail).height),
        cardHeight:
          active.querySelector<HTMLElement>('.step__question')!.getBoundingClientRect().height,
      };
    });

    expect(agreed.count).toBe(`Question ${agreed.rank} sur 5`);
    expect(String(agreed.current)).toBe(agreed.rank);
    /* Le rail reprend la hauteur EXACTE de la question posée : plus de vide sous
       une question courte, plus de question longue rognée. */
    expect(agreed.railHeight).toBeCloseTo(agreed.cardHeight, 0);
  });
});
