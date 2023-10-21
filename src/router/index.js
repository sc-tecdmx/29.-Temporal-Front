import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/tablero/IndexView.vue'
//import accountRoutes from './account.routes'
//import usersRoutes from './users.routes'


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
      path: '/documento/nuevo/:tipo',
      name: 'nuevo',
      component: () => import('../views/tablero/documentos/nuevo/NuevoView.vue')
    },
    {
      path: '/documento/recibido',
      name: 'recibido',
      component: () => import('../views/tablero/documentos/nuevo/RecibidoView.vue')
    },
    /********** Login ***********/
    {
      path: '/account/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/account/registro',
      name: 'registro',
      component: () => import('../views/login/RegistroView.vue')
    },
    {
      path: '/account/recupera_contrasena',
      name: 'recuperarContrasena',
      component: () => import('../views/login/RecuperarContrasenaView.vue')
    },
    {
      path: '/account/bloqueo',
      name: 'bloqueo',
      component: () => import('../views/login/BloqueoView.vue')
    },
    {
      path: '/account/perfil',
      name: 'perfil',
      component: () => import('../views/login/PerfilView.vue')
    },
    {
      path: '/account/cambiar_contrasena',
      name: 'cambiarContrasena',
      component: () => import('../views/login/CambiarContrasenaView.vue')
    },
    {
      path: '/config/catalogo/areas',
      name: 'areasAdscripcion',
      component: () => import('../views/configuracion/catalogos/AreasAdscripcionView.vue')
    },
    {
      path: '/config/catalogo/personal',
      name: 'personal',
      component: () => import('../views/configuracion/catalogos/PersonalView.vue')
    },
    {
      path: '/config/catalogo/roles',
      name: 'roles',
      component: () => import('../views/configuracion/catalogos/RolesView.vue')
    },
    {
      path: '/config/catalogo/tipoDocumento',
      name: 'tipoDocumento',
      component: () => import('../views/configuracion/catalogos/TiposDocumentoView.vue')
    },
    {
      path: '/config/adminRolPersonaApp',
      name: 'adminRolPersonaApp',
      component: () => import('../views/configuracion/PersonalRolAppView.vue')
    },
    /********** FinLogin ***********/
    //  { ...accountRoutes },
    //  { ...usersRoutes },
    //  { path: '/:pathMatch(.*)*', redirect: '/' }
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "NotFound",
    //   component: () => import('../views/error404.vue'),
    // },

  ]
})

// router.beforeEach(async (to) => {
//   // clear alert on route change
//   const alertStore = useAlertStore();
//   alertStore.clear();

//   // redirect to login page if not logged in and trying to access a restricted page 
//   const publicPages = ['/account/login', '/account/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const authStore = useAuthStore();

//   if (authRequired && !authStore.user) {
//       authStore.returnUrl = to.fullPath;
//       return '/account/login';
//   }
// });


export default router
