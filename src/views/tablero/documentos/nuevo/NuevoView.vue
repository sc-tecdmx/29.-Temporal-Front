<script setup>
import { onMounted, ref } from "vue";
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
//Firma
import { getCertificadoData } from "@/firma/main.mjs";

//useMeta({ title: 'Vue Multiselect' });
/** ./Multiselect */
useMeta({ title: "Nuevo documento" });

const inputs = ref({
  input1: [],
  input2: [],
  input3: [],
  input4: [],
  input5: [],
});

/* Variable para Catálogos */

const thFirmantes = ["Nombre", "Firma", "Editar", "Estado", "Obligatorio", ""];
const thDestinatarios = ["Nombre", "Instrucción", "Editar", "Estado", ""];

/* Fin catálogos */

const toggleCode = (name) => {
  if (code_arr.value.includes(name)) {
    code_arr.value = code_arr.value.filter((d) => d != name);
  } else {
    code_arr.value.push(name);
  }
};

const addTag = (newTag) => {
  options4.value.push(newTag);
  inputs.value["input4"].push(newTag);
};

const addTag1 = (tag) => {
  options5.value.push(newTag);
  inputs.value["input5"].push(newTag);
};

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
  idUso: "",
  idtipoDocumento: "",
  idDocumento: "",
  folio: "",
  folioDocumento: "",
  numeroExpediente: "",
  nombreExpediente: "",
  fechaDocumento: "",
  asunto: "",
  elaboro: "",
  contenido: "",
  firmantes: [
    {
      idFirmante: "",
      firma: "",
      obligatorio: "",
      estado: "",
    },
  ],
  destinatarios: [
    {
      idDestinatario: "",
      instruccion: "",
      estado: "",
    },
    {
      idDestinatario: "",
      instruccion: "",
      estado: "",
    },
  ],
  notas: "",
  configuracion: {
    ordenFirma: "",
    modoCaptura: "",
    generaNumeroOficio: "",
    prioridad: "",
    fechaLimite: "",
    documentos: [],
  },
});

const form = ref({
  selectUso: false,
  inputFolio: false,
  selectTipoDocumento: false,
  inputFolio: false,
  inputIdDocumento: false,
  inputFolioDocumento: false,
  inputfechaCreacion: false,
  inputNumExpediente: false,
  inputNombreExpediente: false,
  inputAsuntoDoc: false,
  inputElaboro: false,
  txtAreaContenido: false,
  chkPrioridad: false,
  inputPDF: false
});
const formFirma = ref({
    name:''
});
const is_submit_form = ref(false);

/* Set params */
const opcionSelectUso = (idOpcion, campoValido) => {
  params.value.idUso = idOpcion;
  if (idOpcion == 0) {
    form.selectUso = false;
  } else {
    form.selectUso = campoValido;
  }
};
const opcionSelectTipoDocumento = (idOpcion, campoValido) => {
  params.value.idtipoDocumento = idOpcion;
  if (idOpcion == 0) {
    form.selectTipoDocumento = false;
  } else {
    form.selectTipoDocumento = campoValido;
  }
};
const opcionInputIdDocumento = (idData, campoValido) => {
  params.value.idDocumento = idData;
  if (idData == 0) {
    form.inputIdDocumento = false;
  } else {
    form.inputIdDocumento = campoValido;
  }
};
const opcionInputFolio = (idData, campoValido) => {
  params.value.folio = idData;
  if (idData == 0) {
    form.inputFolio = false;
  } else {
    form.inputFolio = campoValido;
  }
};
const opcionInputFolioDocumento = (idData, campoValido) => {
  params.value.folioDocumento = idData;
  if (idData == 0) {
    form.inputFolioDocumento = false;
  } else {
    form.inputFolioDocumento = campoValido;
  }
};
const opcionInputNumeroExpediente = (idData, campoValido) => {
  params.value.numeroExpediente = idData;
  if (idData == 0) {
    form.inputNumExpediente = false;
  } else {
    form.inputNumExpediente = campoValido;
  }
};
const opcionInputNombreExpediente = (idData, campoValido) => {
  params.value.nombreExpediente = idData;
  if (idData == 0) {
    form.inputNombreExpediente = false;
  } else {
    form.inputNombreExpediente = campoValido;
  }
};
const opcionInputAsunto = (idData, campoValido) => {
  params.value.asunto = idData;
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
  params.value.contenido = idData;
  if (idData == 0) {
    form.txtAreaContenido = false;
  } else {
    form.txtAreaContenido = campoValido;
  }
};
const opcionSwitchOrdenFirma = (idData) => {
  params.value.configuracion.ordenFirma = idData;
};
const opcionSwitchModoCaptura = (idData) => {
  params.value.configuracion.modoCaptura = idData;
};
const opcionSwitchGeneraOficio = (idData) => {
  params.value.configuracion.generaNumeroOficio = idData;
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
  params.value.configuracion.prioridad = opcionCheck;
  if (opcionCheck == 0) {
    form.chkPrioridad = false;
  } else {
    form.chkPrioridad = true;
  }
};
const opcionDateLimiteFirma = (date, campoValido) => {
    params.value.configuracion.fechaLimite = date;
//   if (date == 0) {
//     form.inputfechaCreacion = false;
//   } else {
//     form.inputfechaCreacion = campoValido;
//   }
};

/* FIN Set params */

let certificadoModal = ref(null);
let modalCamposRequeridos = ref(null);
const arrayCampos = ref([]);

const submit_form3 = () => {
   arrayCampos.value = [];

   if(!selected_file.value != null){
     is_submit_form_doc.value = true;
   }
  
   //verifica que no este vacio
    if (form.selectUso == undefined) {
      form.selectUso = false;
    }
    if (form.inputFolio == undefined) {
      form.inputFolio = false;
    }
    if (form.selectTipoDocumento == undefined) {
      form.selectTipoDocumento = false;
    }
    if (form.inputIdDocumento == undefined) {
      form.inputIdDocumento = false;
    }
    if (form.inputFolioDocumento == undefined) {
      form.inputFolioDocumento = false;
    }
    if (form.inputfechaCreacion == undefined) {
      form.inputfechaCreacion = false;
    }
    if (form.inputNumExpediente == undefined) {
      form.inputNumExpediente = false;
    }
    if (form.inputNombreExpediente == undefined) {
      form.inputNombreExpediente = false;
    }
    if (form.inputAsuntoDoc == undefined) {
      form.inputAsuntoDoc = false;
    }
    if (form.inputElaboro == undefined) {
      form.inputElaboro = false;
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

   //Alerts
    if (!form.selectUso) {
      arrayCampos.value.push("Destino de Oficio");
    }
    if (!form.inputFolio) {
      arrayCampos.value.push("Folio");
    }
    if (!form.selectTipoDocumento) {
      arrayCampos.value.push("Tipo de documento");
    }
    if (!form.inputIdDocumento) {
      arrayCampos.value.push("ID del Documento");
    }
    if (!form.inputFolioDocumento) {
      arrayCampos.value.push("Folio del documento");
    }
    if (!form.inputfechaCreacion) {
      arrayCampos.value.push("Fecha de documento");
    }
    if (!form.inputNumExpediente) {
      arrayCampos.value.push("Número de Expediente");
    }
    if (!form.inputNombreExpediente) {
      //descripcion del expediente
      arrayCampos.value.push("Nombre de Expediente");
    }
    if (!form.inputAsuntoDoc) {
      arrayCampos.value.push("Asunto");
    }
    if (!form.inputElaboro) {
      arrayCampos.value.push("Elaboró");
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

onMounted(() => {
  initPopup();
});

/* Obtener documentos */
const change_file = (event) => {
  //Quitar [0] para cuando pueda firmar mas de 1 documento
  selected_file.value = event.target.files[0];
  params.value.configuracion.documentos = selected_file.value;
  certificado.value.documento = selected_file.value;
  form.inputPDF = true;
};
/* Guarda Capruta */
const enviaCaptura = () => {
  console.log("Captura");
  console.log(params.value);
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
  console.log("constraseña" + contrasena.value);
  certificado.value.contrasenaCer = contrasena.value;
};

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

  getCertificadoData(
    certFileData,
    keyFileData,
    docFileData,
    certificado.value.contrasenaCer
  );
};
/* Termina Modal firmar ahora */

const add_item = () => {
  let max_id = 0;
  if (items.value && items.value.length) {
    max_id = items.value.reduce(
      (max, character) => (character.id > max ? character.id : max),
      items.value[0].id
    );
  }
  items.value.push({
    id: max_id + 1,
    title: "",
    description: "",
    rate: 0,
    quantity: 0,
    amount: 0,
    is_tax: false,
  });
};

const remove_item = (item) => {
  items.value = items.value.filter((d) => d.id != item.id);
};

//Inicializa Modal
const initPopup = () => {
  certificadoModal = new window.bootstrap.Modal(
    document.getElementById("certificadoModal")
  );
  modalCamposRequeridos = new window.bootstrap.Modal(
    document.getElementById("modalCamposRequeridos")
  );
};

const is_submit_form_cer = ref(false);
const is_submit_form_key = ref(false);
const is_submit_form_pass = ref(false);
const is_submit_form_doc = ref(false);

const alertFirma = ref(false);

const submit_formFirma = () => {
  //Verifica que archivo cer no este vacio
    if(selected_file_cer.value != null){
      console.log("Campo cer/pfx lleno");
      console.log(selected_file_cer.value);
      //Valida si es el archivo es .cer
        if(archivoEsCer.value == true){
          console.log("Es archivo cer");
          console.log(archivoEsCer.value);
            //valida que el archivo Key no este vacio
            if(!selected_file_key.value != null){
              console.log("El archivo key esta lleno");
              console.log(selected_file_key.value);
              //Coloca estilo ok al campo
                 is_submit_form_key.value = false;
             }
        }
    }else{
        is_submit_form_cer.value = true;
    }
        is_submit_form_pass.value = true;

    if((is_submit_form_cer.value) || 
      (is_submit_form_cer.value && is_submit_form_key.value)){
      alertFirma.value = true;
    }

    console.log("Estados variable");
    console.log("Cer" + is_submit_form_cer.value);
    console.log("Key" + is_submit_form_key.value);
    console.log("Pass" + is_submit_form_pass.value);

    // if(!is_submit_form_cer.value && !is_submit_form_key.value && !is_submit_form_pass.value
    //   || !is_submit_form_cer.value && !is_submit_form_pass.value){
    //     alertFirma.value=false;
    //   console.log("entra a metodo validando todo true")
    //   enviaFirma();
    // }
      
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
                  <div class="invoice-detail-total mb-3">
                    <div class="row">
                      <form class="select" novalidate @submit.stop.prevent="submit_form3" >
                        <div class="row">
                          <div class="col-12 col-md-3">
                            <div
                              class="alert alert-light-danger alert-dismissible border-0 mb-4"
                              role="alert"
                              v-if="form.selectUso"
                            >
                              Seleccionar una opción
                              <button
                                type="button"
                                class="close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                              >
                                ×
                              </button>
                            </div>
                            <SelectValidado
                              idName="catUso"
                              label="Destino de oficio:"
                              url="http://localhost/j/documentos/catUso.php"
                              :is_submit_form="is_submit_form"
                              @opcionSelect="opcionSelectUso"
                            ></SelectValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-3 offset-md-3">
                            <InputValidado
                              idName="folio"
                              label="Folio:"
                              placeholder="folio"
                              @inputData="opcionInputFolio"
                            ></InputValidado>
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
                              @opcionSelect="opcionSelectTipoDocumento"
                            ></SelectValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="idDocumento"
                              label="ID del Documento:"
                              placeholder="id"
                              @inputData="opcionInputIdDocumento"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="folioDocumento"
                              label="Folio del documento:"
                              placeholder="get"
                              @inputData="opcionInputFolioDocumento"
                            ></InputValidado>
                          </div>
                        </div>
                        <div class="row">
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
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="numeroExpediente"
                              label="Número de Expediente:"
                              placeholder="Expediente"
                              @inputData="opcionInputNumeroExpediente"
                            ></InputValidado>
                          </div>
                          <div class="col-12 col-md-6 col-lg-4">
                            <InputValidado
                              idName="nombreExpediente"
                              label="Nombre de Expediente:"
                              placeholder="Nombre de expediente"
                              @inputData="opcionInputNombreExpediente"
                            ></InputValidado>
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
                              placeholder="usuario"
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
                    labelButton="Agregar firmante"
                    url="http://localhost/j/documentos/catFirmantes.php"
                    :thtabla="thFirmantes"
                    urlInterno="http://localhost/j/cat_tipo_firma.php"
                  ></TablaAgregar>

                  <!-- Agregar Destinatarios -->
                  <TablaAgregar
                    titulo="Agregar Destinatarios"
                    labelButton="Agregar Destinatario"
                    url="http://localhost/j/documentos/catFirmantes.php"
                    :thtabla="thDestinatarios"
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
                    @chkSwitch="opcionSwitchOrdenFirma"
                  ></SwitchRounded>
                  <SwitchRounded
                    class="ms-5"
                    label="Mantener en modo captura"
                    @chkSwitch="opcionSwitchModoCaptura"
                  ></SwitchRounded>
                  <SwitchRounded
                    class="ms-5"
                    label="Generar número de oficio"
                    @chkSwitch="opcionSwitchGeneraOficio"
                  ></SwitchRounded>
                  <CheckGroup
                    label="Prioridad"
                    url="http://localhost/j/cat_prioridad.php"
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
                      <!-- <a data-bs-toggle="modal" data-bs-target="#certificadoModal1"
                                                id="btn-certificado" class="btn btn-secondary btn-send p-3"
                                                href="javascript:void(0);" @click="submit_form3()">
                                                Firmar ahora
                                            </a> -->
                      <a
                        id="btn-certificado"
                        class="btn btn-secondary btn-send p-3"
                        href="javascript:void(0);"
                        @click="submit_form3()"
                      >
                        Firmar ahora
                      </a>
                    </div>
                    <!-- Hacer una distincion entre "firmar" y "firmar y enviar" -->
                    <div class="col-xl-3 col-md-3">
                      <a
                        href="javascript:;"
                        class="btn btn-success btn-download"
                        @click="submit_form3()"
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
                        <!-- <button type="submit" class="btn mt-2 btn-primary">Firmar</button> -->
                        <a id="btn-modal-firma"
                          class="btn btn-success btn-send p-3"
                          href="javascript:void(0);"
                          @click="enviaFirma()"
                        >
                          Firmar
                        </a>
                      </div>
                    </div>
                </form>
              <!--<form>
                 <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label for="formFileCer" class="form-label">Archivo de certificado (*.cer o .pfx)</label>
                      <input class="form-control" 
                            type="file"
                            id="formFileCer"
                            @change="change_file_cer"
                            accept=".cer, .pfx"
                            required
                        />
                    </div>
                  </div>
                </div> -->

                <!-- <div class="row">
                  <div class="col-md-12" v-if="archivoEsCer">
                    <div class="mb-3">
                      <label for="formFileKey" class="form-label" >Archivo de certificado (*.key)</label>
                      <input class="form-control"
                            type="file"
                            id="formFileKey"
                            @change="change_file_key"
                            accept=".key"
                            required
                      />
                    </div>
                  </div>
                </div> -->

                <!-- <div class="form-group row invoice-created-by">
                  <div class="col-sm-12">
                    <label
                      for="contrasenaCer"
                      class="col-sm-12 col-form-label col-form-label-sm pb-0"
                      >Contraseña</label
                    >
                    <input
                      type="password"
                      v-model="certificado.contrasenaCer"
                      id="contrasenaCer"
                      class="form-control form-control-sm"
                      placeholder="Introduzca su contraseña"
                      required
                    />
                  </div>
                </div> 

              </form>-->
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
</template>
<style></style>
