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
        try {
            return await User.findOneAndDelete({ id: userId });
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
}
module.exports = new UserRepository();

