<template>
  <div id="resetpass">
    <app-header></app-header>
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item>Reset Password</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- USER FORGOT PASS -->
      <el-row>
        <el-col :span="15" class="reset-form">
          <el-form ref="form" :model="userResetPassInfo" :rules="userResetPassRules">
            <el-form-item>
              <v-icon name="unlock" scale="4" class="reset-unlock"/>
              <h2 class="reset-title">Reset Password</h2>
              <p class="reset-text">You can reset your password here.</p>
            </el-form-item>
            <el-form-item prop="password" label="New Password">
              <el-input @keyup.enter.native="resetBtn" type="password" v-model="userResetPassInfo.password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="Confirm">
              <el-input @keyup.enter.native="resetBtn" type="password" v-model="userResetPassInfo.repassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="reset-cf" type="primary" @click="resetBtn">Change my Password</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9"></el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header'
export default {
  components: {
    appHeader: Header
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      }
      if (value.length < 3) {
        callback(new Error('Password must have at least 3 characters'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      }
      if (value !== this.userResetPassInfo.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      userResetPassInfo: {
        password: '',
        repassword: ''
      },
      userResetPassRules: {
        password: [{ required: true, validator: validatePass, trigger: 'change' }],
        repassword: [{ required: true, validator: validatePass2, trigger: 'change' }]
      }
    }
  },
  methods: {
    resetBtn: function() {
      let usrEmail = this.$route.params.email
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/resetChangePass',
        data: {
          ...this.userResetPassInfo,
          usrEmail
        }
      })
        .then(rs => {
          this.$store.store.commit('userSessionInfo', rs.data)
          this.$router.push('/')
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'New Password must be different!'
          })
        })
    }
  }
}
</script>

<style scoped>
.el-main {
  padding: 2rem 8rem;
}
.el-row {
  margin: 3rem 0;
}
.reset-form {
  background-color: #ebeef5;
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
}
.reset-unlock {
  width: 100%;
}
.reset-title {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0rem !important;
}
.reset-text {
  text-align: center;
  font-size: 1rem;
}
.reset-cf {
  margin-top: 1rem;
  font-size: 0.8rem;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.el-form-item__content {
  margin-left: 0 !important;
}
</style>