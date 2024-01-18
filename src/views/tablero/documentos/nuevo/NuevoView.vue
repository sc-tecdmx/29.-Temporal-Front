<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
//import jwtDecode from "vue-jwt-decode";
import VueJwtDecode from "vue-jwt-decode";
import "@/assets/sass/apps/invoice-add.scss";
import router from "@/router";
//-----------------------
import "@/assets/sass/forms/file-upload-with-preview.min.css";
//import "@/assets/sass/forms/custom-flatpickr.css";
import { useMeta } from "@/composables/use-meta";
/** Multiselect */
import "@/assets/sass/scrollspyNav.scss";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
//flatpickr
//import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "@/assets/sass/forms/custom-flatpickr.css";
//Stores
import { useAuthStore } from '@/stores/authStore.js';
import { useCatalogoStore } from "@/stores/catalogoStore";
//Componentes
import TablaAgregar from "@/components/wrapper/TablaAgregar.vue";
import TextAreaValidado from "@/components/wrapper/TextAreaValidado.vue";
import TextAreaNotas from "@/components/wrapper/TextAreaNotas.vue";
import FechaBasica from "@/components/wrapper/FechaBasica.vue";
import SwitchRounded from "@/components/wrapper/SwitchRounded.vue";
import SelectValidado from "@/components/wrapper/SelectValidado.vue";
import InputValidado from "@/components/wrapper/InputValidado.vue";
import InputAutocompletable from "@/components/wrapper/InputAutocompletable.vue";
import CheckGroup from "@/components/wrapper/CheckGroup.vue";

//Iconos
import IconPlus from '@/components/icons/IconPlus.vue'
//Firma
// import { getCertificadoData } from "@/firma/main.mjs";
// import { getMimeTypeAndArrayBufferFromFile } from "@/firma/main.mjs";
import {main_pfx, main_cer} from '@/firmav2/main-refactor.mjs';

//useMeta({ title: 'Vue Multiselect' });
/** ./Multiselect */
useMeta({ title: "Nuevo documento" });
//Config URLs
const urlPKI = import.meta.env.VITE_API_PKIURL;
const urlLAR = import.meta.env.VITE_API_LARURL;

const catalogos = ref({});
const catDestino = ref({});
const catTipoDocumento = ref({});
const catInstruccion = ref({});
const catInstruccionDest = ref({});
const catNuevoDoc = ref(null);

const catPrioridad = ref({});
const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const catGruposFirmante = ref(null);
const catGruposDestinatario = ref(null);

const urlNewDoc = import.meta.env.VITE_API_LARURL + import.meta.env.VITE_CAT_NUEVO_DOC;

const token = authStore.state.user.token;
//console.log("token", token)

const envApp = import.meta.env.VITE_ENV_APP;

  function getAuthorizationHeadersForLaravel(token) {
    
  if(envApp==='prod'){
    return {
      headers: {
        "bearertoken": `${token}`
      }
    };
  }else{
    return {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };
  }
}


async function obtenerCatNuevoDoc(url) {
  return await catalogoStore.getNuevoDocumento(url, token);
}
async function obtenerCatalogos(url) {
  return await catalogoStore.getCatalogo(url, token);
}

const catExpedientes = ref([])
const valueExpediente =  ref('-');
 const getExpediente = async (num_exp) => {
              const url_exp = urlLAR + "/api/autocompletado?query=" + num_exp;
              try {
                valueExpediente.value = ' ';
                const { data } = await axios.get(url_exp, getAuthorizationHeadersForLaravel(token));
                  //console.log(data);
                  params.value.nombreExpediente = data[0].s_descripcion;
                  valueExpediente.value = data[0].s_num_expediente;
                  catExpedientes.value = data;
              } catch (error) {
                  console.log(error);
                  if (confirm("El expediente no existe, favor de agregarlo")) {
                    expDesc.value = false;
                    valueExpediente.value = '';
                  }
              }
          };

/* Variable para Catálogos */

const thFirmantes = ["Nombre", "Instrucción","Estado","Editar", ""];
const thDestinatarios = ["Nombre", "Instrucción","Estado","Editar", ""];

/* Fin catálogos */

/* ..// Select 2 */
// const items = ref([]);
const selected_file = ref(null);
const selected_file_cer = ref(null);
const selected_file_key = ref(null);
//const contrasenaCer = ref(null);

const certificado = ref({
  archivoCer: "",
  archivoKey: "",
  contrasenaCer: "",
  documento: "",
});

/* JSON */
const params = ref({
  folio:"",
  folioEspecial:"",
  numExpediente: "",
  nombreExpediente:"",
  tipoDestino: "",
  tipoDocumento: "",
  tipoPrioridad: "",
  asunto: "",
  contenido: "",
  fechaLimiteFirma: "",
  fechaDocumento: "",
  elaboro: "",
  notas: "",
  configuracion: {
    ordenFirma: "",
    modoCaptura: "",
    generaNumeroOficio: "",
  },
  firmantes: [
     {
       idFirmante: "",
       firma: "",
       secuencia:"",
       /*prioridad:''*/
     },
  ],
  destinatarios: [
    {
      idDestinatario: "",
      instruccion: "",
      /*prioridad:''*/
    },
  ],
  documentos: []
});
//params enviar
const paramsEnviar = ref({
  folio:"",
  folioEspecial:"",
  numExpediente: "",
  tipoDestino: "",
  tipoDocumento: "",
  tipoPrioridad: "",
  asunto: "",
  contenido: "",
  notas:"",
  fechaLimiteFirma: "",
  configuraciones: {
    ordenFirma: false,
    modoCaptura: false,
    generaNumeroOficio: false,
  },
  notificaciones:[],
  enOrden: true,
  firmantes: [
     {
      secuencia:"",
      idEmpleado: "",
      idUsuario:"",
      fechaLimite:"2023-10-30T00:17:41.188+00:00",
      instruccion: "",
      tipoFirma:"Firma"
     },
  ],
  destinatarios: [
    {
      idEmpleado: "",
      instruccion: "",
    },
  ],
  documentosAdjuntos: []
});

const form = ref({
  selectDestino: false,
  inputFolio: false,
  selectTipoDocumento: false,
  inputFolio: false,
  inputIdDocumento: false,
  inputFolioDocumento: false,
  inputfechaCreacion: false,
  inputNumExpediente: false,
  /*inputNombreExpediente: false,*/
  inputAsuntoDoc: false,
  inputElaboro: false,
  tablaFirmantes: false,
  tablaDestinatarios: false,
  txtAreaContenido: false,
  chkPrioridad: false,
  inputPDF: false
});
// const formFirma = ref({
//     name:''
// });
const is_submit_form = ref(false);

/* Set params */
const opcionSelectDestino = (idOpcion, campoValido) => {
  //console.log("DEST", idOpcion)
  //params.value.tipoDestino = idOpcion;
  paramsEnviar.value.tipoDestino = idOpcion.label;
  if (idOpcion == 0) {
    form.selectDestino = false;
  } else {
    form.selectDestino = campoValido;
  }
};
const otroDocumento = ref(false);
const expDesc = ref(false);
const opcionSelectTipoDocumento = (idOpcion, campoValido) => {
  //console.log("TIPO-DOC", idOpcion);
  otroDocumento.value = false;
  //console.log(idOpcion)
  if(idOpcion.label === 'Otro'){
    otroDocumento.value = true;
  }else{
    //params.value.tipoDocumento = idOpcion;
    paramsEnviar.value.tipoDocumento = idOpcion.id;
  }
  
  if (idOpcion == 0) {
    form.selectTipoDocumento = false;
  } else {
    form.selectTipoDocumento = campoValido;
  }
};
//otro- tipo de documento
const inputOtroTipDoc = (idOpcion, campoValido) => {
  //console.log(idOpcion)
  params.value.tipoDocumento = idOpcion;
  
  paramsEnviar.value.tipoDocumento = idOpcion;
  if (idOpcion == 0) {
    form.selectTipoDocumento = false;
  } else {
    form.selectTipoDocumento = campoValido;
  }
};
//Folio Especial
const opcionInputFolio = (idData, campoValido) => {
  //params.value.folio = idData;
  paramsEnviar.value.folioEspecial = idData;
  if (idData == 0) {
    form.inputFolio = false;
  } else {
    form.inputFolio = campoValido;
  }
};
const opcionInputFolioDocumento = (idData, campoValido) => {
  //params.value.folio = idData;
  paramsEnviar.value.folio = idData;
  if (idData == 0) {
    form.inputFolioDocumento = false;
  } else {
    form.inputFolioDocumento = campoValido;
  }
};
const opcionInputNumeroExpediente = (idData, campoValido) => {
  //console.log(idData)
  //params.value.numExpediente = idData;
  expDesc.value = true;
  paramsEnviar.value.numExpediente = idData;
  getExpediente(idData);
  if (idData == 0) {
    form.inputNumExpediente = false;
    expDesc.value = false;
  } else {
    form.inputNumExpediente = campoValido;
  }
};
const opcionInputNombreExpediente = (idData, campoValido) => {
  params.value.nombreExpediente = idData;
  // if (idData == 0) {
  //   form.inputNombreExpediente = false;
  // } else {
  //   form.inputNombreExpediente = campoValido;
  // }
};
const opcionInputAsunto = (idData, campoValido) => {
  //params.value.asunto = idData;
  paramsEnviar.value.asunto = idData;
  if (idData == 0) {
    form.inputAsuntoDoc = false;
  } else {
    form.inputAsuntoDoc = campoValido;
  }
};
const opcionInputElaboro = (idData, campoValido) => {
  params.value.elaboro = idData;
  if (idData == 0) {
    form.inputElaboro = false;
  } else {
    form.inputElaboro = campoValido;
  }
};
const opcionInputContenido = (idData, campoValido) => {
  //params.value.contenido = idData;
  paramsEnviar.value.contenido = idData;
  if (idData == 0) {
    form.txtAreaContenido = false;
  } else {
    form.txtAreaContenido = campoValido;
  }
};
const empleadosRepetidos = ref(null);
const tablaFirmantes = (data, campoValido, dataCompleto) => {
  empleadosRepetidos.value = null
  paramsEnviar.value.firmantes = data;
  //console.log("Firmantes",paramsEnviar.value.firmantes);
  if(paramsEnviar.value.destinatarios.length > 0){
    if(paramsEnviar.value.destinatarios[0].idEmpleado != '' && dataCompleto){
      empleadosRepetidos.value = dataCompleto.filter((empleado1) => paramsEnviar.value.destinatarios.some((empleado2)=> empleado1.idEmpleado === empleado2.idEmpleado))
      if(empleadosRepetidos.value.length != 0 ){
        modalEmpDuplicado.show();
      }
    }
  }
  // console.log("DATOS", data, dataCompleto)
  //  //if (data == 0 || dataCompleto == undefined) {
   if (data == 0) {
     if(paramsEnviar.value.firmantes.length > 0){
        form.tablaFirmantes = false;
      }
   } else {
     form.tablaFirmantes = campoValido;
   }
   //console.log("VAlida", form.tablaFirmantes)
};
const tablaDestinatarios = (data, campoValido, dataCompleto) => {
  empleadosRepetidos.value = null
  paramsEnviar.value.destinatarios = data;
  //console.log("Destinatarios",paramsEnviar.value.destinatarios);
  if(paramsEnviar.value.firmantes.length > 0){
    if(paramsEnviar.value.firmantes[0].idEmpleado != '' && dataCompleto){
      empleadosRepetidos.value = dataCompleto.filter((empleado1) => paramsEnviar.value.firmantes.some((empleado2)=> empleado1.idEmpleado === empleado2.idEmpleado))
      if(empleadosRepetidos.value.length != 0 ){
        modalEmpDuplicado.show();
      }
    }
  }
  if (data == 0 || dataCompleto == undefined) {
    if(paramsEnviar.value.destinatarios.length > 0){
      form.tablaDestinatarios = false;
    }
   } else {
     form.tablaDestinatarios = campoValido;
   }
};
const opcionSwitchOrdenFirma = (idData) => {
  //params.value.configuracion.ordenFirma = idData;
  paramsEnviar.value.configuraciones.ordenFirma = idData;
};
const opcionSwitchModoCaptura = (idData) => {
  //params.value.configuracion.modoCaptura = idData;
  paramsEnviar.value.configuraciones.modoCaptura = idData;
};
const opcionSwitchGeneraOficio = (idData) => {
  //params.value.configuracion.generaNumeroOficio = idData;
  paramsEnviar.value.configuraciones.generaNumeroOficio =idData;
};
const opcionTxtAreaNotas = (idData) => {
  params.value.notas = idData;
  paramsEnviar.value.notas = idData;
};
const opcionDateDocumento = (date, campoValido) => {
  params.value.fechaDocumento = date;
  if (date == 0) {
    form.inputfechaCreacion = false;
  } else {
    form.inputfechaCreacion = campoValido;
  }
};
const opcionCheckPrioridad = (opcionCheck) => {
  //params.value.tipoPrioridad = opcionCheck;
  paramsEnviar.value.tipoPrioridad = opcionCheck;
  if (opcionCheck == 0) {
    form.chkPrioridad = false;
  } else {
    form.chkPrioridad = true;
  }
};
const opcionDateLimiteFirma = (date, campoValido) => {
    //params.value.fechaLimiteFirma = date;
    paramsEnviar.value.fechaLimiteFirma = date;
//   if (date == 0) {
//     form.inputfechaCreacion = false;
//   } else {
//     form.inputfechaCreacion = campoValido;
//   }
};

/* FIN Set params */

let certificadoModal = ref(null);
let modalCamposRequeridos = ref(null);
let addExpedienteModal = ref(null);
let modalEmpDuplicado = ref(null);
const arrayCampos = ref([]);

const submit_formulario = () => {
   arrayCampos.value = [];

   //verifica que no este vacio
       if (form.selectDestino == undefined) {
         form.selectDestino = false;
       }
       if (form.selectTipoDocumento == undefined) {
         form.selectTipoDocumento = false;
       }
       if (form.inputfechaCreacion == undefined) {
         form.inputfechaCreacion = false;
       }
       if (form.inputNumExpediente == undefined) {
         form.inputNumExpediente = false;
       }
      //  if (form.inputNombreExpediente == undefined) {
      //    form.inputNombreExpediente = false;
      //  }
       if (form.inputAsuntoDoc == undefined) {
         form.inputAsuntoDoc = false;
       }
      //  if (form.inputElaboro == undefined) {
      //    form.inputElaboro = false;
      //  }
       if(form.tablaFirmantes == undefined){
        form.tablaFirmantes =  false;
       }
       if(form.tablaDestinatarios == undefined){
        form.tablaDestinatarios =  false;
       }
       if (form.txtAreaContenido == undefined) {
         form.txtAreaContenido = false;
       }
      if (form.chkPrioridad == undefined) {
         form.chkPrioridad = false;
       }
       if (form.inputPDF == undefined) {
         form.inputPDF = false;
       }
       if(!selected_file.value != null){
         is_submit_form_doc.value = true;
       }

      //Alerts
       if (!form.selectDestino) {
         arrayCampos.value.push("Destino de documento");
       }
       if (!form.selectTipoDocumento) {
         arrayCampos.value.push("Tipo de documento");
       }
       if (!form.inputfechaCreacion) {
         arrayCampos.value.push("Fecha de documento");
       }
       if (!form.inputNumExpediente) {
         arrayCampos.value.push("Número de Expediente");
       }
      //  if (!form.inputNombreExpediente) {
      //    //descripcion del expediente
      //    arrayCampos.value.push("Nombre de Expediente");
      //  }
       if (!form.inputAsuntoDoc) {
         arrayCampos.value.push("Asunto");
       }
      //  if (!form.inputElaboro) {
      //    arrayCampos.value.push("Elaboró");
      //  }
       if(!form.tablaFirmantes){
        arrayCampos.value.push("Lista de Firmante(s)");
       }
       if(!form.tablaDestinatarios){
        arrayCampos.value.push("Lista de Destinatario(s)");
       }
       if (!form.txtAreaContenido) {
         arrayCampos.value.push("Contenido");
       }
       if (!form.chkPrioridad) {
         arrayCampos.value.push("Prioridad");
       }
       if (!form.inputPDF) {
         arrayCampos.value.push("Documento(s) a firmar");
       }

       if(empleadosRepetidos.value != null){
        if(empleadosRepetidos.value.length > 0){
          arrayCampos.value.push("Al menos un usuario está registrado tanto en la lista de firmantes como en la lista de destinatarios");
        }
        }
       if (!arrayCampos.value.length == 0) {
         modalCamposRequeridos.show();
       } else {
     certificadoModal.show();
     }
};
/* Fecha del documento y fecha limite */
    let dt = new Date();
    params.value.fechaDocumento = JSON.parse(JSON.stringify(dt));
//   dt.setDate(dt.getDate() + 5);
//   params.value.configuracion.fechaLimite = dt;
const catDisponible = ref(false);
const headerData = ref(null);
onMounted(async() => {
  initPopup();
  decodeToken();
  //bind_data();
  catNuevoDoc.value = await obtenerCatNuevoDoc(urlNewDoc);
  //console.log(catNuevoDoc.value.data);
  catGruposFirmante.value = await obtenerCatalogos(import.meta.env.VITE_CAT_GET_GRUPOS_FIR);
  catGruposDestinatario.value = await obtenerCatalogos(import.meta.env.VITE_CAT_GET_GRUPOS_DES);
  catDestino.value = catNuevoDoc.value.data.catDestino;
  catTipoDocumento.value = catNuevoDoc.value.data.catTipoDocumento;
  catInstruccion.value = catNuevoDoc.value.data.catInstruccionFirmantes;
  catPrioridad.value = catNuevoDoc.value.data.catPrioridad;
  catInstruccionDest.value =  catNuevoDoc.value.data.catInstruccionDestinatarios;
  setTimeout(()=>{
    catDisponible.value = true;
  }, 10);
});
const documentos = ref([]);
/* Obtener documentos */
const change_file = async(event) => {
  //console.log("FILES",event.target.files)
  //selected_file.value = event.target.files[0];
  //params.value.documentos = selected_file.value;
  paramsEnviar.value.documentosAdjuntos = [];
  documentos.value = [];
  selected_file.value = event.target.files;
  //console.log(selected_file)

  for (let i = 0; i < selected_file.value.length; i++) {
    //console.log(selected_file.value[i].name);
    documentos.value.push(selected_file.value[i].name);
    const docFileObj = await getMimeTypeAndArrayBufferFromFile_v2(selected_file.value[i]);
    //console.log(docFileObj)
    let objeto = {
      fileType: 'PDF',
      docBase64: docFileObj.base64
    }
    //params.value.documentos.push(objeto);
    paramsEnviar.value.documentosAdjuntos.push(objeto);
  }
  //certificado.value.documento = event.target.files[0];
  certificado.value.documento = event.target.files;
  form.inputPDF = true;
};

/* Modal firmar ahora */
const archivoEsCer = ref(false);
const change_file_cer = (event) => {
  selected_file_cer.value = event.target.files[0];
  certificado.value.archivoCer = selected_file_cer.value;
  is_submit_form_cer.value = false;
  alertFirma.value = false;

  const inputElement = document.getElementById("formFileCer");
  const nombreArchivo = inputElement.value.toLowerCase();

  if (nombreArchivo.endsWith(".cer")) {
    archivoEsCer.value = true;
  } else {
    archivoEsCer.value = false;
  }
};
const change_file_key = (event) => {
  selected_file_key.value = event.target.files[0];
  certificado.value.archivoKey = selected_file_key.value;
  is_submit_form_key.value = false;
  alertFirma.value = false;
};

const setContrasena = (contrasena) => {
  //console.log("constraseña" + contrasena.value);
  certificado.value.contrasenaCer = contrasena.value;
  is_submit_form_pass.value = true;
  alertFirma.value = false;
};

//Firma de Documento
const enviaModoFirma = async() => {
  loadFirma.value = true;
  certificadoModal.hide();
  console.log('enviar enviaModoFirma---------');
  //let urlAltaDoc = urlPKI + "/api/documento/alta-documento";
  let urlAltaDoc = urlPKI + "/api/documento/alta-documento-modo-firmar-ahora";
  const post = {
    /*"folio": paramsEnviar.value.folio,*/
    "folioEspecial": paramsEnviar.value.folioEspecial,
    "numExpediente": paramsEnviar.value.numExpediente,
    "tipoDestino": paramsEnviar.value.tipoDestino,
    "tipoDocumento": paramsEnviar.value.tipoDocumento,
    "tipoPrioridad": paramsEnviar.value.tipoPrioridad,
    "asunto": paramsEnviar.value.asunto,
    "contenido": paramsEnviar.value.contenido,
    "notas": paramsEnviar.value.notas,
    "fechaLimiteFirma": paramsEnviar.value.fechaLimiteFirma,
    "configuraciones":[
        {
            "config": paramsEnviar.value.configuraciones.ordenFirma,
            "atributo": "FIRM"
        },
        {
            "config": paramsEnviar.value.configuraciones.modoCaptura,
            "atributo":"MODCAP"
        },
        {
            "config": paramsEnviar.value.configuraciones.generaNumeroOficio,
            "atributo":"GNUMOF"
        }
    ],
    "notificaciones":[],
    //"enOrden": true,
    "enOrden": paramsEnviar.value.configuraciones.ordenFirma,
    "firmantes": paramsEnviar.value.firmantes,
    "destinatarios":paramsEnviar.value.destinatarios,
    "documentosAdjuntos":paramsEnviar.value.documentosAdjuntos
}
  console.log("Firmar",post);
            try {
             const axiosInstance = axios.create({
                "Access-Control-Allow-Origin": "*",
            });
              await axios.post(urlAltaDoc, post, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
                console.log(response);
                if(response.data.status === 'fail'){
                   showMessage(response.data.message, 'error');
                   loadFirma.value = false;
                 }else{
                   enviaFirma();
                 }
               });
            
            } catch (error) {
              console.log(error)
            }
};

/* Guarda Captura */
const enviaCaptura = async() => {
  loadFirma.value = true;
  let urlAltaDoc = urlPKI + "/api/documento/alta-documento-modo-captura";
  const post = {
    /*"folio": paramsEnviar.value.folio,*/
    "folioEspecial": paramsEnviar.value.folioEspecial,
    "numExpediente": paramsEnviar.value.numExpediente,
    "tipoDestino": paramsEnviar.value.tipoDestino,
    "tipoDocumento": paramsEnviar.value.tipoDocumento,
    "tipoPrioridad": paramsEnviar.value.tipoPrioridad,
    "asunto": paramsEnviar.value.asunto,
    "contenido": paramsEnviar.value.contenido,
    "notas": paramsEnviar.value.notas,
    "fechaLimiteFirma": paramsEnviar.value.fechaLimiteFirma,
    "configuraciones":[
        {
            "config": paramsEnviar.value.configuraciones.ordenFirma,
            "atributo": "FIRM"
        },
        {
            "config": paramsEnviar.value.configuraciones.modoCaptura,
            "atributo":"MODCAP"
        },
        {
            "config": paramsEnviar.value.configuraciones.generaNumeroOficio,
            "atributo":"GNUMOF"
        }
    ],
    "notificaciones":[],
    //"enOrden": true,
    "enOrden": paramsEnviar.value.configuraciones.ordenFirma,
    "firmantes": paramsEnviar.value.firmantes,
    "destinatarios":paramsEnviar.value.destinatarios,
    "documentosAdjuntos":paramsEnviar.value.documentosAdjuntos
}
   console.log("Guardar",post);
            try {
                await axios.post(urlAltaDoc, post, {headers:{
                 "Authorization": `Bearer ${token}`,
                 "Content-Type": "application/json"
               }}).then((response) => {
                 if(response.data.status === 'fail'){
                   loadFirma.value = false;
                   showMessage(response.data.message, 'error');
                 }else{
                   loadFirma.value = false;
                   showAlert('guardar');
                 }
                });
            } catch (error) {
              console.log(error)
            }
};
/* Envia documento a firma */
const enviaFirma = async () => {
  console.log("certificado");
  const certFileData = {
                        file: certificado.value.archivoCer,
                        buffer: null,
                        base64: null,
                        iscer: archivoEsCer.value,
                      };
  const pfxFileData = {
                        file: certificado.value.archivoCer,
                        buffer: null,
                        base64: null,
                        iscer: archivoEsCer.value,
                      };
  const keyFileData = {
                        file: certificado.value.archivoKey,
                        buffer: null,
                        base64: null,
                      };
  const docFileData = {
                        file: certificado.value.documento,
                        buffer: null,
                        base64: null,
                      };

  //getCertificadoData( certFileData, keyFileData, docFileData, certificado.value.contrasenaCer );
  
  if(certFileData.file!=null){
    const certFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
    const keyFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoKey);
    const codigoFirmaAplicada = 'Firmado';
    let countDoc = 0;
    let logArray = certificado.value.documento.length;
    for (let i = 0; i < logArray; i++) {
      const pdfFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento[i]);
      const resultado = await main_cer(certFileObj.base64, keyFileObj.base64, certificado.value.contrasenaCer, pdfFileObj.base64, codigoFirmaAplicada, token, null);
       if(resultado){
         countDoc ++;
       }else{
        loadFirma.value = false;
       }
       if (i === logArray - 1) {
        loadFirma.value = false;
        showAlert('firmar',countDoc);
      }
    }

  }else if(pfxFileData.file!=null){
    const pfxFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
    const pdfFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento);
    const codigoFirmaAplicada = 'Firmado';
    console.log(certificado.value.contrasenaCer);
    console.log(token);
    main_pfx(pfxFileObj.base64, certificado.value.contrasenaCer, pdfFileObj.base64, codigoFirmaAplicada, token, null);
    
  }

//  certificadoModal.hide();

};

function arrayBufferToBase64(arrayBuffer) {
  const binary = new Uint8Array(arrayBuffer);
  let base64 = '';
  binary.forEach((byte) => {
    base64 += String.fromCharCode(byte);
  });
  return btoa(base64);
}

async function getMimeTypeAndArrayBufferFromFile_v2(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      const base64 = arrayBufferToBase64(arrayBuffer);
      const uint8 = new Uint8Array(arrayBuffer);
      //const blob = new Blob([arrayBuffer]);
      //console.log(base64);
      resolve({
        //mimeType: blob.type,
        arrayBuffer: arrayBuffer,
        base64: base64,
        uint8: uint8
      });
    };

    fileReader.onerror = () => {
      reject(new Error('No se pudo leer el archivo.'));
    };

    fileReader.readAsArrayBuffer(file);
  });
}


/* Termina Modal firmar ahora */

//Inicializa Modal
const initPopup = () => {
  certificadoModal = new window.bootstrap.Modal(
    document.getElementById("certificadoModal")
  );
  modalCamposRequeridos = new window.bootstrap.Modal(
    document.getElementById("modalCamposRequeridos")
  );
  addExpedienteModal = new window.bootstrap.Modal(
    document.getElementById("addExpedienteModal")
  );
  modalEmpDuplicado = new window.bootstrap.Modal(
    document.getElementById("modalEmpDuplicado")
  );
  
};

const is_submit_form_cer = ref(false);
const is_submit_form_key = ref(false);
const is_submit_form_pass = ref(false);
const is_submit_form_doc = ref(false);
const loadFirma = ref(false);
const alertFirma = ref(false);

const submit_formFirma = async () => {

  if(archivoEsCer.value){
    console.log("SI Es CER");
    is_submit_form_cer.value = true
    is_submit_form_key.value =true
    is_submit_form_pass.value = true
  }else{
    console.log("NO Es PFX");
    is_submit_form_cer.value = true
    is_submit_form_pass.value = true
  }
  
  if(selected_file_cer.value && selected_file_key.value && certificado.value.contrasenaCer
      || !archivoEsCer.value && selected_file_cer.value && certificado.value.contrasenaCer){
    console.log("campos llenos");
    await enviaModoFirma();//here 
    //await enviaFirma();//here
  }
};
const numExpediente = ref(null);
const descExpediente = ref(null);

const addExpediente = async()=>{
  //console.log("agregar expediente");
  let urlExpediente = urlLAR + "/api/agregar-item-catalogo/expedientes";
  const post={
            numExpediente: numExpediente.value,
            descripcion: descExpediente.value
          };
  
          try {
            await axios.post(urlExpediente, post, getAuthorizationHeadersForLaravel(token)).then((response) => {
              //console.log("RESPONSE",response)
              if (confirm(response.data.mensaje)) {
                addExpedienteModal.hide();
              }
            });
            
          } catch (error) {
            console.log("ERROR",error)
            showMessage(error.response.data.mensaje, 'error');
            numExpediente.value = "";
            descExpediente.value = "";
          }
  
};

    const usuarioSesion = ref(null);
    usuarioSesion.value = VueJwtDecode.decode(token);
    //console.log(usuarioSesion.value)

const idEmpleado = ref(null);
const decodeToken = () => {
  //console.log(token)
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //console.log(decodedToken);
  idEmpleado.value = decodedToken.Idempleado;
  //console.log(idEmpleado)
};

//Alerts
  const showAlert = async (tipo,count) => {
    switch(tipo){
    case 'guardar':
      new window.Swal({
          icon: 'success',
          title: 'Guardado',
          text: "Se ha guardado el documento",
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          padding: '2em',
        }).then((result) => {
            if (result.value) {
              router.push('/');
            }
        });
      break;
    case 'firmar':
      new window.Swal({
          icon: 'success',
          title: 'Firmado',
          text: "Se han firmado " + count + " documentos",
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          padding: '2em',
        }).then((result) => {
            if (result.value) {
              router.push('/');
            }
        });
      break;
    default:
      alert("Sin alerta");
      break;
  }
  };
  const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    const cancelar = () => {
      router.push('/');
    };
</script>
<template>
  <div class="layout-px-spacing apps-invoice-add">
    <div class="row invoice layout-top-spacing layout-spacing no-gutters justify-content-center">
      <div class="col-xxl-10 col-12">
        <div class="d-flex justify-content-center m-5" v-if="!catDisponible">
          <div class="spinner-border text-primary" role="status" >
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
        <div class="doc-container" v-if="catDisponible">
          <div class="row">
            <div class="col-lg-12">
              <div class="invoice-content">
                <div class="invoice-detail-body">
                  <div class="invoice-detail-title mb-0">
                    <div class="col-xl-5 invoice-address-company">
                      <h3>Nuevo documento para firma</h3>
                    </div>
                  </div>
                  <!-- Título del documento -->
                  <div class="invoice-detail-total mb-3">
                    <div class="row">
                      <form class="select" novalidate @submit.stop.prevent="submit_formulario" >
                        <div class="row justify-content-between">
                          <div class="col-12 col-md-4">
                            <!-- Verifica que sea del día de hoy en adelante -->
                            <FechaBasica
                                label="Fecha de documento:"
                                :date="params.fechaDocumento"
                                @dateSelected="opcionDateDocumento"
                                :dias="0"
                                :obligatorio="true"
                            ></FechaBasica>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="elaboro"
                              label="Elaboró:"
                              :placeholder="usuarioSesion.sub"
                              :disabled="true"
                              @inputData="opcionInputElaboro"
                            ></InputValidado>
                          </div>
                        </div>
                        <!-- Datos del documento -->
                        <div class="row">
                          <div class="col-12" :class="[otroDocumento ? 'col-lg-4' : 'col-md-6']">
                            <SelectValidado
                              idName="catDestino"
                              label="Destino de documento:"
                              :is_submit_form="is_submit_form"
                              :opciones="catDestino"
                              v-if="catDisponible"
                              @opcionSelect="opcionSelectDestino"
                            ></SelectValidado>
                          </div>
                          <div class="col-12" :class="[otroDocumento ? 'col-lg-4' : 'col-md-6']">
                            <SelectValidado
                              idName="catTipoDocumento"
                              label="Tipo de documento:"
                              :is_submit_form="is_submit_form"
                              :opciones="catTipoDocumento"
                              @opcionSelect="opcionSelectTipoDocumento"
                              v-if="catDisponible"
                            ></SelectValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4" :class="[otroDocumento ? '' : 'd-none']">
                            <InputValidado
                              idName="otroDocumento"
                              label="Otro:"
                              placeholder="Ingresar tipo documento"
                              :disabled="false"
                              @inputData="inputOtroTipDoc"
                            ></InputValidado>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-12" :class="[expDesc ? 'col-md-3' : 'col-md-4']">
                            <InputValidado
                              idName="folioDocumento"
                              label="Folio del documento:"
                              placeholder="---"
                              :disabled="true"
                              @inputData="opcionInputFolioDocumento"
                            ></InputValidado>
                          </div>
                          <div class="col-12" :class="[expDesc ? 'col-md-2' : 'col-md-4']">
                            <InputValidado
                              idName="folio"
                              label="Folio especial:"
                              placeholder="folio"
                              maxlength="50"
                              @inputData="opcionInputFolio"
                            ></InputValidado>
                          </div>
                          <div class="col-12" :class="[expDesc ? 'col-md-3' : 'col-md-3']">
                            <InputAutocompletable
                              idName="numeroExpediente"
                              label="Número de Expediente:"
                              :value="valueExpediente"
                              placeholder="Expediente"
                              @inputData="opcionInputNumeroExpediente"
                            ></InputAutocompletable>
                          </div>
                          <div class="col-12 col-md-3" :class="[expDesc ? '' : 'd-none']">
                            <InputValidado
                              idName="nombreExpediente"
                              label="Nombre de Expediente:"
                              :placeholder="params.nombreExpediente"
                              :disabled="true"
                              @inputData="opcionInputNombreExpediente"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-1 d-flex justify-content-center">
                            <button type="button" class="btn btn-primary mb-1 me-2 mt-2" data-bs-toggle="modal" data-bs-target="#addExpedienteModal">
                                <IconPlus></IconPlus>
                            </button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            <InputValidado
                              idName="asuntoDocumento"
                              label="Asunto:"
                              placeholder="Asunto"
                              maxlength="255"
                              @inputData="opcionInputAsunto"
                            ></InputValidado>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12 col-md-12">
                            <TextAreaValidado
                              label="Contenido:"
                              placeholder="Agregue el contenido"
                              maxlength="2048"
                              @txtArea="opcionInputContenido"
                            ></TextAreaValidado>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <!-- .// Fin del Título del documento -->
                  <!-- Agregar Firmantes -->
                  <TablaAgregar
                    titulo="Agregar Firmantes"
                    id_tabla="firmantes"
                    label="firmante"
                    :thtabla="thFirmantes"
                    :tbTabla="catalogos"
                    :opInstruccion="catInstruccion"
                    :opGrupos="catGruposFirmante"
                    v-if="catDisponible"
                    @tablaFirmantes = "tablaFirmantes"
                  ></TablaAgregar>

                  <!-- Agregar Destinatarios -->
                   <TablaAgregar
                    titulo="Agregar Destinatarios"
                    id_tabla="destinatarios"
                    label="destinatario"
                    :thtabla="thDestinatarios"
                    :tbTabla="catalogos"
                    :opInstruccion="catInstruccionDest"
                    :opGrupos="catGruposDestinatario"
                    v-if="catDisponible"
                    @tablaFirmantes = "tablaDestinatarios"
                  ></TablaAgregar>

                  <!-- ./ Agregar Firmantes -->
                  <div class="invoice-detail-note">
                    <TextAreaNotas
                      label="Notas:"
                      placeholder="Agregue sus observaciones"
                      maxlength="1000"
                      @txtArea="opcionTxtAreaNotas"
                    ></TextAreaNotas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="invoice-actions">
                <div class="">
                  <h4 class="ms-5 mb-3">Configuración</h4>
                  <SwitchRounded
                    class="ms-5"
                    label="Firmar en este orden"
                    id="sw-orden"
                    @chkSwitch="opcionSwitchOrdenFirma"
                  ></SwitchRounded>
                  <SwitchRounded
                    class="ms-5"
                    label="Mantener en modo captura"
                    id="sw-captura"
                    @chkSwitch="opcionSwitchModoCaptura"
                  ></SwitchRounded>
                  <SwitchRounded
                    class="ms-5"
                    label="Generar número de oficio"
                    id="sw-oficio"
                    @chkSwitch="opcionSwitchGeneraOficio"
                  ></SwitchRounded>
                  <CheckGroup
                    label="Prioridad"
                    :opPrioridad="catPrioridad"
                    v-if="catDisponible"
                    @opcionCheck="opcionCheckPrioridad"
                  ></CheckGroup>
                </div>

                <!-- Fecha límite de firma -->
                <!-- Verifica que sea del al menos un día después de hoy en adelante -->
                <div class="invoice-action-tax ms-4">
                  <div class="invoice-action-tax-fields">
                     <div class="row">
                      <div class="col-12 col-sm-8 col-lg-4">
                        <FechaBasica
                            label="Fecha límite de firma:"
                            @dateSelected="opcionDateLimiteFirma"
                            :dias="1"
                            :obligatorio="false"
                        ></FechaBasica>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="invoice-action-discount ms-5">
                  <h4>Documento(s) para firmar</h4>
                  <div class="row">
                    <div class="col-12 col-sm-8 col-lg-6">
                      <div class="mb-3">
                        <label for="formFileMultiple" class="form-label" ></label>
                        <input class="form-control form-control-sm"
                              type="file"
                              id="formFileMultiple"
                              @change="change_file"
                              accept=".pdf"
                              :class="[is_submit_form_doc ? (selected_file ? 'is-valid' : 'is-invalid') : '']"
                              multiple
                        />
                      </div>
                      <ul>
                        <li v-for="doc in documentos"> {{ doc }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="invoice-actions-btn d-flex flex-row-reverse mt-1">
                <div class="invoice-action-btn">
                  <div class="row">
                    <div class="col-xl-4 col-md-4">
                      <a href="javascript:;" class="btn btn-danger btn-send p-3" @click="cancelar()">
                        Cancelar
                      </a>
                    </div>
                    <div class="col-xl-4 col-md-4">
                      <a
                        href="javascript:;"
                        class="btn btn-primary btn-send"
                        @click="enviaCaptura()"
                        >Guardar captura</a
                      >
                    </div>
                    <div class="col-xl-4 col-md-4">
                      <a
                        id="btn-certificado"
                        class="btn btn-secondary btn-send p-3"
                        href="javascript:void(0);"
                        @click="submit_formulario()"
                      >
                        Firmar ahora
                      </a>
                    </div>
                    <!-- Hacer una distincion entre "firmar" y "firmar y enviar" -->
                    <!-- <div class="col-xl-3 col-md-3">
                      <a
                        href="javascript:;"
                        class="btn btn-success btn-download"
                        @click="submit_formulario()"
                      >
                        Enviar a firmantes</a
                      >
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Boton de firmar -->
  <!-- Modal Firmar -->
  <div id="certificadoModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content mailbox-popup">
        <div class="modal-header">
          <h5 class="modal-title">Firma electrónica</h5>
          <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
        </div>
        <div class="modal-body">
          <div class="compose-box">
            <div class="compose-content">
                <form novalidate class="simple-example" @submit.stop.prevent="submit_formFirma">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mb-3">
                            <label for="formFileCer" class="form-label">Archivo de certificado (*.cer o .pfx)</label>
                            <input class="form-control" 
                                    type="file"
                                    id="formFileCer"
                                    @change="change_file_cer"
                                    accept=".cer, .pfx"
                                    :class="[is_submit_form_cer ? (selected_file_cer ? 'is-valid' : 'is-invalid') : '']"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" v-if="archivoEsCer">
                            <div class="mb-3">
                            <label for="formFileKey" class="form-label" >Archivo de certificado (*.key)</label>
                            <input class="form-control"
                                    type="file"
                                    id="formFileKey"
                                    @change="change_file_key"
                                    accept=".key"
                                    :class="[is_submit_form_key ? (selected_file_key ? 'is-valid' : 'is-invalid') : '']"
                            />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label for="contrasenaCer">Contrase&ntilde;a</label>
                            <input v-model="certificado.contrasenaCer" 
                                    id="contrasenaCer" 
                                    type="password" 
                                    class="form-control form-control-sm" 
                                    :class="[is_submit_form_pass ? (certificado.contrasenaCer ? 'is-valid' : 'is-invalid') : '']" 
                            />
                            <!-- <div class="valid-feedback">Looks good!</div> -->
                            <div class="invalid-feedback">Ingresa contrase&ntilde;a</div>
                        </div>
                    </div>
                    <div class="alert alert-light-danger alert-dismissible border-0 mb-4" role="alert" v-if="alertFirma">
                      <strong>Ingrese datos en los campos solicitados.</strong>
                  </div>
                    
                    <div class="row justify-content-end">
                      <div class="col-3">
                        <button type="submit" class="btn mt-2 btn-success btn-send">Firmar</button>
                      </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin Modal Frimar -->
  <!-- Modal campos requeridos -->
  <div class="modal fade" id="modalCamposRequeridos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Campos requeridos</h5>
          <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close" ></button>
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
          <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Expediente -->
<div class="modal fade" id="addExpedienteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar nuevo expediente</h5>
                <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-4">
                    <label class="col-form-label col-form-label-sm pb-0" for="add_expediente">Número de expediente</label>
                    <div>
                        <input v-model="numExpediente" type="text" id="add_expediente" class="form-control form-control-sm" placeholder="número de expediente" />
                    </div>
                </div>
                <div class="mb-4">
                    <label class="col-form-label col-form-label-sm pb-0" for="add_desc_expediente">Descripción del expediente</label>
                    <div>
                        <input v-model="descExpediente" type="text" id="add_desc_expediente" class="form-control form-control-sm" placeholder="Descripción de expediente" />
                    </div>
                </div>
                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i>Cancelar</button>
                <button type="button" class="btn btn-primary" @click="addExpediente()">Crear</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Firmante-Destinatario duplicado -->
<div class="modal fade" id="modalEmpDuplicado" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Empleado duplicado</h5>
          <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close" ></button>
        </div>
        <div class="modal-body">
          <p class="modal-text">
            No es posible asignar doble función,firmante y destinatario, a un empleado simultaneamente.
          </p>
          <div class="toast-body text-dark">
            <ul>
              <li v-for="empleado in empleadosRepetidos">
                {{ empleado.usuario.nombre }} {{ empleado.usuario.apellido1 }} {{ empleado.usuario.apellido2 }}
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Spinner Firmando -->
  <div id="spinner-overlay" class="z-3 position-fixed top-50 start-50 translate-middle p-5 rounded-3 d-flex justify-content-center align-items-center" v-if="loadFirma">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Firmando...</span>
      </div>
    </div>
  <!-- Termina Spinner -->
</template>
<style>
/* .custom-alert-1 {
    background-color: #194891;
    border-color: #759090;
    border-radius: 5px;
    color: #fff;
} */
#spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1050;
}
</style>
