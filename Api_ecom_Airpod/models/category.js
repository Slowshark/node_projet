// models/category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product, { foreignKey: 'categorieId' });
  };
  return Category;
};
