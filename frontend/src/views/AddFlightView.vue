<template>
  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>
  <v-alert type="warning" v-else-if="flightStore.loginMessage" class="mb-7">{{ flightStore.loginMessage }}</v-alert>

  <div v-if="flightStore.isloading">create flight ...</div>
  <div v-else>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
          v-model="name"
          label="Name"
          :rules="rules.required"
      ></v-text-field>
      <v-text-field
          v-model="date"
          label="Date"
          type="date"
          :rules="rules.required"
      ></v-text-field>
      <v-text-field
          v-model="time"
          label="Time"
          type="time"
          :rules="rules.required"
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
  name: "AddFlight",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      name: '',
      date: '',
      time: '',
      rules: {
        required: value => !!value || 'Required.',
      }
    }
  },

  computed: {
    ...mapStores(useFlightStore),
  },

  methods: {
    async addFlight(name, date, time) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.flightStore.addFlight(this.name, this.date, this.time);

    },
  }
}

</script>

<style scoped>
</style>