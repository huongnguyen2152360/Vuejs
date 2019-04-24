import { Context } from 'koa'
import UserModel from '@/models/UserModel'
// import keyPassport from '@/configs/keyPassport'
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcrypt');
const saltRounds = 10;

interface IUserLoginInfo {
  email: String | ''
  password: String | ''
}

export default class UserLogin {
  static async loginUser(ctx: Context) {
    const inputData = ctx.request.body as IUserLoginInfo
    const userData = await UserModel.findOne({ email: inputData.email }).lean()
    const match = await bcrypt.compare(inputData.password, userData.password)
    if (match) {
      ctx.session.user = userData
      ctx.body = userData
    } else {
      ctx.throw(400, 'Incorrect Password!')
    }
  }

  // static async loginfb(ctx:Context) {
  //   passport.authenticate("facebook")
  //   passport.serializeUser(function (user, done) {
  //     console.log('serializeUser');
  //     done(null, user.id);
  //   }),

  //   passport.deserializeUser(function (id, done) {
  //     UserModel.findById(id)
  //       .then(user => {
  //         done(null, user);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         throw err
  //       });
  //   })

  //   passport.use(new FacebookStrategy({
  //     clientID: keyPassport.facebook.clientID,
  //     clientSecret: keyPassport.facebook.clientSecret,
  //     callbackURL: keyPassport.facebook.callbackURL,
  //     profileFields: keyPassport.facebook.profileFields
  //   },
  //     async function (accessToken, refreshToken, profile, done) {
  //       console.log('async function fb strategy');
  //       const findUser = await UserModel.findOne({ email: profile.emails[0].value }).lean()
  //       console.log(findUser);
  //       if (findUser) {
  //         console.log(profile);
  //       }
  //       else if (!findUser) {
  //         await UserModel.create(
  //           { displayname: profile.name },
  //           { email: profile.emails[0].value },
  //           { password: profile.id },
  //           { avatar: profile.profile_pic ? profile.profile_pic : 'https://data.whicdn.com/images/50330982/large.jpg' }
  //         ).then(function (result) {
  //           console.log('PROFILE: ');
  //           console.log(result);
  //           return done(null, result);
  //         })
  //           .catch(function (err) {
  //             throw err;
  //           });
  //         // console.log(profile.email);
  //       }
  //     }

  //   ));
  // }
}
