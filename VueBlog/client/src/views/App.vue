<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <!-- <ul>
      <li v-for="user in userSession" :key="user">
        <p>{{ user }}</p>
      </li>
    </ul> -->
  </div>
</template>

<script>
import AppHeader from './Header'

export default {
  components: {
    appHeader: AppHeader
  },
  computed: {
    userSession() {
      // return this.$store.state.userSession
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  color: #42b983;
  text-decoration: none;
}

h2 {
  margin: 0;
}

</style>
