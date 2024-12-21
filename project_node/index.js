'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');

// Importer les routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const promotionRoutes = require('./routes/promotionRoutes');

// Configuration de CORS
const corsOptions = {
  origin: 'https://votre-domaine.com', // Remplacez par votre domaine frontend
  optionsSuccessStatus: 200,
  credentials: true, // Si vous utilisez des cookies
};

app.use(cors(corsOptions));

// Appliquer le rate limiter à toutes les requêtes
app.use(rateLimiter);

// Configurer morgan pour utiliser winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Ajout de Helmet pour sécuriser les en-têtes HTTP
app.use(helmet());

// Protection contre les attaques XSS
app.use(xss());

// Limitation de la taille des requêtes JSON
app.use(express.json({ limit: '10kb' }));

// Routes
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

// Démarrer le serveur en fonction de l'environnement
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  const https = require('https');
  const fs = require('fs');

  // Vérifier si les chemins des certificats sont définis
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;

  if (sslKeyPath && sslCertPath) {
    const options = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath)
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(`Serveur HTTPS démarré sur le port ${PORT}`);
    });
  } else {
    console.warn('Certificats SSL non fournis. Démarrage du serveur en HTTP.');
    app.listen(PORT, () => {
      console.log(`Serveur HTTP démarré sur le port ${PORT}`);
    });
  }
} else {
  // En développement, utiliser HTTP
  app.listen(PORT, () => {
    console.log(`Serveur HTTP démarré sur le port ${PORT}`);
  });
}

// Exporter l'app pour les tests
module.exports = app;
