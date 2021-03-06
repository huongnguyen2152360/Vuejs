const Koa = require('koa')
const cors = require('@koa/cors')
const passport = require('passport')
import * as router from '@/routes/route'
import * as session from 'koa-session';
const mongoose = require('mongoose')

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
app.use(passport.initialize())
app.use(passport.session());

app.listen(process.env.PORT || 3000, function(){
  console.log("Running in port 3000");
});
