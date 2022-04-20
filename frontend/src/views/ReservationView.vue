<template>
  <h1>Reservations</h1>
  Title: <input v-model = "name"> <br><br>
  Date: <input type = "date"> <br><br>
  Add: <input type = "submit">
  <!--  People: <input type="range">-->
  <br><br>

  <div class="error" v-if="error">
    {{ error }}
    <button @click="error = null">Skrýt</button>
  </div>
  <div v-if="isLoading">Loading articles...</div>
  <ul v-else>
    <li v-for="article in articles">
      <router-link :to="{name: 'reservation-detail', params: {id: article.id}}">
        {{ article.title }}
        <button @click.prevent="deleteArticle(article.id)">
          {{isDeleting === article.id ? 'Deleting...' : 'Delete' }}
        </button>
      </router-link>
    </li>
  </ul>
</template>

<script>
import config from "../config";
import axios from "axios";

export default {
  name: "Reservations",

  data() {
    return {
      reservations: [],
      isLoading: true,
      isDeleting: null,
      error: null,
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.isLoading = true;

      try {
        const response = await axios.get(config.backendUrl + '/reservations');
        this.reservations = response.data;
        this.error = null;
      } catch {
        this.error = 'Cannot download reservations!';
      }

      this.isLoading = false;
    },

    async createReservation() {
      // ... try, start loading
      await axios.post(config.backendUrl + '/reservations', data);
      // ... push to this.articles, stop loading, catch error
    },

    async deleteReservation(id) {
      this.isDeleting = id;

      try {
        // delete on server
        await axios.delete(`${config.backendUrl}/reservations/${id}`);
        // delete locally
        const index = this.reservations.findIndex(a => a.id === id);
        this.reservations.splice(index, 1);

        this.error = null;
      } catch {
        this.error = 'Cannot delete reservation!';
      }

      this.isDeleting = false;
    }
  }
}
</script>

<style>
.error {
  background: red;
  color: white;
  padding: 2em;
}
</style>

<!--<script>-->
<!--export default {-->
<!--  name: "Reservation",-->
<!--  data() {-->
<!--    return {-->
<!--      reservations: [-->
<!--        {-->
<!--          id: 1,-->
<!--          title: "Reservation A",-->
<!--          date: "21.04.2021"-->
<!--        },        {-->
<!--          id: 2,-->
<!--          title: "Reservation B",-->
<!--          date: "18.02.2020"-->
<!--        },-->
<!--      ],-->
<!--      name: "",-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    filteredReservation() {-->
<!--      return this.reservations.filter(a => a.title.includes(this.name));-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->