var Router = require('koa-router')
var router = new Router()
import * as bodyParser from 'koa-bodyparser'
import ContactController from '@/controllers/ContactController'

router.post('/addContact', bodyParser(), ContactController.createUser)

export = router
