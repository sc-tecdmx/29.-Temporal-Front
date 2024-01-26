<script setup>
    import { ref } from 'vue';
    import '@/assets/sass/authentication/auth-boxed.scss';
    import IconFeatherUser from '@/components/icons/IconFeatherUser.vue'
    import IconFeatherLock from '@/components/icons/IconFeatherLock.vue'
    import IconLogoGoogle from '@/components/icons/IconLogoGoogle.vue';
    import IconMicrosoftLogo from '@/components/icons/IconMicrosoftLogo.vue';
    import authLayout from '@/layouts/authLayout.vue';

    import { useAuthStore } from '../../stores/authStore.js'

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Login' });

    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');

    const pwd_type = ref('password');

    const set_pwd_type = () => {
        if (pwd_type.value === 'password') {
            pwd_type.value = 'text';
        } else {
            pwd_type.value = 'password';
        }
    };
const loginSubmit = async() =>{
    //  if(!email.value || password.value.length < 6){
    //          return alert("llena los campos");
    //  }
    await authStore.loginUser(email.value, password.value);
}
    
</script>

<template>
    <authLayout></authLayout>
    <div class="form auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">Iniciar sesi&#243;n</h1>
                            <p class="">Ingresar usuaria/o y contraseña para continuar.</p>

                            <form class="text-start" @submit.prevent="loginSubmit">
                                <div class="form">
                                    <div id="username-field" class="field-wrapper input">
                                        <label for="username">CORREO ELECTR&#211;NICO</label>
                                        <IconFeatherUser></IconFeatherUser>
                                        <input v-model="email" type="text" class="form-control" placeholder="correo electr&#243;nico" />
                                    </div>

                                    <div id="password-field" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">CONTRASE&#209;A</label>
                                            <router-link to="/account/recupera_contrasena" class="forgot-pass-link">¿Olvidaste tu contrase&#241;a?</router-link>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input v-model="password" :type="pwd_type" class="form-control" placeholder="Password" />
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
                                    </div>
                                    <div class="d-sm-flex justify-content-center">
                                        <div class="field-wrapper row">
                                            <div class="col-6">
                                                <button type="submit"  class="btn btn-primary">Judicial</button>
                                            </div>
                                            <div class="col-6">
                                                <button type="submit"  class="btn btn-primary">Administrativo</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- <div class="division">
                                        <span>O</span>
                                    </div> -->

                                    <!-- <div class="social">
                                        <a href="javascript:void(0);" class="btn social-fb">
                                            <IconLogoGoogle></IconLogoGoogle>
                                            <span class="brand-name">Google</span>
                                        </a>
                                        <a href="javascript:void(0);" class="btn social-github">
                                            <IconMicrosoftLogo></IconMicrosoftLogo>
                                            <span class="brand-name ms-1">Microsoft</span>
                                        </a>
                                    </div> -->

                                    <p class="signup-link">¿No estas registrado? <router-link to="/account/registro">Crea una cuenta</router-link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
