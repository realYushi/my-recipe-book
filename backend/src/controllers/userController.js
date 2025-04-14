const userService = require('../services/userService');
const User = require('../models/userModel');

class UserController {
    async createUser(req, res) {
        try {
            const userData = {
                id: req.user.uid,
                username: req.body.username,
                email: req.body.email,
            }
            const user = await userService.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserById(req, res) {
        try {

            const user = await User.findOne({ id: req.params.id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();