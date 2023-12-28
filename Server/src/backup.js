// backup.js

const { exec } = require('child_process');
const path = require('path');
const cron = require('node-cron');
const databaseConfig = require('./config/database');

const username = 'u202000513';
const password = 'u202000513';
const databaseName = 'db202000513';
const host = 'inhousevm.westeurope.cloudapp.azure.com';

const backupPath = path.join(__dirname, 'backups');
// Ensure the 'backups' directory exists
if (!require('fs').existsSync(backupPath)) {
    console.log("creating new directory")
    require('fs').mkdirSync(backupPath);
}
const backup = {
    // Function to perform the backup
    async performBackup() {
        console.log("function accessed")
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
        const backupFileName = `backup_${timestamp}.sql`;
        const backupFilePath = path.join(backupPath, backupFileName);

        const mysqldumpCommand = `mysqldump -h ${host} -u ${username} -p${password} ${databaseName} > ${backupFilePath}`;
        console.log('Starting backup process...');

        exec(mysqldumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Backup failed: ${stderr}`);
            } else {
                console.log(`Backup successful. File saved at: ${backupFilePath}`);
            }
        });
    },


};

module.exports = backup; 