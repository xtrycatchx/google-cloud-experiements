'use strict';

require('mocha');
var should = require('should');
const PubSubRest = require('./pubsub.rest');

describe('Testing PubSubRest', function () {
    it('should delete subscription', done => {
        const serviceAccount = JSON.parse(fs.readFileSync(keyfileLocation));
        new PubSubRest(serviceAccount).deleteSubscription('MYSUBSCRIPTION').then(() => {
            done();
        }).catch(err => {
            should.fail(`this shouldt happened ${err}`)
        })
    });
})


