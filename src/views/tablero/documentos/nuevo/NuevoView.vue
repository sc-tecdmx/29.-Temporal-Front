<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from 'axios';
import "@/assets/sass/apps/invoice-add.scss";
//-----------------------
import "@/assets/sass/forms/file-upload-with-preview.min.css";
import "@/assets/sass/forms/custom-flatpickr.css";
import { useMeta } from "@/composables/use-meta";
/** Multiselect */
import "@/assets/sass/scrollspyNav.scss";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
//flatpickr
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "@/assets/sass/forms/custom-flatpickr.css";

//Componentes
import TablaAgregar from "@/components/wrapper/TablaAgregar.vue";
import TextAreaValidado from "@/components/wrapper/TextAreaValidado.vue";
import TextAreaNotas from "@/components/wrapper/TextAreaNotas.vue";
import FechaBasica from "@/components/wrapper/FechaBasica.vue";
import SwitchRounded from "@/components/wrapper/SwitchRounded.vue";
import SelectValidado from "@/components/wrapper/SelectValidado.vue";
import InputValidado from "@/components/wrapper/InputValidado.vue";
import CheckGroup from "@/components/wrapper/CheckGroup.vue";

//Iconos
import IconPlus from '../../../../components/icons/IconPlus.vue'
//Firma
import { getCertificadoData } from "@/firma/main.mjs";
import { getMimeTypeAndArrayBufferFromFile } from "@/firma/main.mjs";
//Composable
import { useGetData } from "@/composables/getData";

//useMeta({ title: 'Vue Multiselect' });
/** ./Multiselect */
useMeta({ title: "Nuevo documento" });

const catalogos = ref({});
const catDestino = ref({});
const catTipoDocumento = ref({});
const catInstruccion = ref({});
const catPrioridad = ref({});

const token = "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2OTk0MjY1OTMsImlzcyI6Imh0dHBzOi8vd3d3LnRlY2RteC5vcmcubXgvIiwic3ViIjoib3RpbGlvLmhlcm5hbmRlekB0ZWNkbXgub3JnLm14IiwiZXhwIjoxNzAwMjkwNTkzfQ.4-0_ZwAK5lrOFoeQpa0NB3hF4374IrUQ1dbrYD1fwKVDfpK6F7ukhAF0KYnFwfS2-ZfnKVdCu5zFvQTlcq6Csw"
 const bind_data = () => {
           const axiosInstance = axios.create({
               "Access-Control-Allow-Origin": "*",
           });

          const datosTabla = async () => {
              const url = "http://127.0.0.1:8083/api/get-catalogo-pantalla/nuevo-documento";
              try {
                  const { data } = await axios.get(url, {headers:{"Authorization": `Bearer ${token}`}});
                  //catalogos.value = data;
                  //console.log("AXIOS:" + catalogos.value);
                  catDestino.value = data.data.catDestino;
                  catTipoDocumento.value = data.data.catTipoDocumento;
                  catInstruccion.value = data.data.catInstruccion;
                  catPrioridad.value = data.data.catPrioridad;
                  setTimeout(()=>{
                      catDisponible.value = true;
                    }, 10);
              } catch (error) {
                  console.log(error);
              }
          };
          
          datosTabla();
 };

 const getExpediente = async (num_exp) => {
              const url_exp = "http://127.0.0.1:8083/api/autocompletado?query="+ num_exp;
              //console.log(url_exp)
              
              try {
                  const { data } = await axios.get(url_exp, {headers:{"Authorization": `Bearer ${token}`}});
                  //console.log(data);
                  params.value.nombreExpediente = data[0];
                  //console.log("params",params.value.nombreExpediente)
              } catch (error) {
                  console.log(error);
              }
          };

 //bind_data();
  //  console.log("CAT: ", catalogos);
  //  console.log("CATDEST", catDestino);
  //  console.log("CATTIPDOC", catTipoDocumento);
  //  console.log("CATINSTRUC", catInstruccion);

  

/* Variable para Catálogos */

const thFirmantes = ["Nombre", "Instrucción","Estado","Editar", ""];
//const thFirmantes = ["Nombre", "Instrucción", "Prioridad","Estado","Editar", ""];
const thDestinatarios = ["Nombre", "Instrucción","Estado","Editar", ""];
//const thDestinatarios = ["Nombre", "Instrucción", "Prioridad","Estado","Editar", ""];

/* Fin catálogos */

/* ..// Select 2 */
const items = ref([]);
const selected_file = ref(null);
const selected_file_cer = ref(null);
const selected_file_key = ref(null);
const contrasenaCer = ref(null);

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
  fechaLimiteFirma: "",
  configuraciones: {
    ordenFirma: "",
    modoCaptura: "",
    generaNumeroOficio: "",
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
const formFirma = ref({
    name:''
});
const is_submit_form = ref(false);

/* Set params */
const opcionSelectDestino = (idOpcion, campoValido) => {
  //params.value.tipoDestino = idOpcion;
  paramsEnviar.value.tipoDestino = idOpcion;
  if (idOpcion == 0) {
    form.selectDestino = false;
  } else {
    form.selectDestino = campoValido;
  }
};
const opcionSelectTipoDocumento = (idOpcion, campoValido) => {
  //params.value.tipoDocumento = idOpcion;
  paramsEnviar.value.tipoDocumento = idOpcion;
  if (idOpcion == 0) {
    form.selectTipoDocumento = false;
  } else {
    form.selectTipoDocumento = campoValido;
  }
};
// const opcionInputIdDocumento = (idData, campoValido) => {
//   params.value.idDocumento = idData;
//   if (idData == 0) {
//     form.inputIdDocumento = false;
//   } else {
//     form.inputIdDocumento = campoValido;
//   }
// };
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
  //params.value.numExpediente = idData;
  paramsEnviar.value.numExpediente = idData;
  getExpediente(idData);
  if (idData == 0) {
    form.inputNumExpediente = false;
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
const tablaFirmantes = (data, campoValido) => {
  //params.value.firmantes = data;
  paramsEnviar.value.firmantes = data;
   if (data == 0) {
     form.tablaFirmantes = false;
   } else {
     form.tablaFirmantes = campoValido;
   }
};
const tablaDestinatarios = (data, campoValido) => {
  //params.value.destinatarios = data;
  paramsEnviar.value.destinatarios = data;
  if (data == 0) {
     form.tablaDestinatarios = false;
   } else {
     form.tablaDestinatarios = campoValido;
   }
};
const opcionSwitchOrdenFirma = (idData) => {
  //params.value.configuracion.ordenFirma = idData;
  paramsEnviar.value.configuraciones.ordenFirma
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
       if (form.inputElaboro == undefined) {
         form.inputElaboro = false;
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

    //  //Alerts
       if (!form.selectDestino) {
         arrayCampos.value.push("Destino de Oficio");
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
       if (!form.inputElaboro) {
         arrayCampos.value.push("Elaboró");
       }
       if(!form.tablaFirmantes){
        arrayCampos.value.push("Lista de Firmante(s)");
       }
       if(!form.tablaDestinatarios){
        arrayCampos.value.push("Lista de Destinatario(s)");
       }
       if (!form.txtAreaContenido) {
         arrayCampos.value.push("Contenido:");
       }
       if (!form.chkPrioridad) {
         arrayCampos.value.push("Prioridad");
       }
       if (!form.inputPDF) {
         arrayCampos.value.push("Documento(s) a firmar");
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
onMounted(async() => {
  initPopup();
  bind_data();
});

/* Obtener documentos */
const change_file = async(event) => {
  //selected_file.value = event.target.files[0];
  //params.value.documentos = selected_file.value;
  selected_file.value = event.target.files;
  //console.log(selected_file)

  for (let i = 0; i < selected_file.value.length; i++) {
    //console.log(selected_file.value[i]);
    const docFileObj = await getMimeTypeAndArrayBufferFromFile(selected_file.value[i]);
    let objeto = {
      fileType: 'PDF',
      docBase64: docFileObj.base64
    }
    params.value.documentos.push(objeto);
  }
  certificado.value.documento = selected_file.value;
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

/* Guarda Captura */
const enviaCaptura = () => {
  console.log("Captura");
  console.log("PARAM", params.value);
  console.log("ENVIAR", paramsEnviar.value);

  let urlAltaDoc = "http://localhost:8081/api/documento/alta-documento";
  // const post= {
  //   folio: paramsEnviar.value.folio,
  //   folioEspecial: paramsEnviar.value.folioEspecial,
  //   numExpediente: paramsEnviar.value.numExpediente,
  //   tipoDestino: paramsEnviar.value.tipoDestino,
  //   tipoDocumento: paramsEnviar.value.tipoDocumento,
  //   tipoPrioridad: paramsEnviar.value.tipoPrioridad,
  //   asunto: paramsEnviar.value.asunto,
  //   contenido: paramsEnviar.value.contenido,
  //   fechaLimiteFirma: paramsEnviar.value.fechaLimiteFirma,
  //   configuraciones: paramsEnviar.value.configuraciones,
  //   notificaciones:[],
  //   enOrden: true,
  //   firmantes: [{
  //     secuencia: paramsEnviar.value.firmantes[0].secuencia,
  //     idEmpleado:paramsEnviar.value.firmantes[0].id_empleado,
  //     idUsuario:"",
  //     fechaLimite:paramsEnviar.value.fechaLimiteFirma,
  //     instruccion:paramsEnviar.value.firmantes[0].instruccion,
  //     tipoFirma: "Firma"
  //   },],
  //   destinatarios: [{
  //     idEmpleado:paramsEnviar.value.destinatarios[0].id_empleado,
  //     instruccion:paramsEnviar.value.destinatarios[0].instruccion
  //   }],
  //   documentosAdjuntos: params.value.documentos
  // };
  const post = {
    "folio": paramsEnviar.value.folio,
    "folioEspecial": paramsEnviar.value.folioEspecial,
    "numExpediente": paramsEnviar.value.numExpediente,
    "tipoDestino": paramsEnviar.value.tipoDestino,
    "tipoDocumento": paramsEnviar.value.tipoDocumento,
    "tipoPrioridad": paramsEnviar.value.tipoPrioridad,
    "asunto": paramsEnviar.value.asunto,
    "contenido": paramsEnviar.value.contenido,
    "fechaLimiteFirma": paramsEnviar.value.fechaLimiteFirma,
    "configuraciones":[{
        "generaNumeroOficio": paramsEnviar.value.configuraciones.generaNumeroOficio,
        "modoCaptura": paramsEnviar.value.configuraciones.modoCaptura,
        "ordenFirma": paramsEnviar.value.configuraciones.ordenFirma
    }],
    "notificaciones":[],
    "enOrden": true,
    "firmantes":[
        {
            "secuencia": paramsEnviar.value.firmantes[0].secuencia,
            "idEmpleado": paramsEnviar.value.firmantes[0].id_empleado,
            "idUsuario": "",
            "fechaLimite": paramsEnviar.value.fechaLimiteFirma,
            "instruccion": paramsEnviar.value.firmantes[0].instruccion,
            "tipoFirma": "Firma"
        }
    ],
    "destinatarios":[
        {
            "idEmpleado": paramsEnviar.value.destinatarios[0].id_empleado,
            "instruccion": paramsEnviar.value.destinatarios[0].instruccion
        }
    ],
    "documentosAdjuntos":[
        {
            "fileType": "PDF",
            "docBase64": params.value.documentos[0].docBase64
        }
    ]
}
  console.log(post)
           try {
               axios.post(urlAltaDoc, post, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
                 console.log(response)
               });
            
           } catch (error) {
             console.log(error)
           }
};
/* Envia documento a firma */
const enviaFirma = () => {
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

  getCertificadoData( certFileData, keyFileData, docFileData, certificado.value.contrasenaCer );

};


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
};

const is_submit_form_cer = ref(false);
const is_submit_form_key = ref(false);
const is_submit_form_pass = ref(false);
const is_submit_form_doc = ref(false);

const alertFirma = ref(false);

const submit_formFirma = () => {

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
    enviaCaptura();
    enviaFirma();
  }
};
const numExpediente = ref(null);
const descExpediente = ref(null);

const addExpediente = async()=>{
  //console.log("agregar expediente");
  let urlExpediente = "http://127.0.0.1:8083/api/agregar-item-catalogo/expedientes";
  const post={
            numExpediente: numExpediente.value,
            descripcion: descExpediente.value
          };
  
          try {
            axios.post(urlExpediente, post, {headers:{"Authorization": `Bearer ${token}`}}).then((response) => {
              console.log(response)
              if (confirm(response.data.mensaje)) {
              addExpedienteModal.hide();
            }
            });
            
          } catch (error) {
            console.log(error)
          }
  
};

</script>
<template>
  <div class="layout-px-spacing apps-invoice-add">
    <div
      class="row invoice layout-top-spacing layout-spacing no-gutters justify-content-center"
    >
      <!--PAO -->
      <div class="col-xxl-10 col-12">
        <!--PAO -->
        <div class="doc-container">
          <div class="row">
            <div class="col-lg-12">
              <div class="invoice-content">
                <div class="invoice-detail-body">
                  <div class="invoice-detail-title mb-0">
                    <div class="col-xl-5 invoice-address-company">
                      <h3>Nuevo documento a firmar</h3>
                    </div>
                  </div>
                  <!-- Título del documento -->
                  <!-- {{ catalogos }} -->
                  <div class="invoice-detail-total mb-3">
                    <div class="row">
                      <form class="select" novalidate @submit.stop.prevent="submit_formulario" >
                        <div class="row justify-content-between">
                          <div class="col-12 col-md-4">
                            <SelectValidado
                              idName="catDestino"
                              label="Destino de oficio:"
                              url="http://localhost/j/documentos/catUso.php"
                              :is_submit_form="is_submit_form"
                              :opciones="catDestino"
                              v-if="catDisponible"
                              @opcionSelect="opcionSelectDestino"
                            ></SelectValidado>
                          </div>
                          
                          <div class="col-12 col-md-6 col-lg-4">
                            <!-- Verifica que sea del día de hoy en adelante -->
                            <FechaBasica
                                label="Fecha de documento:"
                                :date="params.fechaDocumento"
                                @dateSelected="opcionDateDocumento"
                                :dias="0"
                                :obligatorio="true"
                            ></FechaBasica>
                          </div>
                        </div>
                        <!-- Datos del documento -->
                        <div class="row">
                          <div class="col-12 col-md-6 col-lg-4">
                            <SelectValidado
                              idName="catTipoDocumento"
                              label="Tipo de documento:"
                              url="http://localhost/j/documentos/catTipoDocumento.php"
                              :is_submit_form="is_submit_form"
                              :opciones="catTipoDocumento"
                              @opcionSelect="opcionSelectTipoDocumento"
                              v-if="catDisponible"
                            ></SelectValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="folioDocumento"
                              label="Folio del documento:"
                              placeholder="get"
                              :disabled="true"
                              @inputData="opcionInputFolioDocumento"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="folio"
                              label="Folio especial:"
                              placeholder="folio"
                              @inputData="opcionInputFolio"
                            ></InputValidado>
                          </div>
                        </div>
                        <div class="row align-items-center">

                          <div class="col-12 col-md-6 col-lg-5">
                            <InputValidado
                              idName="numeroExpediente"
                              label="Número de Expediente:"
                              placeholder="Expediente"
                              @inputData="opcionInputNumeroExpediente"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-5">
                            <InputValidado
                              idName="nombreExpediente"
                              label="Nombre de Expediente:"
                              :placeholder="params.nombreExpediente"
                              :disabled="true"
                              @inputData="opcionInputNombreExpediente"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-2 d-flex justify-content-center">
                            <button type="button" class="btn btn-primary mb-2 me-2 mt-2" data-bs-toggle="modal" data-bs-target="#addExpedienteModal">
                                <IconPlus></IconPlus>
                            </button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12 col-md-6">
                            <InputValidado
                              idName="asuntoDocumento"
                              label="Asunto:"
                              placeholder="Asunto"
                              @inputData="opcionInputAsunto"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-6">
                            <InputValidado
                              idName="elaboro"
                              label="Elaboró:"
                              placeholder="Otilio Esteban Hernández Pérez"
                              :disabled="true"
                              @inputData="opcionInputElaboro"
                            ></InputValidado>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12 col-md-12">
                            <TextAreaValidado
                              label="Contenido:"
                              placeholder="Agregue el contenido"
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
                    url="http://localhost/j/documentos/catFirmantes.php"
                    :thtabla="thFirmantes"
                    :tbTabla="catalogos"
                    :opInstruccion="catInstruccion"
                    v-if="catDisponible"
                    @tablaFirmantes = "tablaFirmantes"
                  ></TablaAgregar>

                  <!-- Agregar Destinatarios -->
                   <TablaAgregar
                    titulo="Agregar Destinatarios"
                    id_tabla="destinatarios"
                    url="http://localhost/j/documentos/catFirmantes.php"
                    :thtabla="thDestinatarios"
                    :tbTabla="catalogos"
                    :opInstruccion="catInstruccion"
                    v-if="catDisponible"
                    @tablaFirmantes = "tablaDestinatarios"
                  ></TablaAgregar>

                  <!-- ./ Agregar Firmantes -->
                  <div class="invoice-detail-note">
                    <TextAreaNotas
                      label="Notas:"
                      placeholder="Agregue sus observaciones"
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
                    url="http://localhost/j/cat_prioridad.php"
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
                <!-- {{ params }} -->

                <div class="invoice-action-discount ms-5">
                  <h4>Documento(s) a firmar</h4>
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
                    </div>
                  </div>
                </div>
              </div>

              <div class="invoice-actions-btn d-flex flex-row-reverse mt-1">
                <div class="invoice-action-btn">
                  <div class="row">
                    <div class="col-xl-3 col-md-3">
                      <a href="javascript:;" class="btn btn-danger btn-send p-3"
                        >Cancelar</a
                      >
                    </div>
                    <div class="col-xl-3 col-md-3">
                      <a
                        href="javascript:;"
                        class="btn btn-primary btn-send"
                        @click="enviaCaptura()"
                        >Guardar captura</a
                      >
                    </div>
                    <div class="col-xl-3 col-md-3">
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
                    <div class="col-xl-3 col-md-3">
                      <a
                        href="javascript:;"
                        class="btn btn-success btn-download"
                        @click="submit_formulario()"
                      >
                        Firmar y enviar a firmantes</a
                      >
                    </div>
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
                            <label for="contrasenaCer">Contraseña</label>
                            <input v-model="certificado.contrasenaCer" 
                                    id="contrasenaCer" 
                                    type="password" 
                                    class="form-control form-control-sm" 
                                    :class="[is_submit_form_pass ? (certificado.contrasenaCer ? 'is-valid' : 'is-invalid') : '']" 
                            />
                            <!-- <div class="valid-feedback">Looks good!</div> -->
                            <div class="invalid-feedback">Ingresa contraseña</div>
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
</template>
<style></style>
