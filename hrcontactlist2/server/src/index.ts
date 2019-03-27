const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
import * as mongoose from 'mongoose'
import * as router from '@/routes/route'

mongoose.connect(
  'mongodb://huong:huongxinhgai1@ds131932.mlab.com:31932/heroku_xncl9mdz',
  { useNewUrlParser: true }
)

const app = new Koa()

app.use(cors());
app.use(router.routes()).use(router.allowedMethods())

app.use(async ctx => {
  ctx.body = 'Hello'
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Running in port 3000");
});
