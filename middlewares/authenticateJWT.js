'use strict';
const jwt = require('jsonwebtoken'); // Module pour vérifier les tokens JWT
const logger = require('../utils/logger'); // Logger pour enregistrer les événements
require('dotenv').config(); // Charge les variables d'environnement

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization; // Récupère l'en-tête Authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Extrait le token de l'en-tête
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        logger.error('Échec de la vérification du JWT:', err.message); // Log l'erreur de vérification
        return res.status(403).json({ message: 'Accès refusé. Token invalide.' }); // Retourne une erreur
      }
      req.user = user; // Ajoute les informations utilisateur à la requête
      next(); // Passe au middleware suivant
    });
  } else {
    logger.warn('Token JWT manquant dans les en-têtes de la requête.'); // Log si le token est absent
    res.status(401).json({ message: 'Accès non autorisé. Token manquant.' }); // Retourne une erreur
  }
};

module.exports = authenticateJWT;
