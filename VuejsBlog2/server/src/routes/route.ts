const Router = require('koa-router')
const router = new Router()
import UserController from '@/controllers/UserController'
import PostController from '@/controllers/PostController'
import LoginController from '@/controllers/LoginController'
import CommentController from '@/controllers/CommentController'
import * as bodyParser from 'koa-bodyparser'

// USER
router.post('/register', bodyParser(), UserController.createUser)
router.post('/login', bodyParser(), LoginController.loginUser)
router.post('/editProfile', bodyParser(), UserController.editUser)
router.post('/changePass', bodyParser(), UserController.changePass)
router.post('/userAllPosts', bodyParser(), UserController.userAllPosts)

//POST
router.post('/postContent', bodyParser(),PostController.createPost)
router.get('/getAllPosts',PostController.getAllPosts)
router.post('/getPostsProfile',bodyParser(), PostController.getPostsProfile)
router.post('/editPost',bodyParser(), PostController.editPost)
router.post('/deletePost',bodyParser(), PostController.deletePost)
router.post('/getpostdetails', bodyParser(), PostController.getPostDetails)

//COMMENT
router.post('/createCmt', bodyParser(), CommentController.createCmt)
router.post('/getPostCmt', bodyParser(), CommentController.getPostCmt)
router.post('/getUserProfile', bodyParser(), CommentController.getUserProfile)


export = router
