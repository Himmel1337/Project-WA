<template>
  <div v-if="userStore.loginMessage" class="message">{{ userStore.loginMessage }}</div>

  <div v-if="userStore.isLoggingIn">Logging in ...</div>
  <div v-else>
    <button @click="login()">Log me in</button>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "../stores/UserStore";

export default {
  name: "Login",

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async login() {
      await this.userStore.login('xpisarov', 'heslo')
      if (!this.userStore.error) {
        this.$router.push(this.userStore.afterLoginRoute ?? {name: 'reservations'})
        this.userStore.setAfterLoginRoute(null)
      }
    },
  }
}
</script>

<style scoped>
.message {
  padding: 1.5em;
  margin: 2em 0;
  color: darkred;
  border: 1px solid darkred;
}
</style>