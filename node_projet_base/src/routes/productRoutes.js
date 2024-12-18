const express = require('express');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', 
  authMiddleware, 
  roleMiddleware.isAdminOrManager, 
  ProductController.createProduct
);

router.get('/', 
  authMiddleware, 
  ProductController.getAllProducts
);

router.get('/:id', 
  authMiddleware, 
  ProductController.getProductById
);

router.put('/:id', 
  authMiddleware, 
  roleMiddleware.isAdminOrManager, 
  ProductController.updateProduct
);

router.delete('/:id', 
  authMiddleware, 
  roleMiddleware.isAdmin, 
  ProductController.deleteProduct
);

module.exports = router;