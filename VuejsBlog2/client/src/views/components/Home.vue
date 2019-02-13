<template>
  <div id="appmain">
    <app-header></app-header>
    <el-main>
      <el-row>
        <el-col :span="24" class="newtopic-row">
          <el-button type="primary" class="newtopic-btn" @click="newTopicBtn">New Topic</el-button>
        </el-col>
      </el-row>
      <ul v-for="post in allPosts" :key="post._id">
        <li style="list-style-type: none">
          <el-row>
            <!-- Show Posts Info -->
            <el-col :span="18">
              <el-row class="allPosts_row">
                <el-col :span="2">
                  <div class="user-avatar">
                    <img :src="post.avatar" alt="user-avatar">
                  </div>
                  <!-- Can fix -->
                  <!-- <div class="user-avatar" v-else>
                    <img src="http://purrworld.com/wp-content/uploads/2017/10/big-eyes-cute-cute-cat-cute-kitty-Favim.com-3467623.jpg" alt="user-avatar">
                  </div> -->
                </el-col>
                <el-col :span="18">
                  <h2>{{post.title}}</h2>
                  <p class="main-tags">
                    {{post.tags}} •
                    <span>{{currentDate(post.date)}}</span>
                  </p>
                </el-col>
                <el-col :span="2" style="text-align:center">
                  <h2 class="main-count">1</h2>
                  <p class="main-tags">POSTS</p>
                </el-col>
                <el-col :span="2" style="text-align:center">
                  <h2 class="main-count">3</h2>
                  <p class="main-tags">VIEWS</p>
                </el-col>
              </el-row>
            </el-col>
            <!-- Show Posts Comments -->
            <el-col :span="5" :offset="1" class="main-cmts">
              <el-row class="cmt-line1">
                <el-col :span="5">
                  <div class="cmt-avatar">
                    <img src="https://i.pinimg.com/originals/ba/03/23/ba03237a6d6499f0e2633314826e1526.jpg" alt="cmt-avatar">
                  </div>
                </el-col>
                <el-col :span="17" class="cmt-avatar-p">
                  <p style="font-size: 0.9em">3 days ago</p>
                </el-col>
              </el-row>
              <p style="font-size: 0.8em;padding-top: 5px">Help me with this askdjfhkjwhar</p>
            </el-col>
          </el-row>
        </li>
      </ul>
      <el-form :model="postForm" v-show="open" class="postForm" v-if="userSession.displayname">
        <p class="postForm-intro">What's on your mind?</p>
        <el-form-item label="Title">
          <el-input v-model="postForm.title" placeholder="Your Title" class="postForm-title-input"></el-input>
        </el-form-item>
        <el-form-item label="Tags">
          <el-select v-model="postForm.tags" placeholder="Select one tag">
            <el-option label="General" value="General"></el-option>
            <el-option label="Support" value="Support"></el-option>
            <el-option label="Language" value="Language"></el-option>
          </el-select>
        </el-form-item>
        <div class="postForm-hidden">
          <el-input v-model="postForm.author">{{userSession.displayname}}</el-input>
          <!-- <el-input v-model="postForm.avatar">{{userSession.avatar}}</el-input> -->
          <!-- <img v-bind="postForm.avatar" :src="userSession.avatar" alt="User Avatar" class="user-avatar"> -->
          <el-input v-model="postForm.date">{{ date() }}</el-input>
        </div>
        <editor v-model="postForm.content" class="editorText"></editor>
        <div class="postForm-buttons">
          <el-button type="success" class="postForm-buttons-post" @click="postConfirm">POST</el-button>
          <el-button type="info" class="postForm-buttons-cancel" @click="postCancel">CANCEL</el-button>
        </div>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor } from '@toast-ui/vue-editor'
import Header from './Header'
import moment from 'moment'
import axios from 'axios'
import { clearTimeout } from 'timers'
export default {
  components: {
    appHeader: Header,
    editor: Editor
  },
  data() {
    return {
      open: false,
      postForm: {
        author: this.$store.store.state.userSession.displayname,
        avatar: this.$store.store.state.userSession.avatar,
        date: ''
      },
      allPosts: {}
    }
  },
  created() {
    this.getallPosts(),
    this.getUserInfo()
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  },
  methods: {
    newTopicBtn: function() {
      if (this.userSession.displayname) {
        this.open = !this.open
      } else {
        this.$router.push('/login')
      }
    },
    moment: function(date) {
      return moment(date)
    },
    date: function(date) {
      this.postForm.date = moment(date).format('YYYYMMDD')
    },
    currentDate: function(date) {
      return moment(date, 'YYYYMMDD').fromNow()
    },
    postCancel: function() {
      this.open = false
    },
    postConfirm: function() {
      // console.log(this.postForm)
      axios({
        method: 'post',
        url: 'http://localhost:3000/postContent',
        data: this.postForm
      })
        .then(() => {
          this.open = false
          this.$message({
            type: 'success',
            message: 'Posted successfully'
          })
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'Please input your Title, Tags and Content'
          })
        })
    },
    getallPosts: function() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/getAllPosts'
      }).then(rs => {
        this.allPosts = rs.data
        
      })
    },
    getUserInfo: function() {
      console.log(this.allPosts)
      // console.log(this.allPosts)
      // axios({
      //   method:'post',
      //   url: 'http://localhost:3000/getUserInfo',
      //   data: this.allPosts.author
      // })
    }
  }
}
</script>

<style scope>
.allPosts_row {
  padding-bottom: 0.7rem;
}
.newtopic-btn {
  margin-bottom: 2rem;
}
.user-avatar {
  width: 40px;
  height: 40px;
}
.user-avatar img,
.cmt-avatar img {
  border-radius: 50%;
  width: 100%;
}
.el-main {
  padding: 3rem 8rem;
}
h2,
p {
  margin: 0;
}
.main-tags {
  margin: 0;
  font-size: 0.8em;
}
.main-count {
  font-weight: normal;
}
.main-cmts {
  /* background-color: palevioletred; */
  border-left: 3px solid palevioletred;
  padding-left: 15px;
}
.cmt-avatar {
  width: 30px;
  height: 30px;
}
.cmt-avatar-p {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cmt-line1 {
  display: flex;
}
.editorText {
  padding-top: 1rem;
  height: 350px !important;
}
.postForm-intro {
  color: white;
  font-style: italic;
  padding-bottom: 2rem;
}
.postForm-title-input {
  width: 90% !important;
}
.postForm {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
  margin-top: 3rem;
}
.postForm .el-form-item__label {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  padding: 0 30px 0 0;
}
.postForm-buttons {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}
.postForm-buttons-post {
  padding: 0 4rem;
  font-size: 1rem;
  font-weight: bold;
}
.postForm-buttons-cancel {
  font-size: 0.8rem;
}
.postForm-hidden {
  display: none;
}
</style>
