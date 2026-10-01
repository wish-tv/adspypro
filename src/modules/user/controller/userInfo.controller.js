const userModel = require('../../../../DB/models/user.model')

const userInfo = async (req, res) => {
    const userId = req.userData._id // get userId from middleware authorization

    try {
        const user = await userModel.findById(userId)

        // Check if user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User info fetched successfully',
            user_name: user.user_name,
            is_subscribed: user.is_subscribed,
            subscribed_plan: user.subscribed_plan,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = userInfo