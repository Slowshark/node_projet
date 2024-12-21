// seeders/20241218184610-demo-product-review.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer les IDs des produits et des utilisateurs
    const products = await queryInterface.sequelize.query(
      `SELECT id, nom FROM "Products";`
    );
    const productRows = products[0];

    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users";`
    );
    const userRows = users[0];

    await queryInterface.bulkInsert('Product_Reviews', [
      {
        productId: productRows.find(p => p.nom === 'AirPods Pro').id,
        userId: userRows.find(u => u.email === 'customer@example.com').id,
        rating: 5,
        comment: 'Excellente qualité sonore et confortable.',
        review_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: productRows.find(p => p.nom === 'AirPods Max').id,
        userId: userRows.find(u => u.email === 'customer@example.com').id,
        rating: 4,
        comment: 'Très bon son, mais un peu lourd.',
        review_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Ajoutez d'autres avis si nécessaire
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product_Reviews', null, {});
  }
};
