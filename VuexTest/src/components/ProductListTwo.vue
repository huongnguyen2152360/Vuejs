<template>
  <div id="product-list-two">
    <h2>Product List Two</h2>
    <ul>
      <li v-for="product in saleProducts">
        <span class="name">{{ product.name }}</span>
        <span class="price">${{ product.price }}</span>
      </li>
    </ul>
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
    }
  };
</script>

<style scoped>
  #product-list-two {
    background-color: #afeaaa;
    padding: 25px;
    margin-top: 3rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  }
  #product-list-two li {
    background-color: #41924b;
    list-style-type: none;
    margin-bottom: 1rem;
    padding: 10px;
  }
  #product-list-two li:first-child {
    margin-top: 2rem;
  }
  .price {
    display: block;
    color: #afeaaa;
    font-weight: bold;
    margin-top: 1rem;
  }
  .name {
    color: #ffffff;
  }
</style>
