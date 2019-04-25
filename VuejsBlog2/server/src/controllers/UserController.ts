import UserModel from '@/models/UserModel'
import { Context } from 'koa'
import PostModel from '@/models/PostModel';
import CommentModel from '@/models/CommentModel';
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy
// import keyPassport from '@/configs/keyPassport'

// REGISTER
interface IUserCreateInfo {
  displayname: String | ''
  email: String | ''
  password: String | ''
  avatar: String | ''
  id: String | ''
  status: String | ''
}

export default class User {
  static async createUser(ctx: Context) {
    const userData = ctx.request.body as IUserCreateInfo
    userData.avatar = 'https://data.whicdn.com/images/50330982/large.jpg'
    userData.password = await bcrypt.hash(userData.password, saltRounds)
    const findSameUser = await UserModel.findOne({ email: userData.email }).lean()
    if (findSameUser != null) { //nếu findSameUser khác null => tìm thấy user => đã có user đó
      ctx.throw(400, 'Existed user')
    } else { //nếu k tìm đc user email => chưa có user đó
      ctx.body = await UserModel.create(userData)
    }

  }
  // Edit Email and DisplayName
  static async editUser(ctx: Context) {
    // displayname và email mới được input
    const inputData = ctx.request.body as IUserCreateInfo
    await UserModel.updateOne({ _id: inputData.id }, { ...inputData })
    const updatedData = await UserModel.findOne({ _id: inputData.id }).lean()
    ctx.session.user = updatedData
    ctx.body = updatedData
  }
  static async changePass(ctx: Context) {
    const inputPass = ctx.request.body as IUserCreateInfo
    const userPass = await UserModel.findOne({ _id: inputPass.id }).lean()
    const match = await bcrypt.compare(inputPass.password, userPass.password)
    if (match) {
      ctx.throw(400, 'New password must be different')
    } else {
      inputPass.password = await bcrypt.hash(inputPass.password,saltRounds)
      await UserModel.updateOne({ _id: inputPass.id }, { ...inputPass })
      const updatedPass = await UserModel.findOne({ _id: inputPass.id }).lean()
      ctx.session.user = updatedPass
      ctx.body = updatedPass
    }
  }
  static async resetChangePass(ctx: Context) {
    const userResetInfo = ctx.request.body
    const findUser = await UserModel.findOne({ email: userResetInfo.usrEmail }).lean()
    const match = await bcrypt.compare(userResetInfo.password, findUser.password)
    if (match) {
      ctx.throw(400, 'New password must be different')
    } else {
      userResetInfo.password = await bcrypt.hash(userResetInfo.password,saltRounds)
      await UserModel.updateOne({ email: userResetInfo.usrEmail }, { ...userResetInfo })
      const findUpdatedUsr = await UserModel.findOne({ email: userResetInfo.usrEmail }).lean()
      ctx.session.user = findUpdatedUsr
      ctx.body = findUpdatedUsr
    }
  }

  static async getUserProfile(ctx: Context) {
    const userId = ctx.request.body
    const stringUserId = JSON.stringify(userId)
    const finalUserId = stringUserId.replace(/:|"|{|}/g, '')
    ctx.body = await UserModel.findOne({ _id: finalUserId }).lean()
  }

  static async userAllPosts(ctx: Context) {
    const userId = ctx.request.body
    const stringUserId = JSON.stringify(userId)
    const finalUserId = stringUserId.replace(/:|"|{|}/g, '')
    const postCount = await PostModel.countDocuments({ authorId: finalUserId }).lean()
    const cmtCount = await CommentModel.countDocuments({ cmtUser: finalUserId }).lean()
    ctx.body = { postCount, cmtCount }
  }

}

// FACEBOOK LOGIN
// passport.use(new FacebookStrategy({
//     clientID: keyPassport.facebook.clientID,
//     clientSecret: keyPassport.facebook.clientSecret,
//     callbackURL: keyPassport.facebook.callbackURL,
//     profileFields: keyPassport.facebook.profileFields
//   },
//   async function(accessToken, refreshToken, profile, done) {
//     console.log(accessToken)
//     console.log(refreshToken)
//     console.log(profile)
//     console.log(done)
//   }
// ));
