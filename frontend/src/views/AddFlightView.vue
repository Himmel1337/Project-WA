<template>
  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>
  <v-alert type="warning" v-else-if="flightStore.loginMessage" class="mb-7">{{ flightStore.loginMessage }}</v-alert>

  <div v-if="flightStore.isloading">create flight ...</div>
  <div v-else>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
          v-model="title"
          label="Title"
          :rules="flightRules"
      ></v-text-field>
      <v-text-field
          v-model="text"
          label="Text"
      ></v-text-field>
      <v-text-field
          v-model="time"
          label="Time (Format: DD-MM-YYYY HH:MM)"
          :rules="flightRules"
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
      time: '',
      flightRules: [
        v => !!v || 'Time is required',
      ]
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