const fs = require('fs')

const google = require('googleapis');
const serviceuser = google.serviceuser('v1');
const serviceAccount = JSON.parse(fs.readFileSync('../keyfile.json'));
const jwtAccess = new google.auth.JWT();
jwtAccess.fromJSON(serviceAccount);
jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform';
google.options({ auth: jwtAccess });

const xxx = {
    parent: 'projects/booming-edge-187303'
}

console.log(serviceuser.projects.services.list(xxx))
