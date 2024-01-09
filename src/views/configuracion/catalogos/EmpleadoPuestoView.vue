<script setup>

import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useCatalogoStore } from "@/stores/catalogoStore";
//Iconos
import IconEdit2 from "@/components/icons/IconEdit2.vue";
import IconFeatherTrashVue from "@/components/icons/IconFeatherTrash.vue";
import { useMeta } from "@/composables/use-meta";
import FechaGeneric from "@/components/wrapper/FechaGeneric.vue";
import router from "@/router";

//flatpickr
import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import '@/assets/sass/forms/custom-flatpickr.css';

useMeta({ title: "Catálogo empleados" });
const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const token = authStore.state.user.token;
const catalogo = ref(null);
const catArea = ref(null);
const catPuesto = ref(null);
const catDisponible = ref(false);
const selectedArea = ref("");
const selectedPuesto = ref("");
const selectedFechaAlta = ref("");
const selectedFechaConclusion = ref("");
const headers= ref(["id", "acciones", "empleado", "unidadA", "area", "puesto", "fechaAlta", "fechaConclusion"]);
const is_submit_form1 = ref(false);
let addContactModal = ref(null);

const params = ref({ 
    id: null,
    empleado: "",
    apellido1:"",
    apellido2:"",
    unidadA:"",
    area:"",
    puesto:"",
    fechaAlta: null,
    fechaConclusion: "",
  });

const table_option = ref({
  headings: {
    id: (h, row, index) => {
      return "#";
    },
  },
  perPage: 5,
  perPageValues: [5, 10, 20, 50],
  skin: "table table-hover",
  columnsClasses: { actions: "actions text-center" },
  sortable: [ "empleado", "apellido1", "apellido1", "unidadA", "area", "puesto", "fechaAlta", "fechaConclusion"],
  sortIcon: {
    base: "sort-icon-none",
    up: "sort-icon-asc",
    down: "sort-icon-desc",
  },
  pagination: { nav: "scroll", chunk: 5 },
  texts: {
    count: "Mostrando {from} a {to} de {count}",
    filter: "",
    filterPlaceholder: "Buscar...",
    limit: "Resultados:",
  },
  resizableColumns: false,
});
const initPopup = () => {
  addContactModal = new window.bootstrap.Modal(
    document.getElementById("addContactModal")
  );
};
const initTooltip = () => {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new window.bootstrap.Tooltip(tooltipTriggerEl);
  });
};
async function obtenerCatalogo(url) {
    return await catalogoStore.getCatalogo(url,token);
}
const delete_row = (item) => {
  if (confirm("¿Desea borrar este registro?")) {
    let urlCat = import.meta.env.VITE_CAT_DEL_EMP_PUESTO + item.id;
    catalogoStore.deleteCatalogo(urlCat, token);
  }
};
const edit_user = (item) => {
  //console.log(item);
  if (item) {
    params.value = JSON.parse(JSON.stringify(item));
    addContactModal.show();
   }
   //else{
  //   router.push('/account/registroEmpleado');
  // }
};
const guardar_item = () => {
  
  if (selectedArea.value === "") {
    //alert("Seleccionar área");
    showMessage('Seleccionar área', 'error');
    return true;
  }
  if (selectedPuesto.value === "") {
    //alert("Seleccionar puesto");
    showMessage('Seleccionar puesto', 'error');
    return true;
  }
  if (selectedFechaAlta.value === "") {
    //alert("Seleccionar fecha de alta");
    showMessage('Seleccionar fecha de alta', 'error');
    return true;
  }
   if (params.value.id) {
     //console.log("edit");
     //update
     let editItem = {
        "area": selectedArea.value,
        "puesto": selectedPuesto.value,
        "fechaAlta": selectedFechaAlta.value,
        "fechaConclusion": selectedFechaConclusion.value
    };
     //console.log(editItem)
     const urlCat = import.meta.env.VITE_CAT_EDIT_EMP_PUESTO + params.value.id;
     catalogoStore.editCatalogo(urlCat, editItem, token);
     selectedArea.value = "";
     selectedPuesto.value = "";
     selectedFechaAlta.value = "";
     selectedFechaConclusion.value = "";
   }

  //showMessage('Puesto actualizado.');
  addContactModal.hide();
};

onMounted(async() => {
    catalogo.value = await obtenerCatalogo(import.meta.env.VITE_CAT_GET_EMP_PUESTO);
    catArea.value = await obtenerCatalogo(import.meta.env.VITE_CAT_GET_AREA);
    catPuesto.value = await obtenerCatalogo(import.meta.env.VITE_CAT_GET_PUESTOS);
    catDisponible.value = true; 
    initPopup();
  setTimeout(() => {
    initTooltip();
  }, 500);
});

const opcionDateAlta = (date, campoValido) => {
  //console.log("fechaAlta", date);
  selectedFechaAlta.value = date;
};
const opcionDateConclusion = (date, campoValido) => {
  //console.log("fechaConclusion",date);
  selectedFechaConclusion.value = date;
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
<div class="layout-px-spacing apps-invoice-add">
    <div class="row invoice layout-top-spacing layout-spacing no-gutters justify-content-center">
      <div class="col-xxl-10 col-12">
        <div class="doc-container">
          <div class="row">
            <div class="col-lg-12">
              <div class="invoice-content">
                <div class="invoice-detail-body">
                  <div class="invoice-detail-title mb-0">
                    <div class="col-xl-5 invoice-address-company">
                      <h3>Catálogo empleado-puesto</h3>
                    </div>
                  </div>
                  <div class="layout-px-spacing">
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-11 col-sm-12 layout-spacing">
                        <div class="d-flex justify-content-sm-end justify-content-end mb-3">
                              <!-- <a href="javascript:;" @click="edit_user(null)">
                                <svg
                                  id="btn-add-contact"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-plus"
                                >
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                              </a> -->
                            </div>
                        
                        <div class="panel p-0">
                          <div class="custom-table">
                            <div class="d-flex justify-content-center m-5" v-if="!catDisponible">
                                <div class="spinner-border text-primary" role="status" >
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            
                            <v-client-table :data="catalogo" :columns="headers" :options="table_option" v-if="catDisponible">
                              <template #id="props">
                                <div class="checkbox-outline-primary custom-control custom-checkbox ms-2">
                                  <input
                                    variant="primary"
                                    type="checkbox"
                                    class="custom-control-input"
                                    :id="props.row.id"
                                  />
                                  <label
                                    class="custom-control-label"
                                    :for="props.row.id"
                                  ></label>
                                </div>
                              </template>
                              <template #acciones="props">
                                <a
                                  href="javascript:void(0);"
                                  title="Edit"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  @click=" params.id = props.row.id; edit_user(props.row); "
                                >
                                  <IconEdit2 class="me-3"></IconEdit2>
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  title="Delete"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  @click="delete_row(props.row)"
                                >
                                  <IconFeatherTrashVue></IconFeatherTrashVue>
                                </a>
                              </template>
                              <template #empleado="props">
                                {{ props.row.empleado }} {{ props.row.apellido1 }} {{ props.row.apellido2 }}
                              </template>
                            </v-client-table>
                          </div>
                        </div>
                        <div class="mt-3 d-flex justify-content-end">
                          <a href="/config/catalogos" class="btn btn-primary"
                            >Regresar a catálogos</a
                          >
                        </div>

                        <!-- Modal -->
                        <div id="addContactModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content mailbox-popup">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  {{ params.id ? "Editar" : "Agregar" }}
                                </h5>
                                <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                              </div>
                              <div class="modal-body">
                                <div class="add-contact-box">
                                  <div class="add-contact-content">
                                    <form id="addContactModalTitle">
                                      <div class="row">
                                        <div class="col-12">
                                          <div class="fw-bold text-dark">{{ params.empleado }} {{ params.apellido1 }} {{ params.apellido2 }}</div>
                                          <div class="ms-2">Unidad de Adscripción: {{ params.unidadA }}</div>
                                          <div class="ms-2">Área: {{ params.area }}</div>
                                          <div class="ms-2">Puesto: {{ params.puesto }}</div>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <h4 class="mt-3">Nuevo puesto</h4>
                                        <div class="col-md-6">
                                            <div id="select_menu" class="form-group form-group mt-2" v-if="catDisponible">
                                              <label for="areaSelect">Selecciona una área:</label>
                                              <select id="areaSelect" v-model="selectedArea" class="form-select form-select-sm">
                                                <option value="">Selecciona...</option>
                                                <template v-for="area in catArea">
                                                  <optgroup :label="area.area">
                                                    <template v-if="area.AreasHijas && area.AreasHijas.length">
                                                      <option v-for="subArea in area.AreasHijas" :key="subArea.id" :value="subArea.id">
                                                        {{ subArea.area }}
                                                      </option>
                                                    </template>
                                                    <template v-else>
                                                      <option :value="area.id">{{ area.area }}</option>
                                                    </template>
                                                  </optgroup>
                                                </template>
                                              </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                          <div id="select_menu" class="form-group form-group mt-2" v-if="catDisponible">
                                            <label for="puestoSelect">Selecciona un puesto:</label>
                                            <select id="areaSelect" v-model="selectedPuesto" class="form-select form-select-sm">
                                                <option value="">Selecciona...</option>
                                                <option v-for="puesto in catPuesto" :key="puesto.id" :value="puesto.id">{{ puesto.nombramiento }}</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="col-md-6">
                                          <FechaGeneric
                                            label="Fecha de alta:"
                                            :date="selectedFechaAlta"
                                            @dateSelected="opcionDateAlta"
                                            :dias="0"
                                            :obligatorio="false"
                                          ></FechaGeneric>
                                        </div>
                                        <div class="col-md-6">
                                          <FechaGeneric
                                            label="Fecha de conclusión:"
                                            :date="selectedFechaConclusion"
                                            @dateSelected="opcionDateConclusion"
                                            :dias="0"
                                            :obligatorio="false"
                                          ></FechaGeneric>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal" data-bs-dismiss="modal">
                                  <i class="flaticon-cancel-12"></i> Cancelar
                                </button>
                                <button type="button" class="btn btn-primary" @click="guardar_item()">
                                  {{ params.id ? "Editar" : "Agregar" }}
                                </button>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.flatpickr-calendar.open {
    display: inline-block;
    z-index: 99999 !important;
}
</style>