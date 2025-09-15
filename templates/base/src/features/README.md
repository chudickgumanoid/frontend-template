# Features Layer

Self-contained feature modules (e.g., auth, dashboard). Each feature encapsulates UI, API hooks, and logic, and exposes a small public API.

- Purpose: deliver vertical slices with clear boundaries and reuse across pages.
- Contents: components, hooks, API queries, stores, and route definitions local to the feature.
- Public API: export consumable parts via the feature's `index.js` (components, hooks) and `*Routes` for routing.
- Dependencies: may use `shared/*`; avoid reaching into other features directly.
- Reuse: page modules compose features into screens.

Suggested structure inside a feature:
- `ui/` — feature components
- `api/` — requests, query keys, hooks
- `model/` — state, constants, types
- `index.js` — re-exports and public surface
- `routes.js` or export `featureNameRoutes` from `index.js`

