<script setup>
  import { computed } from "vue";
  import { useLiveStore } from "@/stores/appLiveStore.js";

  import "@/assets/sass/app.scss"; /* IFR */
  import { useMeta } from "@/composables/use-meta.js";

  useMeta({ title: "TECDMX - Tablero de control de Firmas Electrónicas." });

  const appLiveStore = useLiveStore();
  const layout = computed(() => {
    return appLiveStore.state.layout;
  });
</script>
<script>
// layouts
import appLayout from "./layouts/appLayout.vue";
export default {
  components: {
    app: appLayout,
  },
};
</script>

<template>
    <div :class="[appLiveStore.state.layout_style, appLiveStore.state.menu_style]">
        <component v-bind:is="layout"></component>
    </div>
</template>
