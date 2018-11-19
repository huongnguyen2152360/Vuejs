<template>
  <div id="product-list-one">
    <h2>Product List One</h2>
    <ul>
      <li v-for="product in saleProducts">
        <span class="name">{{ product.name }}</span>
        <span class="price">${{ product.price }}</span>
      </li>
    </ul>
    <button type="button" class="btn btn-outline-dark" @click="reducePrice">
      Reduce Price
    </button>
  </div>
</template>

<script>
  export default {
    computed: {
      products() {
        return this.$store.state.products;
      },
      saleProducts() {
        return this.$store.getters.saleProducts;
      }
    },
    methods: {
      reducePrice: function() {
        this.$store.commit("reducePrice");
      }
    }
  };
</script>

<style scoped>
  #product-list-one {
    background-color: #ead3a8;
    padding: 25px;
    margin-top: 3rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  }
  #product-list-one li {
    background-color: #d23641;
    list-style-type: none;
    margin-bottom: 1rem;
    padding: 10px;
    display: inline-block;
    margin-right: 25px;
    width: 25%;
  }
  #product-list-one li:first-child {
    margin-top: 2rem;
  }
  .price {
    display: block;
    color: #ead3a8;
    font-weight: bold;
    margin-top: 1rem;
  }
  .name {
    color: #ffffff;
  }
</style>
