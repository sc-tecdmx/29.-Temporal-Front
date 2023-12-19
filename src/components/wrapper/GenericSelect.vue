<script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps([
    'items', 
    'keyField', 
    'valueField', 
    'labelField', 
    'value', 
    'idName', 
    'label', 
    'is_submit_form'
  ]);
//console.log("PROPS", props)
  const selectedValue = ref(props.value);
  const emit = defineEmits(['opcionSelect']);

  const options = props.items.map(item => {
    const option = {};
    option[props.valueField] = item[props.valueField];
    option[props.labelField] = item[props.labelField];
    // Manejar campos adicionales
    for (const key in item) {
      if (key !== props.valueField && key !== props.labelField) {
        option[key] = item[key];
      }
    }
  
    return option;
  });

  const is_submit_form3 = ref(false);
    const submit_form3 = () => {
        is_submit_form3.value = true;
    };
  </script>
  <template>
<div class="panel-body">
  <div class="row">
    <div class="col-md-12">
      <div id="select_menu" class="form-group form-group">
        <label :for="props.idName"
                class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
        <select v-model="selectedValue" 
              class="form-select form-select-sm"
              :class="[is_submit_form3 ? (selectedValue ? 'is-valid' : 'is-invalid') : '']"
              :id="idName"
              @change="submit_form3(); emit('opcionSelect', selectedValue)">
          <option value="">-- Seleccionar --</option>
          <option v-for="option in options" :key="option[props.valueField]" :value="option[props.valueField]">
            {{ option[props.labelField] }}
          </option>
        </select>
        <!-- <div class="valid-feedback">Validado</div> -->
        <div class="invalid-feedback">Selecciona una opción</div>
      </div>
    </div>
  </div>
</div>
  </template>
  