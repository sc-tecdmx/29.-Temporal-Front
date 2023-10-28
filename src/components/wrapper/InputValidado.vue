<script setup>
    import { ref } from 'vue';
    import { defineProps, defineEmits } from 'vue'
    import '@/assets/sass/scrollspyNav.scss';

    const props= defineProps({
         idName: String,
         label: String,
         placeholder: String,
     });
    
    const emit = defineEmits(['inputData'])

    const selected = ref('');
    
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
</script>
<template>
    <!-- <form novalidate class="simple-example" @submit.stop.prevent="submit_form1"> -->
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
                    @change="submit_form1(); emit('inputData', selected, is_submit_form1)"
                    />
                <!-- <div class="valid-feedback">Validado</div> -->
                <div class="invalid-feedback">Ingrese texto</div>
            </div>
        </div>
        <!-- <button type="submit" class="btn mt-2 btn-primary">Submit form</button>
    </form> -->
</template>


