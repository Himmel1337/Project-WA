<template>
  <v-alert
      type="success"
      icon="mdi-alert-circle"
      closable
      @close="onHideClick"
      class="mb-5"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Success',

  props: {
    text: {
      type: String,
      required: true
    }
  },

  methods: {
    onHideClick() {
      this.$emit('hide');
    }
  }
}
</script>

<style>
</style>