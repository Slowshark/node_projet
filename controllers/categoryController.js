// controllers/categoryController.js
const { Category, Product } = require('../models');

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  const { nom, description } = req.body;
  try {
    const existingCategory = await Category.findOne({ where: { nom } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Catégorie déjà existante' });
    }
    const category = await Category.create({ nom, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, { include: Product });
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    await category.update({
      nom: nom || category.nom,
      description: description || category.description,
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    await category.destroy();
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
// test 1
