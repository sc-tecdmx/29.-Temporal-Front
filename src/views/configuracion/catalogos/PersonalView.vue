<script setup>

import { ref, onMounted } from "vue";
import TablaDatos from "../../../components/wrapper/TablaDatos.vue";



const thPersonal= ref(['numero_empleado','nombre','ap_paterno', 'ap_materno', 'curp', 'fecha_ingreso', 'fecha salida', 'nombramiento', 'unidad_adscripcion', 'plaza', 'correo_institucional', 'correo_alternativo', 'extension', 'imagen']);

onMounted(() => {
    
});
</script>
<template>
    <div class="row no-gutters justify-content-center me-2">
        <div class="col-12 col-xxl-10">
            <h3 class="mt-4">Catalogo Personal</h3>

            <TablaDatos
                title="Catálogo Personal"
                url = "http://localhost/j/personal.php"
                :thtabla = thPersonal
            ></TablaDatos> 
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>