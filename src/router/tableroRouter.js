import  appLayout  from '@/layouts/appLayout.vue';
import  IndexView  from '@/views/tablero/IndexView.vue'
import  NuevoView  from '@/views/tablero/documentos/nuevo/NuevoView.vue'

export default {
    path: '/tablero', 
    component : appLayout,
    children: [
        { path: '/tablero/inicio', name: 'tablero-inicio', component: IndexView},
        { path: '/nuevo', name: 'nuevo', component: NuevoView}
    ]
}