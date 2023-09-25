<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue';

    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    const selected_tax_type = ref({ key: 'None', value: null });

    const props= defineProps({
        label: String,
        date: Date
    });

    const emit = defineEmits(['dateSelected']);

    const selected = ref('');
    // const params = ref({
    //     input_date: '',
    // });


</script>
<template>
    <div class="row">
        <div class="form-group mb-1">
            <label class="mb-0">{{ label }}</label>
            <!-- <flat-pickr v-model="params.input_date" -->
            <flat-pickr v-model="selected"
                        class="form-control form-control-sm flatpickr active"
                        placeholder="Seleccionar"
                        @change="emit('dateSelected', selected)"
            ></flat-pickr>
        </div>
        <div class="col-12">
            <div v-if="selected_tax_type.value !== null" class="form-group mb-0 tax-rate-deducted">
                <label for="rate">Rate (%)</label>
                    <input v-model="selected_tax_type.value" type="number" min="0" max="100"
                    class="input-rate form-control" placeholder="Rate" />
            </div>
        </div>
    </div>

</template>