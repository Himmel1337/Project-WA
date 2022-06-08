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
        this.error = 'Cannot download reservations!';
      }
    },

    async addReservation(title, text) {
      try {
        this.isLoading = true;
        const data = {title, text};
        await axios.post(config.backendUrl + '/reservations', data);
        this.reservations.push(reservation);
        this.error = null;
        this.isLoading = false;

      } catch {
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

    /**
     * If no reservation with given ID exists, pushes it as a new item to the array.
     * Otherwise, the old reservation with given ID is replaced by the new one.
     * This method updates only the local state, no request is made to the server.
     * @param id Number
     * @param reservation Object
     */
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
    }
  }
})
