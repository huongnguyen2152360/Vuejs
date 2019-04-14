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
      <el-row>
        <el-col :span="12">
          <h4 class="cmt">Comments</h4>
        </el-col>
        <el-col :span="12" class="cmt-writeBtn">
          <el-button @click="cmtWriteBtn" type="primary">Write a Comment</el-button>
        </el-col>
      </el-row>

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
                <viewer :value="cmt.content" class="cmt-viewer"></viewer>
              </p>
              <el-row class="cmt-showlastline">
                <el-col :span="12">
                  <p class="cmt-date">{{dateFrNow(cmt.date)}}</p>
                  <p class="cmt-hidden">{{cmt.id}}</p>
                </el-col>
                <el-col :span="12">
                  <div class="cmt-editBtns" v-if="cmt.id == userSession._id">
                  <el-button @click="cmtEditBtn(cmt)" class="cmt-editBtn">Edit</el-button>
                  <el-button @click="cmtDelBtn" class="cmt-delBtn" type="danger">Delete</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </li>
      </ul>

      <!-- COMMENTS - Edit cmt -->
       <div class="editor-wrap" v-show="open2">
        <el-form :model="cmtEditForm" class="cmt-Form">
          <el-form-item>
            <editor ref="tuiEditor" v-model="cmtEditForm.content" class="cmt-editor"></editor>
          </el-form-item>
          <div class="cmt-hidden">
            <el-input v-model="cmtEditForm.cmtUser">{{ userSession._id }}</el-input>
          </div>
          <div class="cmt-editBtn">
            <el-button type="primary" @click="cmtEditSend">Send</el-button>
            <el-button type="info" @click="cmtEditCancel">Cancel</el-button>
          </div>
        </el-form>
      </div>

      <!-- COMMENTS - Create cmts -->
      <div class="editor-wrap" v-show="open">
        <el-form :model="cmtForm" v-if="userSession.displayname" class="cmt-Form">
          <el-form-item>
            <editor ref="tuiEditor" v-model="cmtForm.content" class="cmt-editor"></editor>
          </el-form-item>
          <div class="cmt-hidden">
            <el-input v-model="cmtForm.date">{{ currentDate() }}</el-input>
            <el-input v-model="cmtForm.cmtUser">{{ userSession._id }}</el-input>
          </div>
          <div class="cmt-editBtn">
            <el-button type="primary" @click="cmtSubmitBtn">Send</el-button>
            <el-button type="info" @click="cmtCancelBtn">Cancel</el-button>
          </div>
        </el-form>
      </div>
      <p v-if="!userSession.displayname" style="font-style:italic">
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
      allCmts: {},
      open: false,
      open2: false,
      cmtEditForm: {
        date: ''
      }
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
          this.allCmts = rs.data
          this.open = false
          for (let i = 0; i < rs.data.length; i++) {
            this.allCmts[i].usravatar = rs.data[i].usercmtinfo.avatar
            this.allCmts[i].usrname = rs.data[i].usercmtinfo.displayname
            this.allCmts[i].id = rs.data[i].usercmtinfo._id
          }
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
    cmtCancelBtn: function() {
      this.open = false
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
          this.allCmts[i].id = rs.data[i].usercmtinfo._id
        }
      })
    },
    cmtWriteBtn: function() {
      if (this.userSession._id) {
        this.open = !this.open
      } else {
        this.$router.push('/login')
      }
    },
    cmtEditBtn: function(comment) {
      this.open2 = !this.open2
      this.cmtEditForm = comment
      this.cmtEditForm.date = comment.date
      axios({
        method:'post',
        url: 'http://localhost:3000/editCmt',
        data: this.cmtEditForm
      }).then(rs => {
        console.log(rs.data);
      })
    },
    cmtDelBtn: function() {
      console.log('cmtdelbtn');
    },
    cmtEditSend: function() {
      console.log('something');
    },
    cmtEditCancel: function() {
      console.log('something1');
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
  max-width: 40% !important;
}
.cmt-user-displayname {
  font-size: 0.9rem;
}
.cmt-viewer p {
  margin: 0;
}
.cmt-writeBtn {
  margin-top: 2.5rem;
  text-align: right;
}
.editor-wrap {
  position: fixed;
  top: 35%;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 100;
}
.cmt-Form {
  width: 70%;
  margin: 0 auto;
  backface-visibility: hidden;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
}
.cmt-editor {
  height: 400px;
}
.cmt-editBtn {
  font-size: 0.7rem;
  padding: 5px 10px;
}
.cmt-delBtn {
  font-size: 0.7rem;
  padding: 5px 10px;
}
.cmt-editBtns {
  text-align: right;
}
.cmt-showlastline {
  padding: 0.5rem 0;
}
</style>
