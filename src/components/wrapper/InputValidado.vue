<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue'
    import '@/assets/sass/scrollspyNav.scss';

    const props= defineProps({
         idName: String,
         label: String,
         placeholder: String,
         maxlength: String,
         disabled: Boolean,
         valorInicial: String
     });
    const emit = defineEmits(['inputData'])
    const selected = ref('');
    const is_submit_form1 = ref(false);

    if (props.valorInicial === undefined) {
        selected.value = "";
    }else{
        selected.value = props.valorInicial;
    }

    const submit_form1 = () => {
        is_submit_form1.value = true;
    };

    // const showMessage = (msg = '', type = 'success') => {
    //     const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
    //     toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    // };
</script>
<template>
        <div class="row">
            <div class="col-md-12 form-group">
                <label :for="idName" class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
                <input 
                    type="text"
                    v-model="selected" 
                    :id="idName"  
                    class="form-control form-control-sm" 
                    :class="[is_submit_form1 ? (selected ? 'is-valid' : 'is-invalid') : '']" 
                    :placeholder=" placeholder "
                    :maxlength="props.maxlength"
                    :disabled="props.disabled"
                    @change="submit_form1(); emit('inputData', selected, is_submit_form1)"
                    />
                <div class="invalid-feedback">Ingrese texto</div>
            </div>
        </div>
</template>


