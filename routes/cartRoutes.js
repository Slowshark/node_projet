// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Routes protégées (Client uniquement)
router.get('/', authenticateJWT, authorizeRoles('customer'), cartController.getCart);
router.post('/items', authenticateJWT, authorizeRoles('customer'), cartController.addItemToCart);
router.put('/items/:id', authenticateJWT, authorizeRoles('customer'), cartController.updateCartItem);
router.delete('/items/:id', authenticateJWT, authorizeRoles('customer'), cartController.deleteCartItem);

module.exports = router;
