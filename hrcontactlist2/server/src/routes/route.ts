var Router = require('koa-router');
var router = new Router();
import * as bodyParser from 'koa-bodyparser'
import ContactController from '@/controllers/ContactController'

router.post('/addContact', bodyParser(), ContactController.addContact)
router.get('/getContacts', ContactController.getAllContacts)
router.post('/deleteContact', bodyParser(), ContactController.deleteContact)

export = router