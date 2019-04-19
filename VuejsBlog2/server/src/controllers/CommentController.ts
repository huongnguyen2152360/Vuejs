import { Context } from 'koa'
import CommentModel from '@/models/CommentModel'
import PostModel from '@/models/PostModel';

interface IComment {
  content: String | ''
  date: String | ''
  cmtUser: String | ''
  postId: String | ''
}

export default class Comment {
  static async createCmt(ctx: Context) {
    const cmtContent = ctx.request.body as IComment
    if (cmtContent.content && cmtContent.date && cmtContent.cmtUser) {
      await CommentModel.create(cmtContent)
      const findLastCmt = await CommentModel.findOne({ postId: cmtContent.postId }).sort([['date', -1]]).lean()
      await PostModel.updateOne({ _id: cmtContent.postId }, { cmtId: findLastCmt._id })
      ctx.body = await CommentModel.find({ postId: cmtContent.postId })
        .sort([['date', -1]])
        .populate('usercmtinfo')
        .lean()
    } else {
      ctx.throw(400, 'Please input your content')
    }
  }

  static async getPostCmt(ctx: Context) {
    const postIdData = ctx.request.body
    const postIdString = JSON.stringify(postIdData).replace(/"|{|}|:/g, '')
    ctx.body = await CommentModel.find({ postId: postIdString })
      .sort([['date', -1]])
      .populate('usercmtinfo')
      .lean()
  }

  // static async editCmt(ctx: Context) {
  //   const editData = ctx.request.body
  //   console.log(editData);
  //   const editUpdate =  CommentModel.updateOne({_id: editData._id}, {editData})
  //   ctx.body = CommentModel.findOne({_id: editData._id}).lean()
  // }

  static async deletecmt(ctx: Context) {
    const cmtId = ctx.request.body
    const finalcmtId = JSON.stringify(cmtId).replace(/"|{|}|:/g, '')
    ctx.body = await CommentModel.deleteOne({_id: finalcmtId})
  }
}
