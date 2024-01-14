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
  <div class="col-xl-2 col-lg-3 col-md-6 col-12 layout-spacing">
    <div class="widget widget-simple_kpi border-widget"  :style="{border:`solid ${color}`}" @click="activaEtapa()">
      <div class="widget-heading">
        <h5>{{ cantidad }}</h5>
        <div class="task-action">
          <div class="dropdown btn-group">
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
.border-widget {
  border-width: 10px 1px 1px 1px !important;
}
</style>