import { createApp } from 'vue'
import { createPinia } from 'pinia'

//-- IFR. Standard app flow
import App from './App.vue'
import router from './router'

//-- IFR. UI/UX Components
import { createHead } from '@vueuse/head';

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import '@/assets/sass/components/custom-modal.scss';

import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

//-- Establecer configuración inicial por default
/*import appInit from './app-init';
window.$appInit = appInit;
window.$appInit.init();*/
//--

//# 
// setup fake backend
import { fakeBackend } from './helpers';
fakeBackend();
//#
const app = createApp(App)
    app.use(createPinia())
    app.use(router)
/* IFR Agregado */
    app.use(PerfectScrollbar)
    app.use(createHead())
    app.mount('#app')

