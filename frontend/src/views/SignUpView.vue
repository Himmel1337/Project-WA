<template>
  <h1>Sign up</h1>
  <br><br>
  Login: <input type="text"/>
  <br><br>
  Password: <input type="text"/>
</template>

<script>
export default {
  name: "User",

  data() {
    return {
      users: [],
      isLoading: true,
      isDeleting: null,
      error: null,
    }
  },

  created() {
    this.loadData();
  },

  methods: {

    async createUser() {
      await axios.post(config.backendUrl + '/user', data);
    },
},}

</script>