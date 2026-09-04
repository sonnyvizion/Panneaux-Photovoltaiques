# Site Belgreen — front Astro

Site encyclopédique photovoltaïque, orienté conversion. Le cadrage vit à la
racine du dépôt (`CLAUDE.md`, `stack.md`, `simulateur.md`…) ; ce fichier ne
couvre que l'exploitation du front.

## Prérequis

Node **≥ 22.12** (`engines` dans `package.json`), puis `npm install`.

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement sur `localhost:4321` |
| `npm test` | Vitest — les calculs et les modules purs |
| `npm run build` | Build statique dans `dist/`, **en mode démo** |
| `npm run preview` | Sert le `dist/` produit |
| `npm run deploy` | Build + envoi sur Cloudflare Pages |

⚠️ Après avoir tiré des changements, vider `node_modules/.vite` avant de mesurer
quoi que ce soit au navigateur : le cache du serveur de dev sert volontiers
l'ancien module, et l'ancienne feuille de style.

## Indexation — le point à ne pas rater

**Le défaut est de REFUSER l'indexation.** `robots.txt` et l'en-tête
`X-Robots-Tag` sont générés au build, pas écrits en dur, et bloquent tant qu'on
ne demande pas explicitement le contraire :

```sh
npm run build                          # démo   → noindex
PUBLIC_INDEXABLE=true npm run build    # prod   → indexable
```

Pourquoi ce sens-là : les ~55 pages de contenu ne portent pas de `noindex`
(seules les pages outil le font). Une démo indexée deviendrait du contenu
dupliqué le jour où le vrai domaine ouvre, et mettrait des semaines à
disparaître — alors qu'une production oubliée en `noindex` se remarque en
quelques jours et se corrige en un déploiement.

Le build annonce son mode en clair à la fin. Le lire.

## Déploiement — Cloudflare Pages

**En ligne : https://belgreen-demo.pages.dev** — projet Pages `belgreen-demo`,
première mise en ligne le 25 août 2026.

```sh
npm run deploy
```

Il construit puis envoie `dist/` avec Wrangler.

**S'authentifier.** Wrangler lit deux variables d'environnement :

```sh
export CLOUDFLARE_API_TOKEN=...    # permission « Account · Cloudflare Pages · Edit »
export CLOUDFLARE_ACCOUNT_ID=...   # visible dans l'URL du dashboard
```

`npx wrangler login` (OAuth navigateur) fait la même chose et évite de manipuler
un token. Le token, lui, est nécessaire dès qu'on déploie depuis un contexte non
interactif.

⚠️ **`--branch=main` n'est pas décoratif.** Sans lui, Wrangler déduit la branche
Git courante ; le travail se faisant sur `design-systeme-astro`, le déploiement
partirait en *preview* sur une URL à hash aléatoire au lieu de l'adresse stable
`belgreen-demo.pages.dev` — celle qu'on donne au client. `--commit-dirty=true`
supprime la question posée quand l'arbre de travail n'est pas propre : elle n'a
pas de sens ici, puisqu'on envoie un `dist/` construit localement et jamais
versionné.

⚠️ **On déploie le `dist/` construit localement, on ne branche PAS le dépôt sur
le build automatique de Cloudflare.** 41 images vivent en Git LFS sous
`site/src/assets/` (voir `.gitattributes`) ; le build distant de Cloudflare ne
fait pas `git lfs pull` et clonerait des fichiers pointeurs de ~130 octets, sur
lesquels `astro:assets` échoue. L'erreur ne mentionnerait pas LFS.

Pour brancher un jour le build automatique, il faudra une étape `git lfs pull`
avant le build — le plus simple étant de construire dans GitHub Actions avec
`actions/checkout` et `lfs: true`, puis de publier le `dist/`.

### Protection de la démo — RIEN n'est en place

La démo est **publiquement accessible** à qui connaît l'URL. Seule l'indexation
est refusée (`robots.txt` + `X-Robots-Tag`), et c'est une convention que les
robots respectent, pas une serrure.

Deux façons de fermer la porte, si le besoin se confirme :

- **Cloudflare Access** — authentification par e-mail, gratuit jusqu'à 50
  utilisateurs, à activer dans Zero Trust. Propre, mais l'activation demande
  parfois d'enregistrer un moyen de paiement même sur le plan gratuit.
- **HTTP Basic Auth** — une fonction Pages (`functions/_middleware.ts`) et un
  mot de passe en variable d'environnement Cloudflare. Rustique (un seul couple
  identifiant/mot de passe, popup navigateur) mais sans Zero Trust ni carte
  bancaire. **À retirer avant la mise en production.**

## Ce qui n'est pas encore branché

- **L'envoi des formulaires.** `src/scripts/leadSubmit.ts` est le point unique.
  Sans `PUBLIC_LEAD_ENDPOINT`, les formulaires affichent honnêtement que l'envoi
  n'est pas actif — jamais un faux remerciement.
- **La génération du PDF.** `/rapport/document` **est** le document : le rendu
  consistera à ouvrir cette adresse, attendre `data-report-ready` sur `<html>`,
  puis imprimer. La demande envoyée au serveur porte déjà l'URL exacte.
- **`/confidentialite`** est un lien mort, alors que les formulaires promettent
  une politique de données.
- **`site:`** n'est pas renseigné dans `astro.config.mjs` : à poser avec le
  domaine définitif, pour les URLs canoniques et le futur sitemap.

## Vérification des types

```
npm run check
```

⚠️ **Volontairement PAS branché sur `npm run build`.** Le typage n'avait jamais
été exécuté jusqu'au 2026-09-02 : `astro check` remonte 84 erreurs préexistantes,
concentrées dans `src/scripts/` (`searchOverlay.ts`, `simulatorWidget.ts`, et des
imports inutilisés dans les tests). Aucune ne vient de la couche SEO.

Les brancher sur le build aurait bloqué tout déploiement derrière un chantier de
dette qui n'a rien à voir. Le script existe donc pour être lancé sciemment ; il
sera branché au build le jour où le compteur sera à zéro.

## Variables d'environnement

| Variable | Effet |
|---|---|
| `PUBLIC_SITE_URL` | Domaine des canoniques, de l'Open Graph et du `sitemap.xml`. Défaut : la démo |
| `PUBLIC_INDEXABLE` | `true` autorise l'indexation. Défaut : **non**, on bloque |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Active la mesure d'audience. **Absente = aucun script tiers servi** |
| `PUBLIC_LEAD_ENDPOINT` | Point d'envoi des formulaires. Défaut : `/api/lead`, la fonction du dépôt |

⚠️ Les trois premières ont le même parti pris : **le défaut est le plus
prudent**. Une démo qui s'indexe, ou qui envoie ses visites dans les chiffres de
production, sont deux erreurs qu'on ne découvre que trop tard.

Mise en ligne d'une production :

```sh
PUBLIC_SITE_URL=https://panneaux-photovoltaiques.be \
PUBLIC_INDEXABLE=true \
PUBLIC_PLAUSIBLE_DOMAIN=panneaux-photovoltaiques.be \
npm run deploy
```

## Armer l'envoi des demandes

Le point d'envoi (`functions/api/lead.ts`) est **déjà déployé**. Il répond
`503 { configured: false }` tant que ces trois secrets ne sont pas posés dans le
projet Cloudflare Pages, et le site affiche alors « l'envoi n'est pas actif » —
jamais un faux remerciement.

| Secret | Valeur |
|---|---|
| `BREVO_API_KEY` | Clé d'API Brevo (Paramètres → Clés d'API SMTP & API) |
| `LEAD_TO` | Adresse de l'équipe, qui reçoit les demandes |
| `LEAD_FROM_EMAIL` | Expéditeur, sur un **domaine vérifié chez Brevo** |
| `LEAD_FROM_NAME` | Facultatif, « Belgreen » par défaut |

```sh
npx wrangler pages secret put BREVO_API_KEY --project-name=belgreen-demo
```

⚠️ **Rien à redéployer** une fois les secrets posés : la fonction les lit à
chaque requête. L'envoi s'arme tout seul.

⚠️ **L'expéditeur doit être un domaine vérifié chez Brevo.** Une adresse non
vérifiée fait accepter l'appel d'API puis jeter le message en silence — la panne
la plus longue à diagnostiquer, parce que tout paraît fonctionner.
