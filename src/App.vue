<script setup>
  import { computed } from "vue";
  import { useMeta } from "@/composables/use-meta.js";
  import { useLiveStore } from "@/stores/appLiveStore.js";
  import "@/assets/sass/app.scss"; /* IFR */
  // import appLayout from "./layouts/applayout.vue";
  // import authLayout from "./layouts/auth-layout.vue";
  
  
  useMeta({ title: "TECDMX - Tablero de control de Firmas Electrónicas." });

  const appLiveStore = useLiveStore();
  const layout = computed(() => {
    return appLiveStore.state.layout;
  })

  console.log('layout: [' + layout  + ']')
  //------------
  //const app = appLayout
</script>
<template>
    <router-view />
</template>
