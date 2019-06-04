<template>
  <div id="main-content">
    <div class="todo-create-board">
      <font-awesome-icon icon="plus-square" class="create-btn"></font-awesome-icon>
      <span>Create a new board</span>
    </div>
    <div class="boards">
      <div class="board-created">
        <div class="board-created-header">
          <div class="board-header-title">
            <b-form-input size="sm" v-model="boardTitle" placeholder="Your Board Title ..." @keyup.enter="createBoard" v-if="!showBoardTitle" v-click-outside="createBoard"></b-form-input>
            <p v-if="showBoardTitle" @click="showBoardInput">{{boardTitle}}</p>
          </div>
          <font-awesome-icon icon="plus-square" class="create-todo-btn"></font-awesome-icon>
        </div>
      </div>
      <div class="board-created">
        <div class="board-created-header">
          <div class="board-header-title">
            <p>Title</p>
          </div>
          <font-awesome-icon icon="plus-square" class="create-todo-btn"></font-awesome-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
export default {
  name: 'Content',
  data() {
    return {
      boardTitle: '',
      showBoardTitle: false
    }
  },
  methods: {
    createBoard() {
      this.showBoardTitle = true
      this.$http.post(config.api.createBoard, {
        title: this.boardTitle
      })
    },
    showBoardInput() {
      this.showBoardTitle = false
    }
  }
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
    margin: 20px 0;
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
}
.boards {
  display: flex;
  flex-direction: row;
  align-items: center;
  .board-created:not(:first-child) {
    margin-left: 20px;
  }
}
.board-created {
  height: 300px;
  width: 200px;
  background-color: #000000a6;
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px;
  .board-created-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    .board-header-title {
      flex: 1;
      margin-right: 10px;
    }
    .create-todo-btn {
      color: gray;
      font-size: 1.5em;
      cursor: pointer;
    }
  }
}
</style>
