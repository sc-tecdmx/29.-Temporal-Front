import  appLayout  from '@/layouts/appLayout.vue';
import  IndexView  from '@/views/tablero/IndexView.vue'
import  NuevoView  from '@/views/tablero/documentos/nuevo/NuevoView.vue'
import Perfil from "@/views/perfil/Perfil.vue"
export default {
    path: '/tablero', 
    component : appLayout,
    children: [
        { path: '/tablero/inicio', name: 'tablero-inicio', component: IndexView},
        { path: '/tablero/nuevo', name: 'nuevo', component: NuevoView},
        { path: '/auth/perfil', name: 'perfil', component: Perfil },

    ]
}