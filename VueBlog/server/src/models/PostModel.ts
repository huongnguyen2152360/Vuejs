import {Schema, model} from 'mongoose'
// import userModel from '@/models/UserModel'

const postSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    author: {type: String, default: ''},
    avatar: {type: String, default: ''},
    tags: {type: String, default: ''}
})

export default model('postModel', postSchema)