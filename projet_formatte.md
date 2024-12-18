### Structure du Projet

```plaintext
node_projet/
├── Api_ecom_Airpod
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   ├── config
│   │   └── config.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── productController.js
│   ├── index.js
│   ├── middlewares
│   │   ├── authenticateJWT.js
│   │   └── authorizeRoles.js
│   ├── migrations
│   │   ├── 20241218184154-create-user.js
│   │   ├── 20241218184211-create-product.js
│   │   ├── 20241218184220-create-category.js
│   │   ├── 20241218184240-create-order.js
│   │   ├── 20241218184248-create-order-item.js
│   │   ├── 20241218184255-create-cart.js
│   │   └── 20241218184303-create-cart-item.js
│   ├── models
│   │   ├── cart.js
│   │   ├── cartitem.js
│   │   ├── category.js
│   │   ├── index.js
│   │   ├── order.js
│   │   ├── orderitem.js
│   │   ├── product.js
│   │   └── user.js
│   ├── package.json
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   └── seeders
├── README.md
└── node_projet_base
    ├── README.md
    ├── config
    │   ├── config.js
    │   └── database.js
    └── src
        ├── controllers
        │   └── userController.js
        ├── models
        │   └── product.js
        ├── routes
        │   ├── productRoutes.js
        │   └── userRoutes.js
        └── server.js
```

# node_projet (dossier)

### README.md

```md
Consignes Nombre de personnes par groupe: 3 Règles de constitution des groupes: Libre

Objectifs Sujet du projet: Création d'une API Restfull (pas de front à créer) Type de rendu: Sources du projet (sans node_modules) Date de rendu de projet: 27/12/2023 23H42

Le code doit être rendu sous Git (GitHub ou Gitlab, projet publique). Chaque étudiant du groupe doit avoir travaillé sur le projet (avoir des commits à son nom), sinon 0.

Soumettre le lien Git dans le champs texte de soumission.

Evaluations En l'absence de travail d'un étudiant, l'étudiant se verra attribuer la note de 0.

Si une triche est détectée, la note du groupe sera de 0.

L'aspect technique du projet sera testé automatiquement, il faudra donc bien respecter les normes RESTFULL, les formats des entités ainsi que les règles de gestion des données.

Cahier des charges Créer une API RESTFULL sur un projet libre.

Critères:

Avoir au moins 3 entités en plus de l'entité(Model) User Mettre en place l'authentification JWT Utilisation de Sequelize pour la partie BDD Avoir une gestion de droits (unitaire/rôle ou les deux) Avoir une bonne hiérarchie de projet Avoir une bonne architecture logicielle Respecter la norme RESTFULL Rendu Indiquer dans le champs de rendu :

Lien Github publique Liste des pseudos Github associés au nom/prénom de l'étudiant

```


# Api_ecom_Airpod (dossier)

### .env

```

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ecommerce_airpods_db
DB_DIALECT=postgres
JWT_SECRET=your_jwt_secret

```

### README.md

```md
# E-commerce AirPods API

## Description

API RESTful pour un e-commerce spécialisé dans la vente d'AirPods. Permet la gestion des produits, catégories, utilisateurs, paniers et commandes avec authentification JWT.

## Technologies Utilisées

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT pour l'authentification
- bcryptjs pour le hachage des mots de passe
```

### index.js

```js
// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur', error: err.message });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Exporter l'app pour les tests
module.exports = app;

```

### package.json

```json
{
  "name": "api_ecom_airpod",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "sequelize": "sequelize"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.13.1",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.5",
    "sequelize-cli": "^6.6.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}

```


## config (dossier)

### config.js

```js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

```


## controllers (dossier)

### authController.js

```js
// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role: role || 'customer',
    });
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

```

### productController.js

```js
// controllers/productController.js
const { Product, Category } = require('../models');

exports.createProduct = async (req, res) => {
  const { nom, description, prix, stock, image_url, categorieId } = req.body;
  try {
    const category = await Category.findByPk(categorieId);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    const product = await Product.create({
      nom,
      description,
      prix,
      stock,
      image_url,
      categorieId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, { include: Category });
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nom, description, prix, stock, image_url, categorieId } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    if (categorieId) {
      const category = await Category.findByPk(categorieId);
      if (!category) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }
    }
    await product.update({
      nom: nom || product.nom,
      description: description || product.description,
      prix: prix || product.prix,
      stock: stock || product.stock,
      image_url: image_url || product.image_url,
      categorieId: categorieId || product.categorieId,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

```


## middlewares (dossier)

### authenticateJWT.js

```js
// middlewares/authenticateJWT.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;

```

### authorizeRoles.js

```js
// middlewares/authorizeRoles.js
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès refusé' });
      }
      next();
    };
  };
  
  module.exports = authorizeRoles;
  
```


## migrations (dossier)

### 20241218184154-create-user.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mot_de_passe: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
```

### 20241218184211-create-product.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      prix: {
        type: Sequelize.DECIMAL
      },
      stock: {
        type: Sequelize.INTEGER
      },
      image_url: {
        type: Sequelize.STRING
      },
      categorieId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
```

### 20241218184220-create-category.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};
```

### 20241218184240-create-order.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      date_commande: {
        type: Sequelize.DATE
      },
      statut: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
```

### 20241218184248-create-order-item.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commandeId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      quantité: {
        type: Sequelize.INTEGER
      },
      prix_unitaire: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};
```

### 20241218184255-create-cart.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      date_creation: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};
```

### 20241218184303-create-cart-item.js

```js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      quantité: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};
```


## models (dossier)

### cart.js

```js
// models/cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    date_creation: DataTypes.DATE,
  }, {});
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });
  };
  return Cart;
};

```

### cartitem.js

```js
// models/cartitem.js
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantité: DataTypes.INTEGER,
  }, {});
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
    CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return CartItem;
};

```

### category.js

```js
// models/category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product, { foreignKey: 'categorieId' });
  };
  return Category;
};

```

### index.js

```js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

```

### order.js

```js
// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    date_commande: DataTypes.DATE,
    statut: DataTypes.STRING,
    total: DataTypes.DECIMAL,
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'commandeId' });
  };
  return Order;
};

```

### orderitem.js

```js
// models/orderitem.js
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    commandeId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantité: DataTypes.INTEGER,
    prix_unitaire: DataTypes.DECIMAL,
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'commandeId' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return OrderItem;
};

```

### product.js

```js
// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    prix: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    categorieId: DataTypes.INTEGER,
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categorieId' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
  };
  return Product;
};

```

### user.js

```js
// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasOne(models.Cart, { foreignKey: 'userId' });
  };
  return User;
};

```


## routes (dossier)

### authRoutes.js

```js
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

```

### productRoutes.js

```js
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Routes publiques
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Routes protégées (Admin uniquement)
router.post('/', authenticateJWT, authorizeRoles('admin'), productController.createProduct);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), productController.updateProduct);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;

```


## seeders (dossier)


# node_projet_base (dossier)

### README.md

```md
# node_projet
Consignes
Nombre de personnes par groupe: 3
Règles de constitution des groupes: Libre

Objectifs
Sujet du projet: Création d'une API Restfull (pas de front à créer)
Type de rendu: Sources du projet (sans node_modules)
Date de rendu de projet: 27/12/2023 23H42

Le code doit être rendu sous Git (GitHub ou Gitlab, projet publique).
Chaque étudiant du groupe doit avoir travaillé sur le projet (avoir des commits à son nom), sinon 0.

Soumettre le lien Git dans le champs texte de soumission.

Evaluations
En l'absence de travail d'un étudiant, l'étudiant se verra attribuer la note de 0.

Si une triche est détectée, la note du groupe sera de 0.

L'aspect technique du projet sera testé automatiquement, il faudra donc bien respecter les normes RESTFULL, les formats des entités ainsi que les règles de gestion des données.

Cahier des charges
Créer une API RESTFULL sur un projet libre.

Critères:

Avoir au moins 3 entités en plus de l'entité(Model) User
Mettre en place l'authentification JWT
Utilisation de Sequelize pour la partie BDD
Avoir une gestion de droits (unitaire/rôle ou les deux)
Avoir une bonne hiérarchie de projet
Avoir une bonne architecture logicielle
Respecter la norme RESTFULL
Rendu
Indiquer dans le champs de rendu :

Lien Github publique
Liste des pseudos Github associés au nom/prénom de l'étudiant

```


## config (dossier)

### config.js

```js

```

### database.js

```js

```


## src (dossier)

### server.js

```js
const express = require('express');
const sequelize = require('../config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
```


### controllers (dossier)

### userController.js

```js
const AuthService = require('../services/authService');
const User = require('../models/user');

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const token = await AuthService.register({ 
        username, 
        email, 
        password 
      });
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const { username, email } = req.body;
      const user = await User.findByPk(req.user.id);
      
      if (username) user.username = username;
      if (email) user.email = email;
      
      await user.save();
      
      res.json({ 
        message: 'Profile updated successfully',
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;
```


### models (dossier)

### product.js

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Associations
Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

module.exports = Product;
```


### routes (dossier)

### productRoutes.js

```js
const express = require('express');
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', 
  authMiddleware, 
  roleMiddleware.isAdminOrManager, 
  ProductController.createProduct
);

router.get('/', 
  authMiddleware, 
  ProductController.getAllProducts
);

router.get('/:id', 
  authMiddleware, 
  ProductController.getProductById
);

router.put('/:id', 
  authMiddleware, 
  roleMiddleware.isAdminOrManager, 
  ProductController.updateProduct
);

router.delete('/:id', 
  authMiddleware, 
  roleMiddleware.isAdmin, 
  ProductController.deleteProduct
);

module.exports = router;
```

### userRoutes.js

```js
const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/', 
  authMiddleware, 
  roleMiddleware.isAdmin, 
  UserController.getAllUsers
);

router.get('/profile', 
  authMiddleware, 
  UserController.getUserProfile
);

router.put('/profile', 
  authMiddleware, 
  UserController.updateUserProfile
);

module.exports = router;
```


