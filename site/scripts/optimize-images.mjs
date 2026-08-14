#!/usr/bin/env node
/**
 * Prépare les photos du client pour `src/assets/`.
 *
 *   node scripts/optimize-images.mjs <source> [destination] [--only=prefixe]
 *   npm run images -- --only=3.1
 *
 * `--only` limite la conversion aux fichiers dont le nom commence par ce
 * préfixe. Les pages sont livrées une par une : sans ce filtre, construire la
 * page 3.1 déposerait dans le dépôt les cinquante WebP des pages qui n'existent
 * pas encore — exactement le poids que ce script sert à éviter.
 *
 * Ce n'est PAS un doublon du pipeline `astro:assets`, qui produit ensuite les
 * variantes responsives à partir de ce que ce script dépose. Il règle un autre
 * problème : les fichiers livrés font 0,5 à 1,5 Mo pièce, et le dépôt en portera
 * une cinquantaine. Les convertir une fois à l'import évite d'alourdir
 * durablement l'historique git avec des JPEG que personne ne relira.
 *
 * Idempotent : un fichier déjà converti et plus récent que sa source est laissé
 * tel quel. On peut donc le relancer à chaque livraison partielle du client.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

/* 2560px : la plus grande largeur demandée par les `widths` des composants.
   Au-delà, on stockerait des pixels qu'aucun `srcset` ne sert jamais. */
const MAX_WIDTH = 2560;
/* 82 : au-dessus, le gain visuel ne se voit plus sur ces photos ; en dessous,
   les dégradés de ciel se postérisent — c'est le défaut le plus visible sur des
   photos de toiture. Le hero repasse ensuite en qualité 85 via astro:assets. */
const QUALITY = 82;

/**
 * Extensions acceptées, de la meilleure source à la moins bonne.
 *
 * ⚠️ L'ordre compte. Tout converge vers un `.webp`, donc `photo.png` et
 * `photo.webp` visent LE MÊME fichier de sortie. Le client livre souvent les
 * deux — un export brut et une version déjà compressée. Sans arbitrage, le
 * gagnant dépendait de l'ordre de lecture du dossier : on pouvait recompresser
 * un WebP déjà lossy (double perte) un jour, et partir du PNG le lendemain,
 * sans que rien ne le signale.
 *
 * On part donc toujours de la source la MOINS dégradée, et on le dit.
 */
const SOURCE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

const args = process.argv.slice(2);
const onlyFlag = args.find((arg) => arg.startsWith('--only='));
const only = onlyFlag ? onlyFlag.slice('--only='.length) : null;
const [sourceDir, destDir = 'src/assets/pages'] = args.filter((arg) => !arg.startsWith('--'));

if (!sourceDir) {
  console.error(
    'usage : node scripts/optimize-images.mjs <source> [destination] [--only=prefixe]',
  );
  process.exit(1);
}

async function mtime(path) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return null;
  }
}

await mkdir(destDir, { recursive: true });

const entries = await readdir(sourceDir, { withFileTypes: true });

/* Un seul candidat par nom de sortie, choisi sur la qualité de la source et non
   sur l'ordre du dossier. Les doublons écartés sont annoncés : un fichier livré
   qui n'est pas utilisé doit se voir, sinon on croit l'avoir traité. */
const candidates = new Map();
for (const entry of entries) {
  if (!entry.isFile()) continue;
  if (only && !entry.name.startsWith(only)) continue;
  const ext = extname(entry.name).toLowerCase();
  const rank = SOURCE_EXTENSIONS.indexOf(ext);
  if (rank === -1) continue;

  const key = basename(entry.name, extname(entry.name));
  const previous = candidates.get(key);
  if (!previous) {
    candidates.set(key, { name: entry.name, rank });
  } else if (rank < previous.rank) {
    console.log(`↷ ${key} : ${entry.name} préféré à ${previous.name} (source moins dégradée)`);
    candidates.set(key, { name: entry.name, rank });
  } else {
    console.log(`↷ ${key} : ${entry.name} ignoré, ${previous.name} est une meilleure source`);
  }
}

let converted = 0;
let skipped = 0;

for (const { name } of candidates.values()) {
  const source = join(sourceDir, name);
  const target = join(destDir, `${basename(name, extname(name))}.webp`);

  const [sourceTime, targetTime] = await Promise.all([mtime(source), mtime(target)]);
  if (targetTime !== null && targetTime >= sourceTime) {
    skipped += 1;
    continue;
  }

  const image = sharp(source);
  const { width } = await image.metadata();

  await image
    /* `withoutEnlargement` : une photo livrée en 1600px ne doit pas être
       gonflée à 2560 — on n'inventerait que du flou, pour trois fois le poids. */
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target);

  const [before, after] = await Promise.all([stat(source), stat(target)]);
  const kb = (n) => Math.round(n / 1024);
  console.log(
    `${name} → ${basename(target)}  ${width}px  ${kb(before.size)} Ko → ${kb(after.size)} Ko`,
  );
  converted += 1;
}

console.log(`\n${converted} converti(s), ${skipped} déjà à jour.`);
