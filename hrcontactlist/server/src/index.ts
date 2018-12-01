const Koa = require('koa')
import * as mongoose from 'mongoose'
import * as router from '@/routes/route'
const cors = require('@koa/cors');
mongoose.connect(
  'mongodb://localhost:27017/contactlist',
  { useNewUrlParser: true }
)

const app = new Koa()

app.use(cors());
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)
console.log('sever is running is port 3000')
