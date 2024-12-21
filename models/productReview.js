// models/productReview.js
module.exports = (sequelize, DataTypes) => {
    const Product_Review = sequelize.define('Product_Review', {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      comment: DataTypes.TEXT,
      review_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {});
  
    Product_Review.associate = function(models) {
      Product_Review.belongsTo(models.Product, { foreignKey: 'productId' });
      Product_Review.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Product_Review;
  };
  