<script setup>
  import { useLiveStore } from "@/stores/appLiveStore.js";
  import IconHamburger    from '@/components/icons/IconHamburger.vue'
  import BrandLogo        from '@/components/header/BrandLogo.vue'
  import Buscar           from '@/components/header/Buscar.vue'
  import Comentarios      from '@/components/header/Comentarios.vue'
  import Notificaciones   from '@/components/header/Notificaciones.vue'
  import Perfil           from '@/components/header/Perfil.vue'
  
  const appLiveStore = useLiveStore();
</script>
<template>
  <!-- BARRA DE NAVEGACIÓN-->
  <div class="header-container fixed-top">
    <header class="header navbar navbar-expand-sm">
      <!-- Logotipo institucional. -->
      <BrandLogo />
      <!-- ./Logotipo institucional. -->

      <!-- Hamburger -->
      <!-- <ul class="navbar-item flex-row ms-md-4 ms-auto">-->
        <!-- Logotipo institucional. -->
        <!--<li class="nav-item theme-logo">
            <a
              href="javascript:void(0);"
              class="sidebarCollapse"
              data-placement="bottom"
              @click="appLiveStore.toggleSideBar( !appLiveStore.state.is_show_sidebar)"
            >
              <IconHamburger/>
            </a>
        </li>
      </ul> -->
      <!-- ./Hamburger-->

     <!-- Buscar -->
      <Buscar/>
      <!-- ./Buscar -->

      <!-- Herramientas encabezado -->
      <div class="navbar-item flex-row ms-md-auto">
        <!-- Cortina comentarios -->
       <!-- <Comentarios /> -->
        <!-- ./Comentarios -->
        <!-- Notificaciones -->
        <Notificaciones 
          url="http://localhost/j/notificaciones.php"
        />
        <!-- ./Notificaciones-->
        <!-- Profile-->
        <Perfil />
        <!-- ./Profile-->
      </div>
    </header>
  </div>
</template>
