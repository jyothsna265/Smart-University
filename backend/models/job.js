var mongoose = require('mongoose');
var Application = require('./application').Application;
var Job = mongoose.model('Job', {
    company: {
        type: String
    },
    title: {
        type: String
    },
    reqId: {
        type: String
    },
    description: {
        type: String
    },
    requirements: {
        type: String
    },
    empType: {
        type: String
    },
    duration: {
        type: String
    },
    location: {
        type: String
    },
    postedBy: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    applications: [
      {
        applicant: {
          type: String
        },
        emailId: {
            type: String
        },
        resume: {
            type: String
        },
        appliedOn: {
            type: Date
        }
      }
    ]
});

module.exports = {
    Job
  };
  