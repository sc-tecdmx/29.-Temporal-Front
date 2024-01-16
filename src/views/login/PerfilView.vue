<script setup>
import { onMounted, ref } from "vue";
import "@/assets/sass/scrollspyNav.scss";
import "@/assets/sass/users/user-profile.scss";

import { useMeta } from "@/composables/use-meta";
useMeta({ title: "Perfil de usuario" });

//composable
import { useGetData } from "@/composables/getData";
//Stores
import { useAuthStore } from '@/stores/authStore.js';
import { useFirmaStore } from "@/stores/firmaStore.js";

//Iconos
import IconAward from "@/components/icons/IconAward.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconMapPin from "@/components/icons/IconMapPin.vue";
import IconFeatherFileText from "@/components/icons/IconFeatherFileText.vue";

let certificadoModal = ref(null);
const { data, getData, loading, errorData } = useGetData();
const archivoEsCer = ref(false);
const selected_file_cer = ref(null);
// const certificado = ref({
//   archivoCer: "",
//   archivoKey: "",
//   contrasenaCer: "",
// });

getData("http://localhost/j/perfil_usuario.php");

const authStore = useAuthStore();
const firmaStore = useFirmaStore();
const token = authStore.state.user.token;

const change_file_cer = (event) => {
  console.log(selected_file_cer)
  selected_file_cer.value = event.target.files[0];
  //certificado.value.archivoCer = selected_file_cer.value;

  // const inputElement = document.getElementById("formFileCer");
  // const nombreArchivo = inputElement.value.toLowerCase();

  // if (nombreArchivo.endsWith(".cer")) {
  //   archivoEsCer.value = true;
  // } else {
  //   archivoEsCer.value = false;
  // }
};
//Inicializa Modal
const initPopup = () => {
  certificadoModal = new window.bootstrap.Modal(document.getElementById("certificadoModal"));
  console.log("CET-MOD",certificadoModal)
};
onMounted(async() => {
  initPopup();
});
const cargaCertificado = async() => {
  // console.log("Cargar certificado");
  // console.log("CER",selected_file_cer.value)
  // const certFileObj = await getMimeTypeAndArrayBufferFromFile_v2(selected_file_cer.value);
  // console.log("certFileObj",certFileObj);
  let tipoCertificado = "CertUsuario"
  const formData = new FormData();
  formData.append('certificado', selected_file_cer.value);
  formData.append('tipoCertificado', tipoCertificado);
  // let data = {
  //       "certificado": certFileObj.base64,
  //       "tipoCertificado": tipoCertificado   
  //     }
  
  firmaStore.cargaCertificado(formData,token);

  certificadoModal.hide();
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
      
    </div>
  </div>
  <!-- Modal -->
  <div id="certificadoModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content mailbox-popup">
            <div class="modal-header">
              <h5 class="modal-title">Actualizar Certificado</h5>
              <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
            </div>
            <div class="modal-body">
              <div class="compose-box">
                <div class="compose-content">
                  <form>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="mb-3">
                          <label for="formFileCer" class="form-label">
                            Archivo de certificado (*.cer o .pfx)</label>
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
                    <div class="row justify-content-end">
                      <div class="col-3">
                        <a
                          id="btn-modal-firma"
                          class="btn btn-success btn-send p-3"
                          href="javascript:void(0);"
                          @click="cargaCertificado()"
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
</template>
<style></style>
