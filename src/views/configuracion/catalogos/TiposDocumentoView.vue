<script setup>
import { ref, onMounted } from "vue";
//Componentes
import SelectCatalogo from "@/components/wrapper/SelectCatalogo.vue";
//Stores
import { useAuthStore } from "@/stores/authStore.js";
import { useCatalogoStore } from "@/stores/catalogoStore";
//Iconos
import IconEdit2 from "@/components/icons/IconEdit2.vue";
import IconFeatherTrashVue from "@/components/icons/IconFeatherTrash.vue";
import { useMeta } from "@/composables/use-meta";

useMeta({ title: "Catálogo tipo de documento" });

//Variables
const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const token = authStore.state.user.token;
const catalogo = ref(null);
const catArea = ref(null);
const catDisponible = ref(false);
const headers = ["id", "area", "tipoDocumento", "acciones"];
let addContactModal = ref(null);
const params = ref({ id: null, descripcion: "",area:"", areaId: "" });
const items = ref([]);

//Configuración de tabla
const table_option2 = ref({
  headings: {
    id: (h, row, index) => {
      return "#";
    },
  },
  perPage: 5,
  perPageValues: [5, 10, 20, 50],
  skin: "table table-hover",
  columnsClasses: { actions: "actions text-center" },
  sortable: headers,
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
  return await catalogoStore.getCatalogo(url, token);
}
const delete_row = (item) => {
  if (confirm("¿Desea borrar este registro?")) {
    let urlCat = import.meta.env.VITE_CAT_DEL_TIPDOC + item.id;
    catalogoStore.deleteCatalogo(urlCat, token);
  }
};
const edit_user = (item) => {
  //console.log(item);
  params.value = { id: null,  descripcion: "", area:"", areaId: ""  };
  if (item) {
    //params.value = JSON.parse(JSON.stringify(item));
    params.value = { 
      id: item.id,  
      descripcion: item.tipoDocumento,
      // area: item.area,
      // areaId: item.id
      //areaId: 5
    };
  }
  addContactModal.show();
};
const guardar_item = () => {
  //console.log("SAVE-PARAMS -- ", params);
  if (!params.value.descripcion) {
    alert("Ingresar tipo de documento");
    //showMessage('Name is required.', 'error');
    return true;
  }
  // if (!params.value.areaId) {
  //   alert("Ingresar descripción");
  //   //showMessage('Email is required.', 'error');
  //   return true;
  // }

  if (params.value.id) {
    //console.log("edit");
    //update user
    let editItem = {
      descripcion: params.value.descripcion,
      //areaId: params.value.areaId,
    };
    //console.log(editItem)
    const urlCat = import.meta.env.VITE_CAT_EDIT_TIPDOC + params.value.id;
    catalogoStore.editCatalogo(urlCat, editItem, token);
  } else {
    //add user
    //console.log("add");
    const urlCat = import.meta.env.VITE_CAT_ADD_TIPDOC;
    let saveItem = {
        descripcion: params.value.descripcion,
        //areaId: params.value.areaId,
    };
    //console.log(saveItem)
    catalogoStore.saveCatalogo(urlCat, saveItem, token);
  }

  //showMessage('User saved successfully.');
  addContactModal.hide();
};
onMounted(async () => {
  try {
    catalogo.value = await obtenerCatalogo(import.meta.env.VITE_CAT_GET_TIPDOC);
    catDisponible.value = true;
    catArea.value = await obtenerCatalogo(import.meta.env.VITE_CAT_GET_AREA);
    //console.log(catArea)
  } catch (error) {
    console.log(error);
  }

  initPopup();
  //bind_data();
  setTimeout(() => {
    initTooltip();
  }, 500);
});
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
                      <h3>Catálogo tipo de documento</h3>
                    </div>
                  </div>
                  <div class="layout-px-spacing">
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-10 col-sm-12 layout-spacing">
                        <div class="d-flex justify-content-sm-end justify-content-end mb-3">
                              <a href="javascript:;" @click="edit_user">
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
                              </a>
                            </div>
                        <!-- <div class="row">
                          <div class="col-6">
                            <SelectCatalogo></SelectCatalogo>
                          </div>
                          <div class="col-6">
                            
                          </div>
                        </div> -->
                        
                        <div class="panel p-0">
                          <div class="custom-table custom-table-cat">
                            <div class="d-flex justify-content-center m-5" v-if="!catDisponible">
                                <div class="spinner-border text-primary" role="status" >
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            
                            <v-client-table :data="catalogo" :columns="headers" :options="table_option2" v-if="catDisponible">
                              <template #id="props">
                                <div class="checkbox-outline-primary custom-control custom-checkbox">
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
                          <div class="modal-dialog modal-md modal-dialog-centered">
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
                                        <div class="col-md-12">
                                          <div class="form-group mb-4">
                                            <label>Tipo de documento</label>
                                            <input
                                              type="text"
                                              v-model="params.descripcion"
                                              class="form-control form-control-sm"
                                              placeholder="Ingresar tipo de documento"
                                            />
                                          </div>
                                        </div>
                                        <!-- <div class="col-md-6">
                                          <div class="form-group mb-4">
                                            <label>Área</label>
                                            <input
                                              type="text"
                                              v-model="params.area"
                                              class="form-control form-control-sm"
                                              placeholder="Ingrese la decripción"
                                            />
                                          </div>
                                        </div> -->
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
.custom-table-cat .table td,
.custom-table .table th {
  padding: 4px 30px;
}
</style>