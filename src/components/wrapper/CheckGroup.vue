<script setup>
    import { ref } from 'vue';
    //composable
    import { useGetData } from "@/composables/getData";

    const {data, getData, loading, errorData} = useGetData();

    const props= defineProps({
            label: String,
            url: String,
            picked: String
        });
    const emit = defineEmits(['opcionCheck']);
    const picked = ref("");

    getData(props.url);
</script>
<template>
    <div class="ms-5 mt-3">
        <p>{{ props.label }}</p>
        <div class="form-check form-check-inline ps-0" v-for="opcionCheck in data">
            <div class="custom-control custom-checkbox" >
                <input class="form-check-input" 
                        type="radio" 
                        name="flexRadioDefault" 
                        :id="'chk'+ opcionCheck.n_id_prioridad"
                        :value="opcionCheck.n_id_prioridad"
                        v-model="picked"
                        @change="emit('opcionCheck', picked)"
                >
                <label class="form-check-label" :for="'chk'+ opcionCheck.n_id_prioridad">
                    {{ opcionCheck.desc_prioridad }}
                </label>
            </div>
            <!-- <span>Eligió: {{ picked }}</span> -->
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
