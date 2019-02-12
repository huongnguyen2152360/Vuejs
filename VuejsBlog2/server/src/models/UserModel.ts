import { Schema, model } from 'mongoose'
import PostModel from '@/models/PostModel'

const userSchema = new Schema({
  _id:  Schema.Types.ObjectId,
  displayname: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  avatar: [{ type: Schema.Types.ObjectId, ref: 'postModel' }]
})

export default model('userModel', userSchema)
