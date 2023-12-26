<script setup>
    import { ref, watch } from 'vue';
    import { defineProps, defineEmits } from 'vue'
    import '@/assets/sass/scrollspyNav.scss';
    import axios from 'axios';
    import { useAuthStore } from '@/stores/authStore.js';
    const authStore = useAuthStore();
    const token = authStore.state.user.token;

    const envApp = import.meta.env.VITE_ENV_APP;

  function getAuthorizationHeadersForLaravel(token) {
  if(envApp=='prod'){
    return {
      headers: {
        "bearertoken": `${token}`
      }
    };
  }else{
    return {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };
  }
}

    const props= defineProps({
         idName: String,
         label: String,
         value: String,
         placeholder: String,
         disabled: Boolean
     });
    const emit = defineEmits(['inputData'])
    const selected = ref('');

    watch(() => props.value, async (nuevoValue) => {
      await limpiarInput(nuevoValue);
    });
    const limpiarInput = async (valor = props.value) => {
      selected.value = valor;
    };

    const is_submit_form1 = ref(false);

    const submit_form1 = () => {
        is_submit_form1.value = true;
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };
    const catExpedientes = ref([]);
    const getExpediente = async (num_exp) => {
              const url_exp = import.meta.env.VITE_API_LARURL + "/api/autocompletado?query=" + num_exp;
              try {
                  const { data } = await axios.get(url_exp, getAuthorizationHeadersForLaravel(token));
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


