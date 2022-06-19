<template>
  <error v-if="notificationStore.error" :text="notificationStore.error" @hide="notificationStore.clearError()"></error>
  <success v-if="notificationStore.success" :text="notificationStore.success" @hide="notificationStore.clearSuccess()"></success>

  <div v-if="notificationStore.isloading">Create notification ...</div>
  <div v-else>
    <v-form v-model="form" lazy-validation ref="form">
      <v-text-field
          v-model="name"
          label="Name"
          :rules="nameRules"
      ></v-text-field>
      <v-text-field
          v-model="text"
          label="Text"
          :rules="textRules"
      ></v-text-field>
      <v-select
          :items="items"
          label="Type"
          v-model="type"
          :rules="typeRules"
      ></v-select>
      <v-combobox
          v-model="usersId"
          :items="arrayUsersId()"
          label="Users"
          multiple
      ></v-combobox>
      <v-btn @click="addUserToNotification()" color="green">Create</v-btn>
    </v-form>
  </div>
</template>

<script>



import {mapStores} from "pinia/dist/pinia";
import {useNotificationStore} from "../stores/NotificationStore";
import Error from "../components/Error.vue";
import {useUserStore} from "../stores/UserStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import Success from "../components/Success.vue";

export default {
  name: "AddNotification",

  components: {
    Error, Success,
  },

  data() {
    return {
      formValid: true,
      name: '',
      text: '',
      type: '',
      items: ['success', 'info', 'warning'],
      usersId: [],
      nameRules: [
        v => !!v || 'Name is required',
      ],
      typeRules: [
        v => !!v || 'Flight is required',
      ],
      flightRules: [
        v => !!v || 'Flight is required',
      ],
    }
  },

  created() {
    this.notificationStore.loadAll();
    this.userStore.loadAll();
  },

  computed: {
    ...mapStores(useNotificationStore, useUserStore, useNotification_userStore),
  },

  methods: {

    arrayUsersId() {
      let arrayUsersId = [];
      const n = this.userStore.users.length;

      for (let i = 0; i < n; i++){
        arrayUsersId.push(this.userStore.users[i].id);
      }

      return arrayUsersId;
    },

    async addUserToNotification(name, text, type, usersId) {

      let  lastId = this.notificationStore.notifications[(this.notificationStore.notifications.length) - 1].id + 1;
      if (lastId < 1) lastId = 1;
      await this.$refs.form.validate();
      if (!this.formValid) return;
      await this.notificationStore.addNotification(this.name, this.text, this.type);
      const n = this.usersId.length;
      for (let i = 0; i < n; i++){
        await this.notification_userStore.addNotification_user(lastId, this.usersId[i]);
      }

      this.$router.push({name: 'notification'});
      this.userMenuShown = false;
    },
  }
};

</script>

<style>
</style>

