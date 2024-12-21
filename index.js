const express = require('express');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json()); // Middleware pour parser JSON

// Ajouter les routes produits
app.use('/products', productRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//test1