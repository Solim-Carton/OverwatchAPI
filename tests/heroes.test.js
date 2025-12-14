const request = require('supertest');
const app = require('../server');
const {db:sequelize, User, Hero } = require('../database/setup');
const bcrypt = require('bcryptjs');
const { seedHeroes } = require('../database/seed');
let token;

beforeAll(async () => {
  // 1. Reset database
  await sequelize.sync({ force: true });

  // 2. Create admin user 
  await User.create({
    username: 'test',
    password: await bcrypt.hash('test123', 10),
    role: 'admin'
  });

  // 3. Seed heroes
  await seedHeroes();

  // 4. Login to get JWT
  const res = await request(app)
    .post('/api/auth/login')   
    .send({
      username: 'test',
      password: 'test123'
    });

  token = res.body.token;
  if (!token) throw new Error('Login failed, no token returned');
});


describe("Overwatch Heroes API", () => {

    test("GET /api/heroes should return an array", async () => {
        const res = await request(app)
            .get('/api/heroes')
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /api/heroes/1 should return hero with id 1", async () => {
        const res = await request(app)
            .get('/api/heroes/1')
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    test("GET /api/heroes/999 should return 404", async () => {
        const res = await request(app)
            .get('/api/heroes/999')
        expect(res.statusCode).toBe(404);
    });

    test("POST /api/heroes should create a new hero", async () => {
        const newHero = {
            name: "Unit Test Hero",
            role: "Support",
            good_against: ["Training Bot"],
            bad_against: ["Bastion"],
            best_maps: ["Practice Range"]
        };

        const res = await request(app)
            .post('/api/heroes')
            .send(newHero)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('name', "Unit Test Hero");
    });

    test("DELETE /api/heroes/:id should delete a hero", async () => {
        const res = await request(app)
            .delete('/api/heroes/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

});

