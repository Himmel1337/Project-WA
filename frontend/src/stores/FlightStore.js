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

        async addFlight(name, capacity, date, time, flight_progress) {
            try {
                this.isLoading = true;
                const free_places = capacity;
                const data = {name, capacity, free_places, date, time, flight_progress};
                await axios.post(config.backendUrl + '/flights', data);
                this.error = null;
                this.isLoading = false;

            } catch {
                this.success = null;
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

        async changeFlight(id, flight){
            try {
                this.isLoading = true;
                this.error = null;
                await axios.put(`${config.backendUrl}/flights/${id}`, flight);
                this.isLoading = false;

            } catch {
                this.error = 'Cannot change flight!';
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
        },

        clearSuccess() {
            this.success = null;
        },
    }
})
