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

## Analytics
- Privilégier **léger** : Plausible ou Umami (respectueux perf + RGPD).
- GTM/GA4 seulement si le client l'exige (attention au poids sur les Core Web Vitals).

## Garde-fou
Chaque ajout (lib, script, tag) se mesure en JS envoyé. La règle d'or n°1 du `CLAUDE.md`
(perf & SEO d'abord) prime sur le confort de dev.
