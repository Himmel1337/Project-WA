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
      ></v-text-field>
<!--      <v-select-->
<!--          v-model="role"-->
<!--          :items="items"-->
<!--          item-text="Role"-->
<!--          label="Role"-->
<!--          persistent-hint-->
<!--          return-object-->
<!--          single-line-->
<!--      ></v-select>-->
      <v-btn @click="addUser()" color="primary">Registration</v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "../stores/UserStore";
import Error from "../components/Error.vue";

export default {
  name: "Register",

  components: {
    Error,
  },

  data() {
    return {
      username: '',
      password: '',
      role: '',
      formValid: true,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3) || 'Username must be at least 3 characters',
      ],
      items: [
          'client', 'secretary', 'technician'
      ]
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async addUser(username, password, role) {
      if (this.role === ''){
        this.role = 'client';
      }
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.userStore.addUser(this.username, this.password, this.role);

    },
  }
}
</script>

<style scoped>
</style>