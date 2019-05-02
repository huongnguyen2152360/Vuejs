<template>
  <div id="profile" v-if="userSession.displayname">
    <app-header></app-header>
    <el-main>
      <el-tabs :tab-position="tabPosition" class="tab-menu">
        <el-tab-pane label="Profile">
          <!-- YOUR PROFILE -->
          <h3 class="profile-header">Your Profile</h3>
          <div class="user-avatar__profile">
            <img :src="userSession.avatar">
          </div>
          <h5>Display Name</h5>
          <p>{{userSession.displayname}}</p>
          <h5>Email</h5>
          <p>{{userSession.email}}</p>
        </el-tab-pane>
        <!-- EDIT PROFILE -->
        <el-tab-pane label="Edit Profile">
          <h3 class="profile-header">Edit Profile</h3>
          <p style="display:none">{{userSession._id}}</p>
          <el-form ref="form" :model="userEdit">
            <el-form-item label="Display Name" class="profile_form-label">
              <el-input @keyup.enter.native="userEditProfile" v-model="userEdit.displayname"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email" :rules="[
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]" class="profile_form-label">
              <el-input @keyup.enter.native="userEditProfile" v-model.lazy="userEdit.email" placeholder="abc@example.com"></el-input>
            </el-form-item>
            <el-form-item :rules="[
      { type: 'url', message: 'Please input correct URL to your image', trigger: ['blur', 'change'] }
    ]" label="Avatar" class="profile_form-label">
              <el-input @keyup.enter.native="userEditProfile" v-model.lazy="userEdit.avatar" placeholder="https://example.com"></el-input>
            </el-form-item>
            <el-button class="profile-saveBtn" type="primary" plain v-show="saveBtn1" @click="userEditProfile">Save</el-button>
            <el-button class="profile-saveBtn" type="primary" plain :loading="true" v-show="saveBtn2" style="margin-left:0;" @click="userEditProfile2">Save</el-button>
          </el-form>
        </el-tab-pane>
        <!-- CHANGE PASSWORD -->
        <el-tab-pane label="Change Password">
          <h3 class="profile-header">Change Password</h3>
          <el-form :model="userEditPass" status-icon :rules="rulesPass" ref="userEditPass" class="demo-ruleForm">
            <el-form-item label="New Password" prop="pass" class="profile_form-label">
              <el-input @keyup.enter.native="userEditPassBtn" type="password" v-model="userEditPass.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="checkPass" class="profile_form-label">
              <el-input @keyup.enter.native="userEditPassBtn" type="password" v-model="userEditPass.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-button class="profile-saveBtn" type="primary" plain v-show="savePass1" @click="userEditPassBtn">Save</el-button>
            <el-button type="primary" plain :loading="true" v-show="savePass2" style="margin-left:0;" @click="userEditPassBtn2">Save</el-button>
          </el-form>
        </el-tab-pane>
        <!-- POSTS -->
        <el-tab-pane label="Posts">
          <h3 class="profile-header">Your Posts</h3>
          <el-table :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" style="width: 100%;">
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Content" prop="content"></el-table-column>
            <el-table-column label="Tags" prop="tags"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-input v-model="search" size="mini" placeholder="Type to search"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="editPostBtn(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="delPostBtn(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- EDIT/DELETE POST -->
      <div class="editPostForm-wrapper" v-show="open">
        <el-form :model="editPostForm" class="editPostForm">
          <p>Edit Post</p>
          <el-form-item label="Title">
            <el-input v-model="editPostForm.title" :placeholder="editPostForm.title"></el-input>
          </el-form-item>
          <el-form-item label="Tags">
            <el-select v-model="editPostForm.tags" placeholder="Select one tag">
              <el-option label="General" value="General"></el-option>
              <el-option label="Support" value="Support"></el-option>
              <el-option label="Language" value="Language"></el-option>
            </el-select>
          </el-form-item>
          <div class="editPostForm-hidden">
            <el-input v-model="editPostForm.date">{{ date() }}</el-input>
          </div>
          <editor v-model="editPostForm.content" class="editPostForm-editor"></editor>
          <div class="editPostForm-buttons">
            <el-button type="success" class="editPostForm-buttons-post" @click="editpostConfirm">POST</el-button>
            <el-button type="info" class="editPostForm-buttons-cancel" @click="editpostCancel">CANCEL</el-button>
          </div>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header'
import { clearTimeout } from 'timers'
import moment from 'moment'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor } from '@toast-ui/vue-editor'

export default {
  components: {
    appHeader: Header,
    editor: Editor
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.userEditPass.checkPass !== '') {
          this.$refs.userEditPass.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.userEditPass.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      tabPosition: 'left',
      userEdit: {},
      userEditPass: {
        pass: '',
        checkPass: ''
      },
      rulesPass: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      search: '',
      tableData: [],
      editPostForm: {
        date: ''
      },
      open: false,
      saveBtn1: true,
      saveBtn2: false,
      savePass1: true,
      savePass2: false
    }
  },
  created() {
    this.getTableData()
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  },
  methods: {
    userEditProfile: function() {
      this.saveBtn1 = false
      this.saveBtn2 = true
      this.userEditProfile2()
    },
    userEditProfile2: function() {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/editProfile',
        data: {
          id: this.userSession._id,
          ...this.userEdit
        }
      }).then(rs => {
        this.saveBtn1 = true
        this.saveBtn2 = false
        this.$store.store.commit('userSessionInfo', rs.data)
        this.$message({
          type: 'success',
          message: 'Profile updated successfully'
        })
      })
    },
    userEditPassBtn: function() {
      this.savePass1 = false
      this.savePass2 = true
      this.userEditPassBtn2()
    },
    userEditPassBtn2: function() {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/changePassword',
        data: {
          id: this.userSession._id,
          password: this.userEditPass.pass
        }
      })
        .then(rs => {
          this.savePass1 = true
          this.savePass2 = false
          this.$message({
            type: 'success',
            message: 'Password changed successfully'
          })
          this.$store.store.commit('userSessionInfo', rs.data)
          this.$refs.userEditPass.resetFields()
        })
        .catch(error => {
          this.savePass1 = true
          this.savePass2 = false
          this.$message({
            type: 'error',
            message: 'New password must be different'
          })
          this.$refs.userEditPass.resetFields()
        })
    },
    getTableData: function() {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/getPostsProfile',
        data: this.userSession._id
      }).then(rs => {
        this.tableData = rs.data
        this.tableData.forEach(post => {
          if (post.content.length >= 50) {
            post.content = post.content.substring(0, 50) + ' ...'
          }
          if (post.title.length >= 30) {
            post.title = post.title.substring(0, 30) + ' ...'
          }
        })
      })
    },
    moment: function(date) {
      return moment(date)
    },
    date: function(date) {
      this.editPostForm.date = moment(date).format()
    },
    editPostBtn: function(index, row) {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/getPostsProfile',
        data: this.userSession._id
      }).then(rs => {
        this.editPostForm = rs.data[index]
        this.editPostForm.index = index
      })
      this.open = true
    },
    delPostBtn: function(index, row) {
      this.$confirm('This will permanently delete the post. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          axios({
            method: 'post',
            url: 'https://vuejsblog-server.herokuapp.com/deletePostProfile',
            data: row._id
          }).then(() => {
            this.tableData.splice(index, 1)
            this.$message({
              type: 'success',
              message: 'Post deleted!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    },
    editpostConfirm: function() {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/editPostProfile',
        data: this.editPostForm
      }).then(rs => {
        this.tableData[this.editPostForm.index] = rs.data
        this.tableData.forEach(post => {
          if (post.content.length >= 50) {
            post.content = post.content.substring(0, 50) + ' ...'
          }
          if (post.title.length >= 30) {
            post.title = post.title.substring(0, 30) + ' ...'
          }
        })
        this.open = false
        this.$message({
          type: 'success',
          message: 'Post edited!'
        })
      })
    },
    editpostCancel: function() {
      this.open = false
      this.$message({
          type: 'info',
          message: 'Edit cancelled!'
        })
    }
  }
}
</script>

<style>
.el-main {
  padding: 2rem 8rem;
}
.user-avatar__profile {
  width: 90px;
  height: 90px;
  margin-bottom: 1rem;
}
.user-avatar__profile img {
  width: 100%;
  /* border-radius: 50%; */
}
.el-tabs__item {
  padding: 0px 50px;
  font-weight: normal;
  font-size: 1rem;
}
.el-tabs__content {
  padding-left: 3rem;
}
.profile-header {
  margin-top: 0;
  padding-bottom: 1rem;
}
.tab-menu {
  padding-top: 2rem;
}
.tab-menu h5 {
  color: #909399;
  margin-bottom: 0;
}
.tab-menu p {
  padding-top: 0.5rem;
}
.profile_form-label .el-form-item__label {
  color: #909399;
  font-weight: bold;
}
.el-form-item__error {
  padding-top: 0.5rem;
  font-size: 0.8rem;
}
.profile-saveBtn {
  margin-top: 1rem;
}
.editPostForm-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.editPostForm {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
  width: 40%;
  margin: 7rem auto 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backface-visibility: hidden;
}
.editPostForm-hidden {
  display: none;
}
.editPostForm-editor {
  height: 400px !important;
}
.editPostForm-buttons {
  margin-top: 0.5rem;
}
</style>