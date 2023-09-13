import { createApp } from 'vue'
import { createPinia } from 'pinia'
/*IFR. Falta Store*/
import App from './App.vue'
import router from './router'
//----------------------------------------

//--1. Bootstrap
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
//--2 modals
import '@/assets/sass/components/custom-modal.scss';

//-- Perfect Scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

//vue-meta head
import { createHead } from '@vueuse/head';


//-- Establecer configuración inicial por default
/*import appInit from './app-init';
window.$appInit = appInit;
window.$appInit.init();*/
//--
const app = createApp(App)
app.use(createPinia())

app.use(router)
/* IFR Agregado */
app.use(PerfectScrollbar)
app.use(createHead())
app.mount('#app')

