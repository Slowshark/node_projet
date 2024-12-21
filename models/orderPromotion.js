// models/orderPromotion.js
module.exports = (sequelize, DataTypes) => {
  const Order_Promotion = sequelize.define('Order_Promotion', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Order_Promotion.associate = function(models) {
    Order_Promotion.belongsTo(models.Order, { foreignKey: 'orderId' });
    Order_Promotion.belongsTo(models.Promotion, { foreignKey: 'promotionId' });
  };

  return Order_Promotion;
};
