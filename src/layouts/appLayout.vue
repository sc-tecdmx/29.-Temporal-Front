<script setup>
    import Header from "@/layouts/app/Header.vue";
    import Sidebar from "@/layouts/app/Sidebar.vue";
    import Footer from "@/layouts/app/Footer.vue";
    import { useLiveStore } from "@/stores/appLiveStore.js";

    import SidebarIcon from "./app/SidebarIcon.vue";

    const appLiveStore = useLiveStore();
</script>
<template>
  
  <div :class="[appLiveStore.state.layout_style, appLiveStore.state.menu_style]">
    <Header></Header>
    <div
      class="main-container"
      id="container"
      :class="[
        !appLiveStore.state.is_show_sidebar ? 'sidebar-closed sbar-open' : '',
        appLiveStore.state.menu_style === 'collapsible-vertical'
          ? 'collapsible-vertical-mobile'
          : '',
      ]"
    >
      <!--  BEGIN OVERLAY  -->
      <div
        class="overlay"
        :class="{ show: !appLiveStore.state.is_show_sidebar }"
        @click="appLiveStore.toggleSideBar( !appLiveStore.state.is_show_sidebar)"
      ></div>
      <div
        class="search-overlay"
        :class="{ show: appLiveStore.state.is_show_search }"
        @click="appLiveStore.toggleSearch(!appLiveStore.state.is_show_search)"
      ></div>
      <!-- END OVERLAY -->
        <Sidebar></Sidebar>
       <!-- <SidebarIcon></SidebarIcon> --> -->
        <div id="content" class="main-content">
          <RouterView />
          <Footer></Footer>
        </div>
    </div>
  </div>
</template>
