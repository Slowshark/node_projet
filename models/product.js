'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dimensions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warranty_period: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(2083),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      sku: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      barcode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      date_release: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'Products',
      underscored: true,
    }
  );

  Product.associate = function (models) {
    // Associations
    Product.belongsTo(models.Category, { foreignKey: 'category_id' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
    Product.hasMany(models.Product_Review, { foreignKey: 'productId' });
    Product.hasMany(models.Product_Specification, { foreignKey: 'productId' });
  };

  return Product;
};
