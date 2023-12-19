<script setup>
import IconRecibidos from "@/components/icons/IconRecibidos.vue";
import IconLike from "@/components/icons/IconLike.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconSend from "@/components/icons/IconSend.vue";
import IconFeatherCheck from "@/components/icons/IconFeatherCheck.vue";
import IconFeatherX from "@/components/icons/IconFeatherX.vue";


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
              task_list && task_list.filter((d) => d.etapa != "trash").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed', 'Terminado')">
        <a
          id="todo-task-terminado"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'Terminado' }"
        >
          <IconFeatherCheck />
          Terminado
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.etapa == "Terminado").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed', 'Enviado')">
        <a
          id="todo-task-Enviado"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'Enviado' }"
        >
          <IconSend />
          Enviados
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.etapa == "Enviado").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed','En Firma')">
        <a
          id="todo-task-important"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'En Firma' }"
        >
          <IconEdit />
          En Firma
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.etapa == "En Firma").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed','Creado')">
        <a
          id="todo-task-creado"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'Creado' }"
        >
          <IconStar />
          Creado
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.etapa == "Creado").length
            }}
          </span>
        </a>
      </li>
      <li class="nav-item" @click="emit('tab_changed','Rechazado')">
        <a
          id="todo-task-creado"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'Rechazado' }"
        >
          <IconFeatherX />
          Rechazado
          <span class="todo-badge badge">
            {{
              task_list &&
              task_list.filter((d) => d.etapa == "Rechazado").length
            }}
          </span>
        </a>
      </li>
      <!-- <li class="nav-item" @click="emit('tab_changed','trash')">
        <a
          id="todo-task-trash"
          href="javascript:;"
          class="nav-link"
          :class="{ active: selected_tab === 'trash' }"
        >
          <IconTrash />

          Papelera
        </a>
      </li> -->
    </ul>
  </perfect-scrollbar>
  <!-- </perfect-scrollbar> -->
</template>
