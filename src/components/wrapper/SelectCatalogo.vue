<script setup>
    import { ref } from 'vue';
    const props= defineProps({
        idName: String,
        label: String,
        options: [],
    });

    const params = ref({
        contenido: '',
    });
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
                    <option value="United States">Acuerdo de radicación</option>
                    <option value="United Kingdom">Acuerdo de recepción</option>
                    <option value="Canada">Acuerdo de turno</option>
                    <option value="Australia">Oficio</option>
                    <option value="Germany">Acuerdo plenario</option>
                    <option value="Sweden">Minuta</option>
            </select>
        </div>
    </div>
</template>
<style>
    
</style>