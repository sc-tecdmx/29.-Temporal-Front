<script setup>
import { onMounted, ref, inject } from "vue";
import "@/assets/sass/apps/invoice-preview.scss";
import IconFeatherFileText from "@/components/icons/IconFeatherFileText.vue";
//composable
import { useGetData } from "@/composables/getDataN";
//PDF viewer
import PDF from "pdf-vue3";
import { useRoute, useRouter } from "vue-router";
import { getCertificadoData } from "@/firma/main.mjs";
import { useMeta } from "@/composables/use-meta";
import { useAuthStore } from '@/stores/authStore.js';
    const authStore = useAuthStore();
    const token = authStore.state.user.token;
useMeta({ title: "Detalle Documento" });

//const config = inject('config');
const { data, getData, loading, errorData } = useGetData();
const route = useRoute();

const items = ref([]);
const columns = ref([]);
const items2 = ref([]);
const columns2 = ref([]);
const url = import.meta.env.VITE_API_LARURL +`/api/documento/${route.params.id}`;
//const token ="eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2OTk4NTE5ODgsImlzcyI6Imh0dHBzOi8vd3d3LnRlY2RteC5vcmcubXgvIiwic3ViIjoiZ3JhY2llbGEuaWxsZXNjYXNAdGVjZG14Lm9yZy5teCIsImV4cCI6MTcwMDcxNTk4OH0.6pNiPGoBh4bM3RG8DiaeHo9i0N7We3_SU_wpWSICVpNimmm2F3sPubnD4XJvCOe0aWgE2nyhvEaO7RDcDeWdZg";

onMounted(() => {
  bind_data();
  getData(url, token);
});
const detalleDoc = ref(null);
detalleDoc.value = data;
// console.log(data)
// console.log(detalleDoc);

const bind_data = () => {
  columns.value = [
    { key: "firmante", label: "Firmante" },
    { key: "intruccion", label: "Instrucción" },
    { key: "estado", label: "Estado" },
  ];
  items.value = [
    {
      nombre: "Lic. Otilio Esteban Hernández Pérez",
      obligatorio: "si",
      estado: "Firmado",
    },
    { nombre: "Lic. Nallely", obligatorio: "si", estado: "En proceso" },
  ];
  columns2.value = [
    { key: "destinatario", label: "Destinatario" },
    { key: "instruccion", label: "Instrucción" },
    { key: "estado", label: "Estado" },
  ];
  items2.value = [
    {
      nombre: "Francisco Antonio Hernández González",
      instruccion: "Atención",
      estado: "Sin Firma",
    },
    {
      nombre: "Dora Luz Serrano",
      instruccion: "Conocimiento",
      estado: "Sin firma",
    },
  ];
};

const print = () => {
  window.print();
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

/* Modal Rechazo*/
const motivoRechazo = () => {
  console.log("motivo rechazo");
};
/* Termina Modal Rechazo*/

const pathdocumento = ref("");
const pdf_view = (path) => {
  pathdocumento.value = path;
};
</script>
<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-12 col-xxl-10">
      <div class="layout-px-spacing">
        <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="doc-container">
              <div class="row">
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
                                      {{ data?.asunto }}
                                    </h3>
                                  </div>
                                </div>

                                <div class="col-sm-6 text-sm-end">
                                  <p class="inv-list-number">
                                    <span class="inv-title">Folio : </span>
                                    <span class="inv-number">{{
                                      data?.folioDocumento
                                    }}</span>
                                  </p>
                                </div>

                                <div class="col-sm-6 align-self-center mt-3">
                                  <p class="inv-street-addr">
                                    <b>Destino:</b> {{ data?.tipoDestino }}
                                  </p>
                                  <p class="inv-email-address">
                                    <b>Prioridad:</b> {{ data?.prioridad }}
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
                                      data?.fechaCreacion
                                    }}</span>
                                  </p>
                                  <p class="inv-due-date">
                                    <span class="inv-title"
                                      >Fecha límite :
                                    </span>
                                    <span class="inv-date">{{
                                      data?.fechaLimiteFirma
                                    }}</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="inv--detail-section inv--customer-detail-section">
                              <div class="row">
                                <div class="col-xl-7 col-lg-7 col-md-6 col-sm-4">
                                  <p class="inv-street-addr">
                                    {{ data?.tipoDocumento }}
                                  </p>
                                  <p class="inv-street-addr">
                                    <b>Expediente:</b> {{ data?.numExpediente }}
                                  </p>
                                  <p class="inv-email-address">
                                    <b>Nombre de expediente:</b>
                                    {{ data?.s_descripcion }}
                                  </p>
                                </div>

                                <div class="col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12 order-sm-0 order-1" >
                                  <div class="pStyle">
                                    <p>
                                      <span class="inv-subtitle"
                                        ><b>Elaboró:</b></span
                                      >
                                      <span
                                        >{{ data?.nombreEmpleado }}
                                        {{ data?.apellido1Empleado }}
                                        {{ data?.apellido2Empleado }}</span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-sm-12">
                                  <p class="inv-email-address">
                                    <b>Contenido:</b> {{ data?.contenido }}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="inv--product-table-section">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th
                                        v-for="item in columns"
                                        :key="item.key"
                                        :class="[item.class]"
                                      >
                                        {{ item.label }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="firmante in data?.firmantes"
                                      :key="firmante.numEmpleado"
                                    >
                                      <td>
                                        {{ firmante.nombre }}
                                        {{ firmante.apellido1 }}
                                        {{ firmante.apellido2 }}
                                      </td>
                                      <td>
                                        {{ firmante.obligatorio }}
                                      </td>
                                      <td>
                                        {{ firmante.estado }}
                                      </td>
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
                                      v-for="destinatario in data?.destinatarios"
                                      :key="destinatario.numEmpleado"
                                    >
                                      <td>
                                        {{ destinatario.nombre }}
                                        {{ destinatario.apellido1 }}
                                        {{ destinatario.apellido2 }}
                                      </td>
                                      <td>
                                        {{ destinatario.instruccion }}
                                      </td>
                                      <td>
                                        {{ destinatario.estado }}
                                      </td>
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
                                    Documento adjunto a firmar (falta agregar el
                                    PDF)
                                  </p>

                                  <a
                                    href="javascript:;"
                                    class="btn dropdown-toggle btn-icon-only"
                                    @click=" pdf_view( data.documentosAdjuntos[0].documentoPath ) "
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalPDF"
                                  >
                                    <IconFeatherFileText></IconFeatherFileText>
                                  </a>
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
                          <a
                            href="javascript:;"
                            class="btn btn-primary btn-send"
                            >Enviar/Transferir</a
                          >
                        </div>
                        <!-- <div class="col-xl-12 col-md-3 col-sm-6">
                                            <a href="javascript:;" class="btn btn-secondary btn-print action-print" @click="print()">Print</a>
                                        </div> -->
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#certificadoModal"
                            id="btn-certificado"
                            class="btn btn-success btn-send"
                            href="javascript:void(0);"
                            @click=""
                          >
                            Firmar
                          </a>
                        </div>
                        <div class="col-xl-12 col-md-3 col-sm-6">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#rechazoModal"
                            id="btn-rechazo"
                            class="btn btn-danger btn-send"
                            href="javascript:void(0);"
                            @click=""
                          >
                            Rechazar
                          </a>
                          <!-- <router-link to="#" class="btn btn-danger btn-edit">Rechazar</router-link> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Boton de firmar -->
                <!-- Modal Firma -->
                <div
                  id="certificadoModal"
                  class="modal fade"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-md modal-dialog-centered">
                    <div class="modal-content mailbox-popup">
                      <div class="modal-header">
                        <h5 class="modal-title">Firma electrónica</h5>
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
                              <!--       <div class="alert alert-arrow-right alert-icon-right alert-light-danger alert-dismissible mb-4" role="alert">
                                    <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">×</button>
                                    <svg></svg>
                                    <strong>Certificado inválido!</strong> Su certificado no esta vigente.
                                </div>-->
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="mb-3">
                                    <label for="formFileCer" class="form-label"
                                      >Archivo de certificado (*.cer o
                                      .pfx)</label
                                    >
                                    <input
                                      class="form-control"
                                      type="file"
                                      id="formFileCer"
                                      @change="change_file_cer"
                                      accept=".cer, .pfx"
                                    />
                                  </div>
                                  <!-- <AgregarArchivo
                                            label="Archivo de certificado (*.cer)"
                                        ></AgregarArchivo> -->
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-md-12" v-if="archivoEsCer">
                                  <div class="mb-3">
                                    <label for="formFileKey" class="form-label"
                                      >Archivo de certificado (*.key)</label
                                    >
                                    <input
                                      class="form-control"
                                      type="file"
                                      id="formFileKey"
                                      @change="change_file_key"
                                      accept=".key"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="form-group row invoice-created-by">
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
                                  />
                                </div>
                              </div>

                              <div class="row justify-content-end">
                                <div class="col-3">
                                  <a
                                    id="btn-modal-firma"
                                    class="btn btn-success btn-send p-3"
                                    href="javascript:void(0);"
                                    @click="enviaFirma()"
                                  >
                                    Firmar
                                  </a>
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
                <div
                  id="rechazoModal"
                  class="modal fade"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
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
                                  <div
                                    class="checkbox-primary custom-control custom-checkbox text-color"
                                  >
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="chk_1"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="chk_1"
                                    >
                                      No me corresponde
                                    </label>
                                  </div>
                                  <div
                                    class="checkbox-primary custom-control custom-checkbox text-color"
                                  >
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="chk_2"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="chk_2"
                                    >
                                      Error en documento
                                    </label>
                                  </div>
                                  <div
                                    class="checkbox-primary custom-control custom-checkbox text-color"
                                  >
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="chk_otro"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="chk_otro"
                                    >
                                      otro
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div class="row justify-content-end">
                                <div class="col-6">
                                  <a
                                    id="btn-modal-rechazo"
                                    class="btn btn-danger btn-send p-3"
                                    href="javascript:void(0);"
                                    @click="motivoRechazo()"
                                  >
                                    Rechazar documento
                                  </a>
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
                <!-- Modal PDF-->
                <div
                  class="modal fade"
                  id="modalPDF"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
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
                        <!-- <PDF src="/src/assets/images/Documento_prueba_firma.pdf"></PDF> -->
                        <PDF :src="pathdocumento"></PDF>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn"
                          data-dismiss="modal"
                          data-bs-dismiss="modal"
                        >
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
</template>
<style>
.pStyle {
  font-size: 13px;
}
</style>