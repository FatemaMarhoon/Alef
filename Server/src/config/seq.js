const { Sequelize } = require('sequelize');

const db = new Sequelize('mysql://u202000513:u202000513@inhousevm.westeurope.cloudapp.azure.com/db202000513', {
    dialect: 'mysql',
    // timezone: '+03:00',
});

module.exports = db;
