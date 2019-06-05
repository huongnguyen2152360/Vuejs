<template>
  <div id="main-content">
    <div class="todo-create-board">
      <font-awesome-icon icon="plus-square" class="create-btn" @click="createBoard"></font-awesome-icon>
      <span>Create a new board</span>
    </div>
    <div class="boards" :key="index" v-for="(board, index) in boards">
      <div class="boards-board-created" :key="index" v-for="(board, index) in boards">
        <div class="board-created">
          <div class="board-created-header">
            <div class="board-header-title">
              <p @click="showBoardInput(board.id,index)" :id="board.id + 'p' + index">{{board.title}}</p>
              <b-form-input size="sm" v-model="boardTitle" placeholder="Your Board Title ..." :id="board.id + 'input' + index" class="board-header-title-input" @keyup.enter="updateBoard(board.id, index)"></b-form-input>
            </div>
            <font-awesome-icon icon="plus-square" class="create-todo-btn"></font-awesome-icon>
            <font-awesome-icon icon="minus-square" class="del-board-btn" @click="deleteBoard(board.id,index)"></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import { close } from 'fs'
export default {
  name: 'Content',
  data() {
    return {
      boards: [],
      boardTitle: ''
    }
  },
  mounted() {
    let self = this
    this.$http.get(config.api.getBoardList).then(res => {
      self.boards = res.body
    })
  },
  methods: {
    createBoard() {
      this.showBoard = true
      if (this.boardTitle.replace(/\s/g, '') == '') {
        this.boardTitle = 'My new board'
      }
      this.$http
        .post(config.api.createBoard, {
          title: this.boardTitle
        })
        .then(
          res => {
            this.boards.push(res.body)
          },
          err => {
            console.log(err.body)
          }
        )
    },
    deleteBoard(boardId, index) {
      this.$http.put(config.api.deleteBoard, {
        id: boardId
      })
      this.boards.splice(index, 1)
    },
    updateBoard(boardId,index) {
      document.getElementById(boardId + 'p' + index).style.display = 'flex'
      document.getElementById(boardId + 'input' + index).style.display = 'none'
      this.$http.post(config.api.updateBoard, {
        title: this.boardTitle,
        id: boardId
      }).then(res=> {
        console.log('updated')
      })
    },
    showBoardInput(boardId, index) {
      document.getElementById(boardId + 'p' + index).style.display = 'none'
      document.getElementById(boardId + 'input' + index).style.display = 'flex'
      document.getElementById(boardId + 'input' + index).focus()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang ="scss" scoped>
#main-content {
  overflow: scroll;
}
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
  .boards-board-created:not(:first-child) {
    margin-left: 20px;
  }
}
.board-created {
  height: 300px;
  width: 250px;
  background-color: #000000a6;
  margin-top: 20px;
  border-radius: 5px;
  padding: 15px;
  .board-created-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    .board-header-title {
      flex: 1;
      margin-right: 10px;
      p {
        margin-bottom: 0;
        padding: 4px;
      }
      .board-header-title-input {
        display: none;
      }
    }
    .create-todo-btn {
      color: gray;
      font-size: 1.5em;
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 0.3);
      }
    }
    .del-board-btn {
      color: gray;
      font-size: 1.5em;
      cursor: pointer;
      margin-left: 5px;
      &:hover {
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
