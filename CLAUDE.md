# 🧠 CLAUDE.md — Contexte du projet

## 📌 Présentation du projet
- **Nom** : Panneaux Photovoltaïques
- **Objectif** : [Ce que fait l'application]
- **Stack principale** : [Ex: Next.js 14 + TypeScript + Sanity v3 + Tailwind]

---

## 🏗️ Architecture & Structure

```
src/
├── app/                  # Pages & routes (App Router Next.js)
│   └── (studio)/         # Route Sanity Studio embarqué
├── components/
│   ├── ui/               # Composants primitifs (boutons, inputs...)
│   ├── blocks/           # Blocs de contenu Sanity (hero, cards...)
│   └── layout/           # Header, Footer, Navigation
├── lib/
│   ├── sanity/
│   │   ├── client.ts     # Client Sanity configuré
│   │   ├── queries.ts    # Toutes les GROQ queries
│   │   └── image.ts      # Helper urlForImage
│   └── seo/
│       └── metadata.ts   # Génération metadata Next.js
├── sanity/
│   ├── schemas/          # Schemas des documents Sanity
│   ├── lib/              # Config Sanity (apiVersion, projectId...)
│   └── structure/        # Structure du Studio
└── types/
    ├── sanity.d.ts        # Types générés depuis les schemas
    └── seo.d.ts           # Types SEO
```

---

## ⚙️ Stack technique

| Catégorie       | Technologie                         |
|-----------------|-------------------------------------|
| Framework       | Next.js 14 (App Router)             |
| Langage         | TypeScript strict                   |
| CMS             | Sanity v3                           |
| UI              | Tailwind CSS + shadcn/ui            |
| Images          | @sanity/image-url + next/image      |
| Preview         | Sanity Visual Editing / Live Preview|
| SEO             | Next.js Metadata API + schema.org   |
| Tests           | [Ex: Vitest]                        |

---

## 🟠 Sanity CMS — Règles & conventions

### Schemas
- Un fichier par type de document dans `sanity/schemas/`
- Nommage : `camelCase` pour les noms de champs, `kebab-case` pour les `name` de schema
- Toujours ajouter un champ `seo` de type objet sur les documents publiables (pages, articles...)
- Utiliser `defineField`, `defineType`, `defineArrayMember` (jamais les objets bruts)

```ts
// ✅ Bon
export const pageSchema = defineType({
  name: 'page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'seo', type: 'seoFields' }), // toujours présent
  ]
})
```

### GROQ Queries
- Toutes les queries centralisées dans `lib/sanity/queries.ts`
- Toujours projeter uniquement les champs nécessaires (pas de `*` sur les gros documents)
- Utiliser des fragments GROQ réutilisables pour les champs récurrents (seo, image, author...)

```ts
// Fragment réutilisable
const SEO_FRAGMENT = `seo { title, description, ogImage { asset->{ url } } }`

// Query
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  title,
  slug,
  ${SEO_FRAGMENT},
  content[]{ ... }
}`
```

### Images Sanity
- Toujours passer par `urlForImage()` de `lib/sanity/image.ts`
- Spécifier `.width().height().format('webp').url()` systématiquement
- Utiliser le composant `<SanityImage>` wrapper (jamais `<img>` direct)

### Live Preview / Visual Editing
- Les composants de preview utilisent `useLiveQuery` ou `useQuery` de `next-sanity`
- Ne pas modifier la config de preview sans validation
- Préfixer les composants de preview avec `Preview` : `PreviewHero`, `PreviewArticle`...

---

## 🎨 Agent UI/UX — Wireframe & Design System

> Quand je demande un **wireframe** ou une **maquette**, adopter ce comportement :

### Processus de wireframing
1. **Analyser le besoin** : poser 2-3 questions max si le brief est flou
2. **Proposer une structure** en ASCII ou composants avant de coder
3. **Valider la hiérarchie visuelle** avant d'ajouter les détails
4. **Livrer en étapes** : structure → layout → contenu → interactions

### Conventions Design System
- Utiliser les **tokens Tailwind** définis dans `tailwind.config.ts` (pas de couleurs arbitraires)
- Composants atomiques dans `components/ui/`, blocs complexes dans `components/blocks/`
- Respecter la grille : `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Mobile-first systématiquement : écrire les styles mobile puis `md:` et `lg:`
- Espacements : multiples de 4 uniquement (p-4, gap-8, mt-12...)

### Accessibilité (obligatoire)
- Toujours ajouter `alt` sur les images (récupéré depuis Sanity `image.alt`)
- Boutons avec labels explicites (`aria-label` si icône seule)
- Contraste minimum AA (4.5:1 pour le texte)
- Navigation clavier fonctionnelle sur tous les éléments interactifs
- Utiliser les balises sémantiques : `<nav>`, `<main>`, `<article>`, `<section>`

### Blocs Sanity ↔ Composants
Chaque schema de bloc Sanity doit avoir son composant React associé :
```
sanity/schemas/blocks/hero.ts  →  components/blocks/Hero.tsx
sanity/schemas/blocks/cards.ts →  components/blocks/Cards.tsx
```

---

## 🔍 Agent SEO — Optimisation & Métadonnées

> Quand je demande quelque chose lié au **SEO**, adopter ce comportement :

### Metadata Next.js (obligatoire sur chaque page)
```ts
// app/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await sanityFetch({ query: PAGE_QUERY, params })
  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description,
    openGraph: {
      title: page.seo?.title ?? page.title,
      description: page.seo?.description,
      images: page.seo?.ogImage
        ? [urlForImage(page.seo.ogImage).width(1200).height(630).url()]
        : [],
    },
    alternates: {
      canonical: `https://[domaine].com/${params.slug}`,
    },
  }
}
```

### Schema Sanity SEO (champ réutilisable)
```ts
// Toujours utiliser ce schema SEO sur les documents publiables
defineField({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', description: '50-60 caractères idéalement' }),
    defineField({ name: 'description', type: 'text', description: '150-160 caractères idéalement' }),
    defineField({ name: 'ogImage', type: 'image', description: '1200x630px recommandé' }),
    defineField({ name: 'noIndex', type: 'boolean', initialValue: false }),
  ]
})
```

### Structured Data (JSON-LD)
- Ajouter les structured data pertinents selon le type de page :
  - Page d'accueil → `Organization` + `WebSite`
  - Article/Blog → `Article` + `BreadcrumbList`
  - Page service → `Service` + `FAQPage` si applicable
  - Page contact → `LocalBusiness` si applicable
- Injecter via composant `<JsonLd>` dans le layout ou la page

### Règles SEO générales
- Toujours un seul `<h1>` par page (récupéré depuis Sanity)
- Hiérarchie des titres respectée : h1 → h2 → h3 (jamais sauter un niveau)
- Images : `alt` obligatoire, format WebP, taille adaptée (`sizes` prop next/image)
- Vitesse : préférer les Server Components, limiter le JS client, lazy load les blocs sous la fold
- `generateStaticParams` pour toutes les pages dynamiques depuis Sanity
- Sitemap dynamique dans `app/sitemap.ts` généré depuis Sanity

---

## 🚫 Ce qu'il ne faut PAS faire

- Ne pas modifier les schemas Sanity existants sans vérifier les données en prod (breaking changes !)
- Ne pas supprimer de champs Sanity sans migration des données
- Ne pas ajouter de balises `<title>` ou `<meta>` manuellement dans le JSX (utiliser Metadata API)
- Ne pas utiliser `fetch` direct sur l'API Sanity (toujours passer par `sanityFetch` configuré)
- Ne pas exposer le `token` Sanity côté client
- Éviter les images sans dimensions définies (cause layout shift, mauvais CWV)

---

## ✅ Comportement attendu de Claude

- Pour toute modification de **schema Sanity**, prévenir des impacts sur les données existantes
- Pour tout nouveau **composant**, créer le schema Sanity associé si nécessaire
- Pour toute nouvelle **page**, générer automatiquement : metadata, structured data, `generateStaticParams`
- Toujours proposer le **champ SEO** sur les nouveaux documents publiables
- Si ambiguïté sur un composant : proposer un wireframe ASCII avant de coder
- Commenter les **GROQ queries** complexes en français

---

## 🚀 Commandes utiles

```bash
npm run dev           # Next.js + Sanity Studio sur /studio
npm run build         # Build de production
npm run sanity:deploy # Déployer le Studio Sanity
npm run sanity:types  # Générer les types TypeScript depuis les schemas
npm run lint          # ESLint
npm run type-check    # Vérification TypeScript
```

---

## 📋 Contexte métier important

<!-- Ce que Claude doit savoir sur le domaine -->
- [Ex: Le site est multilingue FR/EN, les slugs incluent le locale `/fr/mon-slug`]
- [Ex: Les articles ont 3 statuts dans Sanity : draft, published, archived]
- [Ex: Les images hero font toujours 1440x600px minimum]

---

## 🔗 Ressources

- [Sanity Studio] : `http://localhost:3000/studio`
- [Sanity Manage] : `https://www.sanity.io/manage`
- [Design Figma] : [URL]
- [Doc Sanity GROQ] : https://www.sanity.io/docs/groq