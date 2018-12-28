<template>
  <div id="appmain">
    <app-header></app-header>
    <el-main>
      <el-row>
        <el-col :span="24" class="newtopic-row">
          <el-button type="primary" class="newtopic-btn">New Topic</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="2">
              <div class="user-avatar">
                <img src="https://i.imgur.com/gdWIxn2.jpg" alt="user-avatar">
              </div>
            </el-col>
            <el-col :span="18">
              <h2>Blog Title</h2>
              <p class="main-tags">
                Tags •
                <span>2 days ago</span>
              </p>
            </el-col>
            <el-col :span="2" style="text-align:center">
              <h2 class="main-count">1</h2>
              <p class="main-tags">POSTS</p>
            </el-col>
            <el-col :span="2" style="text-align:center">
              <h2 class="main-count">3</h2>
              <p class="main-tags">VIEWS</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" :offset="1" class="main-cmts">
          <el-row class="cmt-line1">
            <el-col :span="5">
              <div class="cmt-avatar">
                <img src="https://i.pinimg.com/originals/ba/03/23/ba03237a6d6499f0e2633314826e1526.jpg" alt="cmt-avatar">
              </div>
            </el-col>
            <el-col :span="17" class="cmt-avatar-p">
              <p style="font-size: 0.9em">3 days ago</p>
            </el-col>
          </el-row>
          <p style="font-size: 0.8em;padding-top: 5px">Help me with this askdjfhkjwhar</p>
        </el-col>
      </el-row>
    </el-main>
  <p>{{ userSession.email }}</p>
  </div>
</template>

<script>
import Header from './Header'
export default {
  components: {
    appHeader: Header
  },
  computed: {
    userSession() {
      return this.$store.store.state.userSession
    }
  }
}
</script>

<style scope>
.newtopic-btn {
  margin-bottom: 2rem;
}
.user-avatar {
  width: 40px;
  height: 40px;
}
.user-avatar img,
.cmt-avatar img {
  border-radius: 50%;
  width: 100%;
}
.el-main {
  padding: 3rem 8rem;
}
h2,
p {
  margin: 0;
}
.main-tags {
  margin: 0;
  font-size: 0.8em;
}
.main-count {
  font-weight: normal;
}
.main-cmts {
  /* background-color: palevioletred; */
  border-left: 3px solid palevioletred;
  padding-left: 15px;
}
.cmt-avatar {
  width: 30px;
  height: 30px;
}
.cmt-avatar-p {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cmt-line1 {
  display: flex;
}
</style>
