const Bigtable = require('@google-cloud/bigtable');
const bigtable = Bigtable({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});
const instanceName = 'sydney-instance';

bigtable
    .createInstance(instanceName, {
        clusters: [
            {
                name: 'sydney-cluster',
                location: 'us-central1-c',
                nodes: 3,
            },
        ],
    })
    .then(() => {
        console.log(`Instance ${instanceName} created.`);
    })
    .catch(err => {
        console.log('ERROR:', err);
    });