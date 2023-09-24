<script setup>
  import { computed } from "vue";
  import { useMeta } from "@/composables/use-meta.js";
  import { useAuthStore } from "@/stores/appAuthStore.js";
  import { useLiveStore } from "@/stores/appLiveStore.js";

  import "@/assets/sass/app.scss"; /* IFR */

  console.log("◘ App.vue")

  /*import authLayout from "./layouts/authLayout.vue";
  import appLayout from "./layouts/appLayout.vue";
  */
   
  useMeta({ title: "TECDMX - Tablero de control de Firmas Electrónicas." });
  const authStore = useAuthStore();
  const appLiveStore = useLiveStore();

  //const publicPages = ['/login', '/registro'];
  //const authRequired = !publicPages.includes('');

///  const layout = computed(() => {
///    return /*appLiveStore.state.layout;*/
///    (authRequired && !authStore.user ?  'auth': appLiveStore.state.layout)
///  })

//  console.log('layout: [' + layout  + ']') 
  //------------
//  const app = appLayout
</script>
<script>
/*export default {
  components: {
    app: appLayout,
    auth: authLayout,
  },
};*/
</script>
<template>
  <router-view />
</template>
<!--
<template>
    <div :class="[appLiveStore.state.layout_style, appLiveStore.state.menu_style]">
        <component v-bind:is="app"></component>
    </div>
</template>

-->