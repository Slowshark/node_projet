'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      cost_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      dimensions: {
        type: Sequelize.STRING,
        allowNull: false
      },
      origin_country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      warranty_period: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING(2083)
      },
      sku: {
        type: Sequelize.STRING,
        unique: true
      },
      barcode: {
        type: Sequelize.STRING,
        unique: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
