import ContactModel from '@/models/ContactModel'
import { Context } from 'koa'

// Viết để dễ đọc thôi
interface IUserInfo {
  name: string | ''
  phone: string | ''
  email: string | ''
  address: string
}
export default class ContactList {
  static async createUser(ctx: Context) {
    // Quy định body là 4 trường info trên interface kia
    // Js có .body, .param, ... nên không . bừa được
    const postData = ctx.request.body as IUserInfo
    ctx.body = await ContactModel.create({ ...postData })
  }
  static async getAllContacts(ctx: Context) {
    ctx.body = await ContactModel.find({})
  }
  static async deleteContact(ctx: Context) {
    // ctx.request.body.<bất cứ thứ gì - any>
    const { id } = ctx.request.body
    ctx.body = await ContactModel.deleteOne({ _id: id })
  }
}
