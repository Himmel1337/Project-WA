<template>
  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>

  <div v-if="flightStore.isLoading">Loading...</div>
  <div v-else>
    <h1>Flight {{ flight.title }}</h1>
    <p>{{ flight.text }}</p>
    <p>{{ flight.time }}</p>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useFlightStore} from "../stores/FlightStore";
import Error from "../components/Error.vue"

export default {
  name: "FlightDetail",

  components: {
    Error,
  },

  created() {
    this.flightStore.loadById(this.id);
  },

  computed: {
    ...mapStores(useFlightStore),

    id() {
      return parseInt(this.$route.params.id);
    },

    flight() {
      return this.flightStore.getById(this.id);
    }
  }
}
</script>

<style>
</style>
