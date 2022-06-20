<template>
  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>
  <success v-if="flightStore.success" :text="flightStore.success" @hide="flightStore.clearSuccess()"></success>
  <v-alert type="warning" v-else-if="flightStore.loginMessage" class="mb-7">{{ flightStore.loginMessage }}</v-alert>
  <div v-if="flightStore.isloading">Change flight ...</div>
  <div v-else>
      <div v-if="getRole() != 'technician'">
        <v-alert type="warning">You dont have rules </v-alert>
      </div>
      <div v-else>
    <h1>Flight: {{ flight.name }}</h1>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
        v-model="flight.date"
        type="date"
        label="Date"
      ></v-text-field>
      <v-text-field
        v-model="flight.time"
        type="time"
        label="Time"
      ></v-text-field>
        <v-btn @click="changeFlight(flight.id, flight)" color="green">Change</v-btn>
    </v-form>
  </div>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useFlightStore} from "../stores/FlightStore";
import {useUserStore} from "../stores/UserStore";
import {useNotificationStore} from "../stores/NotificationStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import Error from "../components/Error.vue";
import Success from "../components/Success.vue";

export default {
  name: "FlightDetail",

  components: {
    Error, Success
  },

  data() {
    return {
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },

  created() {
    this.flightStore.loadById(this.id);
    this.notificationStore.loadAll();
    this.userStore.loadAll();
  },

  computed: {
    ...mapStores(useFlightStore, useNotificationStore, useUserStore, useNotification_userStore),

    id() {
      return parseInt(this.$route.params.id);
    },

    flight() {
      return this.flightStore.getById(this.id);
    },
  },

  methods: {

    async changeFlight(id, flight) {
      await this.$refs.form.validate();
      if (!this.formValid) return;

      await this.flightStore.changeFlight(this.id, flight);


      await this.notificationStore.addNotification("Change flight: " + flight.name,
          " date: " + flight.date + " Time: " + flight.time, "info");

      let lastIdNotification = this.notificationStore.notifications[0].id + 1;
      if(lastIdNotification < 1) lastIdNotification = 1;


      const n = this.userStore.users.length;


      for (let i = 0; i < n; i++){
        await this.notification_userStore.addNotification_user(lastIdNotification, this.userStore.users[i].id);
      }
    },

    getRole() {
      return localStorage.getItem('logedUserRole');
    },
  }
}
</script>

<style>
</style>
