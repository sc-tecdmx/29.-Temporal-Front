<script setup>
    import { onMounted, ref } from 'vue';

import '@/assets/sass/scrollspyNav.scss';
import '@/assets/sass/forms/file-upload-with-preview.min.css';
import highlight from '@/components/plugins/highlight.vue';
import FileUploadWithPreview from 'file-upload-with-preview';

import { useMeta } from '@/composables/use-meta';
import IconUploadCloud from '../icons/IconUploadCloud.vue';
useMeta({ title: 'File Upload' });

const code_arr = ref([]);

onMounted(() => {
    initTooltip();

    //multiple file upload
    new FileUploadWithPreview('mySecondImage', {
        text: {
                    chooseFile: "Agregar archivo ...",
                    browse: "Examinar",
                    selectedCount: "archivos seleccionados",
                },
         images: {
            baseImage: '@/assets/images/generic/file-preview.png',
            //baseImage: require('@/assets/images/file-preview.png'),
            backgroundImage: '',
         },
    });
});

const toggleCode = (name) => {
    if (code_arr.value.includes(name)) {
        code_arr.value = code_arr.value.filter((d) => d != name);
    } else {
        code_arr.value.push(name);
    }
};

const initTooltip = () => {
    setTimeout(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((tooltipTriggerEl) => {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    });
};
</script>
<template>
    <!-- Multiple File Upload -->
            <div class="custom-file-container" data-upload-id="mySecondImage">
                <IconUploadCloud></IconUploadCloud>
                <label> <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image"></a></label>
                <label class="custom-file-container__custom-file" >
                    <input type="file" class="custom-file-container__custom-file__custom-file-input" multiple>
                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                    <span class="custom-file-container__custom-file__custom-file-control"></span>
                </label>
                <div class="custom-file-container__image-preview"></div>
            </div>
</template>