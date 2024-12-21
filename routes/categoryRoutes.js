// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Routes publiques
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Routes protégées (Admin uniquement)
router.post('/', authenticateJWT, authorizeRoles('admin'), categoryController.createCategory);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), categoryController.updateCategory);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), categoryController.deleteCategory);

module.exports = router;
