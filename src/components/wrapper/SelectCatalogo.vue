<script setup>
import { ref } from 'vue';
//composable
import { useGetData } from "@/composables/getData";

    const {data, getData, loading, errorData} = useGetData();

    const props= defineProps({
        idName: String,
        label: String,
        url: String
    });

    const emit = defineEmits(['opcionSelect']);

    const selected = ref('0');

    getData(props.url);
    

    
    

</script>
<template>
    <div class="form-group row invoice-created-by">
        <div class="col-sm-12">
            <label :for="idName"
            class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
            <select v-model="selected"
                    class="form-select form-select-sm"
                    :id="idName"
                    @change="emit('opcionSelect', selected)"
                    >
                    <option value="0">--Seleccionar--</option>
                    <option v-for="opcion in data" :value="opcion.id">{{ opcion.label }}</option>
            </select>
        </div>
    </div>
</template>
<style>
    
</style>