<script setup>
import IconFeatherMoreVertical from "@/components/icons/IconFeatherMoreVertical.vue"

defineProps({
  task: {},
});

const emit = defineEmits(["edit_task","delete_task","set_important"]);
</script>
<template>
  <div class="action-dropdown">
    <div class="dropdown btn-group">
      <a
        href="javascript:;"
        id="ddlMore"
        class="btn dropdown-toggle btn-icon-only"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <IconFeatherMoreVertical />
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlMore">
        <template v-if="task.status == 'trash'">
          <li>
            <a
              href="javascript:;"
              class="dropdown-item"
              @click="emit('delete_task',task, 'delete_permanent')"
              >Eliminar</a
            >
          </li>
          <li>
            <a
              href="javascript:;"
              class="dropdown-item"
              @click="emit('delete_task',task, 'restore')"
              >Revive Task</a
            >
          </li>
        </template>
        <template v-else>
          <li>
            <a
              href="javascript:;"
              class="dropdown-item"
              @click="emit('edit_task',task)"
              >Edit</a
            >
          </li>
          <li v-if="task.status == 'important'">
            <a
              href="javascript:;"
              class="dropdown-item"
              @click="emit('set_important',task)"
              >Back to List</a
            >
          </li>
          <li v-else>
            <a
              href="javascript:;"
              class="dropdown-item"
              @click="emit('set_important',task)"
              >Important</a
            >
          </li>
          <li>
            <a
              href="javascript:;"
              class="dropdown-item"
              @click="emit('delete_task',task, 'delete')"
              >Delete</a
            >
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
