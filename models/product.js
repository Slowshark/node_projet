'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origin_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    warranty_period: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING(2083)
    },
    sku: {
      type: DataTypes.STRING,
      unique: true
    },
    barcode: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'Products',
    underscored: true
  });

  Product.associate = function(models) {
    // Associations
    Product.belongsTo(models.Category, { foreignKey: 'category_id' });
  };

  return Product;
};
//test1