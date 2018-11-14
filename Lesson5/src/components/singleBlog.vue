<template>
  <div id="single-blog">
    <div class="container">
      <h2 class="pb-3">{{ blog.title | toUppercase }}</h2>
      <p>By: <span style="font-style: italic;">{{ blog.author }}</span></p>
      <article>{{ blog.content }}</article>
      <p class="pt-4">Categories:</p>
      <ul>
        <li v-for="category in blog.categories ">{{ category}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        blog: {}
      };
    },
    created() {
      this.$http
        .get("https://vuejs-blog-project.firebaseio.com/posts/" + this.id + '.json')
        .then(function(data) {
          return data.json();
        }).then(function(data) {
          this.blog = data;
        });
    },
    filters: {
      toUppercase(value) {
        return value.toUpperCase();
      }
    }
  };
</script>

<style>
</style>
