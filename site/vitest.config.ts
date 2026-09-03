import { defineConfig } from 'vitest/config';

/**
 * ⚠️ DEUX HARNAIS, DEUX PÉRIMÈTRES.
 *
 * Vitest ne prend que les tests de logique pure de `src/`. Sans cette
 * restriction, son motif par défaut (`**\/*.{test,spec}.*`) avalerait aussi les
 * specs Playwright de `tests/`, qui attendent un navigateur et échoueraient à
 * l'import.
 *
 * La règle qui range un test dans l'un ou l'autre : est-ce qu'une fonction pure
 * suffit à le prouver ? Alors c'est Vitest. Faut-il une mise en page, un
 * défilement réel ou un style calculé ? Alors c'est Playwright — voir
 * `playwright.config.ts`.
 */
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
