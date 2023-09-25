<script setup>
  import PublicHeader from "@/layouts/public/PublicHeader.vue";
  import PublicSidebar from "@/layouts/public/PublicSidebar.vue";
  import PublicFooter from "@/layouts/public/PublicFooter.vue";
  import { useLiveStore } from "@/stores/appLiveStore.js";
  // TODO. Reconocer si ya se inició sesión
</script>
<template>
  <PublicHeader></PublicHeader>
    <router-view></router-view>
  <PublicFooter></PublicFooter>
</template>
