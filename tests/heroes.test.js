const request = require('supertest');
const app = require('../server'); 
const { seedHeroes } = require('../database/seed');

describe("Overwatch Heroes API", () => {

    test("GET /api/heroes should return an array", async () => {
        const res = await request(app).get('/api/heroes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /api/heroes/1 should return hero with id 1", async () => {
        const res = await request(app).get('/api/heroes/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    test("GET /api/heroes/999 should return 404", async () => {
        const res = await request(app).get('/api/heroes/999');
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

        const res = await request(app).post('/api/heroes').send(newHero);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('name', "Unit Test Hero");
    });

    test("DELETE /api/heroes/:id should delete a hero", async () => {
        const res = await request(app).delete('/api/heroes/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

});
