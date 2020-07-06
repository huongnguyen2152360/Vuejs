<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <Greeting msg="msg" isAdmin="isAdmin"/> -->
  </div>
</template>

<script>
// import Greeting from './components/Greeting.vue';
import {shallowMount} from "@vue/test-utils";

export default {
  name: 'App',
  components: {
    // Greeting
  },
  // data() {
  //   return {
  //     msg: "hello greeting",
  //     isAdmin: true
  //   }
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
