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
</template>