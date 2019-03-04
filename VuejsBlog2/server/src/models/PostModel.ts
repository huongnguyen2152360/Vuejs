import {Schema, model} from 'mongoose'
// import UserModel from '@/models/UserModel'

const postSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    tags: {type: String, default: ''},
    avatar:{type: String, default: ''},
    authorId: Schema.Types.ObjectId
}, { toJSON: { virtuals: true } })

postSchema.virtual('userinfo', {
    ref: 'userModel', //tên model user
    localField: 'authorId', //tên trường thông tin mà UserPosts lưu
    justOne: true, //nhiều post nhưng chỉ 1 User
    foreignField: '_id' // tên trường thông tin ứng vs authorId (_id bên userModel)
})

export default model('postModel', postSchema,'postmodels')