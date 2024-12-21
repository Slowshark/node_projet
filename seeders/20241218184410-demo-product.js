// seeders/20241218184410-demo-product.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Récupérer les IDs des catégories
    const categories = await queryInterface.sequelize.query(
      `SELECT id from "Categories";`
    );
    const categoryRows = categories[0];

    await queryInterface.bulkInsert('Products', [
      {
        nom: 'AirPods Pro',
        description: 'Les AirPods Pro offrent une qualité sonore exceptionnelle avec une réduction active du bruit.',
        prix: 279.00,
        stock: 100,
        image_url: 'https://example.com/images/airpods_pro.jpg',
        categorieId: categoryRows.find(cat => cat.nom === 'AirPods Pro').id,
        date_release: '2019-10-30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'AirPods Max',
        description: 'Casque audio haut de gamme avec une qualité sonore immersive et un design élégant.',
        prix: 549.00,
        stock: 50,
        image_url: 'https://example.com/images/airpods_max.jpg',
        categorieId: categoryRows.find(cat => cat.nom === 'AirPods Max').id,
        date_release: '2020-12-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Étui de Charge sans Fil',
        description: 'Étui de charge pratique pour recharger vos AirPods Pro sans fil.',
        prix: 49.00,
        stock: 200,
        image_url: 'https://example.com/images/charge_case.jpg',
        categorieId: categoryRows.find(cat => cat.nom === 'Accessoires').id,
        date_release: '2020-03-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez d'autres produits si nécessaire
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
