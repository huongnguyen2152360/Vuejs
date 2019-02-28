<template>
  <div id="postdetails">
    <app-header></app-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{postDetails.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2 class="post-title">{{postDetails.title}}</h2>
      <p class="post-date">{{this.postDetails.date}}</p>
      <p class="post-tags">Tags: {{this.postDetails.tags}}</p>
      <p>{{this.postDetails.content}}</p>
      <h5>Comments</h5>
      <textarea></textarea>
    </el-main>
  </div>
</template>

<script>
import Header from './Header'
import axios from 'axios'
import moment from 'moment'
export default {
  components: {
    appHeader: Header
  },
  data() {
    return {
      postDetails: {}
    }
  },
  created() {
    this.getPostDetails()
  },
  methods: {
    getPostDetails: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/getpostdetails',
        data: this.$route.params.id
      }).then(rs => {
        this.postDetails = rs.data
        this.postDetails.date = moment(this.postDetails.date).calendar()
        // console.log(this.postDetails)
      })
    }
  }
}
</script>

<style scoped>
.post-title {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.post-date {
  font-size: 0.9em;
  font-style: italic;
  padding-bottom: 0.5rem;
}
.post-tags {
  font-size: 0.9em;
  /* font-style: italic; */
  padding-bottom: 0.5rem;
}
</style>
