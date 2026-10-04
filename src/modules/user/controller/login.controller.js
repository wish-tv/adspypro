const userModel = require('../../../../DB/models/user.model')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    const { loginFrom } = req.query; // Get the loginFrom value from the request query

    try {
        let user;
        if (loginFrom === 'google') {
            if (req.headers['x-server-key'] !== process.env.SERVER_KEY) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            user = await userModel.findOne({ email: String(email) });
        } else {
            // Find a user by their email and password
            user = await userModel.findOne({ email, password });
        }

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
