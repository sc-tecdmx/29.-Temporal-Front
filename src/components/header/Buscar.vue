<script setup>
    import { useLiveStore } from "@/stores/appLiveStore.js";
    import IconBuscar       from '@/components/icons/IconBuscar.vue'
    const appLiveStore = useLiveStore();
</script>
<template>
    <ul class="navbar-item flex-row ms-md-0 ms-3"> <!--PAO-->
        <li
          class="nav-item align-self-center search-animated"
          :class="{ 'show-search': appLiveStore.state.is_show_search }"
        >
          <form class="form-inline search-full form-inline search"
                :class="{ 'input-focused': appLiveStore.state.is_show_search }"
          > <div class="search-bar">
              <input
                type="text"
                class="form-control search-form-control ms-lg-auto"
                placeholder="Buscar..."
              />
            </div>
          </form>
          <IconBuscar />
        </li>
      </ul>
</template>