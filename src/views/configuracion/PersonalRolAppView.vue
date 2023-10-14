<script setup>
import { onMounted } from "vue";
import { useGetData } from "@/composables/getData";

import IconDropDownVue from "@/components/icons/IconDropDown.vue";

const {data, getData, loading, errorData} = useGetData();

onMounted(() => {
  getData("http://localhost/j/personal_rol_app.php");
//   console.log("data")
//   console.log(data)
});
</script>
<template>
<div class="row no-gutters justify-content-center">
    <div class="col-12 col-xxl-10">
      <h3 class="mt-4">Administración Personal / Rol / Aplicación</h3>
      <div class="contenedor_cat">
        <!-- Error y carga -->
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
        <ul>
          <li v-for="persona in data">
            {{ persona.nombre }}
            <ul>
              <li v-for="app in persona.aplicaciones">
                <div class="row">
                    <div class="col-6">
                        {{ app.nombre_app }} - {{ app.rol }}
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn btn-primary mb-2 me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                    </div>
                </div>
            </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</div>


<!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
            </div>
            <div class="modal-body">
                <p class="modal-text">
                    Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci varius natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi.
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <button type="button" class="btn btn-primary">Save</button>
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