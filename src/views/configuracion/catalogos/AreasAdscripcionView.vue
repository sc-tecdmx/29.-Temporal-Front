<script setup>
import { onMounted } from "vue";
import { useGetData } from "../../../composables/getData";

import IconDropDownVue from "../../../components/icons/IconDropDown.vue";

const {data, getData, loading, errorData} = useGetData();

onMounted(() => {
  getData("http://localhost/j/area.php");
});
</script>
<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-12 col-xxl-10">
      <h3 class="mt-4">Catalogo Áreas</h3>
      <div class="contenedor_cat">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status" v-if="loading">
            <span class="visually-hidden">Cargando información ...</span>
          </div>
          <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" v-if="errorData">
            <div class="toast-header-error">
              <strong class="me-auto">Error</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body-error">
              {{ errorData }}
            </div>
          </div>
        </div>
        
        <!-- <ul>
          <li v-for="area in data">
            {{ area.nombre }}
            <ul>
              <li v-for="subArea in area.sub_area">{{ subArea.nombre }}</li>
            </ul>
          </li>
        </ul> -->

        <div class="d-flex flex-lg-column justify-content-start m-3">
          <div id="toggleAccordion" class="accordion">
            <div class="card" v-for="area in data">
              <header class="card-header" role="tab">
                <section class="mb-0 mt-0">
                  <div
                    class="collapsed d-flex justify-content-between"
                    role="menu"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#${area.area_id}`"
                    aria-expanded="true"
                    aria-controls="headingTwo1"
                  >
                    {{ area.nombre }}
                    <div class="icons" v-if="area.sub_area">
                      <IconDropDownVue></IconDropDownVue>
                    </div>
                  </div>
                </section>
              </header>
              <div
                :id="area.area_id"
                class="collapse"
                aria-labelledby="headingTwo1"
                data-bs-parent="#toggleAccordion"
                v-if="area.sub_area"
              >
                <div class="card-body">
                  <ul class="list-unstyled">
                    <li v-for="subArea in area.sub_area">
                      {{ subArea.nombre }}
                    </li>
                  </ul>
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
.contenedor_cat {
  margin: 1rem 1rem 1rem;
  padding: 10px;
  border: solid #b2b4ba;
  border-width: 1px;
  border-radius: 6px;
}
.card-header {
    color: #fff;
    background-color: #9A278F;
}
.toast-header-error {
    display: flex;
    align-items: center;
    padding: 7px;
    background: #E7515A;
    color: #fff;
    border-bottom: 1px solid rgba(33, 150, 243, 0.3411764706);
}
.toast-body-error {
    padding: 16px 12px;
    color: #000;
    word-wrap: break-word;
}
</style>
