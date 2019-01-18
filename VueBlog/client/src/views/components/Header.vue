<template>
  <div id="header">
    <el-header>
      <el-row type="flex">
        <el-col :span="18">
          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <div class="logo">
                <router-link to="/">
                  <img src="https://cdn.worldvectorlogo.com/logos/stratis-strat-2.svg" alt="VueJs Blog" exact>
                </router-link>
              </div>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/" exact>
                <h2>VueJsBlog</h2>
              </router-link>
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
        <!-- Neu co userSession -->
        <el-col :span="6">
          <el-menu v-if="userSession.displayname" class="el-menu-demo2" mode="horizontal" @select="handleSelect">
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
            <el-submenu index="3" class="menu__avatar">
              <template slot="title">
                <div class="user-avatar">
                  <img :src="userSession.avatar" alt="user-avatar" v-if="userSession.avatar">
                  <img src="https://data.whicdn.com/images/50330982/large.jpg" alt="user-avatar" v-else>
                </div>
              </template>
              <el-menu-item index="3-1" class="menu__user-name">
                <v-icon name="regular/circle" class="status__user"></v-icon>{{userSession.displayname}}
              </el-menu-item>
              <el-menu-item index="3-2">
                <v-icon name="regular/circle" class="status__online"></v-icon>Online
              </el-menu-item>
              <el-menu-item index="3-3">
                <v-icon name="regular/circle" class="status__away"></v-icon>Away
              </el-menu-item>
              <el-menu-item index="3-4">
                <v-icon name="regular/circle" class="status__disturb"></v-icon>Do not disturb
              </el-menu-item>
              <el-menu-item index="3-5">
                <v-icon name="regular/circle" class="status__invisible"></v-icon>Invisible
              </el-menu-item>
              <el-menu-item index="3-6">
                <router-link to="/profile" style="margin:0" exact><v-icon name="regular/edit" class="user__edit"></v-icon>Edit Profile</router-link>
              </el-menu-item>
              <el-menu-item index="3-7" @click="userSignOut">
                <v-icon name="sign-out-alt" class="user__signout"></v-icon>Sign out
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- Khong co userSession -->
          <el-menu v-else class="el-menu-demo2" mode="horizontal">
            <el-menu-item index="1">
              <router-link to="/login" style="margin:0" exact>Login</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
export default {
  // props: ['user'],
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    userSignOut: function() {
      this.$store.store.state.userSession = {}
      this.$router.push('/')
    }
  }
}
</script>

<style>
.router-link {
  text-decoration: none;
}
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
.el-menu-demo2 {
  display: flex;
  justify-content: flex-end;
}
.el-menu-demo2 .is-active {
  border-bottom: none !important;
}
.newtopic-row {
  text-align: right;
}
.el-submenu__icon-arrow {
  display: none;
}
.menu__user-name {
  border-bottom: 1px solid #e9ecef;
}
.status__user,
.status__online,
.status__away,
.status__disturb,
.status__invisible,
.user__edit,
.user__signout {
  padding-right: 10px;
}
.status__online {
  color: #4caf50;
}
.status__away {
  color: #ff6d00;
}
.status__disturb {
  color: #f44336;
}
.status__invisible {
  color: #555;
}
.el-menu-item a {
  color: #909399;
}
.el-menu-item a:hover {
  color: #303133;
}
</style>