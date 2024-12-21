'use strict';
const bcrypt = require('bcryptjs'); // Module pour le hachage des données sensibles

module.exports = (sequelize, DataTypes) => {
  const User_Token = sequelize.define('User_Token', {
    userId: {
      type: DataTypes.INTEGER, // ID de l'utilisateur
      allowNull: false, // Champ obligatoire
    },
    token: {
      type: DataTypes.TEXT, // Token d'accès
      allowNull: false, // Champ obligatoire
    },
    issued_at: {
      type: DataTypes.DATE, // Date de création du token
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE, // Date d'expiration du token
      allowNull: false,
    },
  }, {});

  // Déclaration des associations
  User_Token.associate = function(models) {
    User_Token.belongsTo(models.User, { foreignKey: 'userId' }); // Association avec le modèle User
  };

  // Hook pour hacher les tokens avant de les enregistrer
  User_Token.beforeCreate(async (tokenInstance) => {
    tokenInstance.token = await bcrypt.hash(tokenInstance.token, 10); // Hachage du token
  });

  return User_Token;
};
