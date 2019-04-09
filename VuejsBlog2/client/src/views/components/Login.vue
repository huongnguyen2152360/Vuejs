<template>
  <div id="login">
    <app-header></app-header>
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item>Login</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- USER REGISTER -->
      <el-row>
        <el-col :span="12" class="login-left">
          <el-form ref="form" :model="userInfo" label-width="120px" v-if="seen" :rules="userInfoRules" :validate-on-rule-change="false">
            <el-form-item prop="displayname" label="Display Name">
              <el-input @keyup.enter.native="userRegister" v-model="userInfo.displayname" placeholder="Huong Nguyen"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input @keyup.enter.native="userRegister" type="email" v-model="userInfo.email" placeholder="abc@example.com"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Password">
              <el-input @keyup.enter.native="userRegister" type="password" v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="Confirm">
              <el-input @keyup.enter.native="userRegister" type="password" v-model="userInfo.repassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userRegister">REGISTER</el-button>
              <p @click="loginShow" class="memberCf">Already a member? LOGIN here</p>
            </el-form-item>
          </el-form>
          <!-- USER LOGIN -->
          <el-form ref="form" :model="userLoginInfo" label-width="120px" v-else :rules="userLoginInfoRules" :validate-on-rule-change="false">
            <el-form-item prop="email" label="Email">
              <el-input @keyup.enter.native="userLogin" type="email" v-model="userLoginInfo.email" placeholder="abc@example.com"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Password">
              <el-input @keyup.enter.native="userLogin" type="password" v-model="userLoginInfo.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userLogin">LOGIN</el-button>
              <p @click="registerShow" class="memberCf">Not a member? JOIN US here</p>
              <p @click="forgotPass" class="memberCf">Forgot password?</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11" :offset="1" class="login-right">
          <h3>Alternative Logins</h3>
          <a href="http://localhost:3000/auth/login/facebook">
            <v-icon name="brands/facebook" scale="3" class="login-fb"/>
          </a>
          <v-icon name="brands/github" scale="3" class="login-github"/>
          <v-icon name="brands/google-plus-square" scale="3" class="login-gg"/>
        </el-col>
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
      if (value !== this.userInfo.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      userInfo: {
        displayname: '',
        email: '',
        password: '',
        repassword: '',
        avatar: '',
        id: ''
      },
      userInfoRules: {
        displayname: [{ required: true, trigger: 'change' }],
        email: [{ type: 'email', required: true, message: 'Please input correct email address', trigger: 'change' }],
        password: [{ required: true, validator: validatePass, trigger: 'change' }],
        repassword: [{ required: true, validator: validatePass2, trigger: 'change' }]
      },
      seen: true,
      userLoginInfo: {
        email: '',
        password: ''
      },
      userLoginInfoRules: {
        email: [{ type: 'email', required: true, message: 'Please input correct email address', trigger: 'change' }],
        password: [{ required: true, message: 'Please input your password', trigger: 'change' }]
      }
    }
  },
  methods: {
    userRegister: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: { ...this.userInfo }
      })
        .then(rs => {
          this.$store.store.commit('userSessionInfo', rs.data)
          this.$router.push('/')
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'User existed. Please join us with a different email!'
          })
        })
    },
    loginShow: function() {
      this.seen = false
    },
    registerShow: function() {
      this.seen = true
    },
    userLogin: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: this.userLoginInfo
      })
        .then(rs => {
          this.$store.store.commit('userSessionInfo', rs.data)
          this.$router.push('/')
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'Incorrect Email or Password!'
          })
        })
    },
    forgotPass: function() {
      this.$router.push('/forgotpass')
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
.login-left,
.login-right {
  background-color: #ebeef5;
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
}
.login-fb {
  color: #3b5998;
  padding-right: 0.5rem;
}
.login-github {
  color: #337ab7;
  padding-right: 0.5rem;
}
.login-gg {
  color: #df5138;
}
.memberCf {
  cursor: pointer;
  text-align: center;
}
.memberCf:hover {
  color: #409eff;
}
.el-button--primary {
  width: 100%;
  margin-top: 1rem;
}
</style>