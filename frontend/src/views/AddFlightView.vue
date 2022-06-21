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
          :rules="rules"
      ></v-text-field>
      <v-text-field
          v-model="capacity"
          label="Capacity"
          type="number"
          :rules="rules"
      ></v-text-field>
      <v-text-field
          v-model="date"
          label="Date"
          type="date"
          :rules="rules"
      ></v-text-field>
      <v-text-field
          v-model="time"
          label="Time"
          type="time"
          :rules="rules"
      ></v-text-field>
      <v-text-field
          v-model="flight_progress"
          label="Flight progress"
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

export default {
  name: "AddFlight",

  components: {
    Error
  },

  data() {
    return {
      formValid: true,
      name: '',
      capacity: '',
      date: '',
      time: '',
      flight_progress: '',
      rules: [
        v => !!v || 'Name is required',
      ]
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
    async addFlight() {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      this.$router.push({name: 'flights'});
      this.userMenuShown = false;
      await this.flightStore.addFlight(this.name, this.capacity, this.date, this.time, this.flight_progress);

      await this.notificationStore.addNotification("New flight: " + this.name, " Capacity: "
          + this.capacity + " date: " + this.date + " Time: " + this.time + " Flight progress: "
          + this.flight_progress, "success");

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