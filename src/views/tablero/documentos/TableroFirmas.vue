<script setup>
import { computed, ref } from "vue";
import axios from "axios";
import { useLiveStore } from "@/stores/appLiveStore.js";
import ModalAddTask from "./ModalAddTask.vue"
import TableroSidebar from "./TableroSidebar.vue"
import TableroPrioridad from "./TableroPrioridad.vue";

//---
import TableroBuscar from "./TableroBuscar.vue"
/*
import { quillEditor, Quill } from 'vue3-quill'
*/
import "vue3-quill/lib/vue3-quill.css";

import "@/assets/sass/apps/todolist.scss";
import "@/assets/sass/components/custom-modal.scss";
import "@/assets/sass/scrollspyNav.scss";
import "@/assets/sass/tables/table-basic.scss";
import highlight from "@/components/plugins/highlight.vue";

import IconPortapapeles from "@/components/icons/IconPortapapeles.vue"
import IconPlus from "@/components/icons/IconPlus.vue"
import IconDropdown from "@/components/icons/IconDropdown.vue"
import IconFeatherMoreVertical from "@/components/icons/IconFeatherMoreVertical.vue";

const appLiveStore = useLiveStore();

import { onMounted } from "vue";

//---------------------------
const is_show_task_menu = ref(false);
const params = ref({ task_id: null, title: "", description: "" });
const tab_index = ref(0);
const task_list = ref([]);
const filtered_task_list = ref([]);
const search_task = ref("");
const selected_tab = ref("");
const selected_task = ref(null);
const editor_options = ref({
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
});
let addTaskModal = ref(null);
let quillEditorData = ref(null);
//--------------
const initPopup = () => {
  addTaskModal = new window.bootstrap.Modal(
    document.getElementById("addTaskModal")
  );
};
onMounted(() => {
  initPopup();
  bind_task_list();
});

const quillEditorReady = (quill) => {
  quillEditorData = quill;
};
const bind_task_list = async () => {

  try {
    const { data } = await axios.get("http://localhost/j/d.php");
    task_list.value = data;
    console.log("AXIOS:" + task_list.value);
  } catch (error) {
    console.log(error);
  }
  search_tasks();
};

const tab_changed = (type) => {
  selected_tab.value = type;
  search_tasks();
  is_show_task_menu.value = false;
};

const search_tasks = () => {
    console.log ("search_tasks")
  let res;
  if (selected_tab.value) {
    res = task_list.value.filter((d) => d.status == selected_tab.value);
  } else {
    res = task_list.value.filter((d) => d.status != "trash");
  }
  filtered_task_list.value = res.filter((d) =>
    d.title.toLowerCase().includes(search_task.value)
  );
};

const search_tasks2 = (search_task2) => {
    console.log ("selected_tab.value>" + selected_tab.value)
    console.log ("search_task2.value [" + search_task2 + "]")
   
    
  let res;
  if (selected_tab.value) {
    res = task_list.value.filter((d) => d.status == selected_tab.value);
    console.log ("search_tasks2 - Opción 1")
  } else {
    res = task_list.value.filter((d) => d.status != "trash");
    console.log ("search_tasks2 - Opción 2")
  }
  filtered_task_list.value = res.filter((d) =>
    d.title.toLowerCase().includes(search_task2)
  );
};

//-----------------------------------

const set_priority = (task, name) => {
  task.priority = name;
};
const task_complete = (task) => {
  if (!task.status) {
    task.status = "complete";
  } else {
    task.status = "";
  }
};
const set_important = (task) => {
  if (task.status == "important") {
    task.status = "";
    tab_index.value = 0;
    tab_changed("");
  } else {
    task.status = "important";
  }
};
const delete_task = (task, type) => {
  if (type == "delete") {
    task.status = "trash";
  }
  if (type == "delete_permanent") {
    task_list.value = task_list.value.filter((d) => d.task_id != task.task_id);
  } else if (type == "restore") {
    task.status = "";
  }
  search_tasks();
};
const view_task = (task) => {
  selected_task.value = task;
};

const edit_task = (task) => {
  params.value = { task_id: null, title: "", description: "" };
  if (task) {
    params.value = JSON.parse(JSON.stringify(task));
  }
  addTaskModal.show();
};
//-------------------------
const save_task = () => {
  if (!params.value.title) {
    showMessage("Title is required.", "error");
    return false;
  }
  let description_text = quillEditorData.getText();
  if (params.value.task_id) {
    //update task
    let task = task_list.value.find((d) => d.task_id == params.value.task_id);
    task.title = params.value.title;
    task.description = params.value.description;
    task.description_text = description_text;
  } else {
    //add task
    const max_task_id = task_list.value.reduce(
      (max, character) => (character.task_id > max ? character.task_id : max),
      task_list.value[0].task_id
    );

    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth()); //January is 0!
    var yyyy = today.getFullYear();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let task = {
      task_id: max_task_id + 1,
      title: params.value.title,
      description: params.value.description,
      description_text: description_text,
      date: monthNames[mm] + ", " + dd + " " + yyyy,
      priority: "low",
      status: "",
    };
    task_list.value.splice(0, 0, task);
    search_tasks();
  }

  showMessage("Task saved successfully.");
  addTaskModal.hide();
};

const showMessage = (msg = "", type = "success") => {
  const toast = window.Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
  });
  toast.fire({
    icon: type,
    title: msg,
    padding: "10px 20px",
  });
};
//-- Fin de scrips de lista de tareas
//-- Axios

//--
//----------------------------
</script>
<template>
  <!-- Tablero de notas -->
  <div class="row layout-top-spacing">
    <div class="col-xl-12 col-lg-12 col-md-12">
      <div class="mail-box-container">
        <!-- No se que hace -->
        <div
          class="mail-overlay"
          :class="{ 'mail-overlay-show': is_show_task_menu }"
          @click="is_show_task_menu = false"
        ></div>
        <!-- ./No se que hace -->
        <!-- task_menu -->
        <div class="tab-title" :class="{ 'mail-menu-show': is_show_task_menu }">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-12 text-center">
                <IconPortapapeles />
              <h5 class="app-title">Firmar documentos</h5>
            </div>
            <div class="btn-group mb-3 me-4">
              <button type="button" class="btn btn-info">
                <IconPlus />
                Nuevo
              </button>
              <button
                type="button"
                class="btn btn-info dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <IconDropdown />
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="javascript:void(0);"
                  >Firma individual</a
                >
                <a class="dropdown-item" href="javascript:void(0);"
                  >Firma múltiple</a
                >
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(0);"
                  >Subir archivo</a
                >
              </div>
            </div>

            <!-- <perfect-scrollbar class="todoList-sidebar-scroll"> -->
            <TableroSidebar 
                :selected_tab="selected_tab"
                :task_list ="task_list.value"
                @tab_changed="tab_changed"
            />
          </div>
        </div>
        <!-- ./task_menu -->

        <!-- Content Tablero -->
        <div id="todo-inbox" class="accordion todo-inbox">
        <!-- Tablero Buscador -->
        <TableroBuscar
            :is_show_task_menu ="is_show_task_menu"
            @search_tasks="search_tasks2"
        />
        <!-- ./Tablero Buscador -->

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
              <div
                v-for="task in filtered_task_list"
                class="todo-item all-list"
                :class="{ 'todo-task-done': task.status == 'complete' }"
                :key="task.task_id"
              >
                <div class="todo-item-inner">
                  <!-- Checkbox -->
                  <div
                    class="checkbox-primary new-control custom-control custom-checkbox"
                  >
                    <input
                      type="checkbox"
                      :id="`chk-${task.task_id}`"
                      class="custom-control-input"
                      :checked="task.status == 'complete'"
                      @change="task_complete(task)"
                    /><label
                      class="custom-control-label"
                      :for="`chk-${task.task_id}`"
                    ></label>
                  </div>
                  <!-- ./Checkbox -->
                  <!-- Documento -->
                  <div
                    class="todo-content"
                    data-bs-toggle="modal"
                    data-bs-target="#todoShowListItem"
                    @click="view_task(task)"
                  >
                    <h5 class="todo-heading">{{ task.title }}</h5>
                    <p class="meta-date">{{ task.date }}</p>
                    <p class="todo-text">{{ task.description_text }}</p>
                  </div>
                  <!-- ./ Documento -->
                  <!-- Prioridad -->
                  <TableroPrioridad 
                  :task = "task"
                  @set_priority = "set_priority"
                  />
                  <!-- ./ Prioridad -->
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
                      <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="ddlMore"
                      >
                        <template v-if="task.status == 'trash'">
                          <li>
                            <a
                              href="javascript:;"
                              class="dropdown-item"
                              @click="delete_task(task, 'delete_permanent')"
                              >Eliminar</a
                            >
                          </li>
                          <li>
                            <a
                              href="javascript:;"
                              class="dropdown-item"
                              @click="delete_task(task, 'restore')"
                              >Revive Task</a
                            >
                          </li>
                        </template>
                        <template v-else>
                          <li>
                            <a
                              href="javascript:;"
                              class="dropdown-item"
                              @click="edit_task(task)"
                              >Edit</a
                            >
                          </li>
                          <li v-if="task.status == 'important'">
                            <a
                              href="javascript:;"
                              class="dropdown-item"
                              @click="set_important(task)"
                              >Back to List</a
                            >
                          </li>
                          <li v-else>
                            <a
                              href="javascript:;"
                              class="dropdown-item"
                              @click="set_important(task)"
                              >Important</a
                            >
                          </li>
                          <li>
                            <a
                              href="javascript:;"
                              class="dropdown-item"
                              @click="delete_task(task, 'delete')"
                              >Delete</a
                            >
                          </li>
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </div>
        <!-- ./Content Tablero -->
      </div>

      <!-- Modal -->
      <div
        id="todoShowListItem"
        class="modal fade"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content todolist-popup" v-if="selected_task">
            <div class="modal-header">
              <h5 class="modal-title task-heading">
                {{ selected_task.title }}
              </h5>
              <button
                type="button"
                data-dismiss="modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                class="btn-close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="compose-box">
                <div class="compose-content">
                  <p
                    class="task-text overflow-auto"
                    v-html="selected_task.description"
                  ></p>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                data-bs-dismiss="modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-trash"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalAddTask params="params" />
    </div>
  </div>
  <!-- ./Tablero de notas -->
</template>
<style>
.todo-inbox .todo-item .todo-item-inner .action-dropdown .dropdown-menu.show,
.todo-inbox .todo-item .todo-item-inner .priority-dropdown .dropdown-menu.show {
  top: 10px !important;
}

.ql-container,
.ql-editor {
  min-height: inherit;
}

.ql-editor {
  max-height: 200px;
}

.ql-toolbar.ql-snow .ql-picker-label {
  border: 1px solid transparent;
  color: #4361ee;
}

.ql-snow .ql-stroke {
  fill: none;
  stroke: #4361ee;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
  fill: #4361ee;
}

#addTaskModal .ql-toolbar.ql-snow {
  border: 1px solid #bfc9d4;
  box-sizing: border-box;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  padding: 8px;
  border-radius: 6px;
  margin-top: 0;
}

.ql-container.ql-snow {
  border-top: 0px;
  margin-top: 10px;
  padding: 13px 0;
  border: 1px solid #bfc9d4 !important;
  border-radius: 6px;
}
</style>
