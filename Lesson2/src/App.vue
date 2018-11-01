<template>
  <div>
    <h3>Hellooooo~</h3>
    <p>... from App.vue</p>
    <app-user></app-user>
  </div>
</template>

<script>
  import User from "./components/User.vue"
  export default {
    components: {
      "appUser": User
    }
  }
</script>

<style>
div {
  padding: 2rem 15px;
}
</style>
