const Koa = require('koa')
const cors = require('@koa/cors')
import * as router from '@/routes/route'
import * as session from 'koa-session';
// import loginPassport from '@/routes/loginPassport'
const mongoose = require('mongoose')
// import UserController from '@/controllers/UserController'

const app = new Koa()

mongoose.connect(
  'mongodb://127.0.0.1:27017/vuejsblog',
  { useNewUrlParser: true }
)

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
// app.use('/auth', loginPassport)
app.keys = ['my secret keyy'];
app.use(session(app))


app.listen(3000)
console.log('Running Port 3000~~~')
