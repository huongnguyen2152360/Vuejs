<template>
  <div id="app">
    <el-header>
      <el-row type="flex">
        <el-col :span="18">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <div class="logo">
                <img src="https://cdn.worldvectorlogo.com/logos/stratis-strat-2.svg" alt="VueJs Blog">
              </div>
            </el-menu-item>
            <el-menu-item index="2">
              <h2>VueJsBlog</h2>
            </el-menu-item>
            <el-menu-item index="3">
              <el-tooltip class="item" effect="dark" content="Categories" placement="bottom">
                <i class="el-icon-menu"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="4">
              <el-tooltip class="item" effect="dark" content="Recent" placement="bottom">
                <i class="el-icon-time"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="5">
              <el-tooltip class="item" effect="dark" content="Unread" placement="bottom">
                <i class="el-icon-document"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="6">
              <el-tooltip class="item" effect="dark" content="Tags" placement="bottom">
                <i class="el-icon-menu"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="7">
              <el-tooltip class="item" effect="dark" content="Popular" placement="bottom">
                <i class="el-icon-menu"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="8">
              <el-tooltip class="item" effect="dark" content="Users" placement="bottom">
                <i class="el-icon-menu"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="9">
              <el-tooltip class="item" effect="dark" content="Groups" placement="bottom">
                <i class="el-icon-menu"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="10">
              <el-tooltip class="item" effect="dark" content="Search" placement="bottom">
                <i class="el-icon-search"></i>
              </el-tooltip>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6">
          <el-menu class="el-menu-demo2" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <el-tooltip class="item" effect="dark" content="Notifications" placement="bottom">
                <i class="el-icon-bell"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="2">
              <el-tooltip class="item" effect="dark" content="Messages" placement="bottom">
                <i class="el-icon-message"></i>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="3">
              <div class="user-avatar">
                <img src="https://i.imgur.com/gdWIxn2.jpg" alt="user-avatar">
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="newtopic-row">
          <el-button type="primary" class="newtopic-btn">New Topic</el-button>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '100'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style>
.el-header {
  padding: 0 8rem;
}
.logo {
  width: 50px;
  height: 50px;
}
.logo img {
  width: 100%;
}
.el-menu-item {
  padding: 0 15px;
}
.user-avatar {
  width: 40px;
  height: 40px;
}
.user-avatar img {
  width: 100%;
  border-radius: 50%;
}
.newtopic-btn {
  margin-top: 2rem;
  margin-right: 0;
}
.el-menu-demo2 {
  display: flex;
  justify-content: flex-end;
}
.newtopic-row {
  text-align: right;
}
</style>