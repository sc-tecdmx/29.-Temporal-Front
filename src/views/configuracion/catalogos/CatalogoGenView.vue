<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
//Componentes
import TablaCatalogoDesc from "@/components/wrapper/TablaCatalogoDesc.vue";
//Stores
import { useAuthStore } from "@/stores/authStore.js";
import { useCatalogoStore } from "@/stores/catalogoStore";
import router from "../../../router";

const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const token = authStore.state.user.token;
const route = useRoute();
const tipoCat = route.params.catalogo;
const titulo = "Catálogo " + route.params.catalogo.replace(/-(\w)/g, ' $1');;
const idTabla = "cat" + route.params.catalogo;
const catalogo = ref(null);
const catDisponible = ref(false);
const headers = ref([]);
const urlGetCat = ref("");
const urlSaveCat = ref("");
const urlEditCat = ref("");
const urlDelCat = ref("");

//console.log(tipoCat)

async function obtenerCatalogo(url) {
    return await catalogoStore.getCatalogo(url,token);
}
onMounted(async() => {
    try {
        switch(tipoCat) {
            case 'prioridad':
                headers.value = ["id", "prioridad", "acciones"];
                urlGetCat.value = import.meta.env.VITE_CAT_GET_PRIOR
                urlSaveCat.value = import.meta.env.VITE_CAT_ADD_PRIOR
                urlEditCat.value = import.meta.env.VITE_CAT_EDIT_PRIOR
                urlDelCat.value = import.meta.env.VITE_CAT_DEL_PRIOR
                break;
            case 'destino-de-documento':
                headers.value = ["id", "destino", "acciones"];
                urlGetCat.value = import.meta.env.VITE_CAT_GET_DEST
                urlSaveCat.value = import.meta.env.VITE_CAT_ADD_DEST
                urlEditCat.value = import.meta.env.VITE_CAT_EDIT_DEST
                urlDelCat.value = import.meta.env.VITE_CAT_DEL_DEST
                break;
            case 'etapa-documento':
                headers.value = ["id", "etapa", "acciones"];
                urlGetCat.value = import.meta.env.VITE_CAT_GET_ETAPADOC
                urlSaveCat.value = import.meta.env.VITE_CAT_ADD_ETAPADOC
                urlEditCat.value = import.meta.env.VITE_CAT_EDIT_ETAPADOC
                urlDelCat.value = import.meta.env.VITE_CAT_DEL_ETAPADOC
                break;
            case 'estado-usuario':
                headers.value = ["id", "descripcion", "acciones"];
                urlGetCat.value = import.meta.env.VITE_CAT_GET_ESTUSUARIO
                urlSaveCat.value = import.meta.env.VITE_CAT_ADD_ESTUSUARIO
                urlEditCat.value = import.meta.env.VITE_CAT_EDIT_ESTUSUARIO
                urlDelCat.value = import.meta.env.VITE_CAT_DEL_ESTUSUARIO
                break;
            default:
                if (confirm("No existe catálogo")) {
                    router.push('/config/catalogos');
                }
        }
        catalogo.value = await obtenerCatalogo(urlGetCat.value);
        catDisponible.value = true;
    } catch (error) {
        console.log(error)
    }
});


</script>
<template>
    <div class="layout-px-spacing apps-invoice-add">
    <div class="row invoice layout-top-spacing layout-spacing no-gutters justify-content-center">
      <div class="col-xxl-10 col-12">
        <div class="doc-container">
          <div class="row">
            <div class="col-lg-12">
              <div class="invoice-content">
                <div class="invoice-detail-body">
                    <div class="d-flex justify-content-center m-5" v-if="!catDisponible">
                        <div class="spinner-border text-primary" role="status" >
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                    <TablaCatalogoDesc
                        :titulo="titulo"
                        :id_tabla="idTabla"
                        :thtabla="headers"
                        :opCatalogo="catalogo"
                        :urlSave="urlSaveCat"
                        :urlEdit="urlEditCat"
                        :urlDelete="urlDelCat"
                        v-if="catDisponible"
                    ></TablaCatalogoDesc>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>