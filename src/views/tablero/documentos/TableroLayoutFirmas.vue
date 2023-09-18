<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

//import { useLiveStore } from "@/stores/appLiveStore.js";
import TableroSidebar from "./TableroSidebar.vue";
import TableroListado from "./TableroListado.vue";
import TableroBuscar from "./TableroBuscar.vue";
import ModalAddTask   from "./ModalAddTask.vue";
import ModalViewTask  from "./ModalViewTask.vue";

import "@/assets/sass/apps/todolist.scss";
import "@/assets/css/modulos/todolist-editor.css"
import "@/assets/sass/components/custom-modal.scss";
import "@/assets/sass/scrollspyNav.scss";
import "@/assets/sass/tables/table-basic.scss";

import highlight from "@/components/plugins/highlight.vue";

import IconPortapapeles from "@/components/icons/IconPortapapeles.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconDropdown from "@/components/icons/IconDropdown.vue";


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

const axiosInstance = axios.create({
  "Access-Control-Allow-Origin": "*"
});

const bind_task_list = async () => {
  try {
    const { data } = await axiosInstance.get("http://localhost/j/d.php");
    task_list.value = data;
    console.log("AXIOS:" + task_list.value);
    console.log(task_list.value);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  console.log("bind_task_list")
  search_tasks(search_task.value);
};


const search_tasks = (search_task) => {
  console.log("search_task["+search_task+"]")
  let res; 
  if (selected_tab.value) {
    res = task_list.value.filter((d) => d.status == selected_tab.value);
  } else {
    res = task_list.value.filter((d) => d.status != "trash");
  }
  filtered_task_list.value = res.filter((d) =>
    d.title.toLowerCase().includes(search_task)
  );
};
const tab_changed = (type) => {
  selected_tab.value = type;
  search_tasks(search_task.value);
  is_show_task_menu.value = false;
};
onMounted(() => {
  initPopup();
  bind_task_list();
});

const quillEditorReady = (quill) => {
  quillEditorData = quill;
};


//-----------------------------------

const set_priority = (task, name) => {
  task.priority = name;
};
const task_complete = (task) => {
  console.log('task_complete')
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
  <!-- Tablero de Firmas -->
  <!--<div class="row mb-2">
      <div class="col-md-12">
          <h3>Tablero de firmas electrónicas</h3>
      </div>
  </div>-->
  <div>
    <div class="row layout-top-spacing">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <div class="mail-box-container">
          <!-- Botón responsivo -->
          <div
            class="mail-overlay"
            :class="{ 'mail-overlay-show': is_show_task_menu }"
            @click="is_show_task_menu = false"
          ></div>
          <!-- ./ Botón responsivo -->
          <!-- task_menu -->
          <div class="tab-title" :class="{ 'mail-menu-show': is_show_task_menu }">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-12 text-center">
                <IconPortapapeles />
                <h5 class="app-title">Firmar documentos</h5>
              </div>
              <div class="btn-group mb-3 me-4">
                <button type="button" class="btn btn-primary" @click="edit_task()">
                  <IconPlus />
                  Nuevo
                </button>

                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
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
                :task_list="task_list.value"
                @tab_changed="tab_changed"
              />
            </div>
          </div>
          <!-- ./task_menu -->

          <!-- Content Tablero -->
          <div id="todo-inbox" class="accordion todo-inbox">
            <!-- Tablero Buscador -->
            <TableroBuscar
              :is_show_task_menu="is_show_task_menu"
              @search_tasks="search_tasks"
            /> {{ is_show_task_menu }} Aqui
            <!-- ./Tablero Buscador -->
            <div v-if="filtered_task_list">
            <TableroListado
              :filtered_task_list="filtered_task_list ? filtered_task_list.value : null"
              @task_complete="task_complete"
              @view_task="view_task"
              @edit_task="edit_task"
              @delete_task="delete_task"
              @set_important="set_important"
            />
          </div>
          </div>
          <!-- ./Content Tablero -->
        </div>

        <!-- Modal -->
        <ModalViewTask v-if="selected_task" params="params" 
          :selected_task="selected_task"
        />

        <ModalAddTask params="params" />
      </div>
    </div>
  </div>
  <!-- ./Tablero de Firmas -->
</template>
<style>

</style>
