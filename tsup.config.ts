import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    cli: 'src/bin/cli.ts',
    index: 'src/index.ts'
  },
  format: ['esm'],
  sourcemap: true,
  clean: true,
  dts: {
    entry: {
      index: 'src/index.ts'
    }
  },
  banner: {
    js: '#!/usr/bin/env node'
  },
  minify: false,
  target: 'node18',
  outExtension: () => ({ js: '.mjs' })
});
