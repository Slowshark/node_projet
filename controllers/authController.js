'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../utils/logger');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn(`Tentative de création d'un compte avec un email existant : ${email}`);
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role: role || 'customer',
    });
    logger.info(`Nouvel utilisateur créé : ${email}`);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    logger.error('Erreur lors de la création d\'un utilisateur:', error.message);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Tentative de connexion avec un email inexistant : ${email}`);
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      logger.warn(`Mot de passe incorrect pour l'email : ${email}`);
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    logger.info(`Utilisateur connecté : ${email}`);
    res.json({ token });
  } catch (error) {
    logger.error('Erreur lors de la connexion d\'un utilisateur:', error.message);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
