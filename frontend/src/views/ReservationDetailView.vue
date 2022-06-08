<template>
  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>

  <div v-if="reservationStore.isLoading">Loading...</div>
  <div v-else>
    <h1>Reservation {{ reservation.title }}</h1>
    <p>{{ reservation.text }}</p>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useReservationStore} from "../stores/ReservationStore";
import Error from "../components/Error.vue"

export default {
  name: "ReservationDetail",

  components: {
    Error,
  },

  created() {
    this.reservationStore.loadById(this.id);
  },

  computed: {
    ...mapStores(useReservationStore),

    id() {
      return parseInt(this.$route.params.id);
    },

    reservation() {
      return this.reservationStore.getById(this.id);
    }
  }
}
</script>

<style>
</style>
