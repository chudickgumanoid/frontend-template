# @chdck/vue-template

[![NPM version](https://img.shields.io/npm/v/@chdck/vue-template?color=de45db&label=)](https://www.npmjs.com/package/@chdck/vue-template)

A CLI to quickly scaffold a Vite + Vue 3 frontend template. It generates a project structure with ready‑to‑use providers (Router, Pinia, i18n, Vue Query), Vite configuration, Tailwind v4, a Naive UI layer, and a set of helpful utilities. During setup you can opt out of subsystems (i18n, TanStack Query, SVG sprite, ESLint).

– Node.js >= 18

## Quick Start

– via npx (scoped package):

```
npx @chdck/vue-template@latest my-app
```

– via pnpm dlx (scoped package):

```
pnpm dlx @chdck/vue-template my-app
```

Or via the unscoped binary names:

Then:

```
cd my-app
pnpm i
pnpm dev
```

If you don’t pass a project name, the CLI will ask for it interactively (kebab-case required).

## What the CLI does

- Creates the project directory and copies the base template.
- Injects the application name into the template `package.json`.
- Prompts for configurable options and removes unused parts when disabled.
- Prints final instructions (commands to run).

## Usage

```
vue-template [project-name] [options]
```

- `[project-name]`: project folder name in kebab-case (e.g., `awesome-app`).
- `-f, --force`: skip confirmation and overwrite a non-empty directory.

Help:

```
npx @chdck/vue-template --help
```

## Interactive options

- Use i18n (vue-i18n) — default `Yes`.
- Use TanStack Query — default `Yes`.
- Use SVG sprite (vite-plugin-svg-icons and `m-icon` component) — default `Yes`.
- Include ESLint — default `Yes`.

If you disable an option, the CLI removes related files/imports, updates `vite.config.js` and `package.json` to keep the generated project clean and buildable.

## What’s inside the template

- Vue 3, Vite 6, Pinia, Vue Router, @vueuse/core, @vueuse/head.
- Naive UI as the UI library; example providers for theming, loader, and notifications.
- Tailwind CSS v4.
- i18n (vue-i18n) with a language switch example.
- TanStack Query + devtools for API requests and caching.
- Axios and an API instance scaffold.
- SVG sprite support via `vite-plugin-svg-icons` and an `m-icon` component (optional).
- Layered structure: `app/`, `pages/`, `features/`, `widgets/`, `shared/`.
- Alias ready: `@ -> src` (see `vite.config.js`, `jsconfig.json`).

## Examples

- Create a project and overwrite the target folder if it isn’t empty:

```
npx @chdck/vue-template awesome-app --force
```

- Run interactively without a name and choose options:

```
npx @chdck/vue-template
```

## Requirements

- Node.js >= 18
- pnpm is recommended (npm/yarn also work)

