<script setup>
 import { useLiveStore } from "@/stores/appLiveStore.js";
  import { useAuthStore } from "@/stores/appAuthStore.js";
    import router from '../router'
    //-- Enviar a home si ya está loggeado
    const authStore = useAuthStore()
    if (authStore.user){
        console.log('Loggeado')
        router.push('/')
    }
</script>
<template>
    <router-view></router-view>
</template>