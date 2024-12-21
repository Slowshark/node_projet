'use strict';
const express = require('express'); // Framework web pour Node.js
const app = express(); // Initialise l'application Express
const dotenv = require('dotenv'); // Charge les variables d'environnement
dotenv.config();

const cors = require('cors'); // Middleware pour la gestion des CORS
const rateLimiter = require('./middlewares/rateLimiter'); // Limite le nombre de requêtes
const errorHandler = require('./middlewares/errorHandler'); // Middleware pour la gestion des erreurs
const logger = require('./utils/logger'); // Logger personnalisé pour enregistrer les événements
const morgan = require('morgan'); // Middleware de logging des requêtes HTTP
const helmet = require('helmet'); // Sécurise les en-têtes HTTP
const xss = require('xss-clean'); // Protège contre les attaques XSS

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const promotionRoutes = require('./routes/promotionRoutes');

// Configuration de CORS
const corsOptions = {
  origin: 'https://votre-domaine.com', // Remplacez par votre domaine frontend
  optionsSuccessStatus: 200, // Réponse pour les requêtes OPTIONS
  credentials: true, // Si vous utilisez des cookies
};
app.use(cors(corsOptions)); // Applique les paramètres CORS

// Appliquer le rate limiter à toutes les requêtes
app.use(rateLimiter);

// Configurer morgan pour utiliser winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// Ajout de Helmet pour sécuriser les en-têtes HTTP
app.use(helmet());

// Protection contre les attaques XSS
app.use(xss());

// Limitation de la taille des requêtes JSON
app.use(express.json({ limit: '10kb' }));

// Définition des routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/promotions', promotionRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée.' });
});

// Gestion des erreurs globales
app.use(errorHandler);

// Rediriger HTTP vers HTTPS en production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Exporter l'app pour les tests
module.exports = app;
