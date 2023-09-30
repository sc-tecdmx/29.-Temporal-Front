import { createApp } from 'vue'
import { createPinia } from 'pinia'

//-- IFR. Standard app flow
import App      from './App.vue'
import router   from './router'

//-- IFR. UI/UX Components
import { createHead } from '@vueuse/head';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import '@/assets/sass/components/custom-modal.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import appConfig from './AppConfig';


//~~ setup fake backend
import { fakeBackend } from './helpers';
fakeBackend();
//~~
console.log("🧊 main.js")
//-- Cargar los parámetros previos
//-- IFR. TODO  Establecer configuración inicial por default
window.$$config = appConfig;
console.log ("== \ window.$$config ==")
console.log (window.$$config)
console.log ("== ./ window.$$config ==")
//window.$$config.init();

const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(PerfectScrollbar)
    app.use(createHead())
    app.mount('#app')