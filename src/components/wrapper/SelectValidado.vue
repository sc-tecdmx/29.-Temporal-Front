<script setup>
import { ref } from 'vue';
//import { defineProps } from 'vue';
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
    const catalogo = ref({});

    catalogo.value = props.opciones;
    //console.log("PROPS: ", props.opciones);

    // getData(props.url);

    const is_submit_form3 = ref(false);
    const submit_form3 = () => {
        is_submit_form3.value = true;
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };

const arrayOpciones = ref([]);

// class mapOpciones{
//     constructor(id,label){
//         this.id = id;
//         this.label = label;
//     }
// }

for (let i = 0; i < catalogo.value.length; i++) {
    let id ='';
    let label ='';
    Object.entries(catalogo.value[i]).map(entry =>{
            const [key, value] = entry
            //console.log({key, value})
            //console.log(key.includes("id"))
            
            if(key.includes("id")){
                //console.log(key)
                 id = value;
            }else{
                label = value;
            }
            
        })
        //let objeto= new mapOpciones(id,label);
        let objeto= {
            id: id,
            label: label
        };
        //   console.log("mapOpciones --- ")
        //   console.log( objeto)
          arrayOpciones.value.push(objeto);
            // console.log("arrayOpciones");     
            // console.log(arrayOpciones);     
}
   
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
                         <option v-for="opcion in arrayOpciones" :value="opcion.label">{{ opcion.label }}</option> 
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