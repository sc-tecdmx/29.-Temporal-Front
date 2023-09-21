<script setup>
import { ref } from "vue";
import TableroPrioridad from "./TableroPrioridad.vue";
import TableroEditRow from "./TableroEditRow.vue";

const props=  defineProps({
  filtered_task_list: [],
});
const search_task = ref("");
console.log("props");
console.log(props);

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
    <!-- PAO -->
    <div v-for="task in props.filtered_task_list" class="todo-item all-list"
                                    :class="{ 'todo-task-done': task.status == 'complete' }" :key="task.task_id">
                                    <div class="todo-item-inner">
                                        <div class="checkbox-primary new-control custom-control custom-checkbox">
                                            <input type="checkbox" :id="`chk-${task.task_id}`" class="custom-control-input"
                                                :checked="task.status == 'complete'" @change="task_complete(task)" /><label
                                                class="custom-control-label" :for="`chk-${task.task_id}`"></label>
                                        </div>

                                        <div class="todo-content" data-bs-toggle="modal" data-bs-target="#todoShowListItem"
                                            @click="view_task(task)">
                                            <h5 class="todo-heading">{{ task.title }}</h5>
                                            <p class="meta-date">{{ task.date }}</p>
                                            <p class="todo-text">{{ task.description_text }}</p>
                                        </div>

                                        <div class="priority-dropdown">
                                            <div class="dropdown btn-group">
                                                <a href="javascript:;" id="ddlPriority"
                                                    class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown"
                                                    aria-expanded="false" :class="[priority_class(task)]">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        style="width: 24px; height: 24px" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round" class="feather feather-alert-octagon">
                                                        <polygon
                                                            points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
                                                        </polygon>
                                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                                        <line x1="12" y1="16" x2="12" y2="16"></line>
                                                    </svg>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlPriority">
                                                    <li>
                                                        <a href="javascript:;" class="dropdown-item danger"
                                                            @click="set_priority(task, 'high')">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-alert-octagon">
                                                                <polygon
                                                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
                                                                </polygon>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12" y2="16"></line>
                                                            </svg>
                                                            Alta
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" class="dropdown-item warning"
                                                            @click="set_priority(task, 'middle')">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-alert-octagon">
                                                                <polygon
                                                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
                                                                </polygon>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12" y2="16"></line>
                                                            </svg>
                                                            Media
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" class="dropdown-item primary"
                                                            @click="set_priority(task, 'low')">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                class="feather feather-alert-octagon">
                                                                <polygon
                                                                    points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
                                                                </polygon>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12" y2="16"></line>
                                                            </svg>
                                                            Baja
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="action-dropdown">
                                            <div class="dropdown btn-group">
                                                <a href="javascript:;" id="ddlMore"
                                                    class="btn dropdown-toggle btn-icon-only" data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-more-vertical">
                                                        <circle cx="12" cy="12" r="1"></circle>
                                                        <circle cx="12" cy="5" r="1"></circle>
                                                        <circle cx="12" cy="19" r="1"></circle>
                                                    </svg>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlMore">
                                                    <template v-if="task.status == 'trash'">
                                                        <li><a href="javascript:;" class="dropdown-item"
                                                                @click="delete_task(task, 'delete_permanent')">Eliminar</a></li>
                                                        <li><a href="javascript:;" class="dropdown-item"
                                                                @click="delete_task(task, 'restore')">Revive Task</a></li>
                                                    </template>
                                                    <template v-else>
                                                        <li><a href="javascript:;" class="dropdown-item"
                                                                @click="edit_task(task)">Edit</a></li>
                                                        <li v-if="task.status == 'important'"><a href="javascript:;"
                                                                class="dropdown-item" @click="set_important(task)">Back to
                                                                List</a></li>
                                                        <li v-else><a href="javascript:;" class="dropdown-item"
                                                                @click="set_important(task)">Important</a></li>
                                                        <li><a href="javascript:;" class="dropdown-item"
                                                                @click="delete_task(task, 'delete')">Delete</a></li>
                                                    </template>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    <!-- fin PAO -->
    
    </perfect-scrollbar>
  </div>
</template>
