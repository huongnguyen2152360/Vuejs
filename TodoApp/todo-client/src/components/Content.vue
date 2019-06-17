<template>
  <div id="main-content">
    <div class="todo-create-board">
      <font-awesome-icon icon="plus-square" class="create-btn" @click="createBoard"></font-awesome-icon>
      <span>Create a new board</span>
    </div>
    <div class="boards">
      <div class="boards-board-created" :key="index" v-for="(board, index) in boards">
        <div class="board-created">
          <div class="board-created-header">
            <div class="board-header-title">
              <p @click="showBoardInput(board,index)" :id="board.id + 'p' + index" :class="['board-header-title-p', 'show-board-title',(something == 'showTitle' + index ? 'active' : 'unactive') ]">{{board.title}}</p>
              <b-form-input size="sm" v-model="boardTitle" placeholder="Your board title ..." :id="board.id + 'input' + index" :class="['board-header-title-input',(something == 'showInput' + index ? 'active' : 'unactive') ]" @keyup.enter="updateBoard(board,index)"></b-form-input>
            </div>
            <font-awesome-icon icon="plus-square" class="create-todo-btn" @click="createTodo(board,index)"></font-awesome-icon>
            <font-awesome-icon icon="minus-square" class="del-board-btn" @click="deleteBoard(board.id,index)"></font-awesome-icon>
          </div>
          <div class="board-content">
            <Todo :boardId="board.id"></Todo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import Todo from './Todo'
export default {
  name: 'Content',
  components: {
    Todo: Todo
  },
  data() {
    return {
      boards: [],
      boardTitle: '',
      something: ''
    }
  },
  mounted() {
    let self = this
    this.$http.get(config.api.getBoardList).then(res => {
      self.boards = res.body
      self.boards.sort(function(a, b) {
        return a.id - b.id
      })
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
      this.$http.put(config.api.updateBoard + boardId, {
        deleted: true
      })
      this.boards.splice(index, 1)
    },
    updateBoard(board, index) {
      this.something == 'showTitle' + index
      console.log('show title',this.something)
      let self = this
      this.$http
        .put(config.api.updateBoard + board.id, {
          title: self.boardTitle
        })
        .then(
          res => {
            return res.body
          },
          err => {
            return err.body
          }
        )
      board.title = this.boardTitle
      this.boards.sort(function(a, b) {
        return a.id - b.id
      })
    },
    showBoardInput(board, index) {
      document.getElementById(board.id + 'p' + index).classList.remove('show-board-title')
      // document.getElementById(board.id + 'input' + index).style.display = 'flex'
      // document.getElementById(board.id + 'input' + index).focus()
      this.something = 'showInput' + index
      console.log('show input',this.something)
      this.boardTitle = board.title
    },
    // createTodo(board, index) {

    // }
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
  width: 280px;
  background-color: #dfe1e6;
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
      width: 55%;
      .board-header-title-p {
        margin-bottom: 0;
        padding: 4px;
        margin-bottom: 0;
        padding: 4px;
        color: #172b4d;
        text-transform: uppercase;
        font-weight: 500;
      }
      .show-board-title {
        display: block;
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
.active {
  display: block !important;
}
.unactive {
  display: none;
}
</style>
