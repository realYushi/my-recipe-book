
const userService = require('../services/userService');

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

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await userService.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.user.uid;
            const user = await userService.getUserById(userId);
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