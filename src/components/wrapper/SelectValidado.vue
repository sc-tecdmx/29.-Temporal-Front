<script setup>
import { ref } from 'vue';
import '@/assets/sass/scrollspyNav.scss';

// import { useMeta } from '@/composables/use-meta';
// useMeta({ title: 'Form Validation' });
//composable
import { useGetData } from "@/composables/getData";

    const {data, getData, loading, errorData} = useGetData();

    const props= defineProps({
        idName: String,
        label: String,
        is_submit_form: Boolean,
        url: String
    });

    const emit = defineEmits(['opcionSelect']);

    const selected = ref('');

    getData(props.url);
    
    //const form3 = ref({ select: '' });
    const is_submit_form3 = ref(false);
    const submit_form3 = () => {
        is_submit_form3.value = true;
        // if (form3.value.select) {
        //     //form validated success
        //     //showMessage('Form submitted successfully.');
        // }
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };
</script>

<template>
<div class="panel-body">
    <!-- <form class="select" novalidate @submit.stop.prevent="submit_form3"> -->
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
                         <option v-for="opcion in data" :value="opcion.id">{{ opcion.label }}</option> 
                        <!-- <option v-for="(value,key) in data" :value="key">{{ key }} : {{ value }} </option> -->
                    </select>
                    <!-- <div class="valid-feedback">Validado</div> -->
                    <div class="invalid-feedback">Selecciona una opción</div>
                </div>
            </div>
        </div>
        <!-- <button class="btn btn-primary mt-2" type="submit">Submit form</button>
    </form> -->
</div>
</template>
<style>

</style>