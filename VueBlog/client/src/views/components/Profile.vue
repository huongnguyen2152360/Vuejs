<template>
  <div id="profile">
    <app-header></app-header>
    <el-main>
      <el-row>
        <el-col :span="4">
          <div class="user-avatar">
            <img src="https://i.imgur.com/gdWIxn2.jpg" alt="user-avatar">
          </div>
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1" style="padding-top:1.5rem">
              <template slot="title">
                <span>Profile</span>
              </template>
              <el-menu-item index="1-1">My Profile</el-menu-item>
              <el-menu-item index="1-2">Edit Profile</el-menu-item>
              <el-menu-item index="1-3">Change Password</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <span>Posts</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20"></el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components: {
    appHeader: Header
  },
  methods: {
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-main {
  padding: 2rem 8rem;
}
.el-submenu__icon-arrow {
  display: block !important;
}
.user-avatar {
  width: 60px;
  height: 60px;
}
</style>