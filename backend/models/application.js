var mongoose = require('mongoose');

var Application = mongoose.model('Application', {
    applicant: {
        type: String
    },
    emailId: {
        type: String
    },
    resume: {
        type: String
    },
    reqId: {
        type: String
    },
    appliedOn: {
        type: Date
    }
});

module.exports = {
    Application
};
  