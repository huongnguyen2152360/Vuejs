<template>
  <div id="main">
    <main-header></main-header>
    <main-content></main-content>
  </div>
</template>
<script>
import MainHeader from '@/components/Header'
import MainContent from '@/components/Content'
export default {
  name: 'Main',
  components: {
      MainHeader: MainHeader,
      MainContent: MainContent
  },
  data() {
    return {}
  },
  created() {
    document.body.classList.add('no-margin')
  },
  destroyed() {
    document.body.classList.remove('no-margin')
  }
}
</script>
<style lang="scss" scoped>
#main {
  background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1920/f8d31d44523704b13367069081b5f380/photo-1544991337-95176b5233c4');
  height: 100%;
//   width:100%;
  position: fixed;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  background-position: 50%;
  background-size: cover;
  padding: 20px;
}
</style>




