'use strict';
const bcrypt = require('bcryptjs'); // Module pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Module pour générer et vérifier les tokens JWT
const { User } = require('../models'); // Modèle utilisateur pour interagir avec la base de données
const logger = require('../utils/logger'); // Logger pour enregistrer les informations et erreurs
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env

// Fonction d'inscription
exports.register = async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body; // Récupère les données de la requête
  try {
    // Vérifie si un utilisateur avec l'email fourni existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn(`Tentative de création d'un compte avec un email existant : ${email}`);
      return res.status(400).json({ message: 'Email déjà utilisé' }); // Retourne une erreur si l'email est déjà utilisé
    }
    // Hache le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role: role || 'customer', // Assigne le rôle par défaut si non fourni
    });
    logger.info(`Nouvel utilisateur créé : ${email}`); // Log l'inscription réussie
    res.status(201).json({ message: 'Utilisateur créé avec succès' }); // Retourne une réponse de succès
  } catch (error) {
    logger.error('Erreur lors de la création d\'un utilisateur:', error.message); // Log l'erreur
    res.status(500).json({ message: 'Erreur serveur', error }); // Retourne une erreur serveur
  }
};

// Fonction de connexion
exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body; // Récupère les données de la requête
  try {
    // Recherche l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Tentative de connexion avec un email inexistant : ${email}`);
      return res.status(400).json({ message: 'Utilisateur non trouvé' }); // Retourne une erreur si l'utilisateur n'existe pas
    }
    // Compare le mot de passe fourni avec celui enregistré
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      logger.warn(`Mot de passe incorrect pour l'email : ${email}`);
      return res.status(400).json({ message: 'Mot de passe incorrect' }); // Retourne une erreur si les mots de passe ne correspondent pas
    }
    // Génère un token JWT pour l'utilisateur
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expiration du token
    );
    logger.info(`Utilisateur connecté : ${email}`); // Log la connexion réussie
    res.json({ token }); // Retourne le token JWT
  } catch (error) {
    logger.error('Erreur lors de la connexion d\'un utilisateur:', error.message); // Log l'erreur
    res.status(500).json({ message: 'Erreur serveur', error }); // Retourne une erreur serveur
  }
};
