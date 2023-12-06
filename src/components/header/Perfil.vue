<script setup>
import IconFeatherUser from '../icons/IconFeatherUser.vue';
import IconFeatherInbox from '../icons/IconFeatherInbox.vue';
import IconFeatherLogout from '../icons/IconFeatherLogout.vue';
import IconFeatherLock from '../icons/IconFeatherLock.vue'
import IconFeatherSettings from '../icons/IconFeatherSettings.vue';
import { useAuthStore } from '../../stores/authStore.js';

const authStore = useAuthStore();
</script>
<template>
            <div class="dropdown nav-item user-profile-dropdown btn-group">
          <a
            href="javascript:;"
            id="ddluser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="btn dropdown-toggle btn-icon-only user nav-link"
          >
            <img src="@/assets/images/tecdmx/profile_90x90.png" alt="avatar" />
          </a>
          <ul
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="ddluser"
          >
            <li role="presentation">
              <router-link to="/account/perfil" class="dropdown-item">
                <IconFeatherUser></IconFeatherUser>
                Perfil
              </router-link>
            </li>
            <li role="presentation">
              <router-link to="/account/cambiar_contrasena" class="dropdown-item">
                <IconFeatherLock></IconFeatherLock>
                Cambio de contrase&ntilde;a
              </router-link>
            </li>
            <li role="presentation">
              <router-link to="#" class="dropdown-item">
                <IconFeatherSettings></IconFeatherSettings>
                Configuraci&oacute;n
              </router-link>
            </li>
            <li role="presentation">
              <router-link to="#" class="dropdown-item" @click="authStore.logoutUser()">
                <IconFeatherLogout></IconFeatherLogout>
                Salir
              </router-link>
            </li>
          </ul>
        </div>
</template>