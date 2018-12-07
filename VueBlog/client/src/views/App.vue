<template>
  <div id="app">
    <app-header></app-header>
  </div>
</template>

<script>
import AppHeader from './Header'
export default {
  components: {
    appHeader: AppHeader
  }
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
}

h2 {
  margin: 0;
}
</style>
