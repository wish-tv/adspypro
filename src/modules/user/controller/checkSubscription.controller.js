const userModel = require('../../../../DB/models/user.model')
const subscriptionModel = require('../../../../DB/models/subscription.model')
const moment = require('moment-timezone');

const checkSubscription = async (req, res) => {
    const userId = req.userData._id // get userId from middleware authorization

    try {
        const user = await userModel.findById(userId)

        // Check if user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const subscription = await subscriptionModel.findOne({ userId: user._id });

        // Check if subscription not found
        if (!subscription || !subscription.isActive) {
            return res.status(404).json({
                message: 'Subscription not found for this user',
                user_name: user.user_name,
                is_subscribed: user.is_subscribed,
                subscribed_plan: user.subscribed_plan,
            });
        }

        const currentDate = moment.tz('Africa/Cairo');

        // Parse the user's start and end dates using Egypt time zone
        const startDate = moment.tz(subscription.subscriptionStartDate, 'Africa/Cairo');
        const endDate = moment.tz(subscription.subscriptionEndDate, 'Africa/Cairo');

        // Check if the current date is between the start and end dates
        const isActive = currentDate.isBetween(startDate, endDate, null, '[]');

        // Update the subscription's isActive status if it has changed
        if (isActive) {
            return res.json({
                message: 'User is subscribed successfully',
                user_name: user.user_name,
                is_subscribed: user.is_subscribed,
                subscribed_plan: user.subscribed_plan,
            });
        } else {
            user.is_subscribed = false;
            user.subscribed_plan = 'Free';
            await user.save();
            subscription.isActive = false;
            await subscription.save();
            return res.status(404).json({
                message: 'User is not subscribed',
                user_name: user.user_name,
                is_subscribed: user.is_subscribed,
                subscribed_plan: user.subscribed_plan,
            });

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = checkSubscription;