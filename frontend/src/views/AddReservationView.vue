<template>
  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>
  <success v-if="reservationStore.success" :text="reservationStore.success" @hide="reservationStore.clearSuccess()"></success>
  <v-alert type="warning" v-else-if="reservationStore.loginMessage" class="mb-7">{{ reservationStore.loginMessage }}</v-alert>

  <div v-if="reservationStore.isloading">Create reservation ...</div>
  <div v-else>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
          v-model="name"
          label="Name"
          :rules="nameRules"
      ></v-text-field>
      <v-select
          :items="arrayFlightsId()"
          label="Flight"
          v-model="flight_id"
          :rules="flightRules"
      ></v-select>
      <v-combobox
          v-model="usersId"
          :items="arrayUsersId()"
          label="Users"
          multiple
      ></v-combobox>
      <v-btn @click="addUserToReservation()" color="green">Create</v-btn>
    </v-form>
  </div>
</template>

<script>



import {mapStores} from "pinia/dist/pinia";
import {useReservationStore} from "../stores/ReservationStore";
import Error from "../components/Error.vue";
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore";
import {useReservation_userStore} from "../stores/Reservation_userStore";
import {useNotificationStore} from "../stores/NotificationStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import Success from "../components/Success.vue";

export default {
  name: "AddReservation",

  components: {
    Error, Success,
  },

  data() {
    return {
      formValid: true,
      name: '',
      flight_id: '',
      usersId: [],
      nameRules: [
        v => !!v || 'Name is required',
      ],
      flightRules: [
        v => !!v || 'Flight is required',
      ],
    }
  },

  created() {
    this.reservationStore.loadAll();
    this.flightStore.loadAll();
    this.userStore.loadAll();
    this.notificationStore.loadAll();
  },

  computed: {
    ...mapStores(useReservationStore, useReservation_userStore,
        useFlightStore, useNotificationStore, useUserStore, useNotification_userStore),
  },

  methods: {

    arrayFlightsId() {
      let arrayFlightId = [];
      const n = this.flightStore.flights.length;
      for (let i = 0; i < n; i++){
        arrayFlightId.push(this.flightStore.flights[i].id);
      }
      return arrayFlightId;
    },

    arrayUsersId() {
      let arrayUsersId = [];
      const n = this.userStore.users.length;

      for (let i = 0; i < n; i++){
        arrayUsersId.push(this.userStore.users[i].id);
      }

      return arrayUsersId;
    },

    async addUserToReservation(name, flight_id, usersId) {

      let lastId = this.reservationStore.reservations[(this.reservationStore.reservations.length) - 1].id + 1;
      if (lastId < 1) lastId = 1;
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.reservationStore.addReservation(this.name, this.flight_id);
      const n = this.usersId.length;
      for (let i = 0; i < n; i++){
        await this.reservation_userStore.addReservation_user(lastId, this.usersId[i]);
      }


      await this.notificationStore.addNotification("New reservation: " + this.name,
          " You were adding up to the reservation ", "success");

      let lastIdNotification = this.notificationStore.notifications[0].id + 1;
      if(lastIdNotification < 1) lastIdNotification = 1;


      for (let i = 0; i < n; i++){
        await this.notification_userStore.addNotification_user(lastIdNotification, this.usersId[i]);
      }
    },
  }
};

</script>

<style>
</style>

