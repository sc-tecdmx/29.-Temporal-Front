<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
import VueJwtDecode from "vue-jwt-decode";
import "@/assets/sass/apps/invoice-add.scss";
import router from "@/router";
import { useRoute, useRouter } from "vue-router";
//-----------------------
import "@/assets/sass/forms/file-upload-with-preview.min.css";
import { useMeta } from "@/composables/use-meta";
/** Multiselect */
import "@/assets/sass/scrollspyNav.scss";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
//flatpickr
import "flatpickr/dist/flatpickr.css";
import "@/assets/sass/forms/custom-flatpickr.css";
//Stores
import { useAuthStore } from '@/stores/authStore.js';
import { useCatalogoStore } from "@/stores/catalogoStore";
import { useFirmaStore } from "@/stores/firmaStore";
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
import GenericSelect from "@/components/wrapper/GenericSelect.vue";
//Iconos
import IconPlus from '@/components/icons/IconPlus.vue'
import IconFeatherX from '@/components/icons/IconFeatherX.vue'
//Firma
import { main_pfx, main_cer, validationPreviousToStore } from '@/firmav2/main-refactor.mjs';
/** ./Multiselect */
useMeta({ title: "Nuevo documento" });

const route = useRoute();
const documento = ref(null);
const isCaptura = ref(false);
// console.log(`${route.params.id}`)

//Config URLs
const urlPKI = import.meta.env.VITE_API_PKIURL;
const urlLAR = import.meta.env.VITE_API_LARURL;

const catalogos = ref({});
const catDestino = ref({});
const catTipoDocumento = ref([]);
const catInstruccion = ref({});
const catInstruccionDest = ref({});
const catNuevoDoc = ref(null);

const catPrioridad = ref({});
const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const firmaCatalogo = useFirmaStore();
const catGruposFirmante = ref(null);
const catGruposDestinatario = ref(null);
const selected_destino = ref("");
const selected_tipoDoc = ref("");
const urlNewDoc = import.meta.env.VITE_API_LARURL + import.meta.env.VITE_CAT_NUEVO_DOC;
const token = authStore.state.user.token;

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

async function obtenerDetalle(url) {
  return await catalogoStore.getDetalleDocumento(url, token);
}

async function obtenerCatNuevoDoc(url) {
  return await catalogoStore.getNuevoDocumento(url, token);
}
async function obtenerCatalogos(url) {
  return await catalogoStore.getCatalogo(url, token);
}


const catExpedientes = ref([])
const valueExpediente =  ref('');
 const getExpediente = async (num_exp) => {
              const url_exp = urlLAR + "/api/autocompletado?query=" + num_exp;
              try {
                valueExpediente.value = ' ';
                const { data } = await axios.get(url_exp, getAuthorizationHeadersForLaravel(token));
                  //console.log(data);
                  paramsEnviar.value.nombreExpediente = data[0].s_descripcion;
                  valueExpediente.value = data[0].s_num_expediente;
                  catExpedientes.value = data;
              } catch (error) {
                  console.log(error);
                  new window.Swal({
                      icon: 'warning',
                      title: '\u00A1El expediente no existe!',
                      text: "Favor de agregarlo",
                      showCancelButton: false,
                      confirmButtonText: 'Aceptar',
                      padding: '2em',
                  }).then(async(result) => {
                      if (result.value) {
                        expDesc.value = false;
                        valueExpediente.value = '';
                      }
                  });
              }
          };

/* Variable para Catálogos */

const thFirmantes = ["Nombre", "Instrucción","Estado","Editar", ""];
const thDestinatarios = ["Nombre", "Instrucción","Estado","Editar", ""];

/* Fin catálogos */

const selected_file = ref(null);
const selected_file_cer = ref(null);
const selected_file_key = ref(null);

const certificado = ref({
  archivoCer: "",
  archivoKey: "",
  contrasenaCer: "",
  documento: "",
});

/* JSON */
// const params = ref({
//   idDocumento: null,
//   folio:"",
//   folioEspecial:"",
//   numExpediente: "",
//   nombreExpediente:"",
//   tipoDestino: null,
//   tipoDocumento: "",
//   tipoPrioridad: "",
//   asunto: "",
//   contenido: "",
//   fechaLimiteFirma: "",
//   fechaDocumento: "",
//   elaboro: "",
//   notas: "",
//   configuracion: {
//     ordenFirma: false,
//     modoCaptura: false,
//     generaNumeroOficio: false,
//   },
//   firmantes: [
//     //  {
//     //    idFirmante: "",
//     //    firma: "",
//     //    secuencia:"",
//     //  },
//   ],
//   destinatarios: [
//     // {
//     //   idDestinatario: "",
//     //   instruccion: "",
//     // },
//   ],
//   documentos: []
// });
//params enviar
const paramsEnviar = ref({
  idDocumento: null,
  folio:"",
  folioEspecial:"",
  numExpediente: "",
  tipoDestino: null,
  tipoDocumento: null,
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
    //  {
      // secuencia:"",
      // idEmpleado: "",
      // idUsuario:"",
      // //fechaLimite:"2023-10-30T00:17:41.188+00:00",
      // instruccion: "",
      // //tipoFirma:"Firma"
    //  },
  ],
  destinatarios: [
    // {
    //   idEmpleado: "",
    //   instruccion: "",
    // },
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
  inputAsuntoDoc: false,
  inputElaboro: false,
  tablaFirmantes: false,
  tablaDestinatarios: false,
  txtAreaContenido: false,
  chkPrioridad: false,
  inputPDF: false
});

const is_submit_form = ref(false);

/* Set params */
const opcionSelectDestino = (idOpcion, campoValido) => {
  console.log("DEST", idOpcion)
  console.log(campoValido)
  paramsEnviar.value.tipoDestino = idOpcion;
  if (idOpcion == 0) {
    form.selectDestino = false;
  } else {
    form.selectDestino = campoValido;
  }
};
const otroDocumento = ref(false);
const expDesc = ref(false);
const opcionSelectTipoDocumento = (idOpcion, campoValido) => {
  otroDocumento.value = false;
  if(idOpcion.label === 'Otro'){
    otroDocumento.value = true;
  }else{
    paramsEnviar.value.tipoDocumento = idOpcion;
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
  //params.value.tipoDocumento = idOpcion;
  
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
  paramsEnviar.value.nombreExpediente = idData;
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
  paramsEnviar.value.elaboro = idData;
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
   if (data == 0) {
     if(paramsEnviar.value.firmantes.length > 0){
        form.tablaFirmantes = false;
      }
   } else {
     form.tablaFirmantes = campoValido;
   }
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
  isCaptura.value = idData;
  //params.value.configuracion.modoCaptura = idData;
  paramsEnviar.value.configuraciones.modoCaptura = idData;
};
const opcionSwitchGeneraOficio = (idData) => {
  //params.value.configuracion.generaNumeroOficio = idData;
  paramsEnviar.value.configuraciones.generaNumeroOficio =idData;
};
const opcionTxtAreaNotas = (idData) => {
  // params.value.notas = idData;
  paramsEnviar.value.notas = idData;
};
const opcionDateDocumento = (date, campoValido) => {
  paramsEnviar.value.fechaDocumento = date;
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
    paramsEnviar.value.fechaLimiteFirma = date;
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
       if (form.inputAsuntoDoc == undefined) {
         form.inputAsuntoDoc = false;
       }
      
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
       if (!form.inputAsuntoDoc) {
         arrayCampos.value.push("Asunto");
       }
      
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
          arrayCampos.value.push("Al menos un usuaria/o está registrada/o tanto en la lista de firmantes como en la lista de destinatarios");
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
    paramsEnviar.value.fechaDocumento = JSON.parse(JSON.stringify(dt));
//   dt.setDate(dt.getDate() + 5);
//   params.value.configuracion.fechaLimite = dt;
const catDisponible = ref(false);
// const catDisponibleEdit = ref(false);
// const headerData = ref(null);
onMounted(async() => {
  initPopup();
  decodeToken();
   if(`${route.params.id}` != ''){
     getDocCreado();
   }
  catNuevoDoc.value = await obtenerCatNuevoDoc(urlNewDoc);
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

const getDocCreado = async() => {
    
    documento.value = await obtenerDetalle(import.meta.env.VITE_API_LARURL +`/api/documento/${route.params.id}`);
    console.log("Documento creado");
    console.log(documento);

    paramsEnviar.value.idDocumento = documento.value.idDocumento;
    paramsEnviar.value.fechaDocumento = documento.value.fechaCreacion;
    paramsEnviar.value.elaboro = documento.value.nombreEmpleado + " " + documento.value.apellido1Empleado + " " + documento.value.apellido2Empleado
    paramsEnviar.value.folio = documento.value.folioDocumento;
    paramsEnviar.value.folioEspecial = documento.value.folioEspecial;
    paramsEnviar.value.asunto = documento.value.asunto;
    paramsEnviar.value.tipoDestino = documento.value.tipoDestino;
    paramsEnviar.value.tipoDocumento = documento.value.tipoDocumento;
    paramsEnviar.value.contenido = documento.value.contenido;
    paramsEnviar.value.notas = documento.value.notas;
    paramsEnviar.value.tipoPrioridad = documento.value.prioridad;
    paramsEnviar.value.fechaLimiteFirma = documento.value.fechaLimiteFirma;
    paramsEnviar.value.firmantes = documento.value.firmantes;
    paramsEnviar.value.destinatarios = documento.value.destinatarios;
    valueExpediente.value = documento.value.numExpediente;
    paramsEnviar.value.numExpediente = documento.value.numExpediente;
    paramsEnviar.value.nombreExpediente = documento.value.expedienteDes
    expDesc.value = true;

    documento.value.configuracion.forEach(function(elemento) {
      switch (elemento.atributo) {
          case "GNUMOF":
            paramsEnviar.value.configuraciones.generaNumeroOficio = true;
            break;
          case "MODCAP":
            paramsEnviar.value.configuraciones.modoCaptura = true;
            isCaptura.value = true;
            break;
          case "FIRM":
            paramsEnviar.value.configuraciones.ordenFirma = true;
            break;
          default:
              console.log("No existe la opción");
      }
    });
    paramsEnviar.value.documentosAdjuntos = documento.value.documentosAdjuntos
    documento.value.documentosAdjuntos.forEach(function(elemento) {
      let docAdjunto = {
        "docBase64": elemento.docBase64,
        "documentoPath": elemento.documentoPath,
        "fileType": elemento.fileType,
        "hash": elemento.hash,
        "name": getNombre(elemento.documentoPath)
      };
      archivosAdjuntos.value.push(docAdjunto);
     });
    
     console.log("PARAMS",paramsEnviar)
     console.log("FORM", form)
    if(paramsEnviar.value.idDocumento == null){
        form.selectDestino = false;
      }else{
        form.selectDestino = true;
      }
    if(paramsEnviar.value.numExpediente == null){
        form.inputNumExpediente = false;
      }else{
        form.inputNumExpediente = true;
      }
    if(paramsEnviar.value.asunto == null){
        form.inputAsuntoDoc = false;
      }else{
        form.inputAsuntoDoc = true;
      }
    
}
const getNombre = (path) => {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1];
  return fileName;
};
// const documentos = ref([]);
/* Obtener documentos */
const archivosAdjuntos = ref([]);

const change_file = async (event) => {
  const nuevosArchivos = event.target.files;
  for (let i = 0; i < nuevosArchivos.length; i++) {
    const nuevoArchivo = nuevosArchivos[i];
    const archivoExistente = archivosAdjuntos.value.find(
      (archivo) => archivo.name === nuevoArchivo.name
    );
    if (!archivoExistente) {
      archivosAdjuntos.value.push(nuevoArchivo);
      console.log("ARCH--ADJ",archivosAdjuntos)
      certificado.value.documento = archivosAdjuntos.value;
      const docFileObj = await getMimeTypeAndArrayBufferFromFile_v2(nuevoArchivo);
      let objeto = {
        fileType: 'PDF',
        docBase64: docFileObj.base64
      }
     paramsEnviar.value.documentosAdjuntos.push(objeto);
    }
  }
  form.inputPDF = true;
  event.target.value = null;
};
const eliminarArchivo = (index) => {
  archivosAdjuntos.value.splice(index, 1);
  paramsEnviar.value.documentosAdjuntos.splice(index,1);
  certificado.value.documento = archivosAdjuntos.value;
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

//Firma de Documento
const enviaModoFirma = async() => {
  loadFirma.value = true;
  certificadoModal.hide();
  console.log('enviar enviaModoFirma---------');
  let urlAltaDoc = urlPKI + "/api/firma/alta-documento-modo-firmar-ahora";
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

  if (!paramsEnviar.value.tipoDestino) {
    showMessage('Ingresar destino de documento.', 'error');
    return true;
  }
  if (!paramsEnviar.value.tipoDocumento) {
    showMessage('Ingresar tipo de documento.', 'error');
    return true;
  }
  if (!paramsEnviar.value.numExpediente) {
    showMessage('Ingrese número de expediente.', 'error');
    return true;
  }
  if (paramsEnviar.value.firmantes.length == 0) {
    showMessage('Ingresar al menos una persona firmante.', 'error');
    return true;
  }
  if (paramsEnviar.value.destinatarios.length == 0) {
    showMessage('Ingresar al menos una persona destinataria.', 'error');
    return true;
  }
  if (!paramsEnviar.value.tipoPrioridad) {
    showMessage('Seleccione la prioridad del documento.', 'error');
    return true;
  }

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
    "enOrden": paramsEnviar.value.configuraciones.ordenFirma,
    "firmantes": paramsEnviar.value.firmantes,
    "destinatarios":paramsEnviar.value.destinatarios,
    "documentosAdjuntos":paramsEnviar.value.documentosAdjuntos
}
   console.log("Guardar",post);

   if(paramsEnviar.value.idDocumento){
    console.log("POST a enviar",post)
      const responseEdit = await firmaCatalogo.editarDocumento(paramsEnviar.value.idDocumento, post, token);
      console.log("RESP-EDIT", responseEdit)
      if(responseEdit == false){
        setTimeout(()=>{
          loadFirma.value = false;
        }, 5000);
        
      }
   }else{
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
    //console.log("campos llenos");
    const cerFile = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
    const keyFile = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoKey);
    const response = ref(null);

    console.log("CERTIFIC",certificado.value.documento)

     for (let i = 0; i < certificado.value.documento.length; i++) {
       const pdfFile = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento[i]);
       response.value = await validationPreviousToStore(cerFile.base64, keyFile.base64, certificado.value.contrasenaCer, pdfFile.base64, token);
       if(!response.value.data){
         showMessage(response.value.message, 'error');
       }
     }
     console.log("RESPONSE",response)
      if(response.value.data){
        await enviaModoFirma();//here 
        //await enviaFirma();//here
      }
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
                                :date="paramsEnviar.fechaDocumento"
                                @dateSelected="opcionDateDocumento"
                                :dias="0"
                                :obligatorio="true"
                            ></FechaBasica>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="elaboro"
                              label="Elaboró:"
                              :valorInicial="paramsEnviar.elaboro"
                              :placeholder="usuarioSesion.sub"
                              :disabled="true"
                              @inputData="opcionInputElaboro"
                            ></InputValidado>
                          </div>
                        </div>
                        <!-- Datos del documento -->
                        <div class="row">
                          <div class="col-12" :class="[otroDocumento ? 'col-lg-4' : 'col-md-6']">
                            <GenericSelect
                              idName="catDestino"
                              label="Destino de documento:"
                              :items="catDestino"
                              v-if="catDisponible"
                              v-model="selected_destino"
                              keyField="id"
                              value-field="destino"
                              label-field="destino"
                              :value="paramsEnviar.tipoDestino"
                              @opcionSelect="opcionSelectDestino"
                            ></GenericSelect>
                          </div>
                          <div class="col-12" :class="[otroDocumento ? 'col-lg-4' : 'col-md-6']">
                            <GenericSelect
                              idName="catTipoDocumento"
                              label="Tipo de documento:"
                              :items="catTipoDocumento"
                              v-if="catDisponible"
                              v-model="selected_tipoDoc"
                              keyField="id"
                              value-field="id"
                              label-field="tipoDocumento"
                              :value="paramsEnviar.tipoDocumento"
                              @opcionSelect="opcionSelectTipoDocumento"
                            ></GenericSelect>
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
                              :valorInicial="paramsEnviar.folio.toString()"
                              placeholder="---"
                              :disabled="true"
                              @inputData="opcionInputFolioDocumento"
                            ></InputValidado>
                          </div>
                          <div class="col-12" :class="[expDesc ? 'col-md-2' : 'col-md-4']">
                            <InputValidado
                              idName="folio"
                              label="Folio especial:"
                              :valorInicial="paramsEnviar.folioEspecial"
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
                              :placeholder="paramsEnviar.nombreExpediente"
                              :disabled="true"
                              :valorInicial="paramsEnviar.nombreExpediente"
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
                              :valorInicial="paramsEnviar.asunto"
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
                              :valorInicial="paramsEnviar.contenido"
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
                    titulo="Agregar Personas Firmantes"
                    id_tabla="firmantes"
                    label="persona firmante"
                    :thtabla="thFirmantes"
                    :tbTabla="catalogos"
                    :opInstruccion="catInstruccion"
                    :opGrupos="catGruposFirmante"
                    :valorInicial="paramsEnviar.firmantes"
                    v-if="catDisponible"
                    @tablaFirmantes = "tablaFirmantes"
                  ></TablaAgregar>

                  <!-- Agregar Destinatarios -->
                   <TablaAgregar
                    titulo="Agregar Personas Destinatarias"
                    id_tabla="destinatarios"
                    label="persona destinataria"
                    :thtabla="thDestinatarios"
                    :tbTabla="catalogos"
                    :opInstruccion="catInstruccionDest"
                    :opGrupos="catGruposDestinatario"
                    :valorInicial="paramsEnviar.destinatarios"
                    v-if="catDisponible"
                    @tablaFirmantes = "tablaDestinatarios"
                  ></TablaAgregar>

                  <!-- ./ Agregar Firmantes -->
                  <div class="invoice-detail-note">
                    <TextAreaNotas
                      label="Notas:"
                      placeholder="Agregue sus observaciones"
                      :valorInicial="paramsEnviar.notas"
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
                    :valorInicial="paramsEnviar.configuraciones.ordenFirma"
                    @chkSwitch="opcionSwitchOrdenFirma"
                  ></SwitchRounded>
                  <SwitchRounded
                    class="ms-5"
                    label="Mantener en modo captura"
                    id="sw-captura"
                    :valorInicial="paramsEnviar.configuraciones.modoCaptura"
                    @chkSwitch="opcionSwitchModoCaptura"
                  ></SwitchRounded>
                  <SwitchRounded
                    class="ms-5"
                    label="Generar número de oficio"
                    id="sw-oficio"
                    :valorInicial="paramsEnviar.configuraciones.generaNumeroOficio"
                    @chkSwitch="opcionSwitchGeneraOficio"
                  ></SwitchRounded>
                  <CheckGroup
                    label="Prioridad"
                    :picked="paramsEnviar.tipoPrioridad"
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
                            :date="paramsEnviar.fechaLimiteFirma"
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
                              :class="[is_submit_form_doc ? (archivosAdjuntos.length ? 'is-valid' : 'is-invalid') : '']"
                              multiple
                        />
                      </div>
                      <ul>
                        <li v-for="(doc, index) in archivosAdjuntos" :key="index" class="mt-1">
                          {{ doc.name }}
                          <a @click="eliminarArchivo(index)">
                            <IconFeatherX class="icono"/>
                          </a>
                        </li>
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
                        >
                        {{ paramsEnviar.idDocumento ? "Editar captura" : "Guardar captura" }}
                      </a>
                    </div>
                    <div class="col-xl-4 col-md-4">
                      <button
                        id="btn-certificado"
                        class="btn btn-secondary btn-send p-3"
                        href="javascript:void(0);"
                        :disabled="isCaptura"
                        @click="submit_formulario()"
                      >
                        Firmar ahora
                      </button>
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
          <h5 class="modal-title" id="exampleModalLabel">Empleada/o duplicado</h5>
          <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close" ></button>
        </div>
        <div class="modal-body">
          <p class="modal-text">
            No es posible asignar doble función,firmante y destinatario, a un empleada/o simultaneamente.
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
#spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1050;
}

.icono {
    width: 10;
    height: 10;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
</style>
