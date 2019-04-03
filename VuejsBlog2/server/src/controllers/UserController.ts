import UserModel from '@/models/UserModel'
import { Context } from 'koa'
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
}

export default class User {
  static async createUser(ctx: Context) {
    const userData = ctx.request.body as IUserCreateInfo
    userData.avatar = "https://data.whicdn.com/images/50330982/large.jpg"
    ctx.body = await UserModel.create(userData)
  }
  // Edit Email and DisplayName
  static async editUser(ctx: Context) {
    // displayname và email mới được input
    const inputData = ctx.request.body as IUserCreateInfo
    await UserModel.updateOne({_id: inputData.id},{...inputData})
    const updatedData = await UserModel.findOne({_id: inputData.id}).lean()
    ctx.session.user = updatedData
    ctx.body = updatedData
  }
  static async changePass(ctx:Context) {
    const inputPass = ctx.request.body as IUserCreateInfo
    const userPass = await UserModel.findOne({_id: inputPass.id}).lean()
    if (inputPass.password == userPass.password) {
      ctx.throw(400,'New password must be different')
    } else {
      await UserModel.updateOne({_id: inputPass.id}, {...inputPass})
      const updatedPass = await UserModel.findOne({_id: inputPass.id}).lean()
      ctx.session.user = updatedPass
      ctx.body = updatedPass
    }
    
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
