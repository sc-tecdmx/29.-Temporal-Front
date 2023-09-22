<script setup>
import { ref } from 'vue';
import {useNuevoDocumentoStore} from '@/stores/nuevoDocumento.js'


import SelectCatalogo from '../../../../components/wrapper/SelectCatalogo.vue';
import InputForm from '../../../../components/wrapper/InputForm.vue';

/* Almacen */
const useNuevoDocumento = useNuevoDocumentoStore();
const {add} = useNuevoDocumento;

/* Formacion JSON */
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
	idlabel:'',
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

/* Catalogos */
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
const catFirmantes = ref(['Lic. Otilio Esteban Hernández Pérez', 'Ing. Isaí Fararoni Ramírez', 'Lic. Nallely ']);


const opcionSelectUso = (idOpcion) => {
    params.value.idUso = idOpcion;
}
const opcionSelectAreaDestino = (idOpcion) => {
    params.value.idAreaDestino = idOpcion;
}
const opcionSelectDestinatario = (idOpcion) => {
    params.value.idDestinatario = idOpcion;
}




</script>
<template>
    <h5>Formulario</h5>
    <SelectCatalogo
        idName= "catUso"
        label= "Uso:"
        :options="catUso"
        @opcionSelect = "opcionSelectUso"
    ></SelectCatalogo>

    <SelectCatalogo
        idName= "catAreaDestino"
        label= "Área destino:"
        :options="catAreaDestino"
        @opcionSelect = "opcionSelectAreaDestino"
    ></SelectCatalogo>

    <SelectCatalogo
        idName= "catDestinatario"
        label= "Destinatario:"
        :options="catDestinatario"
        @opcionSelect = "opcionSelectDestinatario"
    ></SelectCatalogo>

    <InputForm
        idName="idDocumento"
        label = "ID del Documento:"
        placeholder = "id"
    ></InputForm>

    <button class="btn btn-primary" @click="add(params)"> Envia Captura </button>

     <h4>params</h4>{{ params }} 
</template>