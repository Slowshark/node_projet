// models/payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_method_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      transaction_id: {
        type: DataTypes.STRING,
        unique: true
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Complété'
      }
    }, {});
  
    Payment.associate = function(models) {
      Payment.belongsTo(models.Order, { foreignKey: 'orderId' });
      Payment.belongsTo(models.Payment_Method, { foreignKey: 'payment_method_id' });
    };
  
    return Payment;
  };
