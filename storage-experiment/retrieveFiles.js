'use strict';

const Storage = require('@google-cloud/storage');
const storage = new Storage({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});

const listFiles = (bucketName) => {
    
    storage
        .bucket(bucketName)
        .getFiles()
        .then(results => {
            const files = results[0];
            console.log("----------------------------------------\nListing Everything")
            console.log('Files:');
            files.forEach(file => {
                console.log(file.name);
            });
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

const listFilesByPrefix = (bucketName, prefix, delimiter) => {
    
    const options = { prefix: prefix };
    (delimiter) ? options.delimiter = delimiter : {}
    storage
        .bucket(bucketName)
        .getFiles(options)
        .then(results => {
            console.log("----------------------------------------\nOnly those with prefix")
            const files = results[0];

            console.log('Files:');
            files.forEach(file => {
                console.log(file.name);
            });
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}
listFiles('sydney-bucket-xyz-123456test');
listFilesByPrefix('sydney-bucket-xyz-123456test', 'folderx/', '/');

