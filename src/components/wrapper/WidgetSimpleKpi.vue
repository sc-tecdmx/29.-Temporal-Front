<script setup>
    import "@/assets/sass/widgets/widgets.scss";
    import { defineEmits } from 'vue';
    const props = defineProps({
        cantidad: {
            type: Number,
            required: true,
        },
        mensaje: {
            type: String,
            required: true,
        },
        color: {
          type: String
        },
        etapa:String
    });
    const emit = defineEmits(['activaEtapa']);
    const activaEtapa = () => {
      emit('activaEtapa', props.etapa);
    };
</script>
<template>
  <!-- <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 layout-spacing"> -->
  <div class="col-xl-2 col-lg-3 col-md-6 col-12 layout-spacing">
    <div class="widget widget-simple_kpi"  :class="`border-widget-${color}`" @click="activaEtapa()">
      <div class="widget-heading">
        <h5>{{ cantidad }}</h5>
        <div class="task-action">
          <div class="dropdown btn-group">
            <!-- <a
              href="javascript:;"
              id="ddlStatistics"
              class="btn dropdown-toggle btn-icon-only"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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
                class="feather feather-more-horizontal"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="ddlStatistics"
            >
              <li><a href="javascript:;" class="dropdown-item">Detalles</a></li>
              <li><a href="javascript:;" class="dropdown-item">Reporte</a></li>
            </ul> -->
          </div>
        </div>
      </div>
      <div class="widget-content">
        <div class="row">
          <div class="col-12">
            <div class="w-detail">
              <p class="w-title">{{ mensaje }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

  .border-widget-espera{
    border: solid  #0a2241;
    border-width: 10px 1px 1px 1px;
  }
  .border-widget-enviado{
    border: solid #194891;
    border-width: 10px 1px 1px 1px;
  }
  .border-widget-rechazado{
    border: solid #E7515A;
    border-width: 10px 1px 1px 1px;
  }
  .border-widget-firmado{
    border: solid #009688;
    border-width: 10px 1px 1px 1px;
  }
  .border-widget-atencion{
    border: solid #E7515A;
    border-width: 10px 1px 1px 1px;
  }
  .border-widget-conocimiento{
    border: solid #197293;
    border-width: 10px 1px 1px 1px;
  }
</style>