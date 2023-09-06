<script setup>
    import WidgetSimpleKpi  from '@/components/wrapper/WidgetSimpleKpi.vue'
    import TableroLayoutFirmas    from './documentos/TableroLayoutFirmas.vue';
    import { useMeta }      from '@/composables/use-meta';
    useMeta({ title: "TECDMX - Firmas Electrónicas." });

</script>
<template>
    <div class="layout-px-spacing todo-list">
        <!------------------------------------------- Widgets -->
        <div class="row layout-top-spacing">
            <WidgetSimpleKpi  cantidad="41" mensaje="En proceso de Firma" />
            <WidgetSimpleKpi  cantidad="35" mensaje="Enviados a firmar" />
            <WidgetSimpleKpi  cantidad="35" mensaje="Devueltos" />
            <WidgetSimpleKpi  cantidad="25" mensaje="Firmados" />
        </div>
        <!------------------------------------- Interfaz Firmas-->
        <TableroLayoutFirmas></TableroLayoutFirmas>
    </div>
</template>