/**
 * Generates web-optimized WebP variants from the original images.
 *
 * Originals (JPEG, PNG or SVG) live in resources/images (not deployed),
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
  const files = (await readdir(join(sourceDir, folder))).filter(file => /\.(jpe?g|png|svg)$/i.test(file));
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

/**
 * Preview image for links shared on LinkedIn, WhatsApp & co. (Open Graph, 1200x630).
 * JPEG, because not every platform shows WebP previews.
 */
const og = { width: 1200, height: 630 };
const logoWidth = 440;
const logo = await sharp(join(targetDir, 'logos', 'logo-name-white.svg'), { density: 300 })
  .resize({ width: logoWidth })
  .toBuffer();
const { height: logoHeight } = await sharp(logo).metadata();
const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${og.width}" height="${og.height}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#133B3F" stop-opacity="0.96"/>
      <stop offset="0.38" stop-color="#133B3F" stop-opacity="0.88"/>
      <stop offset="0.62" stop-color="#133B3F" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#shade)"/>
  <rect y="${og.height - 12}" width="100%" height="12" fill="#F25F5C"/>
</svg>`);
const ogTarget = join(targetDir, 'social', 'og-image.jpg');
await mkdir(dirname(ogTarget), { recursive: true });
await sharp(join(sourceDir, 'profile', 'welcome.jpg'))
  .rotate()
  // the photo is 3:2; cut less above the head than below the arms
  .resize({ width: og.width })
  .extract({ left: 0, top: 40, ...og })
  .composite([
    { input: shade },
    { input: logo, left: 72, top: Math.round((og.height - logoHeight) / 2) },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(ogTarget);
console.log(`social/og-image.jpg  ${og.width}x${og.height}  ${Math.round((await stat(ogTarget)).size / 1024)} kB`);
