const Router = require('koa-router')
const router = new Router()
const passport = require('passport')


router.get("/login/facebook", passport.authenticate("facebook", {
  scope: ['profile']
}));

export = router