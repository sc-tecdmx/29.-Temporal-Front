<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue'
    import '@/assets/sass/scrollspyNav.scss';
    import axios from 'axios';

    const props= defineProps({
         idName: String,
         label: String,
         placeholder: String,
         disabled: Boolean
     });
     const token = "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2OTk4MDk5MTksImlzcyI6Imh0dHBzOi8vd3d3LnRlY2RteC5vcmcubXgvIiwic3ViIjoicGFvbGEubW9udGVyb0B0ZWNkbXgub3JnLm14IiwiZXhwIjoxNzAwNjczOTE5fQ.Q5t9yP2BR0RiTe7nStW0ocNcA4xprZkdeBThzD8dnoNvPph10G_y_x6-gzRpyjRmt6q21UkZqFGXkL7tDDp_vg"
    const urlBase = "http://127.0.0.1:8083"
    const emit = defineEmits(['inputData'])

    const selected = ref('');
    const des_selected = ref('');
    
    //const form1 = ref({ name: '' });
    const is_submit_form1 = ref(false);

    const submit_form1 = () => {
        is_submit_form1.value = true;
        // if (form1.value.name) {
        //     //form validated success
        //     //showMessage('Form submitted successfully.');
        // }
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };
    const catExpedientes = ref([]);
    const getExpediente = async (num_exp) => {
              const url_exp = urlBase + "/api/autocompletado?query=" + num_exp;
              try {
                  const { data } = await axios.get(url_exp, {headers:{"Authorization": `Bearer ${token}`}});
                //   console.log("data");
                //   console.log(data);
                  catExpedientes.value = data;
              } catch (error) {
                  console.log(error);
              }
          };
</script>
<template>
        <div class="row">
            <div class="col-md-12 form-group">
                <label :for="idName" class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
                <input class="form-control form-control-sm" 
                        v-model="selected" 
                        list="opcionExp" 
                        @input="getExpediente(selected)"
                        :id="idName"
                        :class="[is_submit_form1 ? (selected ? 'is-valid' : 'is-invalid') : '']"
                        :placeholder=" placeholder "
                        @change="submit_form1(); emit('inputData', selected, is_submit_form1)"
                >
                <datalist id="opcionExp">
                    <option v-for="opcion in catExpedientes" :value="opcion.s_num_expediente"></option>
                </datalist>
                <div class="invalid-feedback">Ingrese texto</div>
            </div>
        </div>
</template>


