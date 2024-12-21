'use strict';
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        logger.error('JWT verification failed:', err.message);
        return res.status(403).json({ message: 'Accès refusé. Token invalide.' });
      }
      req.user = user;
      next();
    });
  } else {
    logger.warn('JWT missing in request headers.');
    res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }
};

module.exports = authenticateJWT;
