<script setup>
import { onMounted, ref, inject } from "vue";
import { defineProps, defineEmits } from "vue";
import axios from "axios";
import "@/assets/sass/apps/contacts.scss";
//Componentes
import IconFeatherTrash from "../icons/IconFeatherTrash.vue";
import IconEdit2 from "../icons/IconEdit2.vue";
//Stores
import { useAuthStore } from '@/stores/authStore.js';
import { useCatalogoStore } from "@/stores/catalogoStore";

/** Multiselect */
import "@/assets/sass/scrollspyNav.scss";
//  import Multiselect from '@suadelabs/vue3-multiselect';
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";

const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const token = authStore.state.user.token;

const props = defineProps({
  titulo: String,
  id_tabla:String,
  label: String,
  thtabla: ref([]),
  tbTabla: ref([]),
  opInstruccion: Object,
  opGrupos: Object,
  valorInicial: Object
});

const emit = defineEmits(["tablaFirmantes"]);
//  console.log(props);
const catEmpleados = ref({});
const catGrupos = ref({});
const catInstruccion = props.opInstruccion;
const selected = ref("0");
const selectedGroup = ref("0");
const instruccion = ref("");
const nuevoUsuario_email = ref("");
const submit_listado = ref(false);
let secuencia = 0;
const thtabla = props.thtabla;
const arrayTabla = ref([]);
const arrayEnviado = ref([]);

//Clase para instrucción
const class_instruccion = (valor) =>{
  for(let i = 0 ; i < catInstruccion.length; i++){
    if(valor == catInstruccion[i].id){
      return catInstruccion[i].instruccion
    }
  }
};
const class_idInstruccion = (valor) =>{
  // console.log(valor)
   for(let i = 0 ; i < catInstruccion.length; i++){
     if(valor == catInstruccion[i].instruccion){
       return catInstruccion[i].id
     }
   }
};
async function obtenerCatalogo(url) {
  return await catalogoStore.getCatalogo(url, token);
}

const editarDocumento = () => {
    let max_user_id=0;
    for (let i = 0; i < props.valorInicial.length; i++) {
      //Valida que el arreglo de la tabla tiene datos para obtener la secuencia
      if(arrayTabla.value.length != 0){
          secuencia = arrayTabla.value.length + 1;
          max_user_id = arrayTabla.value.reduce((max, character) => (character.id_tabla > max ? character.id_tabla : max), arrayTabla.value[0].id_tabla);
      }else{
          secuencia = secuencia + 1;
          max_user_id = 0;
      }
      let empleado = {
        id_tabla: max_user_id + 1,
        idEmpleado: props.valorInicial[i].numEmpleado,
        usuario: {
                nombre: props.valorInicial[i].nombre,
                apellido1: props.valorInicial[i].apellido1,
                apellido2: props.valorInicial[i].apellido2,
                puesto: props.valorInicial[i].puesto,
                area: props.valorInicial[i].area
            },
        id_instruccion: class_idInstruccion(props.valorInicial[i].instruccion),
        instruccion: props.valorInicial[i].instruccion,
        secuencia: secuencia,
      };
      arrayTabla.value.push(empleado);
      let emp={
        "secuencia": secuencia,
        "idEmpleado": props.valorInicial[i].numEmpleado,
        "instruccion": props.valorInicial[i].instruccion
      }
      arrayEnviado.value.push(emp);
    }
    emit('tablaFirmantes', arrayEnviado, submit_listado);
}

var params = new Object;
params = {
  id_tabla: null,
  idEmpleado: null,
  idUsuario:"",
  fechaLimite:"",
  tipoFirma:"Firma",
  usuario: {
        nombre: "",
        apellido1: "",
        apellido2: "",
        puesto: "",
        area: ""
    },
  id_instruccion: "",
  instruccion: "",
  secuencia: 0,
  nuevoUsuario_email: "",
};

let addContactModal = ref(null);
let addGrupoModal = ref(null);

const initPopup = () => {
  addContactModal = new window.bootstrap.Modal(
    document.getElementById("addContactModal"+ props.id_tabla)
  );
  addGrupoModal = new window.bootstrap.Modal(
    document.getElementById("addGrupoModal"+ props.id_tabla)
  );
};

const agruparEmpleados = async() => {
  const resultRef = await obtenerCatalogo(import.meta.env.VITE_CAT_GET_EMPLEADOS);
   const arrayOriginal = resultRef;
   const groupByArea = {};
   arrayOriginal.forEach(element => {
     const area = element.area
     if(!groupByArea[area]){
       groupByArea[area] = [];
     }
     groupByArea[area].push(element);
   });
   catEmpleados.value = groupByArea;
}

onMounted(async() => {
  initPopup();
  agruparEmpleados();
  catGrupos.value = props.opGrupos;
  if(props.valorInicial.length > 0){
    editarDocumento();
  }
  
});

const usuarioSelected = ref(false);
const edit_user = (user) => {
  // console.log("edit-user");
  // console.log(user);
     
     usuarioSelected.value = false;
     params = {
         id_tabla: null,
         idEmpleado: null,
         usuario: {
                 nombre: "",
                 apellido1: "",
                 apellido2: "",
                 puesto: "",
                 area: ""
             },
         id_instruccion: "",
         instruccion: "",
         secuencia: 0,
         nuevoUsuario_email: "",
         };

     if (user.id_tabla == undefined) {
        
        usuarioSelected.value = false;
        selected.value = "0";
        instruccion.value = "";
        nuevoUsuario_email.value="";
     }else{
      
      usuarioSelected.value = true;
      if(user.nuevoUsuario_email){
        
        nuevoUsuario_email.value = user.nuevoUsuario_email;
        params.id_tabla = user.id_tabla;
        selected.value = 'otro';
        instruccion.value = user.id_instruccion;
        secuencia = user.secuencia;
      }else{
        
        selected.value = user;
        instruccion.value = user.id_instruccion;
        nuevoUsuario_email.value="";
        secuencia = user.secuencia;
      }

     }
     
  addContactModal.show();
};

const edit_grupo = (grupo) => {
   selectedGroup.value = "0";
     addGrupoModal.show();
};

const add_grupo = () => {
   if (selectedGroup.value == '0') {
      alert('Elegir grupo.', 'error');
      return true;
   }
     let max_user_id=0;

     for (let i = 0; i < selectedGroup.value.personas.length; i++) {
        //Valida que el arreglo de la tabla tiene datos para obtener la secuencia
        if(arrayTabla.value.length != 0){
            secuencia = arrayTabla.value.length + 1;
            max_user_id = arrayTabla.value.reduce((max, character) => (character.id_tabla > max ? character.id_tabla : max), arrayTabla.value[0].id_tabla);
        }else{
            secuencia = secuencia + 1;
            max_user_id = 0;
        }

        let empleado = {
         id_tabla: max_user_id + 1,
         idEmpleado: selectedGroup.value.personas[i].id,
         usuario: {
                 nombre: selectedGroup.value.personas[i].nombre,
                 apellido1: selectedGroup.value.personas[i].apellido1,
                 apellido2: selectedGroup.value.personas[i].apellido2,
                 puesto: selectedGroup.value.personas[i].puesto,
                 area: selectedGroup.value.personas[i].area
             },
         id_instruccion: class_idInstruccion(selectedGroup.value.personas[i].instruccion),
         instruccion: selectedGroup.value.personas[i].instruccion,
         secuencia: secuencia,
         };

        arrayTabla.value.push(empleado);
      }
      arrayEnviado.value = arrayTabla.value;
  //console.log(arrayTabla)
  //   arrayTabla.value.push(params);
  //   arrayEnviado.value.push(empleado);
  addGrupoModal.hide();
};
const save_user = () => {

   email_valido.value = true;

   if (selected.value == '0') {
      alert('Elegir empleado.', 'error');
      return true;
   }
   if(selected.value == 'otro'){
    let correcto = esCorreoElectronico(nuevoUsuario_email.value);

      if(!correcto){
        alert('Ingresar correo electrónico válido.', 'error');
          return true;
      }
      if (!nuevoUsuario_email.value) {
          alert('Ingresar correo electrónico.', 'error');
          return true;
      }
   }
   if (instruccion.value == '') {
       alert('Seleccionar instrucción.', 'error');
       return true;
   }

  if (selected.value.id_tabla || params.id_tabla) {
    //update user
    
     let user = arrayTabla.value.find(
        (d) => d.id_tabla == selected.value.id_tabla || d.id_tabla == params.id_tabla
      );

     user.nuevoUsuario_email = nuevoUsuario_email.value;
     user.id_instruccion = instruccion.value;
     user.instruccion = class_instruccion(user.id_instruccion);
    
  } else { 
    //agregar empleado
    let max_user_id=0;
    //Valida que el arreglo de la tabla tiene datos para obtener la secuencia
    if(arrayTabla.value.length != 0){
        secuencia = arrayTabla.value.length + 1;
        max_user_id = arrayTabla.value.reduce((max, character) => (character.id_tabla > max ? character.id_tabla : max), arrayTabla.value[0].id_tabla);
    }else{
        secuencia = secuencia + 1;
        max_user_id = 0;
    }

    params.id_tabla = max_user_id + 1;
    params.idEmpleado = selected.value.id;
    params.usuario.nombre = selected.value.nombre;
    params.usuario.apellido1 = selected.value.apellido1;
    params.usuario.apellido2 = selected.value.apellido2;
    params.usuario.puesto = selected.value.puesto;
    params.usuario.area = selected.value.area;
    params.id_instruccion = instruccion.value;
    params.secuencia = secuencia;
    params.nuevoUsuario_email = nuevoUsuario_email.value;
    params.instruccion = class_instruccion(params.id_instruccion);
    params.idUsuario = "";
    
    let empleado={
      "secuencia": secuencia,
      "idEmpleado": selected.value.id,
      "instruccion": params.instruccion
    }
    arrayTabla.value.push(params);
    arrayEnviado.value.push(empleado);

  }

  addContactModal.hide();
};

const duplicado = ref(false);
const esCorreoElectronico = correoElectronico => /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(correoElectronico);
const verificaDuplicado= (data) => {

  if(esCorreoElectronico(data)){
    duplicado.value = arrayTabla.value.find((empleado) => empleado.nuevoUsuario_email === data);
    return duplicado;
  }
  if(data === 'otro'){
    duplicado.value = false;
  }else{
    duplicado.value = false;
    duplicado.value = arrayTabla.value.find((empleado) => empleado.idEmpleado === data.id);
    return duplicado;
  }
}
const email_valido = ref(false);

const delete_row = (item) => {

  if (confirm('¿Desea eliminar este registro?')) {
    arrayTabla.value = arrayTabla.value.filter((d) => d.id_tabla != item.id_tabla);
    arrayEnviado.value = arrayEnviado.value.filter((d) => d.idEmpleado != item.idEmpleado);
      if (arrayTabla.value.length == 0) {
        submit_listado.value = false;
      }
  }
};
const verificaArray = () => {
  if (arrayTabla.value.length > 0) {
    submit_listado.value = true;
  }
};

</script>
<template>
  <div class="invoice-detail-items me-3">
    <div class="row">
      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 invoice-address-company">
        <h4>{{ titulo }}</h4>
      </div>
      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7 text-sm-end text-center layout-spacing align-self-end">
        <div class="d-flex justify-content-sm-end justify-content-center">
          <a href="javascript:;" @click="edit_user">
            <svg
              id="btn-add-contact"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-user-plus"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </a>
          <a href="javascript:;" @click="edit_grupo">
            <svg
              id="btn-add-contact"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table role="table" aria-busy="false" aria-colcount="5" class="table table-bordered" :id="'tabla-' + props.id_tabla">
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" scope="col" aria-colindex="1" v-for="th in thtabla">
              <div>{{ th }}</div>
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          <tr v-for="opcion in arrayTabla" role="row">
            <td aria-colindex="1" role="cell">
                <div class="" v-if="opcion.usuario.nombre">
                  <div class="fw-semibold">{{ opcion.usuario.nombre }} {{ opcion.usuario.apellido1 }} {{ opcion.usuario.apellido2 }}</div>
                  <div class="ms-2">{{ opcion.usuario.area }}</div>
                  <div class="ms-2">{{ opcion.usuario.puesto }}</div>
                </div>
                <div v-if="opcion.nuevoUsuario_email">
                    {{ opcion.nuevoUsuario_email }}
                </div>
            </td>
            <td aria-colindex="2" role="cell">
              {{ opcion.instruccion }}
            </td>
            <td aria-colindex="4" role="cell">
              <span> Ok</span>
            </td>
            <td aria-colindex="3" role="cell">
              <a href="javascript:;" class="cancel" @click="edit_user(opcion)">
                <IconEdit2></IconEdit2>
              </a>
            </td>
            <td aria-colindex="5" role="cell" class="text-center">
              <a href="javascript:;" class="cancel" @click="delete_row(opcion); emit('tablaFirmantes', arrayTabla, submit_listado);">
                <IconFeatherTrash></IconFeatherTrash>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal Individual-->
  <div :id="'addContactModal'+props.id_tabla" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content mailbox-popup">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ selected.id_tabla || params.id_tabla ? "Editar " : "Agregar " }} {{ props.label }}
          </h5>
          <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <div class="add-contact-box">
            <div class="add-contact-content">
              <form :id="'addContactModalTitle'+ props.id_tabla">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group mb-0">
                      <label class="text-capitalize">{{ props.label }}</label>
                      <!-- {{ catEmpleados }} -->
                      <select v-model="selected" class="form-select form-select-sm" @change="verificaDuplicado(selected)" :disabled="usuarioSelected">
                        <option value="0">--Seleccionar--</option>
                        <option :value="selected" v-if="usuarioSelected && selected != 'otro'">{{ selected.usuario.nombre }} {{ selected.usuario.apellido1 }} {{ selected.usuario.apellido2 }}</option>
                        <optgroup v-for="(items, area) in catEmpleados" :label="area" :key="area">
                          <option v-for="item in items" :key="item.id" :value="item">{{ item.nombre }} {{ item.apellido1 }} {{ item.apellido2 }}</option>
                        </optgroup>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12" v-if="selected == 'otro'">
                    <div class="row">
                      <label
                        for="nombreOtro"
                        class="col-sm-12 col-form-label col-form-label-sm pb-0"
                        >Ingrese el correo electrónico:</label
                      >
                      <div class="col-sm-12 ms-0">
                        <input
                          type="email"
                          v-model="nuevoUsuario_email"
                          id="nombreOtro"
                          class="form-control form-control-sm"
                          placeholder="email@mail.com"
                          :class="[email_valido ? (esCorreoElectronico(nuevoUsuario_email) ? 'is-valid' : 'is-invalid') : '']"
                          @change="verificaDuplicado(nuevoUsuario_email)"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <form class="select" novalidate @submit.stop.prevent="submit_form3" >
                      <div class="row">
                        <div class="col-md-12">
                          <div id="select_menu" class="form-group form-group">
                            <label :for="'selectInst-' + props.id_tabla" class="col-sm-12 col-form-label col-form-label-sm pb-0">
                              Instrucción:
                            </label>
                            <select v-model="instruccion" class="form-select form-select-sm" :id="'selectInst-' + props.id_tabla">
                              <option value="">-- Seleccionar --</option>
                              <option :value="opInstruccion.id" v-for="opInstruccion in catInstruccion">{{ opInstruccion.instruccion }}</option>
                            </select>
                            <div class="valid-feedback">Válido</div>
                            <div class="invalid-feedback">
                              Seleccionar una opción
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="alert alert-light-danger alert-dismissible border-0 mb-4" role="alert" v-if="duplicado">
                    <strong>Este empleada/o ya ha sido agregado.</strong>
                    <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">×</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="save_user(); verificaArray(); emit('tablaFirmantes', arrayEnviado, submit_listado, arrayTabla);" :disabled="duplicado">
            {{ selected.id_tabla || params.id_tabla ? "Editar" : "Agregar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Grupo-->
  <div :id="'addGrupoModal'+props.id_tabla" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content mailbox-popup">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ selected.id_tabla || params.id_tabla ? "Editar Grupo" : "Agregar Grupo" }}
          </h5>
          <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <div class="add-contact-box">
            <div class="add-contact-content">
              <form :id="'addGrupoModalTitle'+ props.id_tabla">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group mb-0">
                      <label>Grupo</label>
                      <select v-model="selectedGroup" class="form-select form-select-sm" @change="verificaDuplicado(selectedGroup)" :disabled="usuarioSelected">
                        <option value="0">--Seleccionar--</option>
                        <option v-for="opcion in catGrupos" :value="opcion" v-if="!usuarioSelected">
                          {{ opcion.nombreGrupo }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="alert alert-light-danger alert-dismissible border-0 mb-4" role="alert" v-if="duplicado">
                    <strong>Este grupo ya ha sido agregado.</strong>
                    <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">×</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="add_grupo(); verificaArray(); emit('tablaFirmantes', arrayEnviado, submit_listado);" :disabled="duplicado">
            {{ selected.id_tabla || params.id_tabla ? "Editar" : "Agregar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

#btn-add-contact {
  padding: 9px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 35px;
  width: 43px;
  height: 41px;
  color: #0a2241;
  fill: rgba(154, 39, 143, 0.2392156863);
  border: 1px solid #194891;
  box-shadow: 0 0 40px 0 rgba(94, 92, 154, 0.06);

  &:hover {
    color: #7b8c90;
    fill: rgba(255, 130, 0, 0.08);
  }
}
.Alta svg {
    color: #e7515a;
    fill: rgba(231,81,90,.19);
}
.Media svg {
    color: #ff9070;
    fill: rgba(255,120,67,.19);
}
.Baja svg {
    color: #f3d63c;
    fill: rgba(255,190,17,.19);
}
</style>