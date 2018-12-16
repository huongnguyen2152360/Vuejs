const Koa = require('koa')
const cors = require('@koa/cors')
import * as router from '@/routes/route'
const mongoose = require('mongoose')

const app = new Koa()

mongoose.connect(
  'mongodb://127.0.0.1:27017/vuejsblog',
  { useNewUrlParser: true }
)

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('Running Port 3000~~~')
