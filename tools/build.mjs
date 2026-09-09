import { readdir, readFile, cp, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)));
  return files.flat();
}
const sources = await walk(path.join(root, 'src'));
for (const file of sources.filter(f => f.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  const text = await readFile(file, 'utf8');
  for (const m of text.matchAll(/(?:from\s+|import\s*)['"](\.[^'"]+)['"]/g)) {
    await stat(path.resolve(path.dirname(file), m[1]));
  }
}
const html = await readFile('index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML ids');
for (const m of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)) {
  const ref = m[1];
  if (ref.startsWith('#')) { if (ref.length > 1 && !ids.includes(ref.slice(1))) throw new Error(`Missing anchor: ${ref}`); }
  else if (!/^(https?:|mailto:|tel:|\?)/.test(ref)) await stat(path.join(root, ref));
}
await mkdir('build', { recursive: true });
for (const item of ['index.html', 'src', 'public']) await cp(item, path.join('build', item), { recursive: true });
console.log(`Build passed: ${sources.filter(f => f.endsWith('.js')).length} JavaScript modules, imports, local links and anchors. Static output: build/`);

