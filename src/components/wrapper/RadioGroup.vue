<script setup>
  import { ref } from 'vue';
  
  const props = defineProps([
    'options', 
    'valueField', 
    'labelField', 
    'value', 
    'label'
]);
  const selectedValue = ref(props.value);
  const emit = defineEmits(['opcionCheck']);

  </script>
  <template>
        <p>{{ props.label }}</p>
        <div class="form-check form-check-inline ps-0">
            <div class="custom-control custom-checkbox" >
                <label v-for="option in options" :key="option.id" class="ms-2 me-4">
                    <input type="radio" class="form-check-input" :value="option[props.valueField]" v-model="selectedValue" @change="emit('opcionCheck', selectedValue)" />
                    {{ option[props.labelField] }}
                </label>
            </div>
        </div>
  </template>