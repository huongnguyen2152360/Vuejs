const Sequelize = require('sequelize');
const config = require('../config/config')


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