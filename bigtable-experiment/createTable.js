const Bigtable = require('@google-cloud/bigtable');
const bigtable = Bigtable({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});
const instanceName = 'sydney-instance';
const instance = bigtable.instance(instanceName);

instance.createTable('tablexyz', function (err, table) {
    if (err) {
        console.log(`error creating table ${err}`)
    } else {
        console.log(`succesfully created table ${JSON.stringify(table)}`)
    }
});