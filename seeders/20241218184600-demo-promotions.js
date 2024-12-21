// seeders/20241218184600-demo-promotions.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Promotions', [
      {
        promotion_code: 'PROMO10',
        description: '10% de réduction sur votre commande',
        discount_percentage: 10.00,
        valid_from: '2024-01-01',
        valid_until: '2024-12-31',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        promotion_code: 'PROMO20',
        description: '20% de réduction sur les AirPods Pro',
        discount_percentage: 20.00,
        valid_from: '2024-02-01',
        valid_until: '2024-06-30',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Ajoutez d'autres promotions si nécessaire
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Promotions', null, {});
  }
};
