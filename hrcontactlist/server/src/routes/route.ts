var Router = require('koa-router')
var router = new Router()
import * as bodyParser from 'koa-bodyparser'
import ContactController from '@/controllers/ContactController'

router.post('/addContact', bodyParser(), ContactController.createUser)
router.get('/getContacts', ContactController.getAllContacts)
// Vi set gui ID tu client nen phai dung bodyParser()
router.post('/deleteContact', bodyParser(), ContactController.deleteContact)
export = router
