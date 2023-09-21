<script setup>
    import { ref } from 'vue';
    const props= defineProps({
        idName: String,
        label: String,
        options: ref([]),
    });

    const params = ref({
        contenido: '',
    });

    const catalogo = props.options;
</script>
<template>
    <div class="form-group row invoice-created-by">
        <div class="col-sm-12">
            <label :for="idName"
            class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
            <select v-model="params.contenido"
                    class="form-select form-select-sm"
                    :id="idName">
                    <option value="">--Seleccionar--</option>
                    <option v-for="opcion in catalogo" value="opcion">{{ opcion }}</option>
            </select>
        </div>
    </div>
</template>
<style>
    
</style>