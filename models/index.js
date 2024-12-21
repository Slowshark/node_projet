'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

// Vérifier si une variable d'environnement pour la connexion est définie
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lire tous les fichiers de modèle dans le dossier et les initialiser
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Exclure les fichiers cachés
      file !== basename && // Exclure ce fichier index.js
      file.slice(-3) === '.js' // Inclure uniquement les fichiers JS
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configurer les associations des modèles
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporter les instances Sequelize et les modèles
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
