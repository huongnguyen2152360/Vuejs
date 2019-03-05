import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    content: {type: String, default: ''},
    date: {type: String, default: ''},
    cmtUser: Schema.Types.ObjectId,
    postId: {type: String, default: ''}
}, { toJSON: { virtuals: true } })

commentSchema.virtual('usercmtinfo', {
    ref: 'userModel',
    localField: 'cmtUser',
    justOne: true,
    foreignField: '_id'
})

export default model('commentModel', commentSchema, 'commentmodels')