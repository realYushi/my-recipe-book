const userService = require("../services/userService");

class UserController {
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
  }
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
  }
  async updateUser(req, res) {
    try {
      const userId = req.user.uid;
      const { username, email } = req.body;

      const updatedUser = await userService.updateUser(userId, {
        username,
        email,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
