import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    reservations: [],
    isLoading: true,
    isAdding: true,
    isDeleting: false,
    error: null,
    success: null,
  }),

  getters: {
    getById: state => id => state.reservations.find(a => a.id === id),
  },

  actions: {
    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/reservations');
        this.reservations = response.data;
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot download reservations!';
      }
    },

    async loadById(id) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/reservations/' + id);
        this.addOrUpdateInStore(id, response.data);
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot download reservation!';
      }
    },

    async addReservation(name, flight_id) {
      try {
        this.isLoading = true;
        const data = {name, flight_id};
        this.success = "Create reservation";
        this.error = null;
        await axios.post(config.backendUrl + '/reservations', data);
        this.isLoading = false;
      } catch {
        this.success = null;
        this.error = 'Cannot create reservation!';
      }
    },

    async delete(id) {
      try {
        this.isDeleting = id;

        await axios.delete(`${config.backendUrl}/reservations/${id}`);

        const index = this.reservations.findIndex(a => a.id === id);
        this.reservations.splice(index, 1);

        this.error = null;
        this.isDeleting = false;

      } catch {
        this.error = 'Cannot delete reservation!';
      }
    },

    addOrUpdateInStore(id, reservation) {
      const index = this.reservations.findIndex(a => a.id === id);
      if (index !== -1) {
        this.reservations[index] = reservation;
      } else {
        this.reservations.push(reservation);
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
