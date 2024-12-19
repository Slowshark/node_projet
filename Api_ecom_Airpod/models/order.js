// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    date_commande: DataTypes.DATE,
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'En attente'
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    shipping_address: DataTypes.TEXT,
    payment_method_id: DataTypes.INTEGER,
    shipping_status_id: DataTypes.INTEGER,
  }, {});
  
  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    Order.hasMany(models.OrderItem, { foreignKey: 'commandeId' });
    Order.hasMany(models.Payment, { foreignKey: 'orderId' });
    Order.hasMany(models.Order_Promotion, { foreignKey: 'orderId' });
    Order.belongsTo(models.Payment_Method, { foreignKey: 'payment_method_id' });
    Order.belongsTo(models.Shipping_Status, { foreignKey: 'shipping_status_id' });
  };
  
  return Order;
};
