// migrations/20241218184430-create-payment-method.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payment_Methods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      method_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    
    // Insertion des méthodes de paiement par défaut
    await queryInterface.bulkInsert('Payment_Methods', [
      {
        method_name: 'Carte de Crédit',
        description: 'Paiement par carte de crédit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'PayPal',
        description: 'Paiement via PayPal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'Virement Bancaire',
        description: 'Paiement par virement bancaire',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payment_Methods');
  }
};
