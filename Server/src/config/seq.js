const { Sequelize } = require('sequelize');

const db = new Sequelize('mysql://u202000513:u202000513@inhousevm.westeurope.cloudapp.azure.com/db202000513', {
    dialect: 'mysql',
    "timezone": "+03:00" // Adjust this based on your timezone
    // Other configuration options here
});

module.exports = db;
