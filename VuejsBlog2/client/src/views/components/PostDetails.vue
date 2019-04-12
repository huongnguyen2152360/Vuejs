<template>
  <div id="postdetails">
    <app-header></app-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{postDetails.title}}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- SHOW POST DETAILS -->
      <h2 class="post-title">
        <img :src="postDetails.usravatar" :title="postDetails.usrname" class="post-avatar">
        {{postDetails.title}}
      </h2>
      <p class="post-author">By: {{postDetails.usrname}}</p>
      <p class="post-date">{{postDetails.date}}</p>
      <p class="post-tags">
        <v-icon name="tag" scale="1"/>
        Tags: {{postDetails.tags}}
      </p>
      <viewer :value="postDetails.content"></viewer>

      <!-- COMMENTS -->
      <h4 class="cmt">Comments</h4>
      <!-- COMMENTS - Show cmts -->
      <ul v-for="cmt in allCmts" :key="cmt._id">
        <li style="list-style-type: none">
          <el-row>
            <el-col :span="2">
              <img :src="cmt.usravatar" :alt="cmt.usrname" class="cmt-user-avatar">
            </el-col>
            <el-col :span="22">
              <p>
                <router-link :to="`/user/${cmt.cmtUser}`" class="cmt-user-displayname">{{cmt.usrname}}</router-link>
                <viewer :value="cmt.content"></viewer>
              </p>
              <p class="cmt-date">{{dateFrNow(cmt.date)}}</p>
            </el-col>
          </el-row>
        </li>
      </ul>

      <!-- COMMENTS - Create cmts -->
      <el-form :model="cmtForm" v-if="userSession.displayname">
        <el-form-item>
          <editor ref="tuiEditor" v-model="cmtForm.content" class="cmt-editor"></editor>
        </el-form-item>
        <div class="cmt-hidden">
          <el-input v-model="cmtForm.date">{{ currentDate() }}</el-input>
          <el-input v-model="cmtForm.cmtUser">{{ userSession._id }}</el-input>
        </div>
        <el-button type="primary" @click="cmtSubmitBtn">Send</el-button>
      </el-form>
      <p v-else style="font-style:italic">
        You have to log in/register to comment.
        <router-link to="/login">Login/Register here.</router-link>
      </p>
    </el-main>
  </div>
</template>

<script>
import Header from './Header'
import axios from 'axios'
import moment from 'moment'
import { Editor } from '@toast-ui/vue-editor'
import { error } from 'util'
import { Viewer } from '@toast-ui/vue-editor'
// const contentedited = editor.getValue()
export default {
  components: {
    appHeader: Header,
    editor: Editor,
    viewer: Viewer
  },
  data() {
    return {
      postDetails: {},
      cmtForm: {
        date: '',
        cmtUser: ''
      },
      allCmts: {}
    }
  },
  created() {
    this.getPostDetails(), this.getPostCmts()
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
        this.postDetails.usravatar = rs.data.userinfo.avatar
        this.postDetails.usrname = rs.data.userinfo.displayname
      })
    },
    currentDate: function(date) {
      return moment(date).format()
    },
    dateFrNow: function(date) {
      return moment(date).calendar()
    },
    cmtSubmitBtn: function() {
      this.cmtForm.date = this.currentDate()
      this.cmtForm.cmtUser = this.userSession._id
      this.cmtForm.postId = this.$route.params.id
      axios({
        method: 'post',
        url: 'http://localhost:3000/createCmt',
        data: this.cmtForm
      })
        .then(rs => {
          this.$message({
            type: 'success',
            message: 'Posted successfully'
          })
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'Oops! Please finish your comment!'
          })
        })
    },
    getPostCmts: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/getPostCmt',
        data: this.$route.params.id
      }).then(rs => {
        this.allCmts = rs.data
        for (let i = 0; i < rs.data.length; i++) {
          this.allCmts[i].usravatar = rs.data[i].usercmtinfo.avatar
          this.allCmts[i].usrname = rs.data[i].usercmtinfo.displayname
        }
      })
    }
  }
}
</script>

<style>
.post-title {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.post-date,
.post-author {
  font-size: 0.9em;
  font-style: italic;
  padding-bottom: 1rem;
}
.post-tags {
  font-size: 0.9em;
  padding-bottom: 1rem;
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
.cmt-user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.cmt-date {
  font-size: 0.8rem;
}
.tui-editor-contents {
  font-size: 1rem !important;
}
.tui-editor-contents img {
  max-width: 50% !important;
}
</style>
