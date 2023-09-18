<script setup>

    import { ref } from 'vue';
    const props= defineProps({
        idName: String,
        label: String,
        placeholder: String,
    });

    const params = ref({
        contenido: '',
    });
</script>
<template>
    <div class="form-group row invoice-created-by">
        <!-- <label 
            :for=" idName "
            class="col-sm-4 col-form-label col-form-label-sm">{{ label }}</label> -->
        <div class="col-sm-12">
            <label 
            :for=" idName "
            class="col-sm-12 col-form-label col-form-label-sm pb-0">{{ label }}</label>
            <input 
                type="text" 
                v-model="params.contenido"
                :id="idName"
                class="form-control form-control-sm" 
                :placeholder=" placeholder " 
                />
        </div>
    </div>
</template>