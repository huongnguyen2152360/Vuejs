var express = require('express')
var router = express.Router()
var BoardController = require('./boardController')
// var bodyParser = require('body-parser')

router.post('/create-board/', BoardController.createBoard)
router.get('/get-board-list/', BoardController.getBoardList)
router.put('/delete-board/', BoardController.deleteBoard)
router.put('/update-board/', BoardController.updateBoard)

module.exports = router