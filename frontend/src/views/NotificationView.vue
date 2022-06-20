<template>
  <h1 class="d-flex align-center mb-4">
    Notification
    <v-spacer/>
    <v-btn @click="addNotification()" color="red" >+ Add</v-btn>
  </h1>

  <error v-if="notificationStore.error" :text="notificationStore.error" @hide="notificationStore.clearError()"></error>
  <v-progress-circular v-if="notificationStore.isLoading" color="primary" indeterminate size="100" width="10" class="ma-5"/>
  <div v-else-if="notificationStore.notifications.length === 0">No notifications.</div>
  <div v-else>

      <v-alert v-for="notification in notifications()" :type="notification.type" class="mb-5">
        <v-card>
          <v-card-header>
            <v-card-header-text>
              <v-card-title>
                {{ notification.name }}: {{ notification.text }}
              </v-card-title>
            </v-card-header-text>
          </v-card-header>


<!--          <v-card-actions>-->
<!--            <v-btn color="primary" :to="{name: 'notification-detail', params: {id: notification.id}}">Change</v-btn>-->
<!--            <v-spacer/>-->
<!--            <v-btn v-if="notificationStore.isDeleting !== notification.id"-->
<!--                   color="grey" icon="mdi-delete" @click.prevent="notificationStore.delete(notification.id)"></v-btn>-->
<!--            <v-progress-circular v-else color="red" indeterminate></v-progress-circular>-->
<!--          </v-card-actions>-->
        </v-card>
      </v-alert>
  </div>
</template>

<script>
import {useNotificationStore} from "../stores/NotificationStore";
import {useUserStore} from "../stores/UserStore";
import {useNotification_userStore} from "../stores/Notification_userStore";
import {mapStores} from "pinia/dist/pinia";
import Error from "../components/Error.vue"

export default {
  name: "Notifications",

  components: {
    Error,
  },

  data() {
    return {
    }
  },

  created() {
    this.notificationStore.loadAll()
    this.userStore.loadAll();
    this.notification_userStore.loadAll();
  },

  computed: {
    ...mapStores(useNotificationStore, useUserStore, useNotification_userStore)
  },

  methods: {

    notifications(){

      let i = 0;
      while (i < this.userStore.users.length && this.userStore.users[i].username
          != localStorage.getItem('username')){
        i++;
      }

      let user_id = this.userStore.users[i].id;

      let notifications = [];
      let j = 0;
      let n = this.notification_userStore.notification_users.length
      for (let i = 0; i < n; i++){
        if (this.notification_userStore.notification_users[i].user_id === user_id){
          while (this.notificationStore.notifications[j].id !=
          this.notification_userStore.notification_users[i].notification_id &&
              this.notificationStore.notifications.length > j
              ){
            j++;
          }
          notifications.push(this.notificationStore.notifications[j]);
          j = 0;
        }

      }

      return notifications;
    },

    addNotification() {
      this.$router.push({name: 'addNotification'});
      this.userMenuShown = false;
    },
  }
}
</script>

<style scoped>

</style>