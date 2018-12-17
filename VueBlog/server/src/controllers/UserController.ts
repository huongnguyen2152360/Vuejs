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
}

export default class User {
  static async createUser(ctx: Context) {
    const userData = ctx.request.body as IUserCreateInfo
    ctx.body = await UserModel.create(userData)
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


