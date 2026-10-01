const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    subscriptionType: { type: String, enum: ['monthly', 'yearly'], required: true },
    subscriptionPlan: { type: String, enum: ['Pro'], required: true },
    subscriptionStartDate: { type: String },
    subscriptionEndDate: { type: String },
    isActive: { type: Boolean, default: false },
    cost: { type: Number, required: true }, // field for cost of subscription
    time: String
});

const subscriptionModel = mongoose.model('Subscription', subscriptionSchema)
module.exports = subscriptionModel;