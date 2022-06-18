<template>
  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>
  <v-alert type="warning" v-else-if="reservationStore.loginMessage" class="mb-7">{{ reservationStore.loginMessage }}</v-alert>

  <div v-if="reservationStore.isloading">Create reservation ...</div>
  <div v-else>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
          v-model="title"
          label="Title"
      ></v-text-field>
      <v-select
          v-model="flight_id"
          :items="flightTitleArray"
          label="Flight"
          persistent-hint
          return-object
          single-line
      ></v-select>
      <v-combobox
          v-model="users"
          :items="usersNicknames"
          label="Users"
          multiple
          outlined
          dense
      ></v-combobox>
      <v-btn @click="addReservation()" color="primary">Create</v-btn>
    </v-form>
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
      title: '',
      flight_id: 0,
      flightTitleArray: ['Mars', 'Neptun', 'Venus', 'Other'],
      usersNicknames: ['maks', 'tomas', 'ferd'],
      users: []
    };
  },

  created() {
    this.flightStore.loadAll()
  },

  computed: {
    ...mapStores(useReservationStore, useFlightStore),
  },

  methods: {

    async addReservation(title, flight_id, users) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.reservationStore.addReservation(this.title, this.flight_id);
      const n = this.users.length;
      for (let i = 0; i < n; i++){
        await this.reservationStore.addUserReservation(1, i);
      }
    },
  }
};

</script>

<style>
</style>

