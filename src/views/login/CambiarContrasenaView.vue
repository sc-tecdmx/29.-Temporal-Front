<script setup>
    import { ref } from 'vue';
    import '@/assets/sass/authentication/auth-boxed.scss';
    import IconFeatherLock from '@/components/icons/IconFeatherLock.vue';
    import { useAuthStore } from '@/stores/authStore.js';
    import jwtDecode from "vue-jwt-decode";
    
    
    const pwd_type = ref('password');
    const is_contrasena_actual = ref(false);
    const is_contrasena_nueva = ref(false);
    const is_confirma_contrasena = ref(false);
    const contrasena_confirmada = ref(false);
    const authStore = useAuthStore();

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
            //return alert("contraseña diferente");
         }else{
            is_contrasena_nueva.value = true;
            is_confirma_contrasena.value =true;
            contrasena_confirmada.value = false;
            authStore.cambiarPass(usuarioSesion.value.sub,form.value.contrasena_nueva);
            //revisar que no pinte rojo
         }
        //validaciones para que no se vaya vacio
    };
    
    const token = authStore.state.user.token;
    const usuarioSesion = ref(null);
    usuarioSesion.value = jwtDecode.decode(token);

    const verificaPassword = (password) => {
        let regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        if (regex.test(password)) {
            form.value.contrasena_nueva = password;
        } else {
            alert("La contraseña no cumple con los criterios establecidos");
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
                            <h1 class="">Cambiar contraseña</h1>
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
                                                            Las contraseñas no coinciden.
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    <!-- Fin Toast -->
                                <div class="form">
                                    <div id="password-nueva" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">NUEVA CONTRASEÑA</label>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" 
                                                class="form-control" 
                                                placeholder="Ingresa una nueva contraseña"
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
                                        <p class="mt-3 fst-italic">La contraseña debe tener al entre 8 y 16 caracteres, 
                                            al menos un dígito, al menos una minúscula, 
                                            al menos una mayúscula y al menos un caracter no alfanumérico.
                                        </p>
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Ingrese contraseña nueva</div>
                                    </div>

                                    <div id="password-nueva-confirma" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">CONFIRMAR NUEVA CONTRASEÑA</label>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" 
                                                class="form-control" 
                                                placeholder="Ingresa una nueva contraseña" 
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
                                        <div class="invalid-feedback">Confirma contraseña</div>
                                    </div>
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary">Cambiar contraseña</button>
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
    border-color: #FF8200;
    box-shadow: 0 0 0 .25rem rgba(255,130,0,.25);
}
</style>