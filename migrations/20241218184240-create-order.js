// migrations/20241218184240-create-order.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      date_commande: {
        type: Sequelize.DATE
      },
      statut: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      shipping_address: {
        type: Sequelize.TEXT
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Payment_Methods',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      shipping_status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shipping_Status',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
