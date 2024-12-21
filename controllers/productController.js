// controllers/productController.js
const { Product, Category } = require('../models');

exports.createProduct = async (req, res) => {
  const { nom, description, prix, stock, image_url, categorieId } = req.body;
  try {
    const category = await Category.findByPk(categorieId);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    const product = await Product.create({
      nom,
      description,
      prix,
      stock,
      image_url,
      categorieId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, { include: Category });
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nom, description, prix, stock, image_url, categorieId } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    if (categorieId) {
      const category = await Category.findByPk(categorieId);
      if (!category) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }
    }
    await product.update({
      nom: nom || product.nom,
      description: description || product.description,
      prix: prix || product.prix,
      stock: stock || product.stock,
      image_url: image_url || product.image_url,
      categorieId: categorieId || product.categorieId,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
