'use strict';

const google = require('googleapis');
const API_VERSION = 'v1';
const DISCOVERY_API = 'https://cloudiot.googleapis.com/$discovery/rest';

const getClient = auth => new Promise((resolve, reject) => {
    const discoveryUrl = `${DISCOVERY_API}?version=${API_VERSION}`;
    google.discoverAPI(discoveryUrl, {}, (err, client) => {
        if (err) {
            console.log(`getClient ERR ${err}`)
            reject(err);
        }
        resolve(client);
    });
});

const getAuthClient = client => new Promise((resolve, reject) => {
    google.auth.getApplicationDefault((err, authClient) => {
        if (err) {
            console.log(`getAuthClient ERR ${err}`)
            reject(err);
        }
        if (authClient.createScopedRequired && authClient.createScopedRequired()) {
            authClient = authClient.createScoped(['https://www.googleapis.com/auth/cloud-platform']);
        }
        const data = {
            client: client,
            auth: authClient
        }
        resolve(data);
    });
});

const getDevice = (clientAndAuth, deviceName) => new Promise((resolve, reject) => {
    const requestDevice = {
        name: deviceName,
        auth: clientAndAuth.auth
    };
    clientAndAuth.client.projects.locations.registries.devices.get(requestDevice, (err, data) => {
        if (err) {
            console.log(`getDevice ERR ${err}`);
            reject(err);
        }
        const returnData = {
            client: clientAndAuth.client,
            auth: clientAndAuth.auth,
            device: data
        }
        resolve(returnData);
    });
});

const sendDataToDevice = (clientAndAuthAndDevice, deviceName, message) => new Promise((resolve, reject) => {
    const body = {
        versionToUpdate: clientAndAuthAndDevice.device.config.version,
        binaryData: Buffer.from(message).toString('base64')
    };

    const req = {
        name: deviceName,
        resource: body,
        auth: clientAndAuthAndDevice.auth
    };

    clientAndAuthAndDevice.client.projects.locations.registries.devices.modifyCloudToDeviceConfig(req, (err, data) => {
        if (err) {
            console.log(`sendDataToDevice ERR ${deviceName} : ${err}`);
            reject(err);
        } else {
            console.log(`Configured device ${deviceName} : ${data}`);
            resolve(data);
        }
    });
});

exports.SendSomethingToDevice = (request, response)=> {
    console.log(`SYDNEY>>>> ${request.body}`);
    const message = request.body.message;
    const deviceId = request.body.deviceId;

    //replace this with yours
    const projectId = 'XXX';
    const cloudRegion = 'XXX';
    const registryId = 'XXX';


    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;
    const deviceName = `${registryName}/devices/${deviceId}/`;
    getClient().then(client => {
        return getAuthClient(client);
    }).then(clientAndAuth => {
        return getDevice(clientAndAuth, deviceName);
    }).then(clientAndAuthAndDevice => {
        return sendDataToDevice(clientAndAuthAndDevice, deviceName, message);
    }).then(result => {
        response.status(200).send(result);
    }).catch(err => {
        response.status(200).send(`${err}`);
    })
}