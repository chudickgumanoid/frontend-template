import AuthPage from '@/pages/auth/ui/AuthPage.vue';
import NotFoundView from '@/pages/errors/NotFoundView.vue';

export default [
  { path: '/', redirect: '/auth' },
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
];
