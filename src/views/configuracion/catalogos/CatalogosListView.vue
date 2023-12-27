<script setup>
import { useMeta } from "@/composables/use-meta";

import { useAuthStore } from "@/stores/authStore.js";
useMeta({ title: "TECDMX - Firmas Electrónicas." });

const authStore = useAuthStore();
</script>
<template>
  <!-- <div class="row mb-2 mt-3 ms-2">
    <div class="col-md-11">
      <h3 class="mt-3">Catálogos</h3>
    </div>
  </div> -->
  <div class="layout-px-spacing">
    <div class="row layout-top-spacing justify-content-center">
      <div class="col-xxl-10 col-sm-12 layout-spacing">
        <div class="panel br-6 p-0 mt-3">
            <div class="row m-4 justify-content-center">
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Tipo de Documento</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/tipoDocumento" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Prioridad</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/prioridad" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 16rem">
                        <div class="card-body">
                        <h5 class="card-title">Destino de documento</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/destino-de-documento" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Etapa documento</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/etapa-documento" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Estado usuario</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/estado-usuario" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Sexo</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/sexo" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <!-- 
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Áreas de adscripción</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/areas" class="btn btn-primary">Administrar</router-link>
                        <a href="/config/catalogo/areas" class="btn btn-primary">Administrar</a>
                        </div>
                    </div>
                </div> -->
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Personal</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/personal" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <!--<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Roles</h5>
                        <p class="card-text">
                        </p>
                        <a href="/config/catalogo/roles" class="btn btn-primary">Administrar</a>
                        </div>
                    </div>
                </div> 
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Tipo de notificación</h5>
                        <p class="card-text">
                        </p>
                        <a href="#" class="btn btn-primary">Administrar</a>
                        </div>
                    </div>
                </div>
            -->
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Expediente</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/expediente" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card text-center mb-3" style="width: 15rem">
                        <div class="card-body">
                        <h5 class="card-title">Puesto</h5>
                        <p class="card-text">
                        </p>
                        <router-link to="/config/catalogo/puesto" class="btn btn-primary">Administrar</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>