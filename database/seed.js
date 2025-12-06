const bcrypt = require('bcryptjs');
const { db, Hero } = require('./setup');

async function seedHeros() {
    try {
        // Force sync to reset database
        await db.sync({ force: true });
        console.log('Database reset successfully.');


        //Seed Heros
        await Hero.bulkCreate([
    {
        //Tanks
        name: 'D.Va',
        role: 'Tank',
        good_against: ["Winston","Freja", "Pharah", "Widowmaker", "Ana", "Zenyatta"],
        bad_against: ["Zarya", "Symmetra", "Brigitte"],
        best_maps: ["Busan", "Dorado", "Numbani"]
    },
    {
        name: 'Reinhardt',
        role: 'Tank',
        good_against: ["Sigma","Reaper"],
        bad_against: ["Ramattra","Pharah", "Bastion","Zenyatta"],
        best_maps: ["King's Row", "Eichenwalde"]
    },
    {
        name: 'Doomfist',
        role: 'Tank',
        good_against: ["Reinhardt","Widowmaker","Zenyatta"],
        bad_against: ["Roadhog","Sombra","Ana"],
        best_maps: ["Nepal", "Oasis"]
    },
    {
        name: 'Hazard',
        role: 'Tank',
        good_against: ["Zarya","Ashe","Lifeweaver"],
        bad_against: ["Orisa","Cassidy","Ana"],
        best_maps: ["Route 66", "Oasis","Blizzard World"]
    },
    {
        name: 'Junker Queen',
        role: 'Tank',
        good_against: ["Mauga","Reaper","Wuyang"],
        bad_against: ["Zarya","Soldier: 76","Kiriko"],
        best_maps: ["New Junk City", "Lijang Tower","Runasapi"]
    },
    {
        name: 'Mauga',
        role: 'Tank',
        good_against: ["Sigma","Cassidy","Mercy"],
        bad_against: ["Zarya","Bastion","Ana"],
        best_maps: ["New Junk City", "Hollywood","Runasapi"]
    },
    {
        name: 'Orisa',
        role: 'Tank',
        good_against: ["Doomfist","Tracer","Lucio"],
        bad_against: ["Zarya","Sojurn","Ana"],
        best_maps: ["Shambali Monastery", "Suravasa","Midtown"]
    },
    {
        name: 'Ramattra',
        role: 'Tank',
        good_against: ["Reinhardt","Bastion","Baptiste"],
        bad_against: ["Zarya","Sojurn","Ana"],
        best_maps: ["Shambali Monastery", "Suravasa","Circut Reyal"]
    },
    {
        name: 'Roadhog',
        role: 'Tank',
        good_against: ["Doomfist","Tracer","Lucio"],
        bad_against: ["Orisa","Sojurn","Ana"],
        best_maps: ["Illios", "Rialto"]
    },
    {
        name: 'Sigma',
        role: 'Tank',
        good_against: ["RoadHog","Hanzo","Ana"],
        bad_against: ["Mauga","Mei","Batiste"],
        best_maps: ["Circuit Royal", "Shambali Monastery"]
    },
    {
        name: 'Winston',
        role: 'Tank',
        good_against: ["Zarya","Widowmaker","Ana"],
        bad_against: ["D.Va","Bastion","Reaper","Brigitte"],
        best_maps: ["Busan", "Dorado","Watchpoint: Gibraltar"]
    },
    {
        name: 'Wrecking Ball',
        role: 'Tank',
        good_against: ["Sigma","Widowmaker","Zenyatta"],
        bad_against: ["Orisa","Sojurn","Ana"],
        best_maps: ["Busan", "Dorado","Paraiso"]
    },
    {
        name: 'Zarya',
        role: 'Tank',
        good_against: ["Orisa","Junkrat","Brigitte"],
        good_against: ["Winston","Reaper","Zenyatta"],
        best_maps: ["lijang Tower", "Aatlis","Colosseo"]
    },
    //Damage
    {
        name: 'Ashe',
        role: 'Damage',
        good_against: ["Doomfist","Mercy","Lucio"],
        bad_against: ["Orisa","Sojurn","Ana"],
        best_maps: ["Illios", "Rialto","Dorado"]
    },
    {
        name: 'Bastion',
        role: 'Damage',
        good_against: ["Reinhardt", "Ramattra", "Winston","Mauga"],
        bad_against: ["D.Va", "Ana","Genji","Sombra"],
        best_maps: ["King's Row", "Havana", "Rialto"]
    },
    {
        name: 'Cassidy',
        role: 'Damage',
        good_against: ["Tracer", "Pharah", "Winston", "Echo"],
        bad_against: ["Widowmaker", "Hanzo", "D.Va"],
        best_maps: ["New Queen Street", "Hollywood", "Midtown",]
    },
    {   
        name: 'Echo',
        role: 'Damage',
        good_against: ["Reinhardt", "Sigma", "Bastion"],
        bad_against: ["Sojourn", "Widowmaker", "Ashe"],
        best_maps: ["Havana", "Junkertown", "Rialto"]
    },
    {
        name: 'Genji',
        role: 'Damage',
        good_against: ["Ana", "Zenyatta", "Ashe", "Soldier: 76"],
        bad_against: ["Winston", "Moira", "Brigitte"],
        best_maps: ["Lijiang Tower", "Ilios", "Nepal"]
    },
    {
        name: 'Hanzo',
        role: 'Damage',
        good_against: ["Winston", "Reinhardt", "Bastion", "Widowmaker"],
        bad_against: ["D.Va","Junker Queen", "Genji", "Tracer"],
        best_maps: ["Circuit Royal", "Havana", "King's Row"]
    },
    {
        name: 'Junkrat',
        role: 'Damage',
        good_against: ["Reinhardt", "Bastion", "Symmetra"],
        bad_against: ["D.Va", "Zarya", "Pharah", "Echo"],
        best_maps: ["Lijiang Tower", "Shambali Monastery", "Nepal"]
    },
    {
        name: 'Mei',
        role: 'Damage',
        good_against: ["Reinhardt", "D.Va", "Genji","Doomfist","Orisa"],
        bad_against: ["Zarya", "Kiriko", "Pharah", "Echo"],
        best_maps: ["Lijiang Tower", "Shambali Monastery", "Nepal","King's Row"]
    },
    {
        name: 'Pharah',
        role: 'Damage',
        good_against: ["Reinhardt", "Zarya", "Hazard","Venture","Reaper","Lifeweaver"],
        bad_against: ["D.Va", "Ashe", "Echo", "Cassidy","Soldier: 76","Torbjorn","Ana","Illari"],
        best_maps: ["Lijiang Tower", "Blizzard World", "Midtown"]
    },
    {
        name: 'Reaper',
        role: 'Damage',
        good_against: ["Winston", "Zarya", "Mei","Venture","Brigitte"],
        bad_against: ["Wrecking Ball", "Cassidy", "Lucio", "Torbjorn","Ana"],
        best_maps: ["Lijiang Tower", "New Junk City", "Esperanca"]
    },
    {
    name: 'Sojourn',
    role: 'Damage',
    good_against: ["Pharah", "Echo", "Mauga", "Roadhog", "Widowmaker"],
    bad_against: ["Winston", "D.Va", "Sigma", "Sombra"],
    best_maps: ["Circuit Royal", "King's Row", "Midtown","Dorado"]
    },
    
        //Supports
    {
        name: 'Ana',
        role: 'Support',
        good_against: ["Mauga", "Hog", "Pharah",  "Bastion"],
        bad_against: ["Tracer", "Genji", "Winston", "D.Va"],
        best_maps: ["Havana", "Junkertown", "Circuit Royal","Watchpoint: Gibraltar"]
    },
    {
        name: 'Baptiste',
        role: 'Support',
        good_against: ["Zarya", "Pharah", "Echo"],
        bad_against: ["Tracer", "Sombra", "Winston","Ana"],
        best_maps: ["King's Row", "Numbani", "New Queen Street"]
    },
    {
        name: 'Brigitte',
        role: 'Support',
        good_against: ["Tracer", "Genji", "Winston", "D.Va"],
        bad_against: ["Pharah", "Echo", "Widowmaker","Ashe"],
        best_maps: ["Lijiang Tower", "Ilios", "Oasis","Watchpoint: Gibraltar"]
    },
    {
        name: 'Illari',
        role: 'Support',
        good_against: ["Reinhardt", "Pharah", "Echo", "Soldier: 76"],
        bad_against: ["Winston", "D.Va", "Tracer"],
        best_maps: ["Dorado", "Rialto", "JunkerTown"]
    },
    {
        name: 'Kiriko',
        role: 'Support',
        good_against: ["Junker Queen", "Ana", "Tracer", "Ashe"],
        bad_against: ["Sombra", "Pharah", "Echo"],
        best_maps: ["Sar", "Busan", "Lijiang Tower"]
    },
    {
        name: 'Lifeweaver',
        role: 'Support',
        good_against: ["Reinhardt", "Junker Queen", "Widowmaker","Zarya","Orisa"],
        bad_against: ["Tracer", "Genji", "Winston"],
        best_maps: ["Blizzard World", "Hollywood", "Suravasa"]
    },
    {
        name: 'Lucio',
        role: 'Support',
        good_against: ["Tracer", "Genji", "Winston", "Reinhardt"],
        bad_against: ["Cassidy", "Widowmaker", "Sombra","Torbjorn"],
        best_maps: ["Ilios", "Lijiang Tower", "Nepal"]
    },
    {
        name: 'Mercy',
        role: 'Support',
        good_against: ["Pharah", "Sojourn", "Ashe", "Widowmaker"],
        bad_against: ["Winston", "D.Va", "Sombra","Tracer"],
        best_maps: ["Dorado", "Rialto", "Circuit Royal"]
    },
    {
        name: 'Moira',
        role: 'Support',
        good_against: ["Reaper", "Junker Queen", "Winston"],
        bad_against: ["Pharah", "Echo", "Widowmaker"],
        best_maps: ["Oasis", "Route 66","New Junk City"]
    },
    {
        name: 'Zenyatta',
        role: 'Support',
        good_against: ["Sigma", "Reinhardt", "Mauga"],
        bad_against: ["Tracer", "Winston", "Genji","Ana"],
        best_maps: ["Numbani", "Circut Royale", "Shambali Monastery"]
    },
    {
        name: 'Wuyang',
        role: 'Support',
        good_against: ["Sigma", "Ramattra", "Torbjorn"],
        bad_against: ["Tracer", "Genji", "Winston"],
        best_maps: ["Busan", "Midtown", "Shambali Monastery"]
    }
]);


        console.log('Database seeded successfully!');
        console.log('Sample heros created:');
        
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.close();
    }
}

seedHeros();