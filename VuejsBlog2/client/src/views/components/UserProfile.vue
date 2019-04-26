<template>
  <div id="userprofile">
    <app-header></app-header>
    <el-main>
      <el-row class="user-bg">
        <div class="user-avaname">
          <el-col :span="7" class="user-avatarr">
            <v-icon name="regular/dot-circle" scale="2" :class="['status__show', getClass()]"></v-icon>
            <img :src="userInfo.avatar" :alt="userInfo.displayname">
          </el-col>
          <el-col :span="17" class="user-displayname">
            <h1>{{userInfo.displayname}}</h1>
          </el-col>
        </div>
      </el-row>
      <div class="user-moreinfo">
        <el-row style="padding-bottom: 1rem">
          <el-col :span="7">
            <p>Displayname:</p>
          </el-col>
          <el-col :span="17">
            <p>{{userInfo.displayname}}</p>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="7">
            <p>Status:</p>
          </el-col>
          <el-col :span="17">
            <p>{{userSession.status}}</p>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="7">
            <p>Posts:</p>
          </el-col>
          <el-col :span="17">
            <p>{{userCmtPost.post}}</p>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="7">
            <p>Comments:</p>
          </el-col>
          <el-col :span="17">
            <p>{{userCmtPost.cmt}}</p>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="7">
            <p>Member:</p>
          </el-col>
          <el-col :span="17">
            <p>{{userTitle}}</p>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </div>
</template>

<script>
import Header from './Header'
import axios from 'axios'
export default {
  components: {
    appHeader: Header
  },
  data() {
    return {
      userInfo: {},
      userCmtPost: {
        post: '',
        cmt: ''
      },
      userTitle: ''
    }
  },
  created() {
    this.getUserProfile(), this.userAllPosts()
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  },
  methods: {
    getUserProfile: function() {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/getUserProfile',
        data: this.$route.params.id
      }).then(rs => {
        this.userInfo = rs.data
      })
    },
    userAllPosts: function() {
      axios({
        method: 'post',
        url: 'https://vuejsblog-server.herokuapp.com/userAllPosts',
        data: this.$route.params.id
      }).then(rs => {
        this.userCmtPost.post = rs.data.postCount
        this.userCmtPost.cmt = rs.data.cmtCount
        if (this.userCmtPost.post > 2) {
          this.userTitle = 'Active ✓'
        } else {
          this.userTitle = 'Just joined'
        }
      })
    },
    getClass: function() {
      if (this.$store.store.state.userSession.status == 'Online') {
        return 'status__online'
      }
      if (this.$store.store.state.userSession.status == 'Away') {
        return 'status__away'
      }
      if (this.$store.store.state.userSession.status == 'Do not disturb') {
        return 'status__disturb'
      }
      if (this.$store.store.state.userSession.status == 'Invisible') {
        return 'status__invisible'
      } else {
        return 'status__user'
      }
    }
  }
}
</script>

<style scoped>
.user-bg {
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
  height: 250px;
  position: relative;
}
.user-avaname {
  position: absolute;
  top: 40%;
}
.user-avatarr {
  padding-left: 5rem;
}
.user-avatarr img {
  width: 100%;
  border-radius: 50%;
}
.user-displayname {
  padding-left: 5rem;
  color: #ffffffd9;
}
.user-moreinfo {
  margin-top: 7rem;
}
.status__show {
  position: absolute;
  left: 10%;
  top: 10%;
}
</style>


