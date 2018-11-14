<template>
  <div id="show-blogs">
    <div class="container">
      <h3>All Blog Articles</h3>
      <input
        type="text"
        v-model="search"
        placeholder="Search Blogs"
        class="blog-search"
      />
      <div class="single-blog" v-for="blog in filteredBlogs">
        <router-link :to="'/blog/' + blog.id"
          ><h4 v-rainbow>{{ blog.title | to-uppercase }}</h4></router-link
        >
        <article>{{ blog.content | snippet }}</article>
      </div>
    </div>
  </div>
</template>

<script>
  import searchMixins from "../mixins/searchMixins";
  export default {
    data() {
      return {
        blogs: [],
        search: ""
      };
    },
    methods: {},
    created() {
      this.$http
        .get("https://vuejs-blog-project.firebaseio.com/posts.json")
        .then(function(data) {
          // this.blogs = data.body.slice(0, 10);
          return data.json();
        })
        .then(function(data) {
          var blogsArray = [];
          for (let key in data) {
            data[key].id = key;
            blogsArray.push(data[key]);
          }
          this.blogs = blogsArray;
        });
    },
    computed: {},
    filters: {
      toUppercase(value) {
        return value.toUpperCase();
      },
      snippet: function(value) {
        return value.slice(0, 150) + " ...";
      }
    },
    directives: {
      rainbow: {
        bind(el, binding, vnode) {
          el.style.color =
            "#" +
            Math.random()
              .toString()
              .slice(2, 8);
        }
      }
    },
    mixins: [searchMixins]
  };
</script>

<style>
  .single-blog {
    margin: 1.2rem 0;
    padding: 0.8rem 15px;
    box-sizing: border-box;
    background-color: #ecfcf4;
  }
  .blog-search {
    margin: 1rem 0;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
  }
</style>
