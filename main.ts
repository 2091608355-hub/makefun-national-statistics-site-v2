// Hand-in program for China by Numbers (Node 22, standard library only).
// It collects the static site in app/ and the screenshots in screenshots/
// from next to this file, copies them into the output folder, and writes
// dossier.json there using the vendored make.fun library. The library file
// under vendor/ must stay exactly as the kit shipped it: the scorer
// rebuilds the dossier with its own copy and compares the two byte for byte.
//
// Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Without MAKEFUN_OUTPUT_DIR the grader's /output is used.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const destination = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(destination, { recursive: true });
cpSync(join(here, 'app'), join(destination, 'app'), { recursive: true });
mkdirSync(join(destination, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(destination, 'screenshots'), { recursive: true });

// Limits from the scorer's gate: the text cap shapes the dossier bytes, and
// the others refuse an entry the scorer would refuse (too many screenshots,
// one too big, or app/ past 993 entries / 16 MiB). Nothing here reorders or
// renames files, so running the program twice writes identical bytes.
const text = buildDossier(destination, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 });
writeFileSync(join(destination, 'dossier.json'), text);
