<script setup>
    import { ref, onMounted } from 'vue';
    import '@/assets/sass/authentication/auth-boxed.scss';
    import IconFeatherLock from '@/components/icons/IconFeatherLock.vue';
    import { useAuthStore } from '@/stores/authStore.js';
    import { useRoute } from 'vue-router';
    
    const pwd_type = ref('password');
    const is_contrasena_actual = ref(false);
    const is_contrasena_nueva = ref(false);
    const is_confirma_contrasena = ref(false);
    const contrasena_confirmada = ref(false);
    const authStore = useAuthStore();

    //Token que viene de la url
    const token = ref('');
    const route = useRoute();

    onMounted(() => {
        // Obtener el token de la ruta
        token.value = route.query.token;

        //console.log(token)
    });

    const set_pwd_type = () => {
        if (pwd_type.value === 'password') {
            pwd_type.value = 'text';
        } else {
            pwd_type.value = 'password';
        }
    };
    const form = ref({ contrasena_actual: '' , contrasena_nueva: '', confirma_contrasena:''});
    const password = ref("");
    const submit_form = () => {
        is_contrasena_actual.value = true;
        // console.log("pass",form.value.contrasena_nueva)
        // console.log("pass_conf",form.value.confirma_contrasena)
        
        if(form.value.contrasena_nueva != form.value.confirma_contrasena){
            is_confirma_contrasena.value =false;
            contrasena_confirmada.value = true;
            return alert("contrase&#241;a diferente");
         }else{
            is_contrasena_nueva.value = true;
            is_confirma_contrasena.value =true;
            contrasena_confirmada.value = false;
            authStore.resetPass(token.value,form.value.contrasena_nueva);
            //revisar que no pinte rojo
         }
        //validaciones para que no se vaya vacio
    };

    const verificaPassword = (password) => {
        let regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        if (regex.test(password)) {
            form.value.contrasena_nueva = password;
        } else {
            alert("La contrase&#241;a no cumple con los criterios establecidos");
        }
    }

</script>
<template>
    <div class="form auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">Cambiar contrase&#241;a</h1>
                            <form novalidate class="text-start" @submit.stop.prevent ="submit_form">
                                <!-- Toast -->
                                        <div aria-live="polite" aria-atomic="true" class="position-relative" v-if="contrasena_confirmada">
                                            <div class="toast-container top-50 start-100 translate-middle p-3">
                                                    <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                                                        <div class="toast-header bg-danger">
                                                            <strong class="me-auto">Error</strong>
                                                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                                        </div>
                                                        <div class="toast-body text-dark">
                                                            Las contrase&#241;as no coinciden.
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    <!-- Fin Toast -->
                                <div class="form">
                                    <div id="password-nueva" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">NUEVA CONTRASE&#209;A</label>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" 
                                                class="form-control" 
                                                placeholder="Ingresa una nueva contrase&#241;a"
                                                v-model="password"
                                                :class="[is_contrasena_nueva ? (form.contrasena_nueva ? 'is-valid' : 'is-invalid') : '']"
                                                @change="verificaPassword(password)"
                                                />
                                        <svg
                                            @click="set_pwd_type"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            id="toggle-password"
                                            class="feather feather-eye"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        <p class="mt-3 fst-italic">La contrase&#241;a debe tener al entre 8 y 16 caracteres, 
                                            al menos un d&#237;gito, al menos una min&#250;scula, 
                                            al menos una may&#250;scula y al menos un caracter no alfanum&#233;rico.
                                        </p>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Ingrese contrase&#241;a nueva</div>
                                    </div>

                                    <div id="password-nueva-confirma" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">CONFIRMAR NUEVA CONTRASE&#209;A</label>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" 
                                                class="form-control" 
                                                placeholder="Ingresa una nueva contrase&#241;a" 
                                                v-model="form.confirma_contrasena" 
                                                :class="[is_confirma_contrasena ? (form.confirma_contrasena ? 'is-valid' : 'is-invalid') : '']"
                                                />
                                        <svg
                                            @click="set_pwd_type"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            id="toggle-password"
                                            class="feather feather-eye"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        <div class="valid-feedback">Correcto</div>
                                        <div class="invalid-feedback">Confirma contrase&#241;a</div>
                                    </div>
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary">Cambiar contrase&#241;a</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style>
.auth-boxed .form-form .form-form-wrap form .field-wrapper svg.feather-eye {
    top: 45px;
    right: 33px;
}
.form-control.is-valid:focus, .was-validated .form-control:valid:focus {
    border-color: #7b8c90;
    box-shadow: 0 0 0 .25rem rgba(255,130,0,.25);
}
</style>