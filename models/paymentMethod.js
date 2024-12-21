// models/paymentMethod.js
module.exports = (sequelize, DataTypes) => {
  const Payment_Method = sequelize.define('Payment_Method', {
    method_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT,
  }, {});

  Payment_Method.associate = function(models) {
    Payment_Method.hasMany(models.Payment, { foreignKey: 'payment_method_id' });
  };

  return Payment_Method;
};
