import  publicLayout  from '@/layouts/publicLayout.vue';
import  HomeView  from '@/views/public/HomeView.vue'

export default {
    path: '/home', 
    component : publicLayout,
    children: [
        { path: '/', name: 'homeView', component: HomeView},
    ]
}