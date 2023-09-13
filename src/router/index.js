import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/tablero/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/documento/nuevo',
      name: 'nuevo',
      component: () => import('../views/tablero/documentos/nuevo/NuevoView.vue')
    },
  ]
})

export default router
