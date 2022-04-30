<template>
  <nav>
    <router-link :to="{name: 'home'}">Homepage</router-link> |
    <router-link :to="{name: 'reservations'}">Reservations</router-link> |
    <router-link :to="{name: 'about'}">About</router-link> ||

    <router-link v-if="!userStore.isAuthenticated" :to="{name: 'login'}">Log in</router-link>
    <button v-else @click="logout()">Log out</button>
  </nav>

  <main>
    <router-view/>
  </main>

</template>

<script>
import {useUserStore} from "./stores/UserStore";
import {mapStores} from "pinia/dist/pinia";

export default {
  name: "App",

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push({name: 'home'});
    }
  }
}
</script>

<style scoped>
nav {
  margin-bottom: 1em;
}
</style>