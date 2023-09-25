<script setup>
  import { useLiveStore } from "@/stores/appLiveStore.js";
  import BrandLogo        from '@/components/header/BrandLogo.vue'
  const srcLogoA = "/src/assets/images/tecdmx/logo_tecdmx_inv.png"
  const classLogo= "theme-logo"
  const classBgLogo= "bg-white"
</script>
<template>
  <!-- BARRA DE NAVEGACIÓN-->
  <div class="container">
    <header class="header navbar navbar-expand-sm">
      <!-- Logotipo institucional. -->
      <BrandLogo 
        :srcLogo    = "srcLogoA"
        :classLogo  = "classLogo"
        :classBgLogo= "classBgLogo"
      />
      <!-- ./Logotipo institucional. -->
    </header>
  </div>
</template>
