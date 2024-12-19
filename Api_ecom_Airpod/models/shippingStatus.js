// models/shippingStatus.js
module.exports = (sequelize, DataTypes) => {
    const Shipping_Status = sequelize.define('Shipping_Status', {
      status_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: DataTypes.TEXT,
    }, {});
  
    Shipping_Status.associate = function(models) {
      Shipping_Status.hasMany(models.Order, { foreignKey: 'shipping_status_id' });
    };
  
    return Shipping_Status;
  };
  