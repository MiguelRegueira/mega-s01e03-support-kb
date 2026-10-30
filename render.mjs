import { createServer } from 'vite';
import { render } from 'svelte/server';
import { writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { compile, preprocess } from 'svelte/compiler';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: Preview } = await vite.ssrLoadModule('/src/Preview.svelte');
  const { head, body } = render(Preview);
  const files = ['src/lib/layouts/runbook.svelte', 'src/lib/kb/CauseTable.svelte', 'src/lib/kb/QueueTimeline.svelte', 'src/lib/kb/RenderStamp.svelte'];
  const styles = await Promise.all(files.map(async (filename) => {
    const source = await readFile(filename, 'utf8');
    const processed = await preprocess(source, vitePreprocess(), { filename });
    return compile(processed.code, { filename, generate: 'server' }).css?.code ?? '';
  }));
  await writeFile('4471-desk-view.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}<style>${styles.join('\n')}</style></head><body>${body}</body></html>\n`);
} finally {
  await vite.close();
}
