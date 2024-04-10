const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('config');
const db = {};

const database = config.get('mysql.database');
const username = config.get('mysql.username');
const password = config.get('mysql.password');
const host = config.get('mysql.host');
const dialect = config.get('mysql.dialect');
const port = config.get('mysql.port');

const sequelize = new Sequelize(database, username, password, {
    dialect,
    dialectOptions: {
        decimalNumbers: true
    },
    host,
    port,
    logging: false
});

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;