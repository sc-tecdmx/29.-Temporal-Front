<script setup>
    import { ref } from 'vue';
    import '@/assets/sass/authentication/auth-boxed.scss';
    import IconFeatherLock from '../../components/icons/IconFeatherLock.vue'

    
    const pwd_type = ref('password');
    const is_contrasena_actual = ref(false);
    const is_contrasena_nueva = ref(false);
    const is_confirma_contrasena = ref(false);
    const contrasena_confirmada = ref(false);

    const set_pwd_type = () => {
        if (pwd_type.value === 'password') {
            pwd_type.value = 'text';
        } else {
            pwd_type.value = 'password';
        }
    };
    const form = ref({ contrasena_actual: '' , contrasena_nueva: '', confirma_contrasena:''});

    const submit_form = () => {
        is_contrasena_actual.value = true;
        
        
        if(form.value.contrasena_nueva != form.value.confirma_contrasena){
            console.log("son diferentes")
            is_confirma_contrasena.value =false;
            contrasena_confirmada.value = true;
            //return alert("contraseña diferente");
         }else{
            console.log("if iguales");
            is_contrasena_nueva.value = true;
            is_confirma_contrasena.value =true;
            contrasena_confirmada.value = false;
         }
        // enviar form a guardar y que verifique si la contraseña actual es correcta
        // me debe regresar siguardo o no para enviar mensaje de exito
    };

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
                                    <div id="password-actual" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">CONTRASEÑA ACTUAL</label>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" 
                                                class="form-control" 
                                                placeholder="Contraseña actual" 
                                                v-model="form.contrasena_actual" 
                                                :class="[is_contrasena_actual ? (form.contrasena_actual ? 'is-valid' : 'is-invalid') : '']"
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
                                        <div class="valid-feedback"></div>
                                        <div class="invalid-feedback">Ingrese contraseña</div>
                                    </div>
                                    <div id="password-nueva" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">NUEVA CONTRASEÑA</label>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" 
                                                class="form-control" 
                                                placeholder="Ingresa una nueva contraseña"
                                                v-model="form.contrasena_nueva" 
                                                :class="[is_contrasena_nueva ? (form.contrasena_nueva ? 'is-valid' : 'is-invalid') : '']"
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