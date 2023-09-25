import { Layout, Login, Register } from '@/views/account';
//import { authlayout } from '@/layouts/auth-layout.vue'
//import { LoginView, BloqueoView, RegistroView, RecuperarContrasenaView } from '@/views/login'
export default {
    path: '/account',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register }
    ]
};
