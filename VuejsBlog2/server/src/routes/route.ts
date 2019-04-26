const Router = require('koa-router')
const router = new Router()
const passport = require('passport')
import UserController from '@/controllers/UserController'
import PostController from '@/controllers/PostController'
import LoginController from '@/controllers/LoginController'
import CommentController from '@/controllers/CommentController'
import nodemailer from '@/configs/nodemailer'
import * as bodyParser from 'koa-bodyparser'

// USER
router.post('/register', bodyParser(), UserController.createUser)
router.post('/login', bodyParser(), LoginController.loginUser)
router.post('/editProfile', bodyParser(), UserController.editUser)
router.post('/changePassword', bodyParser(), UserController.changePass)
router.post('/resetPassword', bodyParser(), nodemailer.resetPass)
router.post('/resetChangePass', bodyParser(), UserController.resetChangePass)

// UserProfile
router.post('/getUserProfile', bodyParser(), UserController.getUserProfile)
router.post('/userAllPosts', bodyParser(), UserController.userAllPosts)

//UserLoginAuth
// router.post('/login/facebook', passport.authenticate("facebook"))
// router.post('/loginfb', LoginController.loginfb)
// router.post('/auth/facebook/callback', passport.authenticate("facebook", { failureRedirect: '/login' }), 
// function (req, res) {
//     res.redirect('/')
// })

//POST
router.post('/postContent', bodyParser(), PostController.createPost)
router.get('/getAllPosts', PostController.getAllPosts)
router.get('/getAllPostsGeneral', PostController.getAllPostsGeneral)
router.get('/getAllPostsLanguage', PostController.getAllPostsLanguage)
router.get('/getAllPostsSupport', PostController.getAllPostsSupport)
router.get('/getAllPostsViews', PostController.getAllPostsViews)
// // router.get('/getAllPostsCmts', PostController.getAllPostsCmts)
//Home- Post
router.post('/getcmtinfo', bodyParser(), PostController.getcmtinfo)
router.post('/countviews', bodyParser(), PostController.countviews)

// profile - post profile
router.post('/getPostsProfile', bodyParser(), PostController.getPostsProfile)
router.post('/getUserInfo', bodyParser(), PostController.getPostsProfile)
router.post('/editPostProfile', bodyParser(), PostController.editPostProfile)
router.post('/deletePostProfile', bodyParser(), PostController.deletePostProfile)

//post details
router.post('/getpostdetails', bodyParser(), PostController.getpostdetails)

//post details - comments
router.post('/createCmt', bodyParser(), CommentController.createCmt)
router.post('/getPostCmt', bodyParser(), CommentController.getPostCmt)
// router.post('/editCmt', bodyParser(), CommentController.editCmt)
router.post('/deletecmt', bodyParser(), CommentController.deletecmt)
export = router
