const userRepository = require("../repositories/userRepository");

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
  async updateUser(userId, updateData) {
    const User = require("../models/userModel");
    const user = await User.findOne({ id: userId });
    if (!user) throw new Error("User not found");

    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;

    await user.save();
    console.log("user after update = ", user);
    return user;
  }
}
module.exports = new UserService();
