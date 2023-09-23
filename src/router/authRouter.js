import {AuthLayout,Login,Registro,BloqueoView, RecuperarContrasenaView  } from '@/views/login'

export default {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children : [
        { path: '/registro',  name: 'registro', component: Registro  },
        { path: '/recupera_contrasena',name: 'recuperarContrasena',
            component: RecuperarContrasenaView },
        { path: '/bloqueo', name: 'bloqueo', component: BloqueoView },
        { path: '/login', name: 'login', component: Login },
    ]
}

