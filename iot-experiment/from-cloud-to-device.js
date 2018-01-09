const google = require('googleapis');
const fs = require('fs')
const serviceJ = "../keyfile.json"

const API_VERSION = 'v1';
const DISCOVERY_API = 'https://cloudiot.googleapis.com/$discovery/rest';

function getClient(serviceAccountJson, cb) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountJson));
    const jwtAccess = new google.auth.JWT();
    jwtAccess.fromJSON(serviceAccount);
    jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform';
    google.options({ auth: jwtAccess });

    const discoveryUrl = `${DISCOVERY_API}?version=${API_VERSION}`;

    google.discoverAPI(discoveryUrl, {}, (err, client) => {
        if (err) {
            console.log(`Error during API discovery ${err}`);
            return undefined;
        }
        cb(client);
    });
}

getClient(serviceJ, (client) => {
    const registryId = 'sydney-registry'
    const deviceId = 'Device-2222222222222222'
    const cloudRegion = 'asia-east1'
    const algorithm = 'RS256'
    const projectId = 'curious-cistern-185603'

    //projects/${projectId}/locations/${cloudRegion}/registries/${registryId}/devices/${deviceid}

    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;
    const deviceName = `${registryName}/deviceid/${deviceId}/`;
    const body = { versionToUpdate: 23, binaryData: "YmF0bWFuMTIzNA==" };

    const request = {
        name: `${registryName}/devices/${deviceId}`,
        resource: body
    };

    client.projects.locations.registries.devices.modifyCloudToDeviceConfig(request, (err, data) => {
        if (err) {
            console.log(`Error configuring : ${deviceId}`);
            console.log(err);
        } else {
            console.log('Configured device:', deviceId);
            console.log(data);
        }
    });

})