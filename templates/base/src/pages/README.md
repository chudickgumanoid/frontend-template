# Pages Layer

Holds route-level pages that assemble features and widgets into full screens.

- Purpose: compose UI for routes; minimal business logic.
- Exports: each page module must export its route array (e.g., `export const homeRoutes = [...]`). Only route arrays are consumed outside this layer.
- Structure: keep subfolders per page (`home/`, `auth/`), each with `index.js` exporting `*Routes` and `ui/` for page components.
- Dependencies: may use `features/`, `widgets/`, and `shared/`, but avoid importing from `app/`.
- Routing: route arrays are aggregated in `app/providers/router/routes.js`.

