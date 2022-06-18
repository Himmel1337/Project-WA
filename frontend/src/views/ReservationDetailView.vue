<template>
  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>

  <div v-if="reservationStore.isLoading">Loading...</div>
  <div v-else>
    <h1>reservation {{ reservation.title }}</h1>

    <p>{{ flight.title }}</p>
    <p>{{ flight.time }}</p>

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
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useReservationStore} from "../stores/ReservationStore";
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore"
import {useReservation_userStore} from "../stores/reservation_userStore";
import Error from "../components/Error.vue"

export default {
  name: "ReservationDetail",

  components: {
    Error,
  },

  data() {
    return {
    }
  },

  created() {
    this.reservationStore.loadById(this.id);
    this.flightStore.loadAll();
    this.userStore.loadAll();
    this.reservation_userStore.loadAll();
  },

  computed: {
    ...mapStores(useReservationStore, useFlightStore, useUserStore, useReservation_userStore),

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

    users_username(){
      let reservation_id = parseInt(this.$route.params.id);
      let users_id = [];
      let n = this.reservation_userStore.reservation_users.length
      for (let i = 0; i < n; i++){
        if(this.reservation_userStore.reservation_users[i].reservation_id === reservation_id){
          users_id.push(this.reservation_userStore.reservation_users[i]);
        }
      }

      let users_username = [];

      for(let i = 0; i < n; i++){
        if(users_id[i].user_id === this.userStore.users[i].id){
          users_username.push(this.userStore.users[i]);
        }
      }
      return users_username;
    }
  }
}
</script>

<style>
</style>
