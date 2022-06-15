<template>
  <div v-if="reservationStore.isloading">create reservation ...</div>
  <div v-else>
    <v-form v-model="formValid" lazy-validation ref="form">

      <v-btn @click="addReservation()" color="primary">Add</v-btn>
    </v-form>
  </div>

  <div>
    <v-select
        v-model:="flightInput.flightId"
        :items="flightsArray"
        item-value="id"
        item-text="title"
        label="Flights"/>
  </div>

</template>

<script>

import {mapStores} from "pinia/dist/pinia";
import {useReservationStore} from "../stores/ReservationStore";
import Error from "../components/Error.vue";
import {useFlightStore} from "../stores/FlightStore";

export default {
  name: "Create",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      flightInput: {
        flightId: 1,
      },
      flightsArray: [
        {id: 1, title: "Mars", text: "Mars", time: "2033"},
        {id: 2, title: "Venus", text: "Venus", time: "2034"},
        {id: 3, title: "Neptun", text: "Neptun", time: "2035"},
      ],
    };
  },

  created() {
    this.flightStore.loadAll()
  },

  computed: {
    ...mapStores(useReservationStore, useFlightStore),
  },

  methods: {

    async addReservation(title, text, flight_id ) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.reservationStore.addReservation(this.title, this.text, this.flight_id);
    },
  }
};

</script>

<style>
</style>

