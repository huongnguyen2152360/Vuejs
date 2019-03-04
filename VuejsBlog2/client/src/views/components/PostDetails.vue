<template>
  <div id="postdetails">
    <app-header></app-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{postDetails.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2 class="post-title">
        <img :src="postDetails.avatar" :title="postDetails.displayname" class="post-avatar">
        {{postDetails.title}}
      </h2>
      <p class="post-date">{{this.postDetails.date}}</p>
      <p class="post-tags">
        <v-icon name="tag" scale="1"/>
        Tags: {{this.postDetails.tags}}
      </p>
      <p>{{this.postDetails.content}}</p>
      <h4 class="cmt">Comments</h4>
      <el-form :model="cmtForm" v-if="userSession.displayname">
        <el-form-item>
          <editor v-model="cmtForm.content" class="cmt-editor"></editor>
        </el-form-item>
        <el-form-item class="cmt-hidden">
          <el-input v-model="cmtForm.date">{{ currentDate() }}</el-input>
        </el-form-item>
        <el-button type="primary">Send</el-button>
      </el-form>
      <p v-else style="font-style:italic">You have to log in/register to comment. <router-link to="/login">Login/Register here.</router-link></p>
    </el-main>
  </div>
</template>

<script>
import Header from './Header'
import axios from 'axios'
import moment from 'moment'
import { Editor } from '@toast-ui/vue-editor'
export default {
  components: {
    appHeader: Header,
    editor: Editor
  },
  data() {
    return {
      postDetails: {},
      cmtForm: {}
    }
  },
  created() {
    this.getPostDetails()
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
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
      })
    },
    currentDate: function(date) {
      return moment(date).format()
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
  padding-bottom: 2rem;
}
.post-avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 1rem;
}
.cmt {
  padding-top: 2rem;
}
.cmt-hidden {
  display: none;
}
</style>
