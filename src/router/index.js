import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/appAuthStore.js';
import { useAlertStore } from '@/stores/appAlertStore.js';

import publicRouter   from './publicRouter';
import authRouter     from './authRouter';
import tableroRouter  from './tableroRouter';
console.log("🧊 router/index.js")


const routes = [
  { ...publicRouter},
  { ...authRouter},
  { ...tableroRouter},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to) => {
  console.log("# router.index.js" )
  console.log(JSON.stringify(to.path))
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/', '/login', '/registro'];
  const authRequired = !publicPages.includes(to.path);
  console.log("# router.index.js- beforeEach -" + authRequired)
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
