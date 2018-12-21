import { Context } from 'koa'
import UserModel from '@/models/UserModel'
// import * as session from 'koa-session'

interface IUserLoginInfo {
  email: String | ''
  password: String | ''
}

export default class UserLogin {
  static async loginUser(ctx: Context) {
    const inputData = ctx.request.body as IUserLoginInfo
    const userData = await UserModel.findOne({ email: inputData.email }).lean()
    if (inputData.password == userData.password) {
    //   console.log(userData.password)
    //   console.log(inputData.password)
      ctx.session.user = userData
      ctx.body = userData
    } else {
      //   const error = "Incorrect Password!"
      //   ctx.body = error
      ctx.throw(400, 'Incorrect Password!')
    }
  }
}
