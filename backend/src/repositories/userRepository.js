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

}

module.exports = new UserRepository();

