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
      <v-alert v-for="notification in notificationStore.notifications" :type="notification.type" class="mb-5">
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
  },

  computed: {
    ...mapStores(useNotificationStore)
  },

  methods: {
    addNotification() {
      this.$router.push({name: 'addNotification'});
      this.userMenuShown = false;
    },
  }
}
</script>

<style scoped>

</style>