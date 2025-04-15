const User = require('../models/userModel');

class UserRepository {

    async createUser(userData) {
        try {
            const newUser = new User(userData);
            return await newUser.save();
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteUser(userId) {
        return await User.findOneAndDelete(userId);
    }
}

module.exports = new UserRepository();

