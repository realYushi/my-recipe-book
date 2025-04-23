import User from "../models/userModel.js";

const UserRepository = {
  async createUser(userData) {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error(error);
    }
  },

  async getUserById(id) {
    try {
      return await User.findOne({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateUser(userId, profileData) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { id: userId },
        { $set: profileData },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default UserRepository;
