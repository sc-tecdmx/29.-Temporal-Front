<script setup>
import { ref } from 'vue';
import '@/assets/sass/scrollspyNav.scss';

//composable
import { useGetData } from "@/composables/getData";

    const {data, getData, loading, errorData} = useGetData();

    const props= defineProps({
        idName: String,
        label: String,
        is_submit_form: Boolean,
        url: String,
        opciones: Object
    });

    const emit = defineEmits(['opcionSelect']);

    const selected = ref('');
    const catalogo = ref(null);

    catalogo.value = props.opciones;

    // getData(props.url);

    const is_submit_form3 = ref(false);
    const submit_form3 = () => {
        is_submit_form3.value = true;
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };

        console.log("props.opciones");
        console.log(catalogo.value);

    //    Object.entries(catalogo.value).map(entry =>{
    //        const [key, value] = entry
    //        console.log({key, value})
    //    })
</script>

<template>
<div class="panel-body">
        <div class="row">
            <div class="col-md-12">
                <div id="select_menu" class="form-group form-group">
                    <label :for="idName"
                        class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
                    <select v-model="selected" class="form-select form-select-sm" 
                        :class="[is_submit_form3 ? (selected ? 'is-valid' : 'is-invalid') : '']"
                        :id="idName"
                        @change="submit_form3(); emit('opcionSelect', selected, is_submit_form3)"
                    >
                        <option value="">-- Seleccionar --</option>
                         <!-- <option v-for="opcion in props.opciones" :value="opcion.id">{{ opcion.destino }}</option>  -->
                        <option v-for="(value,key) in props.opciones" :value="key">{{ value }} </option>
                    </select>
                    <!-- <div class="valid-feedback">Validado</div> -->
                    <div class="invalid-feedback">Selecciona una opción</div>
                </div>
            </div>
        </div>
</div>
</template>
<style>

</style>