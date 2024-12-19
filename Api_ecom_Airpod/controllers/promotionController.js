// controllers/promotionController.js
const { Promotion, Order_Promotion } = require('../models');

// Créer une nouvelle promotion
exports.createPromotion = async (req, res) => {
  const { promotion_code, description, discount_percentage, valid_from, valid_until } = req.body;
  try {
    const existingPromo = await Promotion.findOne({ where: { promotion_code } });
    if (existingPromo) {
      return res.status(400).json({ message: 'Code de promotion déjà utilisé' });
    }
    const promotion = await Promotion.create({
      promotion_code,
      description,
      discount_percentage,
      valid_from,
      valid_until
    });
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer toutes les promotions
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer une promotion par ID
exports.getPromotionById = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée' });
    }
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour une promotion
exports.updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { promotion_code, description, discount_percentage, valid_from, valid_until } = req.body;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée' });
    }
    await promotion.update({
      promotion_code: promotion_code || promotion.promotion_code,
      description: description || promotion.description,
      discount_percentage: discount_percentage || promotion.discount_percentage,
      valid_from: valid_from || promotion.valid_from,
      valid_until: valid_until || promotion.valid_until
    });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer une promotion
exports.deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée' });
    }
    await promotion.destroy();
    res.json({ message: 'Promotion supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
