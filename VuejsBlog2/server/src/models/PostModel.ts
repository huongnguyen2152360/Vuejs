import {Schema, model} from 'mongoose'
// import userModel from '@/models/UserModel'

const postSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    authorId: Schema.Types.ObjectId,
    avatar: {type: String, default: ''},
    tags: {type: String, default: ''},
    cmtId: {type: String, default: ''}
}, {toObject: {virtuals: true}})

postSchema.virtual('userinfo', {
    ref: 'userModel', // tên model user
    localField: 'authorId', //sẽ show Id của user (_id bên userModel)
    justOne: true, //nhiều post nhưng chỉ 1 user
    foreignField: '_id' //tên trường thông tin ứng vs userId (_id bên userModel)
})

postSchema.virtual('allcmts', {
    ref: 'commentModel',
    localField: 'cmtId',
    justOne: false,
    foreignField: '_id',
    count: true
})

export default model('postModel', postSchema,'postmodels')