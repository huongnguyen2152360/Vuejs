import { Context } from 'koa'
import CommentModel from '@/models/CommentModel'
import UserModel from '@/models/UserModel';

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
      ctx.body = await CommentModel.create(cmtContent)
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

  static async getUserProfile(ctx:Context) {
      const userIdData = ctx.request.body
      const userIdString = JSON.stringify(userIdData).replace(/"|{|}|:/g, '')
      ctx.body = await UserModel.findOne({_id: userIdString})
  }
}