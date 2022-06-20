<template>
  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>
  <success v-if="flightStore.success" :text="flightStore.success" @hide="flightStore.clearSuccess()"></success>
  <v-alert type="warning" v-else-if="flightStore.loginMessage" class="mb-7">{{ flightStore.loginMessage }}</v-alert>

  <div v-if="flightStore.isloading">Change flight ...</div>
  <div v-else>
    <h1>Flight</h1>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
        v-model="flight.name"
        label="Name"
      ></v-text-field>
      <v-text-field
          v-model="flight.capacity"
          type="number"
          label="Date"
      ></v-text-field>
      <v-text-field
        v-model="flight.date"
        type="date"
        label="Date"
      ></v-text-field>
      <v-text-field
        v-model="flight.time"
        type="time"
        label="Time"
      ></v-text-field>
        <v-btn @click="changeFlight(flight.id, flight)" color="green">Change</v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useFlightStore} from "../stores/FlightStore";
import Error from "../components/Error.vue"
import Success from "../components/Success.vue";

export default {
  name: "FlightDetail",

  components: {
    Error, Success
  },

  data() {
    return {
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },

  created() {
    this.flightStore.loadById(this.id);
  },

  computed: {
    ...mapStores(useFlightStore),

    id() {
      return parseInt(this.$route.params.id);
    },

    flight() {
      return this.flightStore.getById(this.id);
    },
  },

  methods: {

    async changeFlight(id, flight) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.flightStore.changeFlight(this.id, this.flight);
    },

  }
}
</script>

<style>
</style>
