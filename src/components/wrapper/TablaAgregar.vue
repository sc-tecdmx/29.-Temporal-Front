<script setup>
    import { ref } from 'vue';
    import IconFeatherTrash from '../icons/IconFeatherTrash.vue';

    /** Multiselect */
     import '@/assets/sass/scrollspyNav.scss';
     import highlight from '@/components/plugins/highlight.vue';

     import Multiselect from '@suadelabs/vue3-multiselect';
     import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

    const props= defineProps({
        titulo: String,
        //dataTable: {},
        labelButton: String,
    });

    const inputs = ref({
        input1: [],
        input2: [],
        input3: [],
        input4: [],
        input5: [],
    });

    const addTag = (newTag) => {
        options4.value.push(newTag);
        inputs.value['input4'].push(newTag);
    };

    const options4 = ref(['Lic. Otilio Esteban Hernández Pérez', 'Ing. Isaí Fararoni Ramírez', 'Lic. Nallely ']);

</script>
<template>
    <div class="invoice-detail-items">
        <div class="col-xl-5 invoice-address-company">
            <h4>{{ titulo }}</h4>
        </div>
                                        <div>
                                            <multiselect v-model="inputs['input4']" :options="options4" :multiple="true"
                                                :taggable="true" :searchable="true" placeholder="Seleccionar..."
                                                selected-label="" select-label="" deselect-label="" @tag="addTag">
                                            </multiselect>
                                        </div>
        <div class="table-responsive">
            <table role="table" aria-busy="false" aria-colcount="5" class="table table-bordered" id="__BVID__415">
                <thead role="rowgroup">
                    <tr role="row">
                        <th role="columnheader" scope="col" aria-colindex="1">
                            <div>Nombre</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="2">
                            <div>Firma</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="3">
                            <div>Editar</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="4" class="text-center">
                            <div>Estado</div>
                        </th>
                        <th role="columnheader" scope="col" aria-colindex="5" aria-label="Action" class="text-center">
                            <div></div>
                        </th>
                    </tr>
                </thead>
                <tbody role="rowgroup">
                    <tr role="row">
                        <td aria-colindex="1" role="cell">Lic. Otilio Esteban Hernández Pérez</td>
                        <td aria-colindex="2" role="cell">Firmante</td>
                        <td aria-colindex="3" role="cell">></td>
                        <td aria-colindex="4" role="cell" class="text-center">
                            <span> Ok</span>
                        </td>
                        <td aria-colindex="5" role="cell" class="text-center">
                            <IconFeatherTrash></IconFeatherTrash>
                        </td>
                    </tr>
                    <tr role="row">
                        <td aria-colindex="1" role="cell">Ing. Isaí Fararoni Ramírez</td>
                        <td aria-colindex="2" role="cell">Rubrica</td>
                        <td aria-colindex="3" role="cell">></td>
                        <td aria-colindex="4" role="cell" class="text-center">
                            <span> Ok</span>
                        </td>
                        <td aria-colindex="5" role="cell" class="text-center">
                            <IconFeatherTrash></IconFeatherTrash>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <button 
                type="button" 
                class="btn btn-secondary additem btn-sm"
                @click="add_item()">{{ labelButton }}</button>
    </div>
</template>
<style>
.select2 .multiselect__option--highlight {
    background: #fff;
    color: #4361ee;
}

.select2 .multiselect__option--selected {
    background-color: rgba(27, 85, 226, 0.23921568627450981);
    color: #4361ee;
    font-weight: normal;
}

.select2 .multiselect__option--disabled {
    background: inherit !important;
}

.select2 .multiselect__tag {
    color: #000;
    background: #e4e4e4;
}

.select2 .multiselect__tag-icon:after {
    color: #000 !important;
}

.select2 .multiselect__tag-icon:focus,
.select2 .multiselect__tag-icon:hover {
    background: inherit;
}
</style>