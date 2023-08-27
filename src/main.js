import { createApp } from 'vue'
import { createPinia } from 'pinia'
/*IFR. Falta Store*/
import App from './App.vue'
import router from './router'

const app = createApp(App)


//-- Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//-- Perfect Scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
//vue-meta head
import { createHead } from '@vueuse/head';

app.use(createPinia())
app.use(router)
/* IFR Agregado */
app.use(PerfectScrollbar)
app.use(createHead())
app.mount('#app')
