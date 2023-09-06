<script setup>
  import { computed } from "vue";
  import { useMeta } from "@/composables/use-meta.js";
  import { useLiveStore } from "@/stores/appLiveStore.js";
  import "@/assets/sass/app.scss"; /* IFR */
  import appLayout from "./layouts/appLayout.vue";
  
  useMeta({ title: "TECDMX - Tablero de control de Firmas Electrónicas." });

  const appLiveStore = useLiveStore();
  const layout = computed(() => {
    return appLiveStore.state.layout;
  })

  console.log('layout: [' + layout  + ']') 
  //------------
  const app = appLayout
</script>
<script>
// layouts
/*
export default {
  components: {
    app: appLayout,
  },
};*/
</script>

<template>
    <div :class="[appLiveStore.state.layout_style, appLiveStore.state.menu_style]">
        <component v-bind:is="app"></component>
    </div>
</template>
