import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";

export const useNotification_userStore = defineStore('notification_user', {
    state: () => ({
        notification_users: [],
        isLoading: true,
        isAdding: true,
        isDeleting: false,
        isArcive: false,
        error: null,
    }),

    getters: {
        getById: state => id => state.notification_users.find(a => a.id === id),
    },

    actions: {
        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/notification_user');
                this.notification_users = response.data;
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download notification_users!';
            }
        },

        async loadById(id) {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/notification_user/' + id);
                this.addOrUpdateInStore(id, response.data);
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download notification_users!';
            }
        },


        async addNotification_user(notification_id, user_id) {
            try {
                this.isLoading = true;
                const archive = 0;
                const data = {archive, notification_id, user_id};
                await axios.post(config.backendUrl + '/notification_user', data);
                this.notification_users.push(notification_user);
                this.error = null;
                this.isLoading = false;
            } catch {
                this.error = 'Cannot add User to Reservation';
            }
        },

        async archive(id){
            try {
                this.isArcive = id;

                const notifacation_user = {archive: 1, notification_id: null, user_id: null}
                await axios.put(`${config.backendUrl}/notification_user/${id}`, notifacation_user);

                this.error = null;
                this.isArcive = false;

            } catch {
                this.success = null;
                this.error = 'Cannot archive notification!';
            }
        },

        async delete(id) {
            try {
                this.isDeleting = id;

                await axios.delete(`${config.backendUrl}/notification_user/${id}`);

                const index = this.notification_users.findIndex(a => a.id === id);
                this.notification_users.splice(index, 1);

                this.error = null;
                this.isDeleting = false;

            } catch {
                this.error = 'Cannot delete notification_user!';
            }
        },

        addOrUpdateInStore(id, notification_user) {
            const index = this.notification_users.findIndex(a => a.id === id);
            if (index !== -1) {
                this.notification_users[index] = notification_user;
            } else {
                this.notification_users.push(notification_user);
            }
        },

        clearError() {
            this.error = null;
        }
    },
})
