<template>
  <error v-if="userStore.error" :text="userStore.error" @hide="userStore.clearError()"></error>
  <success v-if="userStore.success" :text="userStore.success" @hide="userStore.clearSuccess()"></success>

  <div v-if="userStore.isLoggingIn">Register in ...</div>

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
          :rules="passwordRules"
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
      <v-btn @click="addUser()" color="green">Registration</v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "../stores/UserStore";
import Error from "../components/Error.vue";
import Success from "../components/Success.vue";

export default {
  name: "Register",

  components: {
    Error, Success
  },

  data() {
    return {
      show1: false,
      show2: true,
      username: '',
      password: '',
      role: '',
      formValid: true,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3) || 'Username must be at least 3 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 3) || 'Password must be at least 3 characters',
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
      this.$router.push({name: 'login'});
      this.userMenuShown = false;
      await this.userStore.addUser(this.username, this.password, this.role);


    },
  }
}
</script>

<style scoped>
</style>