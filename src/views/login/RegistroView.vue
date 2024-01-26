<script setup>
import { ref } from "vue";
import "@/assets/sass/authentication/auth-boxed.scss";
import IconFeatherUser from "@/components/icons/IconFeatherUser.vue";
import IconFeatherLock from "@/components/icons/IconFeatherLock.vue";
import IconLogoGoogle from "@/components/icons/IconLogoGoogle.vue";
import IconMicrosoftLogo from "@/components/icons/iconmicrosoftlogo.vue";
import IconFeatherAtSign from "@/components/icons/IconFeatherAtSign.vue";
import { useAuthStore } from "@/stores/authStore.js";

import { useMeta } from "@/composables/use-meta";
useMeta({ title: "Registro" });

const pwd_type = ref("password");
const authStore = useAuthStore();
const password = ref("");

const params = {
  usuario: "",
  contrasenia: "",
  email: "",
  estatusCuenta: null,
  codigoRol: null,
};

const set_pwd_type = () => {
  if (pwd_type.value === "password") {
    pwd_type.value = "text";
  } else {
    pwd_type.value = "password";
  }
};

const verificaPassword = (password) => {
    let regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
    if (regex.test(password)) {
        params.contrasenia = password;
    } else {
        alert("La contraseña no cumple con los criterios establecidos");
    }
}
const submit_formulario = () => {
  //   arrayCampos.value = [];

  //   //  //Alerts
  //   if (!form.idNumEmpleado) {
  //     arrayCampos.value.push("Número de empleado");
  //   }
  //   if (!form.nombre) {
  //     arrayCampos.value.push("Nombre");
  //   }
  //   if (!form.apellido1) {
  //     arrayCampos.value.push("Apellido paterno");
  //   }
  //   if (!form.curp) {
  //     arrayCampos.value.push("CURP");
  //   }
  //   if (!form.rfc) {
  //     arrayCampos.value.push("RFC");
  //   }
  //   if (!form.emailInst) {
  //     arrayCampos.value.push("Correo institucional");
  //   }
  //    if (!form.codigoArea) {
  //      arrayCampos.value.push("Área");
  //    }
  //    if (!form.codigoPuesto) {
  //      arrayCampos.value.push("Puesto");
  //    }
  //   if (!form.codigoSexo) {
  //     arrayCampos.value.push("Sexo");
  //   }
  //   if (!form.fechaAltaEmpleado) {
  //     arrayCampos.value.push("Fecha de alta");
  //   }

  //   //console.log(arrayCampos)
  //   if (!arrayCampos.value.length == 0) {
  //     modalCamposRequeridos.show();
  //   } else {
  authStore.registerUser(params);
  //}
};
</script>
<template>
  <div class="form auth-boxed">
    <div class="form-container outer">
      <div class="form-form">
        <div class="form-form-wrap">
          <div class="form-container">
            <div class="form-content">
              <h1 class="">Registro</h1>
              <p class="signup-link register">
                ¿Tienes cuenta?
                <router-link to="/account/login">Iniciar sesión</router-link>
              </p>
              <form
                class="text-start"
                novalidate
                @submit.stop.prevent="submit_formulario"
              >
                <div class="form">
                  <div id="username-field" class="field-wrapper input">
                    <label for="username">USUARIA/O</label>
                    <IconFeatherUser></IconFeatherUser>
                    <input type="text" class="form-control" placeholder="usuaria/o" v-model="params.usuario"/>
                  </div>

                  <div id="email-field" class="field-wrapper input">
                    <label for="email">CORREO ELECTRÓNICO</label>
                    <IconFeatherAtSign></IconFeatherAtSign>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Correo electrónico"
                      v-model="params.email"
                    />
                  </div>

                  <div id="password-field" class="field-wrapper input mb-2">
                    <div class="d-flex justify-content-between">
                      <label for="password">CONTRASEÑA</label>
                      <!-- <router-link to="/account/recupera_contrasena" class="forgot-pass-link">¿Olvidaste tu contraseña?</router-link> -->
                    </div>
                    <IconFeatherLock></IconFeatherLock>
                    <input
                      :type="pwd_type"
                      class="form-control"
                      placeholder="Contraseña"
                      v-model="password"
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
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>

                    <p class="mt-3 fst-italic">La contraseña debe tener al entre 8 y 16 caracteres, 
                        al menos un dígito, al menos una minúscula, 
                        al menos una mayúscula y al menos un caracter no alfanumérico.</p>
                  </div>

                  <!-- <div class="terms_condition mb-4">
                                        <div class="checkbox-outline-primary custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" value="true" id="chkTerms" />
                                            <label class="custom-control-label" for="chkTerms"> Acepto  <a href="javascript:;"> terminos y condiciones </a></label>
                                        </div>
                                    </div> -->

                  <div class="d-sm-flex justify-content-between">
                    <div class="field-wrapper">
                      <button type="submit" class="btn btn-primary">
                        Registrarse
                      </button>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
