const store = require('@google-cloud/storage')
const storage = store({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});

const bucketName = 'sydney-bucket-xyz-123456test';

storage
    .createBucket(bucketName)
    .then(() => {
        console.log(`Bucket ${bucketName} created.`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });