import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [],
        isLoading: true,
        isAdding: true,
        isDeleting: false,
        error: null,
        success: null,
    }),

    getters: {
        getById: state => id => state.notifications.find(a => a.id === id),
    },

    actions: {
        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/notifications');
                this.notifications = response.data;
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download notifications!';
            }
        },

        async loadById(id) {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/notifications/' + id);
                this.addOrUpdateInStore(id, response.data);
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download notification!';
            }
        },

        async addNotification(name, text, type) {
            try {
                this.isLoading = true;
                const data = {name, text, type};
                this.success = "Create notification";
                this.error = null;
                await axios.post(config.backendUrl + '/notifications', data);
                this.isLoading = false;
            } catch {
                this.success = null;
                this.error = 'Cannot create notification!';
            }
        },

        async delete(id) {
            try {
                this.isDeleting = id;

                await axios.delete(`${config.backendUrl}/notifications/${id}`);

                const index = this.notifications.findIndex(a => a.id === id);
                this.notifications.splice(index, 1);

                this.error = null;
                this.isDeleting = false;

            } catch {
                this.error = 'Cannot delete notification!';
            }
        },

        addOrUpdateInStore(id, notification) {
            const index = this.notifications.findIndex(a => a.id === id);
            if (index !== -1) {
                this.notifications[index] = notification;
            } else {
                this.notifications.push(notification);
            }
        },

        clearError() {
            this.error = null;
        },

        clearSuccess() {
            this.success = null;
        },
    }
})
