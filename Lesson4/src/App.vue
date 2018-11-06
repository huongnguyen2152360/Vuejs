<template>
  <div id="app">
    <app-header :itemsCount="items.length" :itemsMax="maxItems"></app-header>
    <app-new-items @itemAdded="addItems"></app-new-items>
    <app-items-layout :itemss="items" @itemRemoved="removeItemm"></app-items-layout>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-success text-center mt-2">
          Click on an Item to delete it
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ItemsLayout from './components/ItemsLayout.vue'
  import NewItems from './components/NewItems.vue'
  import Header from './components/Header.vue'
  export default {
    data: function () {
      return {
        items: [
          'Life is tough, my darling. But so are you!', 'What"s stopping you? That"s right. Nothing!'
        ],
        maxItems: 10
      }
    },
    components: {
      appItemsLayout: ItemsLayout,
      appNewItems: NewItems,
      appHeader: Header
    },
    methods: {
      addItems(item) {
        if (this.items.length >= this.maxItems) {
          return alert('You can only add up to 10 items.')
        } else {
          this.items.push(item)
        }
      },
      removeItemm(index) {
        this.items.splice(index, 1)
      }
    }
  }
</script>

<style>
  #app {
    margin: 2rem 30px;
  }
</style>