# Stack technique

> Hub : `../CLAUDE.md`. Objectif : le plus optimisé possible pour SEO + vitesse.

## Choix : Astro (front) + Sanity (CMS)

### Pourquoi Astro
Le site est ~90 % contenu statique (texte, images, accordéons) et ~10 % interactif
(simulateur, curseurs, carte). Astro est conçu exactement pour ça :
- **Zéro JavaScript par défaut.** Les pages de contenu sortent en HTML quasi pur, ultra-léger
  → meilleur score Core Web Vitals possible, presque sans effort.
- **Îlots (islands)** : l'interactivité est activée composant par composant. Le simulateur et
  les briques (curseur d'orientation, carte des aides…) sont des îlots React hydratés **uniquement
  là où ils sont** ; le reste de la page ne paie pas la facture JS.
- Intégration **Sanity officielle**, **routing i18n natif** (FR/NL), images via `astro:assets`.

### Alternative écartée : Next.js
Excellent et pairing « par défaut » de Sanity. À privilégier seulement si le site devenait
*app-like* (beaucoup de dynamique serveur, personnalisation) ou si l'équipe est exclusivement
React et veut un seul modèle mental. Pour un site contenu + SEO, Next embarque le runtime React :
scores atteignables mais il faut *travailler* à ne pas sur-envoyer de JS, là où Astro y pousse
par défaut. Décision réversible si le dev a une forte préférence React.

## Rendu
- **Statique (SSG)** : tout le contenu Sanity est pré-rendu au build.
- **Régénération** : webhook Sanity → rebuild on-demand quand le contenu change.
- **Simulateur** : page statique + calcul **100 % côté client** (aucun serveur pour calculer).
- **Formulaire devis** : POST vers une petite **fonction serverless**.

## Hébergement / CDN
- **Cloudflare Pages** ou **Netlify** (statique sur CDN mondial). Vercel si on basculait sur Next.

## Images
- CDN d'images Sanity + composant image du framework (`astro:assets`).
- WebP/AVIF, `srcset` responsive, **dimensions déclarées** (CLS), lazy-load sauf hero.
- Voir aussi `pages-contenu.md`.

## Polices (important vu l'ambition « belles polices »)
- **Auto-hébergées** (pas de requête tierce bloquante).
- `font-display: swap`, **sous-ensemble FR/NL** pour alléger.

## i18n (FR + NL dès la v1)
- Routing i18n d'Astro + **internationalisation par document** côté Sanity.
- URLs localisées + balises **`hreflang`** FR/NL.
- Briques interactives communes ; seules les chaînes sont traduites.

## Analytics — **tranché le 4 septembre 2026 : Plausible**

Décision client, après une question sur les cookies. Trois choses valent d'être
retenues, parce qu'elles reviendront :

- **Search Console ne pose aucun cookie** et n'en exige aucun. La propriété se
  vérifie par DNS, fichier ou balise `meta`, et l'outil mesure ce qui se passe
  dans les résultats Google, pas sur le site. C'était la prémisse de la question,
  et elle était fausse.
- **Plausible ne pose pas de cookie non plus.** Donc pas de bandeau, donc on
  mesure **100 %** des visiteurs — là où un bandeau ne laisse mesurer que ceux
  qui acceptent. Sur un site dont l'objet est de trouver où le parcours casse,
  une mesure partielle est une mesure biaisée. ~1 Ko contre ~90 Ko pour GA4.
- **La publicité, elle, imposera des cookies.** Google Ads et Meta sont prévus
  sans calendrier. Le bandeau et les balises arriveront **au démarrage des
  campagnes**, pas avant : sans campagne, il n'y a aucune conversion à attribuer.

Câblage : `src/scripts/analytics.ts` (seul fichier qui connaît l'outil),
chargement conditionné à `PUBLIC_PLAUSIBLE_DOMAIN` dans `BaseLayout.astro`.
Sans la variable, aucun script tiers n'est servi — la démo ne pollue pas les
chiffres de production.

## Garde-fou

## Garde-fou
Chaque ajout (lib, script, tag) se mesure en JS envoyé. La règle d'or n°1 du `CLAUDE.md`
(perf & SEO d'abord) prime sur le confort de dev.
