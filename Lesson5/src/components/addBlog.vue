<template>
  <div id="add-blog">
    <div class="container">
      <h3>Add a New Blog Post</h3>
      <form>
        <div class="form-group">
          <label>Blog Title</label>
          <input
            type="text"
            class="form-control"
            v-model.lazy="blog.title"
            required
          />
        </div>
        <div class="form-group">
          <label>Blog Content</label>
          <textarea
            class="form-control"
            cols="30"
            rows="10"
            v-model.lazy="blog.content"
          ></textarea>
        </div>
        <div class="form-group" id="checkboxes">
          <input type="checkbox" value="fantasy" v-model="blog.categories" />
          <label class="pr-3">Fantasy</label>
          <input type="checkbox" value="mario" v-model="blog.categories" />
          <label class="pr-3">Mario</label>
          <input type="checkbox" value="cheese" v-model="blog.categories" />
          <label class="pr-3">Cheese</label>
          <input type="checkbox" value="soup" v-model="blog.categories" />
          <label>Soup</label>
        </div>
        <div class="form-group">
          <label>Author</label>
          <select class="custom-select" v-model="blog.author">
            <option v-for="author in authors">{{ author }}</option>
          </select>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-success" @click.prevent="post">
            Add Blog
          </button>
        </div>
      </form>
      <div>
        <h5
          class="pt-4"
          style="font-style: italic; font-size: 1em; color: #28a745;"
          v-if="submitted"
        >
          Submitted Blog Post successfully.
        </h5>
        <div class="form-group blog-preview" id="preview">
          <h4>Blog Preview</h4>
          <p>
            Blog title: <span>{{ blog.title }}</span>
          </p>
          <p>Blog content:</p>
          <p>
            <span>{{ blog.content }}</span>
          </p>
          <p>Blog Categories:</p>
          <ul>
            <li v-for="category in blog.categories">{{ category }}</li>
          </ul>
          <p>
            Author: <span>{{ blog.author }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        blog: {
          title: "",
          content: "",
          categories: [],
          author: ""
        },
        authors: [
          "Superman",
          "Batman",
          "Thor",
          "Wonder Woman",
          "Captain America",
          "Iron Man"
        ],
        submitted: false
      };
    },
    methods: {
      post() {
        this.$http
          .post(
            "https://vuejs-blog-project.firebaseio.com/posts.json",
            this.blog
          )
          .then(function(data) {
            this.submitted = true;
          });
      }
    }
  };
</script>

<style>
  .blog-preview {
    padding: 2rem 15px;
    border: 1px solid rgb(190, 190, 190);
    border-radius: 5px;
  }
  .blog-preview h4 {
    padding-bottom: 1rem;
  }
  .blog-preview p {
    font-weight: bold;
  }
  .blog-preview span {
    font-weight: normal;
  }
</style>
