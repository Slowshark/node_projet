// controllers/cartController.js
const { Cart, CartItem, Product } = require('../models');

// Récupérer le panier de l'utilisateur
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [
        { model: CartItem, include: [Product] },
      ],
    });
    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Ajouter un article au panier
exports.addItemToCart = async (req, res) => {
  const { productId, quantité } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    if (product.stock < quantité) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }

    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, date_creation: new Date() });
    }

    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: { quantité },
    });

    if (!created) {
      await cartItem.increment('quantité', { by: quantité });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour un article du panier
exports.updateCartItem = async (req, res) => {
  const { id } = req.params; // ID du CartItem
  const { quantité } = req.body;
  try {
    const cartItem = await CartItem.findByPk(id, { include: [Product] });
    if (!cartItem) {
      return res.status(404).json({ message: 'Article du panier non trouvé' });
    }
    if (cartItem.Product.stock < quantité) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }
    await cartItem.update({ quantité });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Supprimer un article du panier
exports.deleteCartItem = async (req, res) => {
  const { id } = req.params; // ID du CartItem
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Article du panier non trouvé' });
    }
    await cartItem.destroy();
    res.json({ message: 'Article supprimé du panier avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
