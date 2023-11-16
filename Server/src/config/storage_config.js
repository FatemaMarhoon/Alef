const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: 'alef-b9e95',
    keyFilename: './cloud-storage-key.json', // This is your service account key
  });

const bucket = storage.bucket('alef-bucket');

module.exports = storage_config;
