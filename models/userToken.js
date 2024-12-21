'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User_Token = sequelize.define('User_Token', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    issued_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});

  User_Token.associate = function(models) {
    User_Token.belongsTo(models.User, { foreignKey: 'userId' });
  };

  // Hash token before saving
  User_Token.beforeCreate(async (tokenInstance) => {
    tokenInstance.token = await bcrypt.hash(tokenInstance.token, 10);
  });

  return User_Token;
};
