// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Routes publiques
router.get('/', promotionController.getAllPromotions);
router.get('/:id', promotionController.getPromotionById);

// Routes protégées (Admin uniquement)
router.post('/', authenticateJWT, authorizeRoles('admin'), promotionController.createPromotion);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), promotionController.updatePromotion);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), promotionController.deletePromotion);

module.exports = router;
