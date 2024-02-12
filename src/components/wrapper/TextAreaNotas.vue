<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: String,
  placeholder: String,
  maxlength: String,
  valorInicial: String
});

const emit = defineEmits(["txtArea"]);

const selected = ref("");

if (props.valorInicial === undefined) {
        selected.value = "";
    }else{
        selected.value = props.valorInicial;
    }
</script>
<template>
  <div class="row">
    <div class="col-md-12 align-self-center">
      <div class="form-group row invoice-note">
        <label
          for="invoice-detail-notes"
          class="col-sm-12 col-form-label col-form-label-sm"
          >{{ label }}</label
        >
        <div class="col-sm-12">
          <textarea
            v-model="selected"
            rows="3"
            id="invoice-detail-notes"
            class="form-control form-control-sm"
            :placeholder="placeholder"
            :maxlength="props.maxlength"
            @change="emit('txtArea', selected)"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>