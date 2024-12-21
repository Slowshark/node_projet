// middlewares/errorHandler.js
'use strict';

const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ message: 'Erreur serveur.', error: err.message });
};

module.exports = errorHandler;
