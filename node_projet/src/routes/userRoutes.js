const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/', 
  authMiddleware, 
  roleMiddleware.isAdmin, 
  UserController.getAllUsers
);

router.get('/profile', 
  authMiddleware, 
  UserController.getUserProfile
);

router.put('/profile', 
  authMiddleware, 
  UserController.updateUserProfile
);

module.exports = router;