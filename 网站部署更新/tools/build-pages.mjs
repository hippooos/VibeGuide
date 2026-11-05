import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, extname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, '_site');
// Explicit public asset list: never copy the repository or backend configuration.
const assets = [
  'index.html', 'home.html', 'app.html', 'app.css', 'components.css',
  'home.mjs', 'app.mjs', 'api-client.mjs', 'app-state.mjs', 'state-machine.mjs',
  'date-utils.mjs', 'question-answers.mjs', 'renderers.mjs', 'video-scrub.mjs',
  'site-mode.mjs', 'hero_eyes_circle_smooth_10s.mp4',
];
await mkdir(output, { recursive: true });
for (const asset of assets) {
  const source = resolve(root, 'frontend', asset);
  const target = resolve(output, asset);
  if (extname(asset) === '.html') {
    const html = await readFile(source, 'utf8');
    await writeFile(target, html.replace('<head>', '<head>\n  <meta name="ai-calendar-mode" content="showcase">'));
  } else {
    await copyFile(source, target);
  }
}
await writeFile(resolve(output, '.nojekyll'), '');
console.log(`Prepared ${assets.length + 1} public files in _site (showcase mode, no model calls).`);
