const Bigtable = require('@google-cloud/bigtable');
const bigtable = Bigtable({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});
const instanceName = 'sydney-instance';
var instance = bigtable.instance(instanceName);
var table = instance.table('tablexyz');

const row = table.row('112233445566FF00');

row.get(function (err) {
    if (err) {
        console.log(`error getting row ${err}`)
    } else {
        console.log(`row data ${JSON.stringify(row.data)}`)
    }
});