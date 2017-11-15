const PubSub = require('@google-cloud/pubsub');
const pubsub = PubSub({
    projectId: 'curious-cistern-185603',
    keyFilename: '../keyfile.json'
});

// dapat naa ni na subscription daan
const subscription = pubsub.subscription('TOPICXYZ');

const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${JSON.stringify(message.attributes, null, 2)}`);
    // "Ack" (acknowledge receipt of) the message
    message.ack();
};

subscription.on(`message`, messageHandler);