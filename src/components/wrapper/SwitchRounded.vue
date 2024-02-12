<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue';

    const props= defineProps({
        label: String,
        id:String,
        valorInicial: Boolean
    });
    const emit = defineEmits(['chkSwitch']);
    const selected = ref(props.valorInicial || '');


</script>
<template>
    <div class="form-check form-switch ms-3">
        <input v-model="selected"
            class="form-check-input" 
            type="checkbox" 
            role="switch" 
            :id="'flexSwitchCheckDefault' + props.id"
            @change="emit('chkSwitch', selected)">
        <label class="form-check-label ps-1 fw-normal" :for="'flexSwitchCheckDefault' + props.id">{{ label }}</label>
    </div>
</template>

<style>
.form-check-input:checked {
    background-color: #0a2241 !important;
    border-color: #0a2241 !important;
}
.form-check-input:focus {
    border-color: #9a4d94;
    outline: 0;
    box-shadow: 0 0 0 .25rem rgba(154,77,148,.25);
}
</style>