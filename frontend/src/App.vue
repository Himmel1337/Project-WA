<template>
  <nav>
    <router-link :to="{name: 'home'}">Homepage</router-link> |
    <router-link :to="{name: 'reservations'}">Reservations</router-link> |
    <router-link :to="{name: 'about'}">About</router-link> |
    <router-link :to="{name: 'signin'}">Sign in</router-link> |
    <router-link :to="{name: 'signup'}">Sign up</router-link>
  </nav>

  <main>
    <router-view/>
  </main>
</template>

<script>
export default {
  name: "App",
}
</script>

<style scoped>
</style>