<template>
  <h1 class="d-flex align-center mb-4">
    Reservations
    <v-spacer/>
    <div v-if="getRole() === 'client'">
    <v-btn @click="addReservation()" color="red" >+ Add</v-btn>
    </div>
    <div v-if="getRole() === 'secretary'">
    <v-btn @click="manipulationReservation()" color="red" > Manipulation Reservation </v-btn>
    </div>
  </h1>

  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>
  <v-alert type="warning" v-else-if="reservationStore.loginMessage" class="mb-7">{{ reservationStore.loginMessage }}</v-alert>
  <v-progress-circular v-if="reservationStore.isLoading" color="primary" indeterminate size="100" width="10" class="ma-5"/>
  <div v-else-if="reservationStore.reservations.length === 0">No reservations.</div>
  <div v-else>
    <div v-if="getRole() === 'technician'">
      <v-alert type="warning">You dont have rules </v-alert>
    </div>
    <div v-else>
    <v-row>
      <v-col cols="4" v-for="reservation in reservations()">
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
                   @click.prevent="deleteReservation(reservation.id, reservation.name)"></v-btn>
            <v-progress-circular v-else color="red" indeterminate></v-progress-circular>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  </div>
</template>

<script>
import {useReservationStore} from "../stores/ReservationStore";
import {useReservation_userStore} from "../stores/Reservation_userStore";
import {mapStores} from "pinia/dist/pinia";
import Error from "../components/Error.vue"
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore";
import {useNotificationStore} from "../stores/NotificationStore";
import {useNotification_userStore} from "../stores/Notification_userStore";

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

    reservations(){


      const user_id = localStorage.getItem('logedUserId')

      let reservations = [];
      let j = 0;
      let n = this.reservation_userStore.reservation_users.length
      for (let i = 0; i < n; i++){
        if (this.reservation_userStore.reservation_users[i].user_id == user_id){
          while (this.reservationStore.reservations[j].id !=
              this.reservation_userStore.reservation_users[i].reservation_id &&
              this.reservationStore.reservations.length > j
              ){
            j++;
          }

          reservations.push(this.reservationStore.reservations[j]);
          j = 0;
        }
      }

      return reservations;
    },


    addReservation() {
      this.$router.push({name: 'addReservation'});
      this.userMenuShown = false;
    },

    manipulationReservation() {
      this.$router.push({name: 'manipulationReservation'});
      this.userMenuShown = false;
    },

    async deleteReservation(id, name){

      await this.notificationStore.addNotification("Delete reservation: " + name, " Flight was removed "
          , "warning");

      let lastIdNotification = this.notificationStore.notifications[0].id + 1;
      if(lastIdNotification < 1) lastIdNotification = 1;

      const n = this.userStore.users.length;
      for (let i = 0; i < n; i++){
        await this.notification_userStore.addNotification_user(lastIdNotification, this.userStore.users[i].id);
      }

      this.reservationStore.delete(id);
    },

    getRole() {
      return localStorage.getItem('logedUserRole');
    },
  }
}
</script>

<style scoped>

</style>