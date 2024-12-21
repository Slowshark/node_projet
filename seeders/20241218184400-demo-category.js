// seeders/20241218184400-demo-category.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        nom: 'AirPods Pro',
        description: 'AirPods Pro avec réduction active du bruit',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'AirPods Max',
        description: 'Casque audio AirPods Max',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Accessoires',
        description: 'Accessoires pour AirPods',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
//demo
