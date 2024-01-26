<script setup>
import { ref, onMounted } from "vue";
import "@/assets/sass/authentication/auth-boxed.scss";
import axios from "axios";
//Stores
import { useAuthStore } from "@/stores/authStore.js";
import { useCatalogoStore } from "@/stores/catalogoStore.js";
//Componentes
import InputValidado from "@/components/wrapper/InputValidado.vue";
import InputMask from "@/components/wrapper/InputMask.vue";
import InputType from "@/components/wrapper/InputType.vue";
import GenericSelect from "@/components/wrapper/GenericSelect.vue";
import RadioGroup from "@/components/wrapper/RadioGroup.vue";
import SwitchRounded from "@/components/wrapper/SwitchRounded.vue";
import FechaGeneric from "@/components/wrapper/FechaGeneric.vue";

import { useMeta } from "@/composables/use-meta";
useMeta({ title: "Registro de empleada/o" });

const pwd_type = ref("password");
const selected_file = ref(null);

const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
let modalCamposRequeridos = ref(null);

const token = authStore.state.user.token;
//const urlLAR = import.meta.env.VITE_API_LARURL;
const loadingCat = ref(false);

const catArea = ref([]);
const catPuesto = ref([]);
const catSexo = ref([]);
const urlArea = import.meta.env.VITE_CAT_GET_AREA;
const urlPuesto = import.meta.env.VITE_CAT_GET_PUESTOS;
const urlSexo = import.meta.env.VITE_CAT_GET_SEXO;


 async function getCatalogo(url) {
   return await catalogoStore.getCatalogo(url, token);
 }

//Inicializa Modal
const initPopup = () => {
  modalCamposRequeridos = new window.bootstrap.Modal(
    document.getElementById("modalCamposRequeridos")
  );
};
onMounted(async () => {
  initPopup();
  try {
    catArea.value = await getCatalogo(urlArea);
    catPuesto.value = await getCatalogo(urlPuesto);
    catSexo.value = await getCatalogo(urlSexo);
    //console.log("AREAS-HIjas",catArea.value[0].AreasHijas);
    loadingCat.value = true;
  } catch (error) {
    console.log(error);
  }
  
});
const set_pwd_type = () => {
  if (pwd_type.value === "password") {
    pwd_type.value = "text";
  } else {
    pwd_type.value = "password";
  }
};
const params = {
  idNumEmpleado: null,
  nombre: null,
  apellido1: null,
  apellido2: null,
  codigoSexo: null,
  emailPers: null,
  emailInst: null,
  telPers: null,
  telInst: null,
  curp: null,
  rfc: null,
  pathFotografia: null,
  codigoArea: null,
  codigoPuesto: null,
  fechaAltaEmpleado: null,
  esTitular: false,
  fechainicioTitular: null,
};

const form = {
  idNumEmpleado: false,
  nombre: false,
  apellido1: false,
  apellido2: false,
  codigoSexo: false,
  emailPers: false,
  emailInst: false,
  telPers: false,
  telInst: false,
  curp: false,
  rfc: false,
  pathFotografia: false,
  codigoArea: false,
  codigoPuesto: false,
  fechaAltaEmpleado: false,
  esTitular: false,
  fechainicioTitular: false,
};
const arrayCampos = ref([]);

const opcionInputNumEmpleado = (idData, campoValido) => {
  params.idNumEmpleado = idData;
  if (idData == 0) {
    form.idNumEmpleado = false;
  } else {
    form.idNumEmpleado = campoValido;
  }
};
const opcionInputNombre = (idData, campoValido) => {
  params.nombre = idData;
  if (idData == 0) {
    form.nombre = false;
  } else {
    form.nombre = campoValido;
  }
};
const opcionInputApellido1 = (idData, campoValido) => {
  params.apellido1 = idData;
  if (idData == 0) {
    form.apellido1 = false;
  } else {
    form.apellido1 = campoValido;
  }
};
const opcionInputApellido2 = (idData, campoValido) => {
  params.apellido2 = idData;
  if (idData == 0) {
    form.apellido2 = false;
  } else {
    form.apellido2 = campoValido;
  }
};
const opcionInputCURP = (idData, campoValido) => {
  params.curp = idData;
  if (idData == 0) {
    form.curp = false;
  } else {
    form.curp = campoValido;
  }
};
const opcionInputRFC = (idData, campoValido) => {
  params.rfc = idData;
  if (idData == 0) {
    form.rfc = false;
  } else {
    form.rfc = campoValido;
  }
};
const inputTelPersonal = (idData, campoValido) => {
  params.telPers = idData;
  if (idData == 0) {
    form.telPers = false;
  } else {
    form.telPers = campoValido;
  }
};
const inputTelInstiticional = (idData, campoValido) => {
  params.telInst = idData;
  if (idData == 0) {
    form.telInst = false;
  } else {
    form.telInst = campoValido;
  }
};
const inputemailPersonal = (idData, campoValido) => {
  params.emailPers = idData;
  if (idData == 0) {
    form.emailPers = false;
  } else {
    form.emailPers = campoValido;
  }
};
const inputemailInstiticional = (idData, campoValido) => {
  params.emailInst = idData;
  if (idData == 0) {
    form.emailInst = false;
  } else {
    form.emailInst = campoValido;
  }
};
const opcionSelectArea = (idOpcion) => {
  params.codigoArea = idOpcion;
  if (idOpcion == 0) {
    form.codigoArea = false;
  } else {
    form.codigoArea = true;
  }
};
const opcionSelectPuesto = (idOpcion) => {
  params.codigoPuesto = idOpcion;
  if (idOpcion == 0) {
    form.codigoPuesto = false;
  } else {
    form.codigoPuesto = true;
  }
};
const opcionCheckSexo = (idOpcion) => {
  params.codigoSexo = idOpcion;
  if (idOpcion == 0) {
    form.codigoSexo = false;
  } else {
    form.codigoSexo = true;
  }
};
const esTitular = ref(false);
const opcionSwitchTitular = (idOpcion, campoValido) => {
  params.esTitular = idOpcion;
  esTitular.value = idOpcion;
  if (idOpcion == 0) {
    form.esTitular = false;
  } else {
    form.esTitular = campoValido;
  }
};
const opcionDateAlta = (date, campoValido) => {
  const fechaActual = new Date();
  const fechaConHora = new Date(`${date}T${fechaActual.toTimeString().slice(0, 8)}`);
  const fechaFormateada = formatDateWithTime(fechaConHora);
  //console.log("fechaFormateada",fechaFormateada);

  params.fechaAltaEmpleado = fechaFormateada;
  if (date == 0) {
    form.fechaAltaEmpleado = false;
  } else {
    form.fechaAltaEmpleado = campoValido;
  }
};
const opcionDateTitular = (date, campoValido) => {
  const fechaActual = new Date();
  const fechaConHora = new Date(`${date}T${fechaActual.toTimeString().slice(0, 8)}`);
  const fechaFormateada = formatDateWithTime(fechaConHora);
  //console.log("fechaFormateada",fechaFormateada);

  params.fechainicioTitular = fechaFormateada;
  if (date == 0) {
    form.fechainicioTitular = false;
  } else {
    form.fechainicioTitular = campoValido;
  }
};

// Función para formatear la fecha con hora en el formato deseado
function formatDateWithTime(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}
const submit_formulario = () => {
  arrayCampos.value = [];

  //  //Alerts
  if (!form.idNumEmpleado) {
    arrayCampos.value.push("Número de empleada/o");
  }
  if (!form.nombre) {
    arrayCampos.value.push("Nombre");
  }
  if (!form.apellido1) {
    arrayCampos.value.push("Apellido paterno");
  }   
  if (!form.curp) {
    arrayCampos.value.push("CURP");
  }
  if (!form.rfc) {
    arrayCampos.value.push("RFC");
  }
  if (!form.emailInst) {
    arrayCampos.value.push("Correo institucional");
  }
   if (!form.codigoArea) {
     arrayCampos.value.push("Área");
   }
   if (!form.codigoPuesto) {
     arrayCampos.value.push("Puesto");
   }
  if (!form.codigoSexo) {
    arrayCampos.value.push("Sexo");
  }
  if (!form.fechaAltaEmpleado) {
    arrayCampos.value.push("Fecha de alta");
  }
  if (!arrayCampos.value.length == 0) {
    modalCamposRequeridos.show();
  } else {
    //console.log(params)
    let empleado = {
      "idNumEmpleado": params.idNumEmpleado,
      "nombre": params.nombre,
      "apellido1": params.apellido1,
      "apellido2": params.apellido2,
      "codigoSexo": params.codigoSexo,
      "emailPers": params.emailPers,
      "emailInst": params.emailInst,
      "telPers": params.telPers,
      "telInst": params.telInst,
      "curp": params.curp,
      "rfc":params.rfc,
      "pathFotografia": params.pathFotografia,
      "codigoArea": params.codigoArea,
      "codigoPuesto": params.codigoPuesto,
      "fechaAltaEmpleado": params.fechaAltaEmpleado,
      "esTitular": params.esTitular,
      "fechainicioTitular": params.fechainicioTitular
    }
    //console.log("EMP",empleado)
    authStore.registerEmpleado(empleado);
  }
};

//Imagen de perfil
const change_file = (event) => {
  selected_file.value = URL.createObjectURL(event.target.files[0]);
  params.pathFotografia = selected_file.value;
};

const imageSrc = () => {
  return new URL("@/assets/images/generic/user-profile.png", import.meta.url)
    .href;
};
const is_submit_form = ref(false);
const selected_option = ref("");
const selected_area = ref("");

</script>
<template>
  <div class="form auth-boxed">
    <div class="form-container outer">
      <div class="form-form">
        <div class="form-form-wrap form-custom">
          <div class="form-container">
            <div class="form-content">
              <h1 class="">Registrar empleada/o</h1>
              <form class="text-start" novalidate @submit.stop.prevent="submit_formulario">
                <div class="d-flex justify-content-center m-5" v-if="!loadingCat">
                  <div class="spinner-border text-primary" role="status" >
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
                <div class="form" v-if="loadingCat">
                  <div class="row justify-content-center text-center">
                    <div class="col-12">
                      <div class="upload mt-4 pe-md-4 mb-5">
                        <input
                          ref="fl_profile"
                          type="file"
                          class="d-none"
                          accept="image/*"
                          @change="change_file"
                        />
                        <img
                          :src="selected_file ? selected_file : imageSrc()"
                          alt="profile"
                          class="profile-preview"
                          @click="$refs.fl_profile.click()"
                        />
                        <p class="mt-2">Agregar imagen de perfil</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <InputValidado
                        idName="numEmpleado"
                        label="Número de empleada/o:"
                        placeholder="Ingresar número de empleada/o"
                        @inputData="opcionInputNumEmpleado"
                      ></InputValidado>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-4">
                      <InputValidado
                        idName="nombre"
                        label="Nombre:"
                        placeholder="Ingresar nombre"
                        @inputData="opcionInputNombre"
                      ></InputValidado>
                    </div>
                    <div class="col-12 col-md-4">
                      <InputValidado
                        idName="apellido1"
                        label="Primer apellido:"
                        placeholder="Ingresar apellido"
                        @inputData="opcionInputApellido1"
                      ></InputValidado>
                    </div>
                    <div class="col-12 col-md-4">
                      <InputValidado
                        idName="apellido2"
                        label="Segundo apellido:"
                        placeholder="Ingresar apellido"
                        @inputData="opcionInputApellido2"
                      ></InputValidado>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <InputType
                        idName="curp"
                        label="CURP:"
                        placeholder="Ingresar CURP"
                        type="curp"
                        pattern=""
                        @inputData="opcionInputCURP"
                      ></InputType>
                    </div>
                    <div class="col-12 col-md-6">
                      <InputType
                        idName="rfc"
                        label="RFC:"
                        placeholder="Ingresar RFC"
                        type="rfc"
                        pattern=""
                        @inputData="opcionInputRFC"
                      ></InputType>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <InputMask
                        idName="telPersonal"
                        label="Teléfono personal:"
                        placeholder="__________"
                        mask="##########"
                        @inputData="inputTelPersonal"
                      ></InputMask>
                    </div>
                    <div class="col-12 col-md-6">
                      <InputMask
                        idName="telInstitucional"
                        label="Teléfono institucional:"
                        placeholder="__________"
                        mask="##########"
                        @inputData="inputTelInstiticional"
                      ></InputMask>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <InputType
                        idName="emailPersonal"
                        label="Correo personal:"
                        placeholder="usuaria/o@dominio.com"
                        type="email"
                        pattern=".+@example\.com"
                        @inputData="inputemailPersonal"
                      ></InputType>
                    </div>
                    <div class="col-12 col-md-6">
                      <InputType
                        idName="emailInstitucional"
                        label="Correo institucional:"
                        placeholder="usuaria/o@tecdmx.org.mx"
                        type="email"
                        pattern=".+@example\.com"
                        @inputData="inputemailInstiticional"
                      ></InputType>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <GenericSelect
                        idName="catArea"
                        label="Área:"
                        :items="catArea[0].AreasHijas"
                        v-if="loadingCat"
                        v-model="selected_area"
                        keyField="id"
                        value-field="abreviatura"
                        label-field="area"
                        value=""
                        @opcionSelect="opcionSelectArea"
                      ></GenericSelect>
                    </div>
                    <div class="col-12 col-md-6">
                      <GenericSelect
                        idName="catPuesto"
                        label="Puesto:"
                        :items="catPuesto"
                        v-if="loadingCat"
                        v-model="selected_option"
                        keyField="id"
                        value-field="nombramiento"
                        label-field="nombramiento"
                        value=""
                        @opcionSelect="opcionSelectPuesto"
                      ></GenericSelect>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <RadioGroup
                        label="Sexo"
                        :options="catSexo"
                        v-if="loadingCat"
                        value-field="abreviatura"
                        label-field="sexo"
                        @opcionCheck="opcionCheckSexo"
                      ></RadioGroup>
                    </div>
                    <div class="col-12 col-md-6">
                      <FechaGeneric
                        label="Fecha de alta:"
                        :date="params.fechaAltaEmpleado"
                        @dateSelected="opcionDateAlta"
                        :dias="0"
                        :obligatorio="false"
                      ></FechaGeneric>
                    </div>
                  </div>
                  <div class="row mt-2 mb-4">
                    <div class="col-12 col-md-6">
                      <SwitchRounded
                        class="mt-4 ms-5"
                        label="Es titular"
                        id="sw-titular"
                        @chkSwitch="opcionSwitchTitular"
                      ></SwitchRounded>
                    </div>
                    <div class="col-12 col-md-6" :class="[esTitular ? '' : 'd-none']">
                      <FechaGeneric
                        label="Fecha de inicio como titular:"
                        :date="params.fechainicioTitular"
                        @dateSelected="opcionDateTitular"
                        :dias="0"
                        :obligatorio="false"
                      ></FechaGeneric>
                    </div>
                  </div>

                  <div class="d-sm-flex justify-content-between">
                    <div class="field-wrapper">
                      <button type="submit" class="btn btn-primary">
                        Registrar empleada/o
                      </button>
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
  <!-- Modal campos requeridos -->
  <div
    class="modal fade"
    id="modalCamposRequeridos"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Campos requeridos</h5>
          <button
            type="button"
            data-dismiss="modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            class="btn-close"
          ></button>
        </div>
        <div class="modal-body">
          <h4 class="modal-heading mb-4 mt-2">
            Por favor llenar los siguientes campos:
          </h4>
          <div class="toast-body text-dark">
            <ul>
              <li v-for="campo in arrayCampos">
                {{ campo }}
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            data-dismiss="modal"
            data-bs-dismiss="modal"
          >
            <i class="flaticon-cancel-12"></i> Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.form-custom {
  max-width: 680px !important;
}
</style>
