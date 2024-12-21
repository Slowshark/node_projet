# API E-com Tel&ecout

## Description

API E-com Tel&ecout est une API e-commerce dédiée à la gestion des téléphones et des écouteurs sans fil. Elle permet aux utilisateurs de s'inscrire, de se connecter, de parcourir les produits, de gérer leur panier, de passer des commandes, d'appliquer des promotions, et offre des fonctionnalités de sécurité avancées telles que l'authentification JWT et la gestion des rôles.

## Membres

- **Yvanthivong UNG**
- **Antoine PERICHON**
- **Thushan Malinga RATHNAYAKA MUDIYANSELAGE**

## Fonctionnalités

- **Starter:** Yvanthivong Ung
- **Sécurité:** Antoine PERICHON
- **Base de données:** Thushan Malinga RATHNAYAKA MUDIYANSELAGE

## Technologies Utilisées

- **Backend :** [Node.js](https://nodejs.org/) (v14+), [Express.js](https://expressjs.com/)
- **Base de Données :** [PostgreSQL](https://www.postgresql.org/) (ou [MySQL](https://www.mysql.com/) selon votre choix)
- **ORM :** [Sequelize](https://sequelize.org/)
- **Sécurité :**
  - [JWT (JSON Web Tokens)](https://jwt.io/) pour l'authentification
  - [bcrypt.js](https://www.npmjs.com/package/bcryptjs) pour le hachage des mots de passe
  - [express-validator](https://express-validator.github.io/docs/) pour la validation des données
  - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) pour limiter le nombre de requêtes
  - [CORS](https://www.npmjs.com/package/cors) pour la gestion des origines croisées
- **Logging :**
  - [Winston](https://github.com/winstonjs/winston) pour la gestion des logs
  - [Morgan](https://github.com/expressjs/morgan) pour logger les requêtes HTTP
- **Gestion des Environnements :** [dotenv](https://www.npmjs.com/package/dotenv)
- **Validation des Données :** [express-validator](https://express-validator.github.io/docs/)
- **Rate Limiting :** [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- **Autres Outils :**
  - [Nodemon](https://www.npmjs.com/package/nodemon) pour le rechargement automatique en développement
  - [Sequelize CLI](https://sequelize.org/master/manual/migrations.html) pour les migrations et les seeders

## Installation des Dépendances de Sécurité

Pour implémenter les améliorations de sécurité, installez les packages suivants dans le répertoire racine de votre projet **API E-com Tel&ecout** :

```bash
# Installer les bibliothèques de validation des données
npm install express-validator

# Installer CORS pour la gestion des origines croisées
npm install cors

# Installer express-rate-limit pour limiter le nombre de requêtes
npm install express-rate-limit

# Installer winston pour la gestion des logs
npm install winston

# Installer morgan pour logger les requêtes HTTP (optionnel mais recommandé)
npm install morgan

# Installer dotenv pour la gestion des variables d'environnement
npm install dotenv

# Installer bcrypt.js pour le hachage des mots de passe
npm install bcryptjs

# Installer jsonwebtoken pour l'authentification JWT
npm install jsonwebtoken

# Installer sequelize et sequelize-cli si ce n'est pas déjà fait
npm install sequelize
npm install --save-dev sequelize-cli
