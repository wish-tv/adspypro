const subscriptionRouter = require('express').Router()
const newSubscription = require('./controller/newSubscription.controller')
const paymentIntent = require('./controller/paymentIntent.controller')
const { isUser } = require('../../middleware/auth')

subscriptionRouter.post('/subscription/start', isUser, newSubscription)
subscriptionRouter.post('/subscription/pay', isUser, paymentIntent)

module.exports = subscriptionRouter;