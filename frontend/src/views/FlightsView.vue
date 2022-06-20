<template>
  <h1 class="d-flex align-center mb-4">
    Flights
    <v-spacer/>
    <div v-if="getRole() === 'technician'">
      <v-btn @click="addFlight()" color="red" >+ Add</v-btn>
    </div>
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
                {{ flight.name }}
              </v-card-title>
            </v-card-header-text>
          </v-card-header>

          <v-card-text>
            Date:  {{ flight.date.length > 30 ? flight.date.substr(0, 30) + '...' : flight.date }}
          </v-card-text>

          <v-card-text>
            Time:  {{ flight.time.length > 30 ? flight.time.substr(0, 30) + '...' : flight.time }}
          </v-card-text>

          <v-card-text>
            Capacity: {{ flight.capacity }}, Free Places: {{ flight.free_places }}
          </v-card-text>


          <div v-if="getRole() === 'technician'">
            <v-card-actions>
              <v-btn color="primary" :to="{name: 'flight-detail', params: {id: flight.id}}">Change</v-btn>
              <v-spacer/>
              <v-btn v-if="flightStore.isDeleting !== flight.id" color="grey" icon="mdi-delete"
                     @click="deleteFlight(flight.id, flight.name)"></v-btn>
              <v-progress-circular v-else color="red" indeterminate></v-progress-circular>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore";
import {useNotificationStore} from "../stores/NotificationStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import {useReservationStore} from "../stores/ReservationStore";
import Error from "../components/Error.vue";
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
    this.notificationStore.loadAll();
    this.userStore.loadAll();
    this.reservationStore.loadAll();
  },
  computed: {
    ...mapStores(useFlightStore, useNotificationStore, useUserStore, useNotification_userStore, useReservationStore)
  },
  methods: {
    addFlight() {
      this.$router.push({name: 'addFlight'});
      this.userMenuShown = false;
    },
    getRole() {
      return localStorage.getItem('logedUserRole');
    },
    async deleteFlight(id, name){
      await this.notificationStore.addNotification("Delete flight: " + name, " Flight was removed "
          , "warning");
      let lastIdNotification = this.notificationStore.notifications[0].id + 1;
      if(lastIdNotification < 1) lastIdNotification = 1;
      const n = this.userStore.users.length;
      for (let i = 0; i < n; i++){
        await this.notification_userStore.addNotification_user(lastIdNotification, this.userStore.users[i].id);
      }
      this.flightStore.delete(id);
    }
  }
}
</script>

<style scoped>
</style>