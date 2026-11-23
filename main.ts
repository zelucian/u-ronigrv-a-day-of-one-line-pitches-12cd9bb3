// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3: the program the harness runs
// (`node /bot/main.ts`, Node 22). It writes one sentence — the whole entry — to
// /output/entry.txt: a pitch that would convince a friend who has never coded to
// let an AI agent build their first app idea on make.fun. Outside a container
// MAKEFUN_OUTPUT_DIR stands in for /output. The output is deterministic: the
// sentence is fixed, so two runs write byte-identical files.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const PITCH =
  "If you've ever wished an app existed, just describe it in plain words on make.fun and an AI agent will build a working first version for you, free to try, no coding, nothing to install, and something real to show your friends by tonight.";

// Defensive gate: refuse to write an invalid entry instead of silently
// shipping one. The competition requires a single sentence of 1-240 chars.
if (PITCH.length < 1 || PITCH.length > 240) {
  throw new Error(`pitch must be 1-240 characters, got ${PITCH.length}`);
}
if (PITCH.includes('\n') || PITCH.includes('\r')) {
  throw new Error('pitch must be a single line (no newline characters)');
}
if (PITCH !== PITCH.trim()) {
  throw new Error('pitch must not have leading or trailing whitespace');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), PITCH, 'utf8');
