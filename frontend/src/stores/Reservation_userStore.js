import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";

export const useReservation_userStore = defineStore('reservation_user', {
    state: () => ({
        reservation_users: [],
        isLoading: true,
        isAdding: true,
        isDeleting: false,
        error: null,
    }),

    getters: {
        getById: state => id => state.reservation_users.find(a => a.id === id),
    },

    actions: {
        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/reservation_user');
                this.reservation_users = response.data;
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download reservation_users!';
            }
        },

        async loadById(id) {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/reservation_user/' + id);
                this.addOrUpdateInStore(id, response.data);
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download reservation_users!';
            }
        },


        async addReservation_user(reservation_id, user_id) {
            try {
                this.isLoading = true;
                const data = {reservation_id, user_id};
                await axios.post(config.backendUrl + '/reservation_user', data);
                this.reservation_users.push(reservation_user);
                this.error = null;
                this.isLoading = false;
                this.error = null;
                this.isLoading = false;
            } catch {
                this.error = 'Cannot add User to Reservation';
            }
        },

        async delete(id) {
            try {
                this.isDeleting = id;

                await axios.delete(`${config.backendUrl}/reservation_user/${id}`);

                const index = this.reservation_users.findIndex(a => a.id === id);
                this.reservation_users.splice(index, 1);

                this.error = null;
                this.isDeleting = false;

            } catch {
                this.error = 'Cannot delete reservation_user!';
            }
        },

        addOrUpdateInStore(id, reservation_user) {
            const index = this.reservation_users.findIndex(a => a.id === id);
            if (index !== -1) {
                this.reservation_users[index] = reservation_user;
            } else {
                this.reservation_users.push(reservation_user);
            }
        },

        clearError() {
            this.error = null;
        }
    },
})
