import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore';
import { useAlertStore } from '@/stores/alertStore';

import authRouter from './authRouter';
import tableroRouter from './tableroRouter';

const routes = [
  { ...authRouter},
  { ...tableroRouter}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async(to) =>{
  const alertStore = useAlertStore();
  alertStore.clear();

  const publicPages = ['/account/login', '/account/registro', '/account/recupera_contrasena'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  // console.log("authStore.state.user")
  // console.log(authStore.state.user)

       if(authRequired && !authStore.state.user){
         authStore.returnUrl = to.fullPath;
         return '/account/login'
       }
});
export default router
