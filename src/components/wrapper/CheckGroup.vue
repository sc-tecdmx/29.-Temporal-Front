<script setup>
    import { ref } from 'vue';
    //composable
    import { useGetData } from "@/composables/getData";

    const {data, getData, loading, errorData} = useGetData();

    const props= defineProps({
            label: String,
            picked: String,
            opPrioridad: Object
        });
    const emit = defineEmits(['opcionCheck']);
    const picked = ref("");

    if (props.picked === undefined) {
        picked.value = "";
    }else{
        picked.value = props.picked;
    }

</script>
<template>
    <div class="ms-5 mt-3">
        <p>{{ props.label }}</p>
        <div class="form-check form-check-inline ps-0" v-for="opcionCheck in props.opPrioridad">
            <div class="custom-control custom-checkbox" >
                <input class="form-check-input" 
                        type="radio" 
                        name="flexRadioDefault" 
                        :id="'chk'+ opcionCheck.id"
                        :value="opcionCheck.prioridad"
                        v-model="picked"
                        @change="emit('opcionCheck', picked)"
                >
                <label class="form-check-label" :for="'chk'+ opcionCheck.id">
                    {{ opcionCheck.prioridad }}
                </label>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
