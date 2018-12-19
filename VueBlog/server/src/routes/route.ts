const Router = require('koa-router')
const router = new Router()
import UserController from '@/controllers/UserController'
import LoginController from '@/controllers/LoginController'
import * as bodyParser from 'koa-bodyparser'

router.post('/register', bodyParser(), UserController.createUser)
router.post('/login', bodyParser(), LoginController.loginUser)

export = router
