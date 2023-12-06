<script setup>
import { onMounted, ref } from 'vue';
import { useLiveStore } from "@/stores/appLiveStore.js";
/* Iconos */
import IconFeatherSettings from '../../components/icons/IconFeatherSettings.vue';
import IconFeatherChevronRight from '../../components/icons/IconFeatherChevronRight.vue';
import IconFeatherHome from '../../components/icons/IconFeatherHome.vue';
import IconFeatherFileText from '../../components/icons/IconFeatherFileText.vue';
import IconList from '../../components/icons/IconList.vue';

const appLiveStore = useLiveStore();
const menu_collapse = ref('dashboard');
onMounted(() => {
        const selector = document.querySelector('#sidebar a[href="' + window.location.pathname + '"]');
        if (selector) {
            const ul = selector.closest('ul.collapse');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.dropdown-toggle');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            } else {
                selector.click();
            }
        }
    });

    const toggleMobileMenu = () => {
        if (window.innerWidth < 991) {
            appLiveStore.toggleSideBar(!appLiveStore.state.is_show_sidebar); 
        }
    };

</script>
<template>
        <!--  BEGIN SIDEBAR  -->
        <div class="sidebar-wrapper sidebar-theme">
        <nav ref="menu" id="sidebar">
            <div class="shadow-bottom"></div>

            <perfect-scrollbar class="list-unstyled menu-categories" tag="ul" :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
                <li class="menu">
                    <a class="dropdown-toggle" aria-controls="dashboard" aria-expanded="false">
                        <div class="">
                            <IconFeatherHome class="d-inline"></IconFeatherHome>
                            <router-link to="/" @click="toggleMobileMenu" class="menu_tab d-inline">Inicio</router-link>
                        </div>
                    </a>
                </li>

                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#apps" aria-controls="apps" aria-expanded="false">
                        <div class="">
                            <IconFeatherFileText></IconFeatherFileText>
                            <span>Documentos</span>
                        </div>
                        <div>
                            <IconFeatherChevronRight></IconFeatherChevronRight>
                        </div>
                    </a>
                    <ul id="apps" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li>
                            <router-link to="/documento/nuevo" @click="toggleMobileMenu">Nuevo</router-link>
                        </li>
                    </ul>
                </li>
                <li class="menu">
                    <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#configuracion" aria-controls="apps" aria-expanded="false">
                        <div class="">
                            <IconFeatherSettings></IconFeatherSettings>
                            <span>Configuraci&oacute;n</span>
                        </div>
                        <div>
                            <IconFeatherChevronRight></IconFeatherChevronRight>
                        </div>
                    </a>
                    <ul id="configuracion" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
                        <li>
                            <router-link to="/config/adminRolPersonaApp" @click="toggleMobileMenu">Administraci&oacute;n Roles</router-link>
                        </li>
                        <li>
                            <router-link to="/config/catalogos" @click="toggleMobileMenu">Cat&aacute;logos</router-link>
                        </li>
                    </ul>
                </li>
            </perfect-scrollbar>
        </nav>
    </div>
    <!--  END SIDEBAR  -->
</template>
<style>
.menu_tab{
    color:#FFF;
    padding: 12px 16px;
    display: flex;
}
</style>