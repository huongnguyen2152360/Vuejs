<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    userSession() {
      return this.$store.store.state.userSession
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
