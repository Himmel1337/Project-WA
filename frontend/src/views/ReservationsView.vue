<template>
  <h1 class="d-flex align-center mb-4">
    Reservations
    <v-spacer/>
    <v-btn @click="addReservation()" color="primary" >+ Add</v-btn>
  </h1>

  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>
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
            <v-btn color="primary" :to="{name: 'reservation-detail', params: {id: reservation.id}}">Show</v-btn>
            <v-spacer/>
            <v-btn v-if="reservationStore.isDeleting !== reservation.id" color="grey" icon="mdi-delete" @click.prevent="reservationStore.delete(reservation.id)"></v-btn>
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
  },

  computed: {
    ...mapStores(useReservationStore)
  },

  methods: {
    addReservation() {
      this.$router.push({name: 'addReservation'});
      this.userMenuShown = false;
    },
  }
}
</script>

<style scoped>

</style>