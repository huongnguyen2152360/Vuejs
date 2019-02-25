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
              <el-input v-model="userEdit.displayname"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email" :rules="[
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]" class="profile_form-label">
              <el-input v-model.lazy="userEdit.email" placeholder="abc@example.com"></el-input>
            </el-form-item>
            <el-form-item :rules="[
      { type: 'url', message: 'Please input correct URL to your image', trigger: ['blur', 'change'] }
    ]" label="Avatar" class="profile_form-label">
              <el-input v-model.lazy="userEdit.avatar" placeholder="https://example.com"></el-input>
            </el-form-item>
            <el-button class="profile-saveBtn" type="primary" plain @click="userEditProfile">Save</el-button>
          </el-form>
        </el-tab-pane>
        <!-- CHANGE PASSWORD -->
        <el-tab-pane label="Change Password">
          <h3 class="profile-header">Change Password</h3>
          <el-form :model="userEditPass" status-icon :rules="rulesPass" ref="userEditPass" class="demo-ruleForm">
            <el-form-item label="New Password" prop="pass" class="profile_form-label">
              <el-input type="password" v-model="userEditPass.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="checkPass" class="profile_form-label">
              <el-input type="password" v-model="userEditPass.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-button class="profile-saveBtn" type="primary" plain @click="userEditPassBtn">Save</el-button>
          </el-form>
        </el-tab-pane>
        <!-- POSTS -->
        <el-tab-pane label="Posts">
          <h3 class="profile-header">Your Posts</h3>
          <!-- :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" -->
          <el-table style="width: 100%" :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))">
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Content" prop="content"></el-table-column>
            <el-table-column label="Tags" prop="tags"></el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope" @click="something(scope.$index, scope.row)">
                <el-input v-model="search" size="mini" placeholder="Type to search"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row), dialogFormVisible=true">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- MESSAGE BOX FORM -->
      <el-dialog title="Edit Form" :visible.sync="dialogFormVisible">
        <el-form :data="editPost">
          <el-form-item label="Title" label-width="40px">
            <el-input autocomplete="off" v-model="editPost.title"></el-input>
          </el-form-item>
          <el-form-item label="Tags" label-width="40px">
            <el-select v-model="editPost.tags" placeholder="Select one tag">
              <el-option label="General" value="General"></el-option>
              <el-option label="Support" value="Support"></el-option>
              <el-option label="Language" value="Language"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <editor v-model="editPost.content" class="editorText"></editor>
          </el-form-item>
          <div class="editForm-hidden">
            <!-- new date -->
            <el-input v-model="editPost.date"></el-input>
            <el-input v-model="editPost.authorId"></el-input>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="cfEditBtn(),dialogFormVisible = false">Confirm</el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor } from '@toast-ui/vue-editor'
import axios from 'axios'
import Header from './Header'
import moment from 'moment'
import { clearTimeout, clearInterval, clearImmediate } from 'timers'
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
      dialogFormVisible: false,
      editPost: {}
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
      axios({
        method: 'post',
        url: 'http://localhost:3000/editProfile',
        data: {
          id: this.userSession._id,
          ...this.userEdit
        }
      }).then(rs => {
        this.$store.store.commit('userSessionInfo', rs.data)
      })
    },
    userEditPassBtn: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/changePassword',
        data: {
          id: this.userSession._id,
          password: this.userEditPass.pass
        }
      })
        .then(rs => {
          this.$message({
            type: 'success',
            message: 'Password changed successfully'
          })
          this.$store.store.commit('userSessionInfo', rs.data)
          this.$refs.userEditPass.resetFields()
        })
        .catch(error => {
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
        url: 'http://localhost:3000/getPostsProfile',
        data: this.userSession._id
      }).then(rs => {
        this.tableData = rs.data
        this.tableData.forEach(data => {
          if (data.content.length > 100) {
            data.content = data.content.substring(0, 80) + ' ...'
          } else {
            return
          }
        })
        // console.log(this.tableData[0].content.substring(0,100));
      })
    },
    moment: function(date) {
      return moment(date)
    },
    date: function(date) {
      return moment(date).format()
    },
    handleEdit(index, row) {
      this.editPost = row
      this.editPost.date = this.date(this.tableData.date)
    },
    cfEditBtn: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/editPost',
        data: this.editPost
      }).then(() => {
        if (this.editPost.content.length > 100) {
          this.editPost.content = this.editPost.content.substring(0, 80) + ' ...'
        } else {
          return
        }
        this.$message({
          type: 'success',
          message: 'Post edited successfully'
        })
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    something(index, row) {
      return
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
.editForm-hidden {
  display: none;
}
</style>