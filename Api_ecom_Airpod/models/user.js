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
