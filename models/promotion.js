// models/promotion.js
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    promotion_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT,
    discount_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: { min: 0, max: 100 }
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valid_until: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});

  Promotion.associate = function(models) {
    Promotion.hasMany(models.Order_Promotion, { foreignKey: 'promotionId' });
  };

  return Promotion;
};
