var express = require('express')
var router = express.Router()
var BoardController = require('./boardController')

router.post('/create-board/', BoardController.createBoard)
router.get('/get-board-list/', BoardController.getBoardList)
router.put('/update-board/:id', BoardController.updateBoard)

module.exports = router