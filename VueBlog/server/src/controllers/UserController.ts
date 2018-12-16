import UserModel from '@/models/UserModel'
import { Context } from 'koa'

interface UserCreateInfo {
  displayname: String | ''
  email: String | ''
  password: String | ''
}

export default class UserCreate {
  static async createUser(ctx: Context) {
    const userData = ctx.request.body as UserCreateInfo
    console.log(userData)
    ctx.body = await UserModel.create({ ...userData })
  }
}

