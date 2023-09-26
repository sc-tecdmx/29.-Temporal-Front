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
//flatpickr
import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

import InputForm from '@/components/wrapper/InputForm.vue'
import SelectCatalogo from '../../../../components/wrapper/SelectCatalogo.vue';
import TablaAgregar from '../../../../components/wrapper/TablaAgregar.vue';
import TextAreaNotas from '../../../../components/wrapper/TextAreaNotas.vue';
import AgregarArchivoMultiple from '../../../../components/wrapper/AgregarArchivoMultiple.vue';
import AgregarArchivo from '../../../../components/wrapper/AgregarArchivo.vue';
import FechaBasica from '../../../../components/wrapper/FechaBasica.vue';
import SwitchRounded from '../../../../components/wrapper/SwitchRounded.vue';
import axios from 'axios';
import { getCertificadoData } from '@/firma/main.mjs';


useMeta({ title: 'Vue Multiselect' });
/** ./Multiselect */
useMeta({ title: 'Invoice Add' });

/* Select 2 */
// const code_arr = ref([]);
// const options1 = ref(['orange', 'white', 'purple']);
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

/* Obtener Catálogos */
const catUso = ref([{ id: '1', label: 'Interno' }, { id: '2', label: 'Externo' }]);
const catAreaDestino = ref([{id:'1', label:'Contraloría General'},
                            {id:'2', label:'Secretaría General'},
                            {id:'3', label:'Unidad de Tecnologías de la Información'},
                            {id:'4', label:'Secretaría Administrativa'},
                            {id:'5', label:'Dirección General Jurídica'},
                            {id:'6', label:'Unidad de Jurisprudencia y Estadística'},
                            {id:'7', label:'Coordinación de Comunicación Social y Relaciones Públicas'},
                            {id:'8', label:'Pleno del Tribunal'},
                            {id:'9', label:'Coordinación de Capacitación'},
                            {id:'10', label:'Coordinación de Transparencia y Archivo'},
                            {id:'11', label:'Comisión de Controversias Laborales y Administrativas'},
                            {id:'12', label:'Ponencia del Magistrado Armando Hernández Cruz'},
                            {id:'13', label:'Ponencia del Magistrado Eduardo Arana Miraval'},
                            {id:'14', label:'Ponencia del Magistrado Gustavo Anzaldo Hernández'},
                            {id:'15', label:'Ponencia de la Magistrada María del Carmen Carreón Castro'},
                            {id:'16', label:'Ponencia de la Magistrada  Gabriela Eugenia del Valle Pérez'},
                            {id:'17', label:'Presidencia'},
                            {id:'18', label:'Ponencia de la Magistrada Martha Alejandra Chávez Camarena'},
                            {id:'19', label:'Coordinación de Género y Derechos Humanos'},
                            {id:'20', label:'Coordinación de Difusión y Publicación'},
                            {id:'21', label:'Coordinación de Archivo y Documentación'},
                            {id:'22', label:'Instituto de Formación y Capacitación'},
                            {id:'23', label:'Coordinación de Comunicación Social'},
                            {id:'24', label:'Ponencia de la Magistrada Martha Leticia Mercado Ramírez'},
                            {id:'25', label:'Ponencia del Magistrado Juan Carlos Sánchez León'},
                            {id:'26', label:'Defensoría Pública Ciudadana de Procesos Democráticos'},
                            {id:'27', label:'Coordinación de Vinculación'},
                            {id:'28', label:'Unidad Especializada de Procedimientos Sancionadores'},
                            {id:'29', label:'Contraloría Interna'},
                            {id:'30', label:'Coordinación de Transparencia y Datos Personales'},
                            {id:'31', label:'Coordinación de Derechos Humanos y Género'},
                            {id:'33', label:'Unidad de Servicios Informáticos'},
                            {id:'34', label:'Unidad de Estadística y Jurisprudencia'},
                            {id:'35', label:'Ponencia del Magistrado Armando Ambriz Hernández'}]);
                            const catAreaCopia = ref([{id:'1', label:'Contraloría General'},
                        {id:'2', label:'Secretaría General'},
                        {id:'3', label:'Unidad de Tecnologías de la Información'},
                        {id:'4', label:'Secretaría Administrativa'},
                        {id:'5', label:'Dirección General Jurídica'},
                        {id:'6', label:'Unidad de Jurisprudencia y Estadística'},
                        {id:'7', label:'Coordinación de Comunicación Social y Relaciones Públicas'},
                        {id:'8', label:'Pleno del Tribunal'},
                        {id:'9', label:'Coordinación de Capacitación'},
                        {id:'10', label:'Coordinación de Transparencia y Archivo'},
                        {id:'11', label:'Comisión de Controversias Laborales y Administrativas'},
                        {id:'12', label:'Ponencia del Magistrado Armando Hernández Cruz'},
                        {id:'13', label:'Ponencia del Magistrado Eduardo Arana Miraval'},
                        {id:'14', label:'Ponencia del Magistrado Gustavo Anzaldo Hernández'},
                        {id:'15', label:'Ponencia de la Magistrada María del Carmen Carreón Castro'},
                        {id:'16', label:'Ponencia de la Magistrada  Gabriela Eugenia del Valle Pérez'},
                        {id:'17', label:'Presidencia'},
                        {id:'18', label:'Ponencia de la Magistrada Martha Alejandra Chávez Camarena'},
                        {id:'19', label:'Coordinación de Género y Derechos Humanos'},
                        {id:'20', label:'Coordinación de Difusión y Publicación'},
                        {id:'21', label:'Coordinación de Archivo y Documentación'},
                        {id:'22', label:'Instituto de Formación y Capacitación'},
                        {id:'23', label:'Coordinación de Comunicación Social'},
                        {id:'24', label:'Ponencia de la Magistrada Martha Leticia Mercado Ramírez'},
                        {id:'25', label:'Ponencia del Magistrado Juan Carlos Sánchez León'},
                        {id:'26', label:'Defensoría Pública Ciudadana de Procesos Democráticos'},
                        {id:'27', label:'Coordinación de Vinculación'},
                        {id:'28', label:'Unidad Especializada de Procedimientos Sancionadores'},
                        {id:'29', label:'Contraloría Interna'},
                        {id:'30', label:'Coordinación de Transparencia y Datos Personales'},
                        {id:'31', label:'Coordinación de Derechos Humanos y Género'},
                        {id:'33', label:'Unidad de Servicios Informáticos'},
                        {id:'34', label:'Unidad de Estadística y Jurisprudencia'},
                        {id:'35', label:'Ponencia del Magistrado Armando Ambriz Hernández'}]);

const catDestinatario = ref([{id:'1', label:'Lic. Otilio Esteban Hernández Pérez'},{id:'2', label:'Ing. Isaí Fararoni Ramírez'},{id:'3', label:'Lic. Nallely '}]);

const catCargo = ref([{id:'1',label: 'Jefe de Departamento'},
                    {id:'2',label: 'Profesionista Técnico E'},
                    {id:'3',label: 'Jefe de Departamento A'},
                    {id:'4',label: 'Actuario C'},
                    {id:'6',label: 'Secretaria Ejecutiva H'},
                    {id:'7',label: 'Jefe de Departamento B'},
                    {id:'8',label: 'Actuario D'},
                    {id:'9',label: 'Profesionista Técnico F'},
                    {id:'10',label: 'Jefe de Departamento C'},
                    {id:'11',label: 'Actuario E'},
                    {id:'12',label: 'Profesionista Técnico G'},
                    {id:'13',label: 'Jefe de Departamento D'},
                    {id:'14',label: 'Actuario F'},
                    {id:'15',label: 'Profesionista Técnico H'},
                    {id:'16',label: 'Jefe de Departamento E'},
                    {id:'17',label: 'Asesor B'},
                    {id:'18',label: 'Profesor - Investigador A'},
                    {id:'19',label: 'Jefe de Departamento F'},
                    {id:'20',label: 'Profesor - Investigador B'},
                    {id:'21',label: 'Jefe de Departamento G'},
                    {id:'22',label: 'Subdirector de Área A'},
                    {id:'23',label: 'Profesor - Investigador C'},
                    {id:'24',label: 'Subdirector de Área B'},
                    {id:'25',label: 'Asesor C'},
                    {id:'26',label: 'Secretario Auxiliar'},
                    {id:'27',label: 'Subdirector de Área C'},
                    {id:'28',label: 'Secretario Privado A'},
                    {id:'29',label: 'Secretario Auxiliar A'},
                    {id:'30',label: 'Secretario Privado B'},
                    {id:'31',label: 'Subdirector de Área D'},
                    {id:'32',label: 'Secretario Auxiliar B'},
                    {id:'33',label: 'Secretario Privado C'},
                    {id:'34',label: 'Subdirector de Área E'},
                    {id:'35',label: 'Asesor D'},
                    {id:'36',label: 'Secretario Auxiliar C'},
                    {id:'37',label: 'Secretario Particular A'},
                    {id:'38',label: 'Subdirector de Área F'},
                    {id:'39',label: 'Secretario de Estudio y Cuenta'},
                    {id:'40',label: 'Subdirector de Área G'},
                    {id:'41',label: 'Asesor E'},
                    {id:'42',label: 'Secretario Particular B'},
                    {id:'43',label: 'Secretario Particular C'},
                    {id:'44',label: 'Asesor F'},
                    {id:'45',label: 'Director A'},
                    {id:'46',label: 'Secretario de Estudio y Cuenta Coordinador'},
                    {id:'47',label: 'Secretaio de Estudio y Cuenta A'},
                    {id:'48',label: 'Secretario Técnico A'},
                    {id:'49',label: 'Director B'},
                    {id:'50',label: 'Secretario Tecnico de la Secretaría General A'},
                    {id:'51',label: 'Secretario Técnico B'},
                    {id:'52',label: 'Secretario de Estudio y Cuenta B'},
                    {id:'53',label: 'Director C'},
                    {id:'54',label: 'Asesor G'},
                    {id:'55',label: 'Asesor Principal'},
                    {id:'56',label: 'Secretario Técnico de la Secretaría General B'},
                    {id:'57',label: 'Secretario Técnico C'},
                    {id:'58',label: 'Secretario de Estudio y Cuenta C'},
                    {id:'59',label: 'Director D'},
                    {id:'60',label: 'Secretario Técnico de la Secretaría General C'},
                    {id:'61',label: 'Secretario Técnico D'},
                    {id:'62',label: 'Director E'},
                    {id:'63',label: 'Coordinador A'},
                    {id:'64',label: 'Secretario Técnico de la Secretaría General D'},
                    {id:'65',label: 'Coordinador B'},
                    {id:'66',label: 'Director F'},
                    {id:'67',label: 'Coordinador C'},
                    {id:'68',label: 'Director G'},
                    {id:'69',label: 'Secretario General'},
                    {id:'70',label: 'Secretario Administrativo'},
                    {id:'71',label: 'Contralor General'},
                    {id:'72',label: 'Director HH'},
                    {id:'73',label: 'Coordinador DD'},
                    {id:'74',label: 'Coordinador D'},
                    {id:'75',label: 'Director H'},
                    {id:'76',label: 'Secretario General A'},
                    {id:'77',label: 'Secretario Administrativo A'},
                    {id:'78',label: 'Contralor General A'},
                    {id:'79',label: 'Director I'},
                    {id:'80',label: 'Coordinador E'},
                    {id:'81',label: 'Secretario General B'},
                    {id:'82',label: 'Secretario Administrativo B'},
                    {id:'83',label: 'Contralor General B'},
                    {id:'84',label: 'Secretario General C'},
                    {id:'85',label: 'Secretario Administrativo C'},
                    {id:'86',label: 'Contralor General C'},
                    {id:'87',label: 'Magistrado Electoral'},
                    {id:'88',label: 'Presidente del Tribunal'},
                    {id:'89',label: 'Auditor'},
                    {id:'90',label: 'Abogado'},
                    {id:'91',label: 'Secretaria Ejecutiva D'},
                    {id:'92',label: 'Secretaria Ejecutiva C'},
                    {id:'93',label: 'Secretaria Ejecutiva F'},
                    {id:'94',label: 'Secretaria Ejecutiva'},
                    {id:'95',label: 'Coordinador'},
                    {id:'96',label: 'Auxiliar A'},
                    {id:'97',label: 'Auxiliar B'},
                    {id:'98',label: 'Auxiliar C'},
                    {id:'99',label: 'Secretaria A'},
                    {id:'100',label: 'Auxiliar D'},
                    {id:'101',label: 'Secretaria B'},
                    {id:'102',label: 'Secretaria C'},
                    {id:'103',label: 'Chofer A'},
                    {id:'104',label: 'Secretaria D'},
                    {id:'105',label: 'Asistente A'},
                    {id:'106',label: 'Chofer B'},
                    {id:'107',label: 'Secretaria E'},
                    {id:'108',label: 'Asistente B'},
                    {id:'109',label: 'Chofer C'},
                    {id:'110',label: 'Secretaria F'},
                    {id:'111',label: 'Asistente C'},
                    {id:'112',label: 'Secretaria Ejecutiva A'},
                    {id:'113',label: 'Secretaria Ejecutiva B'},
                    {id:'114',label: 'Asistente D'},
                    {id:'115',label: 'Chofer D'},
                    {id:'117',label: 'Chofer E'},
                    {id:'119',label: 'Chofer F'},
                    {id:'120',label: 'Profesionista Técnico A'},
                    {id:'121',label: 'Secretaria Ejecutiva E'},
                    {id:'122',label: 'Chofer G'},
                    {id:'123',label: 'Profesionista Técnico B'},
                    {id:'125',label: 'Actuario A'},
                    {id:'126',label: 'Profesionista Técnico C'},
                    {id:'127',label: 'Asesor A'},
                    {id:'128',label: 'Actuario B'},
                    {id:'129',label: 'Profesionista Técnico D'},
                    {id:'130',label: 'Secretaria Ejecutiva G'},
                    {id:'131',label: 'Jefe de Departamento H'},
                    {id:'132',label: 'Secretario de Estudio y Cuenta A'}]);

const catTipoDocumento = ref([{id:'1',label:'Acuerdo de radicación'},
{id:'2',label:'Acuerdo de recepción'},
{id:'3',label:'Acuerdo de turno'},
{id:'4',label:'Oficio'},
{id:'5',label:'Acuerdo plenario'},
{id:'6',label:'Minuta'}]);
//const catFirmantes = ref(['Lic. Otilio Esteban Hernández Pérez', 'Ing. Isaí Fararoni Ramírez', 'Lic. Nallely ']);
const catFirmantes = ref([{id:'1',label:'Lic. Otilio Esteban Hernández Pérez'},
                        {id:'2',label: 'Ing. Isaí Fararoni Ramírez'},
                        {id:'3',label: 'Lic. Nallely '}]);
const catDestinatarios = ref([{id:'1',label:'Lic. Otilio Esteban Hernández Pérez'},
                        {id:'2',label: 'Ing. Isaí Fararoni Ramírez'},
                        {id:'3',label: 'Lic. Nallely '}]);
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
const selected_currency = ref({ key: 'Oficio de radicación', thumb: 'flags/tecdmx.png' });
const tax_type_list = ref([]);
const selected_tax_type = ref({ key: 'None', value: null });
const discount_list = ref([]);
const selected_discount = ref({ key: 'None', value: null, type: '' });

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
    // console.log("cer");
    // console.log(archivoEsCer.value);
             if (nombreArchivo.endsWith(".cer")) {
                archivoEsCer.value = true;
             } else {
                 archivoEsCer.value = false;
             }

};
const change_file_key = (event) => {
    //selected_file_key.value = URL.createObjectURL(event.target.files[0]);
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
    const keyFileData = {'file':certificado.value.archivoKey, 'buffer':null, 'base64': null};
    const docFileData = {'file':certificado.value.documento, 'buffer':null, 'base64': null};

    getCertificadoData(certFileData, keyFileData, 
    docFileData, certificado.value.contrasenaCer);

    

    
/*
    const certFileData = req.files['certFile'][0];
    let keyFileData = null;
    if (req.files['keyFile']) {
        keyFileData = req.files['keyFile'][0];
    }
    const pdfFilesData = req.files['pdfFiles'];
    const password = req.body.password;
    */


    try {
        // const {res} = axios.post('profile/student', profile)
        //     .then(res => {
        //         return res;
        //     });

    } catch (error) {
        console.log(error);
    }
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

// const validarExtensionDeArchivo= () => {
//             const inputElement = document.getElementById("formFileCer");
//             const nombreArchivo = inputElement.value.toLowerCase();

//             console.log("cer" + archivoEsCer);

//             if (nombreArchivo.endsWith(".cer")) {
//                 this.archivoEsCer = true;
//             } else {
//                 this.archivoEsCer = false;
//                 alert("Por favor, seleccione un archivo con extensión .cer");
//                 inputElement.value = ""; // Borra el campo de entrada
//             }
//         }

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
                                    <!-- Título del documento PAO-->
                                    <div class="invoice-detail-total mb-3">
                                        <div class="row">
                                            <div class="col-12 col-md-3">
                                                <SelectCatalogo
                                                    idName= "catUso"
                                                    label= "Uso:"
                                                    :options="catUso"
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
                                                    :options="catAreaDestino"
                                                    @opcionSelect = "opcionSelectAreaDestino"
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <SelectCatalogo
                                                    idName= "catAreaCopia"
                                                    label= "Área con copia:"
                                                    :options="catAreaCopia"
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
                                                    :options="catDestinatario"
                                                    @opcionSelect = "opcionSelectDestinatario"
                                                ></SelectCatalogo>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <SelectCatalogo
                                                    idName= "catCargo"
                                                    label= "Cargo:"
                                                    :options="catCargo"
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
                                                    :options="catTipoDocumento"
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
                                        :options = catFirmantes
                                        :thtabla = thFirmantes
                                    ></TablaAgregar>

                                    <!-- Agregar Destinatarios -->
                                    <TablaAgregar
                                        titulo="Agregar Destinatarios"
                                        labelButton="Agregar Destinatario"
                                        :options = catDestinatarios
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
                                            <a data-bs-toggle="modal" data-bs-target="#composeMailModal"
                                                id="btn-compose-mail" class="btn btn-secondary btn-send p-3"
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
                                <!-- <div class="alert alert-arrow-right alert-icon-right alert-light-danger alert-dismissible mb-4" role="alert">
                                    <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">×</button>
                                    <svg></svg>
                                    <strong>Certificado inválido!</strong> Su certificado no esta vigente.
                                </div> -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="formFileCer" class="form-label">Archivo de certificado (*.cer o .pfx)</label>
                                            <input class="form-control" type="file" id="formFileCer" @change="change_file_cer" accept=".cer,.pfx">
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