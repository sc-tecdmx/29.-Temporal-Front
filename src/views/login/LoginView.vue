<script setup>
    import { ref } from 'vue';
    import '@/assets/sass/authentication/auth-boxed.scss';
    import IconFeatherUser from '../../components/icons/IconFeatherUser.vue'
    import IconFeatherLock from '../../components/icons/IconFeatherLock.vue'
    import IconLogoGoogle from '../../components/icons/IconLogoGoogle.vue';
    import IconMicrosoftLogo from '../../components/icons/IconMicrosoftLogo.vue';
    import authLayout from '../../layouts/authLayout.vue';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Login' });

    const pwd_type = ref('password');

    const set_pwd_type = () => {
        if (pwd_type.value === 'password') {
            pwd_type.value = 'text';
        } else {
            pwd_type.value = 'password';
        }
    };
</script>

<template>
    <authLayout></authLayout>
    <div class="form auth-boxed">
        <div class="form-container outer">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">Iniciar sesión</h1>
                            <p class="">Ingresar usuario y contraseña para continuar.</p>

                            <form class="text-start">
                                <div class="form">
                                    <div id="username-field" class="field-wrapper input">
                                        <label for="username">USUARIO</label>
                                        <IconFeatherUser></IconFeatherUser>
                                        <input type="text" class="form-control" placeholder="usuario" />
                                    </div>

                                    <div id="password-field" class="field-wrapper input mb-2">
                                        <div class="d-flex justify-content-between">
                                            <label for="password">CONTRASEÑA</label>
                                            <router-link to="/account/recupera_contrasena" class="forgot-pass-link">¿Olvidaste tu contraseña?</router-link>
                                        </div>
                                        <IconFeatherLock></IconFeatherLock>
                                        <input :type="pwd_type" class="form-control" placeholder="Password" />
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
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary">Ingresar</button>
                                        </div>
                                    </div>

                                    <div class="division">
                                        <span>O</span>
                                    </div>

                                    <div class="social">
                                        <a href="javascript:void(0);" class="btn social-fb">
                                            <IconLogoGoogle></IconLogoGoogle>
                                            <span class="brand-name">Google</span>
                                        </a>
                                        <a href="javascript:void(0);" class="btn social-github">
                                            <IconMicrosoftLogo></IconMicrosoftLogo>
                                            <span class="brand-name ms-1">Microsoft</span>
                                        </a>
                                    </div>

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
