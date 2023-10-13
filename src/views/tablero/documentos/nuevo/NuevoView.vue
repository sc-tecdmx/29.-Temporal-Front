<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import '@/assets/sass/apps/invoice-add.scss';
//-----------------------
import '@/assets/sass/forms/file-upload-with-preview.min.css';
import '@/assets/sass/forms/custom-flatpickr.css';
import { useMeta } from '@/composables/use-meta';
/** Multiselect */
import '@/assets/sass/scrollspyNav.scss';
//import highlight from '@/components/plugins/highlight.vue';
//import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
//flatpickr
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import '@/assets/sass/forms/custom-flatpickr.css';

//Componentes
import InputForm from '@/components/wrapper/InputForm.vue'
import SelectCatalogo from '../../../../components/wrapper/SelectCatalogo.vue';
import TablaAgregar from '../../../../components/wrapper/TablaAgregar.vue';
import TextAreaNotas from '../../../../components/wrapper/TextAreaNotas.vue';
//import AgregarArchivoMultiple from '../../../../components/wrapper/AgregarArchivoMultiple.vue';
//import AgregarArchivo from '../../../../components/wrapper/AgregarArchivo.vue';
//import FechaBasica from '../../../../components/wrapper/FechaBasica.vue';
import SwitchRounded from '../../../../components/wrapper/SwitchRounded.vue';
import SelectValidado from '../../../../components/wrapper/SelectValidado.vue';
import { getCertificadoData } from '@/firma/main.mjs';

//useMeta({ title: 'Vue Multiselect' });
/** ./Multiselect */
useMeta({ title: 'Nuevo documento' });

const inputs = ref({
    input1: [],
    input2: [],
    input3: [],
    input4: [],
    input5: [],
});



 const route = useRoute();
 //console.log(route.params.tipo)
let firmaSimple = false;
let firmaMultiple = false;
 if(route.params.tipo === "simple"){
     firmaSimple = true;
     firmaMultiple = false;
 }else{
     firmaMultiple = true;
     firmaSimple = false;
 }

//  console.log("tipo de firma");
//  console.log("firmaSimple   " + firmaSimple);
//  console.log("firmaMultiple  " + firmaMultiple);


/* Variable para Catálogos */

const thFirmantes= ['Nombre','Firma', 'Editar', 'Estado', ''];
const thDestinatarios= ['Nombre','Instrucción', 'Editar', 'Estado', ''];

/* Fin catalogos */

const toggleCode = (name) => {
    if (code_arr.value.includes(name)) {
        code_arr.value = code_arr.value.filter((d) => d != name);
    } else {
        code_arr.value.push(name);
    }
};

const addTag = (newTag) => {
    options4.value.push(newTag);
    inputs.value['input4'].push(newTag);
};

const addTag1 = (tag) => {
    options5.value.push(newTag);
    inputs.value['input5'].push(newTag);
};

/* ..// Select 2 */
const items = ref([]);
const selected_file = ref(null);
const selected_file_cer = ref(null);
const selected_file_key = ref(null);
const contrasenaCer = ref(null);

const certificado = ref({
    archivoCer:'',
    archivoKey:'',
    contrasenaCer:'',
    documento: '',
});

/* JSON */
const params = ref({
    idUso:'',
    idAreaDestino:'',
    idAreaCopia: '',
    idtipoDocumento:'',
    idDocumento:'',
    folio:'',
	folioDocumento:'',
	numeroExpediente:'',
	nombreExpediente:"",
	fechaDocumento:'',
	idDestinatario:'',
	idCargo:'',
	asunto:'',
	elaboro:'',
	contenido:'',
	firmantes:[
		{
			idFirmante:'',
			firma:'',
			obligatorio:'',
			estado:''
		},
	],
	destinatarios:[
		{
			idDestinatario:'',
			instruccion:'',
			estado:''
		},
		{
			idDestinatario:'',
			instruccion:'',
			estado:''
		},
	],
	notas:'',
	configuracion:{
		ordenFirma:'',
		modoCaptura:'',
		generaNumeroOficio:'',
		fechaLimite:'',
		documentos:[]
	},
});

/* Set params */
const opcionSelectUso = (idOpcion) => {
    params.value.idUso = idOpcion;
}
const opcionSelectAreaDestino = (idOpcion) => {
    params.value.idAreaDestino = idOpcion;
}
const opcionSelectAreaCopia = (idOpcion) => {
    params.value.idAreaCopia = idOpcion;
}
const opcionSelectTipoDocumento = (idOpcion) => {
    params.value.idAreaCopia = idOpcion;
}
const opcionSelectDestinatario = (idOpcion) => {
    params.value.idDestinatario = idOpcion;
}
const opcionSelectCargo = (idOpcion) => {
    params.value.idCargo = idOpcion;
}
const opcionInputIdDocumento = (idData) => {
    params.value.idDocumento = idData;
}
const opcionInputFolio = (idData) => {
    params.value.folio = idData;
}
const opcionInputFolioDocumento = (idData) => {
    params.value.folioDocumento = idData;
}
const opcionInputNumeroExpediente = (idData) => {
    params.value.numeroExpediente = idData;
}
const opcionInputNombreExpediente = (idData) => {
    params.value.nombreExpediente = idData;
}
const opcionInputAsunto = (idData) => {
    params.value.asunto = idData;
}
const opcionInputElaboro = (idData) => {
    params.value.elaboro = idData;
}
const opcionInputContenido = (idData) => {
    params.value.elaboro = idData;
}
const opcionSwitchOrdenFirma = (idData) => {
    params.value.configuracion.ordenFirma = idData;
}
const opcionSwitchModoCaptura = (idData) => {
    params.value.configuracion.modoCaptura = idData;
}
const opcionSwitchGeneraOficio = (idData) => {
    params.value.configuracion.generaNumeroOficio = idData;
}
const opcionTxtAreaNotas = (idData) => {
    params.value.notas = idData;
}
const opcionDateDocumento = (date) => {
    params.value.fechaDocumento = date;
}
/* FIN Set params */




const currency_list = ref([]);
//const selected_currency = ref({ key: 'Oficio de radicación', thumb: 'flags/tecdmx.png' });
const tax_type_list = ref([]);
const selected_tax_type = ref({ key: 'None', value: null });
const discount_list = ref([]);
//const selected_discount = ref({ key: 'None', value: null, type: '' });

onMounted(() => {
    
    //set default data
    items.value.push({ id: 1, title: '', description: '', rate: 0, quantity: 0, amount: 100, is_tax: false });

    /* Fecha del documento y fecha limite */
    let dt = new Date();
    params.value.fechaDocumento = JSON.parse(JSON.stringify(dt));
    dt.setDate(dt.getDate() + 5);
    params.value.configuracion.fechaLimite = dt;

    //currency list
    currency_list.value = [
        { key: 'Acuerdo de radicación', thumb: 'flags/tecdmx.png' },
        { key: 'Acuerdo de recepción', thumb: 'flags/tecdmx.png' },
        { key: 'Acuerdo de turno', thumb: 'flags/tecdmx.png' },
        { key: 'Oficio', thumb: 'flags/tecdmx.png' },
        { key: 'Acuerdo plenario', thumb: 'flags/tecdmx.png' },
        { key: 'Minuta', thumb: 'flags/tecdmx.png' },
        { key: 'Interinstitucional', thumb: 'flags/tecdmx.png' },
    ];

    //tax type list
    tax_type_list.value = [
        { key: 'Deducted', value: 10 },
        { key: 'Per Item', value: 5 },
        { key: 'On Total', value: 25 },
        { key: 'None', value: null },
    ];

    //discount list
    discount_list.value = [
        { key: 'Percent', value: 10, type: 'percent' },
        { key: 'Flat Amount', value: 25, type: 'amount' },
        { key: 'None', value: null, type: '' },
    ];
});

/* Obtener documentos */
const change_file = (event) => {
    //selected_file.value = URL.createObjectURL(event.target.files[0]);
    selected_file.value = event.target.files[0];
    params.value.configuracion.documentos = selected_file.value;
    certificado.value.documento = selected_file.value;
};
/* Guarda Capruta */
const enviaCaptura =()=>{
    console.log("Captura");
    console.log(params.value);
}

/* Modal firmar ahora */
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


const add_item = () => {
    let max_id = 0;
    if (items.value && items.value.length) {
        max_id = items.value.reduce((max, character) => (character.id > max ? character.id : max), items.value[0].id);
    }
    items.value.push({ id: max_id + 1, title: '', description: '', rate: 0, quantity: 0, amount: 0, is_tax: false });
};

const remove_item = (item) => {
    items.value = items.value.filter((d) => d.id != item.id);
};

</script>
<template>
    <div class="layout-px-spacing apps-invoice-add">

         <div class="row invoice layout-top-spacing layout-spacing no-gutters justify-content-center">  <!--PAO -->
            <div class="col-xxl-10 col-12"> <!--PAO -->
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
                                    <!-- <form class="select" novalidate @submit.stop.prevent="submit_form3">
                                            <div class="col-12 col-md-3">
                                                <SelectValidado></SelectValidado>
                                            </div>
                                        <button class="btn btn-primary mt-2" type="submit">Submit form</button>
                                    </form> -->
                                    <!-- Título del documento PAO-->
                                    <div class="invoice-detail-total mb-3">
                                        <div class="row">
                                            <div class="col-12 col-md-3">
                                                <SelectCatalogo
                                                    idName= "catUso"
                                                    label= "Uso:"
                                                    url="http://localhost/j/documentos/catUso.php"
                                                    @opcionSelect = "opcionSelectUso"
                                                ></SelectCatalogo>
                                            </div>

                                            <div class="col-12 col-md-6 col-lg-3 offset-md-3 ">
                                                <InputForm
                                                    idName="folio"
                                                    label = "Folio:"
                                                    placeholder = "folio"
                                                    @inputData="opcionInputFolio"
                                                ></InputForm>
                                            </div>
                                        </div>
                                        <!-- áreas -->
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <SelectCatalogo
                                                    idName= "catAreaDestino"
                                                    label= "Área destino:"
                                                    url="http://localhost/j/documentos/catAreaDestino.php"
                                                    @opcionSelect = "opcionSelectAreaDestino"
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <SelectCatalogo
                                                    idName= "catAreaCopia"
                                                    label= "Área con copia:"
                                                    url="http://localhost/j/documentos/catAreaDestino.php"
                                                    @opcionSelect = "opcionSelectAreaCopia"
                                                ></SelectCatalogo>

                                            </div>
                                        </div>
                                        <!--Datos destinatario-->
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <SelectCatalogo
                                                    idName= "catDestinatario"
                                                    label= "Destinatario:"
                                                    url="http://localhost/j/documentos/catDestinatario.php"
                                                    @opcionSelect = "opcionSelectDestinatario"
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <SelectCatalogo
                                                    idName= "catCargo"
                                                    label= "Cargo:"
                                                    url="http://localhost/j/documentos/catCargo.php"
                                                    @opcionSelect = "opcionSelectCargo"
                                                ></SelectCatalogo>
                                            </div>
                                        </div>
                                        <!-- Datos del documento -->
                                        <div class="row">
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName= "catTipoDocumento"
                                                    label= "Tipo de documento:"
                                                    url="http://localhost/j/documentos/catTipoDocumento.php"
                                                    @opcionSelect = "opcionSelectTipoDocumento"
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="idDocumento"
                                                    label = "ID del Documento:"
                                                    placeholder = "id"
                                                    @inputData="opcionInputIdDocumento"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="folioDocumento"
                                                    label = "Folio del documento:"
                                                    placeholder = "get"
                                                    @inputData="opcionInputFolioDocumento"
                                                ></InputForm>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-6 col-lg-4">
                                                 <div class="row">
                                                    <div class="form-group mb-1">
                                                        <label class="mb-0" style="color: black;font-size: 14px;">Fecha de documento:</label>
                                                        <flat-pickr v-model="params.fechaDocumento"
                                                                    class="form-control form-control-sm flatpickr active"
                                                                    placeholder="Seleccionar"></flat-pickr>
                                                    </div>
                                                    <div class="col-12">
                                                        <div v-if="selected_tax_type.value !== null" class="form-group mb-0 tax-rate-deducted">
                                                            <label for="rate">Rate (%)</label>
                                                                <input v-model="selected_tax_type.value" type="number" min="0" max="100"
                                                                class="input-rate form-control" placeholder="Rate" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <FechaBasica
                                                    label="Fecha de documento:"
                                                    :date="params.fechaDocumento"
                                                    @dateSelected="opcionDateDocumento"
                                                ></FechaBasica> -->

                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="numeroExpediente"
                                                    label = "Número de Expediente:"
                                                    placeholder = "Expediente"
                                                    @inputData="opcionInputNumeroExpediente"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="nombreExpediente"
                                                    label = "Nombre de Expediente:"
                                                    placeholder = "Nombre de expediente"
                                                    @inputData="opcionInputNombreExpediente"
                                                ></InputForm>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-6">
                                                <InputForm
                                                    idName="asuntoDocumento"
                                                    label = "Asunto:"
                                                    placeholder = "Asunto"
                                                    @inputData="opcionInputAsunto"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <InputForm
                                                    idName="elaboro"
                                                    label = "Elaboró:"
                                                    placeholder = "usuario"
                                                    @inputData="opcionInputElaboro"
                                                ></InputForm>
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-12">
                                                <InputForm
                                                    idName="contenidoDoc"
                                                    label = "Contenido:"
                                                    placeholder = "contenido"
                                                    @inputData="opcionInputContenido"
                                                ></InputForm>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- .// Fin del Título del documento -->
                                    <!-- Agregar Firmantes -->
                                    <TablaAgregar
                                        titulo="Agregar Firmantes"
                                        labelButton="Agregar firmante"
                                        url="http://localhost/j/documentos/catFirmantes.php"
                                        :thtabla = thFirmantes
                                    ></TablaAgregar>

                                    <!-- Agregar Destinatarios -->
                                    <TablaAgregar
                                        titulo="Agregar Destinatarios"
                                        labelButton="Agregar Destinatario"
                                        url="http://localhost/j/documentos/catFirmantes.php"
                                        :thtabla = thDestinatarios
                                    ></TablaAgregar>

                                    <!-- ./ Agregar Firmantes -->
                                    <TextAreaNotas
                                        label="Notas:"
                                        placeholder="Agregue sus observaciones"
                                        @txtArea="opcionTxtAreaNotas"
                                    ></TextAreaNotas>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="invoice-actions">
                                <div class="invoice-action-currency">
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

                                </div>

                                <!-- Fecha límite de firma -->
                                <div class="invoice-action-tax ms-4">
                                    <div class="invoice-action-tax-fields">
                                        <div class="row">
                                            <div class="col-12 col-sm-8 col-lg-4">

                                                <div class="row">
                                                    <div class="form-group mb-1">
                                                        <label class="mb-0">Fecha límite de firma :</label>
                                                        <flat-pickr v-model="params.configuracion.fechaLimite"
                                                                    class="form-control form-control-sm flatpickr active"
                                                                    placeholder="Seleccionar"></flat-pickr>
                                                    </div>
                                                    <div class="col-12">
                                                        <div v-if="selected_tax_type.value !== null" class="form-group mb-0 tax-rate-deducted">
                                                            <label for="rate">Rate (%)</label>
                                                                <input v-model="selected_tax_type.value" type="number" min="0" max="100"
                                                                class="input-rate form-control" placeholder="Rate" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <FechaBasica
                                                    label="Fecha límite de firma"
                                                ></FechaBasica> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- {{ params }} -->

                                <div class="invoice-action-discount ms-5">
                                    <h4>Documentos a firmar</h4>
                                    <div class="row">
                                        <div class="col-12 col-sm-8 col-lg-6">
                                            <div class="mb-3">
                                                <label for="formFileMultiple" class="form-label"></label>
                                                <input class="form-control" type="file" id="formFileMultiple" @change="change_file" accept=".pdf" multiple>
                                            </div>
                                            <!-- <AgregarArchivoMultiple></AgregarArchivoMultiple> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="invoice-actions-btn d-flex flex-row-reverse mt-1">
                                <div class="invoice-action-btn">
                                    <div class="row">
                                        <div class="col-xl-3 col-md-3">
                                            <a href="javascript:;" class="btn btn-danger btn-send p-3">Cancelar</a>
                                        </div>
                                        <div class="col-xl-3 col-md-3">
                                            <a href="javascript:;" class="btn btn-primary btn-send" @click="enviaCaptura()">Guardar captura</a>
                                        </div>
                                        <div class="col-xl-3 col-md-3">
                                            <a data-bs-toggle="modal" data-bs-target="#certificadoModal"
                                                id="btn-certificado" class="btn btn-secondary btn-send p-3"
                                                href="javascript:void(0);" @click="">
                                                Firmar ahora
                                            </a>
                                        </div>
                                        <div class="col-xl-3 col-md-3">
                                            <a href="javascript:;" class="btn btn-success btn-download">Enviar a
                                                firmantes</a>
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
    <!-- Modal -->
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
</template>
<style>

</style>