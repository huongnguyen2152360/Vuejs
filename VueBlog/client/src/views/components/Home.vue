<template>
  <div id="appmain">
    <app-header></app-header>
    <el-main>
      <el-row>
        <el-col :span="24" class="newtopic-row">
          <el-button type="primary" class="newtopic-btn" @click="open=!open">New Topic</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="2">
              <div class="user-avatar">
                <img src="https://i.imgur.com/gdWIxn2.jpg" alt="user-avatar">
              </div>
            </el-col>
            <el-col :span="18">
              <h2>Blog Title</h2>
              <p class="main-tags">
                Tags •
                <span>2 days ago</span>
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
      <el-form :model="postForm" v-show="open" class="postForm">
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
export default {
  components: {
    appHeader: Header,
    editor: Editor
  },
  data() {
    return {
      open: true,
      postForm: {}
    }
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  },
  methods: {
    postCancel: function() {
      console.log('Cancel button')
    },
    postConfirm: function() {
      console.log('Post confirm button')
    }
  }
}
</script>

<style scope>
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
.postForm-title-input {
  width: 90% !important;
}
.postForm {
  background-color: #419efb1a;
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
  margin-top: 3rem;
}
.postForm .el-form-item__label {
  font-size: 0.9rem;
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
</style>
