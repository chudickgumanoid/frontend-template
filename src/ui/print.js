import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';
import ora from 'ora';
import { UI } from '../constants/meta.js';

export function printBanner() {
  const title = figlet.textSync(UI.bannerTitle, { horizontalLayout: 'default' });
  const subtitle = UI.bannerSubtitle;
  const msg = `${title}\n${chalk.gray(subtitle)}`;
  const boxed = boxen(msg, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    dimBorder: true
  });
  console.log(boxed);
}

export function spinner(text) {
  return ora({ text });
}

export function printInfo(message) {
  console.log(chalk.cyan(message));
}

export function printSuccess(message) {
  console.log(chalk.green(message));
}

export function printError(message) {
  console.error(chalk.red(message));
}

