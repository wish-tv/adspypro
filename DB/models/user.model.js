const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true, alias: 'userName' },
    email: { type: String, required: true },
    password: { type: String, required: true, alias: 'password' },
    is_subscribed: { type: Boolean, default: false, alias: 'isSubscribed' }, // To check if he is a subscriber
    subscribed_plan: { type: String, default: 'Free', alias: 'subscribedPlan' }, // To check which plan he is subscribed to
    role: { type: String, default: 'User' },
});

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;
