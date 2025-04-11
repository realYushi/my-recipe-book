const userRepository = require('../repositories/userRepository');

class UserService {
    async createUser(userData) {
        try {
            return await userRepository.createUser(userData);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new UserService();