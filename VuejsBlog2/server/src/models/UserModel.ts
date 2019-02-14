import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  displayname: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  avatar: { type: String, default: '' }
})

// userSchema.virtual('uposts', {
//   ref: 'postModel',
//   localField: '_id',
//   foreignField: 'authorId'
// })


export default model('userModel', userSchema,'usermodels')
