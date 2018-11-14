<template>
        <div id="list-blogs">
          <div class="container">
            <h3>List Blog Titles</h3>
            <input
              type="text"
              v-model="search"
              placeholder="Search Blogs"
              class="blog-search"
            />
            <div class="single-blog" v-for="blog in filteredBlogs">
              <h4 v-rainbow>{{ blog.title | to-uppercase }}</h4>
            </div>
          </div>
        </div>
      </template>
      
      <script>
        import searchMixins from '../mixins/searchMixins'
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
              .get("https://jsonplaceholder.typicode.com/posts")
              .then(function(data) {
                this.blogs = data.body.slice(0, 10);
              });
          },
          computed: {
          },
          filters: {
            toUppercase(value) {
              return value.toUpperCase();
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
      