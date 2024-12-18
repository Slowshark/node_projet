// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    prix: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    categorieId: DataTypes.INTEGER,
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'categorieId' });
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
  };
  return Product;
};
