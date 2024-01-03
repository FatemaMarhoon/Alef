// backup.js

const { exec } = require('child_process');
const path = require('path');
const cron = require('node-cron');
//

const databaseConfig = require('./config/backupconfig');

const username = databaseConfig.username;
const password = databaseConfig.password;
const databaseName = databaseConfig.databaseName;
const host = databaseConfig.host;


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

        const mysqldumpCommand = `mysqldump -h ${host} -u ${username} --password=${password} --column-statistics=0 ${databaseName} > "${backupFilePath}"`;
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