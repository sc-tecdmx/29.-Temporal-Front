import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/appAuthStore.js';
import { useAlertStore } from '@/stores/appAlertStore.js';

import  IndexView  from '@/views/tablero/IndexView.vue'

import authRouter from './authRouter';
import tableroRouter from './tableroRouter';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', name: 'home', component: IndexView },
    { ...authRouter},
    { ...tableroRouter},
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login', '/registro'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router
