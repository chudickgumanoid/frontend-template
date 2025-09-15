# App Layer

The `src/app` folder is the top‑level application layer. It wires together core providers, global configuration, and root UI, exposing a ready‑to‑mount Vue application instance.

## Purpose
- Compose the app shell (root component, layouts, routing, i18n, theme, global UI).
- Centralize application‑wide configuration and bootstrap logic.
- Provide clear extension points for features and shared modules.

## What to Keep Here
- `App.vue`: Root UI wrapper (providers, layout outlet).
- `index.js`: Application factory that creates and configures the Vue app.
- `main.js`: Entry point that mounts the configured app.
- `providers/`: App‑wide providers and infrastructure.
  - `router/`: Route table (`routes.js`) and router instance (`index.js`).
  - `i18n/`: i18n setup and message catalogs loader.
  - `theme/`: Naive UI theme overrides and helpers.
  - `components/`: Global component registry (auto‑registers shared UI).
- `style/`: Global styles (e.g., Tailwind resets, variables).

Avoid placing feature logic, API calls, or business state here—keep those in `src/pages`, `src/entities`, or `src/shared`.

## How It’s Used
1. `index.js` creates the app, attaches providers (i18n, router, Pinia, Vue Query, head manager, directives), and registers global components.
2. `main.js` imports the configured `application` and mounts it to `#app`.
3. `App.vue` wraps the app with UI providers (Naive UI) and renders the active layout + route view.

## Structure Example
- `app/`
  - `App.vue` – root component with providers and layout outlet
  - `index.js` – creates and configures the application instance
  - `main.js` – mounts the application
  - `providers/`
    - `router/` – route aggregation and router creation
    - `i18n/` – i18n initialization and helpers
    - `theme/` – theme config (Naive UI overrides)
    - `components/` – global component auto‑registration
  - `style/` – global styles

## Conventions
- Keep files small and focused; treat `app` as composition glue.
- Use `providers/*` for cross‑cutting concerns only (no feature specifics).
- Expose minimal public API from this layer (usually just `application`).
- Route definitions live in feature modules under `src/pages/**` and are aggregated in `providers/router/routes.js`.

## Extending the App Layer
- Add a provider: create `providers/<name>/index.js` and install it in `app/index.js`.
- Add global components: extend globs in `providers/components/registerComponents.js`.
- Theme changes: edit `providers/theme/themeConfig.js` and (optionally) add theme tools to `App.vue`.
- i18n languages: extend `shared/i18n/messages.js`, adjust default/fallback in `providers/i18n`.
- Navigation guards: add `beforeEach/afterEach` in `providers/router/index.js` (auth, titles, loaders).

## Dependencies and Cross‑Layer Rules
- `app` may depend on `shared` and `widgets`, but not on feature internals.
- Feature modules (in `pages/`) should not import from `app` directly; they contribute routes and UI that `app` composes.

## Notes
- This structure keeps bootstrap concerns isolated and makes feature modules portable and testable.

