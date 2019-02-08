import PostModel from '@/models/PostModel'
import { Context } from 'koa'

interface IPost {
  title: String | ''
  content: String | ''
  date: String | ''
  author: String | ''
  avatar: String | ''
  tags: String | ''
}

export default class Post {
  static async createPost(ctx: Context) {
      const postData = ctx.request.body as IPost
      ctx.body = await PostModel.create(postData)
  }
}
