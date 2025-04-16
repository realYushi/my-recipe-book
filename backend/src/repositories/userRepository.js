import User from '../models/userModel.js';

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
            return await User.findOne({ id: id })
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new UserRepository();

