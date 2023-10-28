<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    
    //flatpickr para Fecha
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';
    //PDF viewer
    import PDF from 'pdf-vue3';
    //Iconos
    import IconMoreHorizontal from '@/components/icons/IconMoreHorizontal.vue';
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
        filtered_task_list: [],
        url: String,
    });

    const router = useRouter();

    /* inicia getData */
    //const columns = ['acciones','e','p','d','folio','asunto','fecha','firmantes','destinatarios', 'detalle'];
    const columns = ['acciones','p','d','folio','asunto','fecha','firmantes','destinatarios'];
    const items = ref([]);
    
    const bind_data = () => {
        //console.log("bind_data");
        const axiosInstance = axios.create({
            "Access-Control-Allow-Origin": "*",
        });

        const datosTabla = async () => {
            const url = props.url;
            try {
                const { data } = await axiosInstance.get(url);
                items.value = data;
                //console.log("AXIOS:" + items.value);
            } catch (error) {
                console.log(error);
            }
        };
        datosTabla();
    };
    /* fin getData */

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
        sortable: ['name', 'position', 'office', 'age', 'start_date', 'salary'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        resizableColumns: true,
        hiddenColumns: [],
    });

    onMounted(() => {
        bind_data();
    });

    //Detalle
    // const verDetalle = (item) => {
    //     alert("Detalle" + item.folio_documento);
    // };
    //Archivo adjunto
    const pathdocumento = ref("");
    const pdf_view = (path) =>{
        pathdocumento.value = path;
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
        if (estado == '1') {
            titulo = "Creado";
            docCreado = true;
            docEnviado = false;
            docFirma = false;
            docRechazado = false;
            docTerminado = false;
            return 'creado';
        } else if (estado == '2') {
            titulo = "Enviado";
            docCreado = false;
            docEnviado = true;
            docFirma = false;
            docRechazado = false;
            docTerminado = false;
            return 'enviado';
        } else if (estado == '3') {
            titulo = "En Firma";
            docCreado = false;
            docEnviado = false;
            docFirma = true;
            docRechazado = false;
            docTerminado = false;
            return 'enFirma';
        } else if (estado == '4') {
            titulo = "Rechazado";
            docCreado = false;
            docEnviado = false;
            docFirma = false;
            docRechazado = true;
            docTerminado = false;
            return 'rechazado';
        } else if (estado == '5') {
            titulo = "Terminado";
            docCreado = false;
            docEnviado = false;
            docFirma = false;
            docRechazado = false;
            docTerminado = true;
            return 'terminado';
        }
    };

    let titlePrioriodad = "";

    //Clase para icono Prioridad
    const class_prioridad = (prioridad) => {
        if (prioridad == 'alta') {
            titlePrioriodad= "Alta";
            return 'alta';
        } else if (prioridad == 'media') {
            titlePrioriodad= "Media";
            return 'media';
        } else if (prioridad == 'baja') {
            titlePrioriodad= "Baja";
            return 'baja';
        }
    };
    
    //Firmar documento
    const firmar = (documento) => {
        console.log("firmar documento");
        console.log(documento);
    };
    //Rechazar documento
    const rechazar = (documento) => {
        console.log("rechazar documento");
        console.log(documento);
    };
</script>
<template>
    <div class="layout-px-spacing">
        <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel br-6 p-0 mt-5">
                    <div class="custom-table">
                        <v-client-table :data="items" :columns="columns" :options="table_option">
                            <template #beforeFilter>
                                <div class="checkbox-primary custom-control custom-checkbox me-2 mt-2">
                                    <input type="checkbox" class="custom-control-input" id="chk_primary" @change="buscarFecha()"/>
                                    <label class="custom-control-label" for="chk_primary"> Buscar por rango de fecha</label>
                                </div>
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
                                <a href="javascript:;"
                                    id="ddlPriority"
                                    class="btn dropdown-toggle btn-icon-only ms-2"
                                    data-bs-toggle="tooltip"
                                    title="Firmar Ahora"
                                    @click="firmar(props)">
                                    <IconEdit></IconEdit>
                                </a>
                                <a href="javascript:;"
                                    id="ddlPriority"
                                    class="btn dropdown-toggle btn-icon-only ms-2"
                                    data-bs-toggle="tooltip"
                                    title="Rechazar"
                                    @click="rechazar(props)">
                                    <IconXOctagon></IconXOctagon>
                                    
                                </a>
                                <a href="javascript:;"
                                    id="ddlPriority"
                                    class="btn dropdown-toggle btn-icon-only ms-2"
                                    data-bs-toggle="tooltip"
                                    title="Detalle"
                                    @click="router.push(`/documento/recibido/${props.row.folio_documento}`)">
                                    <IconEye></IconEye>
                                </a>
                                <a href="javascript:;"
                                    id="ddlPriority"
                                    class="btn dropdown-toggle btn-icon-only ms-2"
                                    :class="[class_estado(props.row.id_etapa_documento)]"
                                    data-bs-toggle="tooltip"
                                    :title="titulo"
                                >
                                    <IconFilePlus v-if="docCreado"></IconFilePlus>
                                    <IconSend v-if="docEnviado"></IconSend>
                                    <IconSignature v-if="docFirma"></IconSignature>
                                    <IconFeatherX v-if="docRechazado"></IconFeatherX>
                                    <IconFeatherCheck v-if="docTerminado"></IconFeatherCheck>
                                </a>
                            </template>
                            <template #p="props">
                                <div class="priority-dropdown">
                                    <div class="dropdown btn-group">
                                        <a href="javascript:;"
                                            id="ddlPriority"
                                            class="btn dropdown-toggle btn-icon-only"
                                            :class="[class_prioridad(props.row.desc_prioridad)]"
                                            data-bs-toggle="tooltip"
                                            :title="titlePrioriodad"
                                        >
                                            <IconAlertOctagon></IconAlertOctagon>
                                        </a>
                                    </div>
                                </div>
                            </template>
                            <!-- <template #e="props">
                                <div class="priority-dropdown">
                                    <div class="dropdown btn-group">
                                        <a href="javascript:;"
                                            id="ddlPriority"
                                            class="btn dropdown-toggle btn-icon-only"
                                            :class="[class_estado(props.row.id_etapa_documento)]">
                                            <div title="Creado"><IconFilePlus v-if="docCreado"></IconFilePlus></div>
                                            <div title="Enviado"><IconSend v-if="docEnviado"></IconSend></div>
                                            <div title="En Firma"><IconSignature v-if="docFirma"></IconSignature></div>
                                            <div title="Rechazado"><IconFeatherX v-if="docRechazado"></IconFeatherX></div>
                                            <div title="Terminado"><IconFeatherCheck v-if="docTerminado"></IconFeatherCheck></div>
                                        </a>
                                    </div>
                                </div>
                            </template> -->
                            <template #d="props">
                                <a href="javascript:;"
                                    class="btn dropdown-toggle btn-icon-only"
                                    @click="pdf_view(props.row.documento_path)"
                                    v-if="props.row.documento_path && props.row.documento_path.length"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalxl">
                                    <IconFeatherFileText></IconFeatherFileText>
                                </a>
                                <!-- Button trigger modal -->
                                <!-- <button type="button" class="btn btn-success mb-2 me-2" data-bs-toggle="modal" data-bs-target="#sliderModal">Slider</button> -->
                            </template>
                            <template #folio="props">{{ props.row.folio_documento }}</template>
                            
                            <template #asunto="props">
                                <!-- <div :title="props.row.s_asunto" class="">
                                    <span class="d-inline-block text-truncate" style="max-width: 200px;">
                                        {{ props.row.s_asunto }}
                                    </span>
                                </div> -->
                                <a class="btn dropdown-toggle btn-icon-only text-truncate" href="#" role="button" id="pendingTask" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 12px;">
                                    <span class="d-inline-block text-truncate" style="max-width: 200px;">
                                        {{ props.row.s_asunto }}
                                    </span>
                                </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li class="font-list">
                                            {{ props.row.s_asunto }}
                                        </li>

                                    </ul>
                            </template>
                            <template #fecha="props">
                                {{ props.row.creacion_documento_fecha }}
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
<!-- xtra Large modal -->
<div class="modal fade" id="modalxl" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
            </div>
            <div class="modal-body">
                <!-- <PDF src="/src/assets/images/Documento_prueba_firma.pdf"></PDF> -->
                <PDF :src="pathdocumento"></PDF>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i>Cerrar</button>
            </div>
        </div>
    </div>
</div>

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
</style>
