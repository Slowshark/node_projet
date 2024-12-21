// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Routes protégées
router.get('/', authenticateJWT, authorizeRoles('admin'), orderController.getAllOrders);
router.get('/:id', authenticateJWT, orderController.getOrderById);
router.post('/', authenticateJWT, authorizeRoles('customer'), orderController.createOrder);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), orderController.updateOrderStatus);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), orderController.deleteOrder);

module.exports = router;
