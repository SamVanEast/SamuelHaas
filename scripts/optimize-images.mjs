/**
 * Generates web-optimized WebP variants from the original images.
 *
 * Originals live in resources/images (not deployed),
 * the generated files go to src/assets/img and are referenced via srcset.
 *
 * Usage: pnpm images
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'resources', 'images');
const targetDir = join(root, 'src', 'assets', 'img');

/** Output widths per folder; each image is rendered in every width that is smaller than the original. */
const widths = {
  profile: [480, 960, 1440, 1920],
  projects: [480, 960, 1440],
};

const quality = 80;

for (const folder of Object.keys(widths)) {
  const files = (await readdir(join(sourceDir, folder))).filter(file => /\.(jpe?g|png)$/i.test(file));
  await mkdir(join(targetDir, folder), { recursive: true });

  for (const file of files) {
    const source = join(sourceDir, folder, file);
    const name = basename(file, extname(file));
    const { width: originalWidth } = await sharp(source).metadata();

    for (const width of widths[folder].filter(w => w <= originalWidth)) {
      const target = join(targetDir, folder, `${name}-${width}.webp`);
      const info = await sharp(source).rotate().resize({ width }).webp({ quality }).toFile(target);
      const kb = Math.round((await stat(target)).size / 1024);
      console.log(`${folder}/${name}-${width}.webp  ${info.width}x${info.height}  ${kb} kB`);
    }
  }
}
