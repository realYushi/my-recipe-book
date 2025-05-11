import userRepository from "../repositories/userRepository.js";
import recipeRepository from "../repositories/recipeRepository.js";

const UserService = {
  async createUser(userData) {
    try {
      return await userRepository.createUser(userData);
    } catch (error) {
      throw new Error(error);
    }
  },
  async getUserById(id) {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateUser(id, userData) {
    try {
      return await userRepository.updateUser(id, userData);
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteUser(userId) {
    try {
      console.log("Deleting recipes with ID", userId)
      await recipeRepository.deleteRecipesByUser(userId);
      console.log("Successfully deleted recipes", userId);
      const deletedUser = await userRepository.deleteUser(userId);
      if (!deletedUser) {
        console.warn(`User with ID ${userId} not found in MongoDB`);
        return null;
      }
      return deletedUser;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  }
};
export default UserService;