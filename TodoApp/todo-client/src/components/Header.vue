<template>
  <div id="main-header">
    <div class="logo">
      <font-awesome-icon icon="drumstick-bite" />
      <p>To Do App</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="scss" scoped>
#main-header {
  padding: 20px 0;
  background: rgba(0,0,0,.35)
}
.logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    margin:0;
    padding-left: 10px;
  }
}
</style>
