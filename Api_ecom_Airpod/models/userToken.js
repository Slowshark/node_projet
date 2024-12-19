// models/userToken.js
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
  
    return User_Token;
  };
  