import PostModel from '@/models/PostModel'
import { Context } from 'koa'
import CommentModel from '@/models/CommentModel'

interface IPost {
  title: String | ''
  content: String | ''
  date: String | ''
  authorId: String | ''
  avatar: String | ''
  tags: String | ''
  cmtId: String | ''
  views: Number | 0
  postCount: Number | 1
}

export default class Post {
  // POST - HOME
  static async createPost(ctx: Context) {
    const postData = ctx.request.body as IPost
    if (postData.content && postData.title && postData.tags) {
      await PostModel.create(postData)
      postData.postCount = 1
      postData.views = 0
      const allPostData = await PostModel.find({}).populate('userinfo').sort([['date', -1]]).lean()
      ctx.body = allPostData
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
    // const countcmts = []
    const allPostData = await PostModel.find({}).populate('userinfo').lean()
    // for (let i = 0; i < allPostData.length; i++) {
    //   countcmts[i] = await CommentModel.countDocuments({ postId: allPostData[i]._id }, (err, count) => {
    //     return count
    //   })
    //   allPostData[i].postCount += countcmts[i]
    // }
    ctx.body = allPostData
  }
  static async getcmtinfo(ctx: Context) {
    const postInfo = []
    const cmtInfo = []
    const countPosts = []
    const cmtIdArr = ctx.request.body
    for (let i = 0; i < cmtIdArr.length; i++) {
      cmtInfo[i] = await CommentModel.findOne({ _id: cmtIdArr[i] }).populate('usercmtinfo').lean()
      postInfo[i] = await PostModel.findOne({ cmtId: cmtIdArr[i] }).populate('userinfo').lean()
      countPosts[i] = await CommentModel.countDocuments({ postId: postInfo[i]._id }, (err, count) => {
        return count
      })
      postInfo[i].latestcmt = cmtInfo[i]
      postInfo[i].postCount = countPosts[i] + 1
    }
    ctx.body = postInfo
  }
  static async getAllPostsGeneral(ctx: Context) {
    // const countcmts = []
    const allPostData = await PostModel.find({ tags: 'General' }).populate('userinfo').sort([['date', -1]]).lean()
    // for (let i = 0; i < allPostData.length; i++) {
    //   countcmts[i] = await CommentModel.countDocuments({ postId: allPostData[i]._id }, (err, count) => {
    //     return count
    //   })
    //   allPostData[i].postCount += countcmts[i]
    // }
    ctx.body = allPostData
  }

  static async getAllPostsLanguage(ctx: Context) {
    // const countcmts = []
    const allPostData = await PostModel.find({ tags: 'Language' }).populate('userinfo').sort([['date', -1]]).lean()
    // for (let i = 0; i < allPostData.length; i++) {
    //   countcmts[i] = await CommentModel.countDocuments({ postId: allPostData[i]._id }, (err, count) => {
    //     return count
    //   })
    //   allPostData[i].postCount += countcmts[i]
    // }
    ctx.body = allPostData
  }

  static async getAllPostsSupport(ctx: Context) {
    const allPostData = await PostModel.find({ tags: 'Support' }).populate('userinfo').sort([['date', -1]]).lean()
    ctx.body = allPostData
  }

  static async getAllPostsViews(ctx: Context) {
    const allPostData = await PostModel.find({}).populate('userinfo').sort([['views', -1]]).lean()
    ctx.body = allPostData
  }

  // static async getAllPostsCmts(ctx: Context) {
  //   const allPostData = await PostModel.find({}).populate('userinfo').lean()
  //   ctx.body = allPostData
  // }

  static async countviews(ctx: Context) {
    const inputData = ctx.request.body
    const updatedViews = await PostModel.updateOne({ _id: inputData[0] }, { views: inputData[1] }).lean()
    ctx.body = updatedViews
  }

  static async getPostsProfile(ctx: Context) {
    const userId = ctx.request.body
    const stringUserId = JSON.stringify(userId)
    const finalUserId = stringUserId.replace(/:|"|{|}/g, '')
    const userInfo = await PostModel.find({ authorId: finalUserId })
    ctx.body = userInfo
  }
  static async editPostProfile(ctx: Context) {
    const editData = ctx.request.body
    await PostModel.updateOne({ _id: editData._id }, { ...editData })
    ctx.body = await PostModel.findById(editData._id).lean()
  }
  static async deletePostProfile(ctx: Context) {
    const postId = ctx.request.body
    const stringPostId = JSON.stringify(postId)
    const finalPostId = stringPostId.replace(/:|"|{|}/g, '')
    ctx.body = await PostModel.deleteOne({ _id: finalPostId })
  }

  //POST DETAILS
  static async getpostdetails(ctx: Context) {
    const postId = ctx.request.body
    const stringPostId = JSON.stringify(postId)
    const finalPostId = stringPostId.replace(/:|"|{|}/g, '')
    ctx.body = await PostModel.findById(finalPostId).populate('userinfo').lean()
  }
}
