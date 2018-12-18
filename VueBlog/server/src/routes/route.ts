const Router = require('koa-router')
const router = new Router()
import UserController from '@/controllers/UserController'
import * as bodyParser from 'koa-bodyparser'

router.post('/register', bodyParser(), UserController.createUser)
router.post('/getUser', bodyParser(), UserController.findUser)

export = router
