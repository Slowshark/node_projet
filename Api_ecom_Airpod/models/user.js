// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'customer'
    },
  }, {});
  
  User.associate = function(models) {
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasOne(models.Cart, { foreignKey: 'userId' });
    User.hasMany(models.Product_Review, { foreignKey: 'userId' });
    User.hasMany(models.User_Token, { foreignKey: 'userId' });
  };
  
  return User;
};
