<script setup>
import { ref } from 'vue';
    import '@/assets/sass/scrollspyNav.scss';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Form Validation' });

    //const code_arr = ref([]);
    // const form1 = ref({ name: '' });
    // const is_submit_form1 = ref(false);
    // const form2 = ref({ email: '' });
    // const is_submit_form2 = ref(false);
    const form3 = ref({ select: '' });
    const is_submit_form3 = ref(false);
    // const form4 = ref({ first_name: 'Shaun', last_name: 'Park', username: '', city: '', state: '', zip: '', is_terms: false });
    // const is_submit_form4 = ref(false);
    // const form5 = ref({ first_name: 'Shaun', last_name: 'Park', username: '', city: '', state: '', zip: '', is_terms: false });
    // const is_submit_form5 = ref(false);
    // const form6 = ref({ first_name: 'Shaun', last_name: 'Park', username: '', city: '', state: '', zip: '', is_terms: false });
    // const is_submit_form6 = ref(false);

    // const toggleCode = (name) => {
    //     if (code_arr.value.includes(name)) {
    //         code_arr.value = code_arr.value.filter((d) => d != name);
    //     } else {
    //         code_arr.value.push(name);
    //     }
    // };
    // const email_validate = (email) => {
    //     const regexp = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    //     return regexp.test(email);
    // };
    // const submit_form1 = () => {
    //     is_submit_form1.value = true;
    //     if (form1.value.name) {
    //         //form validated success
    //         showMessage('Form submitted successfully.');
    //     }
    // };
    // const submit_form2 = () => {
    //     is_submit_form2.value = true;
    //     if (email_validate(form2.value.email)) {
    //         //form validated success
    //         showMessage('Form submitted successfully.');
    //     }
    // };
    const submit_form3 = () => {
        is_submit_form3.value = true;
        if (form3.value.select) {
            //form validated success
            //showMessage('Form submitted successfully.');
        }
    };
    // const submit_form4 = () => {
    //     is_submit_form4.value = true;
    //     if (form4.value.first_name && form4.value.last_name && form4.value.username && form4.value.city && form4.value.state && form4.value.zip && form4.value.is_terms) {
    //         //form validated success
    //         showMessage('Form submitted successfully.');
    //     }
    // };
    // const submit_form5 = () => {
    //     is_submit_form5.value = true;
    //     if (form5.value.first_name && form5.value.last_name && form5.value.username && form5.value.city && form5.value.state && form5.value.zip && form5.value.is_terms) {
    //         //form validated success
    //         showMessage('Form submitted successfully.');
    //     }
    // };
    // const submit_form6 = () => {
    //     is_submit_form6.value = true;
    //     if (form6.value.first_name && form6.value.last_name && form6.value.username && form6.value.city && form6.value.state && form6.value.zip && form6.value.is_terms) {
    //         //form validated success
    //         showMessage('Form submitted successfully.');
    //     }
    // };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({ toast: true, position: 'top', showConfirmButton: false, timer: 3000 });
        toast.fire({ icon: type, title: msg, padding: '10px 20px' });
    };
</script>
<template>
<div class="panel-body">
    <!-- <form class="select" novalidate @submit.stop.prevent="submit_form3"> -->
        <div class="row">
            <div class="col-md-12">
                <div id="select_menu" class="form-group form-group">
                    <select v-model="form3.select" class="form-select" :class="[is_submit_form3 ? (form3.select ? 'is-valid' : 'is-invalid') : '']">
                        <option value="">-- Seleccionar --</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <div class="valid-feedback">Opción valida</div>
                    <div class="invalid-feedback">Seleciona una opción</div>
                </div>
            </div>
        </div>
        <!-- <button class="btn btn-primary mt-2" type="submit">Submit form</button> -->
    <!-- </form> -->
</div>
</template>
<style>

</style>