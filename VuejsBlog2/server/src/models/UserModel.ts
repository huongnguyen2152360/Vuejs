import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  displayname: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  avatar: { type: String, default: '' },
  status: { type: String, default: '' }
})

export default model('userModel', userSchema, 'usermodels')
