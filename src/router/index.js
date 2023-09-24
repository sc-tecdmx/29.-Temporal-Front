import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/appAuthStore.js';
import { useAlertStore } from '@/stores/appAlertStore.js';

import  IndexView  from '@/views/tablero/IndexView.vue'

import authRouter from './authRouter';
import tableroRouter from './tableroRouter';
console.log("◘ router/index.js")
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
  console.log("# router.index.js" )
  console.log(JSON.stringify(to.path))
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login', '/registro'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  console.log('~~ 1 authStore ~~')
  console.log(authStore)
  console.log("~~ 2 authStore ~~  state.value.user:-##" );
  console.log( JSON.stringify( authStore.state))

  if (authRequired && !authStore.state.user) {
      authStore.state.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router
