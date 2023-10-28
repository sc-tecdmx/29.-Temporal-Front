<template>







    <div class="layout-px-spacing todo-list">
                    <div id="todo-inbox" class="accordion todo-inbox">
                                <div v-for="task in filtered_task_list" class="todo-item all-list" :class="{ 'todo-task-done': task.status == 'complete' }" :key="task.task_id">
                                    <div class="todo-item-inner">
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
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style="width: 24px; height: 24px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        class="feather feather-alert-octagon"
                                                    >
                                                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                                        <line x1="12" y1="16" x2="12" y2="16"></line>
                                                    </svg>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="ddlPriority">
                                                    <li>
                                                        <a href="javascript:;" class="dropdown-item danger" @click="set_priority(task, 'high')">
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
                                                                class="feather feather-alert-octagon"
                                                            >
                                                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12" y2="16"></line>
                                                            </svg>
                                                            High
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" class="dropdown-item warning" @click="set_priority(task, 'middle')">
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
                                                                class="feather feather-alert-octagon"
                                                            >
                                                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12" y2="16"></line>
                                                            </svg>
                                                            Middle
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" class="dropdown-item primary" @click="set_priority(task, 'low')">
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
                                                                class="feather feather-alert-octagon"
                                                            >
                                                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                                <line x1="12" y1="16" x2="12" y2="16"></line>
                                                            </svg>
                                                            Low
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
    </div>
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
    .ql-container.ql-snow {
        border-top: 0px;
        margin-top: 10px;
        padding: 13px 0;
        border: 1px solid #bfc9d4 !important;
        border-radius: 6px;
    }

    .todo-list .todo-inbox .todo-item .todo-item-inner .priority-dropdown {
    
    padding: 0;
}
</style>

<script setup>
    import { onMounted, ref } from 'vue';
    import '@/assets/sass/apps/todolist.scss';

    import '@/assets/sass/components/custom-modal.scss';

    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Todo List' });

    const is_show_task_menu = ref(false);
    const params = ref({ task_id: null, title: '', description: '' });
    const tab_index = ref(0);
    const task_list = ref([]);
    const filtered_task_list = ref([]);
    const search_task = ref('');
    const selected_tab = ref('');
    const selected_task = ref(null);
    const editor_options = ref({
        modules: {
            toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
        },
    });
    

    onMounted(() => {
    
        bind_task_list();
    });

    

    
    const bind_task_list = () => {
        task_list.value = [
            {
                task_id: 1,
                title: 'Meeting with Shaun Park at 4:50pm',
                date: 'Aug, 07 2020',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue. Vivamus sem ante, ultrices at ex a, rhoncus ullamcorper tellus. Nunc iaculis eu ligula ac consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis urna neque, eget posuere lorem tempus non. Suspendisse ac turpis dictum, convallis est ut, posuere sem. Etiam imperdiet aliquam risus, eu commodo urna vestibulum at. Suspendisse malesuada lorem eu sodales aliquam.',
                description_text:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue. Vivamus sem ante, ultrices at ex a, rhoncus ullamcorper tellus. Nunc iaculis eu ligula ac consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis urna neque, eget posuere lorem tempus non. Suspendisse ac turpis dictum, convallis est ut, posuere sem. Etiam imperdiet aliquam risus, eu commodo urna vestibulum at. Suspendisse malesuada lorem eu sodales aliquam.',
                priority: 'middle',
                status: '',
            },

        ];
        search_tasks();
    };

    const tab_changed = (type) => {
        selected_tab.value = type;
        search_tasks();
        is_show_task_menu.value = false;
    };

    const search_tasks = () => {
        let res;
        if (selected_tab.value) {
            res = task_list.value.filter((d) => d.status == selected_tab.value);
        } else {
            res = task_list.value.filter((d) => d.status != 'trash');
        }
        filtered_task_list.value = res.filter((d) => d.title.toLowerCase().includes(search_task.value));
    };
    const priority_class = (task) => {
        if (task.priority == 'low') {
            return 'primary';
        } else if (task.priority == 'middle') {
            return 'warning';
        } else if (task.priority == 'high') {
            return 'danger';
        }
    };
    const set_priority = (task, name) => {
        task.priority = name;
    };
    const task_complete = (task) => {
        if (!task.status) {
            task.status = 'complete';
        } else {
            task.status = '';
        }
    };
    const set_important = (task) => {
        if (task.status == 'important') {
            task.status = '';
            tab_index.value = 0;
            tab_changed('');
        } else {
            task.status = 'important';
        }
    };
    const delete_task = (task, type) => {
        if (type == 'delete') {
            task.status = 'trash';
        }
        if (type == 'delete_permanent') {
            task_list.value = task_list.value.filter((d) => d.task_id != task.task_id);
        } else if (type == 'restore') {
            task.status = '';
        }
        search_tasks();
    };
    const view_task = (task) => {
        selected_task.value = task;
    };

    const edit_task = (task) => {
        params.value = { task_id: null, title: '', description: '' };
        if (task) {
            params.value = JSON.parse(JSON.stringify(task));
        }
        //addTaskModal.show();
    };

    const save_task = () => {
        if (!params.value.title) {
            showMessage('Title is required.', 'error');
            return false;
        }
        // let description_text = quillEditorData.getText();
        if (params.value.task_id) {
            //update task
            let task = task_list.value.find((d) => d.task_id == params.value.task_id);
            task.title = params.value.title;
            task.description = params.value.description;
            task.description_text = description_text;
        } else {
            //add task
            const max_task_id = task_list.value.reduce((max, character) => (character.task_id > max ? character.task_id : max), task_list.value[0].task_id);

            let today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth()); //January is 0!
            var yyyy = today.getFullYear();
            var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            let task = {
                task_id: max_task_id + 1,
                title: params.value.title,
                description: params.value.description,
                description_text: description_text,
                date: monthNames[mm] + ', ' + dd + ' ' + yyyy,
                priority: 'low',
                status: '',
            };
            task_list.value.splice(0, 0, task);
            search_tasks();
        }

        showMessage('Task saved successfully.');
        //addTaskModal.hide();
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast = window.Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
</script>
