import userService from "../services/userService.js";

const userService = require('../services/userService');

class UserController {
  async createUser(req, res) {
    try {
      const userData = {
        id: req.user.uid,
        username: req.body.username,
        email: req.body.email,
      }
      const user = await userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();