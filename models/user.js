module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for username
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'customer', // Default to 'customer'
      },
    },
    {}
  );

  User.associate = (models) => {
    // Associations
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasOne(models.Cart, { foreignKey: 'userId' });
    User.hasMany(models.Product_Review, { foreignKey: 'userId' });
    User.hasMany(models.User_Token, { foreignKey: 'userId' });
  };

  return User;
};
