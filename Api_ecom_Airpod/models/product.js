// models/product.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nom: {
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
    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    categorieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date_release: {
      type: DataTypes.DATE,
      allowNull: true, // Correspond à la migration
    },
  }, {
    tableName: 'Products',
    underscored: true,
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categorieId' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
    Product.hasMany(models.Product_Review, { foreignKey: 'productId' });
    Product.hasMany(models.Product_Specification, { foreignKey: 'productId' });
  };

  return Product;
};
