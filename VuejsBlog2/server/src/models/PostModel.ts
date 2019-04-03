import {Schema, model} from 'mongoose'
// import userModel from '@/models/UserModel'

const postSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    authorId: Schema.Types.ObjectId,
    avatar: {type: String, default: ''},
    tags: {type: String, default: ''}
})

postSchema.virtual('userinfo', {
    ref: 'userModel', // tên model user
    localField: 'authorId', //sẽ show Id của user (_id bên userModel)
    justOne: true, //nhiều post nhưng chỉ 1 user
    foreignField: '_id' //tên trường thông tin ứng vs userId (_id bên userModel)
})

export default model('postModel', postSchema,'postmodels')