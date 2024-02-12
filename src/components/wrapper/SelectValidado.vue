<script setup>
import { onMounted, ref } from 'vue';
//import { defineProps } from 'vue';
import '@/assets/sass/scrollspyNav.scss';

//composable
import { useGetData } from "@/composables/getData";
const {data, getData, loading, errorData} = useGetData();

    const props= defineProps({
        idName: String,
        label: String,
        is_submit_form: Boolean,
        opciones: Object,
        valorInicial: String
    });
    const emit = defineEmits(['opcionSelect']);

    const selected = ref('');
    const catalogo = ref({});
    catalogo.value = props.opciones;
    const is_submit_form3 = ref(false);
    const submit_form3 = () => {
        is_submit_form3.value = true;
    };
    const arrayOpciones = ref([]);

for (let i = 0; i < catalogo.value.length; i++) {
    let id ='';
    let label ='';
    Object.entries(catalogo.value[i]).map(entry =>{
            const [key, value] = entry
            if(key.includes("id")){
                 id = value;
            }else{
                label = value;
            }
        })
        let objeto= {
            id: id,
            label: label
        };
          arrayOpciones.value.push(objeto);   
}

onMounted(() => {
     if(props.valorInicial != null){
         //console.log("VALOR", props.valorInicial)

         for (let i = 0; i < catalogo.value.length; i++) {
             let id ='';
             let label ='';
             Object.entries(catalogo.value[i]).map(entry =>{
                     const [key, value] = entry
                     //console.log("ENTRY",entry)
                     if(value == props.valorInicial){
                         selected.value= {
                             id: key,
                             label: value
                         };
                         //console.log("Selected",selected.value)
                         return selected;
                     }
                 }) 
         }
     }
});
   
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
                         <!-- <option v-for="opcion in arrayOpciones" :value="opcion.id">{{ opcion.label }}</option>  -->
                         <option v-for="opcion in arrayOpciones" :value="opcion">{{ opcion.label }}</option> 
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