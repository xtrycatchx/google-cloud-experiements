const pubsub = require('@google-cloud/pubsub');
const pubsubClient = pubsub({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});

console.log('started creating topic')
pubsubClient.createTopic('TOPICXYZ', null, (err, topic, resp) => {
    if (err) {
        console.log(`ERR ${err}`)
    } else {
        console.log(`topic ${JSON.stringify(topic)}`);
        console.log(`response ${JSON.stringify(resp)}`);
    }
});