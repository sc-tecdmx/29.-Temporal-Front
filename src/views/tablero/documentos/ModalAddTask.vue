<script setup>
    defineProps({
    params: { task_id: null,
              title: "",
        description: "" }

    }   );
</script>
<template>
          <div
        id="addTaskModal"
        class="modal fade"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content todolist-popup">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ params.task_id ? "Update Task" : "Add Task" }}
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
                  <form>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group mb-4">
                          <label>Title</label>
                          <div class="w-100">
                            <input
                              type="text"
                              v-model="params.title"
                              class="form-control"
                              placeholder="Title"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Description</label>
                          <div class="w-100">
                            <quill-editor
                              ref="editor"
                              v-model:value="params.description"
                              :options="editor_options"
                              style="min-height: 200px"
                              @ready="quillEditorReady($event)"
                            ></quill-editor>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
                Discard
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="save_task()"
              >
                {{ params.task_id ? "Update" : "Add" }}
              </button>
            </div>
          </div>
        </div>
      </div>
</template>