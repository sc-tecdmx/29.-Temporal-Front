<script setup>
    const props= defineProps({
        label: String,
    });
</script>
<template>
    <!-- <div class="row">
        <div class="col-2">
            <label class="switch s-secondary mb-4 me-2">
                <input type="checkbox"/>
                <span class="slider round"></span>
            </label>
        </div>
        <div class="col-10">
            <span>{{ label }}</span>
        </div> 
    </div> -->
    <div class="form-check form-switch ms-3">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
        <label class="form-check-label ps-1" for="flexSwitchCheckDefault">{{ label }}</label>
    </div>
</template>

<style>
.form-check-input:checked {
    background-color: #690061 !important;
    border-color: #690061 !important;
}
</style>