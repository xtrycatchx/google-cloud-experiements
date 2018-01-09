'use strict';

const store = require('@google-cloud/storage')
const storage = store({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});

const bucketName = 'sydney-bucket-xyz-123456test';
const filename = 'test-file';

storage
    .bucket(bucketName)
    .upload(filename)
    .then(() => {
        console.log(`${filename} uploaded to ${bucketName}.`);
    })
    .catch(err => {
        console.error(`ERROR: ${err}`);
    });