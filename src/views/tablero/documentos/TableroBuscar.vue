2<script setup>
import {  ref } from "vue";
import IconFeather from "@/components/icons/IconFeather.vue"
    defineProps({
        is_show_task_menu: Boolean
    }   );
    const search_task = ref("");

    const emit = defineEmits(["search_tasks"]);

    //console.log ("TableroBuscar: search_task [" + props.search_task + "]") 
</script>
<template>
     <div class="search">
            <input
              type="text"
              v-model="search_task"
              class="input-search form-control"
              v-on:keyup="emit('search_tasks', search_task)"
              placeholder="Buscar aquí..."
            />
            <div
              class="d-flex align-items-center"
              @click="is_show_task_menu = !is_show_task_menu"
            >
              <IconFeather />
            </div>
          </div>
          {{ search_task }}
</template>