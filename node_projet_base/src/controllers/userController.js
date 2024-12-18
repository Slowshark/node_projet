const AuthService = require('../services/authService');
const User = require('../models/user');

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const token = await AuthService.register({ 
        username, 
        email, 
        password 
      });
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const { username, email } = req.body;
      const user = await User.findByPk(req.user.id);
      
      if (username) user.username = username;
      if (email) user.email = email;
      
      await user.save();
      
      res.json({ 
        message: 'Profile updated successfully',
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;