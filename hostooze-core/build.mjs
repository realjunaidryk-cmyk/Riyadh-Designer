// Renders preview images and exports hostooze-core.glb from the code model.
//
//   npm i playwright three@0.169.0 && npx playwright install chromium
//   node build.mjs                 # writes renders/*.png and hostooze-core.glb
//
// Options: --no-glb, --no-renders, --res 256, --three-local <path to node_modules/three>
// (--three-local serves three.js from disk instead of the CDN, for offline use.)
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const res = opt('--res', '256');
const threeLocal = opt('--three-local', null);

const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript' };
const server = http.createServer((req, resp) => {
  const url = new URL(req.url, 'http://x');
  const file = path.join(here, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!file.startsWith(here) || !fs.existsSync(file)) { resp.writeHead(404); return resp.end(); }
  let body = fs.readFileSync(file);
  if (file.endsWith('index.html')) body = Buffer.concat([Buffer.from('<!doctype html><meta charset="utf-8">'), body]);
  resp.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
  resp.end(body);
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
page.on('console', (m) => { if (m.type() === 'error') console.error('page:', m.text()); });
page.on('pageerror', (e) => console.error('page error:', e.message));
if (threeLocal) {
  await page.route('https://cdn.jsdelivr.net/npm/three@0.169.0/**', (route) => {
    const p = new URL(route.request().url()).pathname.replace('/npm/three@0.169.0/', '');
    route.fulfill({ path: path.join(threeLocal, p), contentType: 'text/javascript' });
  });
}

fs.mkdirSync(path.join(here, 'renders'), { recursive: true });
const shots = [
  ['charcoal-iso', 'brand', 0],
  ['charcoal-turn', 'brand', 30],
  ['porcelain-iso', 'light', 0],
];
for (const [name, pal, yaw] of args.includes('--no-renders') ? [] : shots) {
  await page.goto(`${base}?res=${res}&palette=${pal}&spin=0&yaw=${yaw}`, { timeout: 120000 });
  await page.waitForFunction(() => window.hostooze?.ready, null, { timeout: 120000 });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    for (const s of ['.label', '.controls']) document.querySelector(s).style.visibility = 'hidden';
  });
  await page.screenshot({ path: path.join(here, 'renders', `${name}.png`), timeout: 120000 });
  console.log('rendered', name);
}

if (!args.includes('--no-glb')) {
  await page.goto(`${base}?res=${res}&spin=0`, { timeout: 120000 });
  await page.waitForFunction(() => window.hostooze?.ready, null, { timeout: 120000 });
  const b64 = await page.evaluate(async () => {
    const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js');
    const { core } = window.hostooze;
    const buf = await new GLTFExporter().parseAsync(core, { binary: true, maxTextureSize: 2048 });
    let s = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(s);
  });
  fs.writeFileSync(path.join(here, 'hostooze-core.glb'), Buffer.from(b64, 'base64'));
  console.log('exported hostooze-core.glb', (Buffer.byteLength(b64, 'base64') / 1e6).toFixed(1), 'MB');
}

await browser.close();
server.close();
