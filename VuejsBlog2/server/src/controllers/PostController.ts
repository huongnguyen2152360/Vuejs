import PostModel from '@/models/PostModel'
import { Context } from 'koa'
import UserModel from '@/models/UserModel'

interface IPost {
  title: String | ''
  content: String | ''
  date: String | ''
  authorId: String | ''
  avatar: String | ''
  tags: String | ''
}

export default class Post {
  static async createPost(ctx: Context) {
    const postData = ctx.request.body as IPost
    if (postData.content && postData.title && postData.tags) {
      ctx.body = await PostModel.create(postData)
    } else {
      if (!postData.content) {
        ctx.throw(400, 'Please input your content')
      }
      if (!postData.title) {
        ctx.throw(400, 'Please input your title')
      }
      if (!postData.tags) {
        ctx.throw(400, 'Please select your tags')
      }
    }
  }
  static async getAllPosts(ctx: Context) {
    const allPostData = await PostModel.find({}).populate('userinfo').sort([['date', -1]]).lean()
    ctx.body = allPostData
  }
  static async getPostsProfile(ctx: Context) {
    const userId = ctx.request.body
    const stringUserId = JSON.stringify(userId)
    const finalUserId = stringUserId.replace(/:|"|{|}/g, '')
    const userInfo = await PostModel.find({authorId: finalUserId})
    ctx.body = userInfo
  }
}
