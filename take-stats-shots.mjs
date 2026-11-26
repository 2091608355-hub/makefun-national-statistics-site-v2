// Take the 4 screenshots for the stats site — real renders of the site itself.
// Run it after starting the server: `node serve.ts --port 8081` on :8081,
// then in another shell `node take-stats-shots.mjs`. Port 8081 is used
// because another task's server already holds 8080 on this machine.
import { chromium } from '/home/hatch/workspace/makefun/shots/node_modules/playwright-core/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const LIST = [
  { file: '1-overview.jpg', path: '#/overview', viewport: { width: 1280, height: 800 } },
  { file: '2-economy.jpg', path: '#/economy', viewport: { width: 1280, height: 800 } },
  { file: '3-regions.jpg', path: '#/regions', viewport: { width: 1280, height: 800 } },
  { file: '4-overview-phone.jpg', path: '#/overview', viewport: { width: 390, height: 844 } },
];
const target = join(homedir(), 'workspace', 'makefun', 'stats-site-repo', 'screenshots');
mkdirSync(target, { recursive: true });
const chromePath = join(homedir(), 'workspace', 'makefun', 'shots', 'chrome', 'chrome-linux64', 'chrome');

const browser = await chromium.launch({ executablePath: chromePath, args: ['--no-sandbox'] });
const problems = [];
for (const shot of LIST) {
  const page = await browser.newPage({ viewport: shot.viewport });
  page.on('console', (m) => { if (m.type() === 'error') problems.push(shot.file + ': ' + m.text()); });
  page.on('pageerror', (e) => problems.push(shot.file + ': ' + e.message));
  await page.goto('http://localhost:8081/' + shot.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const image = await page.screenshot({ type: 'jpeg', quality: 85 });
  writeFileSync(join(target, shot.file), image);
  console.log(shot.file, image.length, 'bytes');
  await page.close();
}
await browser.close();
console.log('console errors:', problems.length ? problems : 'none');
