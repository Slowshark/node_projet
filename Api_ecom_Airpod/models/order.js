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
