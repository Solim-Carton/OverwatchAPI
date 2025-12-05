const express = require('express');
const { Hero } = require('./database/setup'); 
const app = express();
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

// Get hero by name (case-insensitive)
app.get('/api/heroes/name/:name', async (req, res) => {
    try {
        const hero = await Hero.findOne({
            where: { name: req.params.name }
        });
        if (!hero) return res.status(404).json({ error: 'Hero not found' });
        res.json(hero);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch hero' });
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


app.listen(port, () => {
    console.log(`Overwatch Heroes API running at http://localhost:${port}`);
});
