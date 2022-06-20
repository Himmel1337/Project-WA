<template>
  <error v-if="flightStore.error" :text="flightStore.error" @hide="flightStore.clearError()"></error>
  <success v-if="flightStore.success" :text="flightStore.success" @hide="flightStore.clearSuccess()"></success>
  <v-alert type="warning" v-else-if="flightStore.loginMessage" class="mb-7">{{ flightStore.loginMessage }}</v-alert>

  <div v-if="flightStore.isloading">create flight ...</div>
  <div v-else>
    <div v-if="getRole() != 'technician'">
      <v-alert type="warning">You dont have rules </v-alert>
    </div>
    <div v-else>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
          v-model="name"
          label="Name"
          :rules="nameRules"
      ></v-text-field>
      <v-text-field
          v-model="capacity"
          label="Capacity"
          type="number"
          :rules="capacityRules"
      ></v-text-field>
      <v-text-field
          v-model="date"
          label="Date"
          type="date"
          :rules="dateRules"
      ></v-text-field>
      <v-text-field
          v-model="time"
          label="Time"
          type="time"
          :rules="timeRules"
      ></v-text-field>
      <v-btn @click="addFlight()" color="green">Create</v-btn>
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
  name: "AddFlight",

  components: {
    Error, Success,
  },

  data() {
    return {
      formValid: true,
      name: '',
      capacity: '',
      date: '',
      time: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      capacityRules: [
        v => !!v || 'Capacity is required',
      ],
      dateRules: [
        v => !!v || 'Date is required',
      ],
      timeRules: [
        v => !!v || 'Time is required',
      ],
    }
  },


  created() {
    this.notificationStore.loadAll();
    this.userStore.loadAll();
  },

  computed: {
    ...mapStores(useFlightStore, useNotificationStore, useUserStore, useNotification_userStore),
  },

  methods: {
    async addFlight(name, capacity, date, time) {

      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.flightStore.addFlight(this.name, this.capacity, this.date, this.time);

      await this.notificationStore.addNotification("New flight: " + this.name, " Capacity: "
          + this.capacity + " date: " + this.date + " Time: " + this.time, "success");

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

<style scoped>
</style>