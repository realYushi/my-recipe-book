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
  async deleteUser(userId) {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        console.log("User not found in MongoDB", userId);
        return null;
      }
      console.log("Deleting user from MongoDB", userId);
      const deletedUser = await User.findOneAndDelete({ id: userId });
      console.log("Deleted user:", deletedUser);
      return deletedUser;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },
};

export default UserRepository;