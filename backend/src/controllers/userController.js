import userService from "../services/userService.js";
import admin from "../config/firebase.js";

const MAX_USER_ID_LENGTH = 128; 

const UserController = {
  async createUser(req, res) {
    try {
      const userData = {
        id: req.user.uid,
        username: req.body.username,
        email: req.body.email,
      };
      const user = await userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteUser(req, res) {
    try {
        const userId = req.params.id;
        if (!userId || typeof userId !== "string" || userId.length > MAX_USER_ID_LENGTH) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        console.log("Deleting user with ID", userId);

        try {
            await admin.auth().deleteUser(userId);
        } catch (firebaseError) {
            console.error("Error deleting user from Firebase:", firebaseError);
            return res.status(500).json({ error: "Failed to delete user from Firebase." });
        }

        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        try {
          const deletedUser = await userService.deleteUser(userId);
          if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
          }
        } catch (dbError) {
          console.error("Error deleting user:", dbError);
          return res.status(500).json({ error: dbError.message });
        }
        res.status(204).send();
      }
    catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: error.message });
    }
  },
  async getUserProfile(req, res) {
    try {
      const userId = req.user.uid;
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default UserController;