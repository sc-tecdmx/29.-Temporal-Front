<script setup>
import { ref } from 'vue';

const props= defineProps({
         idName: String,
         label: String,
         placeholder: String,
         mask: String,
         disabled: Boolean
     });
const emit = defineEmits(['inputData']);
const is_submit = ref(false);
const selected = ref('');

const submit_form1 = () => {

    if (/^\d{10}$/.test(selected.value)){
        is_submit.value = true;
        return is_submit.value;
    }else{
        alert("Ingresa un número de 10 dígitos");
        is_submit.value = false;
        return is_submit.value;
    }
};
</script>
<template>
    <div class="form-group">
        <label class="col-sm-12 col-form-label col-form-label-sm pb-0" :for="props.idName">{{ props.label }}</label>
        <input type="text" 
                v-model="selected" 
                :id="props.idName"   
                class="form-control form-control-sm"
                :class="[is_submit ? (selected ? 'is-valid' : 'is-invalid') : '']"
                v-maska="props.mask" 
                :placeholder="props.placeholder"
                :disabled="props.disabled"
                @change="submit_form1(); emit('inputData', selected, is_submit)"
        />
        <!-- <div class="valid-feedback">Validado</div> -->
        <div class="invalid-feedback">Ingrese texto</div>
    </div>
</template>
