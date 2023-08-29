<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useAppStore } from '@/stores/appconfig.js'

import '@/assets/sass/app.scss';   /* IFR */
import { useMeta } from '@/composables/use-meta.js';


import HelloWorld from './components/HelloWorld.vue'

useMeta({ title: 'TECDMX - Tablero de control de Firmas Electrónicas.' });

const appStore = useAppStore();
const layout = computed(() => {
        return appStore.state.layout;
    });
</script>

<template>
  <header>
   <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>