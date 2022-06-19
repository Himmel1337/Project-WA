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
      users: [],
      token: oldToken,
      error: null,
      success: null,
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
        this.error = null;
        this.success = "Loged in";
        const response = await axios.post(config.backendUrl + '/users/login', data);

        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        localStorage.setItem('token', this.token);

        this.loginMessage = null;
        this.isLoggingIn = false;

      } catch {
        this.success = null
        this.error = 'Cannot log in!';
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
    },

    clearSuccess() {
      this.success = null;
    },

    async loadAll() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/users');
        this.users = response.data;
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot download users!';
      }
    },

    async addUser(username, password, role) {
      this.isLoading = true;
      const response = await axios.get(config.backendUrl + '/users');
      this.users = response.data;
      for (let i = 0; i < this.users.length; i++){
        if (username === this.users[i].username) this.error = "Username is alredy exist";
      }
      try {
        this.isLoading = true;
        const data = {username, password, role};
        this.error = null;
        this.success = "Created user";
        await axios.post(config.backendUrl + '/users', data);
        this.isLoading = false;

      } catch {
        this.success = null;
        this.error = 'Cannot create user!';
      }
    },

    async loadById(id) {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + '/users/' + id);
        this.addOrUpdateInStore(id, response.data);
        this.error = null;
        this.isLoading = false;

      } catch {
        this.error = 'Cannot download user!';
      }
    },
  }
})
