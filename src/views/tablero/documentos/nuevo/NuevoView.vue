<script setup>
import { onMounted, ref } from 'vue';
import '@/assets/sass/apps/invoice-add.scss';

//-----------------------
import '@/assets/sass/forms/file-upload-with-preview.min.css';



//flatpickr
//import flatPickr from 'vue-flatpickr-component';
//import 'flatpickr/dist/flatpickr.css';
import '@/assets/sass/forms/custom-flatpickr.css';

import { useMeta } from '@/composables/use-meta';
/** Multiselect */
import '@/assets/sass/scrollspyNav.scss';
import highlight from '@/components/plugins/highlight.vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

import InputForm from '@/components/wrapper/InputForm.vue'
import SelectCatalogo from '../../../../components/wrapper/SelectCatalogo.vue';
import TablaAgregar from '../../../../components/wrapper/TablaAgregar.vue';
import TextAreaNotas from '../../../../components/wrapper/TextAreaNotas.vue';
import IconUploadCloud from '../../../../components/icons/IconUploadCloud.vue';
import AgregarArchivoMultiple from '../../../../components/wrapper/AgregarArchivoMultiple.vue';
import AgregarArchivo from '../../../../components/wrapper/AgregarArchivo.vue';
import FechaBasica from '../../../../components/wrapper/FechaBasica.vue';
import SwitchRounded from '../../../../components/wrapper/SwitchRounded.vue';


useMeta({ title: 'Vue Multiselect' });
/** ./Multiselect */
useMeta({ title: 'Invoice Add' });

/* Select 2 */
const code_arr = ref([]);
const options1 = ref(['orange', 'white', 'purple']);
const inputs = ref({
    input1: [],
    input2: [],
    input3: [],
    input4: [],
    input5: [],
});
const options2 = ref([
    {
        group_name: 'Group 1',
        list: [{ name: 'orange' }, { name: 'white' }, { name: 'purple' }],
    },
    {
        group_name: 'Group 2',
        list: [{ name: 'red' }, { name: 'green' }, { name: 'yellow' }],
    },
    {
        group_name: 'Group 3',
        list: [{ name: 'aqua' }, { name: 'black' }, { name: 'blue' }],
    },
]);
const options3 = ref([{ name: 'orange' }, { name: 'white', $isDisabled: true }, { name: 'purple' }]);
const value = ref({ name: 'orange' });
const options4 = ref(['Lic. Otilio Esteban Hernández Pérez', 'Ing. Isaí Fararoni Ramírez', 'Lic. Nallely ']);
const options5 = ref(['orange', 'white', 'purple']);

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
const params = ref({
    title: '',
    invoice_no: '',
    from: { name: '', email: '', address: '', phone: '' },
    to: { name: '', email: '', address: '', phone: '' },

    invoice_date: '',
    due_date: '',
    bank_info: { no: '', name: '', swift_code: '', country: '' },
    notes: '',
});
const currency_list = ref([]);
const selected_currency = ref({ key: 'Oficio de radicación', thumb: 'flags/tecdmx.png' });
const tax_type_list = ref([]);
const selected_tax_type = ref({ key: 'None', value: null });
const discount_list = ref([]);
const selected_discount = ref({ key: 'None', value: null, type: '' });

onMounted(() => {
    //set default data
    items.value.push({ id: 1, title: '', description: '', rate: 0, quantity: 0, amount: 100, is_tax: false });

    let dt = new Date();
    params.value.invoice_date = JSON.parse(JSON.stringify(dt));
    dt.setDate(dt.getDate() + 5);
    params.value.due_date = dt;

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

const change_file = (event) => {
    selected_file.value = URL.createObjectURL(event.target.files[0]);
};

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
        <!-- <teleport to="#breadcrumb">
            <ul class="navbar-nav flex-row">
                <li>
                    <div class="page-header">
                        <nav class="breadcrumb-one" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:;">Apps</a></li>
                                <li class="breadcrumb-item active" aria-current="page"><span>Invoice Add</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport> -->

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
                                    <!-- Título del documento PAO-->
                                    <div class="invoice-detail-total mb-3">
                                        <div class="row">
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName = "internoExterno"
                                                    label = "Interno-Externo:"
                                                    options = []
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName = "areaDestino"
                                                    label = "Área destino:"
                                                    options = []
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName = "areaCopia"
                                                    label = "Área con copia:"
                                                    options = []
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName = "TipoDocumento"
                                                    label = "Tipo de Documento:"
                                                    options = []
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="idDocumento"
                                                    label = "ID del Documento:"
                                                    placeholder = "id"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="folio"
                                                    label = "Folio:"
                                                    placeholder = "folio"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label for="payment-method-account"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Folio del
                                                        documento:</label>
                                                        <input type="text" v-model="params.bank_info.no"
                                                            id="payment-method-account" class="form-control form-control-sm"
                                                            placeholder="Generar ..." />
                                                    </div>
                                                     <!--<div class="col-sm-3">
                                                        Get
                                                    </div> -->
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="numeroExpediente"
                                                    label = "Número de Expediente:"
                                                    placeholder = "Expediente"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="nombreExpediente"
                                                    label = "Nombre de Expediente:"
                                                    placeholder = "Nombre de expediente"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <FechaBasica
                                                    label="Fecha de documento"
                                                ></FechaBasica>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName = "destinatario"
                                                    label = "Destinatario:"
                                                    options = []
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <SelectCatalogo
                                                    idName = "cargo"
                                                    label = "Cargo:"
                                                    options = []
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="asuntoDocumento"
                                                    label = "Asunto:"
                                                    placeholder = "Asunto"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="elaboro"
                                                    label = "Elaboró:"
                                                    placeholder = "Usuario"
                                                ></InputForm>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <InputForm
                                                    idName="contenidoDocumento"
                                                    label = "Contenido:"
                                                    placeholder = "Contenido"
                                                ></InputForm>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- .// Fin del Título del documento -->
                                    <!-- Agregar Firmantes -->
                                    <TablaAgregar
                                        titulo="Agregar Firmantes"
                                        labelButton="Agregar firmante"
                                    ></TablaAgregar>

                                    <!-- Agregar Destinatarios -->
                                    <TablaAgregar
                                        titulo="Agregar Destinatarios"
                                        labelButton="Agregar Destinatario"
                                    ></TablaAgregar>

                                    <!-- ./ Agregar Firmantes -->
                                    <TextAreaNotas
                                        label="Notas:"
                                        placeholder="Agregue sus observaciones"
                                    ></TextAreaNotas>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="invoice-actions">
                                <div class="invoice-action-currency">
                                    <!-- <div class="form-group mb-0"> -->
                                        <label for="currency">Configuración</label>
                                        <SwitchRounded 
                                            class="ms-2"
                                            label="Firmar en este orden"
                                        ></SwitchRounded>
                                        <SwitchRounded 
                                            class="ms-2"
                                            label="Mantener en modo captura"
                                        ></SwitchRounded>
                                        <SwitchRounded 
                                            class="ms-2"
                                            label="Generar número de oficio"
                                        ></SwitchRounded>
                                    <!-- </div> -->
                                </div>
                                <!-- Fecha límite de firma -->
                                <div class="invoice-action-tax">
                                    <div class="invoice-action-tax-fields">
                                        <div class="row">
                                            <div class="col-12 col-sm-8 col-lg-4">
                                                <FechaBasica
                                                    label="Fecha límite de firma"
                                                ></FechaBasica>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                                <div class="invoice-action-discount">
                                    <h5>Documentos a firmar</h5>
                                    <div class="row">
                                        <div class="col-12 col-sm-8 col-lg-6">
                                            <AgregarArchivoMultiple></AgregarArchivoMultiple>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="invoice-actions-btn d-flex flex-row-reverse">
                                <div class="invoice-action-btn">
                                    <div class="row">
                                        <div class="col-xl-4 col-md-4">
                                            <a href="javascript:;" class="btn btn-primary btn-send">Guardar captura</a>
                                        </div>
                                        <div class="col-xl-4 col-md-4">
                                            <a data-bs-toggle="modal" data-bs-target="#composeMailModal"
                                                id="btn-compose-mail" class="btn btn-secondary btn-send p-3"
                                                href="javascript:void(0);" @click="open_mail('add')">
                                                Firmar ahora
                                            </a>

                                        </div>
                                        <div class="col-xl-4 col-md-4">
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
    <div id="composeMailModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <div class="row">
                                    <div class="col-md-12">
                                        <AgregarArchivo
                                            label="Archivo de certificado (*.cer)"
                                        ></AgregarArchivo>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <AgregarArchivo
                                            label="Archivo de certificado (*.key)"
                                        ></AgregarArchivo>
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