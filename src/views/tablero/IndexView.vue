<script setup>
    import WidgetSimpleKpi from '@/components/wrapper/WidgetSimpleKpi.vue'
    import TableroFirmas from './documentos/TableroFirmas.vue';
    import { useMeta } from '@/composables/use-meta';
</script>
<template>
    <div class="layout-px-spacing todo-list">
        <div class="row layout-top-spacing">
            <WidgetSimpleKpi  cantidad="41" mensaje="En proceso de Firma" />
            <WidgetSimpleKpi  cantidad="35" mensaje="Enviados a firmar" />
            <WidgetSimpleKpi  cantidad="35" mensaje="Devueltos" />
            <WidgetSimpleKpi  cantidad="25" mensaje="Firmados" />
            <!-- IFR Agregado-->
        </div>
        <!------------------------------------- Interfaz Notas-->
       <!-- Fin app notas -->
       <div class="row mb-2">
            <div class="col-md-12">
                <h3>Tablero de firmas electrónicas</h3>
            </div>
        </div>
        <div>
            <TableroFirmas></TableroFirmas>
        </div>
    </div>
</template>