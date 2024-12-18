// models/orderitem.js
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    commandeId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantité: DataTypes.INTEGER,
    prix_unitaire: DataTypes.DECIMAL,
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'commandeId' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return OrderItem;
};
