<template>
  <h1 class="d-flex align-center mb-4">
    Manipulation Reservation
  </h1>

  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>
  <v-alert type="warning" v-else-if="reservationStore.loginMessage" class="mb-7">{{ reservationStore.loginMessage }}</v-alert>
  <v-progress-circular v-if="reservationStore.isLoading" color="primary" indeterminate size="100" width="10" class="ma-5"/>
  <div v-else-if="reservationStore.reservations.length === 0">No reservations.</div>
  <div v-else>
    <v-row>
      <v-col cols="4" v-for="reservation in reservationStore.reservations">
        <v-card>
          <router-link :to="{name: 'reservation-detail', params: {id: reservation.id}}">
            <v-img src="https://static.scientificamerican.com/sciam/assets/Image/INLINE%20IMAGE%204%20-%2048954138962_9813a1461d_o.jpg"></v-img>
          </router-link>

          <v-card-header>
            <v-card-header-text>
              <v-card-title>
                {{ reservation.name }}
              </v-card-title>
            </v-card-header-text>
          </v-card-header>

          <v-card-actions>
            <v-btn color="primary" :to="{name: 'reservation-detail', params: {id: reservation.id}}">Change</v-btn>
            <v-spacer/>
            <v-btn v-if="reservationStore.isDeleting !== reservation.id" color="grey" icon="mdi-delete"
                   @click.prevent="deleteReservation(reservation)"></v-btn>
            <v-progress-circular v-else color="red" indeterminate></v-progress-circular>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {useReservationStore} from "../stores/ReservationStore";
import {mapStores} from "pinia/dist/pinia";
import Error from "../components/Error.vue"
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore";
import {useNotificationStore} from "../stores/NotificationStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import {useReservation_userStore} from "../stores/Reservation_userStore";

export default {
  name: "Reservations",

  components: {
    Error,
  },

  data() {
    return {
    }
  },

  created() {
    this.reservationStore.loadAll();
    this.flightStore.loadAll()
    this.notificationStore.loadAll();
    this.userStore.loadAll();
    this.reservation_userStore.loadAll();
  },

  computed: {
    ...mapStores(useReservationStore, useFlightStore, useNotificationStore,
        useUserStore, useNotification_userStore, useReservation_userStore)
  },

  methods: {
    addReservation() {
      this.$router.push({name: 'addReservation'});
      this.userMenuShown = false;
    },

    async deleteReservation(reservation){

      // add new notiication
      await this.notificationStore.addNotification("Delete reservation: " + reservation.name, " Reservation was removed "
          , "warning");

      let lastIdNotification = this.notificationStore.notifications[0].id + 1;
      if(lastIdNotification < 1) lastIdNotification = 1;

      for (let i = 0; i < this.userStore.users.length; i++){
        await this.notification_userStore.addNotification_user(lastIdNotification, this.userStore.users[i].id);
      }

      // delete reservation_user
      let n = this.reservation_userStore.reservation_users.length
      for (let i = 0; i < n; i++) {
        if(reservation.id === this.reservation_userStore.reservation_users[i].reservation_id){
          this.reservation_userStore.delete(this.reservation_userStore.reservation_users[i].id);
        }
      }

      // free_places
      let i = 0;
      while (i < this.flightStore.flights.length && this.flightStore.flights[i].id
      != reservation.flight_id){
        i++;
      }
      let pomFlight = this.flightStore.flights[i];
      let users_id = [];
      for (let i = 0; i < this.reservation_userStore.reservation_users.length; i++) {
        if (this.reservation_userStore.reservation_users[i].reservation_id === reservation.id) {
          users_id.push(this.reservation_userStore.reservation_users[i]);
        }
      }
      pomFlight.free_places += users_id.length;
      this.flightStore.changeFlight(pomFlight.id, pomFlight)

      // delete reservation
      this.reservationStore.delete(reservation.id);
    },


    getRole() {
      return localStorage.getItem('logedUserRole');
    },
  }
}
</script>

<style scoped>

</style>