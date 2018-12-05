import { Context } from 'koa'
import ContactModel from '@/models/ContactModel'

interface IContactInfo {
  name: string | ''
  email: string | ''
  phone: string | ''
  address: string | ''
  _id: string | ''
}

export default class ContactList {
  static async addContact(ctx: Context) {
    const contactData = ctx.request.body as IContactInfo
    ctx.body = await ContactModel.create({ ...contactData })
  }
  static async getAllContacts(ctx: Context) {
    ctx.body = await ContactModel.find({})
  }
  static async deleteContact(ctx: Context) {
    const { id } = ctx.request.body
    ctx.body = await ContactModel.deleteOne({ _id: id })
  }
  static async editContact(ctx: Context) {
    const editData = ctx.request.body as IContactInfo
    ctx.body = await ContactModel.updateOne({ _id: editData._id }, {...editData})
  }
}
