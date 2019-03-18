const Router = require('koa-router')
const router = new Router()
import UserController from '@/controllers/UserController'
import PostController from '@/controllers/PostController'
import LoginController from '@/controllers/LoginController'
import * as bodyParser from 'koa-bodyparser'

// USER
router.post('/register', bodyParser(), UserController.createUser)
router.post('/login', bodyParser(), LoginController.loginUser)
router.post('/editProfile', bodyParser(), UserController.editUser)
router.post('/changePassword', bodyParser(), UserController.changePass)

//POST
router.post('/postContent', bodyParser(),PostController.createPost)
router.get('/getAllPosts',PostController.getAllPosts)
router.post('/getPostsProfile',bodyParser(), PostController.getPostsProfile)
router.post('/getUserInfo',bodyParser(), PostController.getPostsProfile)

export = router
