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
