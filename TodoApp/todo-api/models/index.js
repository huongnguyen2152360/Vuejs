const Sequelize = require('sequelize');
const config = require('../config/config-env')
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename); //index.js
var db = {};


const sequelize = new Sequelize(config.database.name, config.database.user, config.database.pass, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: true
    }
});

//Test connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Config model
fs
    .readdirSync(__dirname) //folder models tổng
    .filter(file => {
        // tìm các file model
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        //db = { board: board, todo: todo }
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; //to pass variable to model
db.Sequelize = Sequelize;

module.exports = db;