// seeders/20250101000000-demo-categories-phones-earbuds.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        nom: 'Téléphones',
        description: 'Smartphones de différentes marques',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Écouteurs Sans Fil',
        description: 'Écouteurs sans fil de différentes marques',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {
      nom: ['Téléphones', 'Écouteurs Sans Fil']
    }, {});
  }
};
