<script setup>
import WidgetSimpleKpi  from '@/components/wrapper/WidgetSimpleKpi.vue'
import TableroLayoutFirmas    from './documentos/TableroLayoutFirmas.vue';
import { useMeta }      from '@/composables/use-meta';
import IconDropDown from '../../components/icons/IconDropDown.vue';
//Stores
import { useCatalogoStore } from "@/stores/catalogoStore";
import { useAuthStore } from '../../stores/authStore.js'
import { onMounted, ref } from 'vue';

    useMeta({ title: "TECDMX - Firmas Electrónicas." });

    const authStore = useAuthStore();
    const catalogoStore = useCatalogoStore();
    const token = authStore.state.user.token;
    const userDocuments = ref(null);
    const listaDocs = ref([]);
    const urlUserDocs = import.meta.env.VITE_API_PKIURL + import.meta.env.VITE_CAT_DOCUMENTOS;
    const etapa = ref('');
    let creado = 0;
    let rechazado = 0;
    let enFirma = 0;
    let enviado = 0;
    let terminado = 0;

    async function obtenerDocumentos(url) {
        return await catalogoStore.getDocumentsUser(url, token);
    }

const bind_task_list = async () => {
  userDocuments.value = await obtenerDocumentos(urlUserDocs);
  listaDocs.value = userDocuments.value.data;
};

onMounted(() => {
    bind_task_list();
});

const contarPorEtapa = (etapaDeseada) => {
  const listaDocsRef = ref(listaDocs.value);
  const documentosFiltrados = listaDocsRef.value.filter(documento => documento.etapa === etapaDeseada);
  const cantidadDocumentos = ref(documentosFiltrados.length);
  return cantidadDocumentos;
};

const activarFiltrado = ref("");

const clicWidget = (etapa) => {
  //console.log(`Se activó la etapa: ${etapa}`);
  activarFiltrado.value = etapa;
};

</script>
<template>
    <div class="row mb-2 mt-3 ms-2">
      <div class="col-md-10">
          <h3 class="mt-3">Tablero de firmas electrónicas</h3>
      </div>
      
      <p class="d-inline-flex gap-1 col-md-2 mt-3">
        <a class="" data-bs-toggle="collapse" href="#collapseWidget" role="button" aria-expanded="false" aria-controls="collapseWidget">
            Indicadores <IconDropDown />
        </a>
        </p>
  </div>
    <div class="layout-px-spacing todo-list"> 
        <!------------------------------------------- Widgets -->
        <div class="row layout-top-spacing collapse no-gutters justify-content-center" id="collapseWidget">
          <div class="col-12 col-xxl-10">
            <div class="row">
              <WidgetSimpleKpi  :cantidad="contarPorEtapa('Creado').value" mensaje="Creado" color="#0a2241" etapa="Creado" @activaEtapa="clicWidget"/>
              <WidgetSimpleKpi  :cantidad="contarPorEtapa('Enviado').value" mensaje="Enviados a firmar" color="#194891" etapa="Enviado" @activaEtapa="clicWidget"/>
              <WidgetSimpleKpi  :cantidad="contarPorEtapa('En Firma').value" mensaje="Firmados" color="#759090" etapa="En Firma" @activaEtapa="clicWidget"/>
              <WidgetSimpleKpi  :cantidad="contarPorEtapa('Rechazado').value" mensaje="Rechazados" color="#e7515a" etapa="Rechazado" @activaEtapa="clicWidget"/>
              <!-- <WidgetSimpleKpi  :cantidad="terminado" mensaje="terminado" color="rechazado"/> -->
              <WidgetSimpleKpi  :cantidad="contarPorEtapa('Atencion').value" mensaje="Atención" color="#e7515a" etapa="" @activaEtapa="clicWidget"/>
              <WidgetSimpleKpi  :cantidad="contarPorEtapa('Conocimiento').value" mensaje="Conocimiento" color="#197293" etapa="" @activaEtapa="clicWidget"/>
            </div>
          </div>
        </div>
        <!------------------------------------- Interfaz Firmas-->
        <TableroLayoutFirmas :activarFiltro="activarFiltrado"></TableroLayoutFirmas>
    </div>
</template>
<style>
.btn-size{
    padding: 10px 10px;
}
</style>