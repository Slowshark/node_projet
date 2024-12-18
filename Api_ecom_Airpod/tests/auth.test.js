// tests/auth.test.js
const request = require('supertest');
const app = require('../index'); // Assurez-vous que votre index.js exporte l'app Express
const { sequelize, User } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Réinitialiser la base de données pour les tests
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Test User',
        email: 'testuser@example.com',
        mot_de_passe: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Utilisateur créé avec succès');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        mot_de_passe: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        mot_de_passe: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Mot de passe incorrect');
  });

  it('should not register with existing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nom: 'Another User',
        email: 'testuser@example.com',
        mot_de_passe: 'password456',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email déjà utilisé');
  });
});
