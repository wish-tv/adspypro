const userRouter = require('express').Router()
const login = require('./controller/login.controller')
const userInfo = require('./controller/userInfo.controller')
const register = require('./controller/register.controller')
const checkSubscription = require('./controller/checkSubscription.controller')
const { isUser } = require('../../middleware/auth')

userRouter.post('/user/login', login)
userRouter.post('/user/register', register)
userRouter.get('/user/userInfo', isUser, userInfo)
userRouter.get('/user/checkSubscription', isUser, checkSubscription)

module.exports = userRouter;