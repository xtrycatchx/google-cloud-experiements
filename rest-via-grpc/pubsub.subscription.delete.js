const fs = require('fs')

const google = require('googleapis');
const pubsub = google.pubsub('v1');
const serviceAccount = JSON.parse(fs.readFileSync('../keyfile.json'));
const jwtAccess = new google.auth.JWT();
jwtAccess.fromJSON(serviceAccount);
jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform';
google.options({ auth: jwtAccess });

const xxx = {
    subscription: 'projects/booming-edge-187303/subscriptions/MYSUBSCRIPTION'
}

pubsub.projects.subscriptions.delete(xxx, (err, data)=>{
    err ? console.log (err) : console.log(data);
})

