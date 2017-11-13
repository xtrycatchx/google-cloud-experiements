const Bigtable = require('@google-cloud/bigtable');
const bigtable = Bigtable({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});
const instanceName = 'sydney-instance';
var instance = bigtable.instance(instanceName);
var table = instance.table('tablexyz');

table.getRows(function (err, rows) {
    if (err) {
        console.log(`error getting rows ${err}`)
    } else {
        console.log(`rows ${rows}`)
    }
});

const rows = [
    {
        key: '112233445566FF00',
        data: {
            yawe: {
                public: 'xxxyyyzzz123456789',
                private: 'ppaassawewasdasdi123456'
            }
        }
    }
];

table.insert(rows, function (err) {
    if (err) {
        console.log(`error inserting data ${err}`)
    } else {
        console.log(`successfully inserted data`)
    }
});