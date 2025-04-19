const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bypassAuth = require("../middleware/bypass-auth");

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", bypassAuth, userController.updateUser);
module.exports = router;
