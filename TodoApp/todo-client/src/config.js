let baseUrl = process.env.VUE_APP_BASEURL
export default {
    baseUrl: baseUrl,
    api: {
        createBoard: `${baseUrl}/api/board/create-board`
    }
}