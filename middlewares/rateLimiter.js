// middlewares/rateLimiter.js
'use strict';
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
  standardHeaders: true, // Retourner les informations de rate limit dans les en-têtes
  legacyHeaders: false, // Désactiver les en-têtes X-RateLimit*
});

module.exports = limiter;
