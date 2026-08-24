# Site Belgreen — front Astro

Site encyclopédique photovoltaïque, orienté conversion. Le cadrage vit à la
racine du dépôt (`CLAUDE.md`, `stack.md`, `simulateur.md`…) ; ce fichier ne
couvre que l'exploitation du front.

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

```sh
npm run deploy
```

Il construit puis envoie `dist/` avec Wrangler. La première fois, Wrangler
demande de se connecter au compte Cloudflare et de créer le projet.

⚠️ **On déploie le `dist/` construit localement, on ne branche PAS le dépôt sur
le build automatique de Cloudflare.** 41 images vivent en Git LFS sous
`site/src/assets/` (voir `.gitattributes`) ; le build distant de Cloudflare ne
fait pas `git lfs pull` et clonerait des fichiers pointeurs de ~130 octets, sur
lesquels `astro:assets` échoue. L'erreur ne mentionnerait pas LFS.

Pour brancher un jour le build automatique, il faudra une étape `git lfs pull`
avant le build — le plus simple étant de construire dans GitHub Actions avec
`actions/checkout` et `lfs: true`, puis de publier le `dist/`.

**Protéger la démo** : Cloudflare Access (gratuit jusqu'à 50 utilisateurs) met
le site derrière une authentification. C'est la seule protection réelle contre
l'indexation — `robots.txt` et `X-Robots-Tag` sont la ceinture, Access les
bretelles.

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
