import ContactModel from '@/models/ContactModel'
import { Context } from 'koa'

interface IUserInfo {
  name: string | ''
  phone: string | ''
  email: string | ''
  address: string
}
export default class ContactList {
  static async createUser(ctx: Context) {
    const postData = ctx.request.body as IUserInfo
    console.log(postData);
    await ContactModel.create({ ...postData })

    ctx.body = { data: 'OK' }
  }
}
