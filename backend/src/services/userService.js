const userRepository = require('../repositories/userRepository');
const recipeRepository = require('../repositories/recipeRepository');

class UserService {
    async createUser(userData) {
        try {
            return await userRepository.createUser(userData);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(userId) {
        try {
            await recipeRepository.deleteRecipesByUser(userId);
            const deletedUser = await userRepository.deleteUser(userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return deletedUser;
        } catch (error) {
            throw new Error(error.message || 'Failed to delete user');
        }
    }

    async getUserById(userId) {
        try {
            return await userRepository.getUserById(userId);
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch user');
        }
    }
}

module.exports = new UserService();