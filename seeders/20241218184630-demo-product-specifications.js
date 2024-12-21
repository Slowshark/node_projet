// seeders/20241218184630-demo-product-specifications.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer les IDs des produits
    const products = await queryInterface.sequelize.query(
      `SELECT id, nom FROM "Products";`
    );
    const productRows = products[0];

    await queryInterface.bulkInsert('Product_Specifications', [
      {
        productId: productRows.find(p => p.nom === 'AirPods Pro').id,
        specification_key: 'Date de sortie',
        specification_value: '2019-10-30',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'AirPods Pro').id,
        specification_key: 'Mémoire',
        specification_value: 'N/A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'AirPods Pro').id,
        specification_key: 'Couleur',
        specification_value: 'Blanc',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'AirPods Max').id,
        specification_key: 'Date de sortie',
        specification_value: '2020-12-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'AirPods Max').id,
        specification_key: 'Mémoire',
        specification_value: 'N/A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'AirPods Max').id,
        specification_key: 'Couleur',
        specification_value: 'Noir',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'Étui de Charge sans Fil').id,
        specification_key: 'Date de sortie',
        specification_value: '2020-03-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: productRows.find(p => p.nom === 'Étui de Charge sans Fil').id,
        specification_key: 'Capacité de charge',
        specification_value: 'MagSafe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez d'autres spécifications si nécessaire
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product_Specifications', null, {});
  }
};
