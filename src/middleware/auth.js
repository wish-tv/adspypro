const userModel = require('../../DB/models/user.model')
const jwt = require('jsonwebtoken');

const isUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'Access token is missing' });
        }

        if (!authorization.startsWith(process.env.AUTH_SECRET_KEY)) {
            return res.status(401).json({ message: 'Invalid auth secret key' });
        }

        const userToken = authorization.replace(process.env.AUTH_SECRET_KEY, '');
        const { id } = jwt.verify(userToken, process.env.TOKEN_SECRET_KEY);

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'User') {
            return res.status(403).json({ message: 'You do not have permission to perform this operation' });
        }

        req.userData = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'Access token is missing' });
        }

        if (!authorization.startsWith(process.env.AUTH_SECRET_KEY)) {
            return res.status(401).json({ message: 'Invalid auth secret key' });
        }

        const userToken = authorization.replace(process.env.AUTH_SECRET_KEY, '');
        const { id } = jwt.verify(userToken, process.env.TOKEN_SECRET_KEY);

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'Admin') {
            return res.status(403).json({ message: 'You do not have permission to perform this operation' });
        }

        req.userData = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { isUser, isAdmin }