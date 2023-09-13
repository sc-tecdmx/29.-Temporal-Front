<script setup>
    import { ref } from 'vue';

    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

    const selected_tax_type = ref({ key: 'None', value: null });

    const params = ref({
        input_date: '',
    });
</script>
<template>
    <div class="invoice-action-tax">
        <h5>Fecha límite de firma</h5>
        <div class="invoice-action-tax-fields">
            <div class="row">
                <div class="col-6">
                    <div class="col-md-12">
                        <div class="form-group mb-4">
                            <flat-pickr v-model="params.input_date"
                                        class="form-control form-control-sm flatpickr active"
                                        placeholder="Seleccionar"></flat-pickr>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div v-if="selected_tax_type.value !== null" class="form-group mb-0 tax-rate-deducted">
                        <label for="rate">Rate (%)</label>
                        <input v-model="selected_tax_type.value" type="number" min="0" max="100"
                                class="input-rate form-control" placeholder="Rate" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>