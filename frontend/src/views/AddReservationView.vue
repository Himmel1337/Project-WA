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
          v-model="flight"
          :items="flightStore.flights"
          @input="selectFlightId($event)"
          label="Flight"
          persistent-hint
          return-object
          single-line
      ></v-select>
      <v-combobox
          v-model="users"
          :items="userStore.users"
          item-text="username"
          label="Users"
          multiple
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
import {useUserStore} from "../stores/UserStore";

export default {
  name: "AddReservation",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      flight: {id: 0, title: 'Mars', text: 'Mars', time: '21-12-2055 23:00'},
      selectFlightId: '',
      flights: [{}],
      users: [{id: 1, username: 'dd', role: 'ss'}],
    };
  },

  created() {
    this.flightStore.loadAll()
    this.userStore.loadAll();
  },

  computed: {
    ...mapStores(useReservationStore, useFlightStore, useUserStore),
  },

  methods: {

    selectFlightId (e) {
      this.selectFlightId = e.id;
    },

    async addReservation(title, flight, users) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.reservationStore.addReservation(this.title, this.flight);
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

