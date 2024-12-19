// controllers/orderController.js
const { Order, OrderItem, Product, User } = require('../models');

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  const { items } = req.body; // items est un tableau [{ productId, quantité }]
  try {
    // Calculer le total
    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Produit ID ${item.productId} non trouvé` });
      }
      if (product.stock < item.quantité) {
        return res.status(400).json({ message: `Stock insuffisant pour le produit ID ${item.productId}` });
      }
      total += parseFloat(product.prix) * item.quantité;
    }

    // Créer la commande
    const order = await Order.create({
      userId: req.user.id,
      date_commande: new Date(),
      statut: 'en attente',
      total,
    });

    // Créer les OrderItems et mettre à jour le stock des produits
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      await OrderItem.create({
        commandeId: order.id,
        productId: item.productId,
        quantité: item.quantité,
        prix_unitaire: product.prix,
      });
      await product.decrement('stock', { by: item.quantité });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer toutes les commandes (Admin uniquement)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'nom', 'email'] },
        { model: OrderItem, include: [Product] },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer une commande spécifique (Admin ou propriétaire)
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'nom', 'email'] },
        { model: OrderItem, include: [Product] },
      ],
    });
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    // Vérifier si l'utilisateur est le propriétaire ou un admin
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour le statut d'une commande (Admin uniquement)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    await order.update({ statut: statut || order.statut });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer une commande (Admin uniquement)
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    await order.destroy();
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
