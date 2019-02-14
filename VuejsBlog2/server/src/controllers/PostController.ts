import PostModel from '@/models/PostModel'
import { Context } from 'koa'
import UserModel from '@/models/UserModel'
import { ObjectId } from 'bson';

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
    console.log(postData);
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
    const allPostsData = await PostModel.find({}).populate('userinfo').lean()
    // for (let i = 0; i <= allPostsData.length; i++) {
    //   // allPostsData[i].avatar = allPostsData[i].userinfo.avatar
    //   console.log(allPostsData[i].userinfo);
    // }
    // console.log(allPostsData[1].userinfo);
// console.log(allPostsData.title);
    ctx.body = allPostsData
    // console.log(await UserModel.findById('5c177a1d62d1b54094903182').lean())
  }

  static async getPostsProfile(ctx: Context) {
    const userDisplayname = ctx.request.body
    const stringDisplayname = JSON.stringify(userDisplayname)
    const finalDisplayname = stringDisplayname.replace(/:|"|{|}/g, '')
    // console.log(finalDisplayname)
    const findAuthor = await PostModel.find({ author: finalDisplayname })
    ctx.body = findAuthor
  }
}
