<template>
  <div id="login">
    <el-main>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
        <el-breadcrumb-item>Login</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="12" class="login-left">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Username/Email">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Remember me?" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Login</el-button>
              <p>Forgot password?</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11" :offset="1" class="login-right">
            <h3>Alternative Logins</h3>
            <v-icon name="brands/facebook" scale="3" class="login-fb"/>
            <v-icon name="brands/github" scale="3" class="login-github"/>
            <v-icon name="brands/google-plus-square" scale="3" class="login-gg"/>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
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
.login-left, .login-right {
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
</style>