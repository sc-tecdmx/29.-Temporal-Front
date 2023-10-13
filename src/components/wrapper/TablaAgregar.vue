<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import IconFeatherTrash from "../icons/IconFeatherTrash.vue";
//composable
import { useGetData } from "@/composables/getData";

/** Multiselect */
import "@/assets/sass/scrollspyNav.scss";
//  import highlight from '@/components/plugins/highlight.vue';
//  import Multiselect from '@suadelabs/vue3-multiselect';
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";

const props = defineProps({
  titulo: String,
  labelButton: String,
  url: String,
  thtabla: ref([]),
});

const { data, getData, loading, errorData } = useGetData();
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

const nuevoNombre = ref("");

const addTag = (newTag, newTagSelect) => {
  // options4.value.push(newTag);
  // inputs.value['input4'].push(newTag);
  if (newTag == "") {
    arrayTabla.value.push(newTagSelect);
  } else if (newTagSelect) {
    arrayTabla.value.push({ id: "", label: newTag });
  }
//   console.log("Tabla");
//   console.log(arrayTabla.value);
};

const options4 = ref([
  "Lic. Otilio Esteban Hernández Pérez",
  "Ing. Isaí Fararoni Ramírez",
  "Lic. Nallely ",
]);
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
            {{ opcion.label }}
          </option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div class="col-6" v-if="selected == 'otro'">
        <div class="row">
          <label :for="idName" class="col-sm-2 col-form-label col-form-label-sm"
            >Otro:</label
          >
          <div class="col-sm-10 ms-0">
            <input
              type="text"
              v-model="nuevoNombre"
              :id="idName"
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
            <td aria-colindex="2" role="cell">Firmante</td>
            <td aria-colindex="3" role="cell">></td>
            <td aria-colindex="4" role="cell" class="text-center">
              <span> Ok</span>
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
</template>
<style>
.multiselect__option--highlight {
  background: #ff8200;
}
.multiselect__option--highlight::after {
  background: #ff8200;
}
.multiselect__tag {
  background: #ff8200;
}
</style>