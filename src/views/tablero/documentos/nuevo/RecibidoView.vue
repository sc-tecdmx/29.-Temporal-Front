<script setup>
import { onMounted, ref } from "vue";
import "@/assets/sass/apps/invoice-preview.scss";
import "@/assets/sass/apps/invoice-add.scss";
import "@/assets/sass/scrollspyNav.scss";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";
import "@/assets/sass/forms/file-upload-with-preview.min.css";
import IconFeatherFileText from "@/components/icons/IconFeatherFileText.vue";

//PDF viewer
import PDF from "pdf-vue3";
import { useRoute, useRouter } from "vue-router";
import { getCertificadoData } from "@/firma/main.mjs";
import { useMeta } from "@/composables/use-meta";
import { useAuthStore } from '@/stores/authStore.js';
import { useCatalogoStore } from "@/stores/catalogoStore.js";
import { useFirmaStore } from "@/stores/firmaStore.js";
import {main_pfx, main_cer} from '@/firmav2/main-refactor.mjs';
//Stores
const catalogoStore = useCatalogoStore();
const authStore = useAuthStore();
const firmaStore = useFirmaStore();

const token = authStore.state.user.token;
useMeta({ title: "Detalle Documento" });

const route = useRoute();
const documento = ref(null);

const columns = ref([]);
const columns2 = ref([]);
const is_submit_form_cer = ref(false);
const is_submit_form_key = ref(false);
const is_submit_form_pass = ref(false);
const is_submit_form_doc = ref(false);
const alertFirma = ref(false);
let certificadoModal = ref(null);
let rechazoModal = ref(null);


const urlDetalle = import.meta.env.VITE_API_LARURL +`/api/documento/${route.params.id}`;

async function obtenerDetalle(url) {
  return await catalogoStore.getDetalleDocumento(url, token);
}

onMounted(async() => {
  bind_data();
  initPopup();
  documento.value = await obtenerDetalle(urlDetalle);
  //console.log(documento.value)
  status_btn();
});
//Inicializa Modal
const initPopup = () => {
   certificadoModal = new window.bootstrap.Modal(document.getElementById("certificadoModal"));
   rechazoModal = new window.bootstrap.Modal(document.getElementById("rechazoModal"));
};
const bind_data = () => {
  columns.value = [
    { key: "firmante", label: "Firmante" },
    { key: "intruccion", label: "Instrucción" },
    //{ key: "estado", label: "Estado" },
  ];

  columns2.value = [
    { key: "destinatario", label: "Destinatario" },
    { key: "instruccion", label: "Instrucción" },
    //{ key: "estado", label: "Estado" },
  ];
};

/* Modal firmar ahora */
const contrasenaCer = ref(null);
const selected_file = ref(null);
const selected_file_cer = ref(null);
const selected_file_key = ref(null);

const certificado = ref({
  archivoCer: "",
  archivoKey: "",
  contrasenaCer: "",
  documento: "",
});
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
};

const setContrasena = (contrasena) => {
  //console.log("constraseña" + contrasena.value);
  certificado.value.contrasenaCer = contrasena.value;
};
/* Termina Modal firmar ahora */

/* Modal Rechazo*/
const motivoRechazo = () => {
  // console.log("motivo rechazo");
  // console.log(documento.value.idDocumento);
  let post ={
      "idDocumento": documento.value.idDocumento,
      "codigoFirmaAplicada": "Rechazado",
      "tipoUsuario": "firmante"
  }
  firmaStore.rechazarDocumento(post,token);
};
/* Termina Modal Rechazo*/

const pathdocumento = ref("");
// const pdf_view = (adjuntos) => {
//   console.log(adjuntos)
//   //pathdocumento.value = path;
// };
const getNombre = (path) => {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1];
  return fileName;
};
const closeModal = () => {
  // Liberar el objeto PDF asignándole null
  pathdocumento.value = null;
};
const submit_formFirma = async () => {

if(archivoEsCer.value){
  //console.log("SI Es CER");
  is_submit_form_cer.value = true
  is_submit_form_key.value =true
  is_submit_form_pass.value = true
}else{
  //console.log("NO Es PFX");
  is_submit_form_cer.value = true
  is_submit_form_pass.value = true
}

if(selected_file_cer.value && selected_file_key.value && certificado.value.contrasenaCer
    || !archivoEsCer.value && selected_file_cer.value && certificado.value.contrasenaCer){
  //await enviaFirma();
  await firmaStore.enviaFirma(
    certificado.value.archivoCer, 
    certificado.value.archivoCer, 
    certificado.value.archivoKey,
    certificado.value.contrasenaCer, 
    documento.value.documentosAdjuntos, 
    archivoEsCer.value,
    token
    );
}
};
// const enviaFirma = async () => {
//   const certFileData = {
//                         file: certificado.value.archivoCer,
//                         buffer: null,
//                         base64: null,
//                         iscer: archivoEsCer.value,
//                       };
//   const pfxFileData = {
//                         file: certificado.value.archivoCer,
//                         buffer: null,
//                         base64: null,
//                         iscer: archivoEsCer.value,
//                       };
//   const keyFileData = {
//                         file: certificado.value.archivoKey,
//                         buffer: null,
//                         base64: null,
//                       };
//   const docFileData = {
//                         file: certificado.value.documento,
//                         buffer: null,
//                         base64: null,
//                       };
  
//    if(certFileData.file!=null){
//      const certFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
//      const keyFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoKey);
//      const codigoFirmaAplicada = 'Firmado';

//      documento.value.documentosAdjuntos.forEach(doc => {
//       const pdfFileObj = doc.docBase64;
//       main_cer(certFileObj.base64, keyFileObj.base64, certificado.value.contrasenaCer, pdfFileObj, codigoFirmaAplicada, token, null);
//     });

//    }else if(pfxFileData.file!=null){
//      const pfxFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
//      const pdfFileObj = documento.value.documentosAdjuntos[0].docBase64;
//      //const pdfFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento);
//      const codigoFirmaAplicada = 'Firmado';
//      main_pfx(pfxFileObj.base64, certificado.value.contrasenaCer, pdfFileObj, codigoFirmaAplicada, token, null);
//      //main_pfx(pfxFileObj.base64, certificado.value.contrasenaCer, pdfFileObj.base64, codigoFirmaAplicada, token, null);
//    }
//   certificadoModal.hide();

// };
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
//botones
const btnEnviar = ref(false);
const btnFirmar = ref(false);
const btnRechazado = ref(false);

const status_btn = () => {
  //revisar 
  //revisar statusFirma
  console.log("Etapa",documento.value.etapaDocumento)
  switch(documento.value.etapaDocumento){
    case 'Creado':
      btnEnviar.value = true;
      btnFirmar.value = false;
      btnRechazado.value = false;
      break;
    case 'Enviado':
      //Si firmante, deshabilitados
      //Si destinatario habilitados
      btnEnviar.value = true;
      btnFirmar.value = true;
      btnRechazado.value = true;
      break;
    case 'En Firma':
      btnEnviar.value = false;
      btnFirmar.value = false;
      btnRechazado.value = false;
      break;
    case 'Rechazado':
      btnEnviar.value = true;
      btnFirmar.value = true;
      btnRechazado.value = true;
      break;
    case 'Terminado':
      btnEnviar.value = true;
      btnFirmar.value = true;
      btnRechazado.value = true;
      break;
    default:
      alert("No se encuentra etapa de documento");
      break;
  }
};
const is_submit_rechazo = ref(false);
const formRechazo = ref({ motivo: '' });
const submit_rechazo = () => {
  is_submit_rechazo.value = true;
        if (formRechazo.value.motivo) {
          let post ={
              "idDocumento": documento.value.idDocumento,
              "codigoFirmaAplicada": "Rechazado",
              "tipoUsuario": "firmante",
              "motivo": formRechazo.value.motivo
          }
          console.log(post)
          //Falta el nuevo servicio que contenga el motivo
          firmaStore.rechazarDocumento(post,token);
        }
        rechazoModal.hide();
    };
</script>
<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-12 col-xxl-10">
      <div class="layout-px-spacing">
        <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="doc-container">
              <div class="d-flex justify-content-center m-5" v-if="!documento">
                <div class="spinner-border text-primary" role="status" >
                    <span class="visually-hidden">Cargando...</span>
                </div>
              </div>
              <div class="row" v-if="documento">
                <div class="col-xl-9">
                  <div class="invoice-container">
                    <div class="invoice-inbox">
                      <div id="ct" class="">
                        <div class="invoice-00001">
                          <div class="content-section">
                            <div class="inv--head-section inv--detail-section">
                              <div class="row">
                                <div class="col-sm-6 col-12 me-auto">
                                  <div class="d-flex">
                                    <h3 class="align-self-center">
                                      {{ documento.asunto }}
                                    </h3>
                                  </div>
                                </div>
                                <div class="col-sm-6 text-sm-end">
                                  <p class="inv-list-number">
                                    <span class="inv-title">Folio : </span>
                                    <span class="inv-number">{{
                                      documento.folioDocumento
                                    }}</span>
                                  </p>
                                </div>

                                <div class="col-sm-6 align-self-center mt-3">
                                  <p class="inv-street-addr">
                                    <b>Destino:</b> {{ documento.tipoDestino }}
                                  </p>
                                  <p class="inv-email-address">
                                    <b>Prioridad:</b> {{ documento.prioridad }}
                                  </p>
                                </div>
                                <div
                                  class="col-sm-6 align-self-center mt-3 text-sm-end"
                                >
                                  <p class="inv-created-date">
                                    <span class="inv-title"
                                      >Fecha del Documento :
                                    </span>
                                    <span class="inv-date">{{
                                      documento.fechaCreacion
                                    }}</span>
                                  </p>
                                  <p class="inv-due-date">
                                    <span class="inv-title"
                                      >Fecha límite :
                                    </span>
                                    <span class="inv-date">{{
                                      documento.fechaLimiteFirma
                                    }}</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="inv--detail-section inv--customer-detail-section">
                              <div class="row">
                                <div class="col-xl-7 col-lg-7 col-md-6 col-sm-4">
                                  <p class="inv-street-addr">
                                    <b>Tipo de documento:</b> {{ documento.tipoDocumento }}
                                  </p>
                                  <p class="inv-street-addr">
                                    <b>Expediente:</b> {{ documento.numExpediente }}
                                  </p>
                                  <!-- <p class="inv-email-address">
                                    <b>Nombre de expediente:</b>
                                    {{ documento.s_descripcion }}
                                  </p> -->
                                </div>

                                <div class="col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12 order-sm-0 order-1" >
                                  <div class="pStyle">
                                    <p>
                                      <span class="inv-subtitle"
                                        ><b>Elaboró: </b></span
                                      >
                                      <span
                                        >{{ documento.nombreEmpleado }}
                                        {{ documento.apellido1Empleado }}
                                        {{ documento.apellido2Empleado }}</span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-sm-12">
                                  <p class="inv-email-address">
                                    <b>Contenido:</b> {{ documento.contenido }}
                                  </p>
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="col-sm-12">
                                  <p class="inv-email-address">
                                    <b>Notas:</b> {{ documento.notas }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="inv--product-table-section">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th v-for="item in columns" :key="item.key" :class="[item.class]" >
                                        {{ item.label }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="firmante in documento.firmantes" :key="firmante.numEmpleado" >
                                      <td>
                                        <div class="fw-bold">{{ firmante.nombre }} {{ firmante.apellido1 }} {{ firmante.apellido2 }}</div>
                                        <div class="ms-2">{{ firmante.area }}</div>
                                        <div class="ms-2">{{ firmante.puesto }}</div>
                                      </td>
                                      <td>
                                        {{ firmante.instruccion }}
                                      </td>
                                      <!-- <td>
                                        {{ firmante.estado }}
                                      </td> -->
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div class="inv--product-table-section">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th
                                        v-for="item in columns2"
                                        :key="item.key"
                                        :class="[item.class]"
                                      >
                                        {{ item.label }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="destinatario in documento.destinatarios"
                                      :key="destinatario.numEmpleado"
                                    >
                                      <td>
                                        <div class="fw-bold">{{ destinatario.nombre }} {{ destinatario.apellido1 }} {{ destinatario.apellido2 }}</div>
                                        <div class="ms-2">{{ destinatario.area }}</div>
                                        <div class="ms-2">{{ destinatario.puesto }}</div>
                                      </td>
                                      <td>
                                        {{ destinatario.instruccion }}
                                      </td>
                                      <!-- <td>
                                        {{ destinatario.estado }}
                                      </td> -->
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div class="inv--note">
                              <div class="row mt-4">
                                <div
                                  class="col-sm-12 col-12 order-sm-0 order-1"
                                >
                                  <p>
                                    Documento adjunto a firmar
                                  </p>
                                  <div v-for="doc in documento.documentosAdjuntos">
                                    <a
                                      href="javascript:;"
                                      class="btn dropdown-toggle btn-icon-only"
                                      @click="pathdocumento = doc.docBase64"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalPDF"
                                    >
                                      <IconFeatherFileText class="me-2"></IconFeatherFileText>
                                      {{ getNombre(doc.documentoPath) }}
                                    </a>
                                    <!-- <PDF :src="doc.docBase64"></PDF> -->
                                  </div>
                                  <!-- <a
                                    href="javascript:;"
                                    class="btn dropdown-toggle btn-icon-only"
                                    @click=" pdf_view( documento.documentosAdjuntos) "
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalPDF"
                                  >
                                    <IconFeatherFileText></IconFeatherFileText>
                                  </a> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3">
                  <div class="invoice-actions-btn">
                    <div class="invoice-action-btn">
                      <div class="row">
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <button
                            href="javascript:;"
                            class="btn btn-primary btn-send btn-accion-enviar"
                            :disabled="btnEnviar"
                            >Enviar/Transferir</button>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#certificadoModal"
                            id="btn-certificado"
                            class="btn btn-success btn-send btn-accion-firmar"
                            :disabled="btnFirmar"
                            href="javascript:void(0);"
                            @click=""
                          >
                            Firmar
                          </button>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#rechazoModal"
                            id="btn-rechazo"
                            class="btn btn-danger btn-send btn-accion-rechazar"
                            :disabled="btnRechazado"
                            href="javascript:void(0);"
                            @click=""
                          >
                            Rechazar
                          </button>
                          <!-- <router-link to="#" class="btn btn-danger btn-edit">Rechazar</router-link> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Boton de firmar -->
                
                <!-- Modal PDF-->
                <div class="modal fade" id="modalPDF" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          data-dismiss="modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          class="btn-close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <PDF :src="pathdocumento"></PDF>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal" @click="closeModal">
                          <i class="flaticon-cancel-12"></i>Cerrar
                        </button>
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
  </div>
  <!-- Modal Firma -->
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
                                    <label for="formFileCer" class="form-label" >Archivo de certificado (*.cer o .pfx)</label>
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
                                    <label for="formFileKey" class="form-label">Archivo de certificado (*.key)</label>
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

                              <div class="form-group row invoice-created-by">
                                <div class="col-sm-12">
                                  <label for="contrasenaCer"
                                    class="col-sm-12 col-form-label col-form-label-sm pb-0"
                                    >Contrase&ntilde;a</label
                                  >
                                  <input
                                    type="password"
                                    v-model="certificado.contrasenaCer"
                                    id="contrasenaCer"
                                    class="form-control form-control-sm"
                                    placeholder="Introduzca su contraseña"
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
                                  <!-- <a
                                    id="btn-modal-firma"
                                    class="btn btn-success btn-send p-3"
                                    href="javascript:void(0);"
                                    @click="enviaFirma()"
                                  >
                                    Firmar
                                  </a> -->
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Termina Modal Firma -->
                <!-- Modal Rechazo -->
                <div id="rechazoModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content mailbox-popup">
                      <div class="modal-header">
                        <h5 class="modal-title">Rechazar documento</h5>
                        <button
                          type="button"
                          data-dismiss="modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          class="btn-close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="compose-box">
                          <div class="compose-content">
                            <form>
                              <div class="row">
                                <div class="col-md-12">
                                  <form novalidate class="simple-example" @submit.stop.prevent="submit_rechazo">
                                      <div class="row">
                                          <div class="col-md-12 form-group">
                                              <label for="fullName">Motivo del rechazo</label>
                                              <input v-model="formRechazo.motivo" id="fullName" type="text" class="form-control form-control-sm" :class="[is_submit_rechazo ? (formRechazo.motivo ? 'is-valid' : 'is-invalid') : '']" />
                                              <!-- <div class="valid-feedback">Looks good!</div> -->
                                              <div class="invalid-feedback">Ingresar el motivo del rechazo</div>
                                          </div>
                                      </div>
                                      <div class="row justify-content-end">
                                        <div class="col-6">
                                          <button id="btn-modal-rechazo" type="submit" class="btn btn-danger btn-send p-3">Rechazar documento</button>
                                        </div>
                                      </div>
                                  </form>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Termina Modal Rechazo -->
</template>
<style>
.pStyle {
  font-size: 13px;
}
.btn-accion-enviar{
  padding: 8px 62px;
  margin-bottom: 20px;
}
.btn-accion-firmar{
  padding: 8px 93px;
  margin-bottom: 20px;
}
.btn-accion-rechazar{
  padding: 8px 85px;
  margin-bottom: 20px;
}
</style>