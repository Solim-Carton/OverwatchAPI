const { Sequelize, DataTypes } = require('sequelize'); 
require('dotenv').config();

// Initialize database
const db = new Sequelize({
    dialect: process.env.DB_TYPE || 'sqlite', 
    storage: `database/${process.env.DB_NAME || 'overwatch.db'}`, 
    logging: false
});

// Hero model
const Hero = db.define('Hero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Tank','Damage','Support']]
        }
    },
    good_against: {       
        type: DataTypes.JSON,
        defaultValue: []
    },
    bad_against: {     
        type: DataTypes.JSON,
        defaultValue: []
    },
    best_maps: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

// Initialize database
async function initializeDatabase() {
    try {
        await db.authenticate();
        await db.sync({ force: false }); 
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Database error:', error);
    }
}

initializeDatabase();

module.exports = {
    db,
    Hero
};
