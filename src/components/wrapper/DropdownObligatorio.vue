<script setup>
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
</template>