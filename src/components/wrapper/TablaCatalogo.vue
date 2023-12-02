<script setup>
import { onMounted, ref } from "vue";
import "@/assets/sass/elements/tooltip.scss";
//Stores
import { useAuthStore } from '@/stores/authStore.js';
import { useCatalogoStore } from '@/stores/catalogoStore';
//Iconos
import IconEdit2 from "../icons/IconEdit2.vue";
import IconFeatherTrashVue from "../icons/IconFeatherTrash.vue";

import { useMeta } from "@/composables/use-meta";

useMeta({ title: "Catálogo" });

//Variables
const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const token = authStore.state.user.token;
const errorAb = ref(false);
const props = defineProps({
  titulo: String,
  id_tabla: String,
  thtabla: ref([]),
  opCatalogo: Object,
  urlSave: String,
  urlEdit: String,
  urlDelete: String,
  params: String
});
//console.log("PROPS", props.opCatalogo)

let addContactModal = ref(null);
const params = ref({ id: null, sexo: "", abreviatura: "" });

const items = ref([]);
const table_option2 = ref({
  headings: {
    id: (h, row, index) => {
        return '#';
    },
  },
  perPage: 5,
  perPageValues: [5, 10, 20, 50],
  skin: "table table-hover",
  columnsClasses: { actions: "actions text-center" },
  //sortable: ["sexo", "abreviatura","acciones"],
  sortable: props.thtabla,
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

onMounted(() => {
  bind_data();
  initPopup();
  setTimeout(() => {
    initTooltip();
  }, 500);
});

const bind_data = () => {
  items.value = props.opCatalogo;
};

const initTooltip = () => {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new window.bootstrap.Tooltip(tooltipTriggerEl);
  });
};

const delete_row = (item) => {
    if (confirm('¿Desea borrar este registro?')) {
        let urlCat = import.meta.env.VITE_CAT_DEL_SEXO + item.id
        
        catalogoStore.deleteCatalogo(urlCat, token);
        //items.value = items.value.filter((d) => d.id != item.id);
    }
};
const edit_user = (item) => {
  //console.log(item);
  params.value = { id: null, sexo: '', abreviatura: '' };
   if (item) {
    errorAb.value = false;
       params.value = JSON.parse(JSON.stringify(item));
   }
  addContactModal.show();
};
const validarAbreviatura = () => {
  const regex = /^[a-zA-Z]$/;
  errorAb.value = !regex.test(params.value.abreviatura);
};
const guardar_item = () => {
    console.log("SAVE-PARAMS -- ", params)
   if (!params.value.sexo) {
        alert("Ingresar descripción");
       //showMessage('Name is required.', 'error');
       return true;
   }
   if (!params.value.abreviatura) {
        alert("Ingresar abreviatura");
       //showMessage('Email is required.', 'error');
       return true;
   }

   if (params.value.id) {
     console.log("edit");
    //update user
    let editItem = {
            "nombreItem": params.value.sexo,
            "abreviatura": params.value.abreviatura
        }
    const urlCat = import.meta.env.VITE_CAT_EDIT_SEXO + params.value.id;
    catalogoStore.editCatalogo(urlCat, editItem, token);
    errorAb.value = false;
   } else {
    //add user
    console.log("add");
    const urlCat = import.meta.env.VITE_CAT_ADD_SEXO;
    let saveItem = {
        "descripcion": params.value.sexo,
        "abreviatura": params.value.abreviatura
    }
    catalogoStore.saveCatalogo(urlCat, saveItem, token);
    }

  //showMessage('User saved successfully.');
  addContactModal.hide();
};
</script>
<template>
    <div class="invoice-detail-title mb-0">
        <div class="col-xl-5 invoice-address-company">
            <h3>{{ props.titulo }}</h3>
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
        <div class="panel p-0">
          <div class="custom-table custom-table-cat">
            <v-client-table :data="items" :columns="thtabla" :options="table_option2">
                <template #id="props">
                    <div class="checkbox-outline-primary custom-control custom-checkbox">
                        <input variant="primary" type="checkbox" class="custom-control-input" :id="props.row.id" />
                        <label class="custom-control-label" :for="props.row.id"></label>
                    </div>
                </template>
              <template #acciones="props">
                <a href="javascript:void(0);"
                  title="Edit"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  @click="params.id = props.row.id; edit_user(props.row);"
                >
                    <IconEdit2 class="me-3"></IconEdit2>
                </a>
                <a href="javascript:void(0);"
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
            <a href="/config/catalogos" class="btn btn-primary">Regresar a catálogos</a>
        </div>
        
        <!-- Modal -->
        <div id="addContactModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content mailbox-popup">
              <div class="modal-header">
                <h5 class="modal-title">{{ params.id ? 'Editar' : 'Agregar' }}</h5>
                <button
                  type="button"
                  data-dismiss="modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  class="btn-close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="add-contact-box">
                  <div class="add-contact-content">
                    <form id="addContactModalTitle">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mb-4">
                            <label>Descripción</label>
                            <input type="text" v-model="params.sexo" class="form-control form-control-sm" placeholder="Ingrese la decripción"/>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group mb-4">
                            <label>Abreviatura</label>
                            <input type="text" 
                                    v-model="params.abreviatura" 
                                    class="form-control form-control-sm text-uppercase" 
                                    placeholder="Abreviatura"
                                    maxlength="1"
                                    @input="validarAbreviatura"/>
                            <p v-if="errorAb">Requiere una letra. [A...Z]</p>
                          </div>
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
                <button type="button" class="btn btn-primary" @click="guardar_item()" :disabled="errorAb">{{ params.id ? 'Editar' : 'Agregar' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/* .custom-table .table td, .custom-table .table th {
    padding: 4px 30px;
} */
.custom-table-cat .table td, .custom-table .table th {
    padding: 4px 30px;
}
</style>
