const fs = require('fs');
const google = require('googleapis');

class PubSubRest {

    constructor(serviceAccountJSON) {
        this._pubsub = google.pubsub('v1');
        this._projectId = serviceAccountJSON.project_id;
        const jwtAccess = new google.auth.JWT();
        jwtAccess.fromJSON(serviceAccountJSON);
        jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform';
        google.options({ auth: jwtAccess });
    }
}

module.exports = PubSubRest;