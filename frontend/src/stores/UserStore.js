import { defineStore } from 'pinia'
import axios from "axios";
import config from "../config";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore('user', {
  state() {
    const oldToken = localStorage.getItem('token');

    if (oldToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + oldToken;
    }

    return {
      token: oldToken,
      error: null,
      isLoggingIn: false,
      loginMessage: null,
      afterLoginRoute: null,
    }
  },

  getters: {
    isAuthenticated: state => state.token !== null,
    user: state => jwtDecode(state.token),
  },

  actions: {
    async login(username, password) {
      try {
        this.isLoggingIn = true;

        const data = {username, password};
        const response = await axios.post(config.backendUrl + '/user/login', data);

        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        localStorage.setItem('token', this.token);

        this.error = null;
        this.loginMessage = null;
        this.isLoggingIn = false;

      } catch {
        this.error = 'Cannot log in!';
      }
    },

    async addUser(username, password, role) {
      try {
        this.isLoading = true;
        const data = {username, password, role};
        await axios.post(config.backendUrl + '/user', data);
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot create user!';
      }
    },

    setLoginMessage(message) {
      this.loginMessage = message;
    },

    setAfterLoginRoute(route) {
      this.afterLoginRoute = route;
    },

    logout() {
      this.token = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    },

    clearError() {
      this.error = null;
    }
  }
})
