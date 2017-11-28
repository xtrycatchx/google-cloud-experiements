const fs = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

function createJwt(projectId, privateKeyFile, algorithm) {
    const token = {
        'iat': parseInt(Date.now() / 1000),
        'exp': parseInt(Date.now() / 1000) + 20 * 60,  // 20 minutes
        'aud': projectId
    };
    const privateKey = fs.readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, { algorithm: algorithm });
}

function sendSomething(messageCount, numMessages) {
    const payload = {
        message: "HELLO WORLD"
    }
    client.publish(mqttTopic, JSON.stringify(payload), { qos: 0 });
}

const registryId = 'sydney-registry'
const deviceId = 'Device-2222222222222222'
const cloudRegion = 'asia-east1'
const algorithm = 'RS256'
const projectId = 'curious-cistern-185603'
const rsaCertificateFile = '2222222222222222-certificate.pem'
const rsaPrivateKeyFile = '2222222222222222-key.pem'
const host = 'mqtt.googleapis.com'
const port = 8883
const messageType = 'events'

const mqttClientId = `projects/${projectId}/locations/${cloudRegion}/registries/${registryId}/devices/${deviceId}`;

const connectionArgs = {
    host: host,
    port: port,
    clientId: mqttClientId,
    username: 'unused',
    password: createJwt(projectId, rsaPrivateKeyFile, algorithm),
    protocol: 'mqtts'
};

const client = mqtt.connect(connectionArgs);

const mqttTopic = `/devices/${deviceId}/${messageType}`; //events or state

client.on('connect', () => {
    console.log('connect');
    sendSomething();
});

client.on('close', () => {
    console.log('close');
});

client.on('error', (err) => {
    console.log('error', err);
});

client.on('packetsend', () => {
    console.log('done');
    client.end();
});