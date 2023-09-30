<script setup>
  import { useMeta }      from "@/composables/use-meta.js";
  import { useAuthStore } from "@/stores/appAuthStore.js";
  import { useLiveStore } from "@/stores/appLiveStore.js";

  import "@/assets/sass/nekdu_app.scss"; /* IFR */

  console.log("🧊 App.vue");
  useMeta({ title: "TECDMX - Tablero de control de Firmas Electrónicas." });
  window.$$config.init();
  /* const authStore = useAuthStore();
  const appLiveStore = useLiveStore(); */
</script>
<template>
  <router-view />
</template>
