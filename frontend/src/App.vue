<template>
  <v-app>
    <v-app-bar color="red">
      <v-app-bar-title>
        <v-icon class="mx-2">mdi-rocket-launch</v-icon>
        Reservation Management
      </v-app-bar-title>

      <v-btn :to="{name: 'home'}">Homepage</v-btn>

      <v-btn :to="{name: 'reservations'}">Reservations</v-btn>
      <v-btn :to="{name: 'flights'}">Flights</v-btn>
      <v-btn :to="{name: 'notification'}">Notification</v-btn>

      <v-menu anchor="bottom end" v-model="userMenuShown">
        <template v-slot:activator="{ props }">
          <v-btn
              icon="mdi-account-circle"
              v-bind="props"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item v-if="!userStore.isAuthenticated" @click="login()">
            <v-list-item-title>Log in</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!userStore.isAuthenticated" @click="register()">
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userStore.isAuthenticated">
            <v-list-item-title class="pr-1"><i> {{ userStore.user.username }}</i></v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userStore.isAuthenticated" @click="logout()">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>
import {useUserStore} from "./stores/UserStore";
import {mapStores} from "pinia/dist/pinia";

export default {
  name: "App",

  data() {
    return {
      userMenuShown: false,
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    login() {
      this.$router.push({name: 'login'});
      this.userMenuShown = false;
    },
    register() {
      this.$router.push({name: 'register'});
      this.userMenuShown = false;
    },
    logout() {
      this.userStore.logout();
      this.$router.push({name: 'home'});
      this.userMenuShown = false;
    }
  }
}
</script>

<style scoped>
nav {
  margin-bottom: 1em;
}
</style>