<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue';

    const props= defineProps({
        idName: String,
        label: String,
        placeholder: String,
    });

    const emit = defineEmits(['txtArea']);

    const selected = ref('');

    const is_submit_form1 = ref(false);
    const submit_form1 = () => {
        is_submit_form1.value = true;
    };
</script>
<template>
    <div class="row">
        <div class="col-md-12 align-self-center">
            <div class="form-group row invoice-note">
                <label for="invoice-detail-notes" class="col-sm-12 col-form-label col-form-label-sm">{{ label }}</label>
                <div class="col-sm-12">
                    <textarea v-model="selected" 
                            rows="3" 
                            :id="idName"
                            class="form-control form-control-sm"
                            :class="[is_submit_form1 ? (selected ? 'is-valid' : 'is-invalid') : '']" 
                            :placeholder="placeholder"
                            @change="submit_form1(); emit('txtArea', selected, is_submit_form1)"
                    ></textarea>
                    <!-- <div class="valid-feedback">Validado</div> -->
                    <div class="invalid-feedback">Ingrese texto</div>
                </div>
            </div>
        </div>
    </div>
</template>