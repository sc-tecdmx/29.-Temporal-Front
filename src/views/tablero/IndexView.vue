<script setup>
    import WidgetSimpleKpi  from '@/components/wrapper/WidgetSimpleKpi.vue'
    import TableroLayoutFirmas    from './documentos/TableroLayoutFirmas.vue';
    import { useMeta }      from '@/composables/use-meta';
    import IconDropDown from '../../components/icons/IconDropDown.vue';

    import { useAuthStore } from '../../stores/authStore.js'
    useMeta({ title: "TECDMX - Firmas Electrónicas." });

    const authStore = useAuthStore();

</script>
<template>
    <div class="row mb-2 mt-3 ms-2">
      <div class="col-md-11">
          <h3 class="mt-3">Tablero de firmas electrónicas</h3>
      </div>

      <p class="d-inline-flex gap-1 col-md-1">
        <a class="" data-bs-toggle="collapse" href="#collapseWidget" role="button" aria-expanded="false" aria-controls="collapseWidget">
            <IconDropDown></IconDropDown>
        </a>
        </p>
  </div>
    <div class="layout-px-spacing todo-list">
        <!------------------------------------------- Widgets -->
        <div class="row layout-top-spacing collapse" id="collapseWidget">
            <WidgetSimpleKpi  cantidad="41" mensaje="En proceso de Firma" color="espera"/>
            <WidgetSimpleKpi  cantidad="35" mensaje="Enviados a firmar" color="enviado"/>
            <WidgetSimpleKpi  cantidad="35" mensaje="Devueltos" color="rechazado"/>
            <WidgetSimpleKpi  cantidad="25" mensaje="Firmados" color="firmado"/>
            <WidgetSimpleKpi  cantidad="5" mensaje="Atención" color="atencion"/>
            <WidgetSimpleKpi  cantidad="25" mensaje="Conocimiento" color="conocimiento"/>
        </div>
        <!------------------------------------- Interfaz Firmas-->
        <TableroLayoutFirmas></TableroLayoutFirmas>
    </div>
</template>