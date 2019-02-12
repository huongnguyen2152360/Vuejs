import {Schema, model} from 'mongoose'
import UserModel from '@/models/UserModel'

const postSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    author: {type: String, default: ''},
    avatar:[{ type: Schema.Types.ObjectId, ref: 'userModel' }],
    tags: {type: String, default: ''}
})

export default model('postModel', postSchema)