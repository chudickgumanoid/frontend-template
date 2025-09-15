#!/usr/bin/env node
import { Command } from 'commander';
import { printBanner, printInfo, printError } from '../src/ui/print.js';
import scaffold from '../src/core/scaffold.js';

const program = new Command();

program
  .name('vue-template')
  .description('Create a Vue 3 + Vite frontend template project')
  .version('0.0.1');

program
  .argument('[project-name]', 'Project name in kebab-case')
  .option('-f, --force', 'Skip confirmation and overwrite if target exists', false)
  .action(async (projectName, options) => {
    try {
      printBanner();
      await scaffold({ initialName: projectName, force: Boolean(options.force) });
    } catch (err) {
      printError(err?.message || String(err));
      process.exitCode = 1;
    }
  });

program.parseAsync(process.argv);
