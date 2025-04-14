const userRepository = require('../repositories/userRepository');

class UserService {
    async createUser(userData) {
        try {
            return await userRepository.createUser(userData);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserById(id) {
        try {
            return await userRepository.getUserById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = new UserService();