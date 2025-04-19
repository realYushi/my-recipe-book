const User = require("../models/userModel");

class UserRepository {
  async createUser(userData) {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      return await User.findOne({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(userId, profileData) {
    return await User.findOneAndUpdate(
      { id: userId },
      { $set: profileData },
      { new: true }
    );
    console.log("user after update = ", user);
    return user;
  }
}

module.exports = new UserRepository();
