<script setup>
import { ref } from 'vue';
import { useAuthStore } from "@/stores/authStore.js";
import '@/assets/sass/authentication/auth-boxed.scss';
import IconFeatherAtSign from '@/components/icons/IconFeatherAtSign.vue';

import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Recuperar contraseña' });

const authStore = useAuthStore();
const email = ref('');
const submit_formulario = () => {
    if(email.value == ""){
        alert("Ingresar correo electrónico")
    }else{
        authStore.restablecerPass(email.value);
    }
};

</script>
<template>
    <div class="form no-image-content auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">Restablecer contraseña</h1>
                            <p class="signup-link recovery">Ingresa tu correo electrónico y se enviarán las instrucciones.</p>
                            <form class="text-start"  novalidate @submit.stop.prevent="submit_formulario">
                                <div class="form">
                                    <div id="email-field" class="field-wrapper input">
                                        <div class="d-flex justify-content-between">
                                            <label for="email">CORREO ELECTRÓNICO</label>
                                        </div>
                                        <IconFeatherAtSign></IconFeatherAtSign>
                                        <input type="email" class="form-control form-control-sm" placeholder="Correo electrónico" v-model="email"/>
                                    </div>

                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary">Restablecer</button>
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


