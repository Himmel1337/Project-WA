import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";

export const useFlightStore = defineStore('flight', {
    state: () => ({
        flights: [],
        isLoading: true,
        isAdding: true,
        isDeleting: false,
        error: null,
    }),

    getters: {
        getById: state => id => state.flights.find(a => a.id === id),
    },

    actions: {
        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/flights');
                this.flights = response.data;
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download flights!';
            }
        },

        async loadById(id) {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/flights/' + id);
                this.addOrUpdateInStore(id, response.data);
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot download flights!';
            }
        },

        async addFlight(name, date, time) {
            try {
                this.isLoading = true;
                const data = {name, date, time};
                await axios.post(config.backendUrl + '/flights', data);
                this.flights.push(flight);
                this.error = null;
                this.isLoading = false;

            } catch {
                this.error = 'Cannot create flight!';
            }
        },

        async delete(id) {
            try {
                this.isDeleting = id;

                await axios.delete(`${config.backendUrl}/flights/${id}`);

                const index = this.flights.findIndex(a => a.id === id);
                this.flights.splice(index, 1);

                this.error = null;
                this.isDeleting = false;

            } catch {
                this.error = 'Cannot delete flight!';
            }
        },

        addOrUpdateInStore(id, flight) {
            const index = this.flights.findIndex(a => a.id === id);
            if (index !== -1) {
                this.flights[index] = flight;
            } else {
                this.flights.push(flight);
            }
        },

        clearError() {
            this.error = null;
        }
    }
})
