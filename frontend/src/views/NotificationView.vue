<template>
  <error v-if="userStore.error" :text="userStore.error" @hide="userStore.clearError()"></error>
  <success v-if="userStore.success" :text="userStore.success" @hide="userStore.clearSuccess()"></success>
  <v-alert type="warning" v-else-if="userStore.loginMessage" class="mb-7">{{ userStore.loginMessage }}</v-alert>

  <div v-if="userStore.isloading">Load user ...</div>
  <div v-else>
    <h1>User</h1>
<!--    <v-form v-model="form" lazy-validation ref="form">-->
<!--      <v-text-field-->
<!--          v-model="flight.name"-->
<!--          label="Name"-->
<!--      ></v-text-field>-->
<!--      <v-text-field-->
<!--          v-model="flight.capacity"-->
<!--          type="number"-->
<!--          label="Date"-->
<!--      ></v-text-field>-->
<!--      <v-text-field-->
<!--          v-model="flight.date"-->
<!--          type="date"-->
<!--          label="Date"-->
<!--      ></v-text-field>-->
<!--      <v-text-field-->
<!--          v-model="flight.time"-->
<!--          type="time"-->
<!--          label="Time"-->
<!--      ></v-text-field>-->
<!--      <v-btn @click="changeFlight(flight.id, flight)" color="green">Change</v-btn>-->
<!--    </v-form>-->
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "../stores/UserStore";
import Error from "../components/Error.vue"
import Success from "../components/Success.vue";

export default {
  name: "UserDetail",

  components: {
    Error, Success
  },

  data() {
    return {
      formValid: true,
    };
  },

  created() {
    this.userStore.loadById(this.id);
  },

  computed: {
    ...mapStores(useUserStore),

    id() {
      return parseInt(this.$route.params.id);
    },

  },

  methods: {

  }
}
</script>

<style>
</style>
