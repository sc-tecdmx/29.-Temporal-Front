<script setup>
import { ref } from "vue";
import TableroPrioridad from "./TableroPrioridad.vue";
import TableroEditRow from "./TableroEditRow.vue";

defineProps({
  filtered_task_list: [],
});
const search_task = ref("");

const emit = defineEmits([
  "task_complete",
  "view_task",
  "edit_task",
  "delete_task",
  "set_important",
]);
</script>
<template>
  <div class="todo-box">
    <perfect-scrollbar
      class="todo-box-scroll"
      :options="{
        wheelSpeed: 0.5,
        swipeEasing: !0,
        minScrollbarLength: 40,
        maxScrollbarLength: 300,
        suppressScrollX: true,
      }"
    >
    
    </perfect-scrollbar>
  </div>
</template>
