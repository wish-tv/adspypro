const userModel = require('../../../../DB/models/user.model')

const register = async (req, res) => {
    const { user_name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Create a new user
        const user = new userModel({
            user_name,
            email,
            password
        });

        // Save the new user
        const savedUser = await user.save();

        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = register;