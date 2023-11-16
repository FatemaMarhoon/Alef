const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'alef-b9e95',
    keyFilename: '../server/src/config/cloud-storage-key.json', // This is your service account key
});

const bucket = storage.bucket('alef-bucket');

const FilesManager = {
    async upload(file) {
        console.log('start upload function');
        return new Promise((resolve, reject) => {
            try {
                if (!file) {
                    console.log('no file');
                    reject('No file uploaded.');
                }

                const fileRef = bucket.file(file.originalname);
                const fileStream = fileRef.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });

                fileStream.on('error', (err) => {
                    console.error('Error uploading file:', err);
                    reject('Error uploading file.');
                });

                fileStream.on('finish', async () => {
                    // Get the public URL of the uploaded file
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
                    console.log('File uploaded successfully:', publicUrl);
                    resolve(fileRef.name);
                });

                fileStream.end(file.buffer);
            } catch (error) {
                console.error('Error uploading file:', error);
                reject('Error uploading file.');
            }
        });
    },


    async generateSignedUrl(fileName) {
        const file = bucket.file(fileName);
      
        // Set the expiration time for the signed URL (in seconds)
        const expiration = Date.now() + 5 * 60 * 1000; // 5 minutes
      
        // Generate the signed URL
        const signedUrl = await file.getSignedUrl({
          action: 'read',
          expires: expiration,
        });
      
        return signedUrl[0];
      }
};

module.exports = FilesManager;
