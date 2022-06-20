<template>
  <h1 class="d-flex align-center mb-4">
    Notification
    <v-spacer/>
    <div v-if="getRole() === 'secretary' || getRole() === 'technician'">
      <v-btn @click="addNotification()" color="red" >+ Add</v-btn>
    </div>
    <div>
      <v-btn @click="archiveNotification()" color="red" > Archive </v-btn>
    </div>
  </h1>

  <error v-if="notificationStore.error" :text="notificationStore.error" @hide="notificationStore.clearError()"></error>
  <v-progress-circular v-if="notificationStore.isLoading" color="primary" indeterminate size="100" width="10" class="ma-5"/>
  <div v-else-if="notificationStore.notifications.length === 0">No notifications.</div>
  <div v-else>
    <div v-for="notification in notifications()">
    <v-alert v-if="notification.archive === 0" :type="notification.type"
              class="mb-5" closable>

        <v-card>
          <v-card-header>
            <v-card-header-text>
              <v-card-title>
                {{ notification.name }}: {{ notification.text }}

              </v-card-title>
            </v-card-header-text>
          </v-card-header>


          <v-card-actions>
            <v-spacer/>
            <v-btn v-if="notification_userStore.isArchive !== notification.notification_userId"
                   color="grey" icon="mdi-archive-arrow-up"
                   @click.prevent="archive(notification.notification_userId)">
            </v-btn>
            <v-progress-circular v-else color="red" indeterminate></v-progress-circular>
          </v-card-actions>
        </v-card>

      </v-alert>
    </div>
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
          != localStorage.getItem('logedUsername')){
        i++;
      }

      localStorage.setItem('logedUserId', this.userStore.users[i].id);
      localStorage.setItem('logedUserRole', this.userStore.users[i].role);

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
          let pom = this.notificationStore.notifications[j];
          let pom2 = this.notification_userStore.notification_users[i];
          let notification = {id: pom.id, name: pom.name, text: pom.text, type: pom.type,
            notification_userId: pom2.id, archive: pom2.archive};
          notifications.push(notification);
          j = 0;
        }
      }

      return notifications;
    },

    getRole() {
      return localStorage.getItem('logedUserRole');
    },

    addNotification() {
      this.$router.push({name: 'addNotification'});
      this.userMenuShown = false;
    },

    archive(id){
      this.notification_userStore.archive(id);
      this.$router.push({name: 'archiveNotification'});
      this.userMenuShown = false;
    },

    archiveNotification() {
      this.$router.push({name: 'archiveNotification'});
      this.userMenuShown = false;
    },
  }
}
</script>

<style scoped>

</style>