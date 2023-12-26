
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'inhousevm.westeurope.cloudapp.azure.com',
    user: 'u202000513',
    password: 'u202000513',
    database: 'db202000513',
    waitForConnections: true,
    connectionLimit: 10, // Maximum number of connections in the pool
    queueLimit: 0 // Unlimited number of queued connection requests
});

module.exports = pool.promise();

