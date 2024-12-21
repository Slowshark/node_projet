// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,       // 'YvanU'
    password: process.env.DB_PASSWORD,   // 'YvanU'
    database: process.env.DB_NAME,       // 'bdd_node_shop'
    host: process.env.DB_HOST,           // 'localhost'
    port: process.env.DB_PORT,           // 5432
    dialect: process.env.DB_DIALECT,     // 'postgres'
    logging: false,                      // Désactive les logs SQL (optionnel)
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
};
