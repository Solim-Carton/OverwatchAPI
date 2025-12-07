
const express = require('express');
const { Hero } = require('./database/setup'); 
const app = express();
const { Op } = require('sequelize');
const port = 3000;

app.use(express.json());


// Get all heroes
app.get('/api/heroes', async (req, res) => {
    try {
        const heroes = await Hero.findAll();
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch heroes' });
    }
});

// Get hero by ID
app.get('/api/heroes/:id', async (req, res) => {
    try {
        const hero = await Hero.findByPk(req.params.id);
        if (!hero) return res.status(404).json({ error: 'Hero not found' });
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch hero' });
    }
});

// Partial name search
app.get('/api/heroes/search', async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: 'Name query parameter is required' });

        // Find all heroes whose name contains the query (case-insensitive)
        const heroes = await Hero.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%` // use Op.iLike for Postgres; Op.like works for SQLite
                }
            }
        });

        if (!heroes || heroes.length === 0) {
            return res.status(404).json({ error: 'No heroes found matching that name' });
        }

        res.json(heroes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new hero
app.post('/api/heroes', async (req, res) => {
    try {
        const hero = await Hero.create(req.body);
        res.status(201).json(hero);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create hero' });
    }
});

// Update an existing hero
app.put('/api/heroes/:id', async (req, res) => {
    try {
        const hero = await Hero.findByPk(req.params.id);
        if (!hero) return res.status(404).json({ error: 'Hero not found' });
        await hero.update(req.body);
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update hero' });
    }
});

// Delete a hero
app.delete('/api/heroes/:id', async (req, res) => {
    try {
        const hero = await Hero.findByPk(req.params.id);
        if (!hero) return res.status(404).json({ error: 'Hero not found' });
        await hero.destroy();
        res.json({ message: 'Hero deleted', hero });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete hero' });
    }
});


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Overwatch Heroes API running at http://localhost:${port}`);
    });
}

module.exports = app;
