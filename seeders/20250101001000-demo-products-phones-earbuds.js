// seeders/20250101001000-demo-products-phones-earbuds.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer les IDs des catégories
    const categories = await queryInterface.sequelize.query(
      `SELECT id, nom FROM "Categories";`
    );
    const categoryRows = categories[0];
    const phonesCategory = categoryRows.find(cat => cat.nom === 'Téléphones');
    const earbudsCategory = categoryRows.find(cat => cat.nom === 'Écouteurs Sans Fil');

    if (!phonesCategory || !earbudsCategory) {
      throw new Error('Les catégories "Téléphones" et/ou "Écouteurs Sans Fil" n\'existent pas.');
    }

    // Ajouter les téléphones
    const phones = [
      // iPhone Models
      {
        nom: 'iPhone 12',
        description: 'iPhone 12 avec puce A14 Bionic, écran Super Retina XDR.',
        prix: 799.00,
        stock: 50,
        image_url: 'https://example.com/images/iphone_12.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'iPhone 13',
        description: 'iPhone 13 avec puce A15 Bionic, amélioration de la caméra.',
        prix: 899.00,
        stock: 50,
        image_url: 'https://example.com/images/iphone_13.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Samsung Models
      {
        nom: 'Samsung Galaxy S20',
        description: 'Samsung Galaxy S20 avec écran Dynamic AMOLED 2X.',
        prix: 999.00,
        stock: 50,
        image_url: 'https://example.com/images/galaxy_s20.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Samsung Galaxy S21',
        description: 'Samsung Galaxy S21 avec caméra avancée et performance améliorée.',
        prix: 1099.00,
        stock: 50,
        image_url: 'https://example.com/images/galaxy_s21.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Google Models
      {
        nom: 'Google Pixel 5',
        description: 'Google Pixel 5 avec Android pur et excellente caméra.',
        prix: 699.00,
        stock: 50,
        image_url: 'https://example.com/images/pixel_5.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Google Pixel 6',
        description: 'Google Pixel 6 avec puce Google Tensor et nouvelles fonctionnalités.',
        prix: 799.00,
        stock: 50,
        image_url: 'https://example.com/images/pixel_6.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Xiaomi Models
      {
        nom: 'Xiaomi Mi 10',
        description: 'Xiaomi Mi 10 avec Snapdragon 865 et écran AMOLED.',
        prix: 699.00,
        stock: 50,
        image_url: 'https://example.com/images/mi_10.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'Xiaomi Mi 11',
        description: 'Xiaomi Mi 11 avec puce Snapdragon 888 et caméra avancée.',
        prix: 749.00,
        stock: 50,
        image_url: 'https://example.com/images/mi_11.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // OnePlus Models
      {
        nom: 'OnePlus 8',
        description: 'OnePlus 8 avec puce Snapdragon 865 et charge rapide Warp Charge 30T.',
        prix: 699.00,
        stock: 50,
        image_url: 'https://example.com/images/oneplus_8.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nom: 'OnePlus 9',
        description: 'OnePlus 9 avec caméra Hasselblad et puce Snapdragon 888.',
        prix: 729.00,
        stock: 50,
        image_url: 'https://example.com/images/oneplus_9.jpg',
        categorieId: phonesCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez d'autres modèles de OnePlus depuis 2020
    ];

    // Ajouter les écouteurs sans fil
    const earbuds = [
      // Apple AirPods Pro
      {
        nom: 'AirPods Pro',
        description: 'AirPods Pro avec réduction active du bruit et mode Transparence.',
        prix: 249.00,
        stock: 100,
        image_url: 'https://example.com/images/airpods_pro.jpg',
        categorieId: earbudsCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Samsung Galaxy Buds Pro
      {
        nom: 'Galaxy Buds Pro',
        description: 'Galaxy Buds Pro avec son intelligent et résistance à l\'eau.',
        prix: 199.00,
        stock: 100,
        image_url: 'https://example.com/images/galaxy_buds_pro.jpg',
        categorieId: earbudsCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Google Pixel Buds
      {
        nom: 'Pixel Buds A-Series',
        description: 'Pixel Buds A-Series avec son clair et intégration Google Assistant.',
        prix: 99.00,
        stock: 100,
        image_url: 'https://example.com/images/pixel_buds_a_series.jpg',
        categorieId: earbudsCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Xiaomi Mi Earbuds Pro
      {
        nom: 'Mi Earbuds Pro',
        description: 'Mi Earbuds Pro avec annulation active du bruit et autonomie prolongée.',
        prix: 149.00,
        stock: 100,
        image_url: 'https://example.com/images/mi_earbuds_pro.jpg',
        categorieId: earbudsCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // OnePlus Buds Pro
      {
        nom: 'OnePlus Buds Pro',
        description: 'OnePlus Buds Pro avec qualité sonore premium et réduction active du bruit.',
        prix: 149.00,
        stock: 100,
        image_url: 'https://example.com/images/oneplus_buds_pro.jpg',
        categorieId: earbudsCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ajoutez d'autres écouteurs sans fil si nécessaire
    ];

    // Insérer les produits
    await queryInterface.bulkInsert('Products', phones.concat(earbuds), {});
    
    // Ajouter les spécifications des produits (date de sortie)
    // Récupérer les IDs des produits
    const products = await queryInterface.sequelize.query(
      `SELECT id, nom FROM "Products";`
    );
    const productRows = products[0];

    const specifications = [];

    phones.forEach(phone => {
      const product = productRows.find(p => p.nom === phone.nom);
      if (product) {
        // Exemple de date de sortie, à ajuster selon les modèles réels
        let releaseDate;
        switch (phone.nom) {
          case 'iPhone 12':
            releaseDate = '2020-10-23';
            break;
          case 'iPhone 13':
            releaseDate = '2021-09-24';
            break;
          case 'Samsung Galaxy S20':
            releaseDate = '2020-03-06';
            break;
          case 'Samsung Galaxy S21':
            releaseDate = '2021-01-29';
            break;
          case 'Google Pixel 5':
            releaseDate = '2020-10-15';
            break;
          case 'Google Pixel 6':
            releaseDate = '2021-10-28';
            break;
          case 'Xiaomi Mi 10':
            releaseDate = '2020-02-13';
            break;
          case 'Xiaomi Mi 11':
            releaseDate = '2021-02-08';
            break;
          case 'OnePlus 8':
            releaseDate = '2020-04-14';
            break;
          case 'OnePlus 9':
            releaseDate = '2021-03-23';
            break;
          default:
            releaseDate = '2020-01-01';
        }

        specifications.push({
          productId: product.id,
          specification_key: 'Date de sortie',
          specification_value: releaseDate,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    earbuds.forEach(earbud => {
      const product = productRows.find(p => p.nom === earbud.nom);
      if (product) {
        // Exemple de date de sortie, à ajuster selon les modèles réels
        let releaseDate;
        switch (earbud.nom) {
          case 'AirPods Pro':
            releaseDate = '2019-10-30';
            break;
          case 'Galaxy Buds Pro':
            releaseDate = '2021-01-14';
            break;
          case 'Pixel Buds A-Series':
            releaseDate = '2021-06-17';
            break;
          case 'Mi Earbuds Pro':
            releaseDate = '2021-07-20';
            break;
          case 'OnePlus Buds Pro':
            releaseDate = '2021-07-29';
            break;
          default:
            releaseDate = '2020-01-01';
        }

        specifications.push({
          productId: product.id,
          specification_key: 'Date de sortie',
          specification_value: releaseDate,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    // Insérer les spécifications
    await queryInterface.bulkInsert('Product_Specifications', specifications, {});
  },

  async down(queryInterface, Sequelize) {
    // Supprimer les produits ajoutés
    await queryInterface.bulkDelete('Products', {
      nom: [
        // Téléphones
        'iPhone 12', 'iPhone 13',
        'Samsung Galaxy S20', 'Samsung Galaxy S21',
        'Google Pixel 5', 'Google Pixel 6',
        'Xiaomi Mi 10', 'Xiaomi Mi 11',
        'OnePlus 8', 'OnePlus 9',
        // Écouteurs Sans Fil
        'AirPods Pro',
        'Galaxy Buds Pro',
        'Pixel Buds A-Series',
        'Mi Earbuds Pro',
        'OnePlus Buds Pro',
      ]
    }, {});

    // Supprimer les spécifications ajoutées
    await queryInterface.bulkDelete('Product_Specifications', {
      specification_key: 'Date de sortie'
    }, {});
  }
};
