import { defineConfig, devices } from '@playwright/test';

/**
 * La recette navigateur — ce que les tests unitaires ne peuvent pas prouver.
 *
 * ⚠️ ELLE TOURNE SUR LE SITE CONSTRUIT (`astro preview`), pas sur le serveur de
 * développement. Deux raisons, toutes deux déjà payées par le projet : le CSS de
 * production passe au minifieur, qui a déjà fait disparaître un `backdrop-filter`
 * et réécrit des unités de durée ; et le serveur de développement sert des
 * modules non groupés, donc un ordre d'exécution qui n'est pas celui du visiteur.
 *
 * ⚠️ ON ASSERTE LE RÉSULTAT, JAMAIS LE MÉCANISME. C'est la leçon des quatre
 * pièges de la recherche (`etat.md`) : lire un attribut ou vérifier qu'une classe
 * est posée ne prouve rien sur une surface dont le comportement naît en
 * JavaScript. On envoie de vrais défilements et on lit le STYLE CALCULÉ.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    /* Le trafic visé est majoritairement mobile, et c'est précisément là que le
       geste au doigt existe : ce projet passe en premier. */
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
