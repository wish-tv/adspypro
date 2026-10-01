const userModel = require('../../../../DB/models/user.model')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find a user by their email and password
        const user = await userModel.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY);

        // Send success response with token
        res.status(200).json({ message: "User login success", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = login