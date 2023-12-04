<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { defineProps } from 'vue';

    import IconChevronDown from '../icons/IconChevronDown.vue';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: props.title });

    const props= defineProps({
        title: String,
        url: String,
        thtabla: ref([]),
        datos: Object
    });
    console.log("PROP:--- ", props)
    //const columns = props.thtabla;
    const columns = ref([]);
    const items = props.datos;
    // console.log("columns");
    // console.log(columns);

    //Configuracion de la tabla
    const table_option = ref({
        perPage: 10,
        perPageValues: [5, 10, 20, 50],
        skin: 'table',
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Mostrando {from} a {to} de {count}',
            filter: '',
            filterPlaceholder: 'Buscar...',
            limit: 'Resultados:',
        },
        resizableColumns: true,
        sortable: columns,
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
        hiddenColumns: [],
    });


     onMounted(() => {
        //console.log("onMounted");
        //bind_data();
     });

    // const bind_data = () => {
    //     //console.log("bind_data");

    //     const axiosInstance = axios.create({
    //         "Access-Control-Allow-Origin": "*",
    //     });

    //     const datosTabla = async () => {
    //         const url = props.url;
    //     try {
    //         const { data } = await axiosInstance.get(url);
    //         items.value = data;
    //         //console.log("AXIOS:" + items.value);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //         //  console.log("items");
    //         //  console.log(items.value);
    //         //Arreglar imprime doble los registros
    //         items.value.forEach(e => {
    //             for(var key in e){
    //                 //console.log(etiqueta);
    //                 columns.value.push(key);
    //                 // if(e[key].constructor == Object){
    //                 //     console.log("tiene campos");
    //                 //     for(var subKey in key){
    //                 //         console.log(subKey);
    //                 //     }
    //                 // }
    //             }
    //             //console.log(columns)
    //          });
    //     };
    //     datosTabla();
    // };

    const capitalize = (text) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const show_hide_columns = (column, value) => {
        if (!table_option.value.hiddenColumns.includes(column) && !value) {
            table_option.value.hiddenColumns.push(column);
        } else {
            table_option.value.hiddenColumns = table_option.value.hiddenColumns.filter((d) => d !== column);
        }
    };
</script>

<template>
    <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                <div class="panel p-0">
                    <div class="custom-table">
                        <v-client-table ref="showHideColumns" :data="items" :columns="columns" :options="table_option">
                            <template #beforeFilter>
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
                                </div>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
</template>
<style>
    /* .table3 .actions svg {
        padding: 2px;
    } */
</style>