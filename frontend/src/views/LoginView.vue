<template>
  <error v-if="userStore.error" :text="userStore.error" @hide="userStore.clearError()"></error>
  <v-alert type="warning" v-else-if="userStore.loginMessage" class="mb-7">{{ userStore.loginMessage }}</v-alert>

  <div v-if="userStore.isLoggingIn">Logging in ...</div>
  <div v-else>
    <v-form v-model="formValid" lazy-validation ref="form">
      <v-text-field
          v-model="username"
        label="Username"
        :rules="usernameRules"
        ></v-text-field>
      <v-text-field
          v-model="password"
          label="Password"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn @click="login()" color="primary">Log me in</v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "../stores/UserStore";
import Error from "../components/Error.vue";
import Success from "../components/Success.vue";

export default {
  name: "Login",

  components: {
    Error, Success
  },

  data() {
    return {
      show1: false,
      show2: true,
      username: '',
      password: '',
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

      await this.userStore.login(this.username, this.password)

      if (!this.userStore.error) {
        this.$router.push(this.userStore.afterLoginRoute ?? {name: 'notification'})
        this.userStore.setAfterLoginRoute(null)
      }
    },
  }
}
</script>

<style scoped>
</style>