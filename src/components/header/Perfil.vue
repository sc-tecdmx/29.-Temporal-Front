<script setup>
import IconFeatherUser from '../icons/IconFeatherUser.vue';
import IconFeatherInbox from '../icons/IconFeatherInbox.vue';
import IconFeatherLogout from '../icons/IconFeatherLogout.vue';
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
              <router-link to="#" class="dropdown-item">
                <IconFeatherInbox></IconFeatherInbox>
                Mensajes
              </router-link>
            </li>
            <li role="presentation">
              <router-link to="#" class="dropdown-item">
                <IconFeatherLogout></IconFeatherLogout>
                Salir
              </router-link>
            </li>
          </ul>
        </div>
</template>