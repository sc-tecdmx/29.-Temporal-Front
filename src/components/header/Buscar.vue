<script setup>
  import { useLiveStore } from "@/stores/appLiveStore.js";
  import IconBuscar       from '@/components/icons/IconBuscar.vue'
  import { ref } from "vue";
  import { useAuthStore } from "@/stores/authStore.js";
  import axios from "axios";

  const appLiveStore = useLiveStore();
  const authStore = useAuthStore();

  const busqueda = ref('');
  const token = authStore.state.user.token;

  const busquedaGeneral = async(token, busqueda) => {
    let urlRestPass = import.meta.env.VITE_API_LARURL + "/api/busqueda-general?query=" + busqueda;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
        const response = await axios.get(urlRestPass, config);
        console.log(response.data);
        //alert(response.data.message);
          
      } catch (error) {
          //alert('Error en la busqueda')
          console.log('Error en busqueda:',error)
      }
    }
</script>
<template>
    <ul class="navbar-item flex-row ms-md-0 ms-3"> <!--PAO-->
        <li class="nav-item align-self-center search-animated" :class="{ 'show-search': appLiveStore.state.is_show_search }">
          <form class="form-inline search-full form-inline search" :class="{ 'input-focused': appLiveStore.state.is_show_search }">
          <div class="search-bar">
              <input
                type="text"
                class="form-control search-form-control ms-lg-auto"
                placeholder="Buscar..."
                v-model="busqueda"
                @change="busquedaGeneral(token, busqueda)"
              />
            </div>
          </form>
          <IconBuscar />
        </li>
      </ul>
</template>