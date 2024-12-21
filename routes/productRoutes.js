// routes/productRoutes.js
'use strict';
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body, validationResult } = require('express-validator');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Routes publiques
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Routes protégées (Admin uniquement)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin'),
  [
    body('nom').notEmpty().withMessage('Le nom du produit est requis.'),
    body('description').notEmpty().withMessage('La description est requise.'),
    body('prix').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),
    body('stock').isInt({ min: 0 }).withMessage('Le stock doit être un entier positif.'),
    body('image_url').optional().isURL().withMessage('URL d\'image invalide.'),
    body('categorieId').isInt().withMessage('categorieId doit être un entier.'),
    body('date_release').optional().isISO8601().withMessage('Date de sortie invalide.')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.createProduct
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  [
    body('nom').optional().notEmpty().withMessage('Le nom du produit ne peut pas être vide.'),
    body('description').optional().notEmpty().withMessage('La description ne peut pas être vide.'),
    body('prix').optional().isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Le stock doit être un entier positif.'),
    body('image_url').optional().isURL().withMessage('URL d\'image invalide.'),
    body('categorieId').optional().isInt().withMessage('categorieId doit être un entier.'),
    body('date_release').optional().isISO8601().withMessage('Date de sortie invalide.')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.updateProduct
);

router.delete('/:id', authenticateJWT, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;
