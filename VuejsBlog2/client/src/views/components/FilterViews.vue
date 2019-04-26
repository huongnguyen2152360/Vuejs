<template>
  <div id="postsviews">
    <app-header></app-header>
    <el-main>
      <el-row>
        <el-col :span="24" class="newtopic-row">
          <el-button type="primary" class="newtopic-btn" @click="newTopicBtn">New Topic</el-button>
        </el-col>
      </el-row>
      <ul v-for="(post,index) in allPosts" :key="index">
        <li style="list-style-type: none">
          <el-row>
            <!-- Show Posts Info -->
            <el-col :span="18">
              <el-row class="allPosts_row">
                <el-col :span="2">
                  <div class="user-avatar">
                    <img :src="post.userinfo.avatar" :alt="post.userinfo.displayname">
                  </div>
                </el-col>
                <el-col :span="18">
                  <router-link @click.native="countClicks(index)" :to="`/post/${post._id}`" class="allPosts_title">
                    <h2>{{post.title}}</h2>
                  </router-link>
                  <p class="main-tags">
                    {{post.tags}} •
                    <span>{{moment(post.date, 'YYYYMMDD').fromNow()}}</span>
                  </p>
                </el-col>
                <el-col :span="2" style="text-align:center">
                  <h2 class="main-count">{{post.postCount}}</h2>
                  <p class="main-tags">POSTS</p>
                </el-col>
                <el-col :span="2" style="text-align:center">
                  <h2 class="main-count">{{post.views}}</h2>
                  <p class="main-tags">VIEWS</p>
                </el-col>
              </el-row>
            </el-col>
            <!-- Show Posts Comments -->
            <el-col :span="5" :offset="1" class="main-cmts" v-if="post.cmtId != ''">
              <el-row class="cmt-line1">
                <el-col :span="5">
                  <div class="cmt-avatar">
                    <img :src="post.cmtAva" alt="post.cmtName">
                  </div>
                </el-col>
                <el-col :span="17" class="cmt-avatar-p">
                  <p style="font-size: 0.8em;padding-left: 0.5rem;">{{moment(post.cmtDate, 'YYYYMMDD').fromNow()}}</p>
                </el-col>
              </el-row>
              <p style="font-size: 0.8em;padding-top: 5px" v-if="post.cmtContentLength>0 &&post.cmtContentLength >=20">{{post.cmtContent.substring(0,20)}}</p>
              <p style="font-size: 0.8em;padding-top: 5px" v-else>{{post.cmtContent}}</p>
            </el-col>
            <el-col :span="5" :offset="1" class="main-cmts" v-if="post.cmtId == ''">
              <el-row class="cmt-line1"></el-row>
              <el-row class="cmt-line1">
                <el-col :span="5">
                  <div class="cmt-avatar"></div>
                </el-col>
                <el-col :span="17" class="cmt-avatar-p"></el-col>
              </el-row>
              <p style="font-size: 0.8em;padding-top: 5px;color:white;">something</p>
            </el-col>
          </el-row>
        </li>
      </ul>
      <!-- </div> -->
      <!-- New Post Form -->
      <div class="postForm-wrapper" v-show="open">
        <el-form :model="postForm" class="postForm" v-if="userSession.displayname">
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
            <el-input v-model="postForm.date">{{ date() }}</el-input>
          </div>
          <editor v-model="postForm.content" class="editorText"></editor>
          <div class="postForm-buttons">
            <el-button type="success" class="postForm-buttons-post" @click="postConfirm">POST</el-button>
            <el-button type="info" class="postForm-buttons-cancel" @click="postCancel">CANCEL</el-button>
          </div>
        </el-form>
      </div>
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
        authorId: this.$store.store.state.userSession._id,
        avatar: this.$store.store.state.userSession.avatar,
        date: '',
        cmtId: '',
        views: 0,
        postCount: 1
      },
      allPosts: {},
      newData: {}
    }
  },
  created() {
    this.getallPosts()
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
      this.postForm.date = moment(date).format()
    },
    postCancel: function() {
      this.open = false
    },
    postConfirm: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/postContent',
        data: this.postForm
      })
        .then(rs => {
          this.allPosts = rs.data
          this.$message({
            type: 'success',
            message: 'Posted successfully'
          })
          this.open = false
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
        url: 'http://localhost:3000/getAllPostsViews'
      }).then(rs => {
        let cmtIds = []
        let nocmtIds = []
        this.allPosts = rs.data
        this.allPosts.forEach(data => {
          if (data.cmtId != '') {
            cmtIds.push(data.cmtId)
          } else {
            nocmtIds.push(data)
          }
        })
        axios({
          method: 'post',
          url: 'http://localhost:3000/getcmtinfo',
          data: cmtIds
        }).then(rs => {
          this.allPosts = rs.data.concat(nocmtIds)
          for (let i = 0; i < rs.data.concat(nocmtIds).length; i++) {
            if (this.allPosts[i].latestcmt) {
              this.allPosts[i].cmtAva = rs.data.concat(nocmtIds)[i].latestcmt.usercmtinfo.avatar
              this.allPosts[i].cmtName = rs.data.concat(nocmtIds)[i].latestcmt.usercmtinfo.displayname
              this.allPosts[i].cmtDate = rs.data.concat(nocmtIds)[i].latestcmt.date
              this.allPosts[i].cmtContent = rs.data.concat(nocmtIds)[i].latestcmt.content
              this.allPosts[i].cmtContentLength = rs.data.concat(nocmtIds)[i].latestcmt.content.length
            } else {
              i++
            }
          }
        })
      })
    },
    countClicks: function(index) {
      this.allPosts[index].views += 1
      let postid = this.allPosts[index]._id
      let clickno = this.allPosts[index].views
      axios({
        method: 'post',
        url: 'http://localhost:3000/countviews',
        data: [postid, clickno]
      }).then(() => {})
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
.postForm-wrapper {
  position: fixed;
  top: 9rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
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
  margin: 0 auto;
  width: 70%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backface-visibility: hidden;
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
.allPosts_title {
  color: #2c3e50 !important;
}
.allPosts_title h2:hover {
  color: #42b983;
}
.status__show {
  position: absolute;
  top: 15%;
  left: 15%;
}
</style>
