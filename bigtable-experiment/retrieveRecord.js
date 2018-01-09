const Bigtable = require('@google-cloud/bigtable');
const bigtable = Bigtable({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});
const instanceName = 'sydney-instance';
const instance = bigtable.instance(instanceName);

//butange ug filter para ang latest ra ang makuha
const filter = [
    {
        column: {
            cellLimit: 1
        }
    }
];

const table = instance.table('tablexyz');

const row = table.row('112233445566FF00');

row.get({
    filter: filter
}, err => {
    if (err) {
        console.log(`error getting row ${err}`)
    } else {
        console.log(`row data ${JSON.stringify(row.data)}`)
    }
});