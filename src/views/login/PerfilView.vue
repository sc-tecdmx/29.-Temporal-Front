<script setup>
import { onMounted, ref } from "vue";
import "@/assets/sass/scrollspyNav.scss";
import "@/assets/sass/users/user-profile.scss";

import { useMeta } from "@/composables/use-meta";
useMeta({ title: "Perfil de usuario" });

//composable
import { useGetData } from "@/composables/getData";

//Iconos
import IconAward from "@/components/icons/IconAward.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconMapPin from "@/components/icons/IconMapPin.vue";
import IconFeatherFileText from "@/components/icons/IconFeatherFileText.vue";

const { data, getData, loading, errorData } = useGetData();
const archivoEsCer = ref(false);
const selected_file_cer = ref(null);
const certificado = ref({
  archivoCer: "",
  archivoKey: "",
  contrasenaCer: "",
});

getData("http://localhost/j/perfil_usuario.php");

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
const enviaFirma = () => {
  console.log("Actualiza certificado");
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

  // console.log(certFileData);
  // console.log(pfxFileData);
  // console.log(keyFileData);
  // console.log(docFileData);
};
</script>
<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-8">
      <div class="user-profile layout-spacing m-5">
        <div class="panel">
          <div class="panel-body">
            <div class="d-flex justify-content-between">
              <h3 class="">Perfil</h3>
            </div>
            <div class="text-center user-info">
              <img src="@/assets/images/tecdmx/profile_90x90.png" alt="avatar" />
              <p class="">
                {{ data?.nombre }} {{ data?.apellido1 }} {{ data?.apellido2 }}
              </p>
            </div>
            <div class="user-info-list">
              <div class="d-flex justify-content-between">
                <ul class="contacts-block list-unstyled">
                  <li class="contacts-block__item">
                    <IconAward />
                    {{ data?.puesto.s_desc_nombramiento }}
                  </li>

                  <li class="contacts-block__item">
                    <IconMail></IconMail>
                    {{ data?.s_email_inst }}
                  </li>
                  <li class="contacts-block__item">
                    <IconMapPin></IconMapPin>
                    {{ data?.area.s_desc_area }}
                  </li>
                  <li class="contacts-block__item">
                    <IconFeatherFileText></IconFeatherFileText>
                    Certificado
                    <p class="ms-5 text-secondary">
                      Válido de {{ data?.certificado.d_fecha_registro }} a
                      {{ data?.certificado.d_fecha_revocación }}
                    </p>
                    <button
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#certificadoModal"
                      id="btn-certificado"
                    >
                      Vincular certificado
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div
        id="certificadoModal"
        class="modal fade"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content mailbox-popup">
            <div class="modal-header">
              <h5 class="modal-title">Actualizar Certificado</h5>
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
                        <div class="mb-3">
                          <label for="formFileCer" class="form-label"
                            >Archivo de certificado (*.cer o .pfx)</label
                          >
                          <input
                            class="form-control"
                            type="file"
                            id="formFileCer"
                            @change="change_file_cer"
                            accept=".cer, .pfx"
                          />
                        </div>
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
                          Actualizar
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
      <!-- Fin Modal -->
    </div>
  </div>
</template>
<style></style>
