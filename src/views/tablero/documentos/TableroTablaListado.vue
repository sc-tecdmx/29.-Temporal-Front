<script setup>
    import { onMounted, ref } from 'vue';
    //import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/stores/authStore.js';
    import { useFirmaStore } from "@/stores/firmaStore.js";
    import {main_pfx, main_cer} from '@/firmav2/main-refactor.mjs';
    //flatpickr para Fecha
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';
    //PDF viewer
    import PDF from 'pdf-vue3';
    //Iconos
    //import IconMoreHorizontal from '@/components/icons/IconMoreHorizontal.vue';
    import IconChevronDown from '@/components/icons/IconChevronDown.vue';
    import IconAlertOctagon from '@/components/icons/IconAlertOctagon.vue';
    import IconFeatherFileText from '@/components/icons/IconFeatherFileText.vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import IconXOctagon from '@/components/icons/IconXOctagon.vue';
    import IconSend from '@/components/icons/IconSend.vue';
    import IconFeatherCheck from '@/components/icons/IconFeatherCheck.vue';
    import IconFeatherX from '@/components/icons/IconFeatherX.vue';
    import IconFilePlus from '@/components/icons/IconFilePlus.vue';
    import IconEye from '@/components/icons/IconEye.vue';
    import IconSignature from '@/components/icons/IconSignature.vue';

    const props=  defineProps({
        filtered_task_list: Object,
        url: String,
    });
    //console.log("PROPS",props.filtered_task_list);
    const router = useRouter();
    const authStore = useAuthStore();
    const firmaStore = useFirmaStore();

    /* inicia getData */
    //const columns = ['acciones','e','p','d','folio','asunto','fecha','firmantes','destinatarios', 'detalle'];
    const columns = ['acciones','información','folio','asunto','fecha','firmantes','destinatarios'];
    const items = ref([]);    
    const token = authStore.state.user.token;
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
    const is_submit_form_cer = ref(false);
    const is_submit_form_key = ref(false);
    const is_submit_form_pass = ref(false);
    const archivoEsCer = ref(false);
    const alertFirma = ref(false);
    let certificadoModal = ref(null);
    let rechazoModal = ref(null);
    const idDocumento =  ref(null);
    const adjuntos =  ref(null);
    const loadFirma = ref(false);
    const data = JSON.parse(localStorage.getItem('data'));
    
    //Configuración de tabla
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table ',
        columnsClasses: { detalle: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Mostrando {from} a {to} de {count}',
            filter: '',
            filterPlaceholder: 'Buscar...',
            limit: 'Resultados:',
        },
        sortable: ['folio','asunto','fecha','firmantes','destinatarios'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: true,
        hiddenColumns: [],
        orderBy: { ascending:true }
    });

    onMounted(() => {
        //bind_data();
        initPopup();
    });

    //Archivo adjunto
    const pathdocumento = ref("")
    const documentosAdjuntos = ref([]);
    const pdf_view = (adjuntos) =>{
        documentosAdjuntos.value= [];
        for(let i = 0; i< adjuntos.length; i++){
            let pathAdjunto = adjuntos[i];
            let ultimaDiagonal = pathAdjunto.filePath.lastIndexOf("/");
            const nomArchivo = pathAdjunto.filePath.substring(ultimaDiagonal +1);
            let objeto = {
                path:  pathAdjunto,
                nombre: nomArchivo
            }
            documentosAdjuntos.value.push(objeto);
        }
    }
    //Botón ocultar columnas
    const show_hide_columns = (column, value) => {
        if (!table_option.value.hiddenColumns.includes(column) && !value) {
            table_option.value.hiddenColumns.push(column);
        } else {
            table_option.value.hiddenColumns = table_option.value.hiddenColumns.filter((d) => d !== column);
        }
    };
    //Encabezados en mayúsculas 
    const capitalize = (text) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };
    //Rango de fechas
    const date3 = ref('');
    const min_age = ref('');
    const max_age = ref('');
    const range_change = () => {
        let dt = items.value;
        if (min_age.value != '' && min_age.value != null) {
            dt = dt.filter((d) => d.age >= Number(min_age.value));
        }
        if (max_age.value != '' && max_age.value != null) {
            dt = dt.filter((d) => d.age <= Number(max_age.value));
        }
        items.value = dt;
    };

    const campoRangoFecha = ref(false);
    const buscarFecha = () => {
        //console.log("buscarFecha")
        campoRangoFecha.value = !campoRangoFecha.value;

    }
    const rangoFecha= () =>{
        // console.log("date3");
        // console.log(date3);
        const cortado = date3.value.split("to");
        //console.log(cortado);
        const fecha_inicio = cortado[0].trim();
        const fecha_fin = cortado[1].trim();
        console.log(fecha_inicio);
        console.log(fecha_fin);
    }

    let docCreado = false;
    let docEnviado = false;
    let docFirma = false;
    let docRechazado = false;
    let docTerminado = false;
    let titulo = "";
    

    //Clase para icono Estado
    const class_estado = (estado) => {
        switch(estado){
            case 'Creado':
                titulo = "Creado"
                docCreado = true;
                docEnviado = false;
                docFirma = false;
                docRechazado = false;
                docTerminado = false;
                return 'creado';
                break;
            case 'Enviado':
                docCreado = false;
                docEnviado = true;
                docFirma = false;
                docRechazado = false;
                docTerminado = false;
                return 'enviado';
                break;
            case 'En Firma':
                docCreado = false;
                docEnviado = false;
                docFirma = true;
                docRechazado = false;
                docTerminado = false;
                return 'enFirma';
                break;
            case 'Rechazado':
                docCreado = false;
                docEnviado = false;
                docFirma = false;
                docRechazado = true;
                docTerminado = false;
                return 'rechazado';
                break;
            case 'Terminado':
                docCreado = false;
                docEnviado = false;
                docFirma = false;
                docRechazado = false;
                docTerminado = true;
                return 'terminado';
                break;
        }
    };

    let titlePrioriodad = "";

    //Clase para icono Prioridad
    const class_prioridad = (prioridad) => {
        switch(prioridad){
            case 'Alta':
                titlePrioriodad= "Alta";
                return 'alta';
                break;
            case 'Media':
                titlePrioriodad= "Media";
                return 'media';
                break;
            case 'Baja':
                titlePrioriodad= "Baja";
                return 'baja';
                break;
        }
    };
    
    //Firmar documento
    const firmar = async(documento) => {
        certificado.value.documento = documento.row.documentosAdjuntos
        //console.log(documento)
        idDocumento.value = documento.row.idDocumento;
        adjuntos.value = documento.row.documentosAdjuntos;
    };

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString('es-US', {
            day: '2-digit',
            month:'2-digit',
            year: 'numeric',
        });
    }
//Firma
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
  await goFirma();
}
};
const goFirma = async () => {
  //console.log("goto Firma- DOC", idDocumento);
  loadFirma.value = true;
  try {
    const verificaGoFirma = await firmaStore.goToFirma(idDocumento.value, token);
    //console.log("GO-FIRMA", verificaGoFirma);

    if (verificaGoFirma.data.status === 'Success') {
      //console.log("Success")
      await enviaFirma();
    } else {
      //fail
      showMessage("No se puede firmar", 'error');
      loadFirma.value = false;
      //alert("No se puede firmar");
      //window.location.reload();
    }
  } catch (error) {
    console.error("Error al llamar a goToFirma:", error);
  }
};

 const enviaFirma = async () => {
  console.log("enviaFirma")
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
  
    if(certFileData.file!=null){
      const certFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
      const keyFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoKey);
      //const pdfFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento);
      //console.log(certificado.value);
      const codigoFirmaAplicada = 'Firmado';
      let countDoc = 0;
      let logArray = certificado.value.documento.length;

      certificado.value.documento.forEach(async (doc, index) => {
       const pdfFileObj = doc.docBase64;
       const resultado = await main_cer(certFileObj.base64, keyFileObj.base64, certificado.value.contrasenaCer, pdfFileObj, codigoFirmaAplicada, token, doc.originalHash);
       if(resultado){
          countDoc ++;
        }else{
          loadFirma.value = false;
        }
        if (index === logArray - 1) {
          showAlert(logArray);
          // if (confirm(countDoc + " Documento(s) firmado")) {
          //   loadFirma.value = false;
          //   window.location.href = "/";
          // }
        }
     });
      //const pdfFileObj = certificado.value.documento[0].docBase64;
      //main_cer(certFileObj.base64, keyFileObj.base64, certificado.value.contrasenaCer, pdfFileObj.base64, codigoFirmaAplicada, token, null);
      //main_cer(certFileObj.base64, keyFileObj.base64, certificado.value.contrasenaCer, pdfFileObj, codigoFirmaAplicada, token, null);

    }else if(pfxFileData.file!=null){
      const pfxFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.archivoCer);
      const pdfFileObj = certificado.value.documento[0].docBase64;
      //const pdfFileObj = await getMimeTypeAndArrayBufferFromFile_v2(certificado.value.documento);
      const codigoFirmaAplicada = 'Firmado';
      main_pfx(pfxFileObj.base64, certificado.value.contrasenaCer, pdfFileObj, codigoFirmaAplicada, token, doc.originalHash);
      //main_pfx(pfxFileObj.base64, certificado.value.contrasenaCer, pdfFileObj.base64, codigoFirmaAplicada, token, null);
    }
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
//Inicializa Modal
const initPopup = () => {
   certificadoModal = new window.bootstrap.Modal(document.getElementById("certificadoModal"));
   rechazoModal = new window.bootstrap.Modal(document.getElementById("rechazoModal"));
 };
 //Rechazar documento
 const is_submit_rechazo = ref(false);
 const formRechazo = ref({ 
    idDocumento: '', 
    codigoFirmaAplicada:'', 
    tipoUsuario: '',
    motivo: '' });
  const rechazar = (documento) => {
         formRechazo.value.idDocumento = documento.row.idDocumento;
         formRechazo.value.codigoFirmaAplicada =  "Rechazado";
         formRechazo.value.tipoUsuario = "firmante"
    };
const submit_rechazo = () => {
  is_submit_rechazo.value = true;
         if (formRechazo.value.motivo) {
           //Falta el nuevo servicio que contenga el motivo
           firmaStore.rechazarDocumento(formRechazo.value,token);
           rechazoModal.hide();
         }
    };

//Activar/Bloquear botones
const status_btnRechazo = (etapa, status) => {
  switch(etapa){
    case 'Creado':
      if(!status){
        return false;
      }
      break;
    case 'Enviado':
      if(status){
        return true;
      }else{
        return false;
      }
      break;
    case 'En Firma':
      if(status){
        return true;
      }else{
        return false;
      }
      break;
    case 'Rechazado':
      return true;
      break;
    case 'Terminado':
      return true;
      break;
    default:
      // alert("No se encuentra etapa de documento");
      showMessage("No se encuentra etapa de documento", 'error');
      break;
  }
};
const status_btnFirma = (etapa, status) => {
  switch(etapa){
    case 'Creado':
      if(!status){
        return false;
      }
      break;
    case 'Enviado':
    if(status){
        return true;
      }else{
        return false;
      }
      break;
    case 'En Firma':
      if(status){
        return true;
      }else{
        return false;
      }
      break;
    case 'Rechazado':
      return true;
      break;
    case 'Terminado':
      return true;
      break;
    default:
      // alert("No se encuentra etapa de documento");
      showMessage("No se encuentra etapa de documento", 'error');
      break;
  }
};

const showAlert = async (count) => {
      new window.Swal({
          icon: 'success',
          title: 'Firmado',
          text: "Se han firmado " + count + " documentos",
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
          padding: '2em',
        }).then((result) => {
            if (result.value) {
              loadFirma.value = false;
              window.location.reload();
            }
        });
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
</script>
<template>
    <div class="layout-px-spacing">
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0 mt-5">
                    <div class="custom-table">
                        <v-client-table :data="props.filtered_task_list" :columns="columns" :options="table_option">
                            <template #beforeFilter>
                                <!-- <div class="checkbox-primary custom-control custom-checkbox me-2 mt-2">
                                    <input type="checkbox" class="custom-control-input" id="chk_primary" @change="buscarFecha()"/>
                                    <label class="custom-control-label" for="chk_primary"> Buscar por rango de fecha</label>
                                </div> -->
                                <div class="custom-dropdown dropdown btn-group">
                                    <a class="btn dropdown-toggle btn-icon-only" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <button aria-haspopup="true" aria-expanded="false" type="button" class="btn dropdown-toggle btn-outline-primary">
                                            Columnas
                                            <IconChevronDown></IconChevronDown>
                                        </button>
                                    </a>

                                    <div class="dropdown-menu dropdown-menu-end" @click="$event.stopPropagation()">
                                        <div class="checkbox-outline-primary mx-3 my-2 custom-control custom-checkbox" v-for="(column, index) in columns" :key="index">
                                            <input
                                                variant="primary"
                                                type="checkbox"
                                                class="custom-control-input"
                                                :checked="table_option.hiddenColumns.includes(column) ? false : true"
                                                :id="'chk' + index"
                                                @change="show_hide_columns(column, $event.target.checked)"
                                            />
                                            <label class="custom-control-label" :for="'chk' + index">
                                                {{ capitalize(column) }}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="d-flex p-3 justify-content-between" v-if="campoRangoFecha">
                                        <div class="d-flex align-items-sm-center flex-column flex-sm-row ms-1">
                                            <!-- <span class="text-nowrap me-sm-2">Rango de fecha:</span> -->
                                            <flat-pickr v-model="date3" :config="{ mode: 'range' }" class="form-control form-control-sm flatpickr active" @onChange="rangoFecha()"></flat-pickr>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #acciones="props">
                                <div class="text-center">
                                    <button href="javascript:;"
                                        id="ddlPriority"
                                        class="btn dropdown-toggle btn-icon-only ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#certificadoModal"
                                        title="Firmar Ahora"
                                        :disabled="status_btnFirma(props.row.etapa, props.row.statusFirma)"
                                        @click="firmar(props)">
                                        <IconEdit></IconEdit>
                                    </button>
                                    <button href="javascript:;"
                                        id="btn-rechazo"
                                        class="btn dropdown-toggle btn-icon-only ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#rechazoModal"
                                        title="Rechazar"
                                        :disabled="status_btnRechazo(props.row.etapa, props.row.statusFirma)"
                                        @click="rechazar(props)">
                                        <IconXOctagon></IconXOctagon>
                                    </button>
                                <a href="javascript:;"
                                    id="ddlPriority"
                                    class="btn dropdown-toggle btn-icon-only ms-2"
                                    data-bs-toggle="tooltip"
                                    title="Detalle"
                                    @click="router.push(`/documento/recibido/${props.row.idDocumento}`)">
                                    <IconEye></IconEye>
                                </a>
                                <a class="btn dropdown-toggle btn-icon-only text-truncate ms-2" 
                                    href="#" role="button" 
                                    id="pendingTask" 
                                    v-if="props.row.documentosAdjuntos.length > 0"
                                    data-bs-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false" 
                                    @click="pdf_view(props.row.documentosAdjuntos)"
                                    style="font-size: 12px;">
                                    <IconFeatherFileText></IconFeatherFileText>
                                </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li class="font-list" v-for="doc in documentosAdjuntos">
                                            <a href="javascript:;"
                                                class="btn dropdown-toggle btn-icon-only"
                                                @click="pathdocumento = doc.path"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalPDF">
                                                {{ doc.nombre }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                            <template #información="props">
                                <div class="priority-dropdown text-center">
                                    <div class="dropdown btn-group">
                                        <a href="javascript:;"
                                            id="ddlPriority"
                                            class="btn dropdown-toggle btn-icon-only"
                                            :class="[class_prioridad(props.row.prioridad)]"
                                            data-bs-toggle="tooltip"
                                            :title="titlePrioriodad"
                                        >
                                            <IconAlertOctagon />
                                        </a>
                                        <a href="javascript:;"
                                            id="ddlPriority"
                                            class="btn dropdown-toggle btn-icon-only ms-2"
                                            :class="[class_estado(props.row.etapa)]"
                                            data-bs-toggle="tooltip"
                                            :title="titulo"
                                        >
                                            <IconFilePlus v-if="docCreado"></IconFilePlus>
                                            <IconSend v-if="docEnviado"></IconSend>
                                            <IconSignature v-if="docFirma"></IconSignature>
                                            <IconFeatherX v-if="docRechazado"></IconFeatherX>
                                            <IconFeatherCheck v-if="docTerminado"></IconFeatherCheck>
                                        </a>
                                    </div>
                                </div>
                            </template>
                            <template #folio="props">
                                <div class="text-center">
                                    {{ props.row.folioDocumento }}
                                </div>
                            </template>
                            <template #asunto="props">
                                <a class="btn dropdown-toggle btn-icon-only text-truncate" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 12px;">
                                    <span class="d-inline-block text-truncate" style="max-width: 200px;">
                                        {{ props.row.asunto }}
                                    </span>
                                </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li class="font-list">
                                            {{ props.row.asunto }}
                                        </li>

                                    </ul>
                            </template>
                            <template #fecha="props">
                                {{ formatDate(props.row.creacionDocumentoFecha) }}
                            </template>
                            <template #firmantes="props">
                                <div class="me-2 custom-dropdown dropdown btn-group">
                                    <a class="btn dropdown-toggle btn-icon-only text-truncate" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 12px;">
                                        <span class="d-inline-block text-truncate" style="max-width: 100px;">
                                            {{ props.row.firmantes[0].nombre }} {{ props.row.firmantes[0].apellido1 }} {{ props.row.firmantes[0].apellido2 }},
                                        </span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li class="font-list" v-for="firmante in props.row.firmantes">
                                            {{ firmante.nombre }} {{ firmante.apellido1 }} {{ firmante.apellido2 }}
                                        </li>

                                    </ul>
                                </div>
                            </template>
                            <template #destinatarios="props">
                                <div class="me-2 custom-dropdown dropdown btn-group">
                                    <!-- <a class="btn dropdown-toggle btn-icon-only" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <IconMoreHorizontal></IconMoreHorizontal>
                                    </a> -->
                                    <a class="btn dropdown-toggle btn-icon-only text-truncate" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 12px;">
                                        <span class="d-inline-block text-truncate" style="max-width: 100px;">
                                            {{ props.row.destinatarios[0].nombre }} {{ props.row.destinatarios[0].apellido1 }} {{ props.row.destinatarios[0].apellido2 }},
                                        </span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li class="font-list" v-for="destinatario in props.row.destinatarios">
                                            {{ destinatario.nombre }} {{ destinatario.apellido1 }} {{ destinatario.apellido2 }}
                                        </li>

                                    </ul>
                                </div>
                            </template>
                             <template #detalle="props">
                                <a href="javascript:;" class="cancel" @click="verDetalle(props.row)">
                                    
                                    <button type="button" class="btn btn-primary btn-sm">Ver</button>
                                </a>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- Slider Modal -->
 <div class="modal fade" id="sliderModal" tabindex="-1" role="dialog" aria-labelledby="sliderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <button type="button" class="btn-close" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body p-0">
                <!-- <PDF src="/src/assets/images/Documento_prueba_firma.pdf"></PDF> -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal PDF-->
<div class="modal fade" id="modalPDF" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
            </div>
            <div class="modal-body">
                <p v-if="pathdocumento.docBase64 == null">base64 null</p>
                <!-- <PDF :src="pathdocumento.docBase64" v-else></PDF> -->
                <embed
                :src="'data:application/pdf;base64,'+ pathdocumento.docBase64"
                type="application/pdf" width="100%" height="600px"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i>Cerrar</button>
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
                <!-- Spinner Firmando -->
    <div id="spinner-overlay" class="z-3 position-fixed top-50 start-50 translate-middle p-5 rounded-3 d-flex justify-content-center align-items-center" v-if="loadFirma">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Firmando...</span>
      </div>
    </div>
  <!-- Termina Spinner -->
</template>
<style>
.font-list{
    font-size: 12px;
}
.creado svg {
    color: #ced2d6;
    fill: rgba(206,210,214,.19);
}
.enviado svg {
    color: #b6e4eb;
    fill: rgba(182,228,235,.19);
}
.enFirma svg {
    /* color: #71d0c9;
    fill: rgba(113,208,201,.19); */
    fill: #71d0c9;
}

.rechazado svg {
    color: #e7515a;
    fill: rgba(231,81,90,.19);
}
.terminado svg {
    color: #3cba92;
    fill: rgba(60,186,146,.19);
}
.alta svg {
    color: #e7515a;
    fill: rgba(231,81,90,.19);
}
.media svg {
    color: #ff9070;
    fill: rgba(255,120,67,.19);
}
.baja svg {
    color: #f3d63c;
    fill: rgba(255,190,17,.19);
}
.btn svg {
    width: 15px;
    height: 15px;
    vertical-align: bottom;
}
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
