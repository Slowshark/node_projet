// models/productSpecification.js
module.exports = (sequelize, DataTypes) => {
  const Product_Specification = sequelize.define('Product_Specification', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specification_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specification_value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Product_Specification.associate = function(models) {
    Product_Specification.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Product_Specification;
};
