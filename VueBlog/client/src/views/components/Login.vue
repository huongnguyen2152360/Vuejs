<template>
  <div id="login">
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item>Login</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="12" class="login-left">
          <el-form ref="form" :model="userInfo" label-width="120px" v-if="seen">
            <el-form-item label="Display Name">
              <el-input v-model="userInfo.displayname"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input type="email" v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm">
              <el-input type="password" v-model="userInfo.repassword"></el-input>
            </el-form-item>
            <el-form-item label="Avatar" class="needtohide">
              <el-input v-model="userInfo.avatar"></el-input>
            </el-form-item>
            <el-form-item label="ID" class="needtohide">
              <el-input v-model="userInfo.id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userRegister">REGISTER</el-button>
              <p @click="loginShow" class="memberCf">Already a member?</p>
              <!-- <p>Forgot password?</p> -->
            </el-form-item>
          </el-form>
          <el-form ref="form" :model="userLoginInfo" label-width="120px" v-else>
            <el-form-item label="Email">
              <el-input type="email" v-model="userLoginInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="userLoginInfo.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userLogin">LOGIN</el-button>
              <p @click="registerShow" class="memberCf">Not a member?</p>
              <!-- <p>Forgot password?</p> -->
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
      <!-- <el-row>
        <el-col :span="24">
          <ul>
            <li v-for="user in userSession" :key="user">
              <p>{{ user }}</p>
            </li>
          </ul>
        </el-col>
      </el-row> -->
    </el-main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    userSession() {
      console.log(this.$store.store.state.userSession) 
      // this.$store.store.state.userSession = userForSession
      // console.log(userForSession)
      // this.$emit('userDangNhap', userForSession)
    }
  },
  data() {
    return {
      userInfo: {},
      seen: true,
      userLoginInfo: {}
    }
  },
  methods: {
    userRegister: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/register',
        data: this.userInfo
      }).then(rs => {
        window.location = '/'
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
          this.$store.store.state.userSession = rs.data
          // window.location = '/'

          
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: 'Incorrect Password!'
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
}
.needtohide {
  display: none;
}
</style>