// routes/authRoutes.js
'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

// Inscription
router.post(
  '/register',
  [
    body('nom').notEmpty().withMessage('Le nom est requis.'),
    body('email').isEmail().withMessage('Format d\'email invalide.'),
    body('mot_de_passe')
      .isLength({ min: 6 })
      .withMessage('Le mot de passe doit comporter au moins 6 caractères.'),
    body('role')
      .optional()
      .isIn(['admin', 'customer'])
      .withMessage('Role invalide.')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.register
);

// Connexion
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Format d\'email invalide.'),
    body('mot_de_passe').notEmpty().withMessage('Le mot de passe est requis.')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.login
);

module.exports = router;
