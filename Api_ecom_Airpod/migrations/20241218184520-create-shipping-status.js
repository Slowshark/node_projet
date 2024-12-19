// migrations/20241218184520-create-shipping-status.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shipping_Status', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status_name: {
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

    // Insertion des statuts de livraison par défaut
    await queryInterface.bulkInsert('Shipping_Status', [
      {
        status_name: 'En attente',
        description: 'Commande reçue mais pas encore traitée',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_name: 'Expédiée',
        description: 'Commande expédiée au client',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_name: 'Livrée',
        description: 'Commande livrée au client',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status_name: 'Annulée',
        description: 'Commande annulée',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shipping_Status');
  }
};
