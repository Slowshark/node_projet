// seeders/20241218184420-demo-user.js
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10);
    const hashedPasswordCustomer = await bcrypt.hash('customerpassword', 10);

    await queryInterface.bulkInsert('Users', [
      {
        nom: 'Admin User',
        email: 'admin@example.com',
        mot_de_passe: hashedPasswordAdmin,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Customer User',
        email: 'customer@example.com',
        mot_de_passe: hashedPasswordCustomer,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez d'autres utilisateurs si nécessaire
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
