<script setup>
  import { useLiveStore } from "@/stores/appLiveStore.js";
  import IconHamburger    from '@/components/icons/IconHamburger.vue'
  import BrandLogo        from '@/components/header/BrandLogo.vue'
  import Buscar           from '@/components/header/Buscar.vue'
 
  const appLiveStore = useLiveStore();
</script>
<template>
  <!-- BARRA DE NAVEGACIÓN-->
  <div class="header-container fixed-top">
    <header class="header navbar navbar-expand-sm">
      <!-- Logotipo institucional. -->
      <BrandLogo />
      <!-- ./Logotipo institucional. -->
   
    </header>
  </div>
</template>
