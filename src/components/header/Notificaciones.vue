<script setup>
//Composable
import { useGetData } from "@/composables/getData";
//Iconos
import IconBell from '@/components/icons/IconBell.vue'
import IconFeatherX from '../icons/IconFeatherX.vue';
import IconFeatherFileText from '../icons/IconFeatherFileText.vue';
import IconFeatherCheck from '../icons/IconFeatherCheck.vue';

const {data, getData, loading, errorData} = useGetData();
const props= defineProps({
         url: String
     });
getData(props.url);

</script>
<template>
    <div class="dropdown nav-item notification-dropdown btn-group">
          <a
            href="javascript:;"
            id="ddlnotify"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="btn dropdown-toggle btn-icon-only nav-link"
          >
            <IconBell />
            <span class="badge badge-success"></span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="ddlnotify"
          >
          <div v-for="notificacion in data">
            <li role="presentation" >
              <a href="javascript:;" class="dropdown-item">
                <div class="media" :class="notificacion.icon_tipo_notif">
                  <div class="media-aside align-self-start">
                    <IconFeatherFileText></IconFeatherFileText>
                  </div>
                  <div class="media-body">
                    <div class="data-info">
                      <h6>{{ notificacion.message }}</h6>
                    </div>
                    <!-- <div class="icon-status">
                      <IconFeatherX></IconFeatherX>
                      <IconFeatherCheck></IconFeatherCheck>
                    </div> -->
                  </div></div
              ></a>
            </li>
            <li role="presentation">
              <hr
                role="separator"
                aria-orientation="horizontal"
                size="0"
                class="dropdown-divider"
              />
            </li>
          </div>
          
          </ul>
        </div>
</template>
<style>
.navbar .navbar-item .nav-item.dropdown.notification-dropdown .dropdown-menu .media.doc-rechazado svg {
    color: #e7515a;
    fill: rgba(231, 81, 90, 0.2392156863);
}

.navbar .navbar-item .nav-item.dropdown.notification-dropdown .dropdown-menu .media.doc-firma svg {
    color: #7b8c90;
    fill: rgba(123, 140, 144, 0.2392156863);
}

.navbar .navbar-item .nav-item.dropdown.notification-dropdown .dropdown-menu .media.doc-atencion svg {
    color: #7589ED;
    fill: rgba(117, 137, 237, 0.2392156863);
}
.navbar .navbar-item .nav-item.dropdown.notification-dropdown .dropdown-menu .icon-status svg.feather-check {
    color: #fff;
    background: #0d9a5d;
}
.navbar .navbar-item .nav-item.dropdown.notification-dropdown .dropdown-menu .icon-status svg.feather-x:hover {
    color: #e7515a;
}
.navbar .navbar-item .nav-item.dropdown.notification-dropdown .dropdown-menu .icon-status svg.feather-x {
    color: #bfc9d4;
}
</style>