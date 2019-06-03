<template>
  <div id="main-content">
    <div class="todo-create-board">
      <font-awesome-icon icon="plus-square" class="create-btn"></font-awesome-icon>
      <span>Create a new board</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="scss" scoped>
.todo-create-board {
  display: flex;
  align-items: center;
  span {
    padding-left: 5px;
  }
  .create-btn {
    font-size: 2em;
    color: hsla(0, 0%, 100%, 0.3);
    cursor: pointer;
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
