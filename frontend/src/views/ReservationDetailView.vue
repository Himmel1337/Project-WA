<template>
  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>

  <div v-if="reservationStore.isLoading">Loading...</div>
  <div v-else>
    <h1>Reservation: {{ reservation.name }}</h1>



          <h2>Flight: {{ flight.name }}</h2>
          <h3>Date: {{ flight.date }} Time: {{ flight.time }}</h3>
          <h3>Free Places: {{ flight.capacity }}/{{ flight.free_places }}</h3><br>

    <v-row>
      <v-col cols="4" v-for="user in users_username">
        <v-card>

          <v-card-header>
            <v-card-header-text>
              <v-card-title>
                {{ user.username }}
              </v-card-title>
            </v-card-header-text>
          </v-card-header>


          <v-card-actions>
            <v-spacer/>
            <v-btn v-if="reservationStore.isDeleting !== user.id" color="grey" icon="mdi-delete"
                   @click="deleteFromUserId(reservation.id, user.id, reservation.name, flight.id)"></v-btn>
            <v-progress-circular v-else color="red" indeterminate></v-progress-circular>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
    <br>

    <v-form v-model="form" lazy-validation ref="form">
      <v-combobox
          v-model="usersId"
          :items="arrayUsersId()"
          label="Users"
          multiple
      ></v-combobox>
      <v-btn @click="addUserToReservation(reservation.name, reservation.id, flight.id)" color="green">Add users</v-btn>
    </v-form>
  </div>
  <p>Users: </p>
  <p v-for="user in arrayUsers()">
    {{ user.id }} :
    {{ user.username }}
  </p>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useReservationStore} from "../stores/ReservationStore";
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore"
import {useReservation_userStore} from "../stores/Reservation_userStore";
import {useNotificationStore} from "../stores/NotificationStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import Error from "../components/Error.vue"

export default {
  name: "ReservationDetail",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      flight: {},
      usersId: [],
    }
  },

  created() {
    this.reservationStore.loadById(this.id);
    this.flightStore.loadAll();
    this.userStore.loadAll();
    this.reservation_userStore.loadAll();
    this.notificationStore.loadAll();
  },

  computed: {
    ...mapStores(useReservationStore, useFlightStore, useUserStore, useReservation_userStore, useNotificationStore, useNotification_userStore),

    id() {
      return parseInt(this.$route.params.id);
    },

    reservation() {
      return this.reservationStore.getById(this.id);
    },

    flight() {
      let reservation_id = parseInt(this.$route.params.id);
      let reservation = this.reservationStore.getById(reservation_id)
      return this.flightStore.getById(reservation.flight_id);
    },

    users_username() {
      let reservation_id = parseInt(this.$route.params.id);
      let users_id = [];
      let n = this.reservation_userStore.reservation_users.length

      for (let i = 0; i < n; i++) {
        if (this.reservation_userStore.reservation_users[i].reservation_id === reservation_id) {
          users_id.push(this.reservation_userStore.reservation_users[i]);
        }
      }

      n = users_id.length;
      let users_username = [];

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < this.userStore.users.length; j++) {
          if (users_id[i].user_id === this.userStore.users[j].id) {
            users_username.push(this.userStore.users[j]);
          }
        }
      }

      return users_username;
    },
  },

  methods: {


    async addUserToReservation(reservation_name, reservation_id, flight_id) {

      await this.$refs.form.validate();
      if (!this.formValid) return;

      let i = 0;
      while (i <  this.flightStore.flights.length && this.flightStore.flights[i].id
      != flight_id){
        i++;
      }

      let pomFlight = this.flightStore.flights[i];
      pomFlight.free_places -= this.usersId.length;

      if(pomFlight.free_places < 0){
        this.$router.push({name: 'reservations'});
        this.userMenuShown = false;
        return;
      } else {
        this.flightStore.changeFlight(pomFlight.id, pomFlight)
        const n = this.usersId.length;
        for (let i = 0; i < n; i++){
          await this.reservation_userStore.addReservation_user(reservation_id, this.usersId[i]);
        }

        this.$router.push({name: 'reservations'});
        this.userMenuShown = false;

        await this.notificationStore.addNotification("Change reservation: " + reservation_name,
            " You were adding up to the reservation ", "info");

        let lastIdNotification = this.notificationStore.notifications[0].id + 1;
        if(lastIdNotification < 1) lastIdNotification = 1;




        for (let i = 0; i < n; i++){
          await this.notification_userStore.addNotification_user(lastIdNotification, this.usersId[i]);
        }
      }
    },

    async deleteFromUserId (reservationId, userId, name, flight_id){
      let i = 0;

      while (this.reservation_userStore.reservation_users[i].reservation_id != reservationId &&
          this.reservation_userStore.reservation_users[i].user_id != userId &&
          i < this.reservation_userStore.reservation_users.length
          ) {
        i++
      }

      let user_reservationId = this.reservation_userStore.reservation_users[i].id;

      await this.notificationStore.addNotification("Change Reservation: " + name,
          " You were removed from the reservation ", "warning");

      let lastIdNotification = this.notificationStore.notifications[0].id + 1;
      if(lastIdNotification < 1) lastIdNotification = 1;

      i = 0;
      while (i <  this.flightStore.flights.length && this.flightStore.flights[i].id
      != flight_id){
        i++;
      }

      let pomFlight = this.flightStore.flights[i];
      pomFlight.free_places += 1;
      this.flightStore.changeFlight(pomFlight.id, pomFlight)

      this.reservation_userStore.delete(user_reservationId);

      await this.notification_userStore.addNotification_user(lastIdNotification, userId);
    },

    arrayUsersId() {
      let arrayUsersId = [];
      const n = this.userStore.users.length;

      for (let i = 2; i < n; i++){
        arrayUsersId.push(this.userStore.users[i].id);
      }

      return arrayUsersId;
    },

    arrayUsers() {
      let arrayUsers = [];
      const n = this.userStore.users.length;

      for (let i = 2; i < n; i++){
        arrayUsers.push(this.userStore.users[i]);
      }

      return arrayUsers;
    },

    getRole() {
      return localStorage.getItem('logedUserRole');
    },
  }
}
</script>

<style>
</style>
