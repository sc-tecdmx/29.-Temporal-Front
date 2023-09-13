<script setup>
    import { ref } from 'vue';

    const props= defineProps({
        label: String,
        placeholder: String,
    });

    const params = ref({
        contenido: '',
    });
</script>
<template>
    <div class="invoice-detail-note">
        <div class="row">
            <div class="col-md-12 align-self-center">
                <div class="form-group row invoice-note">
                    <label for="invoice-detail-notes" class="col-sm-12 col-form-label col-form-label-sm">{{ label }}</label>
                    <div class="col-sm-12">
                        <textarea v-model="params.contenido" rows="3" id="invoice-detail-notes"
                                class="form-control"
                                :placeholder="placeholder"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>