import PostModel from '@/models/PostModel'
import { Context } from 'koa'
import UserModel from '@/models/UserModel'
import { ObjectId } from 'bson'

interface IPost {
  title: String | ''
  content: String | ''
  date: String | ''
  authorId: ObjectId | ''
  tags: String | ''
}

export default class Post {
  static async createPost(ctx: Context) {
    const postData = ctx.request.body as IPost
    if (postData.content && postData.title && postData.tags) {
      await PostModel.create(postData)
      const allPostsData = await PostModel.find({})
        .sort([['date', -1]])
        .populate('userinfo')
        .lean()
      ctx.body = allPostsData
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
    const allPostsData = await PostModel.find({})
      .sort([['date', -1]])
      .populate('userinfo')
      .lean()
    ctx.body = allPostsData
  }

  static async getPostsProfile(ctx: Context) {
    const userId = ctx.request.body
    const userIdString = JSON.stringify(userId).replace(/"|{|}|:/g, '')
    ctx.body = await PostModel.find({ authorId: userIdString }).sort([['date', -1]])
  }

  static async editPost(ctx: Context) {
    const editPostData = ctx.request.body
    // console.log(editPostData);
    ctx.body = await PostModel.updateOne({ _id: editPostData._id }, { ...editPostData })
  }
}
