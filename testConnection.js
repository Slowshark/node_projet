// testConnection.js
const { sequelize } = require('./models');

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
    process.exit();
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
    process.exit(1);
  });
