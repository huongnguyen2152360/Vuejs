import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    cmtUser: {type: String, default: ''}
})

export default model('commentModel', commentSchema, 'commentmodels')