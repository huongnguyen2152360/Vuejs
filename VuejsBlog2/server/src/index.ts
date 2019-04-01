const Koa = require('koa')
const cors = require('@koa/cors')
import * as router from '@/routes/route'
import * as session from 'koa-session';
// import loginPassport from '@/routes/loginPassport'
const mongoose = require('mongoose')
// import UserController from '@/controllers/UserController'

const app = new Koa()

mongoose.connect(
  'mongodb://huongnguyen2152360:huong123@ds227146.mlab.com:27146/heroku_3qjm6q8c',
  { useNewUrlParser: true }
)

app.use(cors())
app.use(router.routes()).use(router.allowedMethods())
// app.use('/auth', loginPassport)
app.keys = ['my secret keyy'];
app.use(session(app))
app.use(async ctx => {
  ctx.body = 'Vuejs Blog Server'
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Running in port 3000");
});
