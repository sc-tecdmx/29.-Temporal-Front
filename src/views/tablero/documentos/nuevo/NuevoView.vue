<script setup>
import { onMounted, ref } from 'vue';
import '@/assets/sass/apps/invoice-add.scss';

//-----------------------
import '@/assets/sass/forms/file-upload-with-preview.min.css';

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
// const options3 = ref([{ name: 'orange' }, { name: 'white', $isDisabled: true }, { name: 'purple' }]);
// const value = ref({ name: 'orange' });
// const options4 = ref(['Lic. Otilio Esteban Hernández Pérez', 'Ing. Isaí Fararoni Ramírez', 'Lic. Nallely ']);
// const options5 = ref(['orange', 'white', 'purple']);

//const catUso = ref(['Interno','Externo']);
const catUso = ref([{ id: '1', label: 'Interno' }, { id: '2', label: 'Externo' }]);
const catAreaDestino = ref([{id:'1', nombre_adscripcion:'Contraloría General'},
{id:'2', nombre_adscripcion:'Secretaría General'},
{id:'3', nombre_adscripcion:'Unidad de Tecnologías de la Información'},
{id:'4', nombre_adscripcion:'Secretaría Administrativa'},
{id:'5', nombre_adscripcion:'Dirección General Jurídica'},
{id:'6', nombre_adscripcion:'Unidad de Jurisprudencia y Estadística'},
{id:'7', nombre_adscripcion:'Coordinación de Comunicación Social y Relaciones Públicas'},
{id:'8', nombre_adscripcion:'Pleno del Tribunal'},
{id:'9', nombre_adscripcion:'Coordinación de Capacitación'},
{id:'10', nombre_adscripcion:'Coordinación de Transparencia y Archivo'},
{id:'11', nombre_adscripcion:'Comisión de Controversias Laborales y Administrativas'},
{id:'12', nombre_adscripcion:'Ponencia del Magistrado Armando Hernández Cruz'},
{id:'13', nombre_adscripcion:'Ponencia del Magistrado Eduardo Arana Miraval'},
{id:'14', nombre_adscripcion:'Ponencia del Magistrado Gustavo Anzaldo Hernández'},
{id:'15', nombre_adscripcion:'Ponencia de la Magistrada María del Carmen Carreón Castro'},
{id:'16', nombre_adscripcion:'Ponencia de la Magistrada  Gabriela Eugenia del Valle Pérez'},
{id:'17', nombre_adscripcion:'Presidencia'},
{id:'18', nombre_adscripcion:'Ponencia de la Magistrada Martha Alejandra Chávez Camarena'},
{id:'19', nombre_adscripcion:'Coordinación de Género y Derechos Humanos'},
{id:'20', nombre_adscripcion:'Coordinación de Difusión y Publicación'},
{id:'21', nombre_adscripcion:'Coordinación de Archivo y Documentación'},
{id:'22', nombre_adscripcion:'Instituto de Formación y Capacitación'},
{id:'23', nombre_adscripcion:'Coordinación de Comunicación Social'},
{id:'24', nombre_adscripcion:'Ponencia de la Magistrada Martha Leticia Mercado Ramírez'},
{id:'25', nombre_adscripcion:'Ponencia del Magistrado Juan Carlos Sánchez León'},
{id:'26', nombre_adscripcion:'Defensoría Pública Ciudadana de Procesos Democráticos'},
{id:'27', nombre_adscripcion:'Coordinación de Vinculación'},
{id:'28', nombre_adscripcion:'Unidad Especializada de Procedimientos Sancionadores'},
{id:'29', nombre_adscripcion:'Contraloría Interna'},
{id:'30', nombre_adscripcion:'Coordinación de Transparencia y Datos Personales'},
{id:'31', nombre_adscripcion:'Coordinación de Derechos Humanos y Género'},
{id:'33', nombre_adscripcion:'Unidad de Servicios Informáticos'},
{id:'34', nombre_adscripcion:'Unidad de Estadística y Jurisprudencia'},
{id:'35', nombre_adscripcion:'Ponencia del Magistrado Armando Ambriz Hernández'}]);
const catAreaCopia = ref([{id:'1', nombre_adscripcion:'Contraloría General'},
{id:'2', nombre_adscripcion:'Secretaría General'},
{id:'3', nombre_adscripcion:'Unidad de Tecnologías de la Información'},
{id:'4', nombre_adscripcion:'Secretaría Administrativa'},
{id:'5', nombre_adscripcion:'Dirección General Jurídica'},
{id:'6', nombre_adscripcion:'Unidad de Jurisprudencia y Estadística'},
{id:'7', nombre_adscripcion:'Coordinación de Comunicación Social y Relaciones Públicas'},
{id:'8', nombre_adscripcion:'Pleno del Tribunal'},
{id:'9', nombre_adscripcion:'Coordinación de Capacitación'},
{id:'10', nombre_adscripcion:'Coordinación de Transparencia y Archivo'},
{id:'11', nombre_adscripcion:'Comisión de Controversias Laborales y Administrativas'},
{id:'12', nombre_adscripcion:'Ponencia del Magistrado Armando Hernández Cruz'},
{id:'13', nombre_adscripcion:'Ponencia del Magistrado Eduardo Arana Miraval'},
{id:'14', nombre_adscripcion:'Ponencia del Magistrado Gustavo Anzaldo Hernández'},
{id:'15', nombre_adscripcion:'Ponencia de la Magistrada María del Carmen Carreón Castro'},
{id:'16', nombre_adscripcion:'Ponencia de la Magistrada  Gabriela Eugenia del Valle Pérez'},
{id:'17', nombre_adscripcion:'Presidencia'},
{id:'18', nombre_adscripcion:'Ponencia de la Magistrada Martha Alejandra Chávez Camarena'},
{id:'19', nombre_adscripcion:'Coordinación de Género y Derechos Humanos'},
{id:'20', nombre_adscripcion:'Coordinación de Difusión y Publicación'},
{id:'21', nombre_adscripcion:'Coordinación de Archivo y Documentación'},
{id:'22', nombre_adscripcion:'Instituto de Formación y Capacitación'},
{id:'23', nombre_adscripcion:'Coordinación de Comunicación Social'},
{id:'24', nombre_adscripcion:'Ponencia de la Magistrada Martha Leticia Mercado Ramírez'},
{id:'25', nombre_adscripcion:'Ponencia del Magistrado Juan Carlos Sánchez León'},
{id:'26', nombre_adscripcion:'Defensoría Pública Ciudadana de Procesos Democráticos'},
{id:'27', nombre_adscripcion:'Coordinación de Vinculación'},
{id:'28', nombre_adscripcion:'Unidad Especializada de Procedimientos Sancionadores'},
{id:'29', nombre_adscripcion:'Contraloría Interna'},
{id:'30', nombre_adscripcion:'Coordinación de Transparencia y Datos Personales'},
{id:'31', nombre_adscripcion:'Coordinación de Derechos Humanos y Género'},
{id:'33', nombre_adscripcion:'Unidad de Servicios Informáticos'},
{id:'34', nombre_adscripcion:'Unidad de Estadística y Jurisprudencia'},
{id:'35', nombre_adscripcion:'Ponencia del Magistrado Armando Ambriz Hernández'}]);
const catDestinatario = ref([{id:'1', nombre:'Lic. Otilio Esteban Hernández Pérez'},{id:'2', nombre:'Ing. Isaí Fararoni Ramírez'},{id:'3', nombre:'Lic. Nallely '}]);
const catCargo = ref([{id:'1',cargo: 'Jefe de Departamento'},
{id:'2',cargo: 'Profesionista Técnico E'},
{id:'3',cargo: 'Jefe de Departamento A'},
{id:'4',cargo: 'Actuario C'},
{id:'6',cargo: 'Secretaria Ejecutiva H'},
{id:'7',cargo: 'Jefe de Departamento B'},
{id:'8',cargo: 'Actuario D'},
{id:'9',cargo: 'Profesionista Técnico F'},
{id:'10',cargo: 'Jefe de Departamento C'},
{id:'11',cargo: 'Actuario E'},
{id:'12',cargo: 'Profesionista Técnico G'},
{id:'13',cargo: 'Jefe de Departamento D'},
{id:'14',cargo: 'Actuario F'},
{id:'15',cargo: 'Profesionista Técnico H'},
{id:'16',cargo: 'Jefe de Departamento E'},
{id:'17',cargo: 'Asesor B'},
{id:'18',cargo: 'Profesor - Investigador A'},
{id:'19',cargo: 'Jefe de Departamento F'},
{id:'20',cargo: 'Profesor - Investigador B'},
{id:'21',cargo: 'Jefe de Departamento G'},
{id:'22',cargo: 'Subdirector de Área A'},
{id:'23',cargo: 'Profesor - Investigador C'},
{id:'24',cargo: 'Subdirector de Área B'},
{id:'25',cargo: 'Asesor C'},
{id:'26',cargo: 'Secretario Auxiliar'},
{id:'27',cargo: 'Subdirector de Área C'},
{id:'28',cargo: 'Secretario Privado A'},
{id:'29',cargo: 'Secretario Auxiliar A'},
{id:'30',cargo: 'Secretario Privado B'},
{id:'31',cargo: 'Subdirector de Área D'},
{id:'32',cargo: 'Secretario Auxiliar B'},
{id:'33',cargo: 'Secretario Privado C'},
{id:'34',cargo: 'Subdirector de Área E'},
{id:'35',cargo: 'Asesor D'},
{id:'36',cargo: 'Secretario Auxiliar C'},
{id:'37',cargo: 'Secretario Particular A'},
{id:'38',cargo: 'Subdirector de Área F'},
{id:'39',cargo: 'Secretario de Estudio y Cuenta'},
{id:'40',cargo: 'Subdirector de Área G'},
{id:'41',cargo: 'Asesor E'},
{id:'42',cargo: 'Secretario Particular B'},
{id:'43',cargo: 'Secretario Particular C'},
{id:'44',cargo: 'Asesor F'},
{id:'45',cargo: 'Director A'},
{id:'46',cargo: 'Secretario de Estudio y Cuenta Coordinador'},
{id:'47',cargo: 'Secretaio de Estudio y Cuenta A'},
{id:'48',cargo: 'Secretario Técnico A'},
{id:'49',cargo: 'Director B'},
{id:'50',cargo: 'Secretario Tecnico de la Secretaría General A'},
{id:'51',cargo: 'Secretario Técnico B'},
{id:'52',cargo: 'Secretario de Estudio y Cuenta B'},
{id:'53',cargo: 'Director C'},
{id:'54',cargo: 'Asesor G'},
{id:'55',cargo: 'Asesor Principal'},
{id:'56',cargo: 'Secretario Técnico de la Secretaría General B'},
{id:'57',cargo: 'Secretario Técnico C'},
{id:'58',cargo: 'Secretario de Estudio y Cuenta C'},
{id:'59',cargo: 'Director D'},
{id:'60',cargo: 'Secretario Técnico de la Secretaría General C'},
{id:'61',cargo: 'Secretario Técnico D'},
{id:'62',cargo: 'Director E'},
{id:'63',cargo: 'Coordinador A'},
{id:'64',cargo: 'Secretario Técnico de la Secretaría General D'},
{id:'65',cargo: 'Coordinador B'},
{id:'66',cargo: 'Director F'},
{id:'67',cargo: 'Coordinador C'},
{id:'68',cargo: 'Director G'},
{id:'69',cargo: 'Secretario General'},
{id:'70',cargo: 'Secretario Administrativo'},
{id:'71',cargo: 'Contralor General'},
{id:'72',cargo: 'Director HH'},
{id:'73',cargo: 'Coordinador DD'},
{id:'74',cargo: 'Coordinador D'},
{id:'75',cargo: 'Director H'},
{id:'76',cargo: 'Secretario General A'},
{id:'77',cargo: 'Secretario Administrativo A'},
{id:'78',cargo: 'Contralor General A'},
{id:'79',cargo: 'Director I'},
{id:'80',cargo: 'Coordinador E'},
{id:'81',cargo: 'Secretario General B'},
{id:'82',cargo: 'Secretario Administrativo B'},
{id:'83',cargo: 'Contralor General B'},
{id:'84',cargo: 'Secretario General C'},
{id:'85',cargo: 'Secretario Administrativo C'},
{id:'86',cargo: 'Contralor General C'},
{id:'87',cargo: 'Magistrado Electoral'},
{id:'88',cargo: 'Presidente del Tribunal'},
{id:'89',cargo: 'Auditor'},
{id:'90',cargo: 'Abogado'},
{id:'91',cargo: 'Secretaria Ejecutiva D'},
{id:'92',cargo: 'Secretaria Ejecutiva C'},
{id:'93',cargo: 'Secretaria Ejecutiva F'},
{id:'94',cargo: 'Secretaria Ejecutiva'},
{id:'95',cargo: 'Coordinador'},
{id:'96',cargo: 'Auxiliar A'},
{id:'97',cargo: 'Auxiliar B'},
{id:'98',cargo: 'Auxiliar C'},
{id:'99',cargo: 'Secretaria A'},
{id:'100',cargo: 'Auxiliar D'},
{id:'101',cargo: 'Secretaria B'},
{id:'102',cargo: 'Secretaria C'},
{id:'103',cargo: 'Chofer A'},
{id:'104',cargo: 'Secretaria D'},
{id:'105',cargo: 'Asistente A'},
{id:'106',cargo: 'Chofer B'},
{id:'107',cargo: 'Secretaria E'},
{id:'108',cargo: 'Asistente B'},
{id:'109',cargo: 'Chofer C'},
{id:'110',cargo: 'Secretaria F'},
{id:'111',cargo: 'Asistente C'},
{id:'112',cargo: 'Secretaria Ejecutiva A'},
{id:'113',cargo: 'Secretaria Ejecutiva B'},
{id:'114',cargo: 'Asistente D'},
{id:'115',cargo: 'Chofer D'},
{id:'117',cargo: 'Chofer E'},
{id:'119',cargo: 'Chofer F'},
{id:'120',cargo: 'Profesionista Técnico A'},
{id:'121',cargo: 'Secretaria Ejecutiva E'},
{id:'122',cargo: 'Chofer G'},
{id:'123',cargo: 'Profesionista Técnico B'},
{id:'125',cargo: 'Actuario A'},
{id:'126',cargo: 'Profesionista Técnico C'},
{id:'127',cargo: 'Asesor A'},
{id:'128',cargo: 'Actuario B'},
{id:'129',cargo: 'Profesionista Técnico D'},
{id:'130',cargo: 'Secretaria Ejecutiva G'},
{id:'131',cargo: 'Jefe de Departamento H'},
{id:'132',cargo: 'Secretario de Estudio y Cuenta A'}]);
const catTipoDocumento = ref([{id:'1',tipo:'Acuerdo de radicación'},
{id:'2',tipo:'Acuerdo de recepción'},
{id:'3',tipo:'Acuerdo de turno'},
{id:'4',tipo:'Oficio'},
{id:'5',tipo:'Acuerdo plenario'},
{id:'6',tipo:'Minuta'}]);
const catFirmantes = ref(['Lic. Otilio Esteban Hernández Pérez', 'Ing. Isaí Fararoni Ramírez', 'Lic. Nallely ']);


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
// const params = ref({
//     title: '',
//     invoice_no: '',
//     from: { name: '', email: '', address: '', phone: '' },
//     to: { name: '', email: '', address: '', phone: '' },

//     invoice_date: '',
//     due_date: '',
//     bank_info: { no: '', name: '', swift_code: '', country: '' },
//     notes: '',
// });

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
	idcargo:'',
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
		"ordenFirma":"",
		"modoCaptura":"",
		"generaNumeroOficio":"",
		"fechaLimite":"",
		"documentos":[]
	},
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

const setValueNoExpediente= (valor)=>{
    params.numeroExpediente = valor
}

console.log("setValueNoExpediente");
console.log(params);
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
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label :for="uso"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Uso:</label>
                                                        <select v-model="params.idUso"
                                                                class="form-select form-select-sm"
                                                                :id="uso">
                                                                <option value="">--Seleccionar--</option>
                                                                <option v-for="opcion in catUso" :value="opcion.id">{{ opcion.label }}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- <SelectCatalogo
                                                    idName = "internoExterno"
                                                    label = "Uso:"
                                                    :options = catUso
                                                ></SelectCatalogo> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label :for="areaDestino"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Área destino:</label>
                                                        <select v-model="params.idAreaDestino"
                                                                class="form-select form-select-sm"
                                                                :id="areaDestino">
                                                                <option value="">--Seleccionar--</option>
                                                                <option v-for="opcion in catAreaDestino" :value="opcion.id">{{ opcion.nombre_adscripcion }}</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- <SelectCatalogo
                                                    idName = "areaDestino"
                                                    label = "Área destino:"
                                                    :options = catAreaDestino
                                                ></SelectCatalogo> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label :for="areaCopia"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Área con copia:</label>
                                                        <select v-model="params.idAreaCopia"
                                                                class="form-select form-select-sm"
                                                                :id="areaCopia">
                                                                <option value="">--Seleccionar--</option>
                                                                <option v-for="opcion in catAreaDestino" :value="opcion.id">{{ opcion.nombre_adscripcion }}</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- <SelectCatalogo
                                                    idName = "areaCopia"
                                                    label = "Área con copia:"
                                                    :options = catAreaCopia
                                                ></SelectCatalogo> -->

                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label :for="tipoDocumento"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Tipo de Documento:</label>
                                                        <select v-model="params.idtipoDocumento"
                                                                class="form-select form-select-sm"
                                                                :id="tipoDocumento">
                                                                <option value="">--Seleccionar--</option>
                                                                <option v-for="opcion in catTipoDocumento" :value="opcion.id">{{ opcion.tipo }}</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- <SelectCatalogo
                                                    idName = "tipoDocumento"
                                                    label = "Tipo de Documento:"
                                                    :options = catTipoDocumento
                                                ></SelectCatalogo> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label
                                                        :for="idDocumento"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">ID del Documento:</label>
                                                        <input
                                                            type="text"
                                                            v-model="params.idDocumento"
                                                            :id="idDocumento"
                                                            class="form-control form-control-sm"
                                                            placeholder=" id documento "
                                                            />
                                                    </div>
                                                </div>
                                                <!-- <InputForm
                                                    idName="idDocumento"
                                                    label = "ID del Documento:"
                                                    placeholder = "id"
                                                ></InputForm> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label
                                                        :for="folio"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Folio:</label>
                                                        <input
                                                            type="text"
                                                            v-model="params.folio"
                                                            :id="folio"
                                                            class="form-control form-control-sm"
                                                            placeholder=" folio "
                                                            />
                                                    </div>
                                                </div>
                                                <!-- <InputForm
                                                    idName="folio"
                                                    label = "Folio:"
                                                    placeholder = "folio"
                                                ></InputForm> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label for="payment-method-account"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Folio del
                                                        documento:</label>
                                                        <input type="text" v-model="params.folioDocumento"
                                                            id="payment-method-account" class="form-control form-control-sm"
                                                            placeholder="Generar ..." />
                                                    </div>
                                                     <!--<div class="col-sm-3">
                                                        Get
                                                    </div> -->
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label
                                                        :for="numeroExpediente"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Número de Expediente:</label>
                                                        <input
                                                            type="text"
                                                            v-model="params.numeroExpediente"
                                                            :id="numeroExpediente"
                                                            class="form-control form-control-sm"
                                                            placeholder="expediente "
                                                            />
                                                    </div>
                                                </div>
                                                <!-- <InputForm
                                                    idName="numeroExpediente"
                                                    label = "Número de Expediente:"
                                                    placeholder = "Expediente"
                                                    v-model="name"
                                                    @setValue="setValueNoExpediente"
                                                ></InputForm> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label
                                                        :for="nombreExpediente"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Nombre de Expediente:</label>
                                                        <input
                                                            type="text"
                                                            v-model="params.nombreExpediente"
                                                            :id="nombreExpediente"
                                                            class="form-control form-control-sm"
                                                            placeholder="nombre de expediente "
                                                            />
                                                    </div>
                                                </div>
                                                <!-- <InputForm
                                                    idName="nombreExpediente"
                                                    label = "Nombre de Expediente:"
                                                    placeholder = "Nombre de expediente"
                                                ></InputForm> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <FechaBasica
                                                    label="Fecha de documento"
                                                ></FechaBasica>
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label :for="destinatario"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Destinatario:</label>
                                                        <select v-model="params.idDestinatario"
                                                                class="form-select form-select-sm"
                                                                :id="destinatario">
                                                                <option value="">--Seleccionar--</option>
                                                                <option v-for="opcion in catDestinatario" :value="opcion.id">{{ opcion.nombre }}</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- <SelectCatalogo
                                                    idName = "destinatario"
                                                    label = "Destinatario:"
                                                    :options = catDestinatario
                                                ></SelectCatalogo> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label :for="cargo"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Cargo:</label>
                                                        <select v-model="params.idCargo"
                                                                class="form-select form-select-sm"
                                                                :id="cargo">
                                                                <option value="">--Seleccionar--</option>
                                                                <option v-for="opcion in catCargo" :value="opcion.id">{{ opcion.cargo }}</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- <SelectCatalogo
                                                    idName = "cargo"
                                                    label = "Cargo:"
                                                    :options = catCargo
                                                ></SelectCatalogo> -->
                                            </div>
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <div class="form-group row invoice-created-by">
                                                    <div class="col-sm-12">
                                                        <label
                                                        :for="asuntoDocumento"
                                                        class="col-sm-12 col-form-label col-form-label-sm pb-0">Asunto:</label>
                                                        <input
                                                            type="text"
                                                            v-model="params.asunto"
                                                            :id="asuntoDocumento"
                                                            class="form-control form-control-sm"
                                                            placeholder="asunto "
                                                            />
                                                    </div>
                                                </div>
                                                <!-- <InputForm
                                                    idName="asuntoDocumento"
                                                    label = "Asunto:"
                                                    placeholder = "Asunto"
                                                ></InputForm> -->
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
                                    <!-- {{ params }} -->
                                    <!-- .// Fin del Título del documento -->
                                    <!-- Agregar Firmantes -->
                                    <TablaAgregar
                                        titulo="Agregar Firmantes"
                                        labelButton="Agregar firmante"
                                        :options = catFirmantes
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
                                    <h4 class="ms-5 mb-3">Configuración</h4>
                                        <!-- <label for="currency">Configuración</label> -->
                                        <SwitchRounded
                                            class="ms-5"
                                            label="Firmar en este orden"
                                        ></SwitchRounded>
                                        <SwitchRounded
                                            class="ms-5"
                                            label="Mantener en modo captura"
                                        ></SwitchRounded>
                                        <SwitchRounded
                                            class="ms-5"
                                            label="Generar número de oficio"
                                        ></SwitchRounded>

                                </div>
                                <!-- Fecha límite de firma -->
                                <div class="invoice-action-tax ms-4">
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


                                <div class="invoice-action-discount ms-5">
                                    <h4>Documentos a firmar</h4>
                                    <div class="row">
                                        <div class="col-12 col-sm-8 col-lg-6">
                                            <AgregarArchivoMultiple></AgregarArchivoMultiple>
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
                                            <a href="javascript:;" class="btn btn-primary btn-send">Guardar captura</a>
                                        </div>
                                        <div class="col-xl-3 col-md-3">
                                            <a data-bs-toggle="modal" data-bs-target="#composeMailModal"
                                                id="btn-compose-mail" class="btn btn-secondary btn-send p-3"
                                                href="javascript:void(0);" @click="open_mail('add')">
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