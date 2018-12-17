const Router = require('koa-router')
const router = new Router()
import UserController from '@/controllers/UserController'
import * as bodyParser from 'koa-bodyparser'

router.post('/users/register', bodyParser(), UserController.createUser)

export = router
