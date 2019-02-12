import PostModel from '@/models/PostModel'
import { Context } from 'koa'
import UserModel from '@/models/UserModel'

interface IPost {
  title: String | ''
  content: String | ''
  date: String | ''
  author: String | ''
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
    const allPostData = await PostModel.findOne().populate('avatar')
    console.log(allPostData)
    
    // const allAuthors = []
    // for (let i =0; i <= allPostData.length; i++) {
    //   allAuthors.push(allPostData[i].author)
    //   // console.log(allAuthors)
    // }
    // console.log(allAuthors[1])
    // console.log(UserModel.findOne({displayname: allAuthors[1]}))
    // for (let i =0; i <= allAuthors.length; i++) {
    //   console.log(UserModel.find({displayname: allAuthors[i]}))
    //   console.log(authorInfo)
    // }
    // console.log(UserModel.find({displayname: allPostData.author}))
    // allPostData.avatar = UserModel.find({displayname: allPostData.author})
    // console.log(allPostData)
    // ctx.body = allPostData
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
