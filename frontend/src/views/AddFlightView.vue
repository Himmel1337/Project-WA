<template>
  <div v-if="flightStore.isloading">create flight ...</div>
  <div v-else>
    <v-form v-model="formValid" lazy-validation ref="form">
      <v-text-field
          v-model="title"
          label="Title"
      ></v-text-field>
      <v-text-field
          v-model="text"
          label="Text"
      ></v-text-field>
      <v-text-field
          v-model="time"
          label="Time"
      ></v-text-field>
      <v-btn @click="addFlight()" color="primary">Create</v-btn>
    </v-form>
  </div>
</template>

<script>

import {mapStores} from "pinia/dist/pinia";
import {useFlightStore} from "../stores/FlightStore";
import Error from "../components/Error.vue";

export default {
  name: "Create",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      title: '',
      text: '',
      time: ''
    }
  },

  computed: {
    ...mapStores(useFlightStore),
  },

  methods: {
    async addFlight(title, text, time) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.flightStore.addFlight(this.title, this.text, this.time);

    },
  }
}

</script>

<style scoped>
</style>