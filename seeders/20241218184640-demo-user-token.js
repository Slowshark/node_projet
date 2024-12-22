// seeders/20241218184640-demo-user-token.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer les IDs des utilisateurs
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users";`
    );
    const userRows = users[0];

    await queryInterface.bulkInsert('User_Tokens', [
      {
        userId: userRows.find(u => u.email === 'admin@example.com').id,
        token: 'dummy_admin_token',
        issued_at: new Date(),
        expires_at: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 heure plus tard
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: userRows.find(u => u.email === 'customer@example.com').id,
        token: 'dummy_customer_token',
        issued_at: new Date(),
        expires_at: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 heure plus tard
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Ajoutez d'autres tokens si nécessaire
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User_Tokens', null, {});
  }
};
