import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  displayname: { type: String, default: '' },
  email: { type: String, required: true, default: '' },
  password: { type: String, required: true, default: '' },
  avatar: { type: String, default: '' }
})

export default model('userModel', userSchema)
