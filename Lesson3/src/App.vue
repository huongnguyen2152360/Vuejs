<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-center mt-5">
          <button class="btn btn-outline-danger" @click=" compSelected = 'appCard' ">Card</button>
          <button class="btn btn-outline-info" @click=" compSelected = 'appContact' ">Contact</button>
          <button class="btn btn-outline-warning" @click=" compSelected = 'appAbout' ">About</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <keep-alive>
            <component :is="compSelected"></component>
          </keep-alive>
          <!-- <div class="text-center pt-3">
                <p>{{ compSelected }}</p>
              </div> -->
          <app-card cardWord="Car">
            <h2 slot="lam1">{{ cardTitle }}</h2>
            <p slot="lam1">Lamborghini Gallador</p>
            <p slot="lam2">Lamborghini Murcielago</p>
          </app-card>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from "./components/Card.vue"
  import Contact from "./components/Contact.vue"
  import About from "./components/About.vue"
  export default {
    data: function () {
      return {
        cardTitle: "Luxury Cars",
        compSelected: "appCard"
      }
    },
    components: {
      appCard: Card,
      appContact: Contact,
      appAbout: About
    }
  }
</script>

<style>

</style>