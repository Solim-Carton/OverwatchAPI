const { Sequelize, DataTypes } = require('sequelize'); 
require('dotenv').config();

// Initialize database
const db = new Sequelize({
    dialect: process.env.DB_TYPE || 'sqlite', 
    storage: `database/${process.env.DB_NAME || 'overwatch.db'}`, 
    logging: false
});
// User
const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
// Role model
const Role = db.define('Role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

// Map model
const Map = db.define('Map', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
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
// Relationships
Hero.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Hero, { foreignKey: 'roleId' });

Hero.belongsToMany(Map, { through: 'HeroMaps', foreignKey: 'heroId' });
Map.belongsToMany(Hero, { through: 'HeroMaps', foreignKey: 'mapId' });

module.exports = { db, User, Hero, Role, Map };