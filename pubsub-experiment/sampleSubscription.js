var pubsub = require('@google-cloud/pubsub')({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});

// dapat naa ni na topic daan
const topic = pubsub.topic('TOPICXYZ');
topic.createSubscription('TOPICXYZ', function (err, subscription) {
    function onError(err) {
        console.error(`hit onError ${JSON.stringify(err)}`)
    }
    function onMessage(message) {
        console.log(`hit onMessage ${message.data}`)
    }
    subscription.on('error', onError);
    subscription.on('message', onMessage);

    // subscription.removeListener('message', onMessage);
    // subscription.removeListener('error', onError);
});