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
}

export default class Post {
  static async createPost(ctx: Context) {
    const postData = ctx.request.body as IPost
    if (postData.content && postData.title && postData.tags) {
      await PostModel.create(postData)
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
    // const allPostData = await PostModel.find({}).sort([['date', -1]]).lean()
    // for (let i = 0; i < allPostData.length; i++) {
    //   if (allPostData[i].cmtId != '') {
    //     // console.log(await PostModel.find({cmtId: allPostData[i].cmtId}).populate('allcmts').lean())
    //     console.log('w cmtId');
    //   console.log('no cmtId: ' + await PostModel.find({cmtId: allPostData[i].cmtId}).lean())
    //   // } else if (allPostData[i].cmtId == '') {
    //   // }
    // }
    const allPostData = await PostModel.find({}).populate('userinfo').sort([['date', -1]]).lean()
    // console.log(allPostData);
    ctx.body = allPostData
    // const allpostcmts = []
    // for (let i = 0; i < allPostData.length; i++) {
    //   allpostcmts.push(await CommentModel.findOne({ postId: allPostData[i]._id }).populate('usercmtinfo').sort([['date', -1]]).lean())
    // }
    // for (let i = 0; i < allpostcmts.length; i++) {
    //   if (allpostcmts[i] === null) {
    //     allpostcmts[i] = String(allpostcmts[i])
    //   }
    // }
    // console.log(allpostcmts);
    // console.log(typeof(allPostData));
    // ctx.body = {allPostData,allpostcmts}
  }
  static async getcmtinfo(ctx: Context) {
    const postInfo = []
    const cmtInfo = []
    const cmtIdArr = ctx.request.body
    for (let i = 0; i < cmtIdArr.length; i++) {
      cmtInfo[i] = await CommentModel.findOne({ _id: cmtIdArr[i] }).lean()
      postInfo[i] = await PostModel.findOne({ cmtId: cmtIdArr[i] }).lean()
      postInfo[i].latestcmt = cmtInfo[i]
    }
    ctx.body = postInfo
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
