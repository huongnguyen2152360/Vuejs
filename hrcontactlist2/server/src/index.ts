const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
import * as mongoose from 'mongoose'
import * as router from '@/routes/route'

mongoose.connect(
  'mongodb://localhost:27017/hrcontactlist2',
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
