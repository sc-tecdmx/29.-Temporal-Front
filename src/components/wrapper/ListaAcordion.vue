<script setup>
import { onMounted, ref } from "vue";
import { defineProps } from 'vue';
//composable
import { useMeta } from '@/composables/use-meta';
import { useGetData } from "@/composables/getData";
//Iconos
import IconDropDown from "@/components/icons/IconDropDown.vue";

    
useMeta({ title: props.title });
const props= defineProps({
        title: String,
        url: String
    });
const {data, getData, loading, errorData} = useGetData();

onMounted(() => {
  getData(props.url);
  console.log(data)
});

</script>
<template>
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
          <li v-for="rol in data">
            {{ rol.nombre }}
            <ul>
              <li v-for="permiso in rol.permisos">{{ permiso.nombre }}</li>
            </ul>
          </li>
        </ul> -->

        <div class="d-flex flex-lg-column justify-content-start m-3">
          <div id="toggleAccordion" class="accordion">
            <div class="card" v-for="rol in data">
              <header class="card-header" role="tab">
                <section class="mb-0 mt-0">
                  <div
                    class="collapsed d-flex justify-content-between"
                    role="menu"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#${rol.rol_id}`"
                    aria-expanded="true"
                    aria-controls="headingTwo1"
                  >
                    {{ rol.nombre }}
                    <div class="icons" v-if="rol.permisos">
                      <IconDropDown />
                    </div>
                  </div>
                </section>
              </header>
              <div
                :id="rol.rol_id"
                class="collapse"
                aria-labelledby="headingTwo1"
                data-bs-parent="#toggleAccordion"
                v-if="rol.permisos"
              >
                <div class="card-body">
                  <ul class="list-unstyled">
                    <li v-for="permiso in rol.permisos">
                      {{ permiso.nombre }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<style>

</style>