<script setup>
  
  import IconTrash from "@/components/icons/IconTrash.vue"
  
    defineProps({
    params: { task_id: null,
              title: "",
        description: "", 
        selected_task:{}
    }

    });
</script>
<template>
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
                <IconTrash />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
</template>