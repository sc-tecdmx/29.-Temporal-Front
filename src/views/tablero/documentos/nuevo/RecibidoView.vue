<script setup>
import { onMounted, ref } from 'vue';
    import '@/assets/sass/apps/invoice-preview.scss';

    import { getCertificadoData } from '@/firma/main.mjs';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Invoice Preview' });

    const items = ref([]);
    const columns = ref([]);
    const items2 = ref([]);
    const columns2 = ref([]);

    onMounted(() => {
        bind_data();
    });

    const bind_data = () => {
        
        columns.value = [
            { key: 'firmante', label: 'Firmante' },
            { key: 'obligatorio', label: 'Obligatorio' },
            { key: 'estado', label: 'Estado' },
        ];
        items.value = [
            { nombre: 'Lic. Otilio Esteban Hernández Pérez', obligatorio: 'si', estado: 'Firmado' },
            { nombre: 'Lic. Nallely', obligatorio: 'si', estado: 'En proceso' },
        ];
        columns2.value = [
            { key: 'destinatario', label: 'Destinatario' },
            { key: 'instruccion', label: 'Instrucción' },
            { key: 'estado', label: 'Estado' },
        ];
        items2.value = [
            { nombre: 'Francisco Antonio Hernández González', instruccion: 'Atención', estado: 'Sin Firma' },
            { nombre: 'Dora Luz Serrano', instruccion: 'Conocimiento', estado: 'Sin firma' },
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
    archivoCer:'',
    archivoKey:'',
    contrasenaCer:'',
    documento: '',
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

const setContrasena = (contrasena) =>{
    console.log("constraseña" + contrasena.value);
    certificado.value.contrasenaCer = contrasena.value;
}

const enviaFirma=()=>{
    console.log("certificado");
    const certFileData = {'file':certificado.value.archivoCer, 'buffer':null, 'base64': null, 'iscer':archivoEsCer.value};
    const pfxFileData = {'file':certificado.value.archivoCer, 'buffer':null, 'base64': null, 'iscer':archivoEsCer.value};
    const keyFileData = {'file':certificado.value.archivoKey, 'buffer':null, 'base64': null};
    const docFileData = {'file':certificado.value.documento, 'buffer':null, 'base64': null};

    getCertificadoData(certFileData, keyFileData, 
    docFileData, certificado.value.contrasenaCer);

}
/* Termina Modal firmar ahora */

/* Modal Rechazo*/
const motivoRechazo=()=>{
    console.log("motivo rechazo")
}
/* Termina Modal Rechazo*/
</script>
<template>
    <div class="row no-gutters justify-content-center">
        <div class="col-12 col-xxl-10">
            <!-- <h3 class="mt-4 ms-2">Recibido</h3> -->

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
                                                                <!-- <img class="company-logo" src="@/assets/images/cork-logo.png" alt="company" /> -->
                                                                <h3 class="align-self-center">Asunto del documento</h3>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-6 text-sm-end">
                                                            <p class="inv-list-number"><span class="inv-title">Folio : </span> <span class="inv-number">TTT-AAA-2020-001</span></p>
                                                        </div>

                                                        <div class="col-sm-6 align-self-center mt-3">
                                                            <p class="inv-street-addr">Interno(uso)</p>
                                                            <p class="inv-email-address">Área destino</p>
                                                            <p class="inv-email-address">Destinatario</p>
                                                        </div>
                                                        <div class="col-sm-6 align-self-center mt-3 text-sm-end">
                                                            <p class="inv-created-date"><span class="inv-title">Fecha del Documento : </span> <span class="inv-date">20 Aug 2020</span></p>
                                                            <p class="inv-due-date"><span class="inv-title">Fecha límite : </span> <span class="inv-date">26 Aug 2020</span></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="inv--detail-section inv--customer-detail-section">
                                                    <div class="row">
                                                        <!-- <div class="col-xl-8 col-lg-7 col-md-6 col-sm-4 align-self-center">
                                                            <p class="inv-to">Invoice To</p>
                                                        </div>

                                                        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 align-self-center order-sm-0 order-1 inv--payment-info">
                                                            <h6 class="inv-title">Payment Info:</h6>
                                                        </div> -->

                                                        <div class="col-xl-8 col-lg-7 col-md-6 col-sm-4">
                                                            <p class="inv-street-addr">Tipo de documento</p>
                                                            <p class="inv-street-addr">Expediente</p>
                                                            <p class="inv-email-address">Nombre de expediente</p>
                                                            <!-- <p class="inv-email-address">(128) 666 070</p> -->
                                                        </div>

                                                        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 order-sm-0 order-1">
                                                            <div class="inv--payment-info">
                                                                <p><span class="inv-subtitle">Elaboró:</span> <span>Juan Pérez</span></p>
                                                                <!-- <p><span class="inv-subtitle">Account Number: </span> <span>1234567890</span></p>
                                                                <p><span class="inv-subtitle">SWIFT code:</span> <span>VS70134</span></p>
                                                                <p><span class="inv-subtitle">Country: </span> <span>United States</span></p> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="inv--product-table-section">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th v-for="item in columns" :key="item.key" :class="[item.class]">
                                                                        {{ item.label }}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item in items" :key="item.id">
                                                                    <td>
                                                                        {{ item.nombre }}
                                                                    </td>
                                                                    <td>
                                                                        {{ item.obligatorio }}
                                                                    </td>
                                                                    <td>
                                                                        {{ item.estado }}
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
                                                                    <th v-for="item in columns2" :key="item.key" :class="[item.class]">
                                                                        {{ item.label }}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item in items2" :key="item.id">
                                                                    <td>
                                                                        {{ item.nombre }}
                                                                    </td>
                                                                    <td>
                                                                        {{ item.instruccion }}
                                                                    </td>
                                                                    <td>
                                                                        {{ item.estado }}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                                <div class="inv--note">
                                                    <div class="row mt-4">
                                                        <div class="col-sm-12 col-12 order-sm-0 order-1">
                                                            <p>Documento adjunto a firmar (falta agregar el PDF)</p>
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
                                            <a href="javascript:;" class="btn btn-primary btn-send">Turnar</a>
                                        </div>
                                        <!-- <div class="col-xl-12 col-md-3 col-sm-6">
                                            <a href="javascript:;" class="btn btn-secondary btn-print action-print" @click="print()">Print</a>
                                        </div> -->
                                        <div class="col-xl-12 col-md-3 col-sm-6">
                                            <a data-bs-toggle="modal" data-bs-target="#certificadoModal"
                                                id="btn-certificado" class="btn btn-success btn-send"
                                                href="javascript:void(0);" @click="">
                                                Firmar
                                            </a>
                                        </div>
                                        <div class="col-xl-12 col-md-3 col-sm-6">
                                            <a data-bs-toggle="modal" data-bs-target="#rechazoModal"
                                                id="btn-rechazo" class="btn btn-danger btn-send"
                                                href="javascript:void(0);" @click="">
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
    <div id="certificadoModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content mailbox-popup">
                <div class="modal-header">
                    <h5 class="modal-title">Firma electrónica</h5>
                    <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"
                        class="btn-close"></button>
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
                                            <label for="formFileCer" class="form-label">Archivo de certificado (*.cer o .pfx)</label>
                                            <input class="form-control" type="file" id="formFileCer" @change="change_file_cer" accept=".cer, .pfx">
                                        </div>
                                        <!-- <AgregarArchivo
                                            label="Archivo de certificado (*.cer)"
                                        ></AgregarArchivo> -->
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12" v-if="archivoEsCer">
                                        <div class="mb-3">
                                            <label for="formFileKey" class="form-label">Archivo de certificado (*.key)</label>
                                            <input class="form-control" type="file" id="formFileKey" @change="change_file_key" accept=".key">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row invoice-created-by">
                                    <div class="col-sm-12">
                                        <label
                                        for="contrasenaCer"
                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Contraseña</label>
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
                                    <a  id="btn-modal-firma" class="btn btn-success btn-send p-3"
                                        href="javascript:void(0);" @click="enviaFirma()">
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
    <div id="rechazoModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content mailbox-popup">
                <div class="modal-header">
                    <h5 class="modal-title">Rechazar documento</h5>
                    <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close"
                        class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <div class="compose-box">
                        <div class="compose-content">
                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="checkbox-primary custom-control custom-checkbox text-color">
                                            <input type="checkbox" class="custom-control-input" id="chk_1" />
                                            <label class="custom-control-label" for="chk_1"> No me corresponde </label>
                                        </div>
                                        <div class="checkbox-primary custom-control custom-checkbox text-color">
                                            <input type="checkbox" class="custom-control-input" id="chk_2" />
                                            <label class="custom-control-label" for="chk_2"> Error en documento </label>
                                        </div>
                                        <div class="checkbox-primary custom-control custom-checkbox text-color">
                                            <input type="checkbox" class="custom-control-input" id="chk_otro" />
                                            <label class="custom-control-label" for="chk_otro"> otro </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row justify-content-end">
                                    <div class="col-6">
                                    <a  id="btn-modal-rechazo" class="btn btn-danger btn-send p-3"
                                        href="javascript:void(0);" @click="motivoRechazo()">
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
    <!-- Modal Rechazo -->
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
    </div>
</template>
<style>

</style>