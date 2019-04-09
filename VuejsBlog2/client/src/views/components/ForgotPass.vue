<template>
  <div id="forgotpass">
    <app-header></app-header>
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item>Forgot Password</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- USER FORGOT PASS -->
      <el-row>
        <el-col :span="15" class="forgot-form">
          <el-form :ref="form" :model="userForgotPassInfo">
            <el-form-item>
              <v-icon name="lock" scale="4" class="forgot-lock"/>
              <h2 class="forgot-title">Forgot Password?</h2>
              <p class="forgot-text">You can reset your password here.</p>
            </el-form-item>
            <el-form-item prop="email" :rules="[{type: 'email', required: true, message: 'Please input correct email address', trigger: 'change'}]">
              <el-input @keyup.enter.native="forgotBtn" v-model="userForgotPassInfo.email" placeholder="abc@example.com"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="forgot-btn" @click="forgotBtn">Reset my Password</el-button>
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
  data() {
    return {
      userForgotPassInfo: {
        email: ''
      }
    }
  },
  methods: {
      forgotBtn: function() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/resetPassword',
          data: this.userForgotPassInfo
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Email sent! Please check your email for reset link.'
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
.forgot-form {
  background-color: #ebeef5;
  border-radius: 5px;
  padding: 2rem 2rem 1rem 2rem;
}
.forgot-lock {
  width: 100%;
}
.forgot-title {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 0rem !important;
}
.forgot-text {
  text-align: center;
  font-size: 1rem;
}
.forgot-btn {
    margin-top: 0.5rem;
    font-size: 1rem;
    width: 100%;
}
.el-form-item__content {
    margin-left: 0 !important;
}
</style>