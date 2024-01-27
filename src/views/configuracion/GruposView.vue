<script setup>
import { ref, onMounted, computed } from "vue";
//Componentes
import TablaAgregarGrupo from "@/components/wrapper/TablaAgregarGrupo.vue";
import RadioGroup from "@/components/wrapper/RadioGroup.vue";
//Stores
import { useAuthStore } from "@/stores/authStore.js";
import { useCatalogoStore } from "@/stores/catalogoStore";
//Iconos
import IconEdit2 from "@/components/icons/IconEdit2.vue";
import IconFeatherTrashVue from "@/components/icons/IconFeatherTrash.vue";
import IconDropDown from "@/components/icons/IconDropDown.vue";

import { useMeta } from "@/composables/use-meta";

useMeta({ title: "Mis grupos" });

//Variables
const authStore = useAuthStore();
const catalogoStore = useCatalogoStore();
const token = authStore.state.user.token;
const catalogo = ref(null);
const catPersonal = ref(null);
const catGruposFirmante = ref(null);
const catGruposDestinatario = ref(null);
const catInstruccionTEMP = ref(null);
const instDisponible = ref(false);
const catDisponible = ref(false);
const catTipoGrupo = ref(null);
//const headers = ["id", "area", "tipoDocumento", "acciones"];
const headers = ["id", "grupo", "tipoGrupo", "integrantes", "acciones"];
const thPersonal = ["Nombre", "Instrucción", "Estado", "Editar", ""];
let addContactModal = ref(null);
const params = ref({
  id: null,
  grupo: "",
  personas: {
    nombre: "",
    apellido1: "",
    apellido2: "",
  },
  tipoGrupo: "",
});
const arrayIntegrantes = ref(null);
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
//obtener catalogos
async function obtenerCatalogos(url) {
  return await catalogoStore.getCatalogo(url, token);
}
async function obtenerCatNuevoDoc(url) {
  return await catalogoStore.getNuevoDocumento(url, token);
}

const delete_row = (item) => {
  if (confirm("¿Desea borrar este registro?")) {
    let urlCat = import.meta.env.VITE_CAT_DEL_GRUPOS + item.id;
    catalogoStore.deleteCatalogo(urlCat, token);
  }
};
const edit_user = (item) => {
  //console.log(item);
  params.value = {
    id: null,
    nombreGrupo: "",
    personas: { nombre: "", apellido1: "", apellido2: "" },
  };
  if (item) {
    //params.value = JSON.parse(JSON.stringify(item));
    params.value = {
      id: item.id,
      nombreGrupo: item.nombreGrupo,
      personas: item.personas,
    };
  } else {
    arrayIntegrantes.value = null;
  }
  addContactModal.show();
};
const guardar_item = () => {
   //console.log("SAVE-PARAMS -- ", params.value);
//   console.log(arrayIntegrantes);
  if (!params.value.nombreGrupo) {
    //alert("Ingresar nombre de grupo");
    showMessage('Ingresar nombre de grupo.', 'error');
    return true;
  }
  if (!params.value.tipoGrupo) {
    //alert("Ingresar el tipo de grupo");
    showMessage('Ingresar el tipo de grupo.', 'error');
    return true;
  }
  if (arrayIntegrantes.value == null) {
    //alert("Ingresar integrantes del grupo");
    showMessage('Ingresar integrantes del grupo.', 'error');
    return true;
  }

  if (params.value.id) {
    //console.log("edit");
    //update user
    let editItem = {
      descripcion: params.value.descripcion,
      areaId: params.value.areaId,
    };
    //console.log(editItem)
    const urlCat = import.meta.env.VITE_CAT_EDIT_GRUPOS + params.value.id;
    //catalogoStore.editCatalogo(urlCat, editItem, token);
  } else {
    //add user
    //console.log("add");
    const urlCat = import.meta.env.VITE_CAT_ADD_GRUPOS;
    //console.log(params.value.tipoGrupo)
    if(params.value.tipoGrupo === 'Personas Firmantes'){
      let saveItem = {
          "idArea": 5,
          "tipoGrupo": 'Firmantes',
          "nombreGrupo": params.value.nombreGrupo,
          "personas": arrayIntegrantes.value
      }
      //console.log(saveItem);
      catalogoStore.saveCatalogo(urlCat, saveItem, token);
    }else if(params.value.tipoGrupo === 'Personas Destinatarias'){
      let saveItem = {
          "idArea": 5,
          "tipoGrupo": 'Destinatarios',
          "nombreGrupo": params.value.nombreGrupo,
          "personas": arrayIntegrantes.value
      }
      //console.log(saveItem);
      catalogoStore.saveCatalogo(urlCat, saveItem, token);
    }
    
    
    arrayIntegrantes.value = null;
  }

  //showMessage('User saved successfully.');
  addContactModal.hide();
};
const urlNewDoc = import.meta.env.VITE_API_LARURL + import.meta.env.VITE_CAT_NUEVO_DOC;
onMounted(async () => {
  try {
    catPersonal.value = await obtenerCatalogos(import.meta.env.VITE_CAT_GET_EMPLEADOS);
    catGruposFirmante.value = await obtenerCatalogos(import.meta.env.VITE_CAT_GET_GRUPOS_FIR);
    catGruposDestinatario.value = await obtenerCatalogos(import.meta.env.VITE_CAT_GET_GRUPOS_DES);
    catDisponible.value = true;
    catInstruccionTEMP.value = await obtenerCatNuevoDoc(urlNewDoc);
     //console.log(catGruposFirmante.value);
//    console.log(catInstruccionTEMP.value.data);
  } catch (error) {
    console.log(error);
  }

  initPopup();
  bind_grupos();
  setTimeout(() => {
    initTooltip();
  }, 500);
});
const catInstruccion = ref([]);
const grupos_list = ref([]);
const bind_grupos = () => {
  grupos_list.value = [
    {
      id: 1,
      grupo: "grupo 1",
      personas: [
        {
          nombre: "Paola",
          apellido1: "Montero",
          apellido2: "Guerrero",
          instruccion: "Firma",
        },
        {
          nombre: "Juan",
          apellido1: "Pérez",
          apellido2: "Pérez",
          instruccion: "Rúbrica",
        },
      ],
      tipoGrupo: "Firmantes",
    },
    {
      id: 2,
      grupo: "comite",
      personas: [
        {
          nombre: "Graciela Eunice",
          apellido1: "Illescas",
          apellido2: "Acosta",
          instruccion: "Firma",
        },
        {
          nombre: "Martín",
          apellido1: "Juarez",
          apellido2: "Pérez",
          instruccion: "Rúbrica",
        },
      ],
      tipoGrupo: "Destinatarios",
    },
  ];
   catInstruccion.value = [
     { id: 1, instruccion: "Firma" },
     { id: 2, instruccion: "Rubrica" },
     { id: 3, instruccion: "Acuse" },
   ];
  catTipoGrupo.value = [
    { id: 1, tipoGrupo: "Personas Firmantes" },
    { id: 2, tipoGrupo: "Personas Destinatarias" },
  ];
};
const usuarioSelected = ref(false);
const duplicado = ref(false);
const selected = ref("0");
const esCorreoElectronico = (correoElectronico) =>
  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    correoElectronico
  );
const verificaDuplicado = (data) => {
  if (esCorreoElectronico(data)) {
    duplicado.value = arrayTabla.value.find(
      (empleado) => empleado.nuevoUsuario_email === data
    );
    return duplicado;
  }
  if (data === "otro") {
    duplicado.value = false;
  } else {
    duplicado.value = false;
    duplicado.value = arrayTabla.value.find(
      (empleado) => empleado.idEmpleado === data.id
    );
    return duplicado;
  }
};
const tablaPersonal = (data, campoValido) => {
  //console.log(data);
  arrayIntegrantes.value = data;
  //params.value.firmantes = data;
  //   paramsEnviar.value.firmantes = data;
  //    if (data == 0) {
  //      form.tablaFirmantes = false;
  //    } else {
  //      form.tablaFirmantes = campoValido;
  //    }
};
const tipoGrupo = ref("")
const opcionTipoGrupo = (idOpcion) => {
  params.value.tipoGrupo = idOpcion;
  tipoGrupo.value = idOpcion
  instDisponible.value= true;
//   if(idOpcion === 'Firmantes'){
//     catInstruccion.value = catInstruccionTEMP.value.data.catInstruccionFirmantes;
//     instDisponible.value = true;
//   }else if(idOpcion === 'Destinatarios'){
//     catInstruccion.value = catInstruccionTEMP.value.data.catInstruccionDestinatarios;
//     instDisponible.value = true;
//   }
  //   if (idOpcion == 0) {
  //     form.codigoSexo = false;
  //   } else {
  //     form.codigoSexo = true;
  //   }
};
const grid_type = ref("list");
const ids = ref([]);
const check_all_checkbox = computed(() => {
  if (
    grupos_list.value.length &&
    ids.value.length == grupos_list.value.length
  ) {
    return true;
  } else {
    return false;
  }
});
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
                      <h3>Grupos</h3>
                    </div>
                  </div>
                  <div class="layout-px-spacing">
                    <div class="row d-flex justify-content-center">
                      <div class="col-lg-10 col-sm-12 layout-spacing">
                        <div class="d-flex justify-content-sm-end justify-content-end mb-3">
                          <a href="javascript:;" @click="edit_user(null)">
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
                            <div class="d-flex justify-content-center m-5" v-if="!catDisponible">
                              <div class="spinner-border text-primary" role="status" >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </div>
                            <div class="app-contacts">
                                <!-- Firmantes -->
                                <div class="row layout-spacing layout-top-spacing" id="cancel-row" >
                                <div class="col-lg-12">
                                  <div class="panel-body searchable-container" :class="[grid_type]">
                                    <h4>Personas firmantes</h4>
                                    <div class="searchable-items" :class="[grid_type]">
                                      <div class="items items-header-section">
                                        <div class="item-content">
                                          <div class="">
                                            <div class="checkbox-primary custom-control custom-checkbox d-inline-block">
                                              <!-- <input id="chkALl" type="checkbox" :checked="check_all_checkbox" class="custom-control-input"
                                                    @change="check_all($event.target.checked)"/>
                                              <label class="custom-control-label" for="chkALl">
                                              </label> -->
                                            </div>
                                            <h4>Nombre</h4>
                                          </div>
                                          <div class="user-email">
                                            <h4>Area</h4>
                                          </div>
                                          <div class="">
                                            <h4>Acciones</h4>
                                          </div>
                                        </div>
                                      </div>
                                      <div v-for="(grupo, index) in catGruposFirmante" class="items" :key="index">
                                        <div class="item-content">
                                          <div class="user-profile">
                                            <!-- <div class="checkbox-primary custom-control custom-checkbox" @click.stop="$event.stopPropagation()">
                                              <input type="checkbox"
                                                    :id="`chk-${grupo.id}`"
                                                    v-model="ids"
                                                    class="custom-control-input"
                                                    :value="grupo.id"
                                              />
                                              <label class="custom-control-label" :for="`chk-${grupo.id}`" ></label>
                                            </div> -->
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + grupo.id" aria-expanded="false" aria-controls="collapseOne">
                                              <IconDropDown />
                                            </button>
                                            <div class="user-meta-info ms-2">
                                              <p class="user-name">
                                                {{ grupo.nombreGrupo }}
                                              </p>
                                            </div>
                                          </div>
                                          <div class="user-email">
                                            <p class="info-title">
                                              Área:
                                            </p>
                                            <p class="usr-email-addr">
                                              {{ grupo.area }}
                                            </p>
                                          </div>
                                          <div class="action-btn">
                                            <a
                                              href="javascript:void(0);"
                                              title="Edit"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              @click="params.id = grupo.id; edit_user(grupo);"
                                            >
                                              <IconEdit2 class="me-3" ></IconEdit2>
                                            </a>
                                            <a
                                              href="javascript:void(0);"
                                              title="Delete"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              @click="delete_row(grupo)"
                                            >
                                              <IconFeatherTrashVue></IconFeatherTrashVue>
                                            </a>
                                          </div>
                                        </div>
                                        <div :id="'collapseOne' + grupo.id" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
                                          <div class="accordion-body">
                                            <div class="table-light table-responsive">
                                              <table role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                                                <thead role="rowgroup" class="">
                                                  <tr role="row" class="">
                                                    <th role="columnheader" scope="col" aria-colindex="1" class="">
                                                      <div>#</div>
                                                    </th>
                                                    <th role="columnheader" scope="col" aria-colindex="2" class="">
                                                      <div>Nombre</div>
                                                    </th>
                                                    <th role="columnheader" scope="col" aria-colindex="3" class="">
                                                      <div>Instrucción</div>
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody v-for="(item, i) in grupo.personas" :key="item.id" role="rowgroup">
                                                  <tr role="row" class="">
                                                    <td aria-colindex="1" role="cell" class="">
                                                      {{ i + 1 }}
                                                    </td>
                                                    <td aria-colindex="2" role="cell" class="">
                                                      {{ item.nombre }}
                                                      {{ item.apellido1 }}
                                                      {{ item.apellido2 }}
                                                    </td>
                                                    <td aria-colindex="4" role="cell" class="" >
                                                      {{ item.instruccion }}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- Termina Firmantes -->
                                <!-- Destinatarios -->
                              <div class="row layout-spacing layout-top-spacing" id="cancel-row" >
                                <div class="col-lg-12">
                                  <div class="panel-body searchable-container" :class="[grid_type]">
                                    <h4>Personas destinatarias</h4>
                                    <div class="searchable-items" :class="[grid_type]">
                                      <div class="items items-header-section">
                                        <div class="item-content">
                                          <div class="">
                                            <div class="checkbox-primary custom-control custom-checkbox d-inline-block">
                                              <!-- <input id="chkALl" type="checkbox" :checked="check_all_checkbox" class="custom-control-input"
                                                    @change="check_all($event.target.checked)"/>
                                              <label class="custom-control-label" for="chkALl">
                                              </label> -->
                                            </div>
                                            <h4>Nombre</h4>
                                          </div>
                                          <div class="user-email">
                                            <h4>Area</h4>
                                          </div>
                                          <div class="">
                                            <h4>Acciones</h4>
                                          </div>
                                        </div>
                                      </div>
                                      <div v-for="(grupo, index) in catGruposDestinatario" class="items" :key="index">
                                        <div class="item-content">
                                          <div class="user-profile">
                                            <!-- <div class="checkbox-primary custom-control custom-checkbox" @click.stop="$event.stopPropagation()">
                                              <input type="checkbox"
                                                    :id="`chk-${grupo.id}`"
                                                    v-model="ids"
                                                    class="custom-control-input"
                                                    :value="grupo.id"
                                              />
                                              <label class="custom-control-label" :for="`chk-${grupo.id}`" ></label>
                                            </div> -->
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + grupo.id" aria-expanded="false" aria-controls="collapseOne">
                                              <IconDropDown />
                                            </button>
                                            <div class="user-meta-info">
                                              <p class="user-name">
                                                {{ grupo.nombreGrupo }}
                                              </p>
                                            </div>
                                          </div>
                                          <div class="user-email">
                                            <p class="info-title">
                                              Área:
                                            </p>
                                            <p class="usr-email-addr">
                                              {{ grupo.area }}
                                            </p>
                                          </div>
                                          <div class="action-btn">
                                            <a
                                              href="javascript:void(0);"
                                              title="Edit"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              @click="params.id = grupo.id; edit_user(grupo);"
                                            >
                                              <IconEdit2 class="me-3" ></IconEdit2>
                                            </a>
                                            <a
                                              href="javascript:void(0);"
                                              title="Delete"
                                              data-bs-toggle="tooltip"
                                              data-bs-placement="top"
                                              @click="delete_row(grupo)"
                                            >
                                              <IconFeatherTrashVue></IconFeatherTrashVue>
                                            </a>
                                          </div>
                                        </div>
                                        <div :id="'collapseOne' + grupo.id" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
                                          <div class="accordion-body">
                                            <div class="table-light table-responsive">
                                              <table role="table" aria-busy="false" aria-colcount="5" class="table b-table table-hover" id="__BVID__310">
                                                <thead role="rowgroup" class="">
                                                  <tr role="row" class="">
                                                    <th role="columnheader" scope="col" aria-colindex="1" class="">
                                                      <div>#</div>
                                                    </th>
                                                    <th role="columnheader" scope="col" aria-colindex="2" class="">
                                                      <div>Nombre</div>
                                                    </th>
                                                    <th role="columnheader" scope="col" aria-colindex="3" class="">
                                                      <div>Instrucción</div>
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody v-for="(item, i) in grupo.personas" :key="item.id" role="rowgroup">
                                                  <tr role="row" class="">
                                                    <td aria-colindex="1" role="cell" class="">
                                                      {{ i + 1 }}
                                                    </td>
                                                    <td aria-colindex="2" role="cell" class="">
                                                      {{ item.nombre }}
                                                      {{ item.apellido1 }}
                                                      {{ item.apellido2 }}
                                                    </td>
                                                    <td aria-colindex="4" role="cell" class="" >
                                                      {{ item.instruccion }}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- Termina Destinatarios -->
                            </div>
                          </div>
                        </div>
                        <!-- <div class="mt-3 d-flex justify-content-end">
                          <a href="/config/catalogos" class="btn btn-primary"
                            >Regresar a catálogos</a
                          >
                        </div> -->

                        <!-- Modal -->
                        <div id="addContactModal" class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered" >
                            <div class="modal-content mailbox-popup">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  {{ params.id ? "Editar" : "Agregar" }}
                                </h5>
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
                                            <label>Nombre de grupo</label>
                                            <input
                                              type="text"
                                              v-model="params.nombreGrupo"
                                              class="form-control form-control-sm"
                                              placeholder="Ingresar nombre de grupo"
                                            />
                                          </div>
                                        </div>
                                        <div class="col-md-6">
                                          <RadioGroup
                                            label="Tipo de grupo"
                                            :options="catTipoGrupo"
                                            value-field="tipoGrupo"
                                            label-field="tipoGrupo"
                                            @opcionCheck="opcionTipoGrupo"
                                          ></RadioGroup>
                                        </div>
                                      </div>
                                      <div class="row mt-2">
                                        <div class="col-md-12">
                                          <div class="form-group mb-0">
                                            <TablaAgregarGrupo
                                              titulo="Agregar personas integrantes"
                                              id_tabla="firmantes"
                                              :thtabla="thPersonal"
                                              :tbTabla="catPersonal"
                                              :opInstruccion="catInstruccion"
                                              v-if="instDisponible"
                                              @tablaFirmantes="tablaPersonal"
                                              :otro="false"
                                              :tipoGrupo="params.tipoGrupo"
                                            ></TablaAgregarGrupo>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-default"
                                  data-dismiss="modal"
                                  data-bs-dismiss="modal"
                                >
                                  <i class="flaticon-cancel-12"></i> Cancelar
                                </button>
                                <button type="button" class="btn btn-primary" @click="guardar_item()">
                                  {{ params.id ? "Editar" : "Agregar" }}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Fin Modal -->
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
.accordion-button {
    width: 30%;
    padding: 0;
    font-size: 1rem;
    border: 0;
    border-radius: 0;
    overflow-anchor: none;
}
</style>
