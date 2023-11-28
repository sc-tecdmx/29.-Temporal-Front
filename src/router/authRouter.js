import { AuthLayout, LoginView, RegistroView, BloqueoView, RecuperarContrasenaView, RestNuevaContrasena } from '../views/login';

export default {
    path: '/account',
    name: 'auth',
    component: AuthLayout,
    children: [
        { path: '/account/login', name: 'login', component: LoginView },
        { path: '/account/registro', name: 'registro', component: RegistroView },
        { path: '/account/recupera_contrasena', name: 'recuperaContraseña', component: RecuperarContrasenaView},
        { path: '/account/bloqueo', name: 'bloqueo', component: BloqueoView},
        { path: '/account/restablecer-contrasenia', 
          name: 'restNuevaContrasena', 
          component: RestNuevaContrasena,
          props: (route) => ({
            token: route.query.token,
          })
        }
    ]
};
