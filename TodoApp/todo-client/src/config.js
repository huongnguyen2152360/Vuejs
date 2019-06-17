let baseUrl = process.env.VUE_APP_BASEURL
export default {
    baseUrl: baseUrl,
    api: {
        createBoard: `${baseUrl}/api/board/create-board/`,
        getBoardList: `${baseUrl}/api/board/get-board-list/`,
        updateBoard: `${baseUrl}/api/board/update-board/`,
        getTodoList: `${baseUrl}/api/todo/get-todo-list`
    }
}