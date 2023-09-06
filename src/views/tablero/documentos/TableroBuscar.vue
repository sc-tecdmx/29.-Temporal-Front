<script setup>
import {  ref } from "vue";
import IconFeather from "@/components/icons/IconFeather.vue"
    defineProps({
        is_show_task_menu: Boolean
    }   );
    const buscar_firma = ref("");
    const emit = defineEmits(["search_tasks"]);
</script>
<template>
     <div class="search">
            <input
              type="text"
              v-model="buscar_firma"
              class="input-search form-control"
              v-on:keyup="emit('search_tasks', buscar_firma)"
              placeholder="Buscar aquí..."
            />
            <!-- Icono Responsivo -->
            <div
              class="d-flex align-items-center"
              @click="is_show_task_menu = !is_show_task_menu"
            >
              <IconFeather />
            </div>
            <!-- ./Icono Responsivo -->
          </div>
</template>