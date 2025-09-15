/**
 * Application route table.
 *
 * - Aggregates feature routes (auth, home) and exports a flat array for Vue Router.
 * - Important: import and include route arrays from every feature in `src/pages/**`.
 *   New page modules must export their routes (e.g., `export const xyzRoutes = [...]`)
 *   and be added here to participate in navigation.
 * - Meta fields commonly used by the app:
 *   - `meta.layout`: selects layout component by name (see `AppLayout.vue`).
 *   - `meta.title`: page title (can be localized via i18n).
 *   - `meta.requiresAuth`: guard hint for protected routes.
 * - Includes a catch-all 404 route.
 */
import { authRoutes } from "@/pages/auth";
import { homeRoutes } from "@/pages/home";

export default [
  ...authRoutes,
  ...homeRoutes,

  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: {
      requiresAuth: true,
      layout: "AppLayoutClient",
      title: "Error 404",
    },
    component: () => import("@/pages/errors/NotFoundView.vue"),
  },
];
