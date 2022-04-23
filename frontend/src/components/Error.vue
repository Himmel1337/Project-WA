<template>
  <div class="error">
    {{ text }}
    <button @click="onHideClick">Hide</button>
  </div>
</template>

<script>
export default {
  name: 'Error',

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
.error {
  background: red;
  color: white;
  padding: 2em;
  margin-bottom: 1em;
}
</style>