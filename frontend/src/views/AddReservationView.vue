<template>
  <div v-if="reservationStore.isloading">create reservation ...</div>
  <div v-else>
    <v-form v-model="formValid" lazy-validation ref="form">
      <v-text-field
          v-model="title"
          label="Title"
      ></v-text-field>
      <v-text-field
          v-model="text"
          label="Text"
      ></v-text-field>
      <v-btn @click="addReservation()" color="primary">Create</v-btn>
    </v-form>
  </div>
</template>

<script>

import {mapStores} from "pinia/dist/pinia";
import {useReservationStore} from "../stores/ReservationStore";
import Error from "../components/Error.vue";

export default {
  name: "Create",

  components: {
    Error,
  },

  data() {
    return {
      formValid: true,
      title: '',
      text: ''
    }
  },

  computed: {
    ...mapStores(useReservationStore),
  },

  methods: {
    async addReservation(title, text) {
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.reservationStore.addReservation(this.title, this.text);

    },
  }
}

</script>

<style scoped>
</style>