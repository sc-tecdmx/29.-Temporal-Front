<script setup>
import { onMounted, ref } from "vue";
import { defineProps, defineEmits } from "vue";
import IconFeatherTrash from "../icons/IconFeatherTrash.vue";
import ejemploTodo from "@/components/wrapper/ejemploTodo.vue";
//composable
import { useGetData } from "@/composables/getData";

/** Multiselect */
import "@/assets/sass/scrollspyNav.scss";
//  import Multiselect from '@suadelabs/vue3-multiselect';
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";

const props = defineProps({
  titulo: String,
  labelButton: String,
  url: String,
  thtabla: ref([]),
  urlInterno: String,
});

const { data, getData, loading, errorData } = useGetData();
const catSelect = ref([]);

//URL para opciones de Select principal
// const defineCatalogo = () => {
//   getData(props.url);
//   catSelect.value = data;
// }

//URL para opciones de Select tipo firma o instruccion
getData(props.url);

const selected = ref("0");

const inputs = ref({
  input1: [],
  input2: [],
  input3: [],
  input4: [],
  input5: [],
});

const thtabla = props.thtabla;

const arrayTabla = ref([]);

let nuevoNombre = ref("");

const addTag = (newTag, newTagSelect) => {
  // options4.value.push(newTag);
  // inputs.value['input4'].push(newTag);
  if (newTag == "") {
    arrayTabla.value.push(newTagSelect);
  } else if (newTagSelect) {
    arrayTabla.value.push({ id: "", label: newTag });
    nuevoNombre = "";
  }
  //   console.log("Tabla");
  //   console.log(arrayTabla.value);
};

const options4 = ref([
  "Lic. Otilio Esteban Hernández Pérez",
  "Ing. Isaí Fararoni Ramírez",
  "Lic. Nallely ",
]);

onMounted(() => {
  // defineCatalogo();
  // console.log("catSelect");
  // console.log(catSelect.value);
});

let task = {
  priority: "low",
};
const priority_class = (task) => {
        if (task.priority == 'low') {
            return 'primary';
        } else if (task.priority == 'middle') {
            return 'warning';
        } else if (task.priority == 'high') {
            return 'danger';
        }
    };
    const set_priority = (task, name) => {
        task.priority = name;
    };
</script>
<template>
  <div class="invoice-detail-items me-3">
    <div class="col-xl-5 invoice-address-company">
      <h4>{{ titulo }}</h4>
    </div>
    <div class="row">
      <div class="col-6">
        <!-- <multiselect v-model="inputs['input4']" :options="options4" :multiple="true"
                    :taggable="true" :searchable="true" placeholder="Seleccionar..."
                    selected-label="" select-label="" deselect-label="" @tag="addTag">
                </multiselect> -->
        <select v-model="selected" class="form-select form-select-sm">
          <option value="0">--Seleccionar--</option>
          <option v-for="opcion in data" :value="opcion">
            <!-- <option v-for="(value, key) in catSelect.value" :value="key"> -->
            {{ opcion.label }}
          </option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div class="col-6" v-if="selected == 'otro'">
        <div class="row">
          <label
            for="nombreOtro"
            class="col-sm-2 col-form-label col-form-label-sm"
            >Otro:</label
          >
          <div class="col-sm-10 ms-0">
            <input
              type="text"
              v-model="nuevoNombre"
              id="nombreOtro"
              class="form-control form-control-sm"
              placeholder=" nuevo registro "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table
        role="table"
        aria-busy="false"
        aria-colcount="5"
        class="table table-bordered"
        id="__BVID__415"
      >
        <thead role="rowgroup">
          <tr role="row">
            <th
              role="columnheader"
              scope="col"
              aria-colindex="1"
              v-for="th in thtabla"
            >
              <div>{{ th }}</div>
            </th>
            <!-- <th role="columnheader" scope="col" aria-colindex="1" >
                            <div>Nombre</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="2">
                            <div>Firma</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="3">
                            <div>Editar</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="4" class="text-center">
                            <div>Estado</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="5" aria-label="Action" class="text-center">
                            <div></div>
                        </th> -->
          </tr>
        </thead>
        <tbody role="rowgroup">
          <tr v-for="opcion in arrayTabla" role="row">
            <td aria-colindex="1" role="cell">{{ opcion.label }}</td>
            <td aria-colindex="2" role="cell">
              <!-- <ejemploTodo></ejemploTodo> -->
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>-- Seleccionar --</option>
                <option value="1">Firma</option>
                <option value="2">Acuse</option>
                <option value="3">Conocimiento</option>
              </select>
            </td>
            <td aria-colindex="3" role="cell">></td>
            <td aria-colindex="4" role="cell" class="text-center">
              <span> Ok</span>
            </td>
            <td aria-colindex="3" role="cell">
              <!-- <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div> -->
              <ejemploTodo></ejemploTodo>
            </td>
            <td aria-colindex="5" role="cell" class="text-center">
              <IconFeatherTrash></IconFeatherTrash>
            </td>
          </tr>
          <!-- <tr role="row">
                        <td aria-colindex="1" role="cell">Lic. Otilio Esteban Hernández Pérez</td>
                        <td aria-colindex="2" role="cell">Firmante</td>
                        <td aria-colindex="3" role="cell">></td>
                        <td aria-colindex="4" role="cell" class="text-center">
                            <span> Ok</span>
                        </td>
                        <td aria-colindex="5" role="cell" class="text-center">
                            <IconFeatherTrash></IconFeatherTrash>
                        </td>
                    </tr>
                    <tr role="row">
                        <td aria-colindex="1" role="cell">Ing. Isaí Fararoni Ramírez</td>
                        <td aria-colindex="2" role="cell">Rubrica</td>
                        <td aria-colindex="3" role="cell">></td>
                        <td aria-colindex="4" role="cell" class="text-center">
                            <span> Ok</span>
                        </td>
                        <td aria-colindex="5" role="cell" class="text-center">
                            <IconFeatherTrash></IconFeatherTrash>
                        </td>
                    </tr> -->
        </tbody>
      </table>
    </div>
    <div class="d-flex flex-row-reverse">
      <button
        type="button"
        class="btn btn-secondary additem btn-sm"
        @click="addTag(nuevoNombre, selected)"
      >
        {{ labelButton }}
      </button>
    </div>
  </div>



  <!-- <div class="layout-px-spacing todo-list">
                <div id="todo-inbox" class="accordion todo-inbox">
                  <div class="todo-item all-list">
                    <div class="todo-item-inner">
                      <div class="priority-dropdown">
                        <div class="dropdown btn-group">
                          <a
                            href="javascript:;"
                            id="ddlPriority"
                            class="btn dropdown-toggle btn-icon-only"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            :class="[priority_class(task)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              style="width: 24px; height: 24px"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-alert-octagon"
                            >
                              <polygon
                                points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                              ></polygon>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12" y2="16"></line>
                            </svg>
                          </a>
                          <ul
                            class="dropdown-menu dropdown-menu-end"
                            aria-labelledby="ddlPriority"
                          >
                            <li>
                              <a
                                href="javascript:;"
                                class="dropdown-item danger"
                                @click="set_priority(task, 'high')"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-alert-octagon"
                                >
                                  <polygon
                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                                  ></polygon>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12" y2="16"></line>
                                </svg>
                                High
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:;"
                                class="dropdown-item warning"
                                @click="set_priority(task, 'middle')"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-alert-octagon"
                                >
                                  <polygon
                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                                  ></polygon>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12" y2="16"></line>
                                </svg>
                                Middle
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:;"
                                class="dropdown-item primary"
                                @click="set_priority(task, 'low')"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-alert-octagon"
                                >
                                  <polygon
                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                                  ></polygon>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12" y2="16"></line>
                                </svg>
                                Low
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
</template>
<style>
/* .multiselect__option--highlight {
  background: #ff8200;
}
.multiselect__option--highlight::after {
  background: #ff8200;
}
.multiselect__tag {
  background: #ff8200;
} */

.todo-list .todo-inbox {
    overflow-x: visible;
    overflow-y: visible;
}
.layout-px-spacing {
    min-height: 0 !important;
}
</style>