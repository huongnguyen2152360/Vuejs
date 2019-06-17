<template>
  <div id="content-todos">
    <div class="board-todo">
      <!-- :key="index" v-for="(todo,index) in todos" -->
      <!-- <p :id="todos.id + 'p' + index">{{todo.title}}</p> -->
      <b-form-textarea size="m" v-model="todoTitle" placeholder="Your todo title ..." :class="{'todo-title-input': true}" ></b-form-textarea>
      <div class="board-add-todo">
        <p class="add-todo-btn" @click="createTodo(boardId)">+ Add a new todo</p>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
export default {
  name: 'Todo',
  props: ['boardId'],
  data() {
    return {
      todoTitle: '',
      todos: []
    }
  },
//   mounted() {
//     let self = this
//     this.$https.get(config.api.getTodoList).then(res => {
//       self.todos = res.body
//       self.boards.sort(function(a, b) {
//         return a.id - b.id
//       })
//     })
//   },
  methods: {
    createTodo(boardId) {
    //   console.log(this.boardId)
    console.log(boardId);
    }
  }
}
</script>

<style lang="scss" scoped>
.board-todo {
  //   background-color: #fff;
  margin: 10px 0;
  .todo-title-input {
    height: 100px;
    display: none;
  }
  .board-add-todo {
    cursor: pointer;
    &:hover {
      background-color: rgba(9, 30, 66, 0.13);
      .add-todo-btn {
        color: #172b4d;
      }
    }
    .add-todo-btn {
      color: #6b778c;
    }
  }
}
.active {
    display: block !important;
}
</style>


