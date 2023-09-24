<script setup>
    import { useMeta }      from '@/composables/use-meta';
    import IconDropDown from '../../components/icons/IconDropDown.vue';
    useMeta({ title: "TECDMX | Tablero de Firmas Electrónicas." });

</script>
<template>
    <div class="row mb-2 mt-3 ms-2">
      <div class="col-md-11">
          <h3 class="fw-bolder">Home [p]</h3>
      </div>

      <p class="d-inline-flex gap-1 col-md-1">
        <a class="" data-bs-toggle="collapse" href="#collapseWidget" role="button" aria-expanded="false" aria-controls="collapseWidget">
            <IconDropDown></IconDropDown>
        </a>
        </p>
  </div>
    
</template>