// migrations/20250101002000-add-date_release-to-products.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'date_release', {
      type: Sequelize.DATE,
      allowNull: true, // Vous pouvez définir sur false si nécessaire
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'date_release');
  }
};
