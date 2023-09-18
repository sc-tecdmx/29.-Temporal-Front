<script setup>

     import { onMounted, ref } from 'vue';
     import '@/assets/sass/scrollspyNav.scss';
     import '@/assets/sass/forms/file-upload-with-preview.min.css';
     //import highlight from '@/components/plugins/highlight.vue';
     import FileUploadWithPreview from 'file-upload-with-preview';
     import { useMeta } from '@/composables/use-meta';

     useMeta({ title: 'File Upload' });

     const props= defineProps({
         label: String,
         tipoArchivo: String,
     });

     onMounted(() => {
         initTooltip();

         //multiple file upload
         new FileUploadWithPreview('myFirstImage', {
             images: {
                 baseImage: '@/assets/images/generic/file-preview.png',
                 //baseImage: require('@/assets/images/file-preview.png'),
                 backgroundImage: '',
             },
         });
     });

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
    <div class="d-flex mb-4 ">
        <div class="custom-file-container" data-upload-id="myFirstImage">
            <label>{{ label }}<a href="javascript:void(0)"
                    class="custom-file-container__image-clear"
                    title="Clear Image">x</a></label>
            <label class="custom-file-container__custom-file">
                <input type="file"
                    class="custom-file-container__custom-file__custom-file-input"
                    accept=".cer" />
                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                <span
                    class="custom-file-container__custom-file__custom-file-control"></span>
            </label>
            <div class="custom-file-container__image-preview"></div>
        </div>
    </div>

    <!-- <div class="statbox panel box box-shadow">
        <div class="panel-heading">
            <div class="panel-body">
                <div class="custom-file-container" data-upload-id="myFirstImage">
                    <label>Upload (Single File) <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">x</a></label>
                    <label class="custom-file-container__custom-file" >
                        <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*">
                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                        <span class="custom-file-container__custom-file__custom-file-control"></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                </div>
            </div>
        </div>
    </div> -->


</template>