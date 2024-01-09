import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import {cors}  from 'cors'
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
// datatables
import { ClientTable } from 'v-tables-3';
// vue input mask
import Maska from 'maska';

//Sweetalert
import Swal from 'sweetalert2';
window.Swal = Swal;

//config Servicios
//import config from './config';

//-- Establecer configuración inicial por default
/*import appInit from './app-init';
window.$appInit = appInit;
window.$appInit.init();*/
//--
const app = createApp(App)
app.use(createPinia())
//app.use(cors());
app.use(router)
/* IFR Agregado */
app.use(PerfectScrollbar)
app.use(createHead())
app.use(Maska)
//app.provide('config', config)
app.mount('#app')
app.use(ClientTable)
