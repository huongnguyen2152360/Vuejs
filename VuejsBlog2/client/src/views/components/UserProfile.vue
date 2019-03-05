<template>
  <div id="userprofile">
    <app-header></app-header>
    <el-main>
      <el-row class="user-bg">
        <div class="user-avaname">
          <el-col :span="7" class="user-avatarr">
            <img :src="userInfo.avatar" :alt="userInfo.displayname">
          </el-col>
          <el-col :span="17" class="user-displayname">
            <h1>{{userInfo.displayname}}</h1>
          </el-col>
        </div>
      </el-row>
      <el-row>
         <el-col :span="7" >
           
          </el-col>
          <el-col :span="17" >
            
          </el-col>
      </el-row>
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
      userInfo: {}
    }
  },
  created() {
    this.getUserProfile(),
    this.getUserPostCmt()
  },
  methods: {
    getUserProfile: function() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/getUserProfile',
        data: this.$route.params.id
      }).then(rs => {
        this.userInfo = rs.data
      })
    },
    getUserPostCmt: function() {
        axios({
            method:'post',
            url: 'http://localhost:3000/getUserPostCmt',
            data: this.$route.params.id
        }).then(rs => {
            console.log(rs.data);
        })
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
  height: 50vh;
  border-radius: 50%;
}
.user-displayname {
  padding-left: 5rem;
  color: #ffffffd9;
}
</style>


