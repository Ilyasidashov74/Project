<template>
  <BaseFormField :title="title" :error="error">
    <input  class="form__input" v-model="dataValue" :type="type"
           :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
  import FormFieldMixin from '../mixins/FormFieldMixin';

  export default {
    props:['type'],
  mixins:[FormFieldMixin]
  };
</script>
