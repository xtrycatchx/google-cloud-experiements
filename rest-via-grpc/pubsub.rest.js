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

    deleteSubscription(subscriptioName) {
        return new Promise((resolve, reject) => {
            const parameter = {
                subscription: `projects/${this._projectId}/topics/${subscriptioName}`
            }
            this._pubsub.projects.subscriptions.delete(parameter, (err, data) => {
                err ? console.log(err) : console.log(data);
            });
        });
    }

    deleteTopic(topicName) {
        return new Promise((resolve, reject) => {
            const parameter = {
                topic: `projects/${this._projectId}/topics/${topicName}`
            }
            this._pubsub.projects.topics.delete(parameter, (err, data) => {
                err ? console.log(err) : console.log(data);
            })
        })
    }
}

module.exports = PubSubRest;