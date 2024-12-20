const express = require('express');
const { Product } = require('../models');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  await product.destroy();
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
