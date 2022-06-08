<template>
  <error v-if="userStore.error" :text="userStore.error" @hide="userStore.clearError()"></error>
  <v-alert type="warning" v-else-if="userStore.loginMessage" class="mb-7">{{ userStore.loginMessage }}</v-alert>

  <div v-if="userStore.isLoggingIn">Logging in ...</div>
  <div v-else>
    <v-form v-model="formValid" lazy-validation ref="form">
      <v-text-field
        label="Username"
        :rules="usernameRules"
        ></v-text-field>
      <v-text-field
        label="Password"
      ></v-text-field>
      <v-btn @click="login()" color="primary">Log me in</v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "../stores/UserStore";
import Error from "../components/Error.vue";

export default {
  name: "Login",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3) || 'Username must be at least 3 characters',
      ],
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async login() {
      await this.$refs.form.validate();
      if (!this.formValid) return;

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
</style>