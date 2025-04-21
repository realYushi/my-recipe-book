const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.get('/profile', userController.getUserProfile);
module.exports = router;