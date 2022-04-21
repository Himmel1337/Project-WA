<template>
  <h1>Reservations</h1>
  Date: <input type="date"/>
  <br><br>
  Time: <input type="time"/>
  <br><br>
  <div class="error" v-if="error">
    {{ error }}
    <button @click="error = null">Hide</button>
  </div>
  <div v-if="isLoading">Loading reservations...</div>
  <ul v-else>
    <li v-for="reservation in reservations">
      <router-link :to="{name: 'reservation-detail', params: {id: reservation.id}}">
        {{ reservation.title }}
        <button @click.prevent="deleteReservation(reservation.id)">
          {{isDeleting === reservation.id ? 'Deleting...' : 'Delete' }}
        </button>
      </router-link>
    </li>
  </ul>
</template>

<script>
import config from "../config";
import axios from "axios";

export default {
  name: "Reservations",

  data() {
    return {
      reservations: [],
      isLoading: true,
      isDeleting: null,
      error: null,
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.isLoading = true;

      try {
        const response = await axios.get(config.backendUrl + '/reservations');
        this.reservations = response.data;
        this.error = null;
      } catch {
        this.error = 'Cannot download reservations!';
      }

      this.isLoading = false;
    },

    async createReservation() {
      await axios.post(config.backendUrl + '/reservations', data);
    },

    async deleteReservation(id) {
      this.isDeleting = id;

      try {
        // delete on server
        await axios.delete(`${config.backendUrl}/reservations/${id}`);
        // delete locally
        const index = this.reservations.findIndex(a => a.id === id);
        this.reservations.splice(index, 1);

        this.error = null;
      } catch {
        this.error = 'Cannot delete reservation!';
      }

      this.isDeleting = false;
    }
  }
}
</script>

<style>
.error {
  background: red;
  color: white;
  padding: 2em;
}
</style>