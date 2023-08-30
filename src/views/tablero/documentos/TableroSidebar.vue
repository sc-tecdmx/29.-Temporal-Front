<script setup>
import IconRecibidos from "@/components/icons/IconRecibidos.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

  defineProps({
    selected_tab: String,
    task_list: [],
    search_task: String,
  });
  const emit = defineEmits(["tab_changed"]);
</script>
<template>
  <perfect-scrollbar
    class="todoList-sidebar-scroll col-md-12 col-sm-12 col-12 mt-4 ps-0"
  >
    <ul class="nav nav-pills d-block">
      <li class="nav-item" @click="emit('tab_changed')">
        <a
          id="all-list"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === '' }"
        >
          <IconRecibidos />
          Recibidos
          <span class="todo-badge badge">
            {{
              task_list && task_list.filter((d) => d.status != "trash").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed', 'complete')">
        <a
          id="todo-task-done"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'complete' }"
        >
          <IconLike />
          Enviados
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.status == "complete").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed','important')">
        <a
          id="todo-task-important"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'important' }"
        >
          <IconStar />
          Devueltos
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.status == "important").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed','trash')">
        <a
          id="todo-task-trash"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'trash' }"
        >
          <IconTrash />

          Papelera
        </a>
      </li>
    </ul>
  </perfect-scrollbar>
  <!-- </perfect-scrollbar> -->
</template>
