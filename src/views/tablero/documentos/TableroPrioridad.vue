<script setup>
import IconAlertOctagon from "@/components/icons/IconAlertOctagon.vue";


defineProps({
  task: {},
});

const priority_class = (task) => {
  console.log("priority_class:" + task);
  //  console.log ('task.priority:' + task.priority )

  if (task.priority == "low") {
    return "primary";
  } else if (task.priority == "middle") {
    return "warning";
  } else if (task.priority == "high") {
    return "danger";
  }
};

const emit = defineEmits(["set_priority"]);
// @click="set_priority(task, 'high')"
</script>
<template>
  <div class="priority-dropdown">
    <div class="dropdown btn-group">
      <a
        href="javascript:;"
        id="ddlPriority"
        class="btn dropdown-toggle btn-icon-only"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        :class="[priority_class(task)]"
      >
        <IconAlertOctagon />
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlPriority">
        <li>
          <a
            href="javascript:;"
            class="dropdown-item danger"
            @click="emit('set_priority', task, 'high')"
          >
            <IconAlertOctagon />
            Alta
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            class="dropdown-item warning"
            @click="emit('set_priority', task, 'middle')"
          >
            <IconAlertOctagon />
            Media
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            class="dropdown-item primary"
            @click="emit('set_priority', task, 'low')"
          >
            <IconAlertOctagon />
            Baja
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
