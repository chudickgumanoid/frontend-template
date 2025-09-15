/**
 * Router bootstrap and guard hook point.
 *
 * - Creates Vue Router with HTML5 history and aggregated routes from `routes.js`.
 * - This is the central place to attach navigation guards (e.g., `beforeEach`).
 * - Typical checks to add here:
 *   - Auth: verify presence/validity of an access token before protected routes.
 *   - Meta-driven redirects: use `route.meta.requiresAuth`, `route.meta.layout`, etc.
 *   - Title: set `document.title` from `route.meta.title` and i18n if needed.
 *   - Loading/notifications: trigger global loader or messages on navigation.
 *
 * Example (to be added where appropriate):
 * router.beforeEach((to, from, next) => {
 *   const requiresAuth = to.meta?.requiresAuth;
 *   const token = localStorage.getItem('access_token');
 *   if (requiresAuth && !token) return next({ name: 'login' });
 *   next();
 * });
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
