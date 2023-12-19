<script setup>
    import { onMounted, ref } from 'vue';
    import { defineProps, defineEmits } from 'vue';

    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    const props= defineProps({
        label: String,
        date: String,
        obligatorio: Boolean
    });

    const emit = defineEmits(['dateSelected']);
    let dias = 0;

    if(props.dias > 0){
        dias = props.dias;
    }
    // console.log("date");
    // console.log(props.date);

    const config = ref({
        // enableTime: true,
        // dateFormat: 'Y-m-d H:i:S',
        allowInput: true,
    })

    const selected = ref();

    onMounted(()=>{
        selected.value = props.date;
        //console.log(selected);
    });

    const is_submit_form3 = ref(false);
    
    const submit_form3 = () => {
        is_submit_form3.value = true;
    };

</script>
<template>
    <div class="row">
        <div class="form-group mb-1">
            <label class="mb-0">{{ label }}</label>
            <flat-pickr v-model="selected"
                    class="form-control form-control-sm flatpickr active"
                    placeholder="Seleccionar"
                    :class="[props.obligatorio ? (is_submit_form3 ? (selected ? 'is-valid' : 'is-invalid') : ''): '']"
                    :config="config"
                    @change="submit_form3(); emit('dateSelected', selected, is_submit_form3)"
            ></flat-pickr>
        </div>
    </div>

</template>
<style>
</style>