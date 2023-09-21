import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/tablero/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      //component: IndexView
      component: () => import('../views/tablero/IndexView.vue')
    },
    {
      path: '/documento/nuevo',
      name: 'nuevo',
      component: () => import('../views/tablero/documentos/nuevo/NuevoView.vue')
    },
    /********** Login ***********/
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/login/RegistroView.vue')
    },
    {
      path: '/recupera_contrasena',
      name: 'recuperarContrasena',
      component: () => import('../views/login/RecuperarContrasenaView.vue')
    },
    {
      path: '/bloqueo',
      name: 'bloqueo',
      component: () => import('../views/login/BloqueoView.vue')
    },
  ]
})

export default router
