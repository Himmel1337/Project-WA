<template>
  <h1 class="d-flex align-center mb-4">
    Flights
    <v-spacer/>
    <v-btn @click="addFlight()" color="primary" >+ Add</v-btn>
  </h1>

  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>
  <v-progress-circular v-if="flightStore.isLoading" color="primary" indeterminate size="100" width="10" class="ma-5"/>
  <div v-else-if="flightStore.flights.length === 0">No flights.</div>
  <div v-else>
    <v-row>
      <v-col cols="4" v-for="flight in flightStore.flights">
        <v-card>
          <router-link :to="{name: 'flight-detail', params: {id: flight.id}}">
            <v-img src="https://static.scientificamerican.com/sciam/assets/Image/INLINE%20IMAGE%204%20-%2048954138962_9813a1461d_o.jpg"></v-img>
          </router-link>

          <v-card-header>
            <v-card-header-text>
              <v-card-title>
                {{ flight.title }}
              </v-card-title>
            </v-card-header-text>
          </v-card-header>

          <v-card-text>
            {{ flight.text.length > 30 ? flight.text.substr(0, 30) + '...' : flight.text }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" :to="{name: 'flight-detail', params: {id: flight.id}}">Show</v-btn>
            <v-spacer/>
            <v-btn v-if="flightStore.isDeleting !== flight.id" color="grey" icon="mdi-delete" @click.prevent="flightStore.delete(flight.id)"></v-btn>
            <v-progress-circular v-else color="red" indeterminate></v-progress-circular>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {useFlightStore} from "../stores/FlightStore";
import {mapStores} from "pinia/dist/pinia";
import Error from "../components/Error.vue"
import {useUserStore} from "../stores/UserStore";

export default {
  name: "Flights",

  components: {
    Error,
  },

  data() {
    return {
    }
  },

  created() {
    this.flightStore.loadAll()
  },

  computed: {
    ...mapStores(useFlightStore, useUserStore)
  },

  methods: {
    addFlight() {
      this.$router.push({name: 'addFlight'});
      this.userMenuShown = false;
    },
  }
}
</script>

<style scoped>

</style>