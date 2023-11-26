<script setup>
import { ref } from 'vue';

const props= defineProps({
         idName: String,
         label: String,
         placeholder: String,
         mask: String,
         disabled: Boolean,
         type: String,
         pattern: String
     });
const selected = ref("");
const emit = defineEmits(['inputData']);
const is_submit = ref(false);
const tipo = ref("");
const REGEX_Email = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const REGEX_CURP = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
const REGEX_RFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

if(props.type == "curp" || props.type == "rfc"){
    tipo.value = "text";
}else{
    tipo.value = props.type;
}
const submit_form1 = () => {
    
     switch(props.type){
         case 'email':
            if(REGEX_Email.test(selected.value)){
                is_submit.value = true;
            }else{
                is_submit.value = false;
                alert("Ingresar un correo válido");
            }
            return is_submit.value;
            break;
         case 'tel':
            if (/^\d{10}$/.test(selected.value)){
                is_submit.value = true;
            }else{
                is_submit.value = false;
                alert("Ingresa un número de 10 dígitos");
            }
            return is_submit.value;
            break;
         case 'curp':
            var element = document.getElementById(props.idName);
            element.classList.add("text-uppercase");
            selected.value = selected.value.toUpperCase();
            if(REGEX_CURP.test(selected.value)){
                is_submit.value = true;
            }else{
                is_submit.value = false;
                alert("Ingresar CURP válido");
            }
            return is_submit.value;
            break;
         case 'rfc':
            var element = document.getElementById(props.idName);
            element.classList.add("text-uppercase");
            selected.value = selected.value.toUpperCase();
            if(REGEX_RFC.test(selected.value)){
                is_submit.value = true;
            }else{
                is_submit.value = false;
                alert("Ingresar RFC válido");
            }
            return is_submit.value;
            break;
         default:
             alert("Tipo de input inválido")
     }
};
</script>
<template>
    <div class="form-group">
        <label :for="props.idName" class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ props.label }}</label>
        <input :type="tipo" 
            :name="props.type"
            v-model="selected" 
            :id="props.idName"
            class="form-control form-control-sm"
            :class="[is_submit ? (selected ? 'is-valid' : 'is-invalid') : '']"
            :placeholder="props.placeholder"
            :pattern="props.pattern"
            size="30"
            @change="submit_form1(); emit('inputData', selected, is_submit)"
            required
        >
    </div>
</template>
<style>

</style>