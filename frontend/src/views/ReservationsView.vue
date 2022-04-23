<template>
  <h1>Reservations</h1>
  Date: <input type="date"/>
  <br><br>
  Time: <input type="time"/>
  <br><br>
  <error v-if="reservationStore.error" :text="reservationStore.error" @hide="reservationStore.clearError()"></error>
  <div v-if="reservationStore.isLoading">Loading reservations...</div>
  <div v-else-if="reservationStore.reservations.length === 0">No reservations.</div>
  <ul v-else>
    <li v-for="reservation in reservationStore.reservations">
      <router-link :to="{name: 'reservation-detail', params: {id: reservation.id}}">
        {{ reservation.title }}
        <button @click.prevent="reservationStore.delete(reservation.id)">
          {{reservationStore.isDeleting === reservation.id ? 'Deleting...' : 'Delete' }}
        </button>
      </router-link>
    </li>
  </ul>
</template>

<script>
import {useReservationStore} from "../stores/ReservationStore";
import {mapStores} from "pinia/dist/pinia";
import Error from "../components/Error.vue"

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
    this.reservationStore.loadAll()
  },

  computed: {
    ...mapStores(useReservationStore)
  },

  methods: {
  }
}
</script>

<style scoped>

</style>