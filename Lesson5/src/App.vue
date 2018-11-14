<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import addBlog from "./components/addBlog.vue";
  import showBlogs from "./components/showBlogs.vue";
  import listBlogs from "./components/listBlogs.vue";
  import header from "./components/header.vue";
  export default {
    components: {
      "add-blog": addBlog,
      "show-blogs": showBlogs,
      "list-blogs": listBlogs,
      "appHeader": header
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
